# Workshop Checkpoints and Recovery

## Completion checklist

- [ ] The starter app runs locally.
- [ ] Your agent read and applied `AGENTS.md`.
- [ ] Design context came from Figma or an instructor-shared design system.
- [ ] `docs/DESIGN_SYSTEM.md` exists and informed implementation.
- [ ] `tailwind.config.js` matches the documented tokens.
- [ ] You reviewed a written plan before implementation.
- [ ] At least two section components exist in `src/components/sections/`.
- [ ] The page renders with recognizable structure and no console errors.
- [ ] You reviewed the changes before accepting them.
- [ ] `docs/DESIGN_QA_REPORT.md` exists and you've reviewed its findings.
- [ ] `npm run build` succeeds.

Focus on the workflow and your ability to explain your decisions. Pixel-perfect parity with Figma or another student's code is not required.

## Progress checks

| Around | You should have |
|--------|-----------------|
| 10 minutes | A running starter and a summary of `AGENTS.md` |
| 30 minutes | A reviewed design system and matching Tailwind tokens |
| 40 minutes | A written implementation plan |
| 60 minutes | Section components ready for integration |
| 75 minutes | A running page and a reviewed diff |
| 90 minutes | A QA report and a successful build |

If you're stuck on the same step for more than five minutes, ask for help.

## Troubleshooting

### Figma MCP is unavailable

Ask your instructor for a shared design system. Save it as `docs/DESIGN_SYSTEM.md` inside `template/`, then use the fallback prompt in [`PROMPTS.md`](./PROMPTS.md), Step 3, to apply its tokens. Review the result before implementation.

### An agent times out or parallel agents are unavailable

Retry the scoped task once. If it still fails, run the same task sequentially in the main agent. Keep the file boundaries from your plan.

### Integration breaks imports or rendering

Pause section work and use only the Step 6 integration prompt. Check file names, default exports, and `App.jsx` imports. Read the terminal and browser console errors.

### The design system doesn't match the design

Review the most visible token differences with your instructor. Update both `docs/DESIGN_SYSTEM.md` and `tailwind.config.js`, then continue with the same shared spec.

### You're running behind

Build Navbar and Hero sequentially, integrate them, and run design QA. Review the findings and run the build before adding more sections.

### You finish early

- Add a Footer section using the same planning and review process.
- Check keyboard navigation, contrast, and mobile layout.
- Compare your design system and QA findings with another student's.
- Extract shared UI primitives where repeated patterns justify them.
