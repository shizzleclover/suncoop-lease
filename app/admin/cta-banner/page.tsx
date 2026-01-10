"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Palette, Type } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"

interface CtaBannerContent {
    headline: string
    buttonText: string
    buttonLink: string
    backgroundColor: string
    textColor: string
    buttonColor: string
    buttonTextColor: string
}

const defaultContent: CtaBannerContent = {
    headline: "Yes! Turn my world sunny side up",
    buttonText: "I'm interested",
    buttonLink: "https://wa.me/27108803948",
    backgroundColor: "#ffcd00",
    textColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
}

export default function CtaBannerEditor() {
    const [content, setContent] = useState<CtaBannerContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "style">("content")

    useEffect(() => {
        fetch("/api/content/cta-banner")
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
            const res = await fetch("/api/content/cta-banner", {
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
                    <h1 className="text-2xl font-bold text-gray-800">CTA Banner</h1>
                    <p className="text-gray-500 text-sm">Edit the call-to-action banner</p>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                        <input
                            type="text"
                            value={content.headline}
                            onChange={(e) => setContent({ ...content, headline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 text-lg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={content.buttonText}
                                onChange={(e) => setContent({ ...content, buttonText: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link (WhatsApp)</label>
                            <input
                                type="url"
                                value={content.buttonLink}
                                onChange={(e) => setContent({ ...content, buttonLink: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "style" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Background Color" color={content.backgroundColor} onChange={(c) => setContent({ ...content, backgroundColor: c })} />
                        <ColorPicker label="Text Color" color={content.textColor} onChange={(c) => setContent({ ...content, textColor: c })} />
                        <ColorPicker label="Button Color" color={content.buttonColor} onChange={(c) => setContent({ ...content, buttonColor: c })} />
                        <ColorPicker label="Button Text Color" color={content.buttonTextColor} onChange={(c) => setContent({ ...content, buttonTextColor: c })} />
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Preview</h3>
                <div className="rounded-full py-4 px-8 flex items-center justify-center gap-6" style={{ backgroundColor: content.backgroundColor }}>
                    <h3 className="font-bold" style={{ color: content.textColor }}>
                        <span className="font-extrabold">Yes!</span> {content.headline.replace('Yes! ', '')}
                    </h3>
                    <button className="px-6 py-2 rounded-full font-bold text-sm" style={{ backgroundColor: content.buttonColor, color: content.buttonTextColor }}>
                        {content.buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}
