"use client"

import { useState, useEffect } from "react"

export default function GlowEditor() {
    const [content, setContent] = useState({
        title: "Get that glow",
        description: "Experience the warmth and savings of solar energy with our hassle-free subscription model."
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content/glow")
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
        try {
            await fetch("/api/content/glow", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: "glow", ...content })
            })
            await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: "/" }) })
            setMessage("Saved!")
        } catch (error) {
            setMessage("Failed to save")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Glow Section</h1>
                    <p className="text-gray-500">Edit the "Get that glow" section</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">{message}</div>}

            <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={content.title}
                        onChange={(e) => setContent({ ...content, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        value={content.description}
                        onChange={(e) => setContent({ ...content, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    )
}
