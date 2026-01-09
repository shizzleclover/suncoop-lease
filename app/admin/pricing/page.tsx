"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Save, X, Star } from "lucide-react"

interface PricingPlan {
    _id?: string
    name: string
    price: string
    features: string[]
    isPopular: boolean
    order: number
}

export default function PricingEditor() {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showNew, setShowNew] = useState(false)
    const [newPlan, setNewPlan] = useState<PricingPlan>({ name: "", price: "", features: [""], isPopular: false, order: 0 })
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            const res = await fetch("/api/content/pricing")
            if (res.ok) {
                const data = await res.json()
                if (data?.plans) setPlans(data.plans)
            }
        } catch (error) {
            console.error("Failed to fetch:", error)
        } finally {
            setLoading(false)
        }
    }

    const savePlans = async (updatedPlans: PricingPlan[]) => {
        try {
            await fetch("/api/content/pricing", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: "pricing", plans: updatedPlans })
            })
            await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
            setMessage("Saved!")
        } catch (error) {
            setMessage("Failed to save")
        }
    }

    const handleCreate = async () => {
        const updatedPlans = [...plans, { ...newPlan, order: plans.length }]
        setPlans(updatedPlans)
        await savePlans(updatedPlans)
        setNewPlan({ name: "", price: "", features: [""], isPopular: false, order: 0 })
        setShowNew(false)
    }

    const handleUpdate = async (plan: PricingPlan, index: number) => {
        const updatedPlans = [...plans]
        updatedPlans[index] = plan
        setPlans(updatedPlans)
        await savePlans(updatedPlans)
        setEditingId(null)
    }

    const handleDelete = async (index: number) => {
        if (!confirm("Delete this plan?")) return
        const updatedPlans = plans.filter((_, i) => i !== index)
        setPlans(updatedPlans)
        await savePlans(updatedPlans)
    }

    const addFeature = (index: number) => {
        const updatedPlans = [...plans]
        updatedPlans[index].features.push("")
        setPlans(updatedPlans)
    }

    const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
        const updatedPlans = [...plans]
        updatedPlans[planIndex].features[featureIndex] = value
        setPlans(updatedPlans)
    }

    if (loading) return <div className="text-center py-8">Loading...</div>

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Pricing Plans</h1>
                    <p className="text-gray-500">Manage your subscription plans</p>
                </div>
                <button
                    onClick={() => setShowNew(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
                >
                    <Plus size={20} /> Add Plan
                </button>
            </div>

            {message && <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>}

            {/* New Plan Form */}
            {showNew && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="font-bold mb-4">New Pricing Plan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Plan Name"
                            value={newPlan.name}
                            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Price (e.g., R1299/month)"
                            value={newPlan.price}
                            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={newPlan.isPopular}
                                onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                            />
                            Mark as Popular
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-lg">Create</button>
                        <button onClick={() => setShowNew(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                    <div key={idx} className={`bg-white rounded-lg shadow p-6 ${plan.isPopular ? 'ring-2 ring-yellow-400' : ''}`}>
                        {plan.isPopular && (
                            <div className="flex items-center gap-1 text-yellow-600 text-sm font-bold mb-2">
                                <Star size={16} fill="currentColor" /> Most Popular
                            </div>
                        )}
                        {editingId === `plan-${idx}` ? (
                            <div className="space-y-3">
                                <input
                                    value={plan.name}
                                    onChange={(e) => { const p = [...plans]; p[idx].name = e.target.value; setPlans(p) }}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Plan Name"
                                />
                                <input
                                    value={plan.price}
                                    onChange={(e) => { const p = [...plans]; p[idx].price = e.target.value; setPlans(p) }}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Price"
                                />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Features:</label>
                                    {plan.features.map((f, fi) => (
                                        <input
                                            key={fi}
                                            value={f}
                                            onChange={(e) => updateFeature(idx, fi, e.target.value)}
                                            className="w-full px-3 py-2 border rounded text-sm"
                                            placeholder={`Feature ${fi + 1}`}
                                        />
                                    ))}
                                    <button onClick={() => addFeature(idx)} className="text-sm text-blue-500">+ Add Feature</button>
                                </div>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={plan.isPopular}
                                        onChange={(e) => { const p = [...plans]; p[idx].isPopular = e.target.checked; setPlans(p) }}
                                    />
                                    Popular
                                </label>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdate(plan, idx)} className="flex-1 px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                                    <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-1 bg-gray-300 rounded text-sm">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">{plan.name || "Untitled"}</h3>
                                <p className="text-2xl font-extrabold text-yellow-600 mb-4">{plan.price || "Price"}</p>
                                <ul className="space-y-2 mb-4">
                                    {plan.features.filter(f => f).map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <span className="text-green-500">✓</span> {f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setEditingId(`plan-${idx}`)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {plans.length === 0 && !showNew && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No pricing plans yet. Click "Add Plan" to create one.</p>
                </div>
            )}
        </div>
    )
}
