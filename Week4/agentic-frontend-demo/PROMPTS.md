# Workshop Prompts

Copy-paste prompts for the workshop. Prompts emphasize **workflow and constraints**, not a single correct implementation.

Replace `FIGMA_URL` with:
`https://www.figma.com/design/HPtaiqKRNRqtAZMHNIMZcR/TPEO-Website-2026?node-id=35-1345`

Run these prompts with `template/` open as your Cursor project. File paths in the prompts are relative to that folder.

---

## Step 1: Understand the repository

```
Read AGENTS.md and summarize how this project expects frontend work to be done.

Before suggesting any code changes, tell me:
1. Where section components should live
2. What styling approach we use
3. What accessibility expectations apply
4. What you would check before considering a task "done"
```

**Reflect:** What would you add to `AGENTS.md` on your own team?

---

## Step 2: Gather design context (Figma MCP)

```
Using the Figma MCP, inspect the TPEO Website 2026 landing page design.

Figma URL: FIGMA_URL

Summarize:
1. Major page sections (top to bottom)
2. Layout patterns (grid, stack, max-width)
3. Visual hierarchy (headings, CTAs)
4. Components that look reusable vs one-off
5. Responsive behavior you can infer from the design

Do not write code yet. Figma is the source of truth — call out anything ambiguous in the design.
```

---

## Step 3: Generate design system (Skill)

```
Use the tpeo-design-system skill to analyze the Figma design and generate our project design system.

Figma URL: FIGMA_URL

Write outputs to:
- docs/DESIGN_SYSTEM.md
- tailwind.config.js (extend theme tokens only)

Follow AGENTS.md conventions.
```

**Fallback (no MCP):** Ask your instructor for a shared design system and save it as `docs/DESIGN_SYSTEM.md` inside `template/`. Then prompt:

```
Read the instructor-shared docs/DESIGN_SYSTEM.md and apply it to this project.

Keep docs/DESIGN_SYSTEM.md as the shared specification and update tailwind.config.js theme.extend to match.
Follow AGENTS.md.
```

---

## Step 4: Plan before coding

```
Read AGENTS.md and docs/DESIGN_SYSTEM.md.

Create an implementation plan for the TPEO landing page (single page, no routing).

Include:
1. Component breakdown (file paths under src/components/)
2. Dependencies between components (what must exist first)
3. Which pieces can be built in parallel by separate agents
4. Suggested shared UI primitives (if any)
5. Risks — merge conflicts, duplicated styles, accessibility gaps

Do not implement yet. Output a plan I can review.
```

**Review the plan:** Check task boundaries and shared file ownership. Cut scope if needed (e.g. Footer optional).

---

## Step 5: Delegate work (subagents)

Launch **three subagents in parallel**. Each prompt is intentionally scoped.

If your tool doesn't support parallel agents, run the same tasks sequentially. Assign shared UI primitives to one agent or extract them after integration.

### Subagent A — Navbar

```
Implement the Navbar section for the TPEO landing page.

Read first:
- AGENTS.md
- docs/DESIGN_SYSTEM.md

Figma reference: FIGMA_URL (navbar/header frame only)

Requirements:
- Create src/components/sections/Navbar.jsx
- Use Tailwind and design tokens from docs/DESIGN_SYSTEM.md
- Mobile-friendly: navigation usable on small screens
- Semantic HTML and keyboard-accessible interactive elements
- Export default component; no changes to other section files

Do not implement Hero or Feature Cards.
```

### Subagent B — Hero

```
Implement the Hero section for the TPEO landing page.

Read first:
- AGENTS.md
- docs/DESIGN_SYSTEM.md

Figma reference: FIGMA_URL (hero frame only)

Requirements:
- Create src/components/sections/Hero.jsx
- Match typography and spacing from the design system
- Include primary CTA button (use or create src/components/ui/Button.jsx)
- Responsive layout per design system breakpoints
- Export default component only

Do not implement Navbar or Feature Cards.
```

### Subagent C — Feature Cards

```
Implement the Feature Cards section for the TPEO landing page.

Read first:
- AGENTS.md
- docs/DESIGN_SYSTEM.md

Figma reference: FIGMA_URL (features/cards frame only)

Requirements:
- Create src/components/sections/FeatureCards.jsx
- Extract a reusable Card primitive to src/components/ui/Card.jsx if appropriate
- Use a responsive grid (stack on mobile, columns on desktop)
- Export default component only

Do not implement Navbar or Hero.
```

---

## Step 6: Merge and integrate

After subagents complete, run in the main agent:

```
Integrate the section components into the app.

Read AGENTS.md, then:
1. Wire Navbar, Hero, and FeatureCards into src/App.jsx inside PageLayout
2. Resolve any import/path issues
3. Remove placeholder content from App.jsx
4. Ensure the page renders top-to-bottom: Navbar → Hero → Feature Cards

After integrating, give me a concise review checklist of issues you see — do not fix yet.
```

**Review:** Read the diff and the listed issues before asking the agent to apply fixes.

---

## Step 7: Design QA (Skill)

```
Use the tpeo-design-qa skill to audit the current implementation against docs/DESIGN_SYSTEM.md.

Write findings to docs/DESIGN_QA_REPORT.md.

Prioritize issues as: critical, minor, nit.
Include file paths and suggested fixes.
```

### Remediation pass

```
Read docs/DESIGN_QA_REPORT.md and fix all critical issues.

Use the design system as source of truth. Prefer Tailwind token classes over arbitrary values.
Update docs/DESIGN_QA_REPORT.md to mark resolved items.
```

---

## Step 8: Compare against Figma

```
Compare the running implementation to the Figma design.

Figma URL: FIGMA_URL

Focus on:
1. Section order and layout structure
2. Typography hierarchy
3. Spacing and alignment
4. Color usage vs design system
5. Responsive behavior at mobile and desktop widths

List mismatches by severity. Suggest which fixes belong in code vs design system doc updates.

Do not claim pixel-perfect unless justified.
```

### Optional refinement

```
Fix the top 3 highest-severity Figma mismatches from your comparison.

Keep changes minimal. Follow AGENTS.md and docs/DESIGN_SYSTEM.md.
```

---

## Debrief prompt (optional)

```
We just completed an agentic frontend workflow: context → design system → plan → parallel implementation → review → QA → refinement.

Summarize 5 engineering habits from this session that apply beyond this demo.
Do not mention specific prompt wording — focus on principles.
```
