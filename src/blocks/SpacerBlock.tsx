interface SpacerBlockProps {
    size?: 'small' | 'medium' | 'large'
}

function SpacerBlock({ size = 'medium' }: SpacerBlockProps) {
    const heights = { small: 'h-8', medium: 'h-16', large: 'h-24' }

    return (
        <div className={`rounded-lg ${heights[size]} relative bg-gray-50 flex flex-col justify-between items-center py-1`}>
            <div className="w-full border-t border-gray-200" />
            <div className="flex-1 border-l border-dashed border-gray-300" />
            <div className="w-full border-t border-gray-200" />
        </div>
    )
}

export default SpacerBlock