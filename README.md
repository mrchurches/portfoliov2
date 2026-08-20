# Portfolio v2

Personal portfolio built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Next.js 14** - App Router
- **React 18**
- **Tailwind CSS** - semantic tokens in `tailwind.config.js`, not raw palette values
- **react-icons**
- **Vercel Web Analytics / Speed Insights**

## Features

- Multi-language support (EN/ES)
- Single dark theme, every text/surface pair verified against WCAG AA
- Generated share card and iOS icon
- Responsive design

## Project Structure

```
src/app/
├── components/          # React components (navbar, about, skills, projects, etc.)
├── hooks/               # Custom hooks (useAnalytics)
├── page.js              # Main page
├── layout.js            # Root layout and metadata
├── globals.css          # Global styles
├── robots.js            # robots.txt
├── sitemap.js           # sitemap.xml
├── opengraph-image.js   # 1200x630 share card
└── apple-icon.js        # 180x180 iOS home screen icon

public/
├── en.json / es.json    # All user-facing copy
└── ...                  # Screenshots, CV, profile image
```

Copy lives entirely in `public/en.json` and `public/es.json`. Both files carry
the same key set — keep them in sync when adding anything.

## Getting Started

This project uses **bun**. `vercel.json` pins `bun install` and `bun run build`,
and `package-lock.json` is deliberately absent, so running npm here will
reintroduce a second lockfile.

```bash
bun install
bun run dev
```

Open [http://localhost:7391](http://localhost:7391).

## Scripts

- `bun run dev` - Development server on port 7391
- `bun run build` - Production build
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
