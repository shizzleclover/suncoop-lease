"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Plus, Trash2, GripVertical, ArrowUp, ArrowDown } from "lucide-react"

interface JourneyStep {
    icon: string
    label: string
    description: string
}

interface JourneyContent {
    title: string
    subtitle: string
    steps: JourneyStep[]
}

const iconOptions = [
    { value: "lightbulb", label: "💡 Lightbulb" },
    { value: "filecheck", label: "📋 File Check" },
    { value: "monitor", label: "🖥️ Monitor" },
    { value: "creditcard", label: "💳 Credit Card" },
    { value: "calendar", label: "📅 Calendar" },
    { value: "smartphone", label: "📱 Smartphone" },
    { value: "wrench", label: "🔧 Wrench" },
    { value: "check", label: "✓ Check" },
    { value: "star", label: "⭐ Star" },
    { value: "heart", label: "❤️ Heart" },
]

const defaultContent: JourneyContent = {
    title: "The sign up journey",
    subtitle: "Quick and easy — from interest to installation",
    steps: [
        { icon: "lightbulb", label: "Show Interest", description: "Click 'I'm interested' to start" },
        { icon: "filecheck", label: "Get Quote", description: "Receive your custom proposal" },
        { icon: "monitor", label: "Online Approval", description: "Complete verification online" },
        { icon: "creditcard", label: "Set Up Payment", description: "Easy monthly subscription" },
        { icon: "calendar", label: "Book Date", description: "Choose installation date" },
        { icon: "smartphone", label: "Get App", description: "Monitor your solar system" },
        { icon: "wrench", label: "Installation", description: "We handle everything" },
    ]
}

export default function JourneyEditor() {
    const [content, setContent] = useState<JourneyContent>(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("/api/content/journey")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) setContent({ ...defaultContent, ...data })
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        setMessage("")
        try {
            const res = await fetch("/api/content/journey", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            })
            if (res.ok) {
                setMessage("Saved successfully!")
                await fetch("/api/revalidate?path=/")
            } else {
                setMessage("Failed to save")
            }
        } catch {
            setMessage("Error saving")
        } finally {
            setIsSaving(false)
            setTimeout(() => setMessage(""), 3000)
        }
    }

    const addStep = () => {
        setContent({
            ...content,
            steps: [...content.steps, { icon: "check", label: "New Step", description: "Step description" }]
        })
    }

    const updateStep = (index: number, updates: Partial<JourneyStep>) => {
        const newSteps = [...content.steps]
        newSteps[index] = { ...newSteps[index], ...updates }
        setContent({ ...content, steps: newSteps })
    }

    const deleteStep = (index: number) => {
        setContent({ ...content, steps: content.steps.filter((_, i) => i !== index) })
    }

    const moveStep = (index: number, direction: "up" | "down") => {
        const newSteps = [...content.steps]
        const newIndex = direction === "up" ? index - 1 : index + 1
        if (newIndex < 0 || newIndex >= newSteps.length) return
            ;[newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]]
        setContent({ ...content, steps: newSteps })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-yellow-500" size={32} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Sign Up Journey</h1>
                    <p className="text-gray-500 text-sm">Edit the journey steps timeline</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {message}
                </div>
            )}

            {/* Header Content */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Section Header</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={content.title}
                            onChange={(e) => setContent({ ...content, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <input
                            type="text"
                            value={content.subtitle}
                            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>
            </div>

            {/* Journey Steps */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Journey Steps ({content.steps.length})</h3>
                    <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Plus size={18} /> Add Step
                    </button>
                </div>

                <div className="space-y-3">
                    {content.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => moveStep(index, "up")} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                                    <ArrowUp size={14} />
                                </button>
                                <button onClick={() => moveStep(index, "down")} disabled={index === content.steps.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                                    <ArrowDown size={14} />
                                </button>
                            </div>
                            <span className="text-gray-400 font-bold text-sm w-6">{index + 1}</span>
                            <select
                                value={step.icon}
                                onChange={(e) => updateStep(index, { icon: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                                {iconOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={step.label}
                                onChange={(e) => updateStep(index, { label: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Step label"
                            />
                            <input
                                type="text"
                                value={step.description}
                                onChange={(e) => updateStep(index, { description: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Description"
                            />
                            <button onClick={() => deleteStep(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
