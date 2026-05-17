interface BlockWrapperProps {
    id: string
    isSelected: boolean
    onSelect: () => void
    onDelete: () => void
    children: React.ReactNode
    toolbar?: React.ReactNode
}

function BlockWrapper({ isSelected, onSelect, onDelete, children, toolbar }: BlockWrapperProps) {
    return (
        <div className="relative">
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    onSelect()
                }}
                className={`relative cursor-pointer rounded-lg transition-all ${
                    isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
                }`}
            >
                {isSelected && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 z-10"
                    >
                        ×
                    </button>
                )}
                {children}
            </div>
            {isSelected && toolbar && (
                <div className="flex justify-center mt-2">
                    {toolbar}
                </div>
            )}
        </div>
    )
}

export default BlockWrapper