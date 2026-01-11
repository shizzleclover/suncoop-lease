"use client"

import { useState, useEffect } from "react"
import { Sun, Zap, Battery, Home, Cpu, Rocket, Check, CreditCard, Calendar } from "lucide-react"

interface Specification {
    label: string
    value: string
}

interface PricingPlan {
    name: string
    category: string
    price: string
    specifications: Specification[]
    features: string[]
    flexpay: {
        downpayment: string
        installment: string
        duration: string
    }
    popular: boolean
    ctaText: string
    ctaLink: string
}

interface Category {
    name: string
    description: string
}

const categoryIcons: { [key: string]: any } = {
    "Home Series": Home,
    "Mini": Zap,
    "Pro": Cpu,
    "Max": Rocket,
}

const specIcons: { [key: string]: any } = {
    "Solar Panel": Sun,
    "Inverter": Zap,
    "Battery": Battery,
}

export default function FlexpayPricingSection() {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("/api/content/flexpay-pricing")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data?.plans && data.plans.length > 0) {
                    setPlans(data.plans)
                }
                if (data?.categories && data.categories.length > 0) {
                    setCategories(data.categories)
                }
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Select your power</h2>
                    <p className="text-lg text-gray-500">Loading plans...</p>
                </div>
            </section>
        )
    }

    if (plans.length === 0) {
        return (
            <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Select your power</h2>
                    <p className="text-lg mb-8 text-gray-500">Affordable subscription plans customised for you.</p>
                    <p className="text-gray-400">No pricing plans available. Add plans from the admin panel.</p>
                </div>
            </section>
        )
    }

    // Group plans by category - use categories from state or extract from plans
    const categoryNames = (categories.length > 0
        ? categories.map(c => c.name)
        : [...new Set(plans.map(p => p.category))]
    ).filter(Boolean) as string[]

    const plansByCategory: { [key: string]: PricingPlan[] } = {}

    categoryNames.forEach(cat => {
        if (cat) plansByCategory[cat] = plans.filter(p => p.category === cat)
    })

    const activeCategories = categoryNames.filter(cat => cat && plansByCategory[cat]?.length > 0)

    const renderCard = (plan: PricingPlan) => {
        const isPopular = plan.popular

        return (
            <div
                className={`
                    bg-white rounded-3xl overflow-hidden transition-all duration-300 ease-out relative
                    ${isPopular
                        ? "ring-2 ring-yellow-400 shadow-2xl"
                        : "shadow-lg hover:shadow-xl"
                    }
                `}
            >
                {/* Popular Badge */}
                {isPopular && (
                    <div className="bg-yellow-400 text-center py-2">
                        <span className="text-black text-xs font-bold uppercase tracking-wide">Most Popular</span>
                    </div>
                )}

                <div className="p-6 md:p-8">
                    {/* System Name & Price */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                                <Sun size={20} className="text-black" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-6"></div>

                    {/* Specifications */}
                    <div className="mb-6">
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Specifications</h5>
                        <div className="space-y-3">
                            {plan.specifications?.map((spec, idx) => {
                                const SpecIcon = specIcons[spec.label] || Sun
                                return (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                                            <SpecIcon size={16} className="text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">{spec.label}</p>
                                            <p className="text-sm font-medium text-gray-700">{spec.value}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Features */}
                    {plan.features && plan.features.length > 0 && (
                        <div className="mb-6">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Features</h5>
                            <div className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" strokeWidth={3} />
                                        <p className="text-sm text-gray-600">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Flexpay Details */}
                    {plan.flexpay && (
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <CreditCard size={16} className="text-yellow-600" />
                                <h5 className="text-sm font-bold text-gray-800">Flexpay Option</h5>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs">Downpayment</p>
                                    <p className="font-semibold text-gray-800">{plan.flexpay.downpayment}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Installment</p>
                                    <p className="font-semibold text-gray-800">{plan.flexpay.installment}</p>
                                </div>
                                <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-yellow-200">
                                    <Calendar size={14} className="text-yellow-600" />
                                    <p className="text-gray-600">Duration: <span className="font-semibold">{plan.flexpay.duration}</span></p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    {plan.ctaText && (
                        <a
                            href={plan.ctaLink || "#"}
                            className={`block w-full py-4 text-center font-bold text-sm rounded-full transition-all duration-200 ${isPopular
                                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                                }`}
                        >
                            {plan.ctaText}
                        </a>
                    )}
                </div>
            </div>
        )
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                {/* Main Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 mb-6">
                        <Sun size={32} className="text-black" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Select your power</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Choose from our range of solar packages with flexible payment options.
                    </p>
                </div>

                {/* Category Sections */}
                <div className="space-y-24">
                    {activeCategories.map((categoryName) => {
                        const Icon = categoryIcons[categoryName] || Sun
                        const categoryPlans = plansByCategory[categoryName]
                        const categoryData = categories.find(c => c.name === categoryName)
                        const description = categoryData?.description || ""

                        return (
                            <div key={categoryName} className="scroll-mt-24" id={categoryName.toLowerCase().replace(' ', '-')}>
                                {/* Category Header */}
                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-4xl font-bold text-gray-900">{categoryName}</h3>
                                        <p className="text-gray-500 mt-1">{description}</p>
                                    </div>
                                </div>

                                {/* Plans Grid */}
                                <div className={`grid gap-8 ${categoryPlans.length === 1 ? 'grid-cols-1 max-w-lg' :
                                    categoryPlans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' :
                                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                    }`}>
                                    {categoryPlans.map((plan, idx) => (
                                        <div key={idx}>
                                            {renderCard(plan)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
