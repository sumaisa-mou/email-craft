import type {textStyle} from "../types";

interface TextBlockProps {
    content: string
    isSelected?: boolean
    onUpdate?: (data: { content?: string }) => void
    style?: textStyle
}

const styleMap: Record<string, string> = {
    'bold': 'font-bold',
    'italic': 'italic',
    'underline': 'underline',
    'strike': 'line-through',
}

function TextBlock({content, isSelected, onUpdate, style}: TextBlockProps) {
    return (
        <div className="bg-white rounded-xl p-6">
            {isSelected ? (
                <textarea
                    value={content}
                    onChange={(e) => onUpdate?.({ content: e.target.value })}
                    className={`w-full bg-transparent outline-none text-gray-700 resize-none text-sm ${style ? styleMap[style] : ''}`}
                    rows={3}
                />
            ) : (
                <p className={`text-gray-700 text-sm ${style ? styleMap[style] : ''}`}>
                    {content}
                </p>
            )}
        </div>
    )
}

export default TextBlock;