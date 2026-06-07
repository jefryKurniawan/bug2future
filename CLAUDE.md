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
| Data | Mock JSON (internal `src/data/`) |
| HTTP | Tidak perlu (tidak ada panggilan eksternal) |
| Package Manager | pnpm |

> **Keuntungan**: Tidak perlu `.env`, tidak ada API routes, build menghasilkan folder `out/` yang bisa di‑hosting di mana saja (Vercel, Netlify, Cloudflare Pages).

## 3. CORE FEATURES (Semua berbasis mock / simulasi)

### A. BootLoader & Terminal Identity
- Sama seperti versi sebelumnya: splash overlay 500ms, prompt `❯`, monospace labels, dual mode.

### B. Dashboard QA Metrics (Mock Real‑time)
- Tampilkan KPI: `Total Test Cases`, `Pass Rate %`, `Bugs Found (Open/Closed)`, `Coverage %`.
- Data diambil dari file `src/data/metrics.json`.
- Tambahkan tombol **"Refresh"** yang mengubah nilai secara acak (simulasi real‑time) – tanpa loading skeleton (langsung update angka).
- Gunakan **animasi counter** (Framer Motion `motion.span` dengan `whileInView`).

### C. Interactive Test Runner Demo (Tanpa Backend)
- User dapat memilih skenario: `Login`, `Checkout`, `Search`.
- Klik **Run Test** → tampilkan log step‑by‑step dengan **typing effect** (menggunakan state + timeout, tanpa API).
- Hasil: `PASS` (hijau) atau `FAIL` (merah) + durasi simulasi (random antara 0.5–2 detik).
- Logika test disimpan dalam `utils/testRunnerLogic.ts` (fungsi synchronous mock).

### D. Bug Report Gallery (Mock, dengan Filter)
- Gunakan file `src/data/bugs.json` (array objek: id, title, severity, status, steps, environment).
- Tampilkan card, filter berdasarkan severity (`High/Mid/Low`) dan status (`Open/Fixed/In Progress`) menggunakan state frontend.
- Modal detail saat card diklik – menampilkan langkah reproduksi dan environment (mock).
- **Tidak ada gambar screenshot** – gunakan placeholder icon Lucide.

### E. Skills & Tools – Tabbed dengan Proficiency Bar
- Data dari `src/data/skills.json` (array skill dengan nama, kategori, level 0–100).
- Tampilan tab: `Testing`, `Frontend`, `Backend`, `DevOps`.
- Progress bar menggunakan hardcoded hex (misal: `#C86464` untuk level <50, `#E8A84C` untuk ≥50).

### F. Projects Section – Card dengan Data Mock
- Data dari `src/data/projects.json` (title, description, techStack, githubUrl dummy, imagePlaceholder).
- Karena tanpa GitHub API, **tampilkan stats fiktif** (stars: 42, forks: 7) sebagai mock.
- Setiap card memiliki tombol **"Live Demo"** (menuju #) dan **"Code"** (menuju dummy URL).

### G. AI Chat Assistant (Rule‑based, Tanpa API Key)
- Floating button (collapsible panel).
- Chat bot **tidak terhubung ke LLM**, menggunakan **pattern matching** sederhana.
- Contoh: user tanya `"cuaca"` → bot jawab `"Saya asisten QA, bukan prakirawan. Tapi saran: testing fitur cuaca harus mencakup edge case suhu ekstrem!"`
- User tanya `"test"` → beri saran automation.
- User tanya `"portofolio"` → jelaskan proyek.
- Implementasi: array of intents + fallback response.
- **Tidak ada panggilan HTTP**, semua logika client‑side.

### H. Light / Dark Mode Toggle
- Sama seperti sebelumnya: toggle + localStorage.

## 4. FOLDER STRUCTURE (Static, tanpa `app/api`)
```
bug2feature/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── BootLoader.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── DashboardMetrics.tsx
│   ├── TestRunnerDemo.tsx
│   ├── BugReportGallery.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── AIChat.tsx          (rule‑based)
│   ├── ThemeToggle.tsx
│   └── Footer.tsx
├── data/
│   ├── metrics.json
│   ├── bugs.json
│   ├── skills.json
│   └── projects.json
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useLocalStorage.ts
│   └── useMetrics.ts       (mengambil data dari JSON + simulasi refresh)
├── utils/
│   ├── testRunnerLogic.ts
│   └── formatters.ts
├── types/
│   └── index.ts
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

## 7. KEAMANAN (Tidak ada backend)
- Tidak ada hardcode API key karena tidak ada panggilan ke eksternal.
- Semua data bersifat lokal/mock, aman untuk static hosting.
- Tidak ada environment variables yang dibutuhkan.

## 8. DELIVERABLES (Source code + panduan)

1. **Full source code** sesuai struktur di atas.
2. File `README.md` berisi:
   ```markdown
   # bug2feature - QA Engineer Portfolio
   ## Menjalankan lokal
   pnpm install
   pnpm dev
   ## Build static
   pnpm build
   ## Output folder `out/` dapat di-deploy ke Vercel, Netlify, atau folder static.
   ```
3. **Tidak perlu** `.env.example` karena tidak ada variabel rahasia.
4. **Deploy ke Vercel**:
   - `vercel --prod` atau push ke GitHub → Vercel auto deploy.
   - Konfigurasi `build command` = `pnpm build`, `output directory` = `out`.

## 9. CATATAN TAMBAHAN (Agar terlihat kompleks)
- Gunakan **Zustand** untuk menyimpan state `theme`, `refreshMetrics`.
- Tambahkan **mini terminal command** di Hero: user bisa ketik `help`, `projects`, `contact` – memunculkan toast atau mengarah ke section.
- Simulasi **WebSocket** untuk metrics? Tidak perlu, cukup tombol refresh dengan randomizer.
- Download CV: sediakan file PDF di `public/cv.pdf` dan tombol download.

---

## Agent Instructions

Bagian ini untuk panduan AI agent saat berkontribusi ke codebase.

### Design Tokens

**CSS Variables (`app/globals.css`)**
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

**Tailwind Colors (`tailwind.config.ts` — object `brand`)**
| Class | Hex |
|---|---|
| `text-brand-primary` | `#B83A3A` (aksen utama) |
| `text-brand-accent` | `#D94A4A` |
| `text-brand-warm` | `#E07A5F` |
| `text-brand-deep` | `#C0392B` |
| `text-brand-secondary` | `#8B2020` |
| `text-brand-dark` | `#1A0E0E` |
| `text-brand-darker` | `#0A0505` |

**Utility Classes**
- `.bg-grid` — 50px dot grid (opacity 0.03)
- `.bg-grid-sm` — 40px dot grid (opacity 0.02)
- `.glass` — `backdrop-blur(16px)` + card bg + border
- `.text-gradient` — maroon/warm gradient for headings

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
├── ProjectsSection.tsx — 3 sub-sections (client, qa, fullstack)
├── ProjectCard.tsx   — Standalone project card
├── ContactSection.tsx — Contact form + links grid
└── Footer.tsx        — Footer with grid background
```

**Client/Server boundary**: Semua komponen di `components/` pakai `"use client"` karena interaktivitas (Framer Motion, state, event listeners). Halaman detail `/projects/[slug]` juga client component.

### Code Conventions

- **`"use client"`** hanya untuk komponen dengan interaktivitas
- **Semua animasi via framer-motion** — jangan pakai CSS `@keyframes` atau JS `requestAnimationFrame` manual
- **Hardcoded hex hanya untuk skill-level accent** (`#C86464` untuk <50, `#E8A84C` untuk ≥50). Semua warna lain via CSS variable atau `text-brand-*` / `bg-brand-*`
- **System font stack** — tidak inline font loading
- **Section IDs** untuk scroll nav: `#hero`, `#experience`, `#skills`, `#projects`, `#contact`
- **Icons via Lucide React** — import dari `lucide-react`
- **State management via Zustand** — store di `hooks/` atau inline

### Data Flow

- Semua data dari file JSON di `data/` (metrics, bugs, skills, projects)
- Tidak ada fetching — import langsung atau baca via `fetch` ke path statis (build-time)
- Simulasi real-time via tombol Refresh (randomizer), bukan WebSocket
- Simulasi chat via pattern matching client-side, bukan API call

### Build & Deploy

```bash
pnpm install      # install dependencies
pnpm dev          # local dev (Turbopack)
pnpm build        # static export ke out/
pnpm lint         # ESLint check
pnpm start        # serve production build
```

Deploy: push ke GitHub → Vercel auto-deploy. Build command: `pnpm build`, output: `out`.

