"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  period: string
  features: string[]
  popular: boolean
  ctaText: string
  ctaLink: string
  subtitle?: string
}

const defaultPlans: PricingPlan[] = [
  {
    name: "Save",
    subtitle: "without battery",
    price: "R1299",
    period: "per month",
    features: ["For households spending R2000+ on electricity per month."],
    popular: false,
    ctaText: "Get Started",
    ctaLink: "https://wa.me/27108803948",
  },
  {
    name: "Save & secure",
    subtitle: "with battery",
    price: "R1699",
    period: "per month",
    features: ["For households spending R3000+ on electricity per month."],
    popular: true,
    ctaText: "Get Started",
    ctaLink: "https://wa.me/27108803948",
  },
]

const INITIAL_VISIBLE_COUNT = 4

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans)
  const [selected, setSelected] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/content/pricing")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.plans && data.plans.length > 0) {
          setPlans(data.plans)
          const popularIndex = data.plans.findIndex((p: PricingPlan) => p.popular)
          if (popularIndex !== -1) setSelected(popularIndex)
        }
      })
      .catch(() => { })
  }, [])

  // Calculate content height for smooth animation
  useEffect(() => {
    if (gridRef.current) {
      setContentHeight(gridRef.current.scrollHeight)
    }
  }, [plans, isExpanded])

  const visiblePlans = isExpanded ? plans : plans.slice(0, INITIAL_VISIBLE_COUNT)
  const hasMore = plans.length > INITIAL_VISIBLE_COUNT

  const getGridClass = () => {
    const count = visiblePlans.length
    if (count <= 2) return "grid-cols-2"
    if (count === 3) return "grid-cols-2 md:grid-cols-3"
    if (count === 4) return "grid-cols-2 lg:grid-cols-4"
    if (count <= 6) return "grid-cols-2 lg:grid-cols-3"
    if (count <= 8) return "grid-cols-2 lg:grid-cols-4"
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  }

  return (
    <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#ffcd00" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">Select your power</h2>
        <p className="text-center text-lg mb-16 font-normal">Affordable subscription plans customised for you.</p>

        {/* Animated Container */}
        <div
          className="overflow-hidden transition-[max-height] duration-700 ease-in-out"
          style={{
            maxHeight: isExpanded ? '3000px' : '850px',
          }}
        >
          <div
            ref={gridRef}
            className={`grid ${getGridClass()} gap-6 justify-items-center`}
          >
            {visiblePlans.map((plan, index) => {
              const isHighlighted = plan.popular || selected === index
              return (
                <div
                  key={index}
                  className={`text-center rounded-none border-2 px-4 py-6 cursor-pointer transition-all duration-300 ease-out w-full relative ${isHighlighted ? "shadow-xl scale-105 z-10 border-white" : "hover:shadow-lg hover:scale-[1.02] border-black/20"
                    }`}
                  style={{
                    backgroundColor: isHighlighted ? "#ffffff" : "#000000",
                    color: isHighlighted ? "#000000" : "#ffcd00",
                    animationDelay: `${index * 50}ms`,
                  }}
                  onClick={() => setSelected(index)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className={`text-sm mb-4 ${isHighlighted ? "text-gray-600" : "opacity-90"}`}>
                      {plan.subtitle}
                    </p>
                  )}
                  <p className="text-4xl md:text-5xl font-bold mb-2">{plan.price}</p>
                  <p className={`text-sm mb-6 ${isHighlighted ? "text-gray-600" : "opacity-90"}`}>
                    {plan.period}
                  </p>
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <p
                        key={idx}
                        className={`text-xs ${isHighlighted ? "text-gray-600" : "opacity-80"}`}
                      >
                        {feature}
                      </p>
                    ))}
                  </div>
                  {plan.ctaText && (
                    <a
                      href={plan.ctaLink || "#"}
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-block mt-6 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isHighlighted
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-yellow-400 text-black hover:bg-yellow-300"
                        }`}
                    >
                      {plan.ctaText}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Apple Liquid Glass Button */}
        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-500 ease-out overflow-hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              }}
            >
              {/* Glassmorphism Shine Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                }}
              />

              {/* Button Content */}
              <span className="relative z-10 text-black/80">
                {isExpanded ? (
                  <>
                    Show Less
                  </>
                ) : (
                  <>
                    Show More ({plans.length - INITIAL_VISIBLE_COUNT} more)
                  </>
                )}
              </span>

              {/* Animated Icon */}
              <span className={`relative z-10 transition-transform duration-500 ease-out ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown size={20} className="text-black/80" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
