"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, Palette, Type } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"

interface Benefit {
    _id?: string
    title: string
    subtitle: string
    iconType: string
    order: number
}

const iconOptions = [
    { value: "calendar", label: "Calendar" },
    { value: "flexibility", label: "Flexibility" },
    { value: "support", label: "Support" },
    { value: "maintenance", label: "Maintenance" },
    { value: "monitor", label: "Monitor" },
    { value: "app", label: "App" },
    { value: "power", label: "Power" },
    { value: "install", label: "Install" },
]

export default function FlexpayBenefitsEditor() {
    const [benefits, setBenefits] = useState<Benefit[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"items" | "style">("items")
    const [sectionStyle, setSectionStyle] = useState({
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        iconColor: "#ffcd00",
    })

    useEffect(() => {
        fetch("/api/flexpay/benefits")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setBenefits(data)
                }
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            // Save each benefit and track new IDs
            const savedBenefits: Benefit[] = []
            for (const benefit of benefits) {
                if (benefit._id) {
                    // Update existing benefit
                    await fetch(`/api/flexpay/benefits/${benefit._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(benefit),
                    })
                    savedBenefits.push(benefit)
                } else {
                    // Create new benefit and capture the returned _id
                    const res = await fetch("/api/flexpay/benefits", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(benefit),
                    })
                    if (res.ok) {
                        const newBenefit = await res.json()
                        savedBenefits.push({ ...benefit, _id: newBenefit._id })
                    } else {
                        savedBenefits.push(benefit)
                    }
                }
            }
            // Update state with the new IDs to prevent duplicate creation
            setBenefits(savedBenefits)
            setMessage("Saved successfully!")
            await fetch("/api/revalidate?path=/flexpay")
        } catch {
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 3000)
        }
    }

    const addBenefit = () => {
        setBenefits([...benefits, { title: "New Benefit", subtitle: "Description", iconType: "calendar", order: benefits.length }])
    }

    const updateBenefit = (index: number, updates: Partial<Benefit>) => {
        const newBenefits = [...benefits]
        newBenefits[index] = { ...newBenefits[index], ...updates }
        setBenefits(newBenefits)
    }

    const deleteBenefit = async (index: number) => {
        const benefit = benefits[index]
        if (benefit._id) {
            await fetch(`/api/flexpay/benefits/${benefit._id}`, { method: "DELETE" })
        }
        setBenefits(benefits.filter((_, i) => i !== index))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Flexpay Benefits Section</h1>
                    <p className="text-gray-500 text-sm">Manage your Flexpay benefit cards</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={addBenefit} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Plus size={18} /> Add Benefit
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 disabled:opacity-50">
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

            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("items")}
                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "items" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"}`}
                >
                    <Type size={18} /> Benefits ({benefits.length})
                </button>
                <button
                    onClick={() => setActiveTab("style")}
                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "style" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"}`}
                >
                    <Palette size={18} /> Style
                </button>
            </div>

            {activeTab === "items" && (
                <div className="space-y-3">
                    {benefits.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">No benefits yet</p>
                            <button onClick={addBenefit} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400">
                                Add Your First Benefit
                            </button>
                        </div>
                    ) : (
                        benefits.map((benefit, index) => (
                            <div key={benefit._id || index} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        value={benefit.title}
                                        onChange={(e) => updateBenefit(index, { title: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                        placeholder="Title"
                                    />
                                    <input
                                        type="text"
                                        value={benefit.subtitle}
                                        onChange={(e) => updateBenefit(index, { subtitle: e.target.value })}
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                        placeholder="Subtitle"
                                    />
                                    <div className="flex gap-2">
                                        <select
                                            value={benefit.iconType}
                                            onChange={(e) => updateBenefit(index, { iconType: e.target.value })}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                        >
                                            {iconOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        <button onClick={() => deleteBenefit(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "style" && (
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Background Color" color={sectionStyle.backgroundColor} onChange={(c) => setSectionStyle({ ...sectionStyle, backgroundColor: c })} />
                        <ColorPicker label="Title Color" color={sectionStyle.titleColor} onChange={(c) => setSectionStyle({ ...sectionStyle, titleColor: c })} />
                        <ColorPicker label="Icon Color" color={sectionStyle.iconColor} onChange={(c) => setSectionStyle({ ...sectionStyle, iconColor: c })} />
                    </div>
                </div>
            )}
        </div>
    )
}
