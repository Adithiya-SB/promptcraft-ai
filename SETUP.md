# PromptCraft AI - Setup Guide

## Quick Start

### 1. Install Dependencies

```powershell
npm install
```

### 2. Start Development Server

```powershell
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```powershell
npm run build
```

### 4. Preview Production Build

```powershell
npm run preview
```

## Project Structure

```
promptcraft-ai/
├── src/
│   ├── components/tambo/     # Tambo component library
│   ├── pages/                # Main pages
│   ├── tamboRenderer/        # Dynamic renderer
│   ├── layoutEngine/         # Layout calculation
│   ├── llm/                  # Prompt parser
│   ├── store/                # State management
│   ├── templates/            # Prebuilt templates
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utilities
│   ├── types/                # TypeScript types
│   └── styles/               # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
├── vite.config.ts            # Vite config
└── README.md                 # Documentation
```

## Features

✅ **Prompt-to-UI Generation** - Natural language → Live UI  
✅ **Real-time Rendering** - Instant preview with animations  
✅ **Smart Layout Engine** - Responsive 12-column grid  
✅ **Undo/Redo** - Full history management  
✅ **Code Export** - Download React + TypeScript  
✅ **Theme Switching** - Dark/Light mode  
✅ **Keyboard Shortcuts** - Ctrl+Z, Ctrl+Shift+Z, Ctrl+E, Ctrl+S  
✅ **8 Templates** - Prebuilt app templates  
✅ **Tambo Components** - Card, Table, Chart, Form, Header, Map, Button  

## Usage

### Landing Page
- View features and demo
- Click "Launch Studio" or "View Templates"

### Studio
1. Enter a prompt (e.g., "Create a dashboard with charts")
2. Click "Generate" or press Enter
3. Watch the UI generate in real-time
4. Use suggestions panel to improve layout
5. Export code with "Export Code" button

### Templates
- Browse 8 prebuilt templates
- Click any template to load it into Studio
- Customize as needed

## Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + E` - Export code
- `Ctrl/Cmd + S` - Save project (placeholder)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Recharts
- Lucide React
- React Router
- Vite

## Troubleshooting

### Dependencies not installing
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

### Port already in use
```powershell
# Change port in vite.config.ts or use:
npm run dev -- --port 3000
```

### Build errors
```powershell
# Clean build
npm run build -- --clean
```

## Development

### Adding New Components
1. Create component in `src/components/tambo/`
2. Add to `src/tamboRenderer/index.tsx`
3. Update types in `src/types/index.ts`

### Adding New Templates
1. Add template to `src/templates/index.ts`
2. Follow existing template structure

### Modifying Prompt Parser
Edit `src/llm/promptParser.ts` to add new intents or improve generation

## Production Deployment

### Build
```powershell
npm run build
```

### Deploy to Vercel
```powershell
npm i -g vercel
vercel
```

### Deploy to Netlify
```powershell
npm run build
# Drag dist folder to Netlify
```

## License

MIT

---

**Built with ❤️ for the hackathon**
