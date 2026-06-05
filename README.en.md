# Design Anchor Skill

[中文](./README.md)

Design Anchor turns AI UI from first-screen inspiration into page-100 order.

It is the AI Skill layer for the [`design-anchor`](https://www.npmjs.com/package/design-anchor) npm runtime. It makes AI establish a token baseline first, then keep reading the same tokens, component boundaries, layout principles, and quality gates across a long-lived product.

In short: it sets direction at the start, protects consistency during maintenance, finds drift during review, and can govern full pages without rewriting business logic.

It works best for React + Tailwind web products: SaaS tools, AI products, internal tools, creative tools, developer tools, and other interfaces where users do real work.

Runtime support is stack-specific: the full runtime/component path targets React + Tailwind web products. Other stacks can still use the skill for design diagnosis, token thinking, layout governance, and visual direction, but runtime/component installs should be explicit.

## Core Capabilities

**Smart Classification** — On activation, the skill inspects the project and request first:

| Scenario | Behavior |
|---|---|
| Mature existing product | Recommends layout restructuring by default (page analysis → layout rebuild → component replacement → icon unification) |
| Detailed design prompt | Extract tokens directly, freely design the best layout for each page's purpose |
| Vague product request | Match from built-in style prompt pool, convert to tokens, generate first page |
| Unclear next step | Acts like a design lead: recommends the next design action, scope, and dependency posture |

**Designer-Led Steering** — The skill does not wait for users to name commands such as `theme`, `add`, or `audit`. It diagnoses the product stage and recommends what should happen next: first useful screen for new products, read-only diagnosis plus layout restructuring for mature products, hierarchy/responsive/state cleanup for flawed pages, and smallest-possible primitive installation only when an accessible interaction is missing.

It makes three things explicit before substantial UI work: **what to do next, what is in scope, and whether any dependency/component install is justified**. Broad page restructuring, root-level AI bridge generation, Portal-first workflows, and new dependencies still require explicit user confirmation.

Most importantly, token compliance is not considered done if the page is not beautiful. The page must have clear hierarchy, visible design personality, refined typography/surfaces/spacing, and designed states. If governance makes the UI flatter, grayer, or more template-like, the skill runs a no-new-dependency beauty pass before delivery.

The beauty pass borrows the useful parts of Figma design-system workflows: discover existing visual language first, set foundations before components, polish one section at a time, and validate before proceeding. It does not introduce Figma tooling or extra dependencies.

**Layout Governance** — Goes beyond token and import fixes to govern page structure:

- Based on layout quality principles (purpose-layout fit, information hierarchy, action hierarchy, density-task fit, spatial efficiency, navigation clarity, state completeness) — AI freely designs the best layout, then verifies against principles
- Provides reference examples for common page types (data workspaces, detail pages, dashboards, forms, chat interfaces, canvas workspaces, agent workflows, settings, etc.) as inspiration, not mandatory templates
- Detects and unifies icon libraries (mixed usage detection + migration to a single library)
- Full-page restructuring instead of patching — preserves business logic, rebuilds the UI layer
- Per-page confirmation: each page is individually approved before changes

**Design Governance** — Powered by the `design-anchor` npm runtime. For implementation work, the first move is the token baseline: install/sync runtime so the project has root `design-tokens.json` and generated token CSS before UI styling begins.

- `sync` — Background activation: regenerates the local `.anchor` control plane, token CSS, Tailwind extensions, and local rule mirrors
- `govern` — Optional root-level AI bridge generation for teams that want AGENTS / CLAUDE / Cursor / MCP files
- `theme <prompt.md>` — Extract design tokens from a style prompt
- `add <component>` — Install source-level components on demand to `src/components/` only when a real UI task needs a missing accessible primitive
- `audit` — Compliance check after UI changes
- `portal` — Open the design system inspection panel on demand (tokens / components / specs / docs)

**Style Prompt Pool** — Built-in style templates under `references/design-prompts/` (Stripe-like, Linear-like, HUD dark, minimal dark, Google-like, generic SaaS, etc.), auto-matched to user scenarios via frontmatter metadata. Preset names are never exposed to users.

## Directory Structure

```
design-anchor/
├── SKILL.md                          # Skill entry point: routing + progressive loading
├── agents/
│   └── openai.yaml                   # OpenAI agent adapter
├── scripts/
│   ├── probe-design-anchor.mjs       # Project probe (maturity, deps, icon libraries, layout signals)
│   └── list-style-prompts.mjs        # List prompt pool metadata
└── references/
    ├── project-contract.md           # File boundaries & source/consumer detection
    ├── component-decision.md         # Component installs, dependency budget, file boundaries
    ├── quality-bar.md                # Visual, responsive, accessibility, token quality gates
    ├── page-rendering-pipeline.md    # Three-phase page rendering and block decisions
    ├── govern-existing-product.md    # Existing product governance (layout restructuring first)
    ├── layout-governance.md          # Layout governance: quality principles, reference examples, icon rules
    ├── product-context.md        # Product context: page purpose categories + anti-patterns
    ├── style-source-selection.md     # Style matching decisions
    ├── style-prompt-guidance.md      # Style prompt → token guide
    ├── visual-craft.md               # Visual polish playbook inspired by design-system workflows
    ├── design-prompt-pool.md     # Prompt pool format spec
    ├── portal-routing.md             # Portal routing intent
    └── design-prompts/           # Built-in style prompt pool (26 curated prompts)
        ├── _template.md
        ├── linear.md              # Cinematic dark premium
        ├── saas.md                # Modern light SaaS
        ├── google-style.md        # Friendly platform
        ├── cyberpunk-ui.md        # Cyberpunk neon dark
        ├── bauhaus.md             # Bauhaus geometric
        └── ...                    # 20+ more covering distinct visual directions
```

## Installation

### Claude Code (Project-level)

```bash
mkdir -p .claude/skills
cp -R design-anchor .claude/skills/design-anchor
```

### Claude Code (Personal Global)

```bash
cp -R design-anchor ~/.claude/skills/design-anchor
```

### Claude.ai Upload

Package from the repo root:

```bash
zip -r design-anchor.zip design-anchor -x "*/.DS_Store"
```

Upload the zip file. The zip must contain `design-anchor/SKILL.md` at the top level, not a bare `SKILL.md`.

## Runtime Model

The skill itself is an AI instruction layer; the actual runtime is provided by the `design-anchor` npm package.

## Supported Tech Stacks

| Stack | Fit | Install policy |
|---|---|---|
| Next.js / Vite React / Remix / React Router + Tailwind | Full support | Establish token baseline first for implementation; `add` primitives only when needed. |
| React without Tailwind | Partial | Confirm token CSS / Tailwind integration first; do not install components by default. |
| Astro + React islands + Tailwind | Partial | Install only after confirming the React island surface. |
| Vue / Nuxt / Svelte / SvelteKit / Angular / Solid / plain HTML/CSS | Design guidance by default | Do not install runtime/components by default; offer an adaptation plan. |
| React Native / Flutter / native mobile / backend-only repos | Not a direct runtime target | Do not install; use prompt, token, layout, and visual guidance only. |

File boundaries in a consumer project:

| Layer | Location | Git Strategy |
|---|---|---|
| User component source | `src/components/` | Commit when installed/used |
| Design tokens | `design-tokens.json` | Commit |
| Generated token CSS | `.anchor/design-tokens.generated.css` | Do not commit by default (rebuild with `sync` / `hydrate`) |
| Local control plane | `.anchor/` | Do not commit (rebuild with `hydrate`) |
| Optional AI bridge files | `AGENTS.md` / `CLAUDE.md` / `.cursor/rules/` / MCP config | Commit only if the team chooses to share |

Business code imports from `@design` or `@/components` only. Never import from `.anchor/` or `node_modules/design-anchor/` deep paths.

## Dependency Discipline

Design Anchor defaults to **zero new dependencies beyond the token baseline**. In React + Tailwind implementation work, install/sync the runtime first so the token system exists from the start. In other stacks, ask before installing. After that, reuse the project's existing components, icon set, motion utilities, tables, charts, and form stack first. Install the smallest `design-anchor add <component>` primitive only when real UI work is missing an accessible interaction primitive. Treat external blocks as structural references unless they fit the project, save meaningful layout/responsive work, and do not pull in a broad dependency stack.

## What The Skill Adds

The skill itself adds **nothing** to a consumer project. It only diagnoses, guides, edits requested UI surfaces, and invokes the runtime. Possible new project content comes only from `design-anchor` CLI commands:

For real-project trials, the default first step is probe/read-only diagnosis with no writes. The runtime/token baseline is installed first only when the app is React + Tailwind and the user is asking for actual UI, token, component, or governance implementation. Other stacks, unclear stacks, and test-only requests get an adaptation plan instead of default installation.

| Trigger | May add / change | Default Git strategy |
|---|---|---|
| Probe / recommendation / read-only audit | Nothing | Nothing to commit |
| Establish token baseline | `package.json`, lockfile, `node_modules/`, `design-tokens.json`, `.anchor/`, generated CSS | Commit manifest/lockfile and token source; never commit `node_modules/`; keep `.anchor/` ignored by default |
| `sync` / `hydrate` | `design-tokens.json`, `.anchor/`, `.anchor/design-tokens.generated.css` | Commit `design-tokens.json`; keep `.anchor/` ignored by default |
| `theme` | `.anchor/design-prompt.md`, active prompt rule inside `.anchor/`, token updates | Commit token source only by default |
| `add <component>` | minimal functional primitive source under `src/components/` | Commit only when app code uses it |
| `govern` | optional `AGENTS.md`, `CLAUDE.md`, Cursor / MCP bridge files | Commit only when the team chooses to share them |
| `portal` / `audit` | No business UI source by themselves | Nothing to commit |

After every real-project implementation, the skill should report the actual footprint: files added/changed, generated `.anchor/` files intentionally left unstaged, and any dependency or component source introduced.

## Existing Product Governance

When the probe script detects a mature product, the skill defaults to recommending **layout restructuring**, not conservative token patching:

- **Layout restructuring** (recommended) — Analyze layout, information architecture, component usage, and icon consistency page by page, then rebuild the UI layer while preserving all business logic and data bindings
- **Progressive optimization** — Only fix token compliance, import paths, and functional primitive accessibility (dialog, select, etc.). Keeps existing layout unchanged
- **Read-only audit** — Scan and report only, no file changes

Layout restructuring is executed page by page, with each page individually confirmed before changes begin.

## Layout Governance Approach

Layout governance is based on **quality principles**, not fixed templates. AI freely designs the best layout for each page's purpose, then verifies the result against these principles:

| Quality Principle | Verification Question |
|---|---|
| Purpose–layout fit | If you described this page's purpose to a designer, would they expect this layout? |
| Information hierarchy | Can the user see the most important content in a 2-second glance? |
| Action hierarchy | Can the user perform their most frequent action within one click of landing? |
| Density–task fit | Does the density serve the task or the aesthetic? |
| Spatial efficiency | If you removed this element, would the user notice or care? |
| Navigation clarity | If the user was teleported to this page, would they know where they are? |
| State completeness | What does this page look like when data is empty, loading, or errored? |

Reference examples cover: data workspaces, detail pages, dashboards, forms, chat/conversational interfaces, canvas/workspaces, agent workflows, settings — as inspiration, not mandatory templates.

## Extending the Prompt Pool

Add a `.md` file under `references/design-prompts/`. The file must start with standard frontmatter:

```yaml
---
name: "Your Internal Prompt Name"
slug: "your-stable-slug"
user_facing_direction: "User-facing style direction"
best_for:
  - "scenario or product type"
keywords:
  - "matching keyword"
density: "compact | balanced | spacious | command-center"
tone: "focused, trustworthy, friendly"
mode: "light | dark | mixed | either"
---
```

The skill auto-matches user requests against `best_for`, `keywords`, `density`, `tone`, and `mode`. No additional registration needed.

## Quick Command Reference

```bash
npm install -D design-anchor        # Establish token baseline for implementation/governance
npx design-anchor sync              # Create/refresh tokens + local governance
npx design-anchor govern            # Optional AI bridge files for existing products
npx design-anchor theme <prompt.md> # Style prompt → tokens
npx design-anchor add <component>   # Add only when a missing primitive is needed
npx design-anchor audit             # Compliance check
npx design-anchor hydrate           # Rebuild local .anchor
npx design-anchor portal tokens     # Inspect tokens
npx design-anchor portal components # Inspect component library
```

## npm Package Dependencies

The following capabilities require implementation in the `design-anchor` npm package (not achievable at the skill layer alone):

- `npx design-anchor audit` to include layout and icon checking rules
- `sync`-generated AI rule templates to include layout constraints

These do not block the skill's layout governance — the skill's own instructions already guide AI through layout analysis and restructuring.

## License

MIT
