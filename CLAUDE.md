# PROJECT SPECIFICATION: QA Engineer Portfolio — bug2feature v2 (No Backend)

## 1. OBJECTIVE
Bangun **static website** portofolio untuk QA Engineer & Fullstack Developer dengan **Next.js 16 + static export** (`output: 'export'`).  
Terapkan identitas **terminal‑inspired** + **Apple‑style glassmorphism**, animasi halus (scroll‑driven), dark/light mode, serta **demo interaktif kemampuan QA** tanpa memerlukan backend atau API key.  
Semua data dinamis (metrics, bug reports, projects) menggunakan **mock data** atau **local storage simulation**.  
Deploy ke Vercel gratis (`bug2future.vercel.app`).

## 2. TECH STACK (Tetap, tanpa backend)
| Area | Teknologi |
|------|------------|
| Framework | Next.js 16.2.4 dengan **static export** |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS 3 + CSS variables |
| Animasi | Framer Motion 12 |
| Icons | Lucide React |
| State Management | Zustand / React Context |
| Data | Mock JSON (internal `data/`) |
| HTTP | Tidak perlu (tidak ada panggilan eksternal) |
| Package Manager | pnpm |

> **Keuntungan**: Tidak perlu `.env`, tidak ada API routes, build menghasilkan folder `out/` yang bisa di‑hosting di mana saja (Vercel, Netlify, Cloudflare Pages).

## 3. CORE FEATURES (Semua berbasis mock / simulasi)

### A. BootLoader & Terminal Identity
- Splash overlay 500ms, prompt `❯`, monospace labels, dual mode.

### B. Dashboard QA Metrics (Mock Real-time)
- KPI: `Total Test Cases`, `Pass Rate %`, `Bugs Found (Open/Closed)`, `Coverage %`.
- Data dari `data/metrics.json`. Tombol **Refresh** randomize nilai + animasi counter.

### C. Interactive Test Runner Demo
- Pilih skenario: `Login`, `Checkout`, `Search`.
- Klik **Run Test** → log step-by-step dengan typing effect. Hasil PASS/FAIL + durasi random 0.5–2 detik.
- Logika di `utils/testRunnerLogic.ts`.

### D. Bug Report Gallery (dengan Filter)
- Data dari `data/bugs.json`. Filter severity & status. Modal detail (steps, environment). Placeholder icon Lucide.

### E. Skills & Tools – Tabbed Proficiency Bar
- Data dari `data/skills.json`. Tab: Testing, Frontend, Backend, DevOps. Progress bar hex `#C86464`/`#E8A84C`.

### F. Projects Section – Card dengan Mock Stats
- Data dari `data/projects.ts`. Mock stats (stars: 42, forks: 7). Tombol Live Demo (#) dan Code (dummy URL).

### G. Experience Section (Timeline)
- Data dari `data/experience.json`. Timeline vertikal (alternate desktop, stacked mobile). Glassmorphism + ikon Lucide.

### H. Certification Section (Grid Cards)
- Data dari `data/certifications.json`. Card: nama, penerbit, tanggal, tombol Verify (link dummy/modal). Badge `NEW` untuk terbaru.

### I. Contact Section (Simulasi Form)
- Form statis (nama, email, pesan). Submit → toast simulasi. Social links + download CV (`public/cv.pdf`).

### J. AI Chat Assistant (Rule-based)
- Floating button, collapsible panel. Pattern matching (kata kunci: `test`, `portofolio`, `qa`, `help`). Tidak ada HTTP.

### K. Light / Dark Mode Toggle
- Toggle + localStorage. Dark default, class `.dark` di `<html>`.

## 4. FOLDER STRUCTURE (Static, tanpa `app/api`)
```
bug2feature/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── projects/[slug]/page.tsx
├── components/
│   ├── BootLoader.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ExperienceSection.tsx
│   ├── SkillsSection.tsx
│   ├── CertificationSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ProjectCard.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts
├── public/                  (static assets)
├── next.config.ts           (dengan output: 'export')
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

## 5. UI/UX REQUIREMENTS (Tetap)
- Responsif, glassmorphism, dynamic gradient background (scroll).
- Terminal prompt (`❯`) di setiap heading dan label metadata.
- Loading skeleton **hanya untuk simulasi** (misal saat refresh metrics, beri delay 300ms dengan skeleton).
- Error handling: jika gagal baca JSON (tidak mungkin karena static), fallback ke data inline.

## 6. ANIMATION PHILOSOPHY
1. **Scroll-driven > event-driven** — ganti mouse move listeners dengan `useScroll` + `useTransform`
2. **Satu efek per komponen** — tidak campur aduk parallax + particles + typing + orbs
3. **BootLoader minimal** — hanya icon Code + inisial, 500ms, sebagai transisi bukan gimmick
4. **Avoid heavy hooks** — jangan pakai `useSpring`, `useMotionValue`, `useEffect(mousemove)`, partikel DOM, atau WebGL di komponen non-interaktif
5. **Particles = 0** — tidak ada particle systems di section mana pun
6. **Hanya HeroSection boleh mouse parallax** — section lain pakai scroll transform

## 7. THEME & DESIGN TOKENS (Dual Mode)

### CSS Variables (`app/globals.css`)
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

**Warna Brand**
- `--brand-primary: #B83A3A` — aksen utama
- `--brand-accent: #D94A4A`
- `--brand-warm: #E07A5F`
- `--brand-deep: #C0392B`
- `--brand-secondary: #8B2020`
- `--brand-dark: #1A0E0E`
- `--brand-darker: #0A0505`

**Utility Classes**
- `.bg-grid` / `.bg-grid-sm` — dot grid background
- `.glass` — `backdrop-blur(16px)` + card bg + border
- `.text-gradient` — maroon/warm gradient heading

### Dual Mode
- Dark = default (`:root`), Light = override (`html:not(.dark)`)
- Toggle via class `.dark` di `<html>` + localStorage
- Tailwind `dark:` modifier **tidak dipakai** — semua warna via CSS variables
- Saat toggle, CSS variables swap via selector — no re-render needed

### UI Design Principles
- **Minimalist**: whitespace utama, setiap elemen fungsional, system font stack, spacing generous
- **Glassmorphism (Apple-style)**: `.glass` card, `backdrop-blur(16px)`, border subtle, shadow halus
- **Apple UI Influence**: grid presisi, alignment rata, hierarki visual jelas, maroon focal point

## 8. CODE CONVENTIONS
- `"use client"` hanya untuk komponen interaktif.
- Semua animasi via Framer Motion — jangan CSS `@keyframes` atau `requestAnimationFrame`.
- Hardcoded hex hanya untuk skill-level accent (`#C86464` <50, `#E8A84C` ≥50).
- System font stack — tidak inline font loading.
- Section IDs: `#hero`, `#experience`, `#skills`, `#projects`, `#contact`.
- Icons via Lucide React.
- State management via Zustand (store di `hooks/` atau inline).

## 9. BUILD & DEPLOY
```bash
pnpm install      # install dependencies
pnpm dev          # local dev (Turbopack)
pnpm build        # static export ke out/
pnpm lint         # ESLint check
pnpm start        # serve production build
```
Deploy: push ke GitHub → Vercel auto-deploy. Build command: `pnpm build`, output: `out`.

## 10. DELIVERABLES
1. **Full source code** sesuai struktur di atas.
2. File `README.md` berisi instruksi lokal + deploy.
3. **Tidak perlu** `.env.example` karena tidak ada variabel rahasia.
4. Deploy ke Vercel: `vercel --prod` atau push ke GitHub.

---

## Agent Instructions

Bagian ini untuk panduan AI agent saat berkontribusi ke codebase.

Patuhi semua poin di Sections 1-10 di atas. Tidak ada backend atau API routes. Semua data mock dari `data/`. Gunakan CSS variables untuk warna, bukan hardcoded hex (kecuali skill accent).

### Component Architecture
```
app/
├── layout.tsx        — Root layout, font preload, metadata
├── page.tsx          — Main page (BootLoader overlay + <main>)
├── globals.css       — CSS variables, utility classes, dual-mode tokens
└── projects/[slug]/page.tsx — Detail page per fullstack project
components/
├── BootLoader.tsx    — Fixed splash overlay, 500ms
├── Navbar.tsx        — Fixed top nav, hamburger mobile
├── HeroSection.tsx   — Hero + photo orbit (mouse parallax OK)
├── ExperienceSection.tsx — Timeline card layout
├── SkillsSection.tsx — Tabbed skill grid
├── CertificationSection.tsx — Certification cards
├── ProjectsSection.tsx — 3 sub-sections (client, qa, fullstack)
├── ProjectCard.tsx   — Standalone project card
├── ContactSection.tsx — Contact form + links grid
└── Footer.tsx        — Footer with grid background
```
**Client/Server boundary**: Semua komponen di `components/` pakai `"use client"`. Halaman detail `/projects/[slug]` juga client component.

### Data Flow
- Semua data dari file JSON/TS di `data/` (import langsung atau fetch ke path statis)
- Tidak ada fetching ke API eksternal
- Simulasi real-time via tombol Refresh (randomizer), bukan WebSocket
- Simulasi chat via pattern matching client-side, bukan API call

