"use client"

import { useState } from 'react'
import { Monitor, Tablet, Smartphone, Eye, EyeOff, RotateCcw } from 'lucide-react'

interface LivePreviewProps {
    children: React.ReactNode
}

export default function LivePreview({ children }: LivePreviewProps) {
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
    const [showPreview, setShowPreview] = useState(true)

    const deviceWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px',
    }

    const refreshPreview = () => {
        const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
        if (iframe) {
            iframe.src = iframe.src
        }
    }

    return (
        <div className="flex h-full">
            {/* Editor Panel */}
            <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-auto bg-gray-50 transition-all duration-300`}>
                {children}
            </div>

            {/* Preview Panel */}
            {showPreview && (
                <div className="w-1/2 border-l border-gray-200 bg-gray-100 flex flex-col">
                    {/* Preview Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Preview</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setDevice('desktop')}
                                className={`p-2 rounded transition-colors ${device === 'desktop' ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                title="Desktop"
                            >
                                <Monitor size={18} />
                            </button>
                            <button
                                onClick={() => setDevice('tablet')}
                                className={`p-2 rounded transition-colors ${device === 'tablet' ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                title="Tablet"
                            >
                                <Tablet size={18} />
                            </button>
                            <button
                                onClick={() => setDevice('mobile')}
                                className={`p-2 rounded transition-colors ${device === 'mobile' ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-600'
                                    }`}
                                title="Mobile"
                            >
                                <Smartphone size={18} />
                            </button>

                            <div className="w-px h-6 bg-gray-200 mx-2" />

                            <button
                                onClick={refreshPreview}
                                className="p-2 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                                title="Refresh Preview"
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Preview Iframe */}
                    <div className="flex-1 p-4 overflow-auto flex justify-center">
                        <div
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
                            style={{
                                width: deviceWidths[device],
                                maxWidth: '100%',
                                height: 'calc(100vh - 200px)',
                            }}
                        >
                            <iframe
                                id="preview-iframe"
                                src="/"
                                className="w-full h-full border-0"
                                title="Live Preview"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Preview Button */}
            <button
                onClick={() => setShowPreview(!showPreview)}
                className="fixed bottom-4 right-4 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-400 transition-colors z-50"
                title={showPreview ? 'Hide Preview' : 'Show Preview'}
            >
                {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    )
}
