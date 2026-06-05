# Page Rendering Pipeline

Read this before creating, restructuring, or materially beautifying any page.

Every page follows three phases in order:

1. Layout Blueprint: what goes where.
2. Component Composition: what renders in each area.
3. Visual Styling: how it looks and feels.

Do not mix phases. Phase 3 without Phase 1 produces a pretty mess. Phase 2 without Phase 3 produces a component demo. Phase 1 without Phase 3 produces a wireframe.

## Phase 1: Layout Blueprint

Determine spatial structure before touching color or component polish.

### Classify Page Nature

| Nature | Description | Layout follows | Style prompt scope |
|---|---|---|---|
| Functional | User is doing work: data, chat, settings, monitoring, editing, reviewing, building | Task workflow | Visual skin only: colors, typography, shadows, radius, spacing |
| Showcase | User is being informed or persuaded: landing, pricing, product tour, onboarding intro | Storytelling flow | Full creative freedom including hero, CTA, feature sections |

Most product pages are Functional. Dashboards, agent workspaces, settings, chat, and data tables are tools, not brochures.

Critical rule: a Functional page must not be styled as a Showcase page. No hero sections on dashboards, no feature cards on settings pages, no CTA strips on chat interfaces, no marketing copy on monitoring consoles.

### Identify Page Purpose

Read `references/product-context.md` to classify page purpose: consumption, collection management, single record focus, creation/editing, configuration, conversation, canvas, or workflow orchestration.

### Select A Layout Block

| Block | Structure | When to use |
|---|---|---|
| Dashboard | stats header -> chart/visualization area -> data table | Monitoring, analytics, overview |
| List | search/filter bar -> table/grid -> pagination | Collections, queues, inboxes |
| Detail | entity header -> content sections -> related items | Single record, profile, order, ticket |
| Form | section groups -> field clusters -> sticky submit bar | Creation, editing, settings |
| Settings | sidebar category nav -> content panel | Preferences and configuration |
| Chat | conversation area -> input bar -> optional side panel | Messaging, AI assistant, support |
| Canvas | toolbar -> workspace -> properties panel | Editor, builder, whiteboard, design tool |
| Split | master list -> detail panel | Email, files, two-pane navigation |

### Block Install Decision

External blocks are structural references first, installs second. Install or import a block only when all are true:

- The task is real product implementation, not read-only audit, explanation, plan, or throwaway sketch.
- The project already uses compatible tooling, or the user accepts adding it.
- The block saves meaningful layout/responsive work.
- No existing page/layout/component can be adapted with less churn.
- It will be heavily customized to the style prompt and product workflow.
- It does not introduce a broad dependency stack for a narrow need.

Do not install a block when:

- The task is analysis-only, documentation, review, token extraction, or Portal inspection.
- The user asked to avoid new dependencies/files or keep the change minimal.
- Existing app shell or component system already provides the needed structure.
- The block introduces a mismatched design language or framework.
- The block package pulls in multiple dependencies for a pattern that can be reproduced with existing CSS/components.

If useful but not appropriate to install, use the block as reference-only and reproduce the relevant layout idea in existing project files.

### Known Block Sources

Use these as pattern libraries. Install only when the decision above says yes.

| Scenario | Source | Install pattern |
|---|---|---|
| Sidebar, dashboards, auth, charts, calendar | shadcn blocks | `npx shadcn@latest add <block-name>` |
| Kanban, gantt, timeline, file tree, carousel | Kibo UI | `npx kibo-ui add <block-name>` |
| Landing/showcase sections | Launch UI | `npx shadcn@latest add @launchui/<block>` |
| E-commerce blocks | Commerce UI | `npx shadcn@latest add https://ui.stackzero.co/r/<block-name>.json` |
| Complete admin starter | shadcn-admin | Reference-only unless user explicitly wants a full starter |

Examples:

- shadcn sidebar blocks: `sidebar-01` through `sidebar-15`.
- shadcn dashboard blocks: `dashboard-01` through `dashboard-07`.
- shadcn auth blocks: `login-01` through `login-05`.
- Kibo: `gantt`, `kanban`, `timeline`, `file-tree`, `carousel`, `sortable`, `dnd`, `data-table`, `charts`, `calendar`.
- Launch UI: `hero`, `navbar`, `footer`, `stats`, `faq`, `cta`, `logos`, `card`, `screenshot`, `mockup`, `glow`.

After installing, customize extensively. The block is a structural starting point, not the final design.

### Layout Output

Phase 1 output is a spatial wireframe:

- section names,
- positions,
- relative sizes,
- page density,
- and whether the structure comes from an existing project pattern, installed block, or reference-only block.

No colors yet.

## Phase 2: Component Composition

Fill each layout slot with the right component.

Principles:

- Presentational components are freely designed: cards, sections, headers, stat blocks, navigation appearance, data displays, layouts.
- Functional components use Design Anchor selectively when behavior and accessibility matter.
- Evaluate existing components against the layout purpose before adding anything.
- Add missing empty/loading/error/success states as designed states, not afterthoughts.

Functional primitives that may come from Design Anchor:

- `dialog`, `alert-dialog`: focus trap, escape-to-close, overlay.
- `command`: Cmd/Ctrl+K, keyboard navigation, filtering.
- `select`: keyboard navigation and ARIA listbox.
- `popover`, `dropdown-menu`: positioning and viewport overflow.
- `sheet`: slide-over panel and focus management.
- `tooltip`: accessible description.
- `tabs`: keyboard arrow navigation and ARIA tablist.

Install the primitive only when the current real UI task needs it, the project lacks an accessible equivalent, and the user did not constrain new files/deps.

Effect libraries are optional and rare. Prefer existing CSS/Tailwind/motion utilities. Effects on Functional pages must serve the task, such as progress, status, feedback, or hover clarity.

All structural colors must reference token CSS variables or semantic token classes. Decorative colors, gradients, shadows, and page-specific accents remain free.

Phase 2 output: layout slots filled with components, plus the install decision for any missing functional primitive.

## Phase 3: Visual Styling

Apply the active style prompt as the aesthetic layer across the page.

The style prompt is a visual skin, not a content template. It controls colors, typography, shadows, radius, spacing, animation timing, surface treatment, and signature elements. It does not decide what is on a Functional page.

Read `references/visual-craft.md` for final polishing and beauty recovery.

Apply:

1. Color palette: primary actions, surface tints, accent backgrounds, section colors, status colors.
2. Typography: font pairing, heading weights, body sizes, line height.
3. Surface and depth: shadow approach, border treatment, radius, layering.
4. Signature elements: 2-3 distinctive choices that make the product recognizable.
5. Decorative touches: subtle background tints, accent borders, gradients, textures, or motion when prompt-aligned.

Visual enhancement pass:

- Pick 3-5 enhancements per page, not all of them.
- Functional pages get subtle professional polish.
- Dense pages get lighter surface treatment than spacious pages.
- Enhancements must match the style prompt.
- Dark-mode-enabled projects need dark-compatible versions.

Useful no-new-dependency enhancements:

- Subtle page or section gradients aligned with the prompt palette.
- Section-to-section temperature shifts.
- Dot grid, noise, or subtle pattern when style supports it.
- Inset work surface or paper-like content area.
- Floating sidebar with radius, margin, and elevation.
- Featured cards with accent background, border highlight, or subtle glow.
- Unequal bento-style dashboard grids where hierarchy supports it.
- Hairline dividers with gradient fade.
- Multi-layer shadows and clear elevation levels.
- Hover lift, smooth transitions, skeleton shimmer, and button press feedback.

Phase 3 output: a complete page that looks designed for this specific product, not merely token-compliant.

## Screenshot / Reference Image Rules

When the user provides a screenshot, mockup, or reference image:

1. Extract only content and business logic: data structure, text, labels, field types, workflow steps, navigation items.
2. Redesign the layout. Do not replicate spatial arrangement, section ordering, or component placement.
3. Freely design components from the style prompt. Do not copy component styles, card shapes, buttons, or visual patterns.
4. Apply token-constrained structural colors.
5. Tell the user:

```text
参考图中提取了内容和业务逻辑，布局和视觉已完全重新设计。
```

The reference image is a content source, not a design template.
