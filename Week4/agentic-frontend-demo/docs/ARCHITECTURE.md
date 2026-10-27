# Template Architecture

## Overview

Single-page marketing site for TPEO. No routing, no API, no global state. Scope stays small so the workshop focuses on agent workflow.

## Layer model

```
App.jsx
  └── PageLayout (shell: max-width, padding, page background)
        ├── Navbar (section)
        ├── Hero (section)
        └── FeatureCards (section)
              └── Card (ui primitive, optional)
```

## Directories

### `src/components/sections/`

Page-specific sections. One component per file. Default export.

| File | Responsibility |
|------|----------------|
| `Navbar.jsx` | Header, logo, navigation links |
| `Hero.jsx` | Headline, subcopy, primary CTA |
| `FeatureCards.jsx` | Grid of feature highlights |

Agents may add `Footer.jsx` if time allows — not required for workshop completion.

### `src/components/ui/`

Reusable primitives extracted when two or more sections need the same pattern.

| File | When to create |
|------|----------------|
| `Button.jsx` | Hero CTA or repeated buttons |
| `Card.jsx` | Feature card container |

**Rule:** Don't pre-build a component library. Extract when duplication appears.

### `src/layouts/`

| File | Responsibility |
|------|----------------|
| `PageLayout.jsx` | Outer page wrapper, horizontal rhythm, optional `<main>` landmark |

Sections should not own page-level max-width — `PageLayout` does.

### `src/lib/`

| File | Responsibility |
|------|----------------|
| `utils.js` | `cn()` for conditional Tailwind classes |

### `src/assets/`

Static images exported from Figma (SVG preferred for icons, WebP/PNG for photos).

### `docs/`

Agent-generated artifacts — not imported by app code.

| File | Producer |
|------|----------|
| `DESIGN_SYSTEM.md` | `tpeo-design-system` skill |
| `DESIGN_QA_REPORT.md` | `tpeo-design-qa` skill |

## Styling strategy

- **Tailwind utility classes** in JSX
- **Design tokens** in `tailwind.config.js` `theme.extend`, documented in `DESIGN_SYSTEM.md`
- **Mobile-first** responsive: default mobile, `md:` and `lg:` for larger screens
- **Avoid** arbitrary values (`p-[13px]`) unless design system documents an exception

## Responsive breakpoints

Use Tailwind defaults unless design system overrides:

| Token | Min width |
|-------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## Accessibility baseline

- One `<h1>` per page (typically in Hero)
- Heading levels don't skip (`h1` → `h2` → `h3`)
- Interactive elements are `<button>` or `<a>`, not `<div onClick>`
- Images have `alt` text
- Sufficient color contrast per design system notes
- Navbar links keyboard-focusable

## Parallel implementation boundaries

Safe to build in parallel (separate files, no shared state):

- Navbar
- Hero  
- FeatureCards

Serialize or coordinate:

- `App.jsx` integration
- `tailwind.config.js` token updates (design system skill only)
- Shared UI primitives (assign to one agent or extract after merge)

## Import conventions

```jsx
// Sections
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import FeatureCards from './components/sections/FeatureCards'

// Layout
import PageLayout from './layouts/PageLayout'

// UI
import Button from './components/ui/Button'
```

Use relative imports from `src/` — no path aliases in the starter template.
