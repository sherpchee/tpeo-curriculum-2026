---
name: tpeo-design-system
description: >-
  Analyzes the TPEO Website Figma design via MCP and produces docs/DESIGN_SYSTEM.md
  plus tailwind.config.js token extensions. Use when starting implementation,
  when the user asks for a design system, or before parallel section work.
disable-model-invocation: true
---

# TPEO Design System Synthesis

Produce a project-local design system from Figma so parallel implementation agents stay consistent.

## When to use

- Before any section components are built
- After connecting to Figma MCP
- When the user invokes `tpeo-design-system` or asks to "generate the design system"

## Inputs

1. **Figma URL** (default):
   `https://www.figma.com/design/HPtaiqKRNRqtAZMHNIMZcR/TPEO-Website-2026?node-id=35-1345`
2. **AGENTS.md** — follow styling and accessibility conventions
3. **tailwind.config.js** — extend `theme.extend` only; do not replace the file

## Workflow

### Step 1: Read project context

Read `AGENTS.md` and the current `tailwind.config.js`.

### Step 2: Inspect Figma via MCP

Using the Figma MCP:

1. Open the landing page frame (node `35-1345` or equivalent)
2. Extract colors (backgrounds, text, accents, borders)
3. Extract typography (font families, sizes, weights, line heights)
4. Extract spacing patterns (section padding, gaps, card padding)
5. Extract border radius and shadow usage
6. Identify reusable component patterns (buttons, cards, nav)
7. Note responsive behavior if multiple breakpoints exist in Figma

If MCP is unavailable, ask the user for an instructor-shared design system. Have them save it as `docs/DESIGN_SYSTEM.md`, then read it and apply its documented tokens to `tailwind.config.js` instead of extracting them from Figma.

### Step 3: Write `docs/DESIGN_SYSTEM.md`

Use this structure:

```markdown
# TPEO Design System

> Generated from Figma. Implementation agents must follow this document.

## Source
- Figma: [link]
- Generated: [date]

## Colors
| Token name | Hex | Tailwind key | Usage |
|------------|-----|--------------|-------|
| ... | ... | ... | ... |

## Typography
### Font families
### Type scale (h1, h2, body, small, label)

## Spacing
### Section spacing
### Component spacing
### Layout (max-width, horizontal padding)

## Borders & effects
### Border radius
### Shadows

## Components
### Button (variants, sizes, states)
### Card
### Navbar

## Responsive behavior
### Mobile (default)
### md (768px+)
### lg (1024px+)

## Accessibility
- Minimum contrast pairs
- Focus styles
- Touch target minimums
```

Be specific enough that two agents would pick the same Tailwind classes.

### Step 4: Update `tailwind.config.js`

Add tokens under `theme.extend`:

```js
theme: {
  extend: {
    colors: {
      // Map design system colors
    },
    fontFamily: { ... },
    fontSize: { ... },
    spacing: { ... },
    borderRadius: { ... },
    boxShadow: { ... },
  },
},
```

Rules:

- Use semantic names (`brand`, `surface`, `muted`) not `blue-500` duplicates
- Only add tokens documented in `DESIGN_SYSTEM.md`
- Do not remove existing `content` or `plugins` config

### Step 5: Summarize for the user

Report:

1. Files created/updated
2. Key tokens (primary color, heading font, section gap)
3. Ambiguities found in Figma (if any)
4. What implementers should read before coding

## Output checklist

- [ ] `docs/DESIGN_SYSTEM.md` exists and is complete
- [ ] `tailwind.config.js` `theme.extend` matches the doc
- [ ] Token names are semantic and documented
- [ ] Accessibility section includes contrast and focus guidance
- [ ] No section components were implemented (this skill is spec-only)

## Do not

- Implement React components
- Modify `App.jsx` or section files
- Guess colors not visible in Figma — flag as ambiguous instead
- Use arbitrary Tailwind values in the doc without documenting when they're allowed
