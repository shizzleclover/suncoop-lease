"use client"

export default function SunnySideSection() {
    const handleInterest = () => {
        window.location.href = "https://wa.me/27108803948"
    }

    const features = [
        {
            title: "Reliability",
            description: "The sun never lets you down. So, welcome to your interruption-free life."
        },
        {
            title: "Affordability",
            description: "No big, upfront capital outlay, just one affordable, fixed monthly fee that gives you peace of mind, lower costs, savings, and clean, reliable, sustainable energy."
        },
        {
            title: "Sustainability",
            description: "Your support for the planet is higher and your carbon footprint is lower."
        },
        {
            title: "Cost control",
            description: "Your money goes much further as you reduce your electricity bills and avoid rising electricity costs."
        },
        {
            title: "Peace of mind",
            description: "Your system always operates at peak performance. There is no Will it? Or Won't it?."
        }
    ]

    return (
        <section className="py-12 md:py-16 px-6 md:px-12" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {/* Left column - Headline */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                            Turn your world
                            <br />
                            sunny-side up
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            As a <span className="font-semibold">Suncoopng sunscriber</span> you get a top of the range home solar system, without huge expenses and hassle. It really is that easy!
                        </p>
                    </div>

                    {/* Middle column - Features 1-3 */}
                    <div className="lg:col-span-1 space-y-6">
                        {features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex gap-3">
                                <span className="text-yellow-400 text-lg flex-shrink-0">✦</span>
                                <div>
                                    <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                                    <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                                </div>
                            </div>



                        ))}
                    </div>

                    {/* Right column - Features 4-5 */}
                    <div className="lg:col-span-1 space-y-6">
                        {features.slice(3).map((feature, idx) => (
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
                    style={{ backgroundColor: "#ffcd00" }}
                >
                    <h3 className="text-sm sm:text-lg md:text-xl font-bold text-black text-center sm:text-left whitespace-nowrap">
                        Subscribe to the sun!
                    </h3>
                    <button
                        onClick={handleInterest}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                        style={{ backgroundColor: "#000000" }}
                    >
                        I'm interested
                    </button>
                </div>
            </div>
        </section>
    )
}

