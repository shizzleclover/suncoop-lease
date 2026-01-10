"use client"

import { useState, useEffect } from "react"

interface CtaBannerContent {
    headline: string
    buttonText: string
    buttonLink: string
    backgroundColor: string
    textColor: string
    buttonColor: string
    buttonTextColor: string
}

const defaultContent: CtaBannerContent = {
    headline: "Yes! Turn my world sunny side up",
    buttonText: "I'm interested",
    buttonLink: "https://wa.me/27108803948",
    backgroundColor: "#ffcd00",
    textColor: "#000000",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
}

export default function CtaBanner() {
    const [content, setContent] = useState<CtaBannerContent>(defaultContent)

    useEffect(() => {
        fetch("/api/content/cta-banner")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
    }, [])

    const handleInterest = () => {
        window.location.href = content.buttonLink
    }

    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="max-w-3xl mx-auto">
                {/* Yellow banner - fully responsive */}
                <div
                    className="rounded-full py-3 sm:py-4 md:py-5 px-4 sm:px-8 md:px-12 flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6"
                    style={{ backgroundColor: content.backgroundColor }}
                >
                    <h3 className="text-xs sm:text-base md:text-xl font-bold text-center" style={{ color: content.textColor }}>
                        <span className="font-extrabold">Yes!</span> {content.headline.replace('Yes! ', '').replace('Yes!', '')}
                    </h3>
                    <button
                        onClick={handleInterest}
                        className="px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
                        style={{ backgroundColor: content.buttonColor, color: content.buttonTextColor }}
                    >
                        {content.buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}
