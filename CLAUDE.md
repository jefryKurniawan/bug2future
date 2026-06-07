# bug2feature — Portfolio by Jefry Kurniawan

## Concept
Portofolio QA Engineer dengan tema **Fedora Linux**. Visual identity:
- Terminal-inspired UI (prompt `❯`, monospace labels, command-style headings)
- Dark-first palette dengan aksen biru Fedora (`--fedora-primary: #a8c8ff`)
- Grid background motif — subtle dot grid sebagai "desktop" reference
- Gerbang masuk via BootLoader splash (fixed overlay, 500ms fade)

## Tech Stack
- Next.js 16.2.4 — App Router, static export via Vercel
- TypeScript — strict mode
- Tailwind CSS 3 — utility-first, no CSS-in-JS
- Framer Motion 12 — scroll-driven transforms only (no mouse parallax di non-Hero sections)
- Lucide React — icon set
- pnpm — package manager

## Design Tokens

### CSS Variables (`globals.css`)
| Token | Usage |
|---|---|
| `--surface-elevated` | Card background |
| `--border-muted` | Subtle borders |
| `--text-heading` | Section headings |
| `--text-muted` | Secondary text |
| `--text-label` | Labels, timestamps |
| `--text-dim` | Footers, hints |
| `--success` | Status indicator (green) |
| `--section-start/mid/end` | Section gradient |

### Tailwind Colors
| Class | Hex |
|---|---|
| `text-fedora-primary` | `#a8c8ff` (aksen utama) |
| `text-fedora-accent` | `#419cde` |
| `text-fedora-lightBlue` | `#5a9fd4` |
| `text-fedora-blue` | `#306fc3` |
| `text-fedora-dark` | `#1b263b` |
| `text-fedora-darker` | `#0d1b2a` |

### Utility Classes
- `.bg-grid` — 50px dot grid (opacity 0.03)
- `.bg-grid-sm` — 40px dot grid (opacity 0.02)
- `.glass` — `backdrop-blur(16px)` + card bg + border
- `.text-gradient` — Fedora blue gradient for headings

## Animation Philosophy
1. **Scroll-driven > event-driven** — ganti mouse move listeners dengan `useScroll` + `useTransform`
2. **Satu efek per komponen** — tidak campur aduk parallax + particles + typing + orbs
3. **BootLoader minimal** — hanya icon terminal + hostname, 500ms, sebagai transisi bukan gimmick
4. **Avoid heavy hooks** — jangan pakai `useSpring`, `useMotionValue`, `useEffect(mousemove)`, partikel DOM, atau WebGL di komponen non-interaktif
5. **Particles = 0** — tidak ada particle systems di section mana pun
6. **Hanya HeroSection boleh mouse parallax** — section lain pakai scroll transform

## Component Architecture
```
app/
├── layout.tsx        — Root layout, font preload, metadata
├── page.tsx          — Main page (BootLoader overlay + <main>)
components/
├── BootLoader.tsx    — Fixed splash overlay, 500ms timeout
├── Navbar.tsx        — Fixed top nav, hamburger mobile
├── HeroSection.tsx   — Hero + photo orbit (mouse parallax OK)
├── ExperienceSection.tsx — Timeline card layout
├── SkillsSection.tsx  — Tabbed skill grid
├── ProjectsSection.tsx — Project cards inline
├── ProjectCard.tsx   — Standalone project card component
├── ContactSection.tsx — Contact form + links grid
└── Footer.tsx        — Footer with grid background
```

## Code Conventions
- **"use client"** hanya untuk komponen dengan interaktivitas
- **Semua animasi via framer-motion** — jangan pakai CSS `@keyframes` atau JS `requestAnimationFrame` manual
- **Hardcoded hex hanya untuk skill-level accent** (`#afc6ff`, `#ffb95d`). Semua warna lain via token atau `text-fedora-*`
- **Tidak ada inline font loading** — pakai system font stack
- **Gunakan Section ID** untuk scroll nav: `#hero`, `#experience`, `#skills`, `#projects`, `#contact`

## Build & Deploy
```bash
pnpm dev          # local dev
pnpm build        # production build
pnpm lint         # lint check
pnpm start        # serve production build
```

Deployed via Vercel: `bug2future.vercel.app`
