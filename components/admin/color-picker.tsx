"use client"

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Palette } from 'lucide-react'

interface ColorPickerProps {
    color: string
    onChange: (color: string) => void
    label?: string
    presets?: string[]
}

const defaultPresets = [
    '#ffcd00', // Suncoopng yellow
    '#000000', // Black
    '#ffffff', // White
    '#1a1a1a', // Dark gray
    '#4ade80', // Green
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#f97316', // Orange
    '#8b5cf6', // Purple
    '#ec4899', // Pink
]

export default function ColorPicker({
    color,
    onChange,
    label,
    presets = defaultPresets
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-2">
                {/* Color Preview Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm hover:border-yellow-400 transition-colors flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    {!color && <Palette size={16} className="text-gray-400" />}
                </button>

                {/* Hex Input */}
                <input
                    type="text"
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="#000000"
                />
            </div>

            {/* Color Picker Dropdown */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200">
                        <HexColorPicker color={color} onChange={onChange} />

                        {/* Presets */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">Presets</p>
                            <div className="flex flex-wrap gap-1">
                                {presets.map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => {
                                            onChange(preset)
                                            setIsOpen(false)
                                        }}
                                        className={`w-6 h-6 rounded border-2 transition-transform hover:scale-110 ${color === preset ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-200'
                                            }`}
                                        style={{ backgroundColor: preset }}
                                        title={preset}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
