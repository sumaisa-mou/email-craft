import Canvas from "./Canvas.tsx";
import {useState} from "react";
import type {Block} from "../types";
import HealthPanel from "./HealthPanel.tsx";
import HealthBadge from "./HealthBadge.tsx";
import {checkHealth} from "../utils/healthCheck.ts";
import PreviewModal from "./preview/PreviewModal";

const initialState: Block[] = [
    {
        id: '1',
        type: 'hero',
        data: {
            title: 'Welcome to EmailCraft',
            subtitle: 'Your personalized email builder.'
        }
    },
    {
        id: '2',
        type: 'text',
        data: {
            content: "Hi Casey, thanks for signing up. We're glad to have you on board — here's everything you need to get started."
        }
    },
    {
        id: '3',
        type: 'button',
        data: {
            text: 'Get Started →',
            url: 'https://example.com'
        }

    }
]
function EmailEditor() {
    const [blocks, setBlocks] = useState<Block[]>(initialState)
    const [showHealthPanel, setShowHealthPanel] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [showPicker, setShowPicker] = useState(false)
    const [insertIndex, setInsertIndex] = useState<number | null>(null)
    const [showPreview, setShowPreview] = useState(false)
    const healthResult = checkHealth(blocks)

    const handleClickOutside = () => {
        setSelectedId(null)
        setShowPicker(false)
        setInsertIndex(null)
        setShowHealthPanel(false)
    }
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <span className='bg-gray-900 text-white px-2 py-1 rounded-lg font-semibold text-sm'>EC</span>
                    <span className='font-semibold text-gray-900'>Email Craft</span>
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <HealthBadge
                            score={healthResult.score}
                            status={healthResult.status}
                            isOpen={showHealthPanel}
                            onClick={() => setShowHealthPanel(!showHealthPanel)}
                        />
                        {showHealthPanel && (
                            <HealthPanel
                                result={healthResult}
                                onClose={() => setShowHealthPanel(false)}
                            />
                        )}
                    </div>

                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(true)}
                        className='text-sm text-gray-500 hover:text-gray-900'
                    >
                        Preview
                    </button>
                </div>
            </header>

            <main className="flex-1 p-10 flex justify-center" onClick={handleClickOutside}>
                <Canvas
                    blocks={blocks}
                    setBlocks={setBlocks}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    insertIndex={insertIndex}
                    setInsertIndex={setInsertIndex}
                />
            </main>

            {/* Preview Modal */}
            <PreviewModal
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                blocks={blocks}
                healthResult={healthResult}
            />
        </div>
    )
}

export default EmailEditor;