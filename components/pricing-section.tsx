"use client"

import { useState, useEffect, useRef } from "react"
import { Check } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  connectionFee: string
  features: string[]
  popular: boolean
  ctaText: string
  ctaLink: string
}

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

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

  // Infinite scroll animation
  useEffect(() => {
    if (plans.length <= 1) return

    const container = scrollContainerRef.current
    if (!container) return

    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed

        // Get the width of one set of cards
        const singleSetWidth = container.scrollWidth / 2

        // Reset when we've scrolled one full set
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
  }, [plans.length, isPaused])

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

  // Duplicate plans for infinite scroll effect
  const duplicatedPlans = [...plans, ...plans]

  return (
    <section className="py-20" style={{ backgroundColor: "#ffcd00" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">Select your power</h2>
        <p className="text-center text-lg mb-12 font-normal">Affordable subscription plans customised for you.</p>
      </div>

      {/* Infinite Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
      >
        {/* Scrollable Container - no scrollbar, controlled by JS */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 pt-6 pb-4 px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflow: 'hidden',
          }}
        >
          {duplicatedPlans.map((plan, index) => {
            const isHighlighted = plan.popular || selected === (index % plans.length)
            return (
              <div
                key={index}
                className={`flex-shrink-0 w-[280px] md:w-[320px] rounded-none border-2 p-4 md:p-6 cursor-pointer transition-all duration-300 ease-out relative ${isHighlighted
                  ? "shadow-xl scale-[1.02] z-10 border-white"
                  : "hover:shadow-lg border-black/20"
                  }`}
                style={{
                  backgroundColor: isHighlighted ? "#ffffff" : "#000000",
                  color: isHighlighted ? "#000000" : "#ffcd00",
                }}
                onClick={() => setSelected(index % plans.length)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-md"
                    style={{ top: '-14px' }}
                  >
                    POPULAR
                  </div>
                )}

                {/* Plan Name - Now larger */}
                <h3 className="text-2xl md:text-4xl font-extrabold mb-2 mt-2">{plan.name}</h3>

                {/* Price - Now smaller */}
                <p className="text-lg md:text-2xl font-black">{plan.price}</p>
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
    </section>
  )
}
