interface ButtonBlockProps {
    text: string
    url?: string
}

function ButtonBlock({text, url}: ButtonBlockProps) {
    return (
        <div className="bg-white rounded-xl p-6">
            <a href={url} className="text-blue-500 hover:underline">{text}</a>
        </div>
    )
}

export default ButtonBlock;