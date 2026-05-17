import HeroBlock from "../blocks/HeroBlock";
import TextBlock from "../blocks/TextBlock";
import ButtonBlock from "../blocks/ButtonBlock";
import DividerBlock from "../blocks/DividerBlock";
import SpacerBlock from "../blocks/SpacerBlock";
import type {Block, BlockType} from "../types";
import BlockPicker from "./BlockPicker";
import BlockWrapper from "./BlockWrapper.tsx";
import HTMLBlock from "../blocks/HTMLBlock.tsx";
import ImageBlock from "../blocks/ImageBlock";
import InsertButton from "./InsertButton";
import * as React from "react";

interface CanvasProps{
    blocks: Block[]
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
    selectedId: string | null
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
    showPicker: boolean
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
    insertIndex: number | null
    setInsertIndex: React.Dispatch<React.SetStateAction<number | null>>
    onImageUpload?: (file: File) => Promise<string>
}

function Canvas({blocks, setBlocks, selectedId, setSelectedId, showPicker, setShowPicker, insertIndex, setInsertIndex, onImageUpload}: CanvasProps) {

    const addBlock= (type: BlockType, index?: number) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            data: getDefaultData(type)
        }
        if (index !== undefined) {
            const newBlocks = [...blocks]
            newBlocks.splice(index, 0, newBlock)
            setBlocks(newBlocks)
        } else {
        setBlocks([...blocks, newBlock])
            }
        setShowPicker(false)
        setInsertIndex(null)
    }

    const handleInsertClick = (index: number) => {
        if (showPicker && insertIndex === index) {
            // Toggle off if clicking same button
            setShowPicker(false)
            setInsertIndex(null)
        } else {
            // Open picker at this index
            setInsertIndex(index)
            setShowPicker(true)
        }
    }

    const handleAddButtonClick = () => {
        if (showPicker && insertIndex === null) {
            // Toggle off
            setShowPicker(false)
        } else {
            // Open picker at bottom
            setInsertIndex(null)
            setShowPicker(true)
        }
    }
    const deleteBlock = (id: string) => {
        setBlocks(blocks.filter(block => block.id !== id))
        setSelectedId(null)
    }

    const updateBlock = (id: string, newData: Record<string, unknown>) => {
        setBlocks(blocks.map(block => block.id === id ? { ...block, data: { ...block.data, ...newData} } : block))
    }

    const getBlockToolbar = (block: Block) => {
        switch (block.type) {
            case 'button':
                return (
                    <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                        {(['solid', 'outline', 'ghost'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    updateBlock(block.id, { type: s })
                                }}
                                className={`px-4 py-1 text-xs rounded-full ${(block.data.type || 'solid') === s ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
                            >{s}</button>
                        ))}
                    </div>
                )
            case 'spacer':
                return (
                    <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                        {(['small', 'medium', 'large'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    updateBlock(block.id, { size: s })
                                }}
                                className={`px-4 py-1 text-xs rounded-full ${(block.data.size || 'medium') === s ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
                            >{s}</button>
                        ))}
                    </div>
                )
            case 'text':
                return (
                    <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                        {(['bold', 'italic', 'underline', 'strike'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    updateBlock(block.id, { style: block.data.style === s ? undefined : s })
                                }}
                                className={`px-3 py-1 text-xs rounded-full ${block.data.style === s ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
                            >{s}</button>
                        ))}
                    </div>
                )
            case 'hero':
                return (
                    <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                        {(['centered', 'left', 'right'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    updateBlock(block.id, { style: block.data.style === s ? undefined : s })
                                }}
                                className={`px-3 py-1 text-xs rounded-full ${block.data.style === s ? 'bg-gray-900 text-white' : 'text-gray-500'}`}
                            >{s}</button>
                        ))}
                    </div>
                )
            default:
                return undefined
        }
    }

    return (
        <div className="w-full max-w-[600px] flex flex-col gap-1">

            {blocks.map((block, index) => {
                const renderBlockContent = () => {
                    switch (block.type) {
                        case 'hero':
                            return <HeroBlock title={block.data.title as string} style={block.data.style as 'centered' | 'left' | 'right' } subtitle={block.data.subtitle as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'text':
                            return <TextBlock content={block.data.content as string} style={block.data.style as 'bold' | 'italic' | 'underline' | 'strike'} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'button':
                            return <ButtonBlock text={block.data.text as string} url={block.data.url as string} type={block.data.type as 'solid' | 'outline' | 'ghost'} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'divider':
                            return <DividerBlock />
                        case 'spacer':
                            return <SpacerBlock size={block.data.size as 'small' | 'medium' | 'large'} />
                        case 'html':
                            return <HTMLBlock code={block.data.code as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'image':
                            return <ImageBlock src={block.data.src as string} alt={block.data.alt as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} onImageUpload={onImageUpload} />
                        default:
                            return null
                    }
                }

                return (
                    <React.Fragment key={block.id}>
                        <InsertButton
                            onClick={() => handleInsertClick(index)}
                            isActive={showPicker && insertIndex === index}
                        />
                        {/* Show picker overlay if this index is active */}
                        {showPicker && insertIndex === index && (
                            <div className="relative z-50">
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 pt-2">
                                    {/* Arrow pointing up */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 z-10" />
                                    <BlockPicker
                                        onSelect={(type) => addBlock(type, insertIndex)}
                                    />
                                </div>
                            </div>
                        )}
                        <BlockWrapper
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                            toolbar={getBlockToolbar(block)}
                        >
                            {renderBlockContent()}
                        </BlockWrapper>
                    </React.Fragment>
                )
            })}

            <div className="flex flex-col items-center py-4 relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddButtonClick()
                    }}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-xl"
                >
                    +
                </button>

                {showPicker && insertIndex === null && (
                    <div className="mt-4">
                        <BlockPicker
                            onSelect={(type) => addBlock(type)}
                        />
                    </div>
                )}

            </div>
        </div>
    )
}

function getDefaultData(type: BlockType): Record<string, unknown>{
    switch (type) {
        case 'hero':
            return { title: 'Your Title', subtitle: 'Your subtitle here' }
        case 'text':
            return { content: 'Start typing...' }
        case 'button':
            return { text: 'Click me', url: '', type: 'solid' }
        case 'divider':
            return {}
        case 'spacer':
            return { size: 'medium' }
        case 'html':
            return { code: '' }
        case 'image':
            return { src: '', alt: '' }
        default:
            return {}
    }
}

export default Canvas;