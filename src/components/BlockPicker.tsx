import type {BlockType} from "../types";
import {
    Monitor,
    AlignLeft,
    RectangleHorizontal,
    Image,
    Minus,
    MoveVertical,
    Code
} from 'lucide-react'

interface BlockPickerProps {
    onSelect: (type: BlockType) => void
}

function BlockPicker({onSelect}: BlockPickerProps) {
    const blockOptions: {type: BlockType, label: string, icon: React.ReactNode}[] = [
        { type: 'hero', label: 'Hero', icon: <Monitor size={20} /> },
        { type: 'text', label: 'Text', icon: <AlignLeft size={20} /> },
        { type: 'button', label: 'Button', icon: <RectangleHorizontal size={20} /> },
        { type: 'image', label: 'Image', icon: <Image size={20} /> },
        { type: 'divider', label: 'Divider', icon: <Minus size={20} /> },
        { type: 'spacer', label: 'Spacer', icon: <MoveVertical size={20} /> },
        { type: 'html', label: 'HTML', icon: <Code size={20} /> },
    ]
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80">
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Pick a block</span>
                <span className="text-xs text-gray-400">or press /</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {blockOptions.map((option) => (
                    <button
                        key={option.type}
                        onClick={() => onSelect(option.type)}
                        className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <span className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-600 group-hover:border-gray-300">{option.icon}</span>
                        <span className="text-xs text-gray-600">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default BlockPicker;