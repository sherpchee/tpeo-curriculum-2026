# Agentic Frontend Development

A Week 4 workshop on collaborating with coding agents. Start with a working React + Vite + Tailwind scaffold and build the TPEO landing page from Figma.

The workflow is **context → planning → parallel implementation → review → refinement**.

## Quick start

From the root of your curriculum repository:

```bash
cd Week4/agentic-frontend-demo/template
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You should see a placeholder page.

Open `template/` as your project in Cursor so its agent instructions and custom skills are available. Read [`template/AGENTS.md`](./template/AGENTS.md), connect the Figma MCP, and follow [`WORKSHOP.md`](./WORKSHOP.md). Keep [`PROMPTS.md`](./PROMPTS.md) open for the prompts you'll paste into agent chat.

## Prerequisites

- Node.js 18+ and npm
- Cursor with agent mode
- Access to the [TPEO Website 2026 Figma design](https://www.figma.com/design/HPtaiqKRNRqtAZMHNIMZcR/TPEO-Website-2026?node-id=35-1345) through Figma MCP, or a design system shared by your instructor
- Familiarity with React basics

## Materials

| Path | Purpose |
|------|---------|
| [`template/`](./template/) | Starter app, `AGENTS.md`, and two custom Cursor skills |
| [`WORKSHOP.md`](./WORKSHOP.md) | Step-by-step student walkthrough |
| [`PROMPTS.md`](./PROMPTS.md) | Prompts for context gathering, planning, implementation, and review |
| [`CHECKPOINTS.md`](./CHECKPOINTS.md) | Progress checks, troubleshooting, and completion criteria |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Component boundaries and file placement |
| [`docs/CONTEXT_ENGINEERING.md`](./docs/CONTEXT_ENGINEERING.md) | How to scope context for each task |

## What you start with

The app has a placeholder `App.jsx`, a `PageLayout` shell, a `cn()` helper, and empty folders for sections, UI primitives, assets, and generated docs. The `tpeo-design-system` and `tpeo-design-qa` skills live in `template/.cursor/skills/`.

During the workshop, you'll generate the design system, add Navbar, Hero, and Feature Cards components, integrate them, and write a design QA report. Those outputs are left for you to build.
