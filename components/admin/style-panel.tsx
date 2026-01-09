"use client"

import { useState } from 'react'
import ColorPicker from './color-picker'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SpacingValue {
    top: number
    right: number
    bottom: number
    left: number
}

interface StylePanelProps {
    backgroundColor?: string
    onBackgroundColorChange?: (color: string) => void
    textColor?: string
    onTextColorChange?: (color: string) => void
    padding?: SpacingValue
    onPaddingChange?: (padding: SpacingValue) => void
    margin?: SpacingValue
    onMarginChange?: (margin: SpacingValue) => void
}

export default function StylePanel({
    backgroundColor = '#ffffff',
    onBackgroundColorChange,
    textColor = '#000000',
    onTextColorChange,
    padding = { top: 0, right: 0, bottom: 0, left: 0 },
    onPaddingChange,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    onMarginChange,
}: StylePanelProps) {
    const [expanded, setExpanded] = useState({
        colors: true,
        spacing: false,
    })

    const SpacingInput = ({
        label,
        value,
        onChange
    }: {
        label: string
        value: SpacingValue
        onChange?: (value: SpacingValue) => void
    }) => (
        <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <div className="grid grid-cols-4 gap-2">
                {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <div key={side}>
                        <label className="text-xs text-gray-500 capitalize">{side}</label>
                        <input
                            type="number"
                            value={value[side]}
                            onChange={(e) => onChange?.({ ...value, [side]: parseInt(e.target.value) || 0 })}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            min="0"
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    const Section = ({
        title,
        expanded: isExpanded,
        onToggle,
        children
    }: {
        title: string
        expanded: boolean
        onToggle: () => void
        children: React.ReactNode
    }) => (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
                <span className="text-sm font-medium text-gray-700">{title}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isExpanded && (
                <div className="p-4 space-y-4 bg-white">{children}</div>
            )}
        </div>
    )

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Style Settings</h3>

            {/* Colors Section */}
            <Section
                title="Colors"
                expanded={expanded.colors}
                onToggle={() => setExpanded({ ...expanded, colors: !expanded.colors })}
            >
                {onBackgroundColorChange && (
                    <ColorPicker
                        label="Background Color"
                        color={backgroundColor}
                        onChange={onBackgroundColorChange}
                    />
                )}
                {onTextColorChange && (
                    <ColorPicker
                        label="Text Color"
                        color={textColor}
                        onChange={onTextColorChange}
                    />
                )}
            </Section>

            {/* Spacing Section */}
            <Section
                title="Spacing"
                expanded={expanded.spacing}
                onToggle={() => setExpanded({ ...expanded, spacing: !expanded.spacing })}
            >
                {onPaddingChange && (
                    <SpacingInput
                        label="Padding (px)"
                        value={padding}
                        onChange={onPaddingChange}
                    />
                )}
                {onMarginChange && (
                    <SpacingInput
                        label="Margin (px)"
                        value={margin}
                        onChange={onMarginChange}
                    />
                )}
            </Section>
        </div>
    )
}
