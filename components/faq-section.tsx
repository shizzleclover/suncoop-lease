"use client"

import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"

interface FaqItem {
  _id: string
  group: string
  question: string
  answer: string
  order: number
}

interface FaqGroup {
  id: string
  title: string
  items: { id: string; q: string; a: string }[]
}

// Default FAQs as fallback
const defaultFaqGroups: FaqGroup[] = [
  {
    id: "group0",
    title: "Before you GoSolar",
    items: [
      { id: "item1", q: "What does Suncoopng offer?", a: "We provide affordable solar energy solutions with flexible subscription models." },
      { id: "item2", q: "What does it cost to get started?", a: "Getting started is affordable with our subscription model. No large upfront costs." },
    ],
  },
]

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState("faqs")
  const [openItems, setOpenItems] = useState<string[]>(["item1"])
  const [openGroups, setOpenGroups] = useState<string[]>(["group0"])
  const [faqGroups, setFaqGroups] = useState<FaqGroup[]>(defaultFaqGroups)

  const tabs = [
    { id: "faqs", label: "FAQs" },
    { id: "articles", label: "Articles" },
    { id: "lightpaper", label: "Light Paper" },
    { id: "guides", label: "Guides" },
    { id: "videos", label: "Videos" },
  ]

  useEffect(() => {
    fetch("/api/faq")
      .then(res => res.ok ? res.json() : [])
      .then((data: FaqItem[]) => {
        if (data && data.length > 0) {
          // Group FAQs by group name
          const groups: { [key: string]: FaqGroup } = {}
          data.forEach((faq, idx) => {
            const groupId = `group-${faq.group.replace(/\s+/g, '-').toLowerCase()}`
            if (!groups[groupId]) {
              groups[groupId] = {
                id: groupId,
                title: faq.group,
                items: []
              }
            }
            groups[groupId].items.push({
              id: faq._id,
              q: faq.question,
              a: faq.answer
            })
          })
          const groupsArray = Object.values(groups)
          if (groupsArray.length > 0) {
            setFaqGroups(groupsArray)
            setOpenGroups([groupsArray[0].id])
            if (groupsArray[0].items.length > 0) {
              setOpenItems([groupsArray[0].items[0].id])
            }
          }
        }
      })
      .catch(() => { })
  }, [])

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
                        <span className="text-sm md:text-base">{item.q}</span>
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
