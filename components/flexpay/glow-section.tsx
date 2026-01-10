"use client"

import { useState, useEffect } from "react"

interface GlowContent {
    title: string
    description: string
}

const defaultContent: GlowContent = {
    title: "Get that glow",
    description: "With affordable, reliable and fully maintained home solar."
}

export default function FlexpayGlowSection() {
    const [content, setContent] = useState<GlowContent>(defaultContent)

    useEffect(() => {
        fetch("/api/content/flexpay-glow")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
    }, [])

    // Parse title for "glow" highlight
    const titleParts = content.title.toLowerCase().includes("glow")
        ? content.title.split(/glow/i)
        : [content.title, ""]

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left side - Text content */}
                    <div className="order-1 md:order-1">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                            {titleParts[0]}
                            {content.title.toLowerCase().includes("glow") && (
                                <>
                                    <br />
                                    <span style={{ color: "#ffcd00" }}>glow</span>
                                </>
                            )}
                            {titleParts[1]}
                        </h2>

                        <p className="text-gray-600 text-base md:text-lg mb-6 max-w-md">
                            {content.description}
                        </p>

                        <p className="text-gray-800 text-base md:text-lg font-medium">
                            Better for <span style={{ color: "#ffcd00" }} className="font-bold">you</span> and the <span style={{ color: "#ffcd00" }} className="font-bold">planet</span>.
                        </p>
                    </div>

                    {/* Right side - Image with decorative circles */}
                    <div className="order-2 md:order-2 relative flex justify-center md:justify-end">
                        {/* Yellow decorative circle - top right */}
                        <div
                            className="absolute -top-4 -right-4 md:top-0 md:right-0 w-16 h-16 md:w-24 md:h-24 rounded-full z-0"
                            style={{ backgroundColor: "#ffcd00" }}
                        />

                        {/* Yellow decorative circle - bottom left */}
                        <div
                            className="absolute -bottom-4 -left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-20 md:h-20 rounded-full z-0"
                            style={{ backgroundColor: "#ffcd00" }}
                        />

                        {/* Main circular image */}
                        <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                            <img
                                src="/house-with-solar-panels-on-roof-illustration.jpg"
                                alt="Aerial view of house with solar panels"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
