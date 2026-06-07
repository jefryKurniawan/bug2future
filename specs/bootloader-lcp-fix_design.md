# Feature: BootLoader LCP Fix & Accessibility

## Requirements (EARS Format)
While the page is loading, the system shall display a fullscreen overlay with a brief logo animation (<300ms) while the main content is already in the DOM. When the overlay fades out, the system shall ensure the LCP image is immediately discoverable by the browser.

While a user navigates with a screen reader, when they encounter an icon-only button, the system shall provide an `aria-label` describing the action.

While the page loads, the system shall preload the hero image via `<link rel="preload">` so the browser can discover it before the CSS/JS is parsed.

## Architecture

### [Frontend]
- **BootLoader**: Fullscreen fixed overlay with z-index 50, renders on top of `<main>` content. Main content is always in DOM (no conditional render). BootLoader fades out after a brief delay (<300ms).
- **Layout**: Add `<link rel="preload" fetchpriority="high">` for hero image in `<head>`.
- **HeroSection**: Add `fetchpriority="high"` and explicit `priority` prop on the mobile Image component.
- **ProjectCard/ProjectsSection**: Add `aria-label` on all icon-only buttons.

### [Backend]
Not applicable — static portfolio site (Next.js SSG/SSR).

### [Security]
- No auth/data concerns for this feature.
- CSP headers should allow preloaded images.

## Implementation Plan

### Step 1: Restructure BootLoader to Overlay Pattern
- Remove conditional render in `app/page.tsx` (`{!loading && <main>…</main>}`)
- Move `<main>` content outside the loading condition
- BootLoader becomes a fixed overlay with `z-index: 50`
- On mount, BootLoader shows logo then fades out after ~200ms

### Step 2: Preload Hero Image
- In `app/layout.tsx`, add `<link rel="preload" as="image" href="/photo_.webp" fetchpriority="high" />`
- In `components/HeroSection.tsx`, add `priority` prop and `fetchpriority="high"` to the mobile Image

### Step 3: Add ARIA Labels
- In `components/ProjectCard.tsx` (standalone + inline): add `aria-label="View {title} on GitHub"` and `aria-label="Open {title} website"`
- In `components/ProjectsSection.tsx`: update card buttons to pass proper labels

## Files Changed
- `app/page.tsx` — restructure BootLoader to overlay
- `app/layout.tsx` — add preload link
- `components/BootLoader.tsx` — simplify to instant fade
- `components/HeroSection.tsx` — add fetchpriority/priority
- `components/ProjectCard.tsx` — add aria-labels
- `components/ProjectsSection.tsx` — remove inline card, use shared component
