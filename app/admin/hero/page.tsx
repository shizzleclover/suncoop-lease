"use client"

import { useState, useEffect } from "react"

export default function HeroEditor() {
    const [content, setContent] = useState({
        headline: "Subscribe to the sun",
        subheadline: "Solar from only R1299 per month",
        ctaText: "I'M INTERESTED",
        benefits: ["Month to month subscription", "Upgrade or cancel any time", "24/7 support"]
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content/hero")
            if (res.ok) {
                const data = await res.json()
                if (data) setContent(data)
            }
        } catch (error) {
            console.error("Failed to fetch:", error)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: "hero", ...content })
            })

            if (res.ok) {
                // Trigger revalidation
                await fetch("/api/revalidate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: "/" })
                })
                setMessage("Saved successfully!")
            } else {
                setMessage("Failed to save")
            }
        } catch (error) {
            setMessage("Error saving content")
        } finally {
            setSaving(false)
        }
    }

    const updateBenefit = (index: number, value: string) => {
        const newBenefits = [...content.benefits]
        newBenefits[index] = value
        setContent({ ...content, benefits: newBenefits })
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Hero Section</h1>
                    <p className="text-gray-500">Edit the main headline and benefits</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Headline
                    </label>
                    <input
                        type="text"
                        value={content.headline}
                        onChange={(e) => setContent({ ...content, headline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subheadline
                    </label>
                    <input
                        type="text"
                        value={content.subheadline}
                        onChange={(e) => setContent({ ...content, subheadline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        CTA Button Text
                    </label>
                    <input
                        type="text"
                        value={content.ctaText}
                        onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benefits (checkmarks)
                    </label>
                    {content.benefits.map((benefit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            value={benefit}
                            onChange={(e) => updateBenefit(idx, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none mb-2"
                            placeholder={`Benefit ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Preview */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Preview</h2>
                <div className="bg-yellow-400 rounded-lg p-8 text-center">
                    <h1 className="text-4xl font-extrabold mb-2">{content.headline}</h1>
                    <p className="text-lg mb-4">{content.subheadline}</p>
                    <div className="flex justify-center gap-8 mb-4">
                        {content.benefits.map((b, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-green-600">✓</span>
                                {b}
                            </span>
                        ))}
                    </div>
                    <button className="px-6 py-3 bg-black text-white font-bold rounded-full">
                        {content.ctaText}
                    </button>
                </div>
            </div>
        </div>
    )
}
