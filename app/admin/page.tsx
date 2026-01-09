"use client"

import Link from "next/link"
import {
    Home, Sparkles, Star, DollarSign, HelpCircle,
    FileText, PlusSquare, Layers, CheckCircle, RefreshCw, ExternalLink
} from "lucide-react"

const sections = [
    { name: "Hero Section", href: "/admin/hero", description: "Edit the main headline and benefits", Icon: Home },
    { name: "Glow Section", href: "/admin/glow", description: "Manage the 'Get that glow' section", Icon: Sparkles },
    { name: "Benefits", href: "/admin/benefits", description: "Add/edit benefit cards", Icon: Star },
    { name: "Pricing", href: "/admin/pricing", description: "Update pricing plans", Icon: DollarSign },
    { name: "FAQ", href: "/admin/faq", description: "Manage frequently asked questions", Icon: HelpCircle },
    { name: "Footer", href: "/admin/footer", description: "Edit footer content and links", Icon: FileText },
    { name: "Custom Sections", href: "/admin/sections", description: "Create new page sections", Icon: PlusSquare },
]

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your website content</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Layers size={24} className="text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Sections</p>
                            <p className="text-2xl font-bold">7</p>
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
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <RefreshCw size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Last Updated</p>
                            <p className="text-2xl font-bold">Today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Cards */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Sections</h2>
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
                                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                    <IconComponent size={20} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                                        {section.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">{section.description}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* View Site Link */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-yellow-800">Preview your changes</p>
                        <p className="text-yellow-600 text-sm">Open the public website to see your edits</p>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2"
                    >
                        View Site <ExternalLink size={16} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
