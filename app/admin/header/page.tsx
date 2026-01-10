"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, ArrowUp, ArrowDown, Link as LinkIcon } from "lucide-react"
import ImageUploader from "@/components/admin/image-uploader"

interface NavItem {
    label: string
    href: string
}

interface HeaderContent {
    logoUrl: string
    navItems: NavItem[]
    ctaButtonText: string
    whatsappNumber: string
}

const defaultContent: HeaderContent = {
    logoUrl: "/suncoopng-logo.png",
    navItems: [
        { label: "FLEXGRID", href: "/" },
        { label: "FLEXPAY", href: "/flexpay" },
        { label: "INSTALLERS", href: "#installers" },
        { label: "CONTACT", href: "#contact" },
        { label: "I'M INTERESTED", href: "#interested" },
    ],
    ctaButtonText: "I'M INTERESTED",
    whatsappNumber: "27108803948",
}

export default function HeaderEditor() {
    const [content, setContent] = useState<HeaderContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("/api/content/header")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/header", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            })
            if (res.ok) {
                setMessage("Saved successfully!")
                await fetch("/api/revalidate?path=/")
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

    const addNavItem = () => {
        setContent({
            ...content,
            navItems: [...content.navItems, { label: "NEW LINK", href: "#" }]
        })
    }

    const updateNavItem = (index: number, updates: Partial<NavItem>) => {
        const newItems = [...content.navItems]
        newItems[index] = { ...newItems[index], ...updates }
        setContent({ ...content, navItems: newItems })
    }

    const deleteNavItem = (index: number) => {
        setContent({ ...content, navItems: content.navItems.filter((_, i) => i !== index) })
    }

    const moveNavItem = (index: number, direction: "up" | "down") => {
        const newItems = [...content.navItems]
        const newIndex = direction === "up" ? index - 1 : index + 1
        if (newIndex < 0 || newIndex >= newItems.length) return
            ;[newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]]
        setContent({ ...content, navItems: newItems })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Header / Navigation</h1>
                    <p className="text-gray-500 text-sm">Edit logo, navigation links, and CTA</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            {/* Logo Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Logo</h3>
                <ImageUploader label="Logo Image" value={content.logoUrl} onChange={(url) => setContent({ ...content, logoUrl: url })} />
            </div>

            {/* CTA Settings */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Call-to-Action Button</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                        <input
                            type="text"
                            value={content.ctaButtonText}
                            onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                        <input
                            type="text"
                            value={content.whatsappNumber}
                            onChange={(e) => setContent({ ...content, whatsappNumber: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            placeholder="27108803948"
                        />
                        <p className="text-xs text-gray-400 mt-1">Format: country code + number (no + or spaces)</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Navigation Links ({content.navItems.length})</h3>
                    <button onClick={addNavItem} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Plus size={18} /> Add Link
                    </button>
                </div>

                <div className="space-y-3">
                    {content.navItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => moveNavItem(index, "up")} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                                    <ArrowUp size={14} />
                                </button>
                                <button onClick={() => moveNavItem(index, "down")} disabled={index === content.navItems.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                                    <ArrowDown size={14} />
                                </button>
                            </div>
                            <span className="text-gray-400 font-bold text-sm w-6">{index + 1}</span>
                            <input
                                type="text"
                                value={item.label}
                                onChange={(e) => updateNavItem(index, { label: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold"
                                placeholder="Link label"
                            />
                            <LinkIcon size={16} className="text-gray-400" />
                            <input
                                type="text"
                                value={item.href}
                                onChange={(e) => updateNavItem(index, { href: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="/page or #section"
                            />
                            <button onClick={() => deleteNavItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
