# Context Engineering Guide

## Why context engineering matters

Coding agents have limited attention. Dumping the entire repo, full Figma file, and all instructions into every prompt causes:

- Missed conventions
- Inconsistent tokens
- Edits to files outside the task scope
- Hallucinated design details

Experienced engineers scope context like a good PR description: enough to succeed, nothing extra.

## Context layers

### Layer 1: Persistent (repository)

Always available. Rarely repeated in prompts.

| Artifact | Contents |
|----------|----------|
| `AGENTS.md` | Conventions, commands, review bar |
| Folder structure | Where files belong |
| `package.json` | Stack and scripts |
| `.cursor/skills/` | Repeatable workflows |

**Workshop moment:** Step 1 — agent reads `AGENTS.md` without you pasting conventions into chat.

### Layer 2: Shared session artifacts

Created once during the workshop. Referenced by all implementation agents.

| Artifact | Contents |
|----------|----------|
| `docs/DESIGN_SYSTEM.md` | Colors, type, spacing, component rules |
| `tailwind.config.js` | Token mirror for Tailwind classes |
| Implementation plan | Component list, dependencies, parallel map |

**Workshop moment:** Step 3–4 — design system and plan become the contract.

### Layer 3: Task-scoped

Different per subagent. This is the highest-leverage scoping.

| Subagent | Include | Exclude |
|----------|---------|---------|
| Navbar | Navbar Figma frame, `Navbar.jsx` path | Hero code, Feature Cards Figma |
| Hero | Hero frame, Button primitive path | Navbar code, full page plan |
| Feature Cards | Cards frame, grid requirements | Navbar/Hero files |

**Workshop moment:** Step 5 — show three prompts side by side.

### Layer 4: Ephemeral

Used once, not stored.

- Figma MCP raw responses (summarize into design system instead)
- Brainstorming messages
- Discarded plan drafts

## Context budget heuristics

When writing a prompt, ask:

1. **Does the agent need this to make the right file?** If no, cut it.
2. **Is this already in `AGENTS.md` or design system?** Reference by path, don't duplicate.
3. **Could this cause the agent to edit other files?** Add negative constraints ("Do not implement Hero").
4. **Is the design ambiguous?** Send the specific Figma node, not the whole file.

## Negative constraints (teaching examples)

Good scoped prompts include what **not** to do:

```
Do not implement Hero or Feature Cards.
Do not modify tailwind.config.js.
Do not add routing.
```

Negative constraints reduce scope creep — a common failure mode in parallel agent work.

## Shared vs scoped — visual

```
┌─────────────────────────────────────────────┐
│  GLOBAL: AGENTS.md + DESIGN_SYSTEM.md       │
├──────────────┬──────────────┬───────────────┤
│ Navbar agent │  Hero agent  │  Cards agent  │
│ + navbar     │  + hero      │  + cards      │
│   Figma node │    Figma node│    Figma node │
│ + Navbar.jsx │  + Hero.jsx  │  + Feature... │
└──────────────┴──────────────┴───────────────┘
                    │
                    ▼
         Integrator agent: App.jsx only
```

## When to widen context

Expand scope when:

- Integration agent wires sections together
- QA skill audits all components
- Remediation pass fixes cross-cutting spacing issues

## Manual edit vs re-prompt

| Situation | Approach |
|-----------|----------|
| Wrong import path | Manual fix |
| One wrong Tailwind class | Manual fix |
| Systemic wrong gray across sections | Re-prompt with QA report |
| Component in wrong directory | Re-prompt with `AGENTS.md` citation |
| Missing accessibility on nav | Re-prompt with specific a11y criteria |

**Teaching line:** "I'm not re-running the entire Hero because of a typo. I am re-prompting when the mistake reflects missing context."

## Student exercise (optional, 2 min)

Ask students to circle what they'd remove from this bloated prompt:

```
Build the navbar. Here's the whole Figma file. Also rewrite App.jsx and
add a footer and fix tailwind and use these 40 colors I pasted...
```

Answer: everything except navbar frame + `AGENTS.md` + design system + output path.
