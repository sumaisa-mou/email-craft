import { useEffect, useState } from 'react'
import type { Block } from '../../types'
import type { HealthResult } from '../../types/health'
import EmailFrame from './EmailFrame'
import PreviewBlocks from './PreviewBlocks'
import ClientsPreview from './ClientsPreview'

type ViewMode = 'desktop' | 'mobile' | 'clients'

interface PreviewModalProps {
    isOpen: boolean
    onClose: () => void
    blocks: Block[]
    healthResult: HealthResult
}

function PreviewModal({ isOpen, onClose, blocks, healthResult }: PreviewModalProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('desktop')

    // Close on Esc key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-gray-900/80 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white">
                <div className="flex items-center gap-2">
                </div>

                {/* View Mode Tabs */}
                <div className="flex items-center gap-1 bg-gray-700 rounded-full p-1">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`px-4 py-1 rounded-full text-sm transition-colors ${
                            viewMode === 'desktop'
                                ? 'bg-white text-gray-900'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Desktop
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`px-4 py-1 rounded-full text-sm transition-colors ${
                            viewMode === 'mobile'
                                ? 'bg-white text-gray-900'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Mobile
                    </button>
                    <button
                        onClick={() => setViewMode('clients')}
                        className={`px-4 py-1 rounded-full text-sm transition-colors ${
                            viewMode === 'clients'
                                ? 'bg-white text-gray-900'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        Clients
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                        Press <kbd className="px-2 py-0.5 bg-gray-700 rounded text-xs">Esc</kbd>
                    </span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                    >
                        ×
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto p-8 flex justify-center items-start">
                {viewMode === 'desktop' && (
                    <EmailFrame width={600}>
                        <PreviewBlocks blocks={blocks} />
                    </EmailFrame>
                )}

                {viewMode === 'mobile' && (
                    <EmailFrame width={400}>
                        <PreviewBlocks blocks={blocks} />
                    </EmailFrame>
                )}

                {viewMode === 'clients' && (
                    <ClientsPreview blocks={blocks} />
                )}
            </main>
        </div>
    )
}

export default PreviewModal