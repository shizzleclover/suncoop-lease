"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, Check, Palette, Type, Star } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"

interface PricingPlan {
    name: string
    category: string
    price: string
    connectionFee: string
    features: string[]
    popular: boolean
    ctaText: string
    ctaLink: string
}

const categoryOptions = ["Home Series", "Mini", "Pro", "Max"]

const defaultPlans: PricingPlan[] = [
    {
        name: "Home Basic",
        category: "Home Series",
        price: "₦50,000",
        connectionFee: "₦150,000",
        features: ["1.5kVA Inverter", "2x 200Ah Batteries", "4x Solar Panels", "Basic Installation"],
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "Mini Power",
        category: "Mini",
        price: "₦35,000",
        connectionFee: "₦100,000",
        features: ["1kVA Inverter", "1x 200Ah Battery", "2x Solar Panels", "Compact Setup"],
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "Pro Power",
        category: "Pro",
        price: "₦85,000",
        connectionFee: "₦250,000",
        features: ["3.5kVA Inverter", "4x 200Ah Batteries", "8x Solar Panels", "Premium Installation", "Priority Support"],
        popular: true,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "Max Power",
        category: "Max",
        price: "₦150,000",
        connectionFee: "₦400,000",
        features: ["5kVA Inverter", "8x 200Ah Batteries", "12x Solar Panels", "Full Home Coverage", "24/7 Support", "Extended Warranty"],
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
]

export default function FlexpayPricingEditor() {
    const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"plans" | "style">("plans")
    const [selectedPlan, setSelectedPlan] = useState<number>(0)
    const [sectionStyle, setSectionStyle] = useState({ backgroundColor: "#ffcd00", cardColor: "#000000", popularColor: "#ffffff", textColor: "#ffcd00" })

    useEffect(() => {
        fetch("/api/content/flexpay-pricing")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.plans && data.plans.length > 0) setPlans(data.plans)
                if (data?.style) setSectionStyle(data.style)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/flexpay-pricing", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plans, style: sectionStyle }),
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

    const addPlan = () => {
        setPlans([...plans, {
            name: `New Plan ${plans.length + 1}`,
            category: "Home Series",
            price: "₦0",
            connectionFee: "₦0",
            features: ["Feature 1"],
            popular: false,
            ctaText: "Get Started",
            ctaLink: "https://wa.me/27108803948"
        }])
        setSelectedPlan(plans.length)
    }

    const updatePlan = (index: number, updates: Partial<PricingPlan>) => {
        const newPlans = [...plans]
        newPlans[index] = { ...newPlans[index], ...updates }
        setPlans(newPlans)
    }

    const deletePlan = (index: number) => {
        setPlans(plans.filter((_, i) => i !== index))
        if (selectedPlan >= plans.length - 1) setSelectedPlan(Math.max(0, plans.length - 2))
    }

    const addFeature = (planIndex: number) => {
        const newPlans = [...plans]
        newPlans[planIndex].features.push("New feature")
        setPlans(newPlans)
    }

    const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
        const newPlans = [...plans]
        newPlans[planIndex].features[featureIndex] = value
        setPlans(newPlans)
    }

    const removeFeature = (planIndex: number, featureIndex: number) => {
        const newPlans = [...plans]
        newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex)
        setPlans(newPlans)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        )
    }

    const currentPlan = plans[selectedPlan]

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Flexpay Pricing Section</h1>
                    <p className="text-gray-500 text-sm">Manage your Flexpay pricing plans</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={addPlan} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Plus size={18} /> Add Plan
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
                <button onClick={() => setActiveTab("plans")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "plans" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"}`}>
                    <Type size={18} /> Plans ({plans.length})
                </button>
                <button onClick={() => setActiveTab("style")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "style" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"}`}>
                    <Palette size={18} /> Style
                </button>
            </div>

            {activeTab === "plans" && (
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        {plans.map((plan, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedPlan(index)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left ${selectedPlan === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                            >
                                <div className="flex items-center gap-2">
                                    {plan.popular && <Star size={16} className="text-blue-500 fill-blue-500" />}
                                    <span className="font-medium text-sm">{plan.name}</span>
                                </div>
                                <span className="text-xs text-gray-500">{plan.price}</span>
                            </button>
                        ))}
                    </div>

                    {currentPlan && (
                        <div className="col-span-2 space-y-4 bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg">Edit Plan</h3>
                                <button onClick={() => deletePlan(selectedPlan)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                                    <input type="text" value={currentPlan.name} onChange={(e) => updatePlan(selectedPlan, { name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select value={currentPlan.category || "Home Series"} onChange={(e) => updatePlan(selectedPlan, { category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                        {categoryOptions.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price</label>
                                    <input type="text" value={currentPlan.price} onChange={(e) => updatePlan(selectedPlan, { price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Connection Fee</label>
                                    <input type="text" value={currentPlan.connectionFee} onChange={(e) => updatePlan(selectedPlan, { connectionFee: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                                    <input type="text" value={currentPlan.ctaText} onChange={(e) => updatePlan(selectedPlan, { ctaText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                                <input type="url" value={currentPlan.ctaLink} onChange={(e) => updatePlan(selectedPlan, { ctaLink: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="popular" checked={currentPlan.popular} onChange={(e) => updatePlan(selectedPlan, { popular: e.target.checked })} className="w-4 h-4" />
                                <label htmlFor="popular" className="text-sm font-medium text-gray-700">Mark as Popular</label>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Features</label>
                                    <button type="button" onClick={() => addFeature(selectedPlan)} className="text-sm text-blue-600 font-medium">+ Add</button>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {currentPlan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <Check size={14} className="text-green-500 flex-shrink-0" />
                                            <input type="text" value={feature} onChange={(e) => updateFeature(selectedPlan, idx, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                            <button type="button" onClick={() => removeFeature(selectedPlan, idx)} className="p-1 text-red-500 hover:bg-red-50 rounded">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "style" && (
                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Section Background" color={sectionStyle.backgroundColor} onChange={(c) => setSectionStyle({ ...sectionStyle, backgroundColor: c })} />
                        <ColorPicker label="Card Background" color={sectionStyle.cardColor} onChange={(c) => setSectionStyle({ ...sectionStyle, cardColor: c })} />
                        <ColorPicker label="Popular Card" color={sectionStyle.popularColor} onChange={(c) => setSectionStyle({ ...sectionStyle, popularColor: c })} />
                        <ColorPicker label="Text Color" color={sectionStyle.textColor} onChange={(c) => setSectionStyle({ ...sectionStyle, textColor: c })} />
                    </div>
                </div>
            )}
        </div>
    )
}
