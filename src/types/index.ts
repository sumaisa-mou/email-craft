export type BlockType = 'hero' | 'text' | 'image' | 'button' | 'html' | 'divider' | 'spacer'

export type HeoStyle = 'centered' | 'left' | 'minimal'
export type ButtonStyle = 'solid' | 'outline' | 'ghost'
export type DividerStyle = 'solid' | 'dashed' | 'dots'
export type SpacerStyle = 'small' | 'medium' | 'large'

export interface Block {
    id: string,
    type: BlockType,
    data: Record<string, unknown>,
    style?: string
}

export interface EditorState {
    blocks: Block[]
    selectedBlockId?: string
}