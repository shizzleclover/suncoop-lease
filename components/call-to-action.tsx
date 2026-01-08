"use client"

export default function CallToActionSection() {
  const handleInterest = () => {
    window.location.href = "https://wa.me/27108803948"
  }

  return (
    <section className="py-16 px-6 md:px-12 flex items-center justify-center" style={{ backgroundColor: "#ffffff" }}>
      <div
        className="rounded-full px-8 md:px-12 py-6 flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full"
        style={{ backgroundColor: "#ffcd00" }}
      >
        <img
          src="/person-lightbulb-idea.jpg"
          alt="Woman with idea"
          className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-lg md:text-2xl text-black text-center md:text-left">
            <span className="font-bold">Yes!</span> Turn my world sunny side up
          </p>
        </div>
        <button
          onClick={handleInterest}
          className="whitespace-nowrap flex-shrink-0 px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity text-white"
          style={{ backgroundColor: "#000000" }}
        >
          I'm interested
        </button>
      </div>
    </section>
  )
}
