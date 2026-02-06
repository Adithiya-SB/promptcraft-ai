# PromptCraft AI

A next-generation Generative UI platform that converts natural language prompts into fully functional, responsive UI screens in real-time.

**Tagline:** "Describe your app. We generate it."

## Features

✨ **Instant Generation** - Type a prompt and watch your UI come to life  
🎨 **Beautiful Design** - Premium glassmorphism UI with smooth animations  
🧩 **Component Library** - Dynamic Tambo components (Card, Table, Chart, Form, Map, etc.)  
🎯 **Smart Layout** - Intelligent responsive grid system  
🌓 **Dark/Light Theme** - Seamless theme switching  
⚡ **Live Editing** - Real-time UI morphing and updates  
📦 **Code Export** - Download production-ready React + TypeScript code  
🎭 **Templates** - 8+ prebuilt app templates  
⌨️ **Keyboard Shortcuts** - Undo/Redo and quick actions  
🎤 **Voice Input** - Speech-to-prompt conversion  

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── tambo/          # Tambo component library
├── pages/              # Main pages (Landing, Studio, Templates)
├── tamboRenderer/      # Dynamic component renderer
├── layoutEngine/       # Layout calculation and optimization
├── llm/                # Prompt parser and AI logic
├── store/              # Zustand state management
├── hooks/              # Custom React hooks
├── templates/          # Prebuilt app templates
├── utils/              # Utility functions
├── styles/             # Global styles
└── types/              # TypeScript definitions
```

## Usage

### 1. Landing Page
Visit the homepage to see the hero section and feature overview.

### 2. Studio
Click "Launch Studio" to access the main builder:
- **Left Panel**: Enter your prompt or select examples
- **Center Canvas**: Live preview of generated UI
- **Right Panel**: Smart suggestions and schema editor

### 3. Templates
Browse prebuilt templates and click to load them into the Studio.

## Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + S` - Save project
- `Ctrl/Cmd + E` - Export code

## Core Concepts

### Prompt Parser
Converts natural language into structured JSON schemas:
```
"Create a dashboard with charts" → LayoutSchema
```

### Layout Engine
Calculates responsive grid layouts automatically:
- 12-column grid system
- Auto-spacing and alignment
- Mobile-first responsive design

### Tambo Renderer
Dynamically renders components from JSON:
```typescript
<TamboRenderer components={schema.components} />
```

## Templates

1. **Startup Dashboard** - Analytics with metrics and charts
2. **Grocery Manager** - Inventory tracking with map
3. **Finance Tracker** - Personal finance management
4. **Admin Panel** - User management interface
5. **Portfolio** - Project showcase
6. **E-Commerce** - Product catalog
7. **Analytics** - Data visualization
8. **Contact Form** - Professional form

## Contributing

This is a hackathon project built to showcase next-generation UI generation capabilities.

## License

MIT

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
