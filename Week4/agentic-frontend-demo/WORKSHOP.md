# Workshop: Agentic Frontend Development

Practice gathering context, planning work, delegating tasks, reviewing output, and refining a frontend with coding agents. Allow about 90 minutes.

Use [`PROMPTS.md`](./PROMPTS.md) for each numbered step and [`CHECKPOINTS.md`](./CHECKPOINTS.md) to check your progress. All app paths below are relative to `template/`, the folder you open in Cursor.

## Starter and workshop outputs

| Already provided | You'll create during the workshop |
|------------------|-----------------------------------|
| Vite + React + Tailwind scaffold | `docs/DESIGN_SYSTEM.md` |
| `AGENTS.md` and custom Cursor skills | Design tokens in `tailwind.config.js` |
| `PageLayout` and the `cn()` helper | Navbar, Hero, and Feature Cards sections |
| Placeholder `App.jsx` | Integration in `App.jsx` |
| Empty section, UI, asset, and docs folders | UI primitives and Figma assets as needed |
| Architecture and context references | `docs/DESIGN_QA_REPORT.md` |

## 1. Understand the repository

Start the app using the commands in [`README.md`](./README.md). Read `AGENTS.md`, then run the Step 1 prompt.

Check the agent's summary: where should components go, how should they be styled, and what makes the work ready for review? Correct misunderstandings before asking for code.

**Checkpoint:** the placeholder renders and you can explain the project conventions.

## 2. Gather design context

Connect Figma MCP in Cursor and use the Step 2 prompt to inspect the [TPEO landing page design](https://www.figma.com/design/HPtaiqKRNRqtAZMHNIMZcR/TPEO-Website-2026?node-id=35-1345).

Identify sections, layout patterns, typography, reusable components, and any ambiguity. Gather context before implementation.

If Figma MCP is unavailable, ask your instructor for a shared design system and use the Step 3 fallback prompt.

## 3. Generate the design system

Use the Step 3 prompt to invoke `tpeo-design-system`.

Review both outputs:

- `docs/DESIGN_SYSTEM.md`: colors, typography, spacing, component rules, and accessibility guidance
- `tailwind.config.js`: matching tokens under `theme.extend`

Check the result against Figma and resolve major ambiguities before continuing. These files give every implementation agent the same styling contract.

**Checkpoint:** your design system exists and its tokens match the Tailwind configuration.

## 4. Plan before coding

Run the Step 4 prompt. Review the proposed component files, dependencies, shared primitives, and task boundaries before accepting the plan.

Keep the initial scope to Navbar, Hero, and Feature Cards. Assign shared UI files to one agent or extract them after integration so agents don't overwrite each other's changes.

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for file placement and [`docs/CONTEXT_ENGINEERING.md`](./docs/CONTEXT_ENGINEERING.md) for context scoping.

**Checkpoint:** you have a written plan with clear file ownership.

## 5. Implement scoped sections

Use the three Step 5 prompts for Navbar, Hero, and Feature Cards. If your tool supports parallel agents, give each one its assigned section, the relevant Figma frame, `AGENTS.md`, and the shared design system.

Keep `App.jsx` integration for the next step. Coordinate shared primitives and leave token updates to the design system step.

If parallel agents are unavailable, run the same scoped tasks sequentially in the main agent.

**Checkpoint:** the section components exist in `src/components/sections/` and follow the plan.

## 6. Integrate and review

Run the Step 6 prompt in the main agent to compose Navbar → Hero → Feature Cards inside `PageLayout` and remove the placeholder.

Review the diff and the running page. Check component placement, imports, design tokens, semantic HTML, and keyboard access. Ask the agent to list issues before applying fixes.

**Checkpoint:** the page renders with no console errors and you've reviewed the output.

## 7. Run design QA

Use the Step 7 prompt to invoke `tpeo-design-qa`. Read `docs/DESIGN_QA_REPORT.md` and evaluate the findings.

Use the remediation prompt to address critical issues, then check the result yourself. Decide whether each issue needs a code change or a clarification in the design system.

**Checkpoint:** the QA report exists and critical issues have been reviewed and addressed.

## 8. Compare and refine

Use the Step 8 prompt to compare the running page against Figma. Check section order, typography, spacing, colors, and responsive behavior at mobile and desktop widths.

Fix the highest-impact mismatches and run:

```bash
npm run build
```

If you're short on time, finish the QA step and review the completion checklist in [`CHECKPOINTS.md`](./CHECKPOINTS.md).

## Reflection

Commit your work to your fork, including the generated design system, components, and QA report. Write a short reflection on one habit you'll keep using when working with agents.

Your implementation can differ from other students' work. Be ready to explain your plan, context choices, review, and refinements.
