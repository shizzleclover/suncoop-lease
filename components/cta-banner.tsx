"use client"

export default function CtaBanner() {
    const handleInterest = () => {
        window.location.href = "https://wa.me/27108803948"
    }

    return (
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="max-w-3xl mx-auto">
                {/* Yellow banner - fully responsive */}
                <div
                    className="rounded-full py-3 sm:py-4 md:py-5 px-4 sm:px-8 md:px-12 flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6"
                    style={{ backgroundColor: "#ffcd00" }}
                >
                    <h3 className="text-xs sm:text-base md:text-xl font-bold text-black text-center">
                        <span className="font-extrabold">Yes!</span> Turn my world sunny side up
                    </h3>
                    <button
                        onClick={handleInterest}
                        className="px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0"
                        style={{ backgroundColor: "#000000" }}
                    >
                        I'm interested
                    </button>
                </div>
            </div>
        </section>
    )
}
