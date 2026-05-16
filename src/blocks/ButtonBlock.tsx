import type {ButtonStyle} from "../types";

interface ButtonBlockProps {
    text: string
    url: string
    isSelected?: boolean
    onUpdate?: (data: { text?: string; url?: string }) => void
    type?: ButtonStyle
}

const styleMap = {
    solid: 'bg-blue-500 text-white',
    outline: 'border-2 border-blue-500 text-blue-500 bg-transparent',
    ghost: 'text-blue-500 bg-transparent',
}

function ButtonBlock({ text, url, isSelected, onUpdate, type = 'solid' }: ButtonBlockProps) {
    return (
        <div className="bg-white rounded-xl p-6 text-center">
            {isSelected ? (
                <div className="flex flex-col items-center gap-3">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => onUpdate?.({ text: e.target.value })}
                        placeholder="Button text"
                        className={`${styleMap[type]} inline-block px-6 py-3 rounded-full text-sm font-semibold outline-none text-center`}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => onUpdate?.({ url: e.target.value })}
                        placeholder="https://example.com"
                        className="text-sm text-gray-400 border border-gray-200 px-4 py-2 rounded-full outline-none w-64 text-center"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            ) : (
                <a href={url} className={`${styleMap[type]} inline-block px-6 py-3 rounded-full text-sm font-semibold`}>
                    {text}
                </a>
            )}
        </div>
    )
}

export default ButtonBlock