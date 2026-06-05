# Component And Dependency Decision

Read this before running `npx design-anchor add`, installing external blocks, adding effect/icon/table/chart/form libraries, or deciding whether a UI task should create files.

## File Discipline

Do not create new project files unless one of these is true:

- The user explicitly requested a new file or new page.
- The file is created by a Design Anchor CLI command: `sync`, `hydrate`, `theme`, `add`, or `govern`.
- A style prompt source needs to be saved as `.anchor/design-prompt.md` or `design-prompt.md`.

Everything else should go into existing files or be skipped. Avoid skill-owned helper files, wrapper components, temporary docs, custom config files, type files, or duplicate design-system files.

## Dependency Discipline

Default to zero new dependencies beyond the Design Anchor token baseline when implementation/governance needs it.

Before adding a package, block, effect library, icon library, table library, chart library, form library, or helper dependency:

1. Check whether the project already has an equivalent component, primitive, utility, or dependency.
2. Prefer adapting existing project code.
3. Prefer reference-only use of external blocks over installing their registry package.
4. If installation is necessary, install the smallest specific primitive/component.
5. Do not add a second library for the same job unless the user explicitly approves.
6. Mention every new dependency or generated component source in the final summary.

When in doubt, ask before adding dependencies.

The `design-anchor` runtime is different: when a consumer project needs actual UI/token governance changes and the runtime, root `design-tokens.json`, or generated token CSS is missing, install/sync it as the foundation for the work. This is the token baseline, not a discretionary UI dependency.

Full automatic baseline install is for React + Tailwind web apps. In React without Tailwind, Astro React islands, or unclear stacks, ask first. In Vue/Nuxt, Svelte/SvelteKit, Angular, Solid, React Native, native mobile, Flutter, plain HTML/CSS, or backend-only repos, do not install runtime/components by default; provide design/token guidance or an adaptation plan.

## Component Installation Matrix

| User intent | Install component? | Action |
|---|---|---|
| Build or refactor production UI with a missing high-risk interaction primitive | Yes, when no accessible project equivalent exists | Install the specific primitive only, then import from `@design` or `@/components`. |
| Existing project already has an accessible equivalent | No | Reuse or lightly adapt it. |
| Read-only audit, review, explanation, README/docs, token extraction, Portal inspection | No | Report recommendations only. |
| Minor visual tweak or copy/layout adjustment | Usually no | Edit existing files/components. |
| Presentational UI only: cards, shell appearance, stats, hero, table visuals | No Design Anchor primitive | Design freely or adapt existing patterns. |
| User says no new files/deps, or repo is not ready for installs | No | Avoid installers; explain what would be installed later. |
| Installer would add a broad dependency stack for one narrow interaction | No | Use existing primitives or ask for approval. |

If installing would add files or dependencies and intent is ambiguous, ask one concise confirmation question.

## Presentational Components

AI freely designs:

- cards,
- sections,
- headers,
- stat blocks,
- navigation appearance,
- data displays,
- hero sections,
- feature cards,
- dashboard layouts,
- empty/loading/error/success visual states.

Use the style prompt as design direction. No mandatory library.

## Functional Components

Use Design Anchor selectively for interaction primitives where accessibility and behavior are critical:

```bash
npx design-anchor add dialog alert-dialog
npx design-anchor add command
npx design-anchor add select
npx design-anchor add popover dropdown-menu
npx design-anchor add sheet
npx design-anchor add tooltip
npx design-anchor add tabs
```

Functional components from Design Anchor import from `@design` or `@/components`. Do not import from `.anchor/` or `node_modules/design-anchor/` deep paths.

Install only if the primitive is needed for the current implementation and missing from the project.

Never run `npx design-anchor add` outside a React + Tailwind-compatible UI surface.

## External Blocks

External blocks are structural references first. Install only when:

- The user is implementing a real product screen.
- The project tooling is compatible.
- The block saves meaningful layout/responsive work.
- The block will be heavily customized.
- It does not bring a broad dependency stack.

Full starters are reference-only unless the user explicitly wants a starter.

## Icons

- One icon library per project.
- Recommend `lucide-react` for new projects.
- Keep icon size consistent: 16, 20, or 24px unless a variant requires otherwise.
- Do not mix outline and filled icon styles in the same context.
- Use icon + label for primary actions.
- Use icon-only buttons for repeated/secondary actions with tooltips.
- Remove decorative icons that add no recognition value.

## Token Rule

Whether a component is freely written, existing, or installed from Design Anchor, structural colors must reference token CSS variables or semantic token classes.

Keep token edits in root `design-tokens.json`, then run `npx design-anchor sync` to rebuild `.anchor/design-tokens.generated.css` and local rules.
