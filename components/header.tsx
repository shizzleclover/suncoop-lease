"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const handleInterest = () => {
    window.location.href = "https://wa.me/27108803948"
  }

  // Scroll detection for navbar color change and hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Change color after scrolling past ~80% of viewport height (hero section)
      const scrollThreshold = window.innerHeight * 0.8
      setIsScrolled(currentScrollY > scrollThreshold)

      // Always show navbar at the very top
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className="text-black py-2.5 px-6 md:px-12 flex items-center justify-between fixed w-full top-0 z-40 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: isScrolled ? "#ffffff" : "#ffcd00",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transform: isVisible ? "translateY(0)" : "translateY(-100%)"
        }}
      >
        <div className="text-2xl font-extrabold tracking-tight">suncoopng</div>

        <nav className="hidden md:flex gap-6 lg:gap-8 items-center flex-1 justify-center text-sm font-bold">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:opacity-70 transition">
              PRODUCTS <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="bg-white rounded-lg shadow-lg py-2 min-w-[160px] border border-gray-100">
                <Link
                  href="#residential"
                  className="block px-4 py-2 text-sm font-semibold hover:bg-yellow-50 transition-colors"
                >
                  RESIDENTIAL
                </Link>
                <Link
                  href="#commercial"
                  className="block px-4 py-2 text-sm font-semibold hover:bg-yellow-50 transition-colors"
                >
                  COMMERCIAL
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:opacity-70 transition">
              HOW IT WORKS <ChevronDown size={14} />
            </button>
          </div>
          <Link href="#brain" className="hover:opacity-70 transition">
            THE BRAIN
          </Link>
          <Link href="#installers" className="hover:opacity-70 transition">
            INSTALLERS
          </Link>
          <Link href="#contact" className="hover:opacity-70 transition">
            CONTACT
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <button
          onClick={handleInterest}
          className="hidden md:block text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#000000" }}
        >
          I'M INTERESTED
        </button>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${mobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
        style={{ backgroundColor: "#ffcd00" }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-6 p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} strokeWidth={2.5} />
        </button>

        {/* Menu content */}
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link
            href="#products"
            className="text-3xl font-extrabold hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            PRODUCTS
          </Link>
          <Link
            href="#how-it-works"
            className="text-3xl font-extrabold hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            HOW IT WORKS
          </Link>
          <Link
            href="#brain"
            className="text-3xl font-extrabold hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            THE BRAIN
          </Link>
          <Link
            href="#installers"
            className="text-3xl font-extrabold hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            INSTALLERS
          </Link>
          <Link
            href="#contact"
            className="text-3xl font-extrabold hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              handleInterest()
            }}
            className="mt-8 text-white px-10 py-4 rounded-full font-bold text-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#000000" }}
          >
            I'M INTERESTED
          </button>
        </div>
      </div>
    </>
  )
}
