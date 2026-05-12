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
}

function Canvas({blocks, setBlocks, selectedId, setSelectedId, showPicker, setShowPicker, insertIndex, setInsertIndex}: CanvasProps) {

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

    return (
        <div className="w-full max-w-[600px] flex flex-col gap-4">

            {blocks.map((block, index) => {
                const renderBlockContent = () => {
                    switch (block.type) {
                        case 'hero':
                            return <HeroBlock title={block.data.title as string} subtitle={block.data.subtitle as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'text':
                            return <TextBlock content={block.data.content as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'button':
                            return <ButtonBlock text={block.data.text as string} url={block.data.url as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'divider':
                            return <DividerBlock />
                        case 'spacer':
                            return <SpacerBlock size={block.data.size as 'small' | 'medium' | 'large'} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'html':
                            return <HTMLBlock code={block.data.code as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        case 'image':
                            return <ImageBlock src={block.data.src as string} alt={block.data.alt as string} isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
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
                                        onClose={() => {
                                            setShowPicker(false)
                                            setInsertIndex(null)
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <BlockWrapper
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
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
                            onClose={() => setShowPicker(false)}
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
            return { text: 'Click me', url: '#' }
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