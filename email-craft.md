# EmailCraft - Simple, Opinionated Email Editor for React

## Vision

A lightweight, embeddable drag-and-drop email editor that prioritizes simplicity over flexibility. While other builders overwhelm users with options, EmailCraft guides them toward emails that actually work everywhere.

**Core Philosophy:** "Less options, better emails"

---

## What Makes It Unique

### 1. Notion-Like Simplicity
Not a complex builder with toolbars everywhere. Clean, minimal interface where you:
- Click "+" to add a block
- Type "/" to search blocks (like Notion)
- Drag to reorder
- Click block to edit inline

### 2. Smart Defaults, Not Endless Options
Each block has 2-3 tested styles instead of 50 customization options:
- Button: `solid` | `outline` | `ghost`
- Hero: `centered` | `left` | `minimal`
- That's it. All guaranteed to work.

### 3. HTML Block
People use ChatGPT/Claude to generate email HTML. EmailCraft embraces this:
- Add HTML Block, paste code, see it rendered
- Simple and direct - no complex code editors
- Perfect for AI-generated snippets

### 4. Email Health Score
A live score (0-100) showing email compatibility:
```
Email Health: 94/100 ✓
- ✓ Works in Gmail
- ✓ Works in Apple Mail  
- ⚠ Button corners square in Outlook (minor)
```

### 5. JSON + HTML Output
Like Editor.js - save JSON, export HTML:
```js
{ json: {...}, html: "<table>..." }
```

### 6. Tiny Bundle
Target: <80KB gzipped (vs 1MB+ competitors)

---

## User Experience Flow

### Adding Content
```
1. User sees empty canvas with "+" button
2. Clicks "+" or types "/"
3. Block picker appears (6-8 blocks only)
4. Selects "Button"
5. Button appears, user types text inline
6. Clicks style toggle: solid → outline → ghost
7. Done. No modal, no sidebar, no overwhelm.
```

### The Interface
```
┌─────────────────────────────────────────────────────┐
│  EmailCraft                    Health: 94 ✓  Export │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │                                             │   │
│  │         Welcome to Acme          [drag]     │   │
│  │         Your account is ready               │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Hi {firstName},                            │   │
│  │                                             │   │
│  │  Thanks for signing up...                   │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│                      [ + ]                          │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │        [ Get Started → ]                    │   │
│  │         solid | outline | ghost             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Key UI Principles:**
- No left sidebar with 50 options
- No complex property panels
- Style options appear ON the block, not in a separate panel
- Inline editing (click text to edit)
- Drag handle appears on hover

---

## Developer API

### Basic Usage
```jsx
import { EmailEditor } from 'emailcraft';
import 'emailcraft/styles.css';

function App() {
  const [data, setData] = useState(null);

  return (
    <EmailEditor
      initialValue={savedData}
      onChange={({ json, html }) => {
        setData(json);
        console.log(html); // Ready to send
      }}
    />
  );
}
```

### With Configuration
```jsx
<EmailEditor
  initialValue={savedData}
  onChange={handleChange}
  
  // Blocks to enable (html block included!)
  blocks={['hero', 'text', 'button', 'image', 'divider', 'spacer', 'html']}
  
  // Theme
  theme={{
    primary: '#3b82f6',
    radius: '8px',
    fontFamily: 'Inter, sans-serif'
  }}
  placeholder="Start building your email..."
  
  // Image upload handler
  onImageUpload={async (file) => {
    const url = await uploadToS3(file);
    return url;
  }}
  allowImageUrl={true}  // Also allow URL paste
  
  // Callbacks
  onExport={(html) => sendEmail(html)}
  onHealthChange={(score, issues) => console.log(score, issues)}
/>
```

### Accessing Editor Instance
```jsx
const editorRef = useRef();

<EmailEditor ref={editorRef} />

// Later
editorRef.current.getJSON();      // Get JSON data
editorRef.current.getHTML();      // Get email HTML
editorRef.current.getHealth();    // Get health score
editorRef.current.clear();        // Clear editor
editorRef.current.loadJSON(data); // Load saved data
```

---

## Output Format

### JSON Structure
```json
{
  "version": "1.0.0",
  "meta": {
    "created": "2026-05-09T10:00:00Z",
    "health": 94
  },
  "settings": {
    "backgroundColor": "#ffffff",
    "contentWidth": 600
  },
  "blocks": [
    {
      "id": "b1",
      "type": "hero",
      "style": "centered",
      "data": {
        "title": "Welcome to Acme",
        "subtitle": "Your account is ready",
        "backgroundColor": "#3b82f6",
        "textColor": "#ffffff"
      }
    },
    {
      "id": "b2",
      "type": "text",
      "data": {
        "content": "Hi {firstName}, thanks for signing up..."
      }
    },
    {
      "id": "b3",
      "type": "button",
      "style": "solid",
      "data": {
        "text": "Get Started",
        "url": "https://acme.com/start",
        "color": "#3b82f6"
      }
    },
    {
      "id": "b4",
      "type": "html",
      "data": {
        "code": "<table style='width:100%'>...</table>"
      }
    }
  ]
}
```

### HTML Output
Clean, table-based HTML that works everywhere:
- Inline styles (no external CSS)
- MSO conditionals for Outlook
- Proper dark mode meta tags
- Responsive with media queries where supported

---

## Blocks (MVP - Keep It Minimal)

### 1. Hero
**Styles:** `centered` | `left` | `minimal`
**Editable:** title, subtitle, background color, image (optional)

### 2. Text
**Styles:** `paragraph` | `heading` | `caption`
**Editable:** content (rich text: bold, italic, link)

### 3. Button
**Styles:** `solid` | `outline` | `ghost`
**Editable:** text, url, color

### 4. Image
**Styles:** `full` | `contained` | `rounded`
**Editable:** src, alt, link (optional)
**Upload:** via developer callback (see Image Handling section)

### 5. Divider
**Styles:** `solid` | `dashed` | `dots`
**Editable:** color

### 6. Spacer
**Styles:** `small` (16px) | `medium` (32px) | `large` (48px)

### 7. HTML Block
**Purpose:** Paste custom or AI-generated HTML
**How it works:**
- User adds HTML block (like any other block)
- Pastes HTML code into the block
- Block renders the HTML visually
- Raw HTML saved in JSON, output in final email
**Use Case:** User generates HTML from ChatGPT, pastes it here, done

### 8. Columns (v1.1)
**Styles:** `two-equal` | `three-equal` | `sidebar`
**Contains:** nested blocks

### 9. Footer (v1.1)
**Styles:** `minimal` | `social` | `full`
**Editable:** company, address, links

---

## Image Handling

Since EmailCraft is a package (not a full app), image storage is the developer's responsibility.

### Simplified Callback Approach
```jsx
<EmailEditor
  onImageUpload={async (file) => {
    // Developer uploads to their service (S3, Cloudinary, etc.)
    const url = await uploadToMyServer(file);
    return url;  // Just return the URL
  }}
  
  // Optional: allow pasting image URLs directly
  allowImageUrl={true}
/>
```

### How It Works
1. User clicks Image block → sees upload dropzone
2. User drops/selects a file
3. Package shows loading state
4. Package calls `onImageUpload(file)`
5. Developer's function uploads and returns URL
6. Package displays image with returned URL

### If No Callback Provided
- Only URL paste option is available
- User enters image URL directly
- Good for users who already have hosted images

### JSON Output for Image Block
```json
{
  "id": "img1",
  "type": "image",
  "style": "contained",
  "data": {
    "url": "https://cdn.example.com/image.jpg",
    "alt": "Product screenshot",
    "link": "https://example.com"
  }
}
```

---

## Email Health System

### How It Works
Each block and combination is scored:

```typescript
interface HealthCheck {
  score: number;        // 0-100
  issues: Issue[];
}

interface Issue {
  severity: 'error' | 'warning' | 'info';
  client: string;       // 'outlook' | 'gmail' | etc
  message: string;
  blockId: string;
}
```

### Scoring Rules
```typescript
const HEALTH_RULES = {
  // Errors (-20 points each)
  'image-no-alt': { severity: 'error', points: -20 },
  'button-no-url': { severity: 'error', points: -20 },
  
  // Warnings (-5 points each)
  'border-radius-outlook': { severity: 'warning', points: -5 },
  'background-image-outlook': { severity: 'warning', points: -5 },
  'custom-font': { severity: 'warning', points: -5 },
  
  // Info (no points, just FYI)
  'dark-mode-invert': { severity: 'info', points: 0 },
};
```

### Display
```
┌──────────────────────────────────┐
│  Health: 94/100                  │
│  ──────────────────────────────  │
│  ✓ Gmail        ✓ Apple Mail    │
│  ⚠ Outlook (1)  ✓ Yahoo         │
│                                  │
│  ⚠ Button corners will be       │
│    square in Outlook             │
└──────────────────────────────────┘
```

---

## Architecture

### Package Structure
```
emailcraft/
├── src/
│   ├── EmailEditor.tsx           # Main component
│   ├── components/
│   │   ├── Canvas.tsx            # Drop zone + block list
│   │   ├── Block.tsx             # Block wrapper (drag, select)
│   │   ├── BlockPicker.tsx       # "+" menu / "/" command
│   │   ├── HealthBadge.tsx       # Score display
│   │   └── ExportButton.tsx
│   ├── blocks/
│   │   ├── Hero.tsx
│   │   ├── Text.tsx
│   │   ├── Button.tsx
│   │   ├── Image.tsx
│   │   ├── Divider.tsx
│   │   ├── Spacer.tsx
│   │   └── HtmlBlock.tsx         # Custom HTML paste block
│   ├── renderer/
│   │   ├── toHTML.ts             # JSON → Email HTML
│   │   ├── toJSON.ts             # Editor state → JSON
│   │   └── templates/            # HTML templates per block
│   ├── health/
│   │   ├── checker.ts            # Run health checks
│   │   └── rules.ts              # All rules
│   ├── hooks/
│   │   ├── useEditor.ts          # Editor state
│   │   ├── useDragDrop.ts        # DnD logic
│   │   └── useHealth.ts          # Health calculation
│   ├── styles/
│   │   └── editor.css            # Minimal styles
│   └── index.ts                  # Public exports
├── playground/                    # Demo site
└── docs/                          # Documentation
```

### Dependencies (Minimal)
```json
{
  "dependencies": {
    "react": "^18.0.0"
  },
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  }
}
```

**No external dependencies for:**
- Drag and drop (use native HTML5 DnD or minimal custom)
- Rich text (contentEditable with minimal formatting)
- State management (React useState/useReducer)

---

## Development Phases

### Phase 1: Core Editor (Week 1)
- [ ] Project setup (TypeScript, Vite, build config)
- [ ] EmailEditor component shell
- [ ] Canvas with block rendering
- [ ] Block wrapper (select, delete)
- [ ] 3 blocks: Text, Button, Divider
- [ ] Basic JSON output

### Phase 2: Interaction (Week 2)
- [ ] Drag and drop reordering
- [ ] Block picker ("+" button)
- [ ] "/" command to add blocks
- [ ] Inline editing for text
- [ ] Style toggles on blocks
- [ ] 3 more blocks: Hero, Image, Spacer
- [ ] HTML Block (paste and render)
- [ ] Image upload callback integration

### Phase 3: Output & Health (Week 3)
- [ ] HTML renderer (JSON → email HTML)
- [ ] Health scoring system
- [ ] Health badge UI
- [ ] Client compatibility rules
- [ ] Export functionality

### Phase 4: Polish (Week 4)
- [ ] Theme customization
- [ ] Responsive preview
- [ ] Documentation site
- [ ] Playground demo
- [ ] npm publish
- [ ] LinkedIn showcase

---

## Competitive Positioning

| Aspect | Unlayer | GrapesJS | EmailCraft |
|--------|---------|----------|------------|
| Philosophy | Everything possible | Everything possible | Guided simplicity |
| Options per block | 20+ | 30+ | 2-3 styles |
| Learning curve | Steep | Steep | Instant |
| Bundle size | ~800KB | ~1.3MB | <80KB |
| Output format | HTML | HTML | JSON + HTML |
| Health score | No | No | Yes |
| HTML Block (AI paste) | No | Limited | Yes (first-class) |
| React-native | No (wrapper) | No (wrapper) | Yes |
| Price | Freemium | Free | Free |

### The AI-Ready Advantage
Other builders were designed before ChatGPT. EmailCraft is built for 2026:
- Generate HTML with AI → paste into HTML Block → done

---

## Success Criteria

### For Portfolio/LinkedIn
- [ ] Clean, working npm package
- [ ] Interactive demo (build email in 30 seconds)
- [ ] Comparison video: "Unlayer vs EmailCraft"
- [ ] GitHub with good README
- [ ] <100KB bundle size claim

### Technical
- [ ] TypeScript with full types
- [ ] Zero external runtime dependencies
- [ ] Works with React 17, 18, 19
- [ ] SSR compatible
- [ ] A11y compliant editor

---

## The Pitch (For LinkedIn)

> **EmailCraft** - The email builder that says "no" so your emails say "yes" everywhere.
>
> While other builders give you 50 ways to break Outlook, EmailCraft gives you 3 styles that work. Simple API, tiny bundle (<80KB), JSON+HTML output.
>
> Plus: Paste HTML from ChatGPT directly into the HTML Block.
>
> `npm install emailcraft`

### LinkedIn Post Hook Ideas
1. "Most email builders have 50+ options. Mine has 3. Here's why."
2. "80KB vs 1.3MB - why I built the smallest React email editor"
3. "I built an email editor where you can paste ChatGPT output directly"
