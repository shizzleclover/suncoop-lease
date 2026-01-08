"use client"

export default function HeroSection() {
  const handleInterest = () => {
    window.location.href = "https://wa.me/27108803948"
  }

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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 leading-[1.1] tracking-tight">
            Subscribe to
            <br />
            the sun
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 font-medium">
            Solar from only <span className="font-extrabold">R1299</span> per month
          </p>
        </div>

        {/* Three benefits with checkmarks */}
        <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 mb-10 md:mb-14 flex-wrap">
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0"
              style={{ backgroundColor: "#000000" }}
            >
              <span className="text-white text-lg md:text-xl font-bold">✓</span>
            </div>
            <p className="text-center text-sm md:text-base font-semibold leading-tight">
              Month to month
              <br />
              subscription
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0"
              style={{ backgroundColor: "#000000" }}
            >
              <span className="text-white text-lg md:text-xl font-bold">✓</span>
            </div>
            <p className="text-center text-sm md:text-base font-semibold leading-tight">
              Upgrade or
              <br />
              cancel any time
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 flex-shrink-0"
              style={{ backgroundColor: "#000000" }}
            >
              <span className="text-white text-lg md:text-xl font-bold">✓</span>
            </div>
            <p className="text-center text-sm md:text-base font-semibold leading-tight">24/7 support</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8 md:mb-12">
          <button
            onClick={handleInterest}
            className="text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: "#000000" }}
          >
            I'm interested
          </button>
        </div>
      </div>

      {/* House with Solar Panels - Bottom Center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 sm:w-64 md:w-80 lg:w-96">
        <svg viewBox="0 0 300 150" className="w-full h-auto">
          {/* House roof */}
          <polygon points="150,20 50,80 250,80" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
          {/* Solar panels on roof */}
          <rect x="80" y="45" width="30" height="20" fill="#1E3A5F" stroke="#0F2942" strokeWidth="1" transform="rotate(-25, 95, 55)" />
          <rect x="115" y="38" width="30" height="20" fill="#1E3A5F" stroke="#0F2942" strokeWidth="1" transform="rotate(-25, 130, 48)" />
          <rect x="150" y="38" width="30" height="20" fill="#1E3A5F" stroke="#0F2942" strokeWidth="1" transform="rotate(25, 165, 48)" />
          <rect x="185" y="45" width="30" height="20" fill="#1E3A5F" stroke="#0F2942" strokeWidth="1" transform="rotate(25, 200, 55)" />
          {/* Panel grid lines */}
          <line x1="85" y1="50" x2="105" y2="60" stroke="#2563EB" strokeWidth="0.5" transform="rotate(-25, 95, 55)" />
          <line x1="120" y1="43" x2="140" y2="53" stroke="#2563EB" strokeWidth="0.5" transform="rotate(-25, 130, 48)" />
          <line x1="155" y1="43" x2="175" y2="53" stroke="#2563EB" strokeWidth="0.5" transform="rotate(25, 165, 48)" />
          <line x1="190" y1="50" x2="210" y2="60" stroke="#2563EB" strokeWidth="0.5" transform="rotate(25, 200, 55)" />
          {/* House body */}
          <rect x="70" y="80" width="160" height="70" fill="#E5E7EB" />
          {/* Door */}
          <rect x="130" y="100" width="40" height="50" fill="#9CA3AF" />
          {/* Windows */}
          <rect x="85" y="95" width="30" height="25" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" />
          <rect x="185" y="95" width="30" height="25" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" />
        </svg>
      </div>

      {/* Curved transition - subtle yellow curving down into white */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
        <svg
          className="w-full"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", height: "80px" }}
        >
          {/* Yellow top that curves down gently */}
          <path d="M0,0 L0,30 Q720,80 1440,30 L1440,0 Z" fill="#ffcd00" />
          {/* White bottom */}
          <path d="M0,30 Q720,80 1440,30 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}
