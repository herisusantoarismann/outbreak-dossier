# Outbreak Dossier

### Declassified Global Pathogen Chronicles & Epidemiological Visual Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-049ef4?style=flat-square&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Executive Summary

**Outbreak Dossier** is an interactive, declassified visual intelligence chronicle documenting global pandemics, viral mutations, and human resilience across modern history.

Built with a **tech-noir military intelligence aesthetic**, Outbreak Dossier departs from traditional colorful patchwork atlases and static encyclopedias. Instead, it presents history through an authoritative bio-surveillance lens—combining an interactive 3D WebGL orbital globe with a 26-chapter, high-fidelity scrollytelling engine that seamlessly balances clinical virology against collective societal memory.

---

## Key Highlights

### 1. Dual-Lens Scrollytelling Engine

The chronicle tracks pandemics simultaneously through two distinct, synchronized narrative layers:

- **Virological Mutation Profile**: Tracks viral lineages (`Wuhan-Hu-1`, `Delta B.1.617.2`, `Omicron BA.1`), reproduction numbers ($R_0$), genetic mutation mechanisms (ACE2 binding affinity, Furin cleavage site insertions), and clinical symptom targets.
- **Societal Impact & Collective Memory**: Captures grassroots human experiences—from early tropical climate immunity myths and mask panics to lockdown street silences, oxygen cylinder crises, and national vaccination rollouts.

### 2. Multi-Layer 3D Bio-Surveillance Globe

- **Orbital WebGL Simulation**: Powered by Three.js and `globe.gl` with smooth orbital rotation, dynamic atmosphere shaders, and customizable camera vectors.
- **Vector Country Boundaries**: Luminescent GeoJSON borders delineate nations against pitch-black oceanic voids without visual clutter.
- **Tactical Hotspot Highlighting**: Active whitelist surveillance (`IDN`, `ITA`, `USA`, `IND`, `CHN`, `BRA`) featuring elevated neon boundaries, centroid breathing pulse beacons, and interactive tactical hover HUDs.

### 3. Rich Scrollytelling Components

- **Micro-Timeline Scrubber**: Pinned vertical scrubber grouped by chronological year anchors (`2020 | 2021 | 2022 | 2023`) with glowing category ticks and smooth programmatic navigation.
- **Dual-Layer Before/After Comparison Slider**: Interactive drag-and-touch split-view slider comparing bustling metropolitan rush hours directly against pandemic ghost-town lockdowns.
- **Tactical Chapter Image Frame**: Dedicated skeleton loader equipped with crosshair HUD radar indicators and smooth asset decoding transitions with zero visual artifacts.

### 4. Accessibility First (WCAG 2.1 Level AA)

- **Global Keyboard Navigation (`useKeyboardNavigation`)**: Seamless `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home`, and `End` controls with intelligent focus guards.
- **ARIA Landmark & Region Semantics**: Every chapter is encapsulated in semantic `<article role="region">` landmarks with accessible labels.
- **Screen Reader Announcements**: Live region (`aria-live="polite"`, `aria-atomic="true"`) narrating real-time progression: `Now viewing Chapter X of 26: [Title]. Year [Year]`.
- **Keyboard-Controllable Widgets**: Split-view comparison sliders implement `role="slider"`, `aria-orientation="horizontal"`, and `ArrowLeft`/`ArrowRight` step controls.

---

## Architecture & Directory Structure

```text
covid-journey/
├── public/
│   ├── assets/images/              # 1920px chapter visual assets (WebP/AVIF optimized)
│   ├── data/                       # Local GeoJSON fallback datasets
│   ├── favicon.ico                 # Tactical 32x32 pathogen reticle binary ICO
│   ├── icon.svg                    # Vector SVG favicon
│   └── apple-touch-icon.png        # 180x180 Apple home screen icon
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── journey/[country]/  # Dynamic scrollytelling documentary route
│   │   │   ├── layout.tsx          # Root localized layout & metadata configuration
│   │   │   └── page.tsx            # Orbital 3D Globe Viewer Hub
│   │   ├── apple-icon.tsx          # Dynamic Next.js ImageResponse Apple icon
│   │   ├── icon.tsx                # Dynamic Next.js ImageResponse 32x32 favicon
│   │   ├── manifest.ts             # Web App Manifest (PWA metadata)
│   │   └── globals.css             # Tailwind CSS custom utility layer & scroll snapping
│   ├── components/
│   │   ├── atoms/                  # Minimal UI primitives (Badges, Status Dots)
│   │   ├── molecules/              # Composite widgets (TimelineScrubber, ChapterImageFrame, LocaleSwitcher)
│   │   ├── organisms/              # Complex features (GlobeViewer, ComparisonSlider, CinematicLoading)
│   │   └── templates/              # Full-page engines (ScrollytellingLayout)
│   ├── data/
│   │   └── pandemics/
│   │       └── covid-19/           # 26-chapter structured JSON dossiers (id.json, en.json)
│   ├── hooks/
│   │   └── useKeyboardNavigation.ts # Global keyboard arrow navigation hook
│   ├── i18n/
│   │   ├── request.ts              # next-intl server request configuration
│   │   └── routing.ts              # Locale prefix definitions ('en', 'id')
│   ├── messages/                   # UI internationalization dictionaries (en.json, id.json)
│   ├── stores/
│   │   ├── useAppStore.ts          # Global state (loading, modal visibility)
│   │   └── useJourneyStore.ts      # Active scene, chapter indices, and scroll progression
│   └── types/
│       └── journey.ts              # TypeScript contracts for chapters, virus profiles, and impacts
├── docs/
│   ├── ONBOARDING.md               # Developer ramp-up & content authoring guide
│   └── ARCHITECTURE_DECISIONS.md   # Architectural Decision Records (ADRs) & trade-offs
├── next.config.ts                  # Next.js image optimization, Sentry, and next-intl wrapper
├── package.json                    # Package metadata & script definitions
└── tsconfig.json                   # Strict TypeScript compiler options
```

---

## Data Contract Overview

Each chapter in the archive adheres to strict TypeScript contracts defined in [`src/types/journey.ts`](src/types/journey.ts):

```typescript
export interface VirusProfile {
    code: string; // E.g. "B.1.617.2 (DELTA CLADE)"
    mutationType: string; // E.g. "P681R Furin Cleavage & L452R Immune Escape"
    r0: string; // E.g. "5.0 - 8.0"
    threatLevel: string; // E.g. "CRITICAL GLOBAL SURGE"
    clinicalTarget: string; // E.g. "Accelerated pulmonary replication, hypoxia"
}

export interface Chapter {
    id: string; // Unique slug: "delta-wave-black-july"
    chapterNumber: string; // Formatted index: "12"
    type: "standard" | "milestone" | "side_story"; // Visual card treatment & scrubber glow
    title: string; // "Black July: The Delta Apocalypse"
    date: string; // "July 2021"
    strain: string; // Lineage identifier
    flash?: string; // Ambient breaking-news warning ticker
    virusProfile?: VirusProfile; // Technical virological metadata
    description: string; // Declassified narrative chronicle
    image: string; // Path: "/assets/images/12-delta-wave.jpg"
}
```

### Visual Treatment Differentiation

| Type         | Aesthetic Treatment                                             | Scrubber Glow           | Use Case                                                                  |
| :----------- | :-------------------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------ |
| `milestone`  | High-contrast crimson or cyan border with intense ambient glow  | Glowing Cyan or Crimson | Major epidemiological turning points (e.g. Vaccine rollout, Delta peak)   |
| `side_story` | Warm amber dashed border dossier with archived stamp            | Warm Amber Glow         | Cultural interludes, viral societal phenomena (e.g. Bear Brand milk rush) |
| `standard`   | Tech-noir translucent card with subtle neutral hairline borders | Subtle White Glow       | Chronological narrative progression chapters                              |

---

## Quick Start

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/herisusantoarismann/outbreak-dossier.git
cd outbreak-dossier
npm install
```

### 2. Configure Environment Variables

Copy the environment template:

```bash
cp .env.example .env.local
```

_(All variables in `.env.local` are optional for local development. Sentry error reporting will activate automatically once credentials are provided)._

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The landing page boots the localized 3D Bio-Surveillance Globe.

### 4. Verification & Testing Commands

```bash
# Run ESLint validation
npm run lint

# Run Vitest test suite
npm test

# Build production bundle with 100% SSG verification
npm run build
```

---

## Documentation Suite

- 📖 [**Developer Onboarding & Content Authoring Guide**](docs/ONBOARDING.md): Step-by-step instructions for adding new countries, chapters, and pandemic archives.
- 📐 [**Architectural Decision Records (ADRs)**](docs/ARCHITECTURE_DECISIONS.md): Deep-dive into technical trade-offs (Next.js App Router, Three.js WebGL, pure CSS scroll snap, and Tailwind CSS).

---

## License

Distributed under the **MIT License**. Declassified epidemiological data is curated from WHO, Ministry of Health (Kemenkes RI), and peer-reviewed scientific literature.
