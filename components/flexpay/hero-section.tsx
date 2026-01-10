"use client"

import { useState, useEffect } from "react"

interface HeroContent {
    headline: string
    subheadline: string
    ctaText: string
    benefits: string[]
}

const defaultContent: HeroContent = {
    headline: "Flexpay - Pay Your Way",
    subheadline: "Flexible payment options for solar energy",
    ctaText: "GET STARTED",
    benefits: ["Flexible payments", "No hidden fees", "Easy setup"]
}

export default function FlexpayHeroSection() {
    const [content, setContent] = useState<HeroContent | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("/api/content/flexpay-hero")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setContent({ ...defaultContent, ...data })
                } else {
                    setContent(defaultContent)
                }
            })
            .catch(() => {
                setContent(defaultContent)
            })
            .finally(() => setIsLoading(false))
    }, [])

    const handleInterest = () => {
        window.location.href = "https://wa.me/27108803948"
    }

    // Use default while loading to avoid hydration mismatch
    const displayContent = content || defaultContent

    // Split headline into lines
    const headlineParts = displayContent.headline.split('\n').length > 1
        ? displayContent.headline.split('\n')
        : displayContent.headline.split(' ').reduce((acc: string[], word, i, arr) => {
            if (i < Math.ceil(arr.length / 2)) {
                acc[0] = (acc[0] || '') + ' ' + word
            } else {
                acc[1] = (acc[1] || '') + ' ' + word
            }
            return acc
        }, ['', ''])

    return (
        <section
            className="text-black pt-20 sm:pt-24 md:pt-32 pb-0 px-4 sm:px-6 md:px-12 relative overflow-hidden min-h-[80vh] sm:min-h-[85vh] md:min-h-[85vh]"
            style={{ backgroundColor: "#ffcd00" }}
        >
            {/* Decorative Sun Spiral - Top Left */}
            <div className="absolute top-12 md:top-16 left-4 md:left-12 w-32 h-32 md:w-48 md:h-48 opacity-30">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#000" strokeWidth="3" opacity="0.3" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="#000" strokeWidth="3" opacity="0.3" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="#000" strokeWidth="3" opacity="0.3" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="#000" strokeWidth="3" opacity="0.3" />
                </svg>
            </div>

            {/* Left Cloud */}
            <div className="absolute bottom-32 md:bottom-24 left-0 md:left-8 w-40 md:w-64">
                <svg viewBox="0 0 200 100" className="w-full h-auto">
                    <ellipse cx="60" cy="60" rx="50" ry="35" fill="white" />
                    <ellipse cx="100" cy="50" rx="45" ry="40" fill="white" />
                    <ellipse cx="140" cy="60" rx="50" ry="35" fill="white" />
                    <ellipse cx="100" cy="70" rx="70" ry="30" fill="white" />
                </svg>
            </div>

            {/* Right Cloud */}
            <div className="absolute bottom-40 md:bottom-32 right-0 md:right-8 w-36 md:w-56">
                <svg viewBox="0 0 200 100" className="w-full h-auto">
                    <ellipse cx="60" cy="60" rx="45" ry="30" fill="white" />
                    <ellipse cx="100" cy="50" rx="40" ry="35" fill="white" />
                    <ellipse cx="140" cy="60" rx="45" ry="30" fill="white" />
                    <ellipse cx="100" cy="70" rx="60" ry="25" fill="white" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto pb-24 md:pb-32 relative z-10">
                {/* Main headline and subheading */}
                <div className="text-center mb-8 md:mb-12 pt-8 md:pt-16">
                    <h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 leading-[1.1] tracking-tight"
                        suppressHydrationWarning
                    >
                        {headlineParts[0]?.trim()}
                        <br />
                        {headlineParts[1]?.trim()}
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 font-medium" suppressHydrationWarning>
                        {displayContent.subheadline}
                    </p>
                </div>

                {/* Three benefits with checkmarks */}
                <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 mb-10 md:mb-14 flex-wrap" suppressHydrationWarning>
                    {displayContent.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div
                                className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0"
                                style={{ backgroundColor: "#000000" }}
                            >
                                <span className="text-white text-lg md:text-xl font-bold">✓</span>
                            </div>
                            <p className="text-center text-sm md:text-base font-semibold leading-tight max-w-[120px]">
                                {benefit}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        onClick={handleInterest}
                        className="rounded-full px-10 py-4 md:px-12 md:py-5 font-extrabold text-lg md:text-xl hover:opacity-90 transition-opacity relative overflow-hidden"
                        style={{ backgroundColor: "#000000", color: "#ffffff" }}
                        suppressHydrationWarning
                    >
                        {displayContent.ctaText}
                    </button>
                </div>
            </div>

            {/* Decorative Wave Bottom */}
            <div className="absolute bottom-0 left-0 right-0 w-full">
                <svg
                    viewBox="0 0 1440 80"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 C240,80 480,40 720,50 C960,60 1200,80 1440,60 L1440,80 L0,80 Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    )
}
