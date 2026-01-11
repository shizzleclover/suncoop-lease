"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Zap, Sun } from "lucide-react"

interface PricingPlan {
    name: string
    category: string
    price: string
    connectionFee: string
    features: string[]
    popular: boolean
    ctaText: string
    ctaLink: string
}

export default function FlexpayPricingSection() {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [selected, setSelected] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        fetch("/api/content/flexpay-pricing")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.plans && data.plans.length > 0) {
                    setPlans(data.plans)
                    const popularIndex = data.plans.findIndex((p: PricingPlan) => p.popular)
                    if (popularIndex !== -1) setSelected(popularIndex)
                }
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    // Infinite scroll animation - only on desktop
    useEffect(() => {
        if (plans.length <= 1 || isMobile) return

        const container = scrollContainerRef.current
        if (!container) return

        let scrollPosition = 0
        const scrollSpeed = 0.5

        const animate = () => {
            if (!isPaused && container) {
                scrollPosition += scrollSpeed
                const singleSetWidth = container.scrollWidth / 2
                if (scrollPosition >= singleSetWidth) {
                    scrollPosition = 0
                }
                container.scrollLeft = scrollPosition
            }
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [plans.length, isPaused, isMobile])

    if (isLoading) {
        return (
            <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#f8f8f8" }}>
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Select your power</h2>
                    <p className="text-lg text-gray-500">Loading plans...</p>
                </div>
            </section>
        )
    }

    if (plans.length === 0) {
        return (
            <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#f8f8f8" }}>
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Select your power</h2>
                    <p className="text-lg mb-8 text-gray-500">Affordable subscription plans customised for you.</p>
                    <p className="text-gray-400">No pricing plans available. Add plans from the admin panel.</p>
                </div>
            </section>
        )
    }

    const duplicatedPlans = [...plans, ...plans]

    const renderCard = (plan: PricingPlan, index: number, isForMobile: boolean = false) => {
        const actualIndex = isForMobile ? index : index % plans.length
        const isHighlighted = plan.popular || selected === actualIndex

        return (
            <div
                key={index}
                className={`
          ${isForMobile ? "w-full" : "flex-shrink-0 w-[340px]"}
          bg-white rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-300 ease-out relative
          ${isHighlighted
                        ? "ring-2 ring-yellow-400 shadow-2xl"
                        : "shadow-lg hover:shadow-xl"
                    }
        `}
                onClick={() => setSelected(actualIndex)}
            >
                {/* Category Badge */}
                {plan.category && (
                    <div className="mb-4">
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${isHighlighted ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'}`}>
                            {plan.category}
                        </span>
                    </div>
                )}

                {/* Plan Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isHighlighted ? 'bg-yellow-400' : 'bg-gray-100'}`}>
                        <Sun size={24} className={isHighlighted ? 'text-black' : 'text-gray-600'} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Check size={18} className={isHighlighted ? "text-yellow-500" : "text-yellow-500"} strokeWidth={3} />
                            <p className="text-sm text-gray-600 leading-relaxed">{feature}</p>
                        </div>
                    ))}
                    {/* Connection Fee as a feature */}
                    <div className="flex items-start gap-3">
                        <Check size={18} className={isHighlighted ? "text-yellow-500" : "text-yellow-500"} strokeWidth={3} />
                        <p className="text-sm text-gray-600 leading-relaxed">
                            One-time setup: <span className="font-semibold">{plan.connectionFee}</span>
                        </p>
                    </div>
                </div>

                {/* Price Section */}
                <div className="mb-6">
                    <span className={`text-2xl font-bold ${isHighlighted ? 'text-yellow-500' : 'text-gray-900'}`}>
                        {plan.price}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">per month</p>
                </div>

                {/* CTA Button - Pill Shape */}
                {plan.ctaText && (
                    <a
                        href={plan.ctaLink || "#"}
                        onClick={(e) => e.stopPropagation()}
                        className={`block w-full py-3.5 text-center font-semibold text-sm rounded-full transition-all duration-200 ${isHighlighted
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-transparent border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                            }`}
                    >
                        {plan.ctaText}
                    </a>
                )}
            </div>
        )
    }

    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: "#f8f8f8" }}>
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Select your power</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Affordable subscription plans customised for your energy needs.
                    </p>
                </div>
            </div>

            {/* Mobile: Vertical scroll layout */}
            <div className="md:hidden px-4">
                <div className="flex flex-col gap-6">
                    {plans.map((plan, index) => renderCard(plan, index, true))}
                </div>
            </div>

            {/* Desktop: Horizontal infinite carousel */}
            <div
                className="hidden md:block relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 pt-4 pb-4 px-8"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        overflow: 'hidden',
                    }}
                >
                    {duplicatedPlans.map((plan, index) => renderCard(plan, index, false))}
                </div>
            </div>
        </section>
    )
}
