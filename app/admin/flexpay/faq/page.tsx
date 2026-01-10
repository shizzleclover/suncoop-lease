"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface FAQ {
    _id?: string
    group: string
    question: string
    answer: string
    order: number
}

const defaultGroups = ["Before you GoSolar", "The Flexpay solution", "Installation", "Post installation", "Referral programme"]

export default function FlexpayFAQEditor() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [groups, setGroups] = useState<string[]>(defaultGroups)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    useEffect(() => {
        fetch("/api/flexpay/faq")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setFaqs(data)
                    const uniqueGroups = [...new Set(data.map((f: FAQ) => f.group))]
                    setGroups([...new Set([...defaultGroups, ...uniqueGroups])])
                }
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            for (const faq of faqs) {
                if (faq._id) {
                    await fetch(`/api/flexpay/faq/${faq._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(faq),
                    })
                } else {
                    await fetch("/api/flexpay/faq", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(faq),
                    })
                }
            }
            setMessage("Saved successfully!")
            await fetch("/api/revalidate?path=/flexpay")
        } catch {
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 3000)
        }
    }

    const addFAQ = () => {
        setFaqs([...faqs, { group: groups[0], question: "New question?", answer: "Answer here...", order: faqs.length }])
        setExpandedIndex(faqs.length)
    }

    const updateFAQ = (index: number, updates: Partial<FAQ>) => {
        const newFaqs = [...faqs]
        newFaqs[index] = { ...newFaqs[index], ...updates }
        setFaqs(newFaqs)
    }

    const deleteFAQ = async (index: number) => {
        const faq = faqs[index]
        if (faq._id) {
            await fetch(`/api/flexpay/faq/${faq._id}`, { method: "DELETE" })
        }
        setFaqs(faqs.filter((_, i) => i !== index))
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
                    <h1 className="text-2xl font-bold text-gray-800">Flexpay FAQ Section</h1>
                    <p className="text-gray-500 text-sm">Manage frequently asked questions for Flexpay</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={addFAQ} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Plus size={18} /> Add FAQ
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

            <div className="space-y-3">
                {faqs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">No FAQs yet</p>
                        <button onClick={addFAQ} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400">
                            Add Your First FAQ
                        </button>
                    </div>
                ) : (
                    faqs.map((faq, index) => (
                        <div key={faq._id || index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="flex items-center gap-3 p-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => updateFAQ(index, { question: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 font-medium"
                                        placeholder="Question"
                                    />
                                </div>
                                <select
                                    value={faq.group}
                                    onChange={(e) => updateFAQ(index, { group: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                >
                                    {groups.map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                                <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                    {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                                <button onClick={() => deleteFAQ(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            {expandedIndex === index && (
                                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                                    <textarea
                                        value={faq.answer}
                                        onChange={(e) => updateFAQ(index, { answer: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                                        rows={4}
                                        placeholder="Enter the answer..."
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
