import { useState } from 'react'

interface HTMLBlockProps {
    code: string
    isSelected?: boolean
    onUpdate?: (data: { code?: string }) => void
}

function HTMLBlock({ code, isSelected, onUpdate }: HTMLBlockProps) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm font-mono">{'<>'} HTML</span>
            </div>

            {isEditing ? (
                <div className="relative">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="absolute top-2 right-2 px-3 py-1 bg-white rounded-full text-sm shadow flex items-center gap-1"
                    >
                        <span>✓</span> Done
                    </button>
                    <textarea
                        value={code}
                        onChange={(e) => onUpdate?.({ code: e.target.value })}
                        placeholder="<div>Your HTML here...</div>"
                        className="w-full bg-gray-100 text-gray-800 font-mono text-sm p-4 rounded-lg outline-none resize-y min-h-[150px]"
                        rows={6}
                    />
                </div>
            ) : (
                <div className="relative bg-gray-50 rounded-lg p-4 min-h-[100px]">
                    {isSelected && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-2 right-2 px-3 py-1 bg-white rounded-full text-sm shadow flex items-center gap-1"
                        >
                            <span>✎</span> Edit
                        </button>
                    )}
                    {code ? (
                        <div dangerouslySetInnerHTML={{ __html: code }} />
                    ) : (
                        <div className="flex items-center justify-center text-gray-400 font-mono py-8">
                            {'</>'} Click Edit to add HTML
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default HTMLBlock