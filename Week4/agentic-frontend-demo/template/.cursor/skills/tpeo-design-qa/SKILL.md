---
name: tpeo-design-qa
description: >-
  Audits React components against docs/DESIGN_SYSTEM.md for spacing, typography,
  colors, accessibility, and responsive behavior. Writes docs/DESIGN_QA_REPORT.md.
  Use after section implementation or when the user asks for a design consistency check.
disable-model-invocation: true
---

# TPEO Design QA / Consistency Audit

Review implementation against the generated design system. Report issues with file paths and severity — do not silently rewrite everything.

## When to use

- After section components are integrated in `App.jsx`
- When the user invokes `tpeo-design-qa` or asks for a "design audit"
- Before final Figma comparison

## Inputs

1. `docs/DESIGN_SYSTEM.md` — the specification
2. `tailwind.config.js` — token definitions
3. `src/components/sections/**/*.jsx`
4. `src/components/ui/**/*.jsx`
5. `src/layouts/PageLayout.jsx`
6. `src/App.jsx`
7. `AGENTS.md` — accessibility and convention bar

## Workflow

### Step 1: Load the spec

Read `docs/DESIGN_SYSTEM.md`. If missing, stop and tell the user to run `tpeo-design-system` first.

### Step 2: Scan implementation

For each component file, check:

| Category | What to verify |
|----------|----------------|
| **Colors** | Uses design system tokens, not random `slate-*` / `gray-*` unless documented |
| **Typography** | Heading levels, font sizes/weights match scale |
| **Spacing** | Section padding, gaps, card padding use documented scale |
| **Borders** | Radius and borders match component spec |
| **Shadows** | Match documented elevation |
| **Responsive** | Mobile-first; layout adapts at `md`/`lg` |
| **Accessibility** | Semantic HTML, one h1, focusable controls, alt text, contrast |
| **Architecture** | Files in correct dirs; sections don't import sections |
| **Layout** | Page-level max-width in `PageLayout`, not duplicated in sections |

### Step 3: Write `docs/DESIGN_QA_REPORT.md`

Use this format:

```markdown
# Design QA Report

> Audited against docs/DESIGN_SYSTEM.md

## Summary
- Critical: N
- Minor: N
- Nit: N

## Critical
### [ID-001] Short title
- **File:** src/components/sections/Hero.jsx
- **Issue:** ...
- **Expected:** (from design system)
- **Actual:** ...
- **Suggested fix:** ...

## Minor
...

## Nit
...

## Passed checks
- Bullets for what looks good (keep brief)

## Recommended fix order
1. ...
```

### Severity definitions

| Level | Meaning | Example |
|-------|---------|---------|
| **Critical** | Breaks accessibility, layout, or major design contract | Missing h1, nav not keyboard accessible, wrong primary CTA color |
| **Minor** | Noticeable inconsistency with design system | Wrong section padding token, heading one step off scale |
| **Nit** | Polish, optional alignment | Slightly off gap, could use `cn()` cleaner |

### Step 4: Present findings

Tell the user:

1. Count by severity
2. Top 3 issues to fix first
3. Whether issues suggest a design system gap (doc update) vs code fix

## Optional remediation

Only fix code if the user explicitly asks after seeing the report.

When fixing:

- Address critical issues first
- Use design system tokens, not new arbitrary values
- Update the report to mark items resolved
- Do not refactor unrelated files

## Output checklist

- [ ] `docs/DESIGN_QA_REPORT.md` written
- [ ] Every issue has file path and suggested fix
- [ ] Severities assigned consistently
- [ ] Passed checks included (balanced report)
- [ ] No silent mass-rewrite without user approval

## Do not

- Audit against Figma directly (that's a separate workshop step)
- Fail the audit because of intentional template placeholder content in unmodified files
- Mark nitpicks as critical
- Delete components — suggest targeted fixes
