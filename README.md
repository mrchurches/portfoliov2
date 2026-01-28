# Portfolio v2

Personal portfolio built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Next.js 14** - App Router
- **React 18**
- **Tailwind CSS**
- **react-icons**

## Features

- Dark/Light mode (persisted in localStorage)
- Multi-language support (EN/ES)
- Google Tag Manager integration
- Responsive design

## Project Structure

```
src/app/
├── components/     # React components (navbar, about, skills, projects, etc.)
├── hooks/          # Custom hooks (useGTM)
├── page.js         # Main page
├── layout.js       # Root layout
└── globals.css     # Global styles
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint