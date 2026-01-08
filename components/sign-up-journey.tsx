"use client"

export default function SignUpJourney() {
  const steps = [
    { icon: "lightbulb", label: "You show your interest", isActive: true },
    { icon: "document", label: "", isActive: false },
    { icon: "laptop", label: "", isActive: false },
    { icon: "payment", label: "", isActive: false },
    { icon: "calendar", label: "", isActive: false },
    { icon: "phone", label: "", isActive: false },
    { icon: "install", label: "", isActive: false },
  ]

  const renderIcon = (iconType: string, isActive: boolean) => {
    const bgColor = isActive ? "#ffcd00" : "#e5e5e5"
    const strokeColor = isActive ? "#333" : "#888"

    switch (iconType) {
      case "lightbulb":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-3">
            {/* Person */}
            <ellipse cx="40" cy="50" rx="15" ry="15" fill="#1a1a2e" />
            <ellipse cx="40" cy="32" r="8" fill="#ffcd00" />
            {/* Lightbulb */}
            <ellipse cx="55" cy="20" rx="8" ry="10" fill="#ffcd00" stroke="#333" strokeWidth="1" />
            <rect x="52" y="28" width="6" height="4" fill="#666" />
            {/* Rays */}
            <line x1="55" y1="5" x2="55" y2="8" stroke="#333" strokeWidth="1.5" />
            <line x1="45" y1="15" x2="42" y2="12" stroke="#333" strokeWidth="1.5" />
            <line x1="65" y1="15" x2="68" y2="12" stroke="#333" strokeWidth="1.5" />
          </svg>
        )
      case "document":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-4">
            <rect x="20" y="15" width="35" height="45" rx="2" fill="white" stroke={strokeColor} strokeWidth="2" />
            <line x1="28" y1="28" x2="48" y2="28" stroke={strokeColor} strokeWidth="2" />
            <line x1="28" y1="36" x2="45" y2="36" stroke={strokeColor} strokeWidth="2" />
            <line x1="28" y1="44" x2="42" y2="44" stroke={strokeColor} strokeWidth="2" />
            <path d="M50,55 L58,48 L62,52" fill="none" stroke="#e11d48" strokeWidth="2" />
            <circle cx="58" cy="50" r="8" fill="none" stroke="#e11d48" strokeWidth="1.5" />
          </svg>
        )
      case "laptop":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-4">
            <rect x="15" y="20" width="40" height="28" rx="2" fill="white" stroke={strokeColor} strokeWidth="2" />
            <rect x="10" y="48" width="50" height="5" rx="1" fill={strokeColor} />
            <circle cx="35" cy="34" r="8" fill="none" stroke="#22c55e" strokeWidth="2" />
            <polyline points="31,34 34,37 40,31" fill="none" stroke="#22c55e" strokeWidth="2" />
          </svg>
        )
      case "payment":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-4">
            <ellipse cx="55" cy="35" rx="12" ry="12" fill="#fcd9b6" />
            <rect x="15" y="30" width="35" height="22" rx="2" fill="white" stroke={strokeColor} strokeWidth="2" />
            <rect x="15" y="36" width="35" height="6" fill={strokeColor} />
            <rect x="20" y="46" width="12" height="3" fill={strokeColor} />
          </svg>
        )
      case "calendar":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-4">
            <rect x="18" y="20" width="40" height="38" rx="2" fill="white" stroke={strokeColor} strokeWidth="2" />
            <rect x="18" y="20" width="40" height="10" fill={strokeColor} />
            <rect x="23" y="14" width="3" height="10" rx="1" fill={strokeColor} />
            <rect x="50" y="14" width="3" height="10" rx="1" fill={strokeColor} />
            {/* Grid */}
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={24 + col * 8}
                  y={34 + row * 7}
                  width="5"
                  height="5"
                  fill={strokeColor}
                />
              ))
            )}
          </svg>
        )
      case "phone":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-4">
            <rect x="25" y="12" width="28" height="50" rx="3" fill="#1a1a2e" stroke={strokeColor} strokeWidth="1" />
            <rect x="28" y="18" width="22" height="36" fill="#333" />
            {/* Grid pattern */}
            {[0, 1].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={32 + col * 8}
                  y={26 + row * 10}
                  width="6"
                  height="6"
                  fill="#ffcd00"
                />
              ))
            )}
            <circle cx="39" cy="58" r="2" fill="#666" />
          </svg>
        )
      case "install":
        return (
          <svg viewBox="0 0 80 80" className="w-full h-full p-3">
            {/* Person */}
            <circle cx="35" cy="28" r="8" fill={strokeColor} />
            <path d="M25,60 L25,42 Q35,50 45,42 L45,60" fill={strokeColor} />
            {/* Gears */}
            <circle cx="58" cy="45" r="10" fill="none" stroke={strokeColor} strokeWidth="2" />
            <circle cx="58" cy="45" r="4" fill={strokeColor} />
            <circle cx="52" cy="58" r="6" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="52" cy="58" r="2" fill={strokeColor} />
            {/* Plus signs */}
            <text x="62" y="28" fontSize="12" fill={strokeColor}>+</text>
            <text x="48" y="35" fontSize="10" fill={strokeColor}>+</text>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-16 md:py-20 px-6 md:px-12" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">The sign up journey</h2>
          <p className="text-gray-600 text-base md:text-lg">Quick and easy.</p>
        </div>

        {/* Journey Steps - Wave Layout */}
        <div className="relative mb-12 hidden md:block" style={{ height: "220px" }}>
          {/* Curved connecting line */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            style={{ height: "200px" }}
          >
            <path
              d="M70,150 C170,150 200,50 300,50 C400,50 430,130 530,130 C630,130 660,40 760,40 C860,40 890,120 990,120"
              fill="none"
              stroke="#ddd"
              strokeWidth="2"
              strokeDasharray="8,6"
            />
          </svg>

          {/* Steps with absolute positioning to match curve */}
          <div className="relative w-full h-full">
            {/* Step 1 - Yellow */}
            <div className="absolute flex flex-col items-center" style={{ left: "3%", top: "110px" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: "#ffcd00" }}>
                {renderIcon("lightbulb", true)}
              </div>
              <p className="mt-3 text-sm font-bold text-center whitespace-nowrap">You show your interest</p>
            </div>

            {/* Step 2 */}
            <div className="absolute" style={{ left: "16%", top: "15px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("document", false)}
              </div>
            </div>

            {/* Step 3 */}
            <div className="absolute" style={{ left: "30%", top: "95px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("laptop", false)}
              </div>
            </div>

            {/* Step 4 */}
            <div className="absolute" style={{ left: "44%", top: "5px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("payment", false)}
              </div>
            </div>

            {/* Step 5 */}
            <div className="absolute" style={{ left: "58%", top: "85px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("calendar", false)}
              </div>
            </div>

            {/* Step 6 */}
            <div className="absolute" style={{ left: "72%", top: "0px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("phone", false)}
              </div>
            </div>

            {/* Step 7 */}
            <div className="absolute" style={{ left: "86%", top: "80px" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8e8e8" }}>
                {renderIcon("install", false)}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-4 mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${step.isActive ? "shadow-lg" : ""}`}
                style={{ backgroundColor: step.isActive ? "#ffcd00" : "#e8e8e8" }}
              >
                {renderIcon(step.icon, step.isActive)}
              </div>
              {step.label && <p className="mt-2 text-xs font-bold text-center whitespace-nowrap">{step.label}</p>}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center max-w-xl mx-auto flex items-center justify-center gap-4">
          <p className="text-gray-600 text-sm md:text-base">
            Click <span className="font-bold text-black">"I'm interested"</span>. You can then choose
            between a call-back, chat via WhatsApp or continue to sign up.
          </p>
          <span className="text-gray-400 text-2xl">›</span>
        </div>
      </div>
    </section>
  )
}

