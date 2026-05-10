interface TextBlockProps {
    content: string
}

function TextBlock({content}: TextBlockProps) {
    return (
        <div className="bg-white rounded-xl p-6">
            <p className="text-gray-700">
                {content}
            </p>
        </div>
    )
}

export default TextBlock;