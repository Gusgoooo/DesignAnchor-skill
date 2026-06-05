# Design Anchor Project Contract

Read this before installing Design Anchor, changing component/token files, deciding whether a repo is a consumer project or the Design Anchor source repo, or explaining what should be committed.

## Consumer Project Layout

| Layer | Location | Git strategy | Rule |
|---|---|---|---|
| User-owned components | `src/components/` | Commit | Real component source added on demand by `anchor add`. Business code imports through `@design` or `@/components`. |
| Design tokens | `design-tokens.json` | Commit | Product token source of truth. Edit this file, then sync generated assets. |
| Generated token CSS | `.anchor/design-tokens.generated.css` | Do not commit by default | Generated from root tokens and rebuilt by `sync` / `hydrate`. App CSS imports it from `.anchor/`. |
| Anchor control plane | `.anchor/` | Do not commit | Local Portal, schema, sync/runtime state, demos, generated CSS, local rules, and MCP target. It is rebuildable with `hydrate` or `sync`. |
| Component specs | `.anchor/src/anchor/schema/components/*.spec.json` | Do not commit by default | Local AI contract for governed components. Rebuild from the installed runtime. |
| Optional AI bridge files | `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/anchor.mdc`, `.github/copilot-instructions.md` | Local/ignored by default unless team chooses to share | Created by `anchor govern` or explicit bridge setup. They point AI tools at the local contract. |
| Optional MCP config | `.mcp.json`, `.cursor/mcp.json` | Local/ignored by default unless team chooses to share | Should call `npx --no-install design-anchor mcp ./.anchor` so clients use the installed dependency. |
| Upstream package | `node_modules/design-anchor/` | Never commit | Read-only package cache. Do not patch directly. Use `anchor upgrade` or package source changes. |

Never import app UI from `.anchor/` or `node_modules/design-anchor/` deep paths.

## What Gets Added To A User Project

The skill itself adds no consumer-project files. It may only invoke the Design Anchor runtime, and each runtime write has a narrow purpose:

| Action | Added or changed | Commit? | Notes |
|---|---|---|---|
| Probe / recommendation / read-only audit | Nothing | No | Skill reads and reports only. |
| Establish token baseline | `package.json`, lockfile, `node_modules/`, root `design-tokens.json`, `.anchor/`, generated token CSS | Manifest, lockfile, and token source yes; `node_modules/` no; `.anchor/` no by default | First step for implementation/governance work when any baseline piece is missing. |
| Install runtime | `package.json`, lockfile, `node_modules/` | Manifest and lockfile yes; `node_modules/` no | Part of baseline creation when UI/token governance is required and runtime is missing. |
| `sync` / `hydrate` | `design-tokens.json` if missing, `.anchor/`, `.anchor/design-tokens.generated.css`, local runtime mirrors | Commit `design-tokens.json`; keep `.anchor/` ignored by default | Rebuildable runtime state, not skill-owned files. |
| `theme` | `.anchor/design-prompt.md`, active prompt rule under `.anchor/`, token updates | Commit token source only by default | Style prompt state remains local unless team chooses otherwise. |
| `add <component>` | minimal functional primitive source under `src/components/` | Yes, when app imports it | Only for missing accessible interaction primitives. |
| `govern` | optional AI bridge files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/rules/anchor.mdc`, MCP config) | Team choice | Requires explicit user/team intent. |
| `portal` / `audit` | No app UI source by themselves | No | They inspect or report unless followed by requested edits. |

Do not add skill-owned helper files, temporary docs, wrapper components, custom config files, or duplicate design-system files to the consumer project.

## Source Repo Vs Consumer Repo

The target is the Design Anchor source package when `package.json` has `"name": "design-anchor"` and the repo contains `bin/anchor.mjs` plus `src/anchor-portal/`.

In the source repo:

- Do not run `npx design-anchor start`; it scaffolds consumer state into the package repo.
- Edit package source directly, such as `bin/`, `src/anchor`, `src/anchor-portal`, `src/components`, `src/design-tokens`, or `scripts`.
- Verify with package scripts such as `npm run sync:anchor`, `npm run anchor:audit`, `npm run lint`, `npm run typecheck`, or `npm publish --dry-run` when relevant.

In a consumer project:

- Full automatic runtime use targets React + Tailwind web apps such as Next.js, Vite React, Remix, React Router, and similar setups.
- For any actual UI/theme/token/component/governance implementation in a full-fit stack, establish the token baseline first: installed runtime, root `design-tokens.json`, and generated `.anchor/design-tokens.generated.css`.
- For React without Tailwind, Astro React islands, or unclear stacks, ask before installing; use token/design guidance until CSS integration is clear.
- For Vue/Nuxt, Svelte/SvelteKit, Angular, Solid, plain HTML/CSS, React Native, native mobile, Flutter, or backend-only repos, do not install runtime/components by default. Offer an adaptation plan instead.
- For read-only analysis, documentation, or real-project test-only inspection, report the missing baseline instead of installing.
- Before the first write in a real project, state the expected footprint: manifest/lockfile, root `design-tokens.json`, local `.anchor/`, generated token CSS, and any component source only if needed.
- Use `sync` for local background activation: `.anchor`, root `design-tokens.json`, generated CSS, Tailwind extensions, and local rules.
- Use `hydrate` when `.anchor/` is missing after clone.
- Use `add` only for components that the current UI actually needs.
- Use `theme <prompt.md>` when the user gives style direction to extract design tokens.
- Use `govern` only when the user/team wants root-level AI bridge files for an existing product.
- Open Portal only for intentional inspection or tuning.

## Dependency Budget

Default to zero new UI dependencies. Before installing a component, block, effect library, icon library, chart/table package, or helper utility, verify that the project does not already have an equivalent. Prefer adapting existing project code or using an external block as reference-only.

The `design-anchor` runtime/token baseline itself is the exception when UI/token governance is required and missing. It is the first implementation move, not ordinary dependency bloat. After that, install only the smallest missing functional primitive with `add`, and only for real UI implementation work where accessibility, focus, keyboard, ARIA, or viewport behavior would otherwise be risky.

Do not add full starters, broad block bundles, or second libraries for icons/forms/charts/tables/motion unless the user explicitly approves or the project already standardizes on them.

After implementation, report the actual footprint. Do not stage `node_modules/` or `.anchor/` by default; keep `.anchor/` rebuildable and ignored locally unless the team explicitly chooses another policy.

## Preferred Commands

Token baseline / background activation:

```bash
npm install -D design-anchor
npx design-anchor sync
```

Optional AI bridge injection for existing products:

```bash
npx design-anchor govern
```

Rebuild local control plane:

```bash
npx design-anchor hydrate
```

Add a component on demand only when the current UI task needs a missing accessible primitive:

```bash
npx design-anchor add button
```

Extract tokens from a user style prompt:

```bash
npx design-anchor theme design-prompt.md
npx design-anchor sync
```

Inspect or tune Design Anchor state:

```bash
npx design-anchor portal tokens
npx design-anchor portal components
npx design-anchor portal specs
npx design-anchor portal docs
```

Post-change checks:

```bash
npx design-anchor sync
npx design-anchor audit
```

Final responses for UI changes must include a `Design Anchor 自检` line.
