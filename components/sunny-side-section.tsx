"use client"

import { useState, useEffect } from "react"

interface Feature {
    title: string
    description: string
}

interface SunnySideContent {
    headline: string
    headlineSecond: string
    description: string
    ctaText: string
    ctaButtonText: string
    ctaButtonLink: string
    features: Feature[]
    backgroundColor: string
    ctaColor: string
}

const defaultContent: SunnySideContent = {
    headline: "Turn your world",
    headlineSecond: "sunny-side up",
    description: "As a Suncoopng sunscriber you get a top of the range home solar system, without huge expenses and hassle. It really is that easy!",
    ctaText: "Subscribe to the sun!",
    ctaButtonText: "I'm interested",
    ctaButtonLink: "https://wa.me/27108803948",
    features: [
        { title: "Reliability", description: "The sun never lets you down. So, welcome to your interruption-free life." },
        { title: "Affordability", description: "No big, upfront capital outlay, just one affordable, fixed monthly fee that gives you peace of mind, lower costs, savings, and clean, reliable, sustainable energy." },
        { title: "Sustainability", description: "Your support for the planet is higher and your carbon footprint is lower." },
        { title: "Cost control", description: "Your money goes much further as you reduce your electricity bills and avoid rising electricity costs." },
        { title: "Peace of mind", description: "Your system always operates at peak performance. There is no Will it? Or Won't it?." }
    ],
    backgroundColor: "#f5f5f5",
    ctaColor: "#ffcd00"
}

export default function SunnySideSection() {
    const [content, setContent] = useState<SunnySideContent>(defaultContent)

    useEffect(() => {
        fetch("/api/content/sunny-side")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
    }, [])

    const handleInterest = () => {
        window.location.href = content.ctaButtonLink
    }

    return (
        <section className="py-12 md:py-16 px-6 md:px-12" style={{ backgroundColor: content.backgroundColor }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {/* Left column - Headline */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                            {content.headline}
                            <br />
                            {content.headlineSecond}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            {content.description}
                        </p>
                    </div>

                    {/* Middle column - Features 1-3 */}
                    <div className="lg:col-span-1 space-y-6">
                        {content.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex gap-3">
                                <span className="text-yellow-400 text-lg flex-shrink-0">✦</span>
                                <div>
                                    <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right column - Features 4+ */}
                    <div className="lg:col-span-1 space-y-6">
                        {content.features.slice(3).map((feature, idx) => (
                            <div key={idx} className="flex gap-3">
                                <span className="text-yellow-400 text-lg flex-shrink-0">✦</span>
                                <div>
                                    <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div
                    className="rounded-full py-2.5 sm:py-4 md:py-5 px-4 sm:px-6 md:px-12 flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6"
                    style={{ backgroundColor: content.ctaColor }}
                >
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold text-black text-center sm:text-left whitespace-nowrap">
                        {content.ctaText}
                    </h3>
                    <button
                        onClick={handleInterest}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                        style={{ backgroundColor: "#000000" }}
                    >
                        {content.ctaButtonText}
                    </button>
                </div>
            </div>
        </section>
    )
}
