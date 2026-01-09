"use client"

import { useState, useEffect } from "react"

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

export default function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>(defaultPlans)
  const [selected, setSelected] = useState(1)

  useEffect(() => {
    fetch("/api/content/pricing")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.plans && data.plans.length > 0) {
          setPlans(data.plans)
          // Select the popular one by default
          const popularIndex = data.plans.findIndex((p: PricingPlan) => p.popular)
          if (popularIndex !== -1) setSelected(popularIndex)
        }
      })
      .catch(() => { })
  }, [])

  return (
    <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#ffcd00" }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">Select your power</h2>
        <p className="text-center text-lg mb-16 font-normal">Affordable subscription plans customised for you.</p>

        <div className="flex flex-col md:flex-row justify-center gap-8 items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`text-center rounded-3xl px-8 md:px-12 py-12 cursor-pointer hover:opacity-90 transition w-full md:w-80 transform ${plan.popular || selected === index ? "md:scale-110 shadow-lg" : "md:scale-95"
                }`}
              style={{
                backgroundColor: plan.popular || selected === index ? "#ffffff" : "#000000",
                color: plan.popular || selected === index ? "#000000" : "#ffcd00",
              }}
              onClick={() => setSelected(index)}
            >
              <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
              {plan.subtitle && (
                <p className={`text-sm mb-4 ${plan.popular || selected === index ? "text-gray-600" : "opacity-90"}`}>
                  {plan.subtitle}
                </p>
              )}
              <p className="text-5xl font-bold mb-2">{plan.price}</p>
              <p className={`text-sm mb-6 ${plan.popular || selected === index ? "text-gray-600" : "opacity-90"}`}>
                {plan.period}
              </p>
              {plan.features.map((feature, idx) => (
                <p
                  key={idx}
                  className={`text-xs ${plan.popular || selected === index ? "text-gray-600" : "opacity-80"}`}
                >
                  {feature}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
