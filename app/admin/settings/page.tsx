"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Phone, Mail, MessageCircle, Palette } from "lucide-react"
import ColorPicker from "@/components/admin/color-picker"
import ImageUploader from "@/components/admin/image-uploader"

interface SiteSettings {
    // Contact
    whatsappNumber: string
    phoneNumber: string
    email: string
    // Branding
    primaryColor: string
    secondaryColor: string
    accentColor: string
    logoUrl: string
    // Social
    facebookUrl: string
    twitterUrl: string
    instagramUrl: string
    linkedinUrl: string
}

const defaultSettings: SiteSettings = {
    whatsappNumber: "27108803948",
    phoneNumber: "010 880 3948",
    email: "help@suncoopng.co.za",
    primaryColor: "#ffcd00",
    secondaryColor: "#000000",
    accentColor: "#4ade80",
    logoUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
}

export default function SiteSettingsEditor() {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")
    const [activeTab, setActiveTab] = useState<"contact" | "branding" | "social">("contact")

    useEffect(() => {
        fetch("/api/content/settings")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) setSettings({ ...defaultSettings, ...data })
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
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
                    <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
                    <p className="text-gray-500 text-sm">Global settings for your website</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Settings"}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button onClick={() => setActiveTab("contact")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "contact" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    <Phone size={18} /> Contact
                </button>
                <button onClick={() => setActiveTab("branding")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "branding" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    <Palette size={18} /> Branding
                </button>
                <button onClick={() => setActiveTab("social")} className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 -mb-px ${activeTab === "social" ? "text-yellow-600 border-yellow-500" : "text-gray-500 border-transparent"}`}>
                    Social Media
                </button>
            </div>

            {activeTab === "contact" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500">These contact details are used across all CTA buttons and contact sections.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <MessageCircle size={16} /> WhatsApp Number
                            </label>
                            <input
                                type="text"
                                value={settings.whatsappNumber}
                                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                                placeholder="27108803948"
                            />
                            <p className="text-xs text-gray-400 mt-1">Format: country code + number (no + or spaces)</p>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Phone size={16} /> Phone Number
                            </label>
                            <input
                                type="tel"
                                value={settings.phoneNumber}
                                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "branding" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500">Brand colors and logo used across the site.</p>
                    <div className="grid grid-cols-3 gap-6">
                        <ColorPicker label="Primary Color (Yellow)" color={settings.primaryColor} onChange={(c) => setSettings({ ...settings, primaryColor: c })} />
                        <ColorPicker label="Secondary Color (Black)" color={settings.secondaryColor} onChange={(c) => setSettings({ ...settings, secondaryColor: c })} />
                        <ColorPicker label="Accent Color (Green)" color={settings.accentColor} onChange={(c) => setSettings({ ...settings, accentColor: c })} />
                    </div>
                    <ImageUploader label="Logo Image" value={settings.logoUrl} onChange={(url) => setSettings({ ...settings, logoUrl: url })} />
                </div>
            )}

            {activeTab === "social" && (
                <div className="space-y-6 bg-white rounded-lg shadow p-6">
                    <p className="text-sm text-gray-500">Social media links displayed in the footer.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                            <input type="url" value={settings.facebookUrl} onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" placeholder="https://facebook.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X URL</label>
                            <input type="url" value={settings.twitterUrl} onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" placeholder="https://twitter.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                            <input type="url" value={settings.instagramUrl} onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" placeholder="https://instagram.com/..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                            <input type="url" value={settings.linkedinUrl} onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400" placeholder="https://linkedin.com/..." />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
