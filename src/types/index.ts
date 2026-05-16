export type BlockType = 'hero' | 'text' | 'image' | 'button' | 'html' | 'divider' | 'spacer'

export type HeroStyle = 'centered' | 'left' | 'right'
export type ButtonStyle = 'solid' | 'outline' | 'ghost'
export type SpacerStyle = 'small' | 'medium' | 'large'
export type textStyle = 'bold' | 'italic' | 'underline' | 'strike'

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