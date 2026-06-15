# Email Craft Editor

A React-based drag-and-drop email builder with real-time multi-client preview and compatibility scoring.

[![npm version](https://img.shields.io/npm/v/@sumaisa/email-craft-editor.svg)](https://www.npmjs.com/package/@sumaisa/email-craft-editor)
[![license](https://img.shields.io/npm/l/@sumaisa/email-craft-editor.svg)](https://github.com/sumaisa-mou/email-craft/blob/main/LICENSE)

[Live Demo](https://email-craft-flame.vercel.app/) | [GitHub](https://github.com/sumaisa-mou/email-craft)

---

## Why Email Craft?

Most email builders let you design emails — but they don't show you how they'll actually render across different clients until you send a test.

**Email Craft solves this.** It simulates client-specific rendering quirks (Outlook strips gradients, ignores border-radius, etc.) and shows you a side-by-side preview of Gmail, Outlook, Apple Mail, and Yahoo — in real time.

### Key Features

- **Multi-client Preview** — See how your email renders in Gmail, Outlook, Apple Mail, and Yahoo simultaneously
- **Client Quirks Simulation** — Applies real rendering differences based on [caniemail.com](https://caniemail.com) data
- **Health Scoring** — Real-time compatibility score with per-client breakdown
- **Block-based Editor** — Hero, Text, Button, Image, Divider, Spacer, and raw HTML blocks
- **JSON + HTML Export** — Get structured data or ready-to-send HTML
- **Image Upload Support** — Optional callback for custom image upload handling

### About Client Preview

The multi-client preview is a **simulation**, not actual rendering in email clients. It applies known CSS quirks and limitations based on data from [caniemail.com](https://caniemail.com):

| Client | Simulated Quirks |
|--------|------------------|
| Gmail | Full support (baseline) |
| Apple Mail | Full support |
| Outlook | No gradients, no border-radius, no flexbox |
| Yahoo | No gradients |

**This is an approximation** to help catch common compatibility issues during design. For production emails, we recommend testing with actual email testing services like Litmus or Email on Acid.

---

## Installation

```bash
npm install @sumaisa/email-craft-editor
```

Then import the CSS in your app:

```tsx
import '@sumaisa/email-craft-editor/style.css'
```

---

## Quick Start

```tsx
import { EmailEditor, blocksToHtml } from '@sumaisa/email-craft-editor'
import '@sumaisa/email-craft-editor/style.css'
import type { Block } from '@sumaisa/email-craft-editor'
import { useState } from 'react'

function App() {
  const [blocks, setBlocks] = useState<Block[]>([])

  const handleExport = () => {
    // Get JSON
    const json = JSON.stringify(blocks, null, 2)
    console.log('JSON:', json)

    // Get HTML
    const html = blocksToHtml(blocks)
    console.log('HTML:', html)
  }

  return (
    <div>
      <EmailEditor onBlocksChange={setBlocks} />
      <button onClick={handleExport}>Export</button>
    </div>
  )
}
```

---

## API Reference

### `<EmailEditor />`

| Prop | Type | Description |
|------|------|-------------|
| `onBlocksChange` | `(blocks: Block[]) => void` | Called whenever blocks change |
| `initialBlocks` | `Block[]` | Initial blocks to render |
| `onImageUpload` | `(file: File) => Promise<string>` | Optional. Handle image uploads, return URL |

### `blocksToHtml(blocks)`

Converts blocks array to a complete HTML email document with inline styles.

```tsx
import { blocksToHtml } from '@sumaisa/email-craft-editor'

const html = blocksToHtml(blocks)
// Returns: <!DOCTYPE html><html>...
```

### Block Types

```typescript
type BlockType = 'hero' | 'text' | 'image' | 'button' | 'html' | 'divider' | 'spacer'

interface Block {
  id: string
  type: BlockType
  data: Record<string, unknown>
}
```

---

## Image Upload

By default, images use URL input only. To enable file upload, provide the `onImageUpload` callback:

```tsx
<EmailEditor 
  onImageUpload={async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const { url } = await res.json()
    return url
  }}
/>
```

When `onImageUpload` is provided, an "Upload" button appears alongside the URL input.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Tailwind CSS 4 | Styling |
| Vite | Build Tool |

---

## Browser Support

The editor works in all modern browsers. The generated HTML email uses inline styles for maximum email client compatibility.

---

## License

MIT

---

Built by [@sumaisa-mou](https://github.com/sumaisa-mou)