import type { Block } from '../../types'

interface PreviewBlocksProps {
    blocks: Block[]
}

function PreviewBlocks({ blocks }: PreviewBlocksProps) {
    return (
        <div className="flex flex-col">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'hero':
                        return (
                            <div
                                key={block.id}
                                className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-10 text-center text-white"
                            >
                                <h1 className="text-2xl font-bold mb-2">{block.data.title as string}</h1>
                                <p className="text-white/80">{block.data.subtitle as string}</p>
                            </div>
                        )

                    case 'text':
                        return (
                            <div key={block.id} className="py-4">
                                <p className="text-gray-700 leading-relaxed">{block.data.content as string}</p>
                            </div>
                        )

                    case 'button':
                        const btnAlign = {
                            left: 'text-left',
                            center: 'text-center',
                            right: 'text-right',
                        }
                        const btnPos = (block.data.position as string) || 'center'
                        return (
                            <div key={block.id} className={`py-2 ${btnAlign[btnPos as keyof typeof btnAlign]}`}>
                                <a
                                    href={block.data.url as string}
                                    className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold"
                                >
                                    {block.data.text as string}
                                </a>
                            </div>
                        )

                    case 'divider':
                        return (
                            <div key={block.id} className="py-4">
                                <hr className="border-gray-200" />
                            </div>
                        )

                    case 'spacer':
                        const heights = { small: 'h-4', medium: 'h-8', large: 'h-16' }
                        const size = (block.data.size as string) || 'medium'
                        return (
                            <div key={block.id} className={heights[size as keyof typeof heights]} />
                        )

                    case 'image':
                        return (
                            <div key={block.id} className="py-2">
                                {block.data.src ? (
                                    <img
                                        src={block.data.src as string}
                                        alt={block.data.alt as string}
                                        className="w-full rounded-lg"
                                    />
                                ) : (
                                    <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-400">
                                        No image
                                    </div>
                                )}
                            </div>
                        )

                    case 'html':
                        return (
                            <div key={block.id} className="py-2">
                                {block.data.code ? (
                                    <div dangerouslySetInnerHTML={{ __html: block.data.code as string }} />
                                ) : (
                                    <div className="text-gray-400 text-center py-4">Empty HTML block</div>
                                )}
                            </div>
                        )

                    default:
                        return null
                }
            })}
        </div>
    )
}

export default PreviewBlocks