# Outbreak Dossier: Developer Onboarding & Content Authoring Guide

Welcome to the **Outbreak Dossier** engineering and editorial team. This guide walks you through setting up your local environment, understanding our technical architecture, and authoring new pandemic dossiers or country datasets.

---

## 1. Prerequisites & Tooling

### System Requirements

- **Node.js**: `v20.x` or `v22.x` (LTS strongly recommended)
- **Package Manager**: `npm` (v10+)
- **Operating System**: Linux, macOS, or Windows (WSL2 or PowerShell)

### Recommended VS Code Extensions

To maintain code consistency and rapid prototyping speeds:

- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Autocompletion and linting for utility classes and arbitrary variants.
- **ESLint** (`dbaeumer.vscode-eslint`): Enforces Next.js, React Hooks, and Storybook linting rules.
- **Antigravity / Prettier** (`esbenp.prettier-vscode`): Standardized code formatting.
- **Even Better TOML / JSON**: Enhanced syntax highlighting and formatting for structured data dossiers.

---

## 2. Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/herisusantoarismann/outbreak-dossier.git
cd outbreak-dossier
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Copy the template configuration:

```bash
cp .env.example .env.local
```

Key variables:

- `NEXT_PUBLIC_APP_URL`: Canonical origin for OpenGraph and metadata resolution (e.g. `http://localhost:3000`).
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry monitoring DSN (optional for local development).
- `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`: Build-time source map upload keys (optional for local development).

### Step 4: Run the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` to interact with the 3D orbital globe and dynamic scrollytelling routes (`/id/journey/id`, `/en/journey/id`).

---

## 3. Content Authoring Workflow

Outbreak Dossier is designed to be easily extensible to other pandemics (e.g., _1918 Spanish Flu_, _SARS 2003_, _1347 Black Death_) and multiple nations.

```text
src/data/pandemics/
└── [pandemic-id]/
    ├── id.json       # Indonesian dossier
    └── en.json       # English dossier
```

### Step 1: Defining the JSON Dataset

Create or edit your dataset under `src/data/pandemics/[pandemic-id]/[country-code].json`.

Every dossier is an array of `Chapter` objects adhering to the contract in [`src/types/journey.ts`](../src/types/journey.ts):

```json
[
    {
        "id": "delta-variant-surge",
        "chapterNumber": "12",
        "type": "milestone",
        "title": "Black July: The Delta Apocalypse",
        "date": "July 2021",
        "strain": "SARS-CoV-2 (Lineage B.1.617.2 / Delta)",
        "flash": "EMERGENCY: ICU capacities breached nationwide; emergency sirens echo through Jakarta.",
        "virusProfile": {
            "code": "B.1.617.2 (DELTA CLADE)",
            "mutationType": "P681R Furin Cleavage & L452R Immune Escape",
            "r0": "5.0 - 8.0",
            "threatLevel": "CRITICAL GLOBAL SURGE",
            "clinicalTarget": "Accelerated viral replication, deep tissue hypoxia, rapid clinical deterioration"
        },
        "description": "By mid-2021, the hyper-transmissible Delta variant swept through dense metropolitan hubs...",
        "image": "/assets/images/12-delta-wave.jpg"
    }
]
```

#### Chapter Types & Editorial Intent

- **`milestone`**: Crucial turning points, game changers, or catastrophic surges (e.g., First Case Confirmation, Delta Wave, Vaccine Rollout). Renders with glowing high-contrast borders and intense HUD badges.
- **`side_story`**: Cultural phenomena, grassroots interludes, and societal artifacts (e.g., Bear Brand milk hoarding, ghost town Sudirman, hand sanitizer panics). Renders with dashed warm amber styling.
- **`standard`**: Essential chronological narrative chapters connecting the milestones. Renders with clean, translucent tech-noir borders.

---

### Step 2: Asset Management Standards

All background imagery must be placed in `public/assets/images/`.

- **Dimensions**: Exactly `1920 × 1080` (16:9 widescreen aspect ratio) or `1920 × 1200` (16:10).
- **Naming Conventions**: `[chapterNumber]-[descriptive-slug].jpg` (e.g. `06-psbb-ghost-town.jpg`, `14-oxygen-crisis.jpg`).
- **File Format**: Standard JPG or PNG source files. Next.js (`next/image`) automatically transcodes these on-the-fly to modern `AVIF` and `WebP` formats at build/runtime based on client capability.
- **Optimization Budget**: Keep original source image files below **600 KB** to guarantee lightning-fast decoding.

---

### Step 3: Global Concept Art Style Guide

To maintain our declassified military intelligence aesthetic, all visual assets must follow these artistic rules:

1. **Color Palette & Lighting**:
    - **Background Base**: `#050508` rich blacks and deep slate charcoals.
    - **Accent Neon**: Biohazard crimson (`#ef4444`) for high-threat alerts, clinical cyan (`#06b6d4`) for medical/vaccine milestones, and surveillance amber (`#f59e0b`) for cultural interludes.
    - **Cinematic Atmosphere**: Dramatic rim lighting, volumetric shadows, subtle fog or haze, and high textural contrast.
2. **Subject Framing**:
    - Focus on atmospheric, wide-angle cinematic compositions suitable for half-screen sticky backgrounds on desktop and full-viewport backgrounds on mobile.
    - Avoid flat stock photos, bright daylight pastels, or casual tourist compositions.
3. **No Watermarks or Overlays**:
    - The UI overlays all telemetry HUD badges and captions dynamically; avoid embedding static text or fake digital graphics directly into the source image.

---

## 4. Testing & Quality Assurance

Before opening a pull request, run our comprehensive verification pipeline:

### 1. Linting & Formatting

```bash
npm run lint
```

_Ensures zero ESLint warnings, verifies React 19 hook purity, and flags unescaped comment characters in JSX._

### 2. Unit & State Testing

```bash
npm test
```

_Executes the Vitest test suite covering Zustand stores (`useJourneyStore`), keyboard navigation hooks, and translation helpers._

### 3. Accessibility (a11y) Verification

- **Keyboard Navigation**:
    - Test `ArrowDown` / `PageDown` to move to the next chapter.
    - Test `ArrowUp` / `PageUp` to move to the previous chapter.
    - Test `Home` and `End` to jump to the start and finish.
    - Verify that horizontal arrow navigation inside `ComparisonSlider` is **not** intercepted by the global vertical scroller.
- **Screen Reader Testing**:
    - Turn on VoiceOver (macOS) or NVDA (Windows) and confirm that chapter change live announcements trigger cleanly via the `aria-live="polite"` region.

### 4. Production Build Verification

```bash
npm run build
```

_Verifies 100% Static Site Generation (SSG) across all localized routes (`/[locale]`, `/[locale]/journey/[country]`), dynamic icon generators (`/icon`, `/apple-icon`), and PWA manifests._
