"use client"

import { useState, useEffect } from "react"

export default function FooterEditor() {
    const [content, setContent] = useState({
        phone: "010 880 3948",
        email: "help@suncoopng.co.za",
        whatsapp: "27108803948"
    })
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content/footer")
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
            await fetch("/api/content/footer", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: "footer", ...content })
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
                    <h1 className="text-3xl font-bold text-gray-800">Footer Settings</h1>
                    <p className="text-gray-500">Edit contact information and links</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="text"
                        value={content.phone}
                        onChange={(e) => setContent({ ...content, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={content.email}
                        onChange={(e) => setContent({ ...content, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number (with country code, no +)</label>
                    <input
                        type="text"
                        value={content.whatsapp}
                        onChange={(e) => setContent({ ...content, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                        placeholder="e.g., 27108803948"
                    />
                </div>
            </div>
        </div>
    )
}
