"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, Eye, EyeOff, GripVertical, Palette, Type, Settings } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"
import ImageUploader from "@/components/admin/image-uploader"
import dynamic from 'next/dynamic'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const RichTextEditor = dynamic(() => import("@/components/admin/rich-text-editor"), {
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
})

interface CustomSection {
    _id?: string
    title: string
    content: string
    image: string
    visible: boolean
    order: number
    backgroundColor: string
    textColor: string
    layout: "text-left" | "text-right" | "centered"
}

const sectionTemplates = [
    { name: "About Us", layout: "text-left", content: "<p>Tell your story here...</p>" },
    { name: "Our Mission", layout: "centered", content: "<h2>Our Mission</h2><p>Describe your mission...</p>" },
    { name: "Testimonials", layout: "centered", content: "<p>Customer testimonials...</p>" },
    { name: "Call to Action", layout: "centered", content: "<h2>Ready to get started?</h2><p>Contact us today!</p>" },
]

function SortableSectionCard({
    section,
    isSelected,
    onSelect,
    onToggleVisibility,
    onDelete,
}: {
    section: CustomSection
    isSelected: boolean
    onSelect: () => void
    onToggleVisibility: () => void
    onDelete: () => void
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section._id || section.order.toString() })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onSelect}
            className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${isSelected ? "border-yellow-500 ring-2 ring-yellow-200" : "border-gray-200 hover:border-gray-300"
                } ${!section.visible ? "opacity-60" : ""}`}
        >
            <div className="flex items-center gap-3">
                <button
                    {...attributes}
                    {...listeners}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                >
                    <GripVertical size={18} />
                </button>

                <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{section.title || "Untitled Section"}</h4>
                    <p className="text-sm text-gray-500">{section.layout} layout</p>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleVisibility()
                    }}
                    className={`p-2 rounded-lg transition-colors ${section.visible ? "text-green-500 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"
                        }`}
                    title={section.visible ? "Visible on site" : "Hidden from site"}
                >
                    {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete()
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}

export default function SectionsEditor() {
    const [sections, setSections] = useState<CustomSection[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "style">("content")
    const [showTemplates, setShowTemplates] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    useEffect(() => {
        fetch("/api/sections")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setSections(data)
                }
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((i) => (i._id || i.order.toString()) === active.id)
                const newIndex = items.findIndex((i) => (i._id || i.order.toString()) === over.id)
                const newItems = arrayMove(items, oldIndex, newIndex)
                return newItems.map((item, idx) => ({ ...item, order: idx }))
            })
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            for (const section of sections) {
                if (section._id) {
                    await fetch(`/api/sections/${section._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(section),
                    })
                } else {
                    await fetch("/api/sections", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(section),
                    })
                }
            }
            setMessage("Saved successfully!")
            await fetch("/api/revalidate?path=/")
        } catch {
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 3000)
        }
    }

    const addSection = (template?: { name: string; layout: string; content: string }) => {
        const newSection: CustomSection = {
            title: template?.name || "New Section",
            content: template?.content || "<p>Add your content here...</p>",
            image: "",
            visible: true,
            order: sections.length,
            backgroundColor: "#ffffff",
            textColor: "#000000",
            layout: (template?.layout as "text-left" | "text-right" | "centered") || "text-left",
        }
        setSections([...sections, newSection])
        setSelectedIndex(sections.length)
        setShowTemplates(false)
    }

    const updateSection = (index: number, updates: Partial<CustomSection>) => {
        const newSections = [...sections]
        newSections[index] = { ...newSections[index], ...updates }
        setSections(newSections)
    }

    const deleteSection = async (index: number) => {
        const section = sections[index]
        if (section._id) {
            await fetch(`/api/sections/${section._id}`, { method: "DELETE" })
        }
        setSections(sections.filter((_, i) => i !== index))
        if (selectedIndex === index) {
            setSelectedIndex(null)
        }
    }

    const toggleVisibility = (index: number) => {
        updateSection(index, { visible: !sections[index].visible })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
            </div>
        )
    }

    const selectedSection = selectedIndex !== null ? sections[selectedIndex] : null

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Custom Sections</h1>
                    <p className="text-gray-500 text-sm">Create and manage custom page sections</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => setShowTemplates(!showTemplates)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Plus size={18} />
                            Add Section
                        </button>
                        {showTemplates && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowTemplates(false)} />
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                                    <button
                                        onClick={() => addSection()}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100"
                                    >
                                        <p className="font-medium">Blank Section</p>
                                        <p className="text-sm text-gray-500">Start from scratch</p>
                                    </button>
                                    {sectionTemplates.map((template, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => addSection(template)}
                                            className="w-full px-4 py-3 text-left hover:bg-gray-50"
                                        >
                                            <p className="font-medium">{template.name}</p>
                                            <p className="text-sm text-gray-500">{template.layout} layout</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 transition-colors"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {isSaving ? "Saving..." : "Save All"}
                    </button>
                </div>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-3 gap-6">
                <div className="space-y-3">
                    {sections.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                            <Settings size={32} className="mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-500 mb-4">No custom sections yet</p>
                            <button
                                onClick={() => setShowTemplates(true)}
                                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                            >
                                Create Your First Section
                            </button>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={sections.map((s) => s._id || s.order.toString())}
                                strategy={verticalListSortingStrategy}
                            >
                                {sections.map((section, index) => (
                                    <SortableSectionCard
                                        key={section._id || index}
                                        section={section}
                                        isSelected={selectedIndex === index}
                                        onSelect={() => setSelectedIndex(index)}
                                        onToggleVisibility={() => toggleVisibility(index)}
                                        onDelete={() => deleteSection(index)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>

                <div className="col-span-2">
                    {selectedSection ? (
                        <>
                            <div className="flex gap-2 mb-4 border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab("content")}
                                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === "content"
                                            ? "text-yellow-600 border-yellow-500"
                                            : "text-gray-500 border-transparent hover:text-gray-700"
                                        }`}
                                >
                                    <Type size={18} />
                                    Content
                                </button>
                                <button
                                    onClick={() => setActiveTab("style")}
                                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === "style"
                                            ? "text-yellow-600 border-yellow-500"
                                            : "text-gray-500 border-transparent hover:text-gray-700"
                                        }`}
                                >
                                    <Palette size={18} />
                                    Style
                                </button>
                            </div>

                            {activeTab === "content" && (
                                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={selectedSection.title}
                                            onChange={(e) => updateSection(selectedIndex!, { title: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                            placeholder="Section title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(["text-left", "centered", "text-right"] as const).map((layout) => (
                                                <button
                                                    key={layout}
                                                    type="button"
                                                    onClick={() => updateSection(selectedIndex!, { layout })}
                                                    className={`px-4 py-3 rounded-lg border-2 transition-colors ${selectedSection.layout === layout
                                                            ? "border-yellow-500 bg-yellow-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {layout === "text-left" && "Text Left"}
                                                    {layout === "centered" && "Centered"}
                                                    {layout === "text-right" && "Text Right"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                        <RichTextEditor
                                            content={selectedSection.content}
                                            onChange={(content) => updateSection(selectedIndex!, { content })}
                                        />
                                    </div>

                                    <ImageUploader
                                        label="Section Image (optional)"
                                        value={selectedSection.image}
                                        onChange={(url) => updateSection(selectedIndex!, { image: url })}
                                    />
                                </div>
                            )}

                            {activeTab === "style" && (
                                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <ColorPicker
                                            label="Background Color"
                                            color={selectedSection.backgroundColor}
                                            onChange={(color) => updateSection(selectedIndex!, { backgroundColor: color })}
                                        />
                                        <ColorPicker
                                            label="Text Color"
                                            color={selectedSection.textColor}
                                            onChange={(color) => updateSection(selectedIndex!, { textColor: color })}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-600 mb-3">Preview</h3>
                                <div
                                    className="rounded-lg p-8"
                                    style={{
                                        backgroundColor: selectedSection.backgroundColor,
                                        color: selectedSection.textColor,
                                        textAlign: selectedSection.layout === "centered" ? "center" : selectedSection.layout === "text-right" ? "right" : "left",
                                    }}
                                >
                                    <h2 className="text-2xl font-bold mb-4">{selectedSection.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: selectedSection.content }} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 min-h-[400px]">
                            <div className="text-center">
                                <Settings size={48} className="mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-500">Select a section to edit</p>
                                <p className="text-sm text-gray-400">or create a new one</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
