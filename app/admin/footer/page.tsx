"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Palette, Type, Phone, Mail, MessageCircle } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"

interface FooterContent {
    phone: string
    email: string
    whatsapp: string
    tagline: string
    backgroundColor: string
    textColor: string
    accentColor: string
}

const defaultContent: FooterContent = {
    phone: "010 880 3948",
    email: "help@suncoopng.co.za",
    whatsapp: "27108803948",
    tagline: "Subscribe to the sun. Affordable solar energy for your home.",
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#ffcd00",
}

export default function FooterEditor() {
    const [content, setContent] = useState<FooterContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "style">("content")

    useEffect(() => {
        fetch("/api/content/footer")
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
            const res = await fetch("/api/content/footer", {
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
                    <h1 className="text-2xl font-bold text-gray-800">Footer Section</h1>
                    <p className="text-gray-500 text-sm">Edit contact info and footer settings</p>
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
                    <Type size={18} /> Contact Info
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                        <input
                            type="text"
                            value={content.tagline}
                            onChange={(e) => setContent({ ...content, tagline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Phone size={16} /> Phone
                            </label>
                            <input
                                type="tel"
                                value={content.phone}
                                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="email"
                                value={content.email}
                                onChange={(e) => setContent({ ...content, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <MessageCircle size={16} /> WhatsApp
                            </label>
                            <input
                                type="text"
                                value={content.whatsapp}
                                onChange={(e) => setContent({ ...content, whatsapp: e.target.value })}
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
                        <ColorPicker label="Accent Color" color={content.accentColor} onChange={(c) => setContent({ ...content, accentColor: c })} />
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Preview</h3>
                <div className="rounded-lg p-6" style={{ backgroundColor: content.backgroundColor, color: content.textColor }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-3" style={{ backgroundColor: content.accentColor, color: content.backgroundColor }}>
                                suncoopng
                            </div>
                            <p className="text-sm opacity-80">{content.tagline}</p>
                        </div>
                        <div className="text-right text-sm">
                            <p>{content.phone}</p>
                            <p style={{ color: content.accentColor }}>{content.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
