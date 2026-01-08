"use client"

import { MessageCircle } from "lucide-react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import GlowSection from "@/components/glow-section"
import SunnySideSection from "@/components/sunny-side-section"
import BenefitsSection from "@/components/benefits-section"
import PricingSection from "@/components/pricing-section"
import SignUpJourney from "@/components/sign-up-journey"
import CtaBanner from "@/components/cta-banner"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <HeroSection />
      <GlowSection />
      <SunnySideSection />
      <BenefitsSection />
      <PricingSection />
      <SignUpJourney />
      <CtaBanner />
      <FaqSection />
      <Footer />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/27108803948"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle size={24} />
      </a>
    </main>
  )
}
