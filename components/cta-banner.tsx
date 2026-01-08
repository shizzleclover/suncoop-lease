"use client"

export default function CtaBanner() {
    const handleInterest = () => {
        window.location.href = "https://wa.me/27108803948"
    }

    return (
        <section className="py-12 md:py-16 px-6 md:px-12" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="max-w-4xl mx-auto relative">
                {/* Person with lightbulb illustration */}
                <div className="absolute -bottom-2 left-8 md:left-16 z-10 w-24 h-28 md:w-32 md:h-36">
                    <svg viewBox="0 0 100 120" className="w-full h-full">
                        {/* Lightbulb above head */}
                        <ellipse cx="65" cy="18" rx="10" ry="12" fill="#ffcd00" stroke="#333" strokeWidth="1" />
                        <rect x="62" y="28" width="6" height="4" fill="#666" />
                        {/* Rays */}
                        <line x1="65" y1="2" x2="65" y2="6" stroke="#333" strokeWidth="1.5" />
                        <line x1="52" y1="12" x2="48" y2="8" stroke="#333" strokeWidth="1.5" />
                        <line x1="78" y1="12" x2="82" y2="8" stroke="#333" strokeWidth="1.5" />
                        {/* Person */}
                        <circle cx="45" cy="50" r="14" fill="#fcd9b6" />
                        <ellipse cx="45" cy="45" rx="10" ry="8" fill="#1a1a2e" />
                        <path d="M30,95 L30,68 Q45,80 60,68 L60,95 L55,95 L55,110 L50,110 L45,105 L40,110 L35,110 L35,95 Z" fill="white" stroke="#ddd" strokeWidth="1" />
                        {/* Arms */}
                        <path d="M32,75 L20,85" stroke="#fcd9b6" strokeWidth="6" strokeLinecap="round" />
                        <path d="M58,75 L70,65" stroke="#fcd9b6" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Yellow banner */}
                <div
                    className="rounded-full py-5 md:py-6 px-8 md:px-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 ml-20 md:ml-28"
                    style={{ backgroundColor: "#ffcd00" }}
                >
                    <h3 className="text-lg md:text-xl font-bold text-black text-center sm:text-left">
                        <span className="font-extrabold">Yes!</span> Turn my world sunny side up
                    </h3>
                    <button
                        onClick={handleInterest}
                        className="px-6 py-2.5 rounded-full font-bold text-sm text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                        style={{ backgroundColor: "#000000" }}
                    >
                        I'm interested
                    </button>
                </div>
            </div>
        </section>
    )
}
