# Feature: Animation Simplification & Bundle Optimization

## Requirements (EARS Format)
While the page loads, the system shall display a brief splash overlay (<500ms) without sequential animations, particles, or parallax effects that delay content visibility.

While a user scrolls through non-hero sections, the system shall not attach mouse-tracking parallax or floating particle animations to those sections, keeping motion intentional and performance-optimized.

While a user's device prefers reduced motion, the system shall respect `prefers-reduced-motion` by disabling all decorative animations.

## Architecture

### [Frontend]
- **BootLoader**: Reduced from 288 lines to ~30 lines. Static grid background, simple fade-in/fade-out. No particles, no parallax, no boot messages, no progress bar. Duration: 500ms total.
- **HeroSection**: Keep mouse parallax only on the photo orbit (core hero element). Remove typing animation (replace with static name). Remove floating particles. Keep reduced-motion guard.
- **ExperienceSection**: Remove mouse parallax entirely. Remove floating particles. Remove animated gradient orbs. Keep scroll-triggered reveal animations only.
- **ProjectsSection**: Remove mouse parallax entirely. Remove floating particles. Remove animated gradient orbs. Keep scroll-triggered reveal. Remove SVG connection lines.
- **SkillsSection**: Remove mouse parallax. Remove floating particles. Keep tab switching animations minimal.
- **ContactSection**: Remove mouse parallax. Remove floating particles (30 DOM nodes). Remove animated SVG circles.
- **Footer**: Remove mouse parallax.
- **Global**: Deduplicate background grid pattern into a single reusable utility class. Remove duplicate `useMotionValue`/`useSpring`/`useTransform` imports across sections.

### [Backend]
Not applicable.

### [Security]
No auth/data concerns.

## Implementation Plan

### Step 1: Simplify HeroSection
- Remove typing animation (useEffect with requestAnimationFrame) — static name
- Remove floating particles (lines ~48-58)
- Remove `useMotionValue`, `useSpring` mouse tracking (keep photo orbit mouse effect)
- Keep reduced-motion guard

### Step 2: Clean ExperienceSection, SkillsSection, ContactSection, Footer
- Remove mouse parallax listeners (useMotionValue, useSpring cleanup)
- Remove floating particles arrays
- Remove animated gradient orbs
- Replace with static scroll-triggered reveals only

### Step 3: Deduplicate Background Pattern
- Extract grid background into a reusable component or utility class in globals.css
- Use consistent opacity across all sections

## Files Changed
- `components/HeroSection.tsx` — remove typing, particles
- `components/ExperienceSection.tsx` — remove parallax, particles
- `components/SkillsSection.tsx` — remove parallax, particles
- `components/ContactSection.tsx` — remove parallax, particles, SVG
- `components/Footer.tsx` — remove parallax
- `app/globals.css` — add reusable grid utility class
