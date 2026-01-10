"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, Palette, Type } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"

interface Feature {
    title: string
    description: string
}

interface SunnySideContent {
    headline: string
    headlineSecond: string
    description: string
    ctaText: string
    ctaButtonText: string
    ctaButtonLink: string
    features: Feature[]
    backgroundColor: string
    ctaColor: string
}

const defaultContent: SunnySideContent = {
    headline: "Turn your world",
    headlineSecond: "sunny-side up",
    description: "As a Suncoopng sunscriber you get a top of the range home solar system, without huge expenses and hassle. It really is that easy!",
    ctaText: "Subscribe to the sun!",
    ctaButtonText: "I'm interested",
    ctaButtonLink: "https://wa.me/27108803948",
    features: [
        { title: "Reliability", description: "The sun never lets you down. So, welcome to your interruption-free life." },
        { title: "Affordability", description: "No big, upfront capital outlay, just one affordable, fixed monthly fee that gives you peace of mind, lower costs, savings, and clean, reliable, sustainable energy." },
        { title: "Sustainability", description: "Your support for the planet is higher and your carbon footprint is lower." },
        { title: "Cost control", description: "Your money goes much further as you reduce your electricity bills and avoid rising electricity costs." },
        { title: "Peace of mind", description: "Your system always operates at peak performance. There is no Will it? Or Won't it?." }
    ],
    backgroundColor: "#f5f5f5",
    ctaColor: "#ffcd00"
}

export default function SunnySideEditor() {
    const [content, setContent] = useState<SunnySideContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "features" | "style">("content")

    useEffect(() => {
        fetch("/api/content/sunny-side")
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
            const res = await fetch("/api/content/sunny-side", {
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

    const addFeature = () => {
        setContent({
            ...content,
            features: [...content.features, { title: "New Feature", description: "Feature description" }]
        })
    }

    const updateFeature = (index: number, updates: Partial<Feature>) => {
        const newFeatures = [...content.features]
        newFeatures[index] = { ...newFeatures[index], ...updates }
        setContent({ ...content, features: newFeatures })
    }

    const deleteFeature = (index: number) => {
        setContent({ ...content, features: content.features.filter((_, i) => i !== index) })
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
                    <h1 className="text-2xl font-bold text-gray-800">Sunny Side Section</h1>
                    <p className="text-gray-500 text-sm">Edit the features and CTA section</p>
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
                <button onClick={() => setActiveTab("content")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "content" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    <Type size={18} /> Content
                </button>
                <button onClick={() => setActiveTab("features")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "features" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    Features ({content.features.length})
                </button>
                <button onClick={() => setActiveTab("style")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "style" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    <Palette size={18} /> Style
                </button>
            </div>

            {activeTab === "content" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Headline (Line 1)</label>
                            <input type="text" value={content.headline} onChange={(e) => setContent({ ...content, headline: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Headline (Line 2)</label>
                            <input type="text" value={content.headlineSecond} onChange={(e) => setContent({ ...content, headlineSecond: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" rows={3} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
                            <input type="text" value={content.ctaText} onChange={(e) => setContent({ ...content, ctaText: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input type="text" value={content.ctaButtonText} onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                            <input type="url" value={content.ctaButtonLink} onChange={(e) => setContent({ ...content, ctaButtonLink: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "features" && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-500">Manage the feature list items</p>
                        <button onClick={addFeature} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Plus size={18} /> Add Feature
                        </button>
                    </div>
                    <div className="space-y-4">
                        {content.features.map((feature, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-start gap-4">
                                    <div className="flex-1 space-y-3">
                                        <input type="text" value={feature.title} onChange={(e) => updateFeature(index, { title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg font-bold" placeholder="Feature title" />
                                        <textarea value={feature.description} onChange={(e) => updateFeature(index, { description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2} placeholder="Feature description" />
                                    </div>
                                    <button onClick={() => deleteFeature(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "style" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Background Color" color={content.backgroundColor} onChange={(c) => setContent({ ...content, backgroundColor: c })} />
                        <ColorPicker label="CTA Banner Color" color={content.ctaColor} onChange={(c) => setContent({ ...content, ctaColor: c })} />
                    </div>
                </div>
            )}
        </div>
    )
}
