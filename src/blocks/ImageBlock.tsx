import { useRef, useState } from 'react'

interface ImageBlockProps {
    src: string
    alt: string
    isSelected?: boolean
    onUpdate?: (data: { src?: string; alt?: string }) => void
    onImageUpload?: (file: File) => Promise<string>
}

function ImageBlock({ src, alt, isSelected, onUpdate, onImageUpload }: ImageBlockProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !onImageUpload) return

        setIsUploading(true)
        try {
            const url = await onImageUpload(file)
            onUpdate?.({ src: url })
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl p-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
            />

            {src ? (
                <div>
                    <img src={src} alt={alt} className="w-full rounded-lg" />
                    {isSelected && (
                        <div className="flex flex-col gap-2 mt-3">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={src}
                                    onChange={(e) => onUpdate?.({ src: e.target.value })}
                                    placeholder="Image URL..."
                                    className="text-sm bg-gray-100 px-3 py-2 rounded-lg outline-none flex-1"
                                />
                                {onImageUpload && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {isUploading ? '...' : 'Upload'}
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                value={alt}
                                onChange={(e) => onUpdate?.({ alt: e.target.value })}
                                placeholder="Alt text..."
                                className="text-sm bg-gray-100 px-3 py-2 rounded-lg outline-none w-full"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => onImageUpload && fileInputRef.current?.click()}
                    className={`border-2 border-dashed border-gray-200 rounded-xl h-60 flex flex-col items-center justify-center gap-4 bg-gray-50 ${onImageUpload ? 'cursor-pointer hover:border-gray-300' : ''}`}
                >
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                        <path d="M3 16l5-5 4 4 5-5 4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5"/>
                    </svg>

                    {isUploading ? (
                        <p className="text-gray-400">Uploading...</p>
                    ) : (
                        <p className="text-gray-400">
                            {onImageUpload ? 'Click to upload' : 'Paste URL below'} — 600 × 240
                        </p>
                    )}

                    {isSelected && (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={src}
                                onChange={(e) => onUpdate?.({ src: e.target.value })}
                                placeholder="Paste image URL..."
                                className="text-sm bg-white px-4 py-2 rounded-lg outline-none w-64 border border-gray-200"
                                onClick={(e) => e.stopPropagation()}
                            />
                            {onImageUpload && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        fileInputRef.current?.click()
                                    }}
                                    disabled={isUploading}
                                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ImageBlock