"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
    Menu, X, LayoutDashboard, Home, Sparkles, Star,
    HelpCircle, DollarSign, FileText, PlusSquare,
    LogOut, ExternalLink, ChevronLeft, ChevronRight, CreditCard
} from "lucide-react"

const navItems = [
    { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/admin/hero", label: "Hero Section", Icon: Home },
    { href: "/admin/glow", label: "Glow Section", Icon: Sparkles },
    { href: "/admin/benefits", label: "Benefits", Icon: Star },
    { href: "/admin/faq", label: "FAQ", Icon: HelpCircle },
    { href: "/admin/pricing", label: "Pricing", Icon: DollarSign },
    { href: "/admin/footer", label: "Footer", Icon: FileText },
    { href: "/admin/sections", label: "Custom Sections", Icon: PlusSquare },
    { href: "/admin/flexpay", label: "Flexpay CMS", Icon: CreditCard },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Check localStorage for auth
        const auth = localStorage.getItem('admin-auth')
        setIsAuthenticated(auth === 'authenticated')

        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setSidebarOpen(true)
            }
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [pathname])

    // Redirect to login if not authenticated
    useEffect(() => {
        if (isAuthenticated === false && pathname !== '/admin/login') {
            router.push('/admin/login')
        }
    }, [isAuthenticated, pathname, router])

    // Close sidebar on mobile after navigation
    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false)
        }
    }, [pathname, isMobile])

    const handleLogout = () => {
        localStorage.removeItem('admin-auth')
        setIsAuthenticated(false)
        router.push('/admin/login')
    }

    // Show loading while checking auth
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
        )
    }

    // Show loading while redirecting
    if (!isAuthenticated && pathname !== '/admin/login') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
        )
    }

    // Login page - no sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden bg-gray-900 text-white px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
                <h1 className="text-lg font-bold text-yellow-400">Suncoopng Admin</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-800 rounded"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`
            bg-gray-900 text-white transition-all duration-300 flex-shrink-0
            fixed md:relative z-50 h-full md:h-auto
            ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}
            ${isMobile ? 'top-14' : 'top-0'}
          `}
                    style={{ minHeight: isMobile ? 'calc(100vh - 56px)' : '100vh' }}
                >
                    <div className={`p-4 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                        {/* Desktop header */}
                        <div className="hidden md:flex items-center justify-between mb-8">
                            {sidebarOpen && (
                                <h1 className="text-xl font-bold text-yellow-400">Suncoopng</h1>
                            )}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 hover:bg-gray-800 rounded"
                            >
                                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const IconComponent = item.Icon
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${pathname === item.href
                                            ? 'bg-yellow-500 text-black'
                                            : 'hover:bg-gray-800'
                                            }`}
                                    >
                                        <IconComponent size={20} />
                                        {(sidebarOpen || isMobile) && <span className="text-sm">{item.label}</span>}
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="mt-8 pt-4 border-t border-gray-700">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 w-full text-red-400 hover:bg-gray-800 rounded transition-colors"
                            >
                                <LogOut size={20} />
                                {(sidebarOpen || isMobile) && <span className="text-sm">Logout</span>}
                            </button>

                            <Link
                                href="/"
                                target="_blank"
                                className="flex items-center gap-3 px-3 py-2 mt-2 w-full text-blue-400 hover:bg-gray-800 rounded transition-colors"
                            >
                                <ExternalLink size={20} />
                                {(sidebarOpen || isMobile) && <span className="text-sm">View Site</span>}
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`
          flex-1 p-4 md:p-6 overflow-auto min-h-screen
          ${isMobile ? 'mt-14' : ''}
          ${sidebarOpen && !isMobile ? 'md:ml-0' : ''}
        `}>
                    {children}
                </main>
            </div>
        </div>
    )
}
