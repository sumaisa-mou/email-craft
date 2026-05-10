interface HeroBlockProps {
    title: string
    subtitle: string
}

function HeroBlock({title, subtitle}: HeroBlockProps) {
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-12 text-center text-white">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-white/80">{subtitle}</p>
        </div>
    )
}

export default HeroBlock;