"use client"

import Link from "next/link"
import {
    Home, Sparkles, Star, DollarSign, HelpCircle,
    FileText, CheckCircle, RefreshCw, ExternalLink,
    Palette, Image, Type, GripVertical
} from "lucide-react"

const sections = [
    { name: "Hero Section", href: "/admin/flexpay/hero", description: "Headline, CTA, colors, and background", Icon: Home, features: ["Rich Text", "Colors", "Images"] },
    { name: "Glow Section", href: "/admin/flexpay/glow", description: "Title, description, and styling", Icon: Sparkles, features: ["Colors", "Images"] },
    { name: "Benefits", href: "/admin/flexpay/benefits", description: "Drag-drop benefit cards", Icon: Star, features: ["Drag-Drop", "Icons"] },
    { name: "Pricing", href: "/admin/flexpay/pricing", description: "Plans, features, and pricing", Icon: DollarSign, features: ["Plans", "Colors"] },
    { name: "FAQ", href: "/admin/flexpay/faq", description: "Rich text answers, groups", Icon: HelpCircle, features: ["Rich Text", "Groups"] },
    { name: "Footer", href: "/admin/flexpay/footer", description: "Contact info and social links", Icon: FileText, features: ["Colors", "Links"] },
]

const capabilities = [
    { icon: Type, label: "Rich Text Editor", description: "Format text with bold, italic, headings, and links" },
    { icon: Palette, label: "Color Picker", description: "Choose any color for backgrounds and text" },
    { icon: Image, label: "Image Upload", description: "Upload images to Cloudinary" },
    { icon: GripVertical, label: "Drag & Drop", description: "Reorder sections and items" },
]

export default function FlexpayAdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Flexpay CMS</h1>
                <p className="text-gray-500 mt-1">Manage content for the Flexpay page</p>
            </div>

            {/* Capabilities */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">CMS Capabilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {capabilities.map((cap, idx) => {
                        const Icon = cap.icon
                        return (
                            <div key={idx} className="bg-white rounded-lg shadow p-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                                    <Icon size={20} className="text-blue-600" />
                                </div>
                                <h3 className="font-medium text-gray-800">{cap.label}</h3>
                                <p className="text-sm text-gray-500 mt-1">{cap.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <FileText size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Sections</p>
                            <p className="text-2xl font-bold">6</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Status</p>
                            <p className="text-2xl font-bold text-green-600">Live</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <RefreshCw size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Last Updated</p>
                            <p className="text-2xl font-bold">Today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Cards */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Flexpay Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section) => {
                    const IconComponent = section.Icon
                    return (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                                    <IconComponent size={20} className="text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {section.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">{section.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {section.features.map((feature, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* View Site Link */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-blue-800">Preview Flexpay page</p>
                        <p className="text-blue-600 text-sm">Open the Flexpay page to see your edits in real-time</p>
                    </div>
                    <Link
                        href="/flexpay"
                        target="_blank"
                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center gap-2"
                    >
                        View Flexpay <ExternalLink size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
