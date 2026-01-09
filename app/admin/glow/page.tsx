"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Palette, Type } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"
import ImageUploader from "@/components/admin/image-uploader"

interface GlowContent {
    title: string
    description: string
    highlightWord: string
    image: string
    backgroundColor: string
    textColor: string
    highlightColor: string
}

const defaultContent: GlowContent = {
    title: "Get that glow",
    description: "With affordable, reliable and fully maintained home solar.",
    highlightWord: "glow",
    image: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    highlightColor: "#ffcd00",
}

export default function GlowEditor() {
    const [content, setContent] = useState<GlowContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "style">("content")

    useEffect(() => {
        fetch("/api/content/glow")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/glow", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            })
            if (res.ok) {
                setMessage("Saved successfully!")
                await fetch("/api/revalidate?path=/")
            } else {
                setMessage("Failed to save")
            }
        } catch {
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 3000)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Glow Section</h1>
                    <p className="text-gray-500 text-sm">Edit the "Get that glow" section</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("content")}
                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "content" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}
                >
                    <Type size={18} /> Content
                </button>
                <button
                    onClick={() => setActiveTab("style")}
                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "style" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}
                >
                    <Palette size={18} /> Style
                </button>
            </div>

            {activeTab === "content" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={content.title}
                            onChange={(e) => setContent({ ...content, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Word</label>
                        <input
                            type="text"
                            value={content.highlightWord}
                            onChange={(e) => setContent({ ...content, highlightWord: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={content.description}
                            onChange={(e) => setContent({ ...content, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            rows={3}
                        />
                    </div>
                    <ImageUploader label="Section Image" value={content.image} onChange={(url) => setContent({ ...content, image: url })} />
                </div>
            )}

            {activeTab === "style" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Background Color" color={content.backgroundColor} onChange={(c) => setContent({ ...content, backgroundColor: c })} />
                        <ColorPicker label="Text Color" color={content.textColor} onChange={(c) => setContent({ ...content, textColor: c })} />
                        <ColorPicker label="Highlight Color" color={content.highlightColor} onChange={(c) => setContent({ ...content, highlightColor: c })} />
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Preview</h3>
                <div className="rounded-lg p-8" style={{ backgroundColor: content.backgroundColor, color: content.textColor }}>
                    <h2 className="text-4xl font-bold mb-4">
                        {content.title.split(new RegExp(`(${content.highlightWord})`, 'i')).map((part, i) => (
                            part.toLowerCase() === content.highlightWord.toLowerCase() ? (
                                <span key={i} style={{ color: content.highlightColor }}>{part}</span>
                            ) : <span key={i}>{part}</span>
                        ))}
                    </h2>
                    <p>{content.description}</p>
                </div>
            </div>
        </div>
    )
}
