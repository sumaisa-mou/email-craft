interface SpacerBlockProps {
    size?: 'small' | 'medium' | 'large'
    isSelected?: boolean
    onUpdate?: (data: { size?: string }) => void
}

function SpacerBlock({ size = 'medium', isSelected, onUpdate }: SpacerBlockProps) {
    const heights = { small: 'h-8', medium: 'h-16', large: 'h-24' }

    return (
        <div className={`rounded-lg ${heights[size]} relative bg-gray-50 flex flex-col justify-between items-center py-1`}>
            <div className="w-full border-t border-gray-200" />
            <div className="flex-1 border-l border-dashed border-gray-300" />
            <div className="w-full border-t border-gray-200" />

            {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/80">
                    {(['small', 'medium', 'large'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => onUpdate?.({ size: s })}
                            className={`px-3 py-1 text-xs rounded ${size === s ? 'bg-blue-500 text-white' : 'bg-white shadow'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SpacerBlock