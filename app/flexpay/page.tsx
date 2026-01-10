"use client"

import { MessageCircle } from "lucide-react"
import Header from "@/components/header"
import FlexpayHeroSection from "@/components/flexpay/hero-section"
import FlexpayGlowSection from "@/components/flexpay/glow-section"
import SunnySideSection from "@/components/sunny-side-section"
import FlexpayBenefitsSection from "@/components/flexpay/benefits-section"
import FlexpayPricingSection from "@/components/flexpay/pricing-section"
import SignUpJourney from "@/components/sign-up-journey"
import CtaBanner from "@/components/cta-banner"
import FlexpayFaqSection from "@/components/flexpay/faq-section"
import Footer from "@/components/footer"

export default function FlexpayPage() {
    return (
        <main className="w-full">
            <Header />
            <FlexpayHeroSection />
            <FlexpayGlowSection />
            <SunnySideSection />
            <FlexpayBenefitsSection />
            <FlexpayPricingSection />
            <SignUpJourney />
            <CtaBanner />
            <FlexpayFaqSection />
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
