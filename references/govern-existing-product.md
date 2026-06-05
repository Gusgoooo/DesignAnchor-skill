# Govern Existing Product

Read this when Design Anchor detects a mature existing product. This file is self-contained — it includes all layout principles, component strategy, and audit criteria needed for execution. You do not need to load `layout-governance.md` separately when using this file, though it remains available as extended reference.

## Design Philosophy

**Beauty is the ultimate goal. Governance makes beauty sustainable.**

Most existing products accumulate layout debt and visual inconsistency over time. Pages built by different developers at different times end up with inconsistent structures, drifting primary colors, mixed icon libraries, and information architectures that no longer match user workflows.

Governance fixes this — but governance that strips visual richness is worse than no governance. A product with perfect token compliance but no visual personality is a governance failure. The governed product must look MORE polished and appealing than before, never less.

**What governance does:** locks the structural anchors (primary color, CTA, status colors, interactive states) via the token system so they stay consistent across pages. Restructures layout to better serve user tasks. Freely redesigns all presentational components based on the style prompt.

**What governance does NOT do:** force all components into a single library. Replace every color with a token reference. Strip decorative accents, gradients, shadows, and page-specific visual treatments.

**Component freedom:** Only functional interaction primitives (dialog, command, select, popover, sheet, tooltip) come from Design Anchor — because they require focus trap, keyboard nav, ARIA roles, and other behavior that is hard to get right. All presentational components (cards, sections, navigation appearance, data displays, hero sections, stat blocks) are freely designed by AI based on the style prompt. The token system constrains structural colors; everything else is creative freedom.

The style prompt defines the visual soul of the product. The token system protects the color consistency of that soul across 100 pages.

## User-Facing Introduction

When the probe detects a mature product, present the situation with confidence, not caution:

`我检测到这是一个已有产品。我会先分析每个页面的布局、信息架构、组件使用和 icon 一致性，然后给出重构建议。默认推荐整页重构——用更合理的布局重新呈现你的业务数据和功能，同时保留所有业务逻辑和数据绑定。`

Then offer exactly:

- `布局重构`（推荐）：逐页提取内容和业务逻辑，完全重新设计布局和视觉呈现。功能型组件（dialog 等）走 Design Anchor，展示型组件 AI 自由发挥。Token 系统约束结构色。
- `渐进优化`：只修 token 合规（结构色对齐），保留现有布局和组件。
- `只读审计`：仅扫描报告，不改文件。

Default recommendation is layout restructuring. Say so explicitly.

Do not proceed with file changes until the user says a clear confirmation such as `确认，开始重构`, `开始布局重构`, `restructure`, or `我同意，开始`.

## Layout Quality Principles (Inline Reference)

Use these principles to evaluate every page. They replace template matching — AI designs the best layout for each page's purpose, then verifies against these criteria.

**Purpose–Layout Fit.** Every page exists because a user needs to accomplish something. The layout should be shaped by that purpose. A monitoring page needs density; a settings page needs calm; a chat interface needs conversation dominance. Ask: if I described this page's purpose to a designer, would they expect this layout?

**Information Hierarchy.** The most important content must be the most visually prominent. Primary content gets primary space. Status is always visible. Numbers have context (trend, comparison, threshold). Related content stays together. Ask: if the user glances for 2 seconds, do they see the most important thing?

**Action Hierarchy.** Primary actions are prominent and reachable without scrolling. Secondary actions are visually subordinate. Destructive actions are separated and gated. Repeated-use actions are the most accessible. Ask: can the user perform their most frequent action within one click?

**Density–Task Fit.** Monitoring: dense. Data entry: balanced. Content consumption: focused. Settings: calm. Creative workspaces: minimal chrome. Ask: does the density serve the task or the aesthetic?

**Spatial Efficiency.** Headers, banners, and announcements must earn their vertical position. Sidebars are supplementary — if the sidebar has more content than the main area, proportions are wrong. Whitespace is intentional — it groups and separates. Ask: if I removed this element, would the user notice?

**Navigation Clarity.** The user always knows where they are. Active states are visible. Depth matches product complexity. Consistent shell across pages. Ask: if the user was teleported here, would they know their location in the product?

**State Completeness.** Every page has empty, loading, error, and partial states. All must be designed, not blank or broken.

## Component Strategy

Components split into two categories:

### Functional Components — Use Design Anchor

These are interaction primitives where accessibility, focus management, and keyboard behavior are critical. Use `npx design-anchor add <component>` to install.

- **Dialog / Modal**: `dialog`, `alert-dialog` — focus trap, escape-to-close, overlay, accessible title.
- **Command Palette**: `command` — Cmd/Ctrl+K, keyboard nav, fuzzy filtering.
- **Select / Dropdown**: `select`, `dropdown-menu` — keyboard navigation, ARIA listbox, viewport overflow.
- **Popover / Sheet / Tooltip**: `popover`, `sheet`, `tooltip` — positioning, focus management.
- **Tabs**: `tabs` — keyboard arrow navigation, ARIA tablist.

Import from `@design` or `@/components/anchor-ui/`. Do not import from `.anchor/` or `node_modules/design-anchor/`.

### Presentational Components — AI Freely Designs

All visual/display components are freely designed based on the style prompt. No mandatory library, no forced component structure:

- Sidebar / navigation appearance
- Data tables and data grids
- Cards, sections, stat blocks
- Hero sections, feature cards
- Forms (layout and visual treatment; use Design Anchor for select/dialog within forms)
- App shell layout
- Dashboard components
- Any component whose value is primarily visual

**Design from the style prompt.** Each presentational component should feel like it was specifically designed for this product — using the style prompt's color palette, typography, shadow approach, and signature elements. Not a library default.

**Token constraint applies to all.** Whether functional or presentational, structural colors must reference token CSS variables: `var(--primary)`, `var(--background)`, `var(--foreground)`, `var(--destructive)`, etc. Decorative colors, gradients, shadows, accents are free.

### Inheritance Rule (for component replacement)

When replacing an existing component (functional or presentational):

**Inherit only content and business logic**: data, text, labels, event handlers, API calls, state management. **Discard everything else**: layout position, CSS, hardcoded colors, DOM structure, inline styles. The old component is a data source, not a template.

## AI Pattern Awareness (Inline from SKILL.md)

When auditing, watch for common AI-generated patterns that make output feel generic. These are not absolute bans — any can be used intentionally. The problem is when they appear by default:

- Four identical stat cards as page opener
- 3-4 same-structure cards in a row
- Gradient text on headings as default decoration
- `backdrop-blur` glassmorphism everywhere without purpose
- Colored left borders on every card as generic decoration
- "Welcome back" hero on frequently-visited workbench pages
- 5+ different hues for status badges on one page
- `rounded-2xl`/`rounded-3xl` on data-dense components
- Decorative icons on every label
- Full-width everything regardless of content

Flag these in the audit. If they serve the page's purpose, note that and keep them. If they're default AI filler, recommend removal during restructuring.

## Audit Scope

### Layout Audit

For each page or major route:

- Identify the page's primary user task.
- Read the actual page source and identify the current layout structure.
- Evaluate against the layout quality principles above.
- Report: what sections exist, what is missing, what is misplaced, what is unnecessary.
- Check for AI pattern awareness items (see list above — flag if they appear as default filler, keep if intentional).
- Assess information hierarchy: is the most important content most visible? Are related items grouped?
- Assess action hierarchy: is the primary action obvious? Are destructive actions protected?
- Assess density fit: does the density match the workflow?

### Component Audit

- **Functional components**: Check dialog, command, select, popover, sheet, tooltip, tabs. If they lack accessibility (focus trap, keyboard nav, ARIA), note for Design Anchor replacement.
- **Presentational components**: Assess visual quality and consistency. Note which ones would benefit from redesign based on the style prompt. No mandatory library replacement — AI will freely redesign them.
- Identify raw `<div>` modals, custom dropdowns, or manual select implementations that should use Design Anchor functional primitives.

### Icon Audit

- List all icon libraries installed in the project.
- Flag mixed icon library usage.
- Flag inconsistent icon sizes or mixed outline/filled styles.
- Flag decorative icons that add no recognition value.
- Recommend consolidation to a single library (default: `lucide-react`).

### Token and Color Consistency Audit

Color governance targets **structural anchors only** — the critical colors that must be consistent across the product. Decorative colors, page-specific accents, gradients, shadows, and intentional one-off styling are preserved as-is. The goal is consistency where it matters, not stripping all color into tokens.

**Important:** Before replacing any color, first extract and preserve the product's existing visual identity. If the product uses rich colors, gradients, or distinctive accent tones, those are intentional design choices. Governance should make the product MORE visually polished, never less.

**Primary color alignment (critical):**
- Verify that ALL primary interactive elements (buttons, links, active nav items, selected states, toggles, checkboxes, progress bars, focus rings) use the same `primary` token.
- Flag pages where primary buttons use different colors from each other or from the rest of the product.
- This is the single highest-value fix — inconsistent primary color across pages is the most visible governance failure.

**CTA consistency (critical):**
- All call-to-action elements must align with primary or a designated accent token.
- Flag CTAs that drift to random colors across pages.

**Interactive state consistency (critical):**
- Verify that hover, focus, active, and disabled states are derived from the base token, not independently hardcoded.
- Flag patterns like `bg-indigo-500 hover:bg-blue-600` (base and hover are unrelated colors).
- All interactive components must use the same state derivation pattern across the product.

**Status color discipline (critical):**
- Verify that success/warning/error/info each use consistent colors across the product.
- Flag mixed shades within a category (e.g., `text-red-500` + `bg-rose-100` + `border-red-300` for the same error concept).

**Base text consistency (moderate):**
- Primary and secondary text colors should be consistent across pages.
- Flag cases where the same type of text (body, description, timestamp) uses different gray values on different pages.

**What NOT to touch:**
- Decorative background colors, accent tones, gradients, and shadows that are part of intentional visual design.
- Illustration and data visualization colors.
- Page-specific background tints or card accents.
- Any color that is clearly an intentional design choice rather than an accidental inconsistency.
- When in doubt, preserve the existing color.

**WCAG check:**
- WCAG AA contrast violations on text colors.
- Dark mode parity for structural anchor tokens only.

### Navigation Audit

- Does the product have a consistent shell (sidebar + header + content area)?
- Are active navigation states correct?
- Do breadcrumbs or page titles provide location context?
- Does the navigation depth match the product complexity?

## Layout Restructuring Execution

When the user confirms layout restructuring:

### Style Prompt Matching (Before Per-Page Work)

Before starting any page work, ensure a style prompt is active. This prompt drives the page-level beautification phase:

1. Check if the project already has a design prompt source (`.anchor/design-prompt-source.md` or `design-prompt.md`). If yes, reuse it.
2. If not, select an appropriate prompt from the built-in pool based on the product's type, industry, tone, and density. Use `scripts/list-style-prompts.mjs` or scan `references/design-prompts/*.md` and match against frontmatter metadata.
3. If the user provided style direction, use that instead of the pool.
4. Do not reveal the internal prompt name. Tell the user: `我为你的产品匹配了一个风格方向，会在治理过程中用它来提升页面视觉品质。`
5. Save the selected prompt into `.anchor/design-prompt-source.md`.
6. Read `references/style-prompt-guidance.md` before applying.

### Per-Page Flow (follows the Page Rendering Pipeline)

**Phase 1 — Layout Blueprint:**

1. **Read the page source completely.** Understand every component, every data binding, every event handler.
2. **Identify the page's primary user task** and evaluate the current layout against the quality principles.
3. **Select the best layout block** for this page's purpose (Dashboard, List, Detail, Form, Settings, Chat, Canvas, Split — see SKILL.md Page Rendering Pipeline). Do not force-fit — modify the block based on actual needs, then verify against quality principles.

**Phase 2 — Component Composition:**

4. **Functional components**: Replace raw HTML modals, custom dropdowns, manual selects with Design Anchor functional primitives (`dialog`, `command`, `select`, `popover`, `tabs`). These provide focus trap, keyboard nav, and ARIA roles.
5. **Presentational components**: Freely redesign all visual/display components based on the style prompt. When an open-source block matches the page type (shadcn blocks for dashboard/auth/settings, shadcn-admin for admin CRUD, Kibo UI for extended patterns, Launch UI for landing sections — see SKILL.md Phase 2 for full priority list), prefer it as the structural starting point, then customize extensively with the style prompt. Extract content and business logic from originals, design fresh components that match the product's visual personality.
6. **Effect enhancement**: Use MagicUI, Reactbits, or similar for key touchpoints — CTA buttons, hero sections, feature highlights. Install to `src/components/magicui/` or `src/components/effects/`.

**Present the restructuring plan** before writing code:
   - Current layout → proposed layout block.
   - Functional components to install from Design Anchor (dialog, command, etc.).
   - Presentational components to freely redesign (with style prompt direction).
   - Key touchpoints for effect enhancement.
   - AI patterns to address (if any).
   - What stays: business logic, data bindings, API calls, state management.
   - What changes: layout structure, visual design, section ordering, icon library.

7. **Wait for per-page confirmation.** The user confirms each page before restructuring begins.
8. **Execute Phase 1 + Phase 2.** Rebuild the layout. Install functional primitives from Design Anchor. Freely design all presentational components. Add effect enhancements. Unify icons. Reorder sections by information priority.

**Phase 3 — Visual Styling:**

9. **Apply the matched style prompt's visual layer** to the entire page:
   - Color palette: primary actions, surface tints, accent backgrounds, status colors — using the prompt's specific hex values.
   - Typography: font pairing, heading weights, letter spacing per the prompt's spec.
   - Shadow/depth/border: per the prompt's surface approach.
   - Signature elements: 2-3 distinctive visual choices from the prompt.
   - Decorative touches: section background tints, accent borders, card styling, button treatments.
   - Every component — whether from Design Anchor or freely designed — must reflect the product's visual personality.
10. **Verify**: the page now looks professionally designed for this specific product, not like a generic template.

**Post-change:**

11. **Run checks:**
    - `npx design-anchor sync`
    - `npx design-anchor audit`
12. **Verify against Production Quality Bar** (from SKILL.md Design Guidance). Pay special attention to item #1 (visual polish).
13. **Report what changed** with a Design Anchor self-check line.

### Restructuring Rules

- **Redesign the entire page, not patches.** Patching a broken layout produces a patched broken layout. Extract content and business logic, then design from scratch.
- **Functional components from Design Anchor.** Dialog, command, select, popover, tabs — use `npx design-anchor add`. These provide accessibility behavior that is hard to get right.
- **Presentational components freely designed.** Sidebar appearance, data tables, cards, headers, navigation, stat blocks — AI designs whatever looks best based on the style prompt. No library constraint.
- **Token constraint on structural colors.** All primary buttons, links, active states, focus rings, status colors → reference token CSS variables. Decorative colors are free.
- **Inherit only content and business logic.** From old components, extract data/text/handlers/API calls. Discard position, CSS, DOM structure, inline styles.
- **Unify icons in the same pass.** Consolidate to a single library.
- **Preserve all data bindings and business logic.** API calls, state management, data transformations, event handlers, and routing logic stay untouched.
- **Match density to workflow.** Monitoring consoles are dense. Settings pages breathe.
- **One page per confirmation.** Restructure one page, let the user see the result, then continue.

## Progressive Optimization Execution

When the user chooses progressive optimization instead of layout restructuring:

This path fixes structural color consistency without changing layout, components, or information architecture.

- Align structural anchor colors only: primary interactive elements to the same `primary` token, CTA consistency, status color consistency, interactive state derivation. Do NOT replace decorative or page-specific colors with tokens.
- Replace raw HTML dialogs/selects/dropdowns with Design Anchor functional primitives if they lack accessibility.
- Consolidate mixed icon libraries to a single library.
- Add missing Design Anchor directories and rules through `sync`.
- Add `.anchor/` to `.gitignore` if missing.
- Do not change page layout, section ordering, visual components, or information architecture.

## Read-Only Audit Scope

When the user chooses read-only audit:

Scan and report everything listed in the audit scope above. Produce a structured report with sections:

1. **Summary**: overall governance score and top 3 issues.
2. **Per-page analysis**: for each major page/route, report layout quality, visual quality, icon consistency, and AI pattern usage.
3. **Functional component audit**: list dialog/command/select/popover/tabs implementations that lack accessibility and should use Design Anchor.
4. **Structural color audit**: primary color misalignment across pages, CTA inconsistency, inconsistent hover/focus state derivation, status color mixing, contrast violations. Note: decorative and intentional colors are not flagged.
5. **Recommended action**: whether layout restructuring or progressive optimization is more appropriate, and why.

No files should be edited in read-only audit.
