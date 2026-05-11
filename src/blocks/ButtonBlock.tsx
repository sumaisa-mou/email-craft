interface ButtonBlockProps {
    text: string
    url: string
    isSelected?: boolean
    onUpdate?: (data: { text?: string; url?: string }) => void
}

function ButtonBlock({ text, url, isSelected, onUpdate }: ButtonBlockProps) {
    return (
        <div className="bg-white rounded-xl p-8 text-center">
            {isSelected ? (
                <div className="flex flex-col items-center gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onUpdate?.({ text: e.target.value })}
                        placeholder="Button text"
                        className="bg-blue-500 bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold outline-none text-center"
                    />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => onUpdate?.({ url: e.target.value })}
                        placeholder="https://..."
                        className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded outline-none w-64 text-center"
                    />
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