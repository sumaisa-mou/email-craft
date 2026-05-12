interface ButtonBlockProps {
    text: string
    url: string
    isSelected?: boolean
    onUpdate?: (data: { text?: string; url?: string }) => void
    position?: 'left' | 'center' | 'right'
    onUpdatePostion?: (data: { position?: string }) => void
}

const alignMap = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
}

function ButtonBlock({ text, url, isSelected, onUpdate, position = 'center', onUpdatePostion }: ButtonBlockProps) {
    return (
        <div className={`bg-white rounded-xl p-8 text-${position}`}>
            {isSelected ? (
                <div className={`flex flex-col ${alignMap[position]} gap-3`}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onUpdate?.({ text: e.target.value })}
                        placeholder="Button text"
                        className="bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold outline-none text-center"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => onUpdate?.({ url: e.target.value })}
                        placeholder="https://..."
                        className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded outline-none w-64 text-center"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center justify-center gap-2">
                        {(['left', 'center', 'right'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdatePostion?.({ position: s })
                                }}
                                className={`px-3 py-1 text-xs rounded ${position === s ? 'bg-blue-500 text-white' : 'bg-white shadow'}`}
                            > {s} </button>
                        ))}
                    </div>
                </div>
            ) : (
                <a href={url} className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-600">
                    {text}
                </a>
            )}
        </div>
    )
}

export default ButtonBlock