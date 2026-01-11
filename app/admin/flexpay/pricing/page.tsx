"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, Star, ChevronDown, ChevronUp } from "lucide-react"

interface Specification {
    label: string
    value: string
}

interface PricingPlan {
    name: string
    category: string
    price: string
    specifications: Specification[]
    features: string[]
    flexpay: {
        downpayment: string
        installment: string
        duration: string
    }
    popular: boolean
    ctaText: string
    ctaLink: string
}

interface Category {
    name: string
    description: string
}

const defaultCategories: Category[] = [
    { name: "Home Series", description: "Complete solar solutions for residential homes" },
    { name: "Mini", description: "Compact power systems for essential needs" },
    { name: "Pro", description: "Professional-grade systems for medium to large homes" },
    { name: "Max", description: "Maximum power for businesses and large properties" },
]

const defaultPlans: PricingPlan[] = [
    {
        name: "3kVA System",
        category: "Home Series",
        price: "₦3,500,000",
        specifications: [
            { label: "Solar Panel", value: "2kW Mono solar panel" },
            { label: "Inverter", value: "3kW Hybrid Inverter" },
            { label: "Battery", value: "5kW Lithium battery" },
        ],
        features: ["5 years warranty on battery", "Free installation", "24/7 Support"],
        flexpay: {
            downpayment: "₦500,000",
            installment: "₦250,000/month",
            duration: "12 months"
        },
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "5kVA System",
        category: "Home Series",
        price: "₦5,500,000",
        specifications: [
            { label: "Solar Panel", value: "4kW Mono solar panel" },
            { label: "Inverter", value: "5kW Hybrid Inverter" },
            { label: "Battery", value: "10kW Lithium battery" },
        ],
        features: ["5 years warranty on battery", "Free installation", "24/7 Support", "Smart monitoring"],
        flexpay: {
            downpayment: "₦800,000",
            installment: "₦400,000/month",
            duration: "12 months"
        },
        popular: true,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "1.5kVA System",
        category: "Mini",
        price: "₦1,200,000",
        specifications: [
            { label: "Solar Panel", value: "1kW Mono solar panel" },
            { label: "Inverter", value: "1.5kW Inverter" },
            { label: "Battery", value: "2.5kW Lithium battery" },
        ],
        features: ["3 years warranty on battery", "Free installation"],
        flexpay: {
            downpayment: "₦200,000",
            installment: "₦85,000/month",
            duration: "12 months"
        },
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "7.5kVA System",
        category: "Pro",
        price: "₦8,500,000",
        specifications: [
            { label: "Solar Panel", value: "6kW Mono solar panel" },
            { label: "Inverter", value: "7.5kW Hybrid Inverter" },
            { label: "Battery", value: "15kW Lithium battery" },
        ],
        features: ["7 years warranty on battery", "Free installation", "24/7 Support", "Smart monitoring", "Priority service"],
        flexpay: {
            downpayment: "₦1,500,000",
            installment: "₦585,000/month",
            duration: "12 months"
        },
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
    {
        name: "10kVA System",
        category: "Max",
        price: "₦12,000,000",
        specifications: [
            { label: "Solar Panel", value: "8kW Mono solar panel" },
            { label: "Inverter", value: "10kW Hybrid Inverter" },
            { label: "Battery", value: "20kW Lithium battery" },
        ],
        features: ["10 years warranty on battery", "Free installation", "24/7 Support", "Smart monitoring", "Priority service", "Annual maintenance"],
        flexpay: {
            downpayment: "₦2,000,000",
            installment: "₦835,000/month",
            duration: "12 months"
        },
        popular: false,
        ctaText: "Get Started",
        ctaLink: "https://wa.me/27108803948",
    },
]

export default function FlexpayPricingEditor() {
    const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans)
    const [categories, setCategories] = useState<Category[]>(defaultCategories)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [selectedPlan, setSelectedPlan] = useState<number>(0)
    const [activeTab, setActiveTab] = useState<"plans" | "categories">("plans")
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        specs: true,
        features: true,
        flexpay: true
    })

    useEffect(() => {
        fetch("/api/content/flexpay-pricing")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.plans && data.plans.length > 0) {
                    // Normalize plans to ensure all required fields exist
                    const normalizedPlans = data.plans.map((plan: Partial<PricingPlan>) => ({
                        name: plan.name || "Unnamed System",
                        category: plan.category || "Home Series",
                        price: plan.price || "₦0",
                        specifications: plan.specifications || [],
                        features: plan.features || [],
                        flexpay: plan.flexpay || { downpayment: "₦0", installment: "₦0/month", duration: "12 months" },
                        popular: plan.popular || false,
                        ctaText: plan.ctaText || "Get Started",
                        ctaLink: plan.ctaLink || "https://wa.me/27108803948"
                    }))
                    setPlans(normalizedPlans)
                }
                if (data?.categories && data.categories.length > 0) setCategories(data.categories)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            console.log("[Admin] Saving plans:", plans)
            console.log("[Admin] Saving categories:", categories)
            const res = await fetch("/api/content/flexpay-pricing", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plans, categories }),
            })
            const responseData = await res.json()
            console.log("[Admin] Save response:", res.status, responseData)
            if (res.ok) {
                setMessage("Saved successfully!")
                await fetch("/api/revalidate?path=/flexpay")
            } else {
                setMessage(`Failed to save: ${responseData.error || 'Unknown error'}`)
            }
        } catch (err) {
            console.error("[Admin] Save error:", err)
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 5000)
        }
    }

    const addPlan = () => {
        const newPlan: PricingPlan = {
            name: "New System",
            category: "Home Series",
            price: "₦0",
            specifications: [
                { label: "Solar Panel", value: "" },
                { label: "Inverter", value: "" },
                { label: "Battery", value: "" },
            ],
            features: ["Feature 1"],
            flexpay: {
                downpayment: "₦0",
                installment: "₦0/month",
                duration: "12 months"
            },
            popular: false,
            ctaText: "Get Started",
            ctaLink: "https://wa.me/27108803948"
        }
        setPlans([...plans, newPlan])
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

    // Specification helpers
    const addSpec = (planIndex: number) => {
        const newPlans = [...plans]
        newPlans[planIndex].specifications.push({ label: "", value: "" })
        setPlans(newPlans)
    }

    const updateSpec = (planIndex: number, specIndex: number, field: "label" | "value", value: string) => {
        const newPlans = [...plans]
        newPlans[planIndex].specifications[specIndex][field] = value
        setPlans(newPlans)
    }

    const removeSpec = (planIndex: number, specIndex: number) => {
        const newPlans = [...plans]
        newPlans[planIndex].specifications = newPlans[planIndex].specifications.filter((_, i) => i !== specIndex)
        setPlans(newPlans)
    }

    // Feature helpers
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

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
            </div>
        )
    }

    const currentPlan = plans[selectedPlan]

    // Group plans by category for sidebar
    const plansByCategory: { [key: string]: { plan: PricingPlan; index: number }[] } = {}
    plans.forEach((plan, index) => {
        if (!plansByCategory[plan.category]) plansByCategory[plan.category] = []
        plansByCategory[plan.category].push({ plan, index })
    })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Flexpay Pricing</h1>
                    <p className="text-gray-500 text-sm">Manage solar system packages by category</p>
                </div>
                <div className="flex items-center gap-3">
                    {activeTab === "plans" && (
                        <button onClick={addPlan} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Plus size={18} /> Add Plan
                        </button>
                    )}
                    {activeTab === "categories" && (
                        <button onClick={() => setCategories([...categories, { name: "New Category", description: "" }])} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Plus size={18} /> Add Category
                        </button>
                    )}
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50">
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

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("plans")}
                    className={`px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "plans" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}
                >
                    Plans ({plans.length})
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    className={`px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "categories" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}
                >
                    Categories ({categories.length})
                </button>
            </div>

            {/* Categories Management Tab */}
            {activeTab === "categories" && (
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500 mb-4">Manage product categories. Each category groups multiple solar system packages.</p>
                    <div className="space-y-4">
                        {categories.map((category, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                        <input
                                            type="text"
                                            value={category.name}
                                            onChange={(e) => {
                                                const newCategories = [...categories]
                                                newCategories[idx].name = e.target.value
                                                setCategories(newCategories)
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            placeholder="e.g., Home Series"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <input
                                            type="text"
                                            value={category.description}
                                            onChange={(e) => {
                                                const newCategories = [...categories]
                                                newCategories[idx].description = e.target.value
                                                setCategories(newCategories)
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            placeholder="Category description"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Plans Tab */}
            {activeTab === "plans" && (
                <div className="grid grid-cols-4 gap-6">
                    {/* Sidebar - Plans grouped by category */}
                    <div className="space-y-4">
                        {categories.map(category => (
                            <div key={category.name}>
                                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">{category.name}</h3>
                                <div className="space-y-1">
                                    {(plansByCategory[category.name] || []).map(({ plan, index }) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedPlan(index)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-left text-sm ${selectedPlan === index ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:bg-gray-50"}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                {plan.popular && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                                                <span className="font-medium truncate">{plan.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                    {(!plansByCategory[category.name] || plansByCategory[category.name].length === 0) && (
                                        <p className="text-xs text-gray-400 px-3 py-2">No plans</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edit Panel */}
                    {currentPlan && (
                        <div className="col-span-3 space-y-4">
                            {/* Basic Info */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg">Basic Info</h3>
                                    <button onClick={() => deletePlan(selectedPlan)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
                                        <input type="text" value={currentPlan.name} onChange={(e) => updatePlan(selectedPlan, { name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., 3kVA System" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select value={currentPlan.category} onChange={(e) => updatePlan(selectedPlan, { category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                                            {categories.map(cat => (
                                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input type="text" value={currentPlan.price} onChange={(e) => updatePlan(selectedPlan, { price: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., ₦3,500,000" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <input type="checkbox" id="popular" checked={currentPlan.popular} onChange={(e) => updatePlan(selectedPlan, { popular: e.target.checked })} className="w-4 h-4" />
                                    <label htmlFor="popular" className="text-sm font-medium text-gray-700">Mark as Popular</label>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="bg-white rounded-lg shadow">
                                <button onClick={() => toggleSection('specs')} className="w-full flex items-center justify-between p-4 font-bold text-lg">
                                    Specifications ({currentPlan.specifications?.length || 0})
                                    {expandedSections.specs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSections.specs && (
                                    <div className="px-6 pb-6 space-y-3">
                                        {(currentPlan.specifications || []).map((spec, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <input type="text" value={spec.label} onChange={(e) => updateSpec(selectedPlan, idx, "label", e.target.value)} className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Label (e.g., Solar Panel)" />
                                                <input type="text" value={spec.value} onChange={(e) => updateSpec(selectedPlan, idx, "value", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Value (e.g., 2kW Mono solar panel)" />
                                                <button onClick={() => removeSpec(selectedPlan, idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">×</button>
                                            </div>
                                        ))}
                                        <button onClick={() => addSpec(selectedPlan)} className="text-sm text-yellow-600 font-medium">+ Add Specification</button>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-lg shadow">
                                <button onClick={() => toggleSection('features')} className="w-full flex items-center justify-between p-4 font-bold text-lg">
                                    Features ({currentPlan.features?.length || 0})
                                    {expandedSections.features ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSections.features && (
                                    <div className="px-6 pb-6 space-y-2">
                                        {(currentPlan.features || []).map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <input type="text" value={feature} onChange={(e) => updateFeature(selectedPlan, idx, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                                <button onClick={() => removeFeature(selectedPlan, idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">×</button>
                                            </div>
                                        ))}
                                        <button onClick={() => addFeature(selectedPlan)} className="text-sm text-yellow-600 font-medium">+ Add Feature</button>
                                    </div>
                                )}
                            </div>

                            {/* Flexpay Details */}
                            <div className="bg-white rounded-lg shadow">
                                <button onClick={() => toggleSection('flexpay')} className="w-full flex items-center justify-between p-4 font-bold text-lg">
                                    Flexpay Details
                                    {expandedSections.flexpay ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSections.flexpay && (
                                    <div className="px-6 pb-6 grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Downpayment</label>
                                            <input type="text" value={currentPlan.flexpay?.downpayment || ""} onChange={(e) => updatePlan(selectedPlan, { flexpay: { ...currentPlan.flexpay, downpayment: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., ₦500,000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Installment</label>
                                            <input type="text" value={currentPlan.flexpay?.installment || ""} onChange={(e) => updatePlan(selectedPlan, { flexpay: { ...currentPlan.flexpay, installment: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., ₦250,000/month" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <input type="text" value={currentPlan.flexpay?.duration || ""} onChange={(e) => updatePlan(selectedPlan, { flexpay: { ...currentPlan.flexpay, duration: e.target.value } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g., 12 months" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="font-bold text-lg mb-4">Call-to-Action</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                        <input type="text" value={currentPlan.ctaText} onChange={(e) => updatePlan(selectedPlan, { ctaText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                                        <input type="url" value={currentPlan.ctaLink} onChange={(e) => updatePlan(selectedPlan, { ctaLink: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

