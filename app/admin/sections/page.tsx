"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Save, X, Eye, EyeOff } from "lucide-react"

interface CustomSection {
    _id?: string
    name: string
    type: "cards" | "text-image" | "banner" | "list"
    title: string
    subtitle?: string
    backgroundColor: string
    content: any[]
    order: number
    isActive: boolean
}

const sectionTypes = [
    { value: "cards", label: "Cards Grid", description: "Grid of cards with icons" },
    { value: "text-image", label: "Text + Image", description: "Text on one side, image on other" },
    { value: "banner", label: "Banner", description: "Full-width CTA banner" },
    { value: "list", label: "List", description: "Bullet point list" },
]

export default function SectionsEditor() {
    const [sections, setSections] = useState<CustomSection[]>([])
    const [loading, setLoading] = useState(true)
    const [showNew, setShowNew] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [newSection, setNewSection] = useState<CustomSection>({
        name: "", type: "cards", title: "", subtitle: "", backgroundColor: "#ffffff", content: [], order: 0, isActive: true
    })
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchSections()
    }, [])

    const fetchSections = async () => {
        try {
            const res = await fetch("/api/sections")
            if (res.ok) {
                const data = await res.json()
                setSections(data)
            }
        } catch (error) {
            console.error("Failed to fetch:", error)
        } finally {
            setLoading(false)
        }
    }

    const revalidate = async () => {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
    }

    const handleCreate = async () => {
        try {
            await fetch("/api/sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newSection, order: sections.length })
            })
            setNewSection({ name: "", type: "cards", title: "", subtitle: "", backgroundColor: "#ffffff", content: [], order: 0, isActive: true })
            setShowNew(false)
            fetchSections()
            await revalidate()
            setMessage("Section created!")
        } catch (error) {
            setMessage("Failed to create")
        }
    }

    const handleUpdate = async (section: CustomSection) => {
        try {
            await fetch(`/api/sections/${section._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(section)
            })
            setEditingId(null)
            fetchSections()
            await revalidate()
            setMessage("Section updated!")
        } catch (error) {
            setMessage("Failed to update")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this section?")) return
        try {
            await fetch(`/api/sections/${id}`, { method: "DELETE" })
            fetchSections()
            await revalidate()
            setMessage("Section deleted!")
        } catch (error) {
            setMessage("Failed to delete")
        }
    }

    const toggleActive = async (section: CustomSection) => {
        const updated = { ...section, isActive: !section.isActive }
        await handleUpdate(updated)
    }

    if (loading) return <div className="text-center py-8">Loading...</div>

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Custom Sections</h1>
                    <p className="text-gray-500">Create and manage custom page sections</p>
                </div>
                <button
                    onClick={() => setShowNew(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
                >
                    <Plus size={20} /> Create Section
                </button>
            </div>

            {message && <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>}

            {/* New Section Form */}
            {showNew && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="font-bold mb-4">New Custom Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Section Name (internal)"
                            value={newSection.name}
                            onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <select
                            value={newSection.type}
                            onChange={(e) => setNewSection({ ...newSection, type: e.target.value as any })}
                            className="px-4 py-2 border rounded-lg"
                        >
                            {sectionTypes.map(t => (
                                <option key={t.value} value={t.value}>{t.label} - {t.description}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Section Title"
                            value={newSection.title}
                            onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Subtitle (optional)"
                            value={newSection.subtitle}
                            onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <div className="flex items-center gap-2">
                            <label className="text-sm">Background:</label>
                            <input
                                type="color"
                                value={newSection.backgroundColor}
                                onChange={(e) => setNewSection({ ...newSection, backgroundColor: e.target.value })}
                                className="w-10 h-10 border rounded cursor-pointer"
                            />
                            <span className="text-sm text-gray-500">{newSection.backgroundColor}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-lg">Create</button>
                        <button onClick={() => setShowNew(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}

            {/* Sections List */}
            <div className="space-y-4">
                {sections.map((section) => (
                    <div key={section._id} className={`bg-white rounded-lg shadow p-4 border-l-4 ${section.isActive ? 'border-green-500' : 'border-gray-300'}`}>
                        {editingId === section._id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        value={section.title}
                                        onChange={(e) => setSections(sections.map(s => s._id === section._id ? { ...s, title: e.target.value } : s))}
                                        className="px-3 py-2 border rounded"
                                        placeholder="Title"
                                    />
                                    <input
                                        value={section.subtitle || ""}
                                        onChange={(e) => setSections(sections.map(s => s._id === section._id ? { ...s, subtitle: e.target.value } : s))}
                                        className="px-3 py-2 border rounded"
                                        placeholder="Subtitle"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdate(section)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded">
                                        <Save size={16} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded">
                                        <X size={16} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded" style={{ backgroundColor: section.backgroundColor, border: '1px solid #ddd' }}></div>
                                    <div>
                                        <h3 className="font-bold">{section.title}</h3>
                                        <p className="text-gray-500 text-sm">Type: {sectionTypes.find(t => t.value === section.type)?.label} | {section.isActive ? '✅ Active' : '⏸️ Inactive'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => toggleActive(section)} className="p-2 hover:bg-gray-100 rounded" title={section.isActive ? 'Deactivate' : 'Activate'}>
                                        {section.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button onClick={() => setEditingId(section._id!)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(section._id!)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {sections.length === 0 && !showNew && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500 mb-4">No custom sections yet.</p>
                    <button onClick={() => setShowNew(true)} className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">
                        Create Your First Section
                    </button>
                </div>
            )}
        </div>
    )
}
