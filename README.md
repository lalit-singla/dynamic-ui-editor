# Dynamic UI Editor for Customizable Components

A React + Vite app that implements a live editor to tweak typography, buttons, galleries, layout, and borders **in real time**, with **two switchable layouts** and **JSON export/import**.

## Features
- Live preview with CSS variables mapping
- Two layouts (A/B) to demonstrate layout switching
- Typography controls (family, weight, size)
- Button controls (radius, shadow, align, colors)
- Gallery controls (align, spacing, image radius)
- General layout (card radius, container padding, section background)
- Stroke/border (color, weight)
- Export configuration as JSON; import back; auto-saves to LocalStorage

## Tech
- React 18 + TypeScript
- Vite builder
- Plain CSS using CSS variables

## Getting Started
```bash
npm i
npm run dev   # http://localhost:5173
```
Build & preview:
```bash
npm run build
npm run preview
```

## Component API (Preview)
`<DesignPreview cfg={uiConfig} />` — renders the UI according to the passed `UIConfig`.

`UIConfig` shape is defined in `src/config.ts`.

## Editor
`<EditorPanel cfg={uiConfig} setCfg={setUiConfig} />` — control surface. Uses `localStorage` for persistence and supports JSON export/import.

## Deploy
- **Vercel**: Import this repo; framework = Vite; build command `npm run build`; output `dist`.
- **Netlify**: Build `npm run build`; publish directory `dist`.
