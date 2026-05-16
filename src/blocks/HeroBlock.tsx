import type {HeroStyle} from "../types";

interface HeroBlockProps {
    title: string
    subtitle: string
    isSelected?: boolean
    onUpdate?: (data: { title?: string, subtitle?: string}) => void
    style?: HeroStyle
}
const styleMap: Record<string, string> = {
    'centered': 'text-center',
    'left': 'text-left',
    'right': 'text-right',
}

function HeroBlock({title, subtitle, isSelected, onUpdate, style='centered'}: HeroBlockProps) {
    return (
        <div className={`bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-12 ${styleMap[style]} text-white`}>
            {isSelected ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onUpdate?.({ title: e.target.value })}
                        className={`text-3xl font-bold bg-transparent text-white ${styleMap[style]} w-full outline-none`}
                    />
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => onUpdate?.({ subtitle: e.target.value })}
                        className={`text-lg mt-4 bg-transparent text-white ${styleMap[style]} w-full outline-none`}
                    />
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-white/80">{subtitle}</p>
                </>
            )}
        </div>
    )
}

export default HeroBlock;