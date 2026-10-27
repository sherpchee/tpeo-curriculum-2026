# Agent Instructions — TPEO Website Template

Read this file before writing or modifying code in this repository.

## Project purpose

Single-page marketing site for TPEO, implemented from the [Figma design](https://www.figma.com/design/HPtaiqKRNRqtAZMHNIMZcR/TPEO-Website-2026?node-id=35-1345). This is a Week 4 workshop project for practicing agentic frontend workflows.

## Tech stack

- React 18 + Vite
- JavaScript (JSX) — no TypeScript
- Tailwind CSS for styling
- No routing, no API calls, no global state library

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (http://localhost:5173)
npm run build  # Production build
```

## Architecture

```
src/
├── components/
│   ├── sections/     # Page sections (Navbar, Hero, FeatureCards, …)
│   └── ui/           # Reusable primitives (Button, Card, …)
├── layouts/
│   └── PageLayout.jsx
├── lib/
│   └── utils.js      # cn() helper
└── assets/           # Images from Figma exports
docs/
├── DESIGN_SYSTEM.md      # Generated — source of styling truth
└── DESIGN_QA_REPORT.md   # Generated — consistency audit
```

## File placement rules

| What | Where |
|------|-------|
| Page sections | `src/components/sections/<Name>.jsx` |
| Reusable UI | `src/components/ui/<Name>.jsx` |
| Page shell | `src/layouts/PageLayout.jsx` — do not put section logic here |
| Design spec | `docs/DESIGN_SYSTEM.md` |
| Static images | `src/assets/` |

- One default-exported React component per file
- Use functional components and hooks only
- Prefer named files matching the component (`Navbar.jsx` exports `Navbar`)

## Styling conventions

1. Read `docs/DESIGN_SYSTEM.md` before implementing UI
2. Use Tailwind utility classes in JSX
3. Prefer design tokens from `tailwind.config.js` over arbitrary values
4. Use `cn()` from `src/lib/utils.js` for conditional classes
5. Mobile-first responsive design (`md:`, `lg:` breakpoints)
6. Do not add CSS modules or styled-components

## Accessibility expectations

- Exactly one `<h1>` on the page (typically in Hero)
- Do not skip heading levels
- Use semantic elements (`nav`, `main`, `section`, `button`, `a`)
- All interactive elements must be keyboard accessible
- Images require meaningful `alt` text (or `alt=""` if decorative)
- Meet contrast ratios documented in the design system
- Navbar links must be reachable and visible on focus

## Component conventions

```jsx
// Example section structure
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">...</h1>
    </section>
  )
}
```

- Extract `ui/` primitives when the same pattern appears twice
- Do not over-abstract — three similar lines beat a premature abstraction
- Sections should not import from other sections

## Integration

`src/App.jsx` composes sections inside `PageLayout`:

```
Navbar → Hero → FeatureCards
```

Only the integration step should modify `App.jsx`.

## Review expectations (definition of done)

Before considering a task complete:

- [ ] Component is in the correct directory
- [ ] Uses tokens from `docs/DESIGN_SYSTEM.md`
- [ ] Responsive at mobile and desktop widths
- [ ] No console errors; dev server renders without crashes
- [ ] Semantic HTML and basic accessibility met
- [ ] No unrelated files modified

## Preferred workflow

1. Read `AGENTS.md` and `docs/DESIGN_SYSTEM.md`
2. Inspect the relevant Figma frame (not the whole file unless needed)
3. Implement in the assigned file only
4. Self-check against the design system before handing off

## Skills in this repo

| Skill | When to use |
|-------|-------------|
| `tpeo-design-system` | Before implementation — generates `docs/DESIGN_SYSTEM.md` |
| `tpeo-design-qa` | After implementation — audits against design system |

Invoke by name in Cursor agent chat.

## Out of scope

- Backend or API integration
- React Router or multiple pages
- Authentication
- Unit tests (unless explicitly requested)
- Pixel-perfect animation matching
