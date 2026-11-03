# TPEO Design System

> Generated from Figma. Implementation agents must follow this document.
> Desktop measurements are source-derived. Responsive and interaction guidance is explicitly marked as a project recommendation.

## Source
- Figma: https://www.figma.com/design/q60nN5ivm80En71BRyRgIv/TPEO-Website-2026--Copy-?node-id=35-1346
- Generated: 2026-10-26.
- Inspected with Figma MCP: Web UI page `35:1345`, Home frame `35:1346` (1512 × 4598), including nested Navigation Bar, Feature Card, Core fellowship, CTA and Footer instances.
- The initial URL targets a page, not a frame. The returned Home screenshot and detailed design context are the source of these values.
- Scope: documentation and `theme.extend` only; no components, assets, dependencies or app integration changed.

## Colors
| Token / Tailwind key | Hex | Usage |
| --- | --- | --- |
| brand | #F3801A | Primary CTA, headings, accent text |
| page | #101010 | Page, footer, primary-button text |
| surface | #191919 | Navbar, cards, CTA panel, hero upper background |
| foreground | #FFFFFF | Headings, navigation, feature descriptions |
| muted | #D7D7D7 | Hero copy, fellowship descriptions, CTA copy, copyright |
| border | #444444 | Card and panel borders, secondary button, dividers |
| logo-muted | #CBD0D8 | Company logo masks |
| brand-start | #FB8C14 | Active Home navigation gradient start |
| brand-end | #F6A606 | Active Home navigation gradient end |

Use `bg-page`, `bg-surface`, `text-foreground`, `text-muted`, `text-brand`, `border-border`. Active navigation uses a left-to-right gradient between the documented stops, clipped to text. Figma's exact gradient angle is 90.328° with stops 2.5543% and 102.47%; reserve these as documented arbitrary-value exceptions if exact fidelity is required. The hero uses a vertical surface-to-page gradient, retaining surface through 76.953% of its 695px background.

## Typography
### Font families
- `font-heading`: DM Sans, bold 700; Figma specifies optical size 14. Use `[font-variation-settings:'opsz'_14]` when the loaded font supports it.
- `font-body`: Helvetica Neue, regular 400, medium 500 and bold 700.
- Font fallbacks are implementation safeguards, not Figma equivalents. Neither font is bundled in this template. Obtain approved font files/loading instructions; do not claim fallback typography matches Figma. Helvetica Neue availability varies by OS.

### Type scale (h1, h2, body, small, label)
| Tailwind class | Size / line height | Weight / usage |
| --- | --- | --- |
| text-hero | 64px / normal | 700, DM Sans hero h1 |
| text-section | 48px / 36px | 700, DM Sans section and CTA headings |
| text-card-title | 32px / 36px | 700, DM Sans feature h3 and APPLY NOW label |
| text-item-title | 28px / 36px | 700, DM Sans fellowship titles and CTA links |
| text-body | 24px / 36px | 400, Helvetica Neue body |
| text-body-large | 28px / 36px | 400, CTA copy; bold override for footer CTA |
| text-navigation | 20px / normal | 500, Helvetica Neue navigation and compact CTA |
| text-small | 20px / normal | 400, copyright |

The 48px/36px heading pairing is taken directly from Figma and is unusually tight. Allow natural height; confirm a more generous line height before using multiline headings. The hero uses normal line height. Do not invent an exact pixel value for it. Hero CTA uses body size with `font-bold`; fellowship descriptions use body size. Hero discipline labels use body-large with regular weight.

## Spacing
### Section spacing
- `gap-section`: 100px between major section groups.
- `gap-section-content`: 80px between section introduction and main content.
- Section title/subtitle groups use `gap-5` (20px); hero text group uses `gap-6` (24px).
- These are gaps, not a mandate to add 100px padding to both sides of every divider.

### Component spacing
- Feature row: `gap-feature-gap` (63px); three 400.266px cards, total 1326.798px.
- Feature card: `px-5 pt-card-top pb-card-bottom` (20 / 30 / 50px), inner title/body `gap-2` (8px). Illustration reference size 258 × 243px; desktop card reference height 510px. Prefer content-driven heights at narrower widths.
- Hero CTA: `px-6 py-5` (24 / 20px).
- Navbar CTA: `px-4 py-3` (16 / 12px).
- Navbar link/button groups: `gap-nav-gap` (35px); navigation grouping gap 80px.
- Fellowship item: `gap-6`, title/body `gap-2`.
- CTA content: 64px top inset (`pt-16`), 32px content/action gap (`gap-8`), 40px between actions (`gap-10`).

### Layout (max-width, horizontal padding)
- `max-w-page`: 1512px, derived from the desktop canvas width. Treating it as a CSS max-width is a project recommendation; Figma does not establish ultrawide behavior.
- `max-w-features`: 1326.798px, measured feature row.
- `max-w-hero-copy`: 694px; hero starts 79px from the left (`lg:px-hero-gutter`).
- Navbar: `lg:px-nav-gutter` (60px), `pt-nav-top pb-6` (42 / 24px), logo 75px, total height 141px.
- `max-w-cta-panel`: 1048px, visible panel inside a 1128px wrapper with 40px side insets. Panel height 412px in desktop design; do not enforce it on wrapped content.
- Footer reference height 473px and left inset 102px; its button has 28.943px horizontal and 21.707px vertical padding.
- Shared page widths belong in `PageLayout`; section logic stays in `components/sections`. Full-bleed dividers may extend outside inset content.

## Borders & effects
### Border radius
- `rounded-control`: 10px, compact navbar CTA.
- `rounded-card`: 12px, feature cards, hero CTA, discipline badges and CTA links.
- `rounded-panel`: 24px, application panel.
- `rounded-footer-control`: 13.782px, measured footer button; this is a source inconsistency rather than a separate universal button size.
- Card/panel/secondary-link borders are 1px solid border color. Divider export geometry extends 1px to each side; confirm stroke thickness if exact matching is required.

### Shadows
`shadow-flat` is none. No elevation shadow is specified in the returned Home styling; use surface contrast and borders. Do not invent drop shadows.

## Components
### Button (variants, sizes, states)
- Primary: `bg-brand text-page`; compact navbar uses `rounded-control px-4 py-3 font-body text-navigation`; hero uses `rounded-card px-6 py-5 font-body text-body font-bold`.
- CTA-panel primary: 353 × 60px desktop, heading font at item-title size with external-link icon. Secondary: transparent, white text, 1px border, 252 × 62px desktop. Both use rounded-card; allow fluid widths on mobile.
- Footer primary uses body-large bold, measured footer radius/padding above.
- Link navigation should use anchors. Use buttons for actions; do not make static card containers interactive.
- Hover, pressed, disabled and focus appearances were not specified. Project recommendation: preserve base colors, underline links on hover, use `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`. Do not invent new color tokens for states.

### Card
Use `bg-surface border border-border rounded-card`, centered illustration, orange DM Sans title, white body text and the documented padding. Equal columns on desktop; allow content to expand. Extract a reusable primitive only when repeated, as AGENTS.md requires.

### Navbar
Logo left; links and actions right. White links, gradient active Home, orange underlined Contact Us, filled Join TPEO. Stickiness, mobile menu and navigation destinations are unspecified. Reuse visual primitives in the footer without importing one section into another.

### Other patterns
- Fellowship items reuse illustration/title/description structure, with page-specific curved connectors.
- Company logos use the logo-muted tone while preserving original aspect ratios; the exact arrangement is page-specific.
- Application panel reuses typography/buttons with a page-specific composition.
- Hero bulb, floating badges, doodles and connecting curves are original assets, not CSS primitives. Export them from Figma when implementation begins.

## Responsive behavior
No mobile/tablet variant was established by the inspected Home frame. The following rules are project recommendations, not measured Figma breakpoints. Preserve default Tailwind screens.

### Mobile (default)
Use `px-5`, `gap-6` for repeated items, `gap-16` between sections, `text-4xl leading-tight` for h1, `text-3xl leading-tight` for h2, and `text-lg leading-7` for body. Stack hero and cards; place hero copy before illustration. Wrap logos, stack CTA buttons with full available width, wrap footer groups. Keep all navigation reachable through an accessible menu or visible wrapping list; the menu visual design needs approval. Hide decorative connectors if they conflict with reading order.

### md (768px+)
Use `px-8`; body may increase to `text-xl leading-8`. Keep cards stacked until three columns fit comfortably; avoid an orphaned two-column layout unless reviewed. CTA actions may form a row when labels fit. Preserve DOM reading order.

### lg (1024px+)
Use two hero columns and three feature/fellowship columns with `minmax(0,1fr)`. Use measured desktop type tokens where they fit. Scale gaps from `gap-8` toward `xl:gap-feature-gap`, with `gap-section` between major sections. At intermediate widths keep navigation wrapped/collapsed until its full measured contents fit; lg alone does not guarantee that. The 1512px canvas is the desktop fidelity reference. Avoid fixed 510px card or 4598px page heights on fluid layouts.

## Accessibility
### Minimum contrast pairs
- foreground on page: 19.03:1.
- muted on surface: 12.22:1.
- brand on page: 7.17:1.
- page on brand: 7.17:1.
- foreground on brand: 2.65:1.
- border on surface: 1.81:1.

Require at least 4.5:1 for normal text and 3:1 for large text. Use dark page text on orange buttons; white on brand fails normal-text contrast. Border on surface is decorative and does not reach 3:1: do not use that border alone to identify an interactive control. Give the secondary CTA an underline or another sufficiently contrasting persistent cue where needed. These are implementation accessibility requirements, not changes made to Figma.

### Focus styles
Use the documented 2px brand outline with 4px offset on dark surfaces. All links and controls must remain visible and keyboard accessible. Label social icons; communicate active navigation with `aria-current` and a non-color cue. Use one h1, section h2s and item h3s without skipped levels. Decorative artwork uses empty alt; informative images have meaningful alt.

### Touch target minimums
Project target: at least 44 × 44px (`min-h-11 min-w-11`) for controls, including mobile nav and social links. Preserve visible labels and support wrapping at zoom.

## Open questions and implementation exceptions
- Font licensing/loading and exact fallback metrics remain unresolved.
- Desktop widths and offsets are measured geometry, not proof of CSS max-width or responsive constraints.
- Header active gradient, solid orange brand, and footer gradient logo are intentionally distinct treatments; use original logo assets.
- Home contains placeholder fellowship copy and time-sensitive application copy. Confirm final content before launch.
- Frame height 4598px exceeds visible composed content; do not reproduce empty canvas space as a fixed page height.
- Button sizes/radii vary across navbar, hero, panel and footer. Preserve documented variants rather than silently normalizing.
- Responsive rules and interaction states above are recommendations requiring visual review.
- Arbitrary values are allowed only for documented asset geometry, gradient details, footer offsets/padding and DM Sans optical size when standard tokens cannot represent them. Never use arbitrary colors outside this palette.
- Before implementation, read this document and AGENTS.md. No UI components are part of this task.
