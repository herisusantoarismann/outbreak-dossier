# Architectural Decision Record (ADR) & Technology Trade-offs

This document captures the key architectural decisions, rationale, and technology trade-offs made in the engineering of **Outbreak Dossier**.

---

## 1. Next.js (App Router) & Server Components

### Context

Outbreak Dossier requires high-resolution visual rendering, multi-language internationalization (Indonesian & English), fast initial paint, and reliable static export for edge distribution.

### Decision

We chose the **Next.js App Router** with React Server Components (RSC) and `next-intl` dynamic localized routing (`/[locale]/...`).

### Rationale

1. **Automated Image Transcoding (`next/image`)**:
    - Scrollytelling requires dozens of widescreen high-res visual assets. Without image optimization, serving raw 1920px JPGs resulted in 3MB–5MB asset bloat per chapter, causing bandwidth spikes and mobile scroll stutter.
    - Next.js automatically negotiates `image/avif` and `image/webp` formats, transcodes images on-the-fly according to layout responsive queries (`sizes="(max-width: 768px) 100vw, 50vw"`), and caches them aggressively (`minimumCacheTTL: 2592000`).
2. **Deterministic Static Site Generation (SSG)**:
    - All 26 chapters and multiple localized routes are pre-rendered at build time with `generateStaticParams()`.
    - Initial load hits pure HTML/CSS directly from the edge cache with zero database queries or runtime server overhead.

### Trade-offs & Alternatives Considered

- **Pros**:
    - Blazing fast First Contentful Paint (FCP).
    - Built-in dynamic OpenGraph and vector favicon generation (`icon.tsx`, `apple-icon.tsx`) using `ImageResponse`.
    - Native source map integration and error monitoring via `@sentry/nextjs`.
- **Cons**:
    - Requires strict discipline around hydration boundaries (`"use client"`). Heavy interactive components like the 3D globe and scrollytelling container must be client boundaries, requiring careful state isolation to avoid unnecessary client re-renders.
- **Alternatives Considered**:
    - _Vite + React SPA_: Lacked out-of-the-box on-the-fly image transcoding and static metadata generation without complex build-time plugins.
    - _Astro_: Outstanding content performance, but Next.js provided superior ecosystem alignment for full-stack telemetry, Sentry source maps, and rich React 19 Framer Motion integrations.

---

## 2. Three.js & WebGL vs Lightweight 2D Maps (Leaflet / Mapbox)

### Context

The platform's landing view needed to deliver a tactical bio-surveillance command center atmosphere that sets the emotional tone of declassified intelligence.

### Decision

We implemented a 3D orbital WebGL globe utilizing **Three.js** and **`globe.gl`** (`ThreeGlobe`), rendered inside [`GlobeViewer.tsx`](../src/components/organisms/GlobeViewer.tsx).

### Rationale

1. **Immersion & Cinematic Spatial Depth**:
    - A spherical globe conveys the worldwide scope of viral transmission far more effectively than flat map projections (e.g. Mercator), which distort high-latitude landmasses.
2. **Tactical Tech-Noir Shaders & Boundary Vectorization**:
    - Using Three.js allows custom polygon altitude extrusion, emissive atmospheric halos (`#ef4444` / `#06b6d4`), and glowing GeoJSON boundary wireframes on pitch-black ocean spheres without third-party tile subscription costs.

### Trade-offs & Alternatives Considered

- **Pros**:
    - Full 60 FPS orbital camera controls, customizable tilt vectors, and breathing pulse coordinate beacons.
    - Zero external map tile server dependency (e.g. Mapbox token quotas or billing traps).
- **Cons**:
    - Higher GPU memory footprint on budget mobile devices.
    - Requires dynamic client loading with `ssr: false` to avoid server-side Node.js `window` crashes.
- **Alternatives Considered**:
    - _Leaflet / Mapbox GL JS_: While 2D maps are lightweight, flat map tiles visually resembled a commercial logistics or navigation dashboard rather than an atmospheric bio-threat reconnaissance room.

---

## 3. Pure CSS Scroll Snapping vs Third-Party Scroll Libraries (GSAP / ScrollMagic)

### Context

The scrollytelling engine contains 26 narrative cards, side stories, and milestone badges that must smoothly snap into view as the user scrolls.

### Decision

We adopted **native CSS Scroll Snap** (`snap-y snap-mandatory` on the container, `snap-center` on chapter elements) paired with an optimized `IntersectionObserver` and a custom React keyboard navigation hook.

### Rationale

1. **Compositor Thread Performance**:
    - CSS scroll snapping runs entirely on the browser's native compositor thread. Unlike JavaScript-driven scroll listeners (e.g., GSAP ScrollTrigger or ScrollMagic), native scroll snap **never blocks the main thread**, even on low-end hardware.
2. **Native Momentum & Touch Physics**:
    - Preserves native trackpad gestures, smartphone touch momentum, and hardware-accelerated deceleration.
3. **Zero Jitter & Synchronous Viewport Snapping**:
    - Combined with `IntersectionObserver` configured with `rootMargin: "-50% 0px -50% 0px"`, active chapter state updates precisely when an article crosses the vertical center line.

### Trade-offs & Alternatives Considered

- **Pros**:
    - Zero KB added to the JavaScript bundle for scroll calculation.
    - Immune to scrolljacking complaints; users maintain complete control over native scrolling speed.
- **Cons**:
    - Does not support arbitrary non-linear bezier scrubbing curves across multi-element timelines as easily as GSAP.
- **Alternatives Considered**:
    - _GSAP ScrollTrigger_: Extremely powerful for timeline orchestration, but introduced significant bundle weight, licensing considerations, and main-thread computation during rapid scrolls on mobile devices.

---

## 4. Tailwind CSS (v4) for Tactical Design System

### Context

The visual identity requires sharp monospace typography, high-contrast borders, custom glow drop-shadows (`shadow-[0_0_40px_rgba(6,182,212,0.2)]`), and responsive split layouts.

### Decision

We selected **Tailwind CSS (v4)** for atomic styling and UI utility primitives.

### Rationale

1. **Co-located Tactical Tokens**:
    - Arbitrary value syntax (`bg-[#050508]`, `border-cyan-500/60`, `shadow-[0_0_15px_#06b6d4]`) allows rapid fine-tuning of glows and opacity values directly in component JSX.
2. **Zero Runtime Style Ingestion**:
    - CSS is compiled ahead of time at build time into an optimized, minimal production stylesheet, eliminating the runtime CSS-in-JS overhead of libraries like styled-components or Emotion.
3. **Seamless Responsive Media Layouts**:
    - Trivial specification of complex layouts (e.g. mobile full-screen overlay `fixed inset-0` vs desktop split `md:sticky md:w-1/2`).

---

## 5. Structured JSON Dossiers vs Headless CMS

### Context

Editorial content contains 26 chapters per language, including technical virological schemas, dates, and narrative text.

### Decision

We store all chapter data in version-controlled, static JSON files (`src/data/pandemics/[pandemic-id]/[locale].json`), strongly typed via TypeScript interfaces (`Chapter`, `VirusProfile`).

### Rationale

1. **Zero Runtime Latency & Rate Limits**:
    - Data is bundled at build time; there are zero external API roundtrips during scrollytelling navigation.
2. **Git Version Control & PR Review**:
    - Narrative revisions, data corrections, and new chapters undergo the exact same code review, pull request, and CI testing pipeline as application logic.
3. **Schema Enforcement**:
    - TypeScript contracts guarantee that no chapter is deployed without mandatory metadata (e.g. missing `chapterNumber`, invalid `type`, or broken image paths).

### Trade-offs & Alternatives Considered

- **Pros**:
    - 100% offline development capability; no CMS billing or credential leaks.
    - Deterministic builds with instantaneous preview deployments.
- **Cons**:
    - Content edits require code commits and PRs rather than a visual WYSIWYG dashboard for non-technical writers.
- **Mitigation**:
    - The schema is self-explanatory and thoroughly documented in our [Developer Onboarding Guide](ONBOARDING.md), allowing contributors to author chapters via simple JSON files.
