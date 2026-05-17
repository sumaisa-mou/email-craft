import type { Block } from '../types'

export function blocksToHtml(blocks: Block[]): string {
    const bodyContent = blocks.map(block => blockToHtml(block)).join('\n')

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        ${bodyContent}
    </div>
</body>
</html>`
}

function blockToHtml(block: Block): string {
    switch (block.type) {
        case 'hero': {
            const alignMap: Record<string, string> = { centered: 'center', left: 'left', right: 'right' }
            const style = (block.data.style as string) || 'centered'
            return `<div style="background: linear-gradient(to right, #6366f1, #3b82f6); border-radius: 12px; padding: 40px; text-align: ${alignMap[style]}; color: #ffffff;">
    <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">${block.data.title}</h1>
    <p style="margin: 0; opacity: 0.8;">${block.data.subtitle}</p>
</div>`
        }

        case 'text': {
            const styleMap: Record<string, string> = {
                bold: 'font-weight: bold;',
                italic: 'font-style: italic;',
                underline: 'text-decoration: underline;',
                strike: 'text-decoration: line-through;',
            }
            const textStyle = block.data.style as string
            const inlineStyle = textStyle ? styleMap[textStyle] : ''
            return `<div style="padding: 16px 0;">
    <p style="margin: 0; color: #374151; line-height: 1.6; ${inlineStyle}">${block.data.content}</p>
</div>`
        }

        case 'button': {
            const btnStyles: Record<string, string> = {
                solid: 'background-color: #3b82f6; color: #ffffff; border: none;',
                outline: 'background-color: transparent; color: #3b82f6; border: 2px solid #3b82f6;',
                ghost: 'background-color: transparent; color: #3b82f6; border: none;',
            }
            const btnType = (block.data.type as string) || 'solid'
            return `<div style="padding: 8px 0; text-align: center;">
    <a href="${block.data.url}" style="display: inline-block; padding: 12px 24px; border-radius: 9999px; font-size: 14px; font-weight: 600; text-decoration: none; ${btnStyles[btnType]}">${block.data.text}</a>
</div>`
        }

        case 'divider':
            return `<div style="padding: 16px 0;">
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;">
</div>`

        case 'spacer': {
            const heights: Record<string, string> = { small: '16px', medium: '32px', large: '64px' }
            const size = (block.data.size as string) || 'medium'
            return `<div style="height: ${heights[size]};"></div>`
        }

        case 'image':
            if (!block.data.src) {
                return `<div style="padding: 8px 0;">
    <div style="background-color: #f3f4f6; border-radius: 8px; height: 160px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">No image</div>
</div>`
            }
            return `<div style="padding: 8px 0;">
    <img src="${block.data.src}" alt="${block.data.alt || ''}" style="width: 100%; border-radius: 8px; display: block;">
</div>`

        case 'html':
            if (!block.data.code) {
                return ''
            }
            return `<div style="padding: 8px 0;">
    ${block.data.code}
</div>`

        default:
            return ''
    }
}