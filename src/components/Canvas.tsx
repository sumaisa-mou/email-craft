import HeroBlock from "../blocks/HeroBlock";
import TextBlock from "../blocks/TextBlock";
import ButtonBlock from "../blocks/ButtonBlock";
import DividerBlock from "../blocks/DividerBlock";
import SpacerBlock from "../blocks/SpacerBlock";
import { useState } from "react";
import type {Block, BlockType} from "../types";
import BlockPicker from "./BlockPicker";
import BlockWrapper from "./BlockWrapper.tsx";
import HTMLBlock from "../blocks/HTMLBlock.tsx";
import ImageBlock from "../blocks/ImageBlock";

const initialState: Block[] = [
    {
        id: '1',
        type: 'hero',
        data: {
            title: 'Welcome to EmailCraft',
            subtitle: 'Your personalized email builder.'
        }
    },
    {
        id: '2',
        type: 'text',
        data: {
            content: "Hi Casey, thanks for signing up. We're glad to have you on board — here's everything you need to get started."
        }
    },
    {
        id: '3',
        type: 'button',
        data: {
            text: 'Get Started →',
            url: 'https://example.com'
        }

    }
]
function Canvas() {
    const [blocks, setBlocks] = useState<Block[]>(initialState);
    const [showPicker, setShowPicker] = useState(false)
    const [selectedId, setSelectedId] = useState<string|null>(null)

    const addBlock= (type: BlockType) => {
        const newBlock: Block = {
            id: Date.now().toString(),
            type,
            data: getDefaultData(type)
        }
        setBlocks([...blocks, newBlock])
        setShowPicker(false)
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

            {blocks.map((block) => {
                if (block.type === 'hero') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                        <HeroBlock title={block.data.title as string} subtitle={block.data.subtitle as string}
                                    isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)} />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'text') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <TextBlock
                                key={block.id}
                                content={block.data.content as string}
                                isSelected={selectedId === block.id} onUpdate={(data) => updateBlock(block.id, data)}
                            />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'button') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <ButtonBlock
                                text={block.data.text as string}
                                url={block.data.url as string}
                                isSelected={selectedId === block.id}
                                onUpdate={(data) => updateBlock(block.id, data)}
                            />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'divider') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <DividerBlock />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'spacer') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <SpacerBlock
                                size={block.data.size as 'small' | 'medium' | 'large'}
                                isSelected={selectedId === block.id}
                                onUpdate={(data) => updateBlock(block.id, data)}
                            />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'html') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <HTMLBlock code={block.data.code as string}
                                       isSelected={selectedId === block.id}
                                       onUpdate={(data) => updateBlock(block.id, data)}
                            />
                        </BlockWrapper>
                    )
                }
                if (block.type === 'image') {
                    return (
                        <BlockWrapper
                            key={block.id}
                            id={block.id}
                            isSelected={selectedId === block.id}
                            onSelect={() => setSelectedId(block.id)}
                            onDelete={() => deleteBlock(block.id)}
                        >
                            <ImageBlock
                                src={block.data.src as string}
                                alt={block.data.alt as string}
                                isSelected={selectedId === block.id}
                                onUpdate={(data) => updateBlock(block.id, data)}
                            />
                        </BlockWrapper>
                    )
                }
                return null;
            })}

            <div className="flex flex-col items-center py-4">
                <button onClick={() => setShowPicker(!showPicker)} className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center text-xl">
                    +
                </button>

                {showPicker && (
                    <div className="mt-4">
                        <BlockPicker
                            onSelect={addBlock}
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