"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, Save, X } from "lucide-react"

interface FaqItem {
    _id?: string
    group: string
    question: string
    answer: string
    order: number
}

export default function FaqEditor() {
    const [faqs, setFaqs] = useState<FaqItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [newFaq, setNewFaq] = useState<FaqItem>({ group: "", question: "", answer: "", order: 0 })
    const [showNew, setShowNew] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchFaqs()
    }, [])

    const fetchFaqs = async () => {
        try {
            const res = await fetch("/api/faq")
            if (res.ok) {
                const data = await res.json()
                setFaqs(data)
            }
        } catch (error) {
            console.error("Failed to fetch FAQs:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async () => {
        try {
            const res = await fetch("/api/faq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFaq)
            })
            if (res.ok) {
                setNewFaq({ group: "", question: "", answer: "", order: faqs.length })
                setShowNew(false)
                fetchFaqs()
                await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
                setMessage("FAQ created!")
            }
        } catch (error) {
            setMessage("Failed to create FAQ")
        }
    }

    const handleUpdate = async (faq: FaqItem) => {
        try {
            const res = await fetch(`/api/faq/${faq._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(faq)
            })
            if (res.ok) {
                setEditingId(null)
                fetchFaqs()
                await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
                setMessage("FAQ updated!")
            }
        } catch (error) {
            setMessage("Failed to update FAQ")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this FAQ?")) return
        try {
            await fetch(`/api/faq/${id}`, { method: "DELETE" })
            fetchFaqs()
            await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
            setMessage("FAQ deleted!")
        } catch (error) {
            setMessage("Failed to delete FAQ")
        }
    }

    const groups = [...new Set(faqs.map(f => f.group))]

    if (loading) {
        return <div className="text-center py-8">Loading FAQs...</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
                    <p className="text-gray-500">Add, edit, and organize FAQ items</p>
                </div>
                <button
                    onClick={() => setShowNew(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
                >
                    <Plus size={20} /> Add FAQ
                </button>
            </div>

            {message && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
                    {message}
                </div>
            )}

            {/* New FAQ Form */}
            {showNew && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="font-bold mb-4">New FAQ Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Group (e.g., Before you GoSolar)"
                            value={newFaq.group}
                            onChange={(e) => setNewFaq({ ...newFaq, group: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Question"
                            value={newFaq.question}
                            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                            className="px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <textarea
                        placeholder="Answer"
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg mb-4"
                        rows={3}
                    />
                    <div className="flex gap-2">
                        <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                            Create
                        </button>
                        <button onClick={() => setShowNew(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* FAQ List by Group */}
            {groups.map(group => (
                <div key={group} className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        {group}
                    </h2>
                    <div className="bg-white rounded-lg shadow">
                        {faqs.filter(f => f.group === group).map((faq) => (
                            <div key={faq._id} className="border-b last:border-b-0 p-4">
                                {editingId === faq._id ? (
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={faq.question}
                                            onChange={(e) => setFaqs(faqs.map(f => f._id === faq._id ? { ...f, question: e.target.value } : f))}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                        <textarea
                                            value={faq.answer}
                                            onChange={(e) => setFaqs(faqs.map(f => f._id === faq._id ? { ...f, answer: e.target.value } : f))}
                                            className="w-full px-3 py-2 border rounded"
                                            rows={2}
                                        />
                                        <div className="flex gap-2">
                                            <button onClick={() => handleUpdate(faq)} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded">
                                                <Save size={16} /> Save
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded">
                                                <X size={16} /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">{faq.question}</p>
                                            <p className="text-gray-500 text-sm mt-1">{faq.answer}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditingId(faq._id!)} className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(faq._id!)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {faqs.length === 0 && !showNew && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No FAQs yet. Click "Add FAQ" to create one.</p>
                </div>
            )}
        </div>
    )
}
