"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Lightbulb, FileCheck, Monitor, CreditCard, Calendar, Smartphone, Wrench, Check, Star, Heart } from "lucide-react"

interface JourneyStep {
  icon: string
  label: string
  description: string
}

interface JourneyContent {
  title: string
  subtitle: string
  steps: JourneyStep[]
}

const defaultContent: JourneyContent = {
  title: "The sign up journey",
  subtitle: "Quick and easy — from interest to installation",
  steps: [
    { icon: "lightbulb", label: "Show Interest", description: "Click 'I'm interested' to start" },
    { icon: "filecheck", label: "Get Quote", description: "Receive your custom proposal" },
    { icon: "monitor", label: "Online Approval", description: "Complete verification online" },
    { icon: "creditcard", label: "Set Up Payment", description: "Easy monthly subscription" },
    { icon: "calendar", label: "Book Date", description: "Choose installation date" },
    { icon: "smartphone", label: "Get App", description: "Monitor your solar system" },
    { icon: "wrench", label: "Installation", description: "We handle everything" },
  ]
}

const iconMap: { [key: string]: any } = {
  lightbulb: Lightbulb,
  filecheck: FileCheck,
  monitor: Monitor,
  creditcard: CreditCard,
  calendar: Calendar,
  smartphone: Smartphone,
  wrench: Wrench,
  check: Check,
  star: Star,
  heart: Heart,
}

export default function SignUpJourney() {
  const [content, setContent] = useState<JourneyContent>(defaultContent)

  useEffect(() => {
    fetch("/api/content/journey")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setContent({ ...defaultContent, ...data })
      })
      .catch(() => { })
  }, [])

  return (
    <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{content.title}</h2>
          <p className="text-gray-600 text-lg">{content.subtitle}</p>
        </div>

        {/* Desktop Layout - Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            {content.steps.map((step, idx) => {
              const Icon = iconMap[step.icon] || Lightbulb
              const isLast = idx === content.steps.length - 1
              const isFirst = idx === 0
              return (
                <div key={idx} className="flex items-center flex-1">
                  {/* Step Card */}
                  <div className="flex flex-col items-center text-center group">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${isFirst ? "shadow-lg" : ""}`}
                      style={{ backgroundColor: isFirst ? "#ffcd00" : "#e8e8e8" }}
                    >
                      <Icon size={28} className={isFirst ? "text-black" : "text-gray-600"} />
                    </div>
                    <p className={`text-sm font-bold mb-1 ${isFirst ? "text-black" : "text-gray-700"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 max-w-[100px]">{step.description}</p>
                  </div>

                  {/* Arrow Connector */}
                  {!isLast && (
                    <div className="flex-1 flex items-center justify-center px-2">
                      <div className="w-full h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 relative">
                        <ArrowRight
                          size={20}
                          className="absolute -right-2 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Layout - Centered Vertical Timeline */}
        <div className="md:hidden">
          <div className="flex flex-col items-center">
            {content.steps.map((step, idx) => {
              const Icon = iconMap[step.icon] || Lightbulb
              const isLast = idx === content.steps.length - 1
              const isFirst = idx === 0
              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${isFirst ? "shadow-lg scale-110" : ""}`}
                    style={{ backgroundColor: isFirst ? "#ffcd00" : "#e8e8e8" }}
                  >
                    <Icon size={28} className={isFirst ? "text-black" : "text-gray-600"} />
                  </div>

                  {/* Label */}
                  <p className={`font-bold text-base mt-3 ${isFirst ? "text-black" : "text-gray-700"}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 text-center max-w-[200px]">{step.description}</p>

                  {/* Arrow Down - Centered */}
                  {!isLast && (
                    <div className="my-4">
                      <svg width="24" height="32" viewBox="0 0 24 32" className="text-gray-300">
                        <path
                          d="M12 0 L12 24 M4 18 L12 28 L20 18"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-4 shadow-lg">
            <p className="text-gray-600">
              Ready to start? Click <span className="font-bold text-black">"I'm interested"</span>
            </p>
            <ArrowRight className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>
    </section>
  )
}
