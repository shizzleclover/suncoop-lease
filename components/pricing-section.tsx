"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Check } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  connectionFee: string
  features: string[]
  popular: boolean
  ctaText: string
  ctaLink: string
}

// No default plans - fetch from database only
const INITIAL_VISIBLE_COUNT = 4

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [selected, setSelected] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
      .finally(() => setIsLoading(false))
  }, [])

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
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  // Show nothing if no plans and still loading
  if (isLoading) {
    return (
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#ffcd00" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Select your power</h2>
          <p className="text-lg">Loading plans...</p>
        </div>
      </section>
    )
  }

  // Show message if no plans exist
  if (plans.length === 0) {
    return (
      <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#ffcd00" }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Select your power</h2>
          <p className="text-lg mb-8">Affordable subscription plans customised for you.</p>
          <p className="text-gray-700">No pricing plans available. Add plans from the admin panel.</p>
        </div>
      </section>
    )
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
            maxHeight: isExpanded ? '5000px' : '1200px',
          }}
        >
          <div
            ref={gridRef}
            className={`grid ${getGridClass()} gap-4 md:gap-6`}
          >
            {visiblePlans.map((plan, index) => {
              const isHighlighted = plan.popular || selected === index
              return (
                <div
                  key={index}
                  className={`rounded-none border-2 p-4 md:p-6 cursor-pointer transition-all duration-300 ease-out w-full relative ${isHighlighted ? "shadow-xl scale-[1.02] z-10 border-white" : "hover:shadow-lg hover:scale-[1.01] border-black/20"
                    }`}
                  style={{
                    backgroundColor: isHighlighted ? "#ffffff" : "#000000",
                    color: isHighlighted ? "#000000" : "#ffcd00",
                  }}
                  onClick={() => setSelected(index)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-lg md:text-2xl font-extrabold mb-2">{plan.name}</h3>

                  {/* Price */}
                  <p className="text-2xl md:text-4xl font-black">{plan.price}</p>
                  <p className={`text-sm font-semibold mb-4 ${isHighlighted ? "text-gray-600" : "opacity-90"}`}>
                    per month
                  </p>

                  {/* Connection Fee */}
                  <div className={`text-sm font-semibold mb-4 pb-4 border-b ${isHighlighted ? "border-gray-200 text-gray-700" : "border-yellow-400/30"}`}>
                    Connection Fee: <span className="font-extrabold">{plan.connectionFee}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className={`text-sm font-extrabold mb-3 ${isHighlighted ? "text-gray-800" : ""}`}>
                      Features
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check size={16} className={`flex-shrink-0 mt-0.5 ${isHighlighted ? "text-green-600" : "text-yellow-400"}`} strokeWidth={3} />
                        <p className={`text-xs md:text-sm font-medium ${isHighlighted ? "text-gray-700" : ""}`}>
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {plan.ctaText && (
                    <a
                      href={plan.ctaLink || "#"}
                      onClick={(e) => e.stopPropagation()}
                      className={`block mt-6 px-4 py-3 text-center font-bold text-sm transition-all duration-300 ${isHighlighted
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

        {/* Show More / Show Less Button */}
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
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                }}
              />
              <span className="relative z-10 text-black/80">
                {isExpanded ? "Show Less" : `Show More (${plans.length - INITIAL_VISIBLE_COUNT} more)`}
              </span>
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
