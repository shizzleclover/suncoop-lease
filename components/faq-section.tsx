"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState("faqs")
  const [openItems, setOpenItems] = useState<string[]>(["item1"])
  const [openGroups, setOpenGroups] = useState<string[]>(["group0"])

  const tabs = [
    { id: "faqs", label: "FAQs" },
    { id: "articles", label: "Articles" },
    { id: "lightpaper", label: "Light Paper" },
    { id: "guides", label: "Guides" },
    { id: "videos", label: "Videos" },
  ]

  const faqGroups = [
    {
      id: "group0",
      title: "Before you Suncoopng",
      items: [
        { id: "item1", q: "What does Suncoopng offer?", a: "We provide affordable solar energy solutions with flexible subscription models." },
        { id: "item2", q: "What does it cost to get started?", a: "Getting started is affordable with our subscription model. No large upfront costs." },
        { id: "item3", q: "What about the monthly fee?", a: "Monthly fees start from R1299 depending on your power needs." },
        { id: "item4", q: "Is it right for my roof?", a: "Our team conducts free site assessments to determine suitability." },
        { id: "item5", q: "Can I upgrade my GoSolr system?", a: "Yes, you can upgrade or downgrade your system anytime." },
        { id: "item6", q: "Do you do a site visit before installation?", a: "Yes, we always conduct a site visit and assessment before installation." },
        { id: "item7", q: "What if I'm renting?", a: "We have flexible options available for renters as well." },
      ],
    },
    {
      id: "group1",
      title: "The Suncoopng solution",
      items: [
        { id: "item8", q: "What is included in the subscription?", a: "Solar panels, inverter, installation, monitoring, and maintenance are all included." },
        { id: "item9", q: "How does the system work?", a: "Solar panels convert sunlight to electricity, reducing your grid dependency." },
      ],
    },
    {
      id: "group2",
      title: "Installation",
      items: [
        { id: "item10", q: "How long does installation take?", a: "Installation typically takes 1-2 days depending on system size." },
        { id: "item11", q: "Will I need to be home?", a: "Yes, someone should be present during the installation." },
      ],
    },
    {
      id: "group3",
      title: "Post installation",
      items: [
        { id: "item12", q: "How do I monitor my system?", a: "Use our convenient mobile app to track performance in real-time." },
        { id: "item13", q: "What if something goes wrong?", a: "Our 24/7 support team is always available to assist you." },
      ],
    },
    {
      id: "group4",
      title: "Referral programme",
      items: [
        { id: "item14", q: "How does the referral programme work?", a: "Refer friends and earn rewards when they sign up." },
        { id: "item15", q: "What rewards can I earn?", a: "Earn cash rewards or subscription credits for each successful referral." },
      ],
    },
  ]

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <section className="bg-white">
      {/* Tab Navigation */}
      <div className="relative" style={{ backgroundColor: "#c5c5c5" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 md:gap-8 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-all relative ${activeTab === tab.id
                    ? "text-black font-bold"
                    : "text-gray-600 hover:text-black"
                  }`}
              >
                {tab.label}
                {/* Active indicator arrow */}
                {activeTab === tab.id && (
                  <div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #c5c5c5"
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {faqGroups.map((group) => (
            <div key={group.id} className="mb-4">
              {/* Group Title - Clickable to expand/collapse */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center gap-3 py-2 hover:opacity-70 transition-opacity"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#ffcd00" }}
                />
                <h3 className="text-base md:text-lg font-bold flex-1 text-left">{group.title}</h3>
              </button>

              {/* FAQ Items with smooth animation */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openGroups.includes(group.id) ? `${group.items.length * 200}px` : "0px",
                  opacity: openGroups.includes(group.id) ? 1 : 0,
                }}
              >
                <div className="ml-6">
                  {group.items.map((item) => (
                    <div key={item.id} className="border-b border-gray-200">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-center gap-3 py-3 text-left hover:opacity-70 transition-opacity"
                      >
                        <span className="flex-shrink-0 text-gray-500 transition-transform duration-200">
                          {openItems.includes(item.id) ? (
                            <Minus size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
                        </span>
                        <span className="text-sm md:text-base">
                          {item.q.split(" ").map((word, i) => {
                            const underlineWords = ["cost", "monthly", "right", "upgrade", "site", "visit", "renting"]
                            const shouldUnderline = underlineWords.some(uw => word.toLowerCase().includes(uw))
                            return shouldUnderline ? (
                              <span key={i} className="underline">{word} </span>
                            ) : (
                              <span key={i}>{word} </span>
                            )
                          })}
                        </span>
                      </button>

                      {/* Answer with smooth animation */}
                      <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: openItems.includes(item.id) ? "200px" : "0px",
                          opacity: openItems.includes(item.id) ? 1 : 0,
                        }}
                      >
                        <p className="pb-3 ml-7 text-gray-600 text-sm leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
