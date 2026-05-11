interface TextBlockProps {
    content: string
    isSelected?: boolean
    onUpdate?: (data: { content?: string }) => void
}

function TextBlock({content, isSelected, onUpdate}: TextBlockProps) {
    return (
        <div className="bg-white rounded-xl p-6">
            {isSelected ? (
                <textarea
                    value={content}
                    onChange={(e) => onUpdate?.({ content: e.target.value })}
                    className="w-full bg-transparent outline-none text-gray-700 resize-none"
                    rows={3}
                />
            ) : (
                <p className="text-gray-700">
                    {content}
                </p>
            )}
        </div>
    )
}

export default TextBlock;