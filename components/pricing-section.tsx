"use client"

import { useState } from "react"

export default function PricingSection() {
  const [selected, setSelected] = useState("secure")

  return (
    <section className="py-20 px-6 md:px-12" style={{ backgroundColor: "#ffcd00" }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">Select your power</h2>
        <p className="text-center text-lg mb-16 font-normal">Affordable subscription plans customised for you.</p>

        <div className="flex flex-col md:flex-row justify-center gap-8 items-end">
          {/* Save without battery */}
          <div
            className="text-center rounded-3xl px-8 md:px-12 py-12 cursor-pointer hover:opacity-90 transition w-full md:w-80 transform md:scale-95"
            style={{ backgroundColor: "#000000", color: "#ffcd00" }}
            onClick={() => setSelected("save")}
          >
            <h3 className="text-3xl font-bold mb-2">Save</h3>
            <p className="text-sm mb-4 opacity-90">without battery</p>
            <p className="text-5xl font-bold mb-2">R1299</p>
            <p className="text-sm opacity-90 mb-6">per month</p>
            <p className="text-xs opacity-80">
              For households spending
              <br />
              <span className="font-bold text-sm">R2000+</span> on electricity per month.
            </p>
          </div>

          {/* Save & secure with battery */}
          <div
            className="text-center rounded-3xl px-8 md:px-12 py-12 cursor-pointer hover:opacity-90 transition w-full md:w-80 transform md:scale-110 shadow-lg"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
            onClick={() => setSelected("secure")}
          >
            <h3 className="text-3xl font-bold mb-2">Save & secure</h3>
            <p className="text-sm mb-4 text-gray-600">with battery</p>
            <p className="text-5xl font-bold mb-2">R1699</p>
            <p className="text-sm text-gray-600 mb-6">per month</p>
            <p className="text-xs text-gray-600">
              For households spending
              <br />
              <span className="font-bold text-sm text-[#000000]">R3000+</span> on electricity per month.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
