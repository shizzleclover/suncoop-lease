"use client"

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'

interface ImageUploaderProps {
    value: string
    onChange: (url: string) => void
    label?: string
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB')
            return
        }

        setIsUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                throw new Error('Upload failed')
            }

            const data = await res.json()
            onChange(data.url)
        } catch (err) {
            setError('Failed to upload image. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0])
        }
    }, [])

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0])
        }
    }

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <label className="px-3 py-2 bg-white text-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-sm font-medium">
                            Change
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
            ${dragActive
                            ? 'border-yellow-400 bg-yellow-50'
                            : 'border-gray-300 hover:border-yellow-400 hover:bg-gray-50'
                        }
          `}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                        {isUploading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 size={32} className="text-yellow-500 animate-spin mb-2" />
                                <p className="text-sm text-gray-600">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                                    <Upload size={24} className="text-yellow-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        )}
                    </label>
                </div>
            )}

            {/* URL Input for external images */}
            <div className="mt-3">
                <div className="flex items-center gap-2">
                    <ImageIcon size={16} className="text-gray-400" />
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Or paste image URL..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                </div>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}
