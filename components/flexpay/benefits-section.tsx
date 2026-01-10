"use client"

import { useState, useEffect } from "react"

interface Benefit {
    _id?: string
    icon: string
    title: string
    subtitle: string
    iconType?: string
    order?: number
}

const defaultBenefits: Benefit[] = [
    { icon: "calendar", title: "No big upfront costs.", subtitle: "Just one simple monthly subscription." },
    { icon: "flexibility", title: "Full flexibility.", subtitle: "Upgrade or cancel any time." },
    { icon: "support", title: "24/7 on-call", subtitle: "support." },
    { icon: "maintenance", title: "Maintenance", subtitle: "included." },
    { icon: "monitor", title: "We monitor and manage your system", subtitle: "so you don't have to." },
    { icon: "app", title: "Convenient real time app to track and manage", subtitle: "system performance." },
    { icon: "power", title: "Uninterrupted", subtitle: "power." },
    { icon: "install", title: "We install", subtitle: "within 2 weeks." }
]

export default function FlexpayBenefitsSection() {
    const [benefits, setBenefits] = useState<Benefit[]>(defaultBenefits)

    useEffect(() => {
        fetch("/api/flexpay/benefits")
            .then(res => res.ok ? res.json() : [])
            .then((data: any[]) => {
                if (data && data.length > 0) {
                    setBenefits(data.map(b => ({
                        icon: b.iconType || b.icon || "calendar",
                        title: b.title,
                        subtitle: b.subtitle
                    })))
                }
            })
            .catch(() => { })
    }, [])

    const renderIcon = (iconType: string) => {
        const iconSize = "w-full h-full p-4"

        switch (iconType) {
            case "calendar":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <rect x="15" y="20" width="50" height="45" rx="4" fill="white" stroke="#333" strokeWidth="2" />
                        <rect x="15" y="20" width="50" height="12" fill="#4ade80" rx="4" />
                        <rect x="25" y="10" width="4" height="15" rx="2" fill="#333" />
                        <rect x="51" y="10" width="4" height="15" rx="2" fill="#333" />
                        <text x="40" y="52" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">31</text>
                    </svg>
                )
            case "flexibility":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <path d="M20,50 Q40,20 60,50" fill="none" stroke="#333" strokeWidth="3" />
                        <polygon points="55,45 65,50 55,55" fill="#333" />
                        <path d="M60,30 Q40,60 20,30" fill="none" stroke="#333" strokeWidth="3" />
                        <polygon points="25,35 15,30 25,25" fill="#333" />
                    </svg>
                )
            case "support":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <circle cx="35" cy="30" r="10" fill="#333" />
                        <path d="M20,65 Q20,45 35,45 Q50,45 50,65" fill="#333" />
                        <circle cx="55" cy="35" r="12" fill="none" stroke="#333" strokeWidth="2" />
                        <line x1="55" y1="27" x2="55" y2="35" stroke="#333" strokeWidth="2" />
                        <line x1="55" y1="35" x2="62" y2="35" stroke="#333" strokeWidth="2" />
                    </svg>
                )
            case "maintenance":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <circle cx="50" cy="40" r="18" fill="none" stroke="#333" strokeWidth="2" />
                        <circle cx="50" cy="40" r="6" fill="#333" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                            <rect
                                key={i}
                                x="48" y="20" width="4" height="8" fill="#333"
                                transform={`rotate(${angle}, 50, 40)`}
                            />
                        ))}
                        <path d="M15,25 L25,35 L25,55 L15,65 L20,55 L20,35 Z" fill="#333" />
                    </svg>
                )
            case "monitor":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <rect x="10" y="25" width="45" height="30" rx="2" fill="white" stroke="#333" strokeWidth="2" />
                        <rect x="25" y="55" width="15" height="5" fill="#333" />
                        <rect x="20" y="60" width="25" height="3" fill="#333" />
                        <polyline points="15,45 25,35 35,42 50,30" fill="none" stroke="#e11d48" strokeWidth="2" />
                        <circle cx="50" cy="30" r="3" fill="#e11d48" />
                    </svg>
                )
            case "app":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <rect x="25" y="10" width="30" height="55" rx="4" fill="#1a1a2e" stroke="#333" strokeWidth="1" />
                        <rect x="28" y="18" width="24" height="40" fill="#333" />
                        <circle cx="40" cy="62" r="2" fill="#666" />
                        <rect x="32" y="28" width="16" height="4" fill="#ffcd00" />
                        <rect x="32" y="36" width="16" height="4" fill="#ffcd00" />
                        <rect x="32" y="44" width="16" height="4" fill="#ffcd00" />
                    </svg>
                )
            case "power":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <rect x="25" y="20" width="30" height="45" rx="4" fill="white" stroke="#333" strokeWidth="2" />
                        <rect x="35" y="15" width="10" height="5" fill="#333" />
                        <path d="M33,42 Q40,35 47,42 Q40,49 33,42" fill="none" stroke="#333" strokeWidth="2" />
                        <polygon points="30,25 35,22 33,28" fill="#ffcd00" />
                        <polygon points="50,25 45,22 47,28" fill="#ffcd00" />
                    </svg>
                )
            case "install":
                return (
                    <svg viewBox="0 0 80 80" className={iconSize}>
                        <circle cx="45" cy="40" r="22" fill="white" stroke="#333" strokeWidth="2" />
                        <circle cx="45" cy="40" r="3" fill="#333" />
                        <line x1="45" y1="25" x2="45" y2="40" stroke="#333" strokeWidth="2" />
                        <line x1="45" y1="40" x2="55" y2="45" stroke="#333" strokeWidth="2" />
                        <text x="45" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">2</text>
                        <polygon points="15,30 25,25 20,35" fill="#ffcd00" />
                        <polygon points="20,35 25,25 30,30" fill="#ffcd00" />
                    </svg>
                )
            default:
                return null
        }
    }

    return (
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">The benefits</h2>
                    <p className="text-gray-600 text-base md:text-lg">This is what sets us apart.</p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                            {/* Icon Circle */}
                            <div
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-4"
                                style={{ backgroundColor: "#ffcd00" }}
                            >
                                {renderIcon(benefit.icon)}
                            </div>
                            {/* Text */}
                            <p className="text-sm md:text-base font-medium leading-snug">
                                {benefit.title}
                                <br />
                                <span className="text-gray-600">{benefit.subtitle}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
