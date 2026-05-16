import type { Block } from '../../types'
import type { ClientQuirk } from '../../utils/clientQuirks'

interface ClientPreviewBlocksProps {
    blocks: Block[]
    quirks: ClientQuirk
}

function ClientPreviewBlocks({ blocks, quirks }: ClientPreviewBlocksProps) {
    return (
        <div className="flex flex-col">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'hero':
                        const heroStyles: Record<string, string> = {
                            centered: 'text-center',
                            left: 'text-left',
                            right: 'text-right',
                        }
                        const heroStyle = (block.data.style as string) || 'centered'
                        return (
                            <div key={block.id} className="relative">
                                <div
                                    className={`p-8 ${heroStyles[heroStyle]} text-white ${
                                        quirks.noGradient
                                            ? 'bg-indigo-500'
                                            : 'bg-gradient-to-r from-indigo-500 to-blue-500'
                                    } ${quirks.noBorderRadius ? '' : 'rounded-xl'}`}
                                >
                                    <h1 className="text-xl font-bold mb-2">{block.data.title as string}</h1>
                                    <p className="text-white/80 text-sm">{block.data.subtitle as string}</p>
                                </div>
                                {quirks.noGradient && (
                                    <DegradationBadge text="gradient → solid" />
                                )}
                            </div>
                        )

                    case 'text':
                        const textStyles: Record<string, string> = {
                            bold: 'font-bold',
                            italic: 'italic',
                            underline: 'underline',
                            strike: 'line-through',
                        }
                        const textStyle = block.data.style as string
                        return (
                            <div key={block.id} className="py-4">
                                <p className={`text-gray-700 text-sm leading-relaxed ${textStyle ? textStyles[textStyle] : ''}`}>{block.data.content as string}</p>
                            </div>
                        )

                    case 'button':
                        const btnStyles = {
                            solid: 'bg-blue-500 text-white',
                            outline: 'border-2 border-blue-500 text-blue-500',
                            ghost: 'text-blue-500',
                        }
                        const btnType = (block.data.type as string) || 'solid'
                        return (
                            <div key={block.id} className="relative py-2 text-center">
                                <span
                                    className={`inline-block px-6 py-3 text-sm font-semibold ${btnStyles[btnType as keyof typeof btnStyles]} ${
                                        quirks.noBorderRadius ? '' : 'rounded-full'
                                    }`}
                                >
                                    {block.data.text as string}
                                </span>
                                {quirks.noBorderRadius && (
                                    <DegradationBadge text="square corners" />
                                )}
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
                                        className={`w-full ${quirks.noBorderRadius ? '' : 'rounded-lg'}`}
                                    />
                                ) : (
                                    <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-400 text-sm rounded-lg">
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
                                    <div className="text-gray-400 text-center py-4 text-sm">Empty HTML</div>
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

function DegradationBadge({ text }: { text: string }) {
    return (
        <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
            <span className="text-amber-200">⚠</span> {text}
        </span>
    )
}

export default ClientPreviewBlocks