"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"

interface Benefit {
    _id?: string
    title: string
    subtitle: string
    iconType: string
    order: number
}

const iconOptions = [
    { value: "calendar", label: "📅 Calendar" },
    { value: "arrows", label: "↔️ Arrows" },
    { value: "clock", label: "🕐 Clock" },
    { value: "wrench", label: "🔧 Wrench" },
    { value: "chart", label: "📊 Chart" },
    { value: "phone", label: "📱 Phone" },
    { value: "battery", label: "🔋 Battery" },
    { value: "timer", label: "⏱️ Timer" },
]

export default function BenefitsEditor() {
    const [benefits, setBenefits] = useState<Benefit[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showNew, setShowNew] = useState(false)
    const [newBenefit, setNewBenefit] = useState<Benefit>({ title: "", subtitle: "", iconType: "calendar", order: 0 })
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchBenefits()
    }, [])

    const fetchBenefits = async () => {
        try {
            const res = await fetch("/api/benefits")
            if (res.ok) {
                const data = await res.json()
                setBenefits(data)
            }
        } catch (error) {
            console.error("Failed to fetch:", error)
        } finally {
            setLoading(false)
        }
    }

    const revalidate = async () => {
        await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
    }

    const handleCreate = async () => {
        try {
            const res = await fetch("/api/benefits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...newBenefit, order: benefits.length })
            })
            if (res.ok) {
                setNewBenefit({ title: "", subtitle: "", iconType: "calendar", order: 0 })
                setShowNew(false)
                fetchBenefits()
                await revalidate()
                setMessage("Benefit created!")
            }
        } catch (error) {
            setMessage("Failed to create")
        }
    }

    const handleUpdate = async (benefit: Benefit) => {
        try {
            await fetch(`/api/benefits/${benefit._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(benefit)
            })
            setEditingId(null)
            fetchBenefits()
            await revalidate()
            setMessage("Benefit updated!")
        } catch (error) {
            setMessage("Failed to update")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this benefit?")) return
        try {
            await fetch(`/api/benefits/${id}`, { method: "DELETE" })
            fetchBenefits()
            await revalidate()
            setMessage("Benefit deleted!")
        } catch (error) {
            setMessage("Failed to delete")
        }
    }

    if (loading) return <div className="text-center py-8">Loading...</div>

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Benefits Section</h1>
                    <p className="text-gray-500">Manage the benefit cards displayed on the site</p>
                </div>
                <button
                    onClick={() => setShowNew(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
                >
                    <Plus size={20} /> Add Benefit
                </button>
            </div>

            {message && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>
            )}

            {/* New Benefit Form */}
            {showNew && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="font-bold mb-4">New Benefit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newBenefit.title}
                            onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Subtitle"
                            value={newBenefit.subtitle}
                            onChange={(e) => setNewBenefit({ ...newBenefit, subtitle: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <select
                            value={newBenefit.iconType}
                            onChange={(e) => setNewBenefit({ ...newBenefit, iconType: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        >
                            {iconOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-lg">Create</button>
                        <button onClick={() => setShowNew(false)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                    </div>
                </div>
            )}

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit) => (
                    <div key={benefit._id} className="bg-white rounded-lg shadow p-4">
                        {editingId === benefit._id ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={benefit.title}
                                    onChange={(e) => setBenefits(benefits.map(b => b._id === benefit._id ? { ...b, title: e.target.value } : b))}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Title"
                                />
                                <input
                                    type="text"
                                    value={benefit.subtitle}
                                    onChange={(e) => setBenefits(benefits.map(b => b._id === benefit._id ? { ...b, subtitle: e.target.value } : b))}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                    placeholder="Subtitle"
                                />
                                <select
                                    value={benefit.iconType}
                                    onChange={(e) => setBenefits(benefits.map(b => b._id === benefit._id ? { ...b, iconType: e.target.value } : b))}
                                    className="w-full px-3 py-2 border rounded text-sm"
                                >
                                    {iconOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdate(benefit)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-500 text-white rounded text-sm">
                                        <Save size={14} /> Save
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-300 rounded text-sm">
                                        <X size={14} /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-3 mx-auto text-2xl">
                                    {iconOptions.find(i => i.value === benefit.iconType)?.label.split(" ")[0] || "📌"}
                                </div>
                                <p className="font-bold text-center text-sm">{benefit.title}</p>
                                <p className="text-gray-500 text-center text-xs mt-1">{benefit.subtitle}</p>
                                <div className="flex justify-center gap-2 mt-3">
                                    <button onClick={() => setEditingId(benefit._id!)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(benefit._id!)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {benefits.length === 0 && !showNew && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No benefits yet. Click "Add Benefit" to create one.</p>
                </div>
            )}
        </div>
    )
}
