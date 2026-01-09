"use client"

import { ArrowRight, Lightbulb, FileCheck, Monitor, CreditCard, Calendar, Smartphone, Wrench } from "lucide-react"

const steps = [
  {
    icon: Lightbulb,
    label: "Show Interest",
    description: "Click 'I'm interested' to start",
    color: "#ffcd00",
    active: true
  },
  {
    icon: FileCheck,
    label: "Get Quote",
    description: "Receive your custom proposal",
    color: "#e8e8e8",
    active: false
  },
  {
    icon: Monitor,
    label: "Online Approval",
    description: "Complete verification online",
    color: "#e8e8e8",
    active: false
  },
  {
    icon: CreditCard,
    label: "Set Up Payment",
    description: "Easy monthly subscription",
    color: "#e8e8e8",
    active: false
  },
  {
    icon: Calendar,
    label: "Book Date",
    description: "Choose installation date",
    color: "#e8e8e8",
    active: false
  },
  {
    icon: Smartphone,
    label: "Get App",
    description: "Monitor your solar system",
    color: "#e8e8e8",
    active: false
  },
  {
    icon: Wrench,
    label: "Installation",
    description: "We handle everything",
    color: "#e8e8e8",
    active: false
  },
]

export default function SignUpJourney() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">The sign up journey</h2>
          <p className="text-gray-600 text-lg">Quick and easy — from interest to installation</p>
        </div>

        {/* Desktop Layout - Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === steps.length - 1
              return (
                <div key={idx} className="flex items-center flex-1">
                  {/* Step Card */}
                  <div className="flex flex-col items-center text-center group">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${step.active ? "shadow-lg" : ""
                        }`}
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon size={28} className={step.active ? "text-black" : "text-gray-600"} />
                    </div>
                    <p className={`text-sm font-bold mb-1 ${step.active ? "text-black" : "text-gray-700"}`}>
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
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === steps.length - 1
              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${step.active ? "shadow-lg scale-110" : ""
                      }`}
                    style={{ backgroundColor: step.color }}
                  >
                    <Icon size={28} className={step.active ? "text-black" : "text-gray-600"} />
                  </div>

                  {/* Label */}
                  <p className={`font-bold text-base mt-3 ${step.active ? "text-black" : "text-gray-700"}`}>
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
