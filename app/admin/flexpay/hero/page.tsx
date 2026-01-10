"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Settings, Palette, Type } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"
import ImageUploader from "@/components/admin/image-uploader"

interface HeroContent {
    headline: string
    subheadline: string
    ctaText: string
    ctaLink: string
    benefits: string[]
    backgroundColor: string
    textColor: string
    buttonColor: string
    buttonTextColor: string
    backgroundImage: string
}

const defaultContent: HeroContent = {
    headline: "Flexpay - Pay Your Way",
    subheadline: "Flexible payment options for solar energy",
    ctaText: "GET STARTED",
    ctaLink: "https://wa.me/27108803948",
    benefits: ["Flexible payments", "No hidden fees", "Easy setup"],
    backgroundColor: "#ffcd00",
    textColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    backgroundImage: "",
}

export default function FlexpayHeroEditor() {
    const [content, setContent] = useState<HeroContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"content" | "style" | "layout">("content")

    useEffect(() => {
        fetch("/api/content/flexpay-hero")
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
            const res = await fetch("/api/content/flexpay-hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            })
            if (res.ok) {
                setMessage("Saved successfully!")
                await fetch("/api/revalidate?path=/flexpay")
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

    const updateBenefit = (index: number, value: string) => {
        const newBenefits = [...content.benefits]
        newBenefits[index] = value
        setContent({ ...content, benefits: newBenefits })
    }

    const addBenefit = () => {
        setContent({ ...content, benefits: [...content.benefits, "New benefit"] })
    }

    const removeBenefit = (index: number) => {
        setContent({ ...content, benefits: content.benefits.filter((_, i) => i !== index) })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        )
    }

    const tabs = [
        { id: "content", label: "Content", icon: Type },
        { id: "style", label: "Style", icon: Palette },
        { id: "layout", label: "Layout", icon: Settings },
    ]

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Flexpay Hero Section</h1>
                    <p className="text-gray-500 text-sm">Edit the main banner of your Flexpay page</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 disabled:opacity-50 transition-colors"
                >
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
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "content" | "style" | "layout")}
                            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${activeTab === tab.id
                                ? "text-blue-600 border-blue-500"
                                : "text-gray-500 border-transparent hover:text-gray-700"
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {activeTab === "content" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                        <input
                            type="text"
                            value={content.headline}
                            onChange={(e) => setContent({ ...content, headline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                        <input
                            type="text"
                            value={content.subheadline}
                            onChange={(e) => setContent({ ...content, subheadline: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={content.ctaText}
                                onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                            <input
                                type="url"
                                value={content.ctaLink}
                                onChange={(e) => setContent({ ...content, ctaLink: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Benefits ({content.benefits.length})</label>
                            <button type="button" onClick={addBenefit} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                + Add
                            </button>
                        </div>
                        <div className="space-y-2">
                            {content.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => updateBenefit(idx, e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    />
                                    <button type="button" onClick={() => removeBenefit(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">×</button>
                                </div>
                            ))}
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
                    <ImageUploader label="Background Image (optional)" value={content.backgroundImage} onChange={(url) => setContent({ ...content, backgroundImage: url })} />
                </div>
            )}

            {activeTab === "layout" && (
                <div className="bg-white rounded-lg shadow p-6 text-center py-12 text-gray-500">
                    <Settings size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Layout controls coming soon</p>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Preview</h3>
                <div className="rounded-lg p-8 text-center" style={{ backgroundColor: content.backgroundColor, color: content.textColor }}>
                    <h2 className="text-3xl font-bold mb-2">{content.headline}</h2>
                    <p className="text-lg mb-4">{content.subheadline}</p>
                    <button className="px-6 py-3 rounded-full font-bold" style={{ backgroundColor: content.buttonColor, color: content.buttonTextColor }}>
                        {content.ctaText}
                    </button>
                </div>
            </div>
        </div>
    )
}
