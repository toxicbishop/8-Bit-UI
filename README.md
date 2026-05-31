# 8-Bit UI

A retro-themed dashboard built with **React**, **Vite**, and **[8bitcn/ui](https://8bitcn.com)** — a pixel-art component library on top of shadcn/ui and Tailwind CSS.

![8-Bit Adventure Dashboard](https://api.dicebear.com/9.x/pixel-art/svg?seed=8bitui&size=64)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](./LICENSE)

## ✨ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 7](https://vite.dev) | Build tool & dev server |
| [8bitcn/ui](https://8bitcn.com) | Pixel-art 8-bit components |
| [shadcn/ui](https://ui.shadcn.com) | Base component primitives |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) | Retro pixel font |
| TypeScript | Type safety |

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 📁 Project Structure

```
src/
├── main.tsx                    # App entry point
├── index.css                   # Tailwind directives + shadcn CSS variables
├── App.tsx                     # Main dashboard page
│
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── types/
│   └── index.ts                # Shared TypeScript types
│
└── components/
    └── ui/
        ├── base/               # shadcn base primitives
        │   ├── badge.tsx       + badge-variants.ts
        │   ├── button.tsx      + button-variants.ts
        │   ├── card.tsx
        │   ├── input.tsx
        │   └── label.tsx
        │
        └── 8bit/               # 8bitcn/ui pixel-art components
            ├── badge.tsx       + badge-variants.ts
            ├── button.tsx      + button-variants.ts
            ├── card.tsx        + card-variants.ts
            ├── input.tsx       + input-variants.ts
            └── styles/
                └── retro.css   # Press Start 2P font import
```

## 🧩 Adding New 8-bit Components

Use the shadcn CLI with the 8bitcn registry:

```bash
# Add a specific component (e.g. progress bar)
npx shadcn@latest add https://8bitcn.com/r/progress.json
```

Browse all available components at [8bitcn.com/docs/components](https://8bitcn.com/docs/components).

## 🎨 Demo Features

The included dashboard (`App.tsx`) demonstrates:

- **Character Profile Card** — avatar, health bar, experience bar
- **HEAL button** — increases health by 10 each click
- **LEVEL UP button** — increments the level badge
- **Name input** — updates the DiceBear pixel avatar in real-time
- **Navigation bar** with animated "NEW DLC" badge
- **Limited Event** call-to-action panel

## 📜 License

This project is licensed under the **GNU General Public License v3.0** — see the [LICENSE](./LICENSE) file for details.
