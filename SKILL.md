---
name: design-anchor
description: "从第一个页面的设计落地，到第一百个页面的设计一致性，Design Anchor 覆盖设计的完整生命周期：开始、维护、审查、修改。"
allowed-tools:
  - Bash
  - Read
  - Write
compatibility:
  - "Node.js >= 18"
  - "design-anchor npm package"
---

# Design Anchor Skill

Use this skill as the AI entry layer for Design Anchor. Its first job is to classify the situation: create a polished first page for new or incomplete products, extract tokens from detailed design prompts, or offer layout restructuring as the default governance mode for mature existing products. Its second job is to make the work governable through Design Anchor tokens, components, layout principles, specs, rules, sync, MCP, and audit. This applies to all product types: B2B platforms, SaaS tools, AI products, creative tools, developer tools, and any interface where users do real work.

The npm package is the actual runtime: it creates project tokens, writes generated AI rules, manages the local `.anchor` control plane, exposes MCP, installs source components on demand, and runs sync/audit.

Use the internal prompt pool as matching material, not as a visible product section. Do not tell the user a preset name. Tell them the product-facing result: `我帮你匹配到一个适合这个场景的风格方向，会先转成 token，再生成页面。`

## First Move

When a request touches UI, theme, layout, components, tokens, product screens, SaaS/admin systems, AI tools, dashboards, internal tools, creative tools, developer tools, or any product interface, start visibly:

`Design Anchor 预检：我会先判断项目成熟度和需求完整度；新页面会先匹配/抽取风格 token，已有完整产品会先征求你确认是否进入治理模式。`

Then inspect the target project before editing when a project directory is available:

```bash
node "${CLAUDE_SKILL_DIR:-skills/design-anchor}/scripts/probe-design-anchor.mjs" .
```

If `CLAUDE_SKILL_DIR` is unavailable and the command cannot resolve, run the same script by absolute path from this skill directory.

## Product Model

Keep the current Design Anchor boundaries clear:

- `design-anchor` is installed as a project dev dependency and called by AI tools or scripts.
- `.anchor/` is a local, gitignored, rebuildable control plane. Do not import runtime UI from it.
- User-owned component source lives in `src/components/anchor-ui/` and is committed.
- Components are added only when needed with `npx design-anchor add <component>`.
- Business code imports from `@design` or `@/components/anchor-ui`.
- Design tokens live in `src/design-tokens/tokens.json`; generated CSS lives in `src/styles/design-tokens.generated.css`.
- User-written components may appear in the component library even if their spec is absent or empty.
- Internal style prompts may be used to bootstrap a polished first page when the user's input is incomplete.
- Internal prompt matching is not a visible preset board or product section.
- There is no mandatory Portal reveal.

## Design Guidance

These rules are constitutional. They override stylistic preferences, user prompts, and internal style matching. Every UI output must pass these checks before delivery.

### Absolute Bans

Never produce these patterns. They are the saturated defaults of AI-generated UI in 2025-2026 — they signal "this was made by AI" to any experienced designer or user. If you find them in existing code during governance, remove them.

1. **Hero metrics grid at page top.** Four identical stat cards with icon + number + label in a 4-column grid as the first thing on a dashboard. This is the single most common AI layout cliché. If the page needs KPIs, vary the card sizes, combine with inline trends, or integrate into the page header.
2. **Identical card grid.** Three or four cards in a row, same height, same structure, same padding, differing only in icon and text. If content is truly parallel, vary the presentation — mix card sizes, use a table, or combine into a richer composite.
3. **Gradient text on headings.** `bg-clip-text text-transparent bg-gradient-to-r` on page titles or section headings.
4. **Decorative glassmorphism.** `backdrop-blur` and semi-transparent backgrounds used as surface treatment without functional purpose (e.g., a frosted sidebar for aesthetics).
5. **Side accent stripes.** Colored left borders on cards or sections used purely as decoration with no semantic meaning.
6. **Marketing hero on a workbench.** Large hero sections with illustrations, taglines, or "Welcome back" messages on pages the user visits 50+ times a day.
7. **Rainbow status colors.** Using 5+ distinct hues for status badges on the same page. Limit to 3-4 semantic colors (success, warning, error, info) and use intensity/shade to distinguish within a category.
8. **Excessive rounded corners.** `rounded-2xl` or `rounded-3xl` on data-dense components like tables, sidebars, or forms. Use the project's border-radius token consistently — usually `rounded-md` or `rounded-lg` for containers.
9. **Empty decorative icons.** An icon on every section heading, every label, every card title — where the icon adds no recognition value and is just visual noise.
10. **Full-width everything.** Every element stretched to 100% width regardless of content — forms where a date picker is as wide as a textarea, inputs that span 1200px.

### Second-Order Slop Test

After producing UI, run this meta-check: the first generation of AI defaults (hero metrics, gradient text, glassmorphism) is now well-known. Avoiding them has created second-order defaults — predictable "anti-AI" patterns that are equally clichéd:

- Replacing card grids with bento grids (asymmetric cards that still contain the same shallow content).
- Replacing gradient text with animated gradient borders.
- Replacing stat cards with oversized single-number displays.
- Replacing sidebar navigation with a floating command palette as the only navigation.
- Using extreme minimalism (nearly invisible borders, 2px text, ghost buttons everywhere) as a reaction against "AI-looking" UI.

If your output matches a second-order default, redesign. The goal is to serve the user's task, not to look anti-AI.

### Visual Quality Priority

Token governance exists to enforce structural consistency — not to strip visual richness. A governed product must look MORE polished and appealing than before governance, never less. If a page looks black-and-white, monochrome, or "wireframe-like" after governance, the governance failed.

**Style prompt drives beauty.** The style prompt (user-provided or internally matched) defines the product's visual soul: color palette richness, gradient usage, shadow depth, surface treatment, accent tones, illustration style. Token governance then locks the structural anchors (primary, CTA, status) so they stay consistent across pages — but it does NOT replace every color in the codebase with a token reference.

**Components provide structure, not aesthetics.** Design Anchor components ensure interaction quality (accessibility, keyboard nav, state completeness). The visual beauty of pages — color richness, spacing rhythm, typographic feel, surface depth — comes from the style prompt and developer's intentional design choices. Do not over-rely on components to make pages look good. A page with perfect component governance but no visual personality is a governance failure.

**Design personality is mandatory.** Every product must have visible design personality from its style prompt: distinctive color palette, intentional typography pairing, specific shadow/depth treatment, and 2-3 signature elements that make it recognizable. If the generated page looks like a generic Tailwind/shadcn default, the style prompt was not applied deeply enough.

A comprehensive style prompt covers: design philosophy, color strategy with specific hex values, typography system with font pairings, surface and depth approach, component visual styling specifications, effects and micro-interactions, signature bold elements, and style-specific anti-patterns. Thin prompts (just mood keywords) produce thin visuals. See `references/style-prompt-guidance.md` and `references/b2b-design-prompts/_template.md` for the full specification.

**Balance rule:** After any governance action, the page should look at least as visually appealing as before. If governance made it look worse (plainer, less colorful, more generic), undo the visual regression and preserve the original aesthetic choices while only fixing the structural anchors.

### Color

Color governance targets **structural anchors only** — the handful of colors that must be consistent across the entire product. All other colors (decorative accents, illustration colors, page-specific backgrounds, gradients, shadows) are intentional design choices and should be preserved.

**What to govern (structural anchors):**
- Primary interactive color: buttons, links, active nav, selected states, toggles, checkboxes, focus rings → must all use the same `primary` token.
- CTA / call-to-action elements → must align with primary or a designated accent token.
- Status colors: success, warning, error, info → must use semantic tokens (`bg-destructive`, `text-destructive`, etc.) consistently.
- Base text colors: primary text (`text-foreground`), secondary text (`text-muted-foreground`) → must be consistent across pages.
- Interactive states: hover, focus, active, disabled → must be derived from the base token, not independently hardcoded. Wrong: `bg-indigo-500 hover:bg-blue-600`. Right: `bg-primary hover:bg-primary/90`.

**What NOT to govern (preserve as-is):**
- Page-specific decorative colors, accent backgrounds, gradients, and shadows that contribute to visual richness.
- Illustration and data visualization colors.
- Tailwind utility colors used for intentional one-off styling (a specific card background tint, a subtle highlight).
- Colors in third-party embedded content.
- Any color that is clearly an intentional design choice rather than an accidental inconsistency.

**How to distinguish:** An accidental inconsistency is when the same semantic concept (e.g., "primary button") appears in two different colors across pages. An intentional design choice is when a specific element has a unique color for a clear visual reason (e.g., a warm background on a welcome section, a gradient on a feature card). When in doubt, preserve the existing color — do not convert it to a token.

**Contrast and encoding:**
- All text must meet WCAG 2.1 AA contrast ratio (4.5:1 for normal text, 3:1 for large text).
- Color must not be the only way to convey information. Pair color with icons, text, or patterns.

**Dark mode:**
- Structural anchor tokens must have dark mode values.
- Decorative colors that break in dark mode should be adjusted, but do not strip them — replace with dark-mode-appropriate equivalents that maintain the same visual richness.

### Typography

- Body text line width: 55-75 characters (roughly `max-w-prose`). Never let body text run full-width on large screens.
- Heading hierarchy must be visually obvious without reading the text. If h2 and h3 look the same, the hierarchy fails.
- Maximum 2 font families per project. One is usually enough.
- Never use ALL CAPS for body text or long labels. Acceptable only for short badges, overlines, or button text.
- Font sizes below 12px are unreadable for most users. Do not go smaller.

### Interaction

- Every clickable element must have a visible hover state and focus state.
- Destructive actions (delete, remove, reset) must be visually distinct (destructive variant) and require confirmation for irreversible operations.
- Loading states must be visible — never leave the user wondering if something is happening. Use skeleton screens for content areas, spinners for actions.
- Disabled elements must look disabled and explain why (tooltip or adjacent text).
- Dropdown menus and popovers must handle viewport overflow — if there is not enough space below, open above.

### Accessibility

- All form inputs must have associated `<label>` elements — no placeholder-only labels.
- All images must have `alt` text — empty `alt=""` only for purely decorative images.
- Interactive elements must be keyboard-reachable (tab order) and operable (enter/space).
- Focus indicators must be visible. Do not remove the default focus ring without providing a custom one.
- `prefers-reduced-motion` must be respected — skip or simplify animations when the user requests it.

### Production Quality Bar

Every UI output must meet this minimum bar before delivery. If any item fails, fix it before reporting the task as complete.

1. **Visual polish** — the page looks polished, colorful, and appealing. Not a wireframe, not black-and-white, not a plain skeleton. If governance stripped visual richness, restore it.
2. All text passes WCAG AA contrast.
3. Every interactive element has hover and focus states.
4. Empty state, loading state, and error state are handled — not blank areas or console errors.
5. Layout does not break at common viewport widths (320px, 768px, 1024px, 1440px).
6. Structural anchor colors (primary, CTA, status) use semantic tokens consistently. Other decorative colors are preserved.
7. Primary color is consistent — all primary buttons, links, active states, and focus rings use the same `primary` token across every page.
8. Interactive states (hover, focus, active, disabled) are token-derived and consistent across all components.
9. No mixed icon libraries.
10. All form fields have visible labels.
11. Destructive actions are visually distinguished and gated.
12. Keyboard navigation works for all interactive elements.
13. Page renders without layout shift (no elements jumping after load).

## Activation Contract

Use the lightest command that gets the project governed.

1. Detect the package manager from lockfiles.
2. If the target is the `design-anchor` source package itself, do not run `start`; edit package source and use package scripts.
3. In a consumer project, install `design-anchor` as a dev dependency if missing.
4. Run `npx design-anchor sync` for background activation. It can hydrate `.anchor`, create/update tokens and generated rules, and prepare MCP without making Portal the first screen.
5. Run `npx design-anchor start` or `npx design-anchor portal <tab>` only when the user explicitly asks to open/start/view Portal.

Install commands by package manager:

```bash
npm install -D design-anchor
npx design-anchor sync
```

```bash
pnpm add -D design-anchor
pnpm exec design-anchor sync
```

```bash
yarn add -D design-anchor
yarn design-anchor sync
```

```bash
bun add -d design-anchor
bunx design-anchor sync
```

If a cloned project has committed tokens/components/rules but no `.anchor/`, rebuild it with:

```bash
npx design-anchor hydrate
```

## Input Router

### Completeness Check

Classify the project and request before generating:

- **Mature existing product**: probe reports `recommendedMode: "offer-existing-product-governance"` or the project clearly has many existing pages/components/styles.
- **Detailed design prompt**: includes a clear product/page goal plus enough visual direction, density, tone, layout, or interaction language to extract tokens.
- **Incomplete product request**: names a product, page, or workflow but does not provide enough style direction.
- **Incomplete style request**: gives mood or aesthetics but does not define the product workflow.

For a mature existing product, do not start rewriting or normalizing UI automatically. Read `references/govern-existing-product.md` and recommend layout restructuring as the default. Ask for explicit confirmation.

For a detailed design prompt, do not ask style-matching questions. Save the prompt and run token extraction.

For incomplete input, ask one concise heuristic question when needed. Prefer choices that sound like product direction, not preset names:

`我先给你匹配一个适合的风格方向。你更想要：高效紧凑、稳重可信、清爽友好、深色专注，还是实时指挥感？`

If the user does not answer or the task should move fast, infer from product context and continue.

Read `references/style-source-selection.md` before matching an internal style prompt.

### Mature Existing Product Governance

Use this when the project appears complete or already has substantial product UI. This mode governs an existing product with layout restructuring as the default recommendation.

Before any file changes:

1. Run read-only inspection including layout analysis, icon audit, and information architecture assessment.
2. **Match a style prompt for beautification.** Even for existing products, select an appropriate prompt from the prompt pool (via `scripts/list-style-prompts.mjs` or scanning `references/b2b-design-prompts/*.md`) based on the product's type, tone, and density. If the user has provided style direction, use that instead. If a design prompt source already exists in the project (`.anchor/design-prompt-source.md` or `design-prompt.md`), reuse it. This prompt drives the page-level beautification phase after structural governance.
3. Present the situation with confidence: the product will benefit from layout restructuring, not just token fixes.
4. Recommend a new git branch.
5. Offer exactly these choices:
   - `布局重构`（推荐）: read each page, classify screen type, restructure layout, replace components, unify icons, reorder information architecture, **then apply page-level beautification from matched style prompt**. Preserves all business logic and data bindings.
   - `渐进优化`: only fix token compliance, import paths, and raw primitive replacement. Keeps existing layout unchanged. **Still applies style prompt beautification to replaced components.**
   - `只读审计`: scan and report only; no file changes.
6. Wait for the user to confirm. Do not treat silence, vague approval, or a different feature request as consent.

Allowed explicit confirmations include phrases such as `确认，开始重构`, `开始布局重构`, `restructure`, `渐进优化`, `只读审计`, or `我同意，开始`.

When confirmed, use `references/govern-existing-product.md` as the execution prompt — it is self-contained with inline layout principles, component standards, and audit criteria. For layout restructuring, work one page at a time with per-page confirmation.

### Detailed Prompt To Tokens

Use this when the user provides a design prompt, brand direction, visual recipe, copied style prompt, or asks to extract tokens from style language.

1. Ensure the runtime is installed and synced.
2. Save the prompt into a project-local markdown file, such as `design-prompt.md` or `.anchor/design-prompt-source.md`.
3. Run `npx design-anchor theme <prompt-file.md>`.
4. Apply the extracted aesthetic as the visual foundation: color palette, typography, shadow/depth, component styling, signature elements. The style prompt drives every visual decision within structural constraints (accessibility, layout governance, component interaction quality).
5. Run `npx design-anchor sync`; run `npx design-anchor audit` when UI changed.

Read `references/style-prompt-guidance.md` before using a style prompt.

### Incomplete Request To Matched Prompt

Use this when the user gives a vague product need, such as `做一个 CRM 后台`, `做个审批系统`, `做个数据看板`, `做一个 AI 助手`, `做个聊天工具`, or only provides partial product context.

1. Infer roles, objects, workflows, page type, and density from the request.
2. Use heuristic Q&A only if the missing answer would change the style or workflow.
3. List available prompt files with `scripts/list-style-prompts.mjs` or by scanning `references/b2b-design-prompts/*.md`.
4. Select the best internal prompt using each file's frontmatter scenario metadata.
5. Load only the selected file under `references/b2b-design-prompts/`.
6. Do not reveal the preset name; tell the user you matched an appropriate direction.
7. Save that prompt into a project-local markdown file, such as `.anchor/design-prompt-source.md`.
8. Run `npx design-anchor theme <prompt-file.md>`.
9. Generate the first polished page using extracted tokens, product context, `@design` components, and on-demand components.
10. Run `npx design-anchor sync`; run `npx design-anchor audit` when UI changed.

### First Product Page

Use this when the user asks for any product interface: admin system, dashboard, SaaS app, AI assistant, chat tool, CRM, internal tool, developer tool, creative tool, monitoring console, or any functional product screen.

**Follow the Page Rendering Pipeline (three phases in order):**

1. **Phase 1 — Layout Blueprint:** Infer roles, objects, workflows, page purpose, and density. Select the appropriate layout block. Read `references/layout-governance.md` and apply layout quality principles. Define the spatial structure.
2. **Phase 2 — Component Composition:** Fill layout slots with Design Anchor components. Identify 2-3 key touchpoints (CTA, hero, feature highlight) and enhance with effect libraries (MagicUI, Reactbits) where appropriate.
3. **Phase 3 — Visual Styling:** Ensure a comprehensive style prompt is active (user-provided or internally matched). Apply the full visual personality: color palette, typography, shadow/depth, signature elements, decorative touches.

The first page must feel impressive — not through decorative excess, but through visual personality, confident composition, effect-enhanced key moments, meaningful data, and polished states.

Read `references/b2b-product-context.md` before creating product screens.

### Design System Inspection

Use Portal only when the user asks to view, tune, inspect, audit, or document the design system state. Read `references/portal-routing.md` when routing is ambiguous.

## Page Rendering Pipeline

Every page — whether new or restructured — follows three phases in strict order. Do not skip phases or mix their concerns.

### Phase 1: Layout Blueprint (布局蓝图)

Determine the page's spatial structure before touching any component or color. This phase answers: what goes where.

1. **Identify page purpose.** Read `references/b2b-product-context.md` to classify: consumption, collection management, single record focus, creation/editing, configuration, conversation, canvas, or workflow orchestration.
2. **Select a layout block.** A layout block is a compositional pattern — the high-level spatial arrangement of sections on the page. Common blocks:

   | Block | Structure | When to Use |
   |---|---|---|
   | **Dashboard** | stats header → chart/visualization area → data table | Monitoring, analytics, overview pages |
   | **List** | search/filter bar → data table/grid → pagination | Collection browsing, queues, inboxes |
   | **Detail** | entity header (title + status + actions) → content sections → related items (sidebar or bottom) | Single record, profile, order, ticket view |
   | **Form** | section groups → field clusters → sticky submit bar | Creation, editing, settings with many fields |
   | **Settings** | sidebar category nav → content panel | Configuration, preferences, account |
   | **Chat** | conversation area (scrollable) → input bar (bottom-fixed) → optional side panel | Messaging, AI assistant, support |
   | **Canvas** | toolbar (top/side) → workspace (center, maximized) → properties panel (collapsible right) | Editor, builder, whiteboard, design tool |
   | **Split** | master list (left) → detail panel (right) | Email, file manager, two-pane navigation |

   Blocks are starting points, not mandatory templates. Modify freely based on the page's actual needs, then verify against layout quality principles.

3. **Define section ordering** by user workflow priority — not by data model structure.
4. **Set density** to match the task: dense for monitoring, balanced for CRUD, focused for content, minimal for creative work.

Output of Phase 1: a spatial wireframe — section names, positions, and relative sizes. No components, no colors.

### Phase 2: Component Composition (组件填充)

Fill each layout slot with the right component. This phase answers: what renders in each section.

**Structural components — use Design Anchor:**
- Sidebar, data table, form fields, dialog, tabs, command palette, app shell → `npx design-anchor add <component>`.
- These provide interaction quality: accessibility, keyboard navigation, state completeness, ARIA roles.

**Key touchpoint effects — allow effect libraries:**
- CTA buttons, hero sections, feature highlights, onboarding cards, premium interactive moments → may use effect libraries for visual enhancement:
  - **MagicUI** (`@/components/magicui/`): animated borders, shimmer buttons, spotlight effects, animated gradients, text reveal.
  - **Reactbits** or similar: animated hover effects, interactive cards, motion text, transition effects.
- Effect libraries are **supplements on top of** Design Anchor components, not replacements. The CTA is still a Design Anchor button — MagicUI adds the shimmer.
- **Limit: 2-3 key touchpoints per page.** Effects on every element dilute their impact and create visual noise.
- Install effect components to `src/components/magicui/` or `src/components/effects/`, not scattered across the codebase.

**What gets effects vs what stays clean:**

| Gets effects (2-3 per page) | Stays clean |
|---|---|
| Primary CTA button | Navigation / sidebar |
| Hero section / page header | Data tables |
| Feature highlight card | Forms / inputs |
| Onboarding / empty state | Settings panels |
| Key status indicator | Standard list items |

Output of Phase 2: all layout slots filled with components. Key touchpoints identified and enhanced. Functional but not yet styled.

### Phase 3: Visual Styling (风格绘制)

Apply the matched style prompt as the aesthetic layer across the entire page. This phase answers: how everything looks and feels as a whole.

1. **Ensure a style prompt is active.** Either the user's own prompt, an internally matched prompt from the pool, or the project's existing design prompt source.
2. **Apply color palette** — primary actions, surface tints, accent backgrounds, section colors, status colors. Use the prompt's specific hex values, not generic defaults.
3. **Apply typography** — font pairing, heading weights, body sizes, letter spacing, line height per the prompt's spec.
4. **Apply surface and depth** — shadow approach, border treatment, border radius, surface layering per the prompt's philosophy.
5. **Apply signature elements** — 2-3 distinctive visual choices from the prompt that give the page its recognizable personality.
6. **Apply decorative touches** — subtle section background tints, accent borders, card treatments, gradient accents where the prompt specifies.
7. **Verify visual quality** — the page looks professionally designed for this specific product. Run the Visual Quality Checklist from `style-prompt-guidance.md`.

Output of Phase 3: a complete, visually polished page that looks like it was designed by a professional for this specific product.

**The three phases are sequential and non-negotiable.** Phase 1 without Phase 3 produces a wireframe. Phase 3 without Phase 1 produces a pretty mess. Phase 2 without Phase 3 produces a generic component library demo.

## UI Coding Rules

Before writing UI, inspect `@design`, `src/components/anchor-ui`, project tokens, component specs, and the current page layout when available.

### Component Rules

- Prefer imports from `@design`; otherwise use `@/components/anchor-ui`.
- Do not import component implementations from `.anchor/` or `node_modules/design-anchor/`.
- Add only needed components with `npx design-anchor add <component>`.
- Use Design Anchor components for structural/interactive primitives: buttons, inputs, dialogs, tabs, selects, tables, cards, and menus.
- Effect libraries (MagicUI, Reactbits, etc.) are allowed only for key touchpoint enhancement — CTA, hero, feature highlights. Install to `src/components/magicui/` or `src/components/effects/`. Never use effects as structural component replacements.
- Use semantic token classes for structural anchors (primary, CTA, status, base text). Preserve intentional decorative colors.
- Keep component implementation changes in `src/components/anchor-ui/`.
- Components provide interaction quality (accessibility, keyboard nav, states). Visual personality comes from the style prompt and effect enhancements — do not expect bare components alone to make pages beautiful.
- Keep token edits in `src/design-tokens/tokens.json`, then sync generated CSS/rules.

### Component Replacement Rules (Enforced)

When encountering substandard components during editing or governance, **do not report — replace immediately.** Read `references/layout-governance.md` Component Quality Standards section for the full replacement specification.

Substandard means: raw HTML where a governed component exists, visually broken or inconsistent implementations, components that violate accessibility or interaction conventions, or custom implementations that duplicate what Design Anchor already provides.

**All component replacements must go through Design Anchor.** Do not introduce external component libraries directly — Design Anchor is the single entry point for governed components.

Replacement flow (two phases — structure first, then beauty):

**Phase 1: Complete structural replacement**
1. Check if the component already exists in `@design` or `src/components/anchor-ui/`.
2. If not, run `npx design-anchor add <component>` to install from Design Anchor's component registry.
3. If Design Anchor does not have the component yet, write a new one in `src/components/anchor-ui/` that conforms to Design Anchor conventions (composable API, semantic token styling, accessibility). Then run `npx design-anchor sync` to register it and generate its spec.
4. **Never** install Radix, cmdk, @tanstack/react-table, or other UI primitives as direct project dependencies just because a component needs them. Design Anchor bundles its own primitives — the `add` command handles the dependency chain.

**What to inherit from the original component — ONLY:**
- Content: data, text, labels, values, items.
- Business logic: event handlers, API calls, state management, data transformations, routing.

**What NOT to inherit:**
- Layout position or placement — the new component's position is determined by Phase 1 (Layout Blueprint), not by where the old component sat.
- CSS / styling / hardcoded colors — the new component uses Design Anchor conventions and gets styled in Phase 3.
- DOM structure / wrapper divs — the new component has its own composable structure.
- Inline styles, arbitrary Tailwind classes, or ad-hoc responsive hacks from the original.

The old component is a data source, not a template. Extract its content and logic, discard everything else.

**Phase 2: Apply visual styling from the style prompt**
5. After replacing to standard implementation, apply the project's style prompt visual layer on top: color palette, shadow/depth treatment, border radius, typography weight, spacing rhythm, and decorative elements (accent borders, background tints, subtle gradients, icon styling) that match the product's design personality.
6. A replaced component must look **better** than the original, not just structurally correct. If the standard component looks plain or generic, add visual richness from the style prompt until it matches the product's aesthetic quality.

**The replaced component should feel like it was designed for this specific product — not like a default library component dropped in.**

Key components that must meet Design Anchor quality standards — replace on sight if they do not:

- **Sidebar / Navigation**: `npx design-anchor add sidebar`. Must be collapsible, grouped sections, active state, consistent icons, responsive drawer on mobile.
- **Data Table**: `npx design-anchor add table`. Must have sortable headers, row selection, status badges, row action dropdown (not inline icons), pagination, empty/loading states.
- **Form fields**: `npx design-anchor add input select textarea checkbox switch`. Must have visible labels, inline validation, section grouping, sticky submit bar.
- **Dialog / Modal**: `npx design-anchor add dialog alert-dialog`. Must have focus trap, escape-to-close, overlay, accessible title.
- **Command Palette**: `npx design-anchor add command`. Must have Cmd/Ctrl+K, keyboard nav, fuzzy filtering, grouped results.
- **Tabs**: `npx design-anchor add tabs`. Must have keyboard arrow navigation, active indicator, ARIA roles.
- **App Shell**: `npx design-anchor add sidebar` + project layout in `src/components/anchor-ui/app-shell.tsx`. Must provide consistent header + sidebar + content structure with responsive collapse.

After every component replacement, verify with `npx design-anchor audit` and check the component spec at `.anchor/src/anchor/schema/components/`.

When replacing:

`Design Anchor 组件治理：[component] 不符合规范，已替换为标准实现并应用产品风格。`

### Layout Rules

Read `references/layout-governance.md` when building or modifying any page. Design the best layout for each page's purpose — do not force-fit templates.

- Identify the page's primary user task before choosing a layout. The layout serves the task.
- Primary content gets primary space. A data table that is the page's purpose should not be squeezed by a wide sidebar or tall header. A chat interface should not waste space on persistent sidebars.
- High-frequency actions go where the user can reach them without scrolling.
- Status is always visible — the user should never need to click to discover current state.
- Related information stays together in the same visual group.
- Match density to task: monitoring is dense, content consumption is focused, creative workspaces minimize chrome.
- Use progressive disclosure: show the summary, let the user drill down.
- Consistent shell across pages: sidebar, header, and content area should not shift between pages unless there is a deliberate mode change.
- Use reference examples in `layout-governance.md` as inspiration, not as mandatory patterns.

### Icon Rules

- One icon library per project. Recommend `lucide-react` for new projects.
- Consistent size: pick a base size (16, 20, or 24px) and use it everywhere except explicit variants.
- Do not mix outline and filled icon styles in the same context.
- Icon + label for primary actions; icon-only for secondary/repeated actions with tooltips.
- Remove decorative icons that add no recognition value.

### Information Architecture Rules

- Section ordering follows user workflow priority, not data model structure.
- Page header contains identity (title, status) and primary actions — nothing else.
- Filters and search are always visible on list pages, never hidden behind toggles.
- Danger zones and destructive actions go at the bottom, visually separated.
- Empty states, loading states, and error states are designed, not afterthoughts.

If you encounter unsafe UI while editing, fix it in the current task. If you encounter a layout that violates the quality principles, restructure it. Use the message templates defined in the Output Format section for all governance actions and self-checks.

## Command Router

Use the npm runtime for continuing work:

- Install missing runtime: `npm install -D design-anchor`
- Background activation and rule generation: `npx design-anchor sync`
- Rebuild local `.anchor/`: `npx design-anchor hydrate`
- Add a needed source component: `npx design-anchor add <component>`
- Extract tokens from a style prompt: `npx design-anchor theme <prompt-file.md>`
- List internal style prompt metadata: `node scripts/list-style-prompts.mjs`
- Open Portal intentionally: `npx design-anchor portal tokens`, `components`, `specs`, `theme`, or `docs`
- Audit project compliance: `npx design-anchor audit`
- Upgrade local kit from the npm package: `npx design-anchor upgrade`
- MCP server command for tools: `npx --no-install design-anchor mcp ./.anchor`

## Output Format

All UI-related responses must use these standardized message templates.

### Probe / Pre-check

```
Design Anchor 预检：我会先判断项目成熟度和需求完整度；新页面会先匹配/抽取风格 token，已有完整产品会先征求你确认是否进入治理模式。
```

### Auto-governance (token / component fix during editing)

```
Design Anchor 自动治理：已改为组件或语义 token。
```

### Layout governance (layout restructured)

```
Design Anchor 布局治理：已根据页面用途重构布局。
```

### Component replacement

```
Design Anchor 组件治理：[原组件描述] → [新组件] + [视觉美化]。原因：[具体不达标项]。
```

Example: `Design Anchor 组件治理：自定义 div sidebar（无折叠、无分组、icon 混用）→ 标准 Sidebar 组件（可折叠、分组导航、统一 icon）+ 应用产品风格（深色侧边栏、品牌色 active 指示器）。`

### Self-check (required on every UI change)

Every response that changes UI must end with a `Design Anchor 自检` line covering:

- Visual quality (page looks polished and appealing, not stripped or plain)
- Layout quality (purpose-layout fit, information hierarchy)
- Component reuse (governed components used, replacements made)
- Icon consistency (single library, uniform size)
- Token compliance (structural anchors consistent: primary, CTA, status, interactive states)
- Auto-fixes applied
- Unresolved items requiring user confirmation
- Sync / audit status

```
Design Anchor 自检：视觉 ✓ | 布局 ✓ | 组件 ✓ | icon ✓ | token ✓ | 自动修复 0 | 待确认 0 | sync ✓ audit ✓
```

## References

Read only what the task needs:

- `references/project-contract.md` before installs, file-boundary decisions, source-vs-consumer detection, or component/token writes.
- `references/govern-existing-product.md` before offering or executing governance for a mature existing product.
- `references/layout-governance.md` before analyzing, auditing, or restructuring any page layout. Contains layout quality principles, reference examples for common page types (including AI product interfaces), icon governance rules, and information architecture principles.
- `references/b2b-product-context.md` before creating product screens. Covers all product types including AI tools, creative tools, and developer tools.
- `references/style-source-selection.md` before matching incomplete input to an internal style prompt.
- `references/b2b-design-prompt-pool.md` when selecting an internal prompt.
- `references/style-prompt-guidance.md` before turning a user style prompt into tokens.
- `references/portal-routing.md` before opening Portal or answering Portal intent questions.

## Claude Compatibility

This skill uses the Agent Skills `SKILL.md` layout supported by Claude. For Claude Code project use, place or symlink this folder at:

```text
.claude/skills/design-anchor/SKILL.md
```

For personal Claude Code use, copy the folder to:

```text
~/.claude/skills/design-anchor/SKILL.md
```

For Claude.ai upload, zip the `design-anchor/` folder so the archive contains `design-anchor/SKILL.md` at the top level, not `SKILL.md` directly at the zip root.
