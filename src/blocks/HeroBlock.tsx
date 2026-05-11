interface HeroBlockProps {
    title: string
    subtitle: string
    isSelected?: boolean
    onUpdate?: (data: { title?: string, subtitle?: string}) => void
}

function HeroBlock({title, subtitle, isSelected, onUpdate}: HeroBlockProps) {
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-12 text-center text-white">
            {isSelected ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onUpdate?.({ title: e.target.value })}
                        className="text-3xl font-bold bg-transparent text-white text-center w-full outline-none"
                    />
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => onUpdate?.({ subtitle: e.target.value })}
                        className="text-lg mt-4 bg-transparent text-white text-center w-full outline-none"
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