"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
}

interface HeaderContent {
  logoUrl: string
  navItems: NavItem[]
  ctaButtonText: string
  whatsappNumber: string
}

const defaultContent: HeaderContent = {
  logoUrl: "/Arojin-Sunbox-Logo.png",
  navItems: [
    { label: "FLEXGRID", href: "/" },
    { label: "FLEXPAY", href: "/flexpay" },
    { label: "INSTALLERS", href: "#installers" },
    { label: "CONTACT", href: "#contact" },
    { label: "I'M INTERESTED", href: "#interested" },
  ],
  ctaButtonText: "I'M INTERESTED",
  whatsappNumber: "27108803948",
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [content, setContent] = useState<HeaderContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    fetch("/api/content/header", { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setContent({ ...defaultContent, ...data })
        else setContent(defaultContent)
      })
      .catch(() => setContent(defaultContent))
      .finally(() => setIsLoading(false))
  }, [])

  // Use loaded content or default while loading
  const displayContent = content || defaultContent

  const handleInterest = () => {
    window.location.href = `https://wa.me/${displayContent.whatsappNumber}`
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-black"
          } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={displayContent.logoUrl || "/suncoopng-logo.png"}
              alt="Suncoopng"
              width={240}
              height={70}
              className="h-16 md:h-20 w-auto"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center flex-1 justify-center text-sm font-bold">
            {displayContent.navItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="hover:opacity-70 transition">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <button
            onClick={handleInterest}
            className="hidden md:block text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#000000" }}
          >
            {displayContent.ctaButtonText}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:opacity-70 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ backgroundColor: "#ffcd00" }}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 hover:opacity-70 transition"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        {/* Menu content */}
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {displayContent.navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="text-3xl font-extrabold hover:opacity-70 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              handleInterest()
            }}
            className="mt-4 text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#000000" }}
          >
            {displayContent.ctaButtonText}
          </button>
        </div>
      </div>
    </>
  )
}
