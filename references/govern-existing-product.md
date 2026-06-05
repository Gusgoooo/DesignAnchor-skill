# Govern Existing Product

Read this when Design Anchor detects a mature existing product. This file is self-contained — it includes all layout principles, component standards, and audit criteria needed for execution. You do not need to load `layout-governance.md` separately when using this file, though it remains available as extended reference.

## Design Philosophy

**Beauty is the ultimate goal. Governance makes beauty sustainable.**

Most existing products accumulate layout debt and visual inconsistency over time. Pages built by different developers at different times end up with inconsistent structures, drifting primary colors, mixed icon libraries, and information architectures that no longer match user workflows.

Governance fixes this — but governance that strips visual richness is worse than no governance. A product with perfect token compliance but no visual personality is a governance failure. The governed product must look MORE polished and appealing than before, never less.

**What governance does:** locks the structural anchors (primary color, CTA, status colors, interactive states) so they stay consistent across pages. Restructures layout to better serve user tasks. Replaces substandard components with accessible, well-designed ones.

**What governance does NOT do:** replace every color in the codebase with a token reference. Strip decorative accents, gradients, shadows, and page-specific visual treatments. Turn a colorful product into a black-and-white skeleton.

The style prompt defines the visual soul of the product. Governance protects the structural consistency of that soul across 100 pages.

## User-Facing Introduction

When the probe detects a mature product, present the situation with confidence, not caution:

`我检测到这是一个已有产品。我会先分析每个页面的布局、信息架构、组件使用和 icon 一致性，然后给出重构建议。默认推荐整页重构——用更合理的布局重新呈现你的业务数据和功能，同时保留所有业务逻辑和数据绑定。`

Then offer exactly:

- `布局重构`（推荐）：逐页分析后整页重构布局、替换组件、统一 icon、重排信息架构。保留业务逻辑，重建 UI 层。
- `渐进优化`：只修 token 合规、import 路径、组件替换，保留现有布局。
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

## Component Quality Standards (Inline Reference)

When a component does not meet these standards, replace it entirely — do not report, do not patch.

**Inherit only content and business logic** from the original: data, text, labels, event handlers, API calls, state management. **Do not inherit** the original's layout position, CSS, hardcoded colors, DOM structure, or inline styles — those are discarded. The new component's position comes from the Layout Blueprint (Phase 1); its visual styling comes from the style prompt (Phase 3).

After replacement, apply the product's style prompt visual layer: color palette, shadow treatment, decorative elements, and distinctive styling that make the component look like it was designed for this specific product — not a default library drop-in.

**Sidebar / Navigation:**
- Must be collapsible to icon-only mode with toggle.
- Must have grouped nav items with section labels and active route indicator.
- Must use consistent icons (single library, uniform size/weight).
- Must handle responsive (drawer on mobile).
- Replace when: flat `<ul>` / unstyled div, no collapse, no grouping, mixed icons, hardcoded colors.
- Replacement: `npx design-anchor add sidebar`. If not yet in the registry, write one in `src/components/anchor-ui/sidebar.tsx` following Design Anchor conventions: composable API (`SidebarProvider → Sidebar → SidebarHeader / SidebarContent / SidebarFooter → SidebarGroup → SidebarMenuItem`), semantic token styling, accessible. Then run `npx design-anchor sync` to register.

**Data Table:**
- Must have sortable column headers, row selection (checkboxes), status badges (not plain text), row action dropdown (not inline icons), pagination, empty state, loading skeleton.
- Replace when: inline icon soup for row actions, no empty/loading state, status as plain text, no sort, `<div>` grid without ARIA.
- Replacement: `npx design-anchor add table`. If not yet in the registry, write one in `src/components/anchor-ui/` following Design Anchor conventions. Design Anchor bundles its own primitives — do not install headless table or menu libraries as direct project dependencies. Then run `npx design-anchor sync` to register.

**Form:**
- Must have visible labels (never placeholder-only), section grouping, inline validation on blur, consistent spacing, sticky submit on long forms.
- Replace when: placeholder-only labels, validation only on submit, no section grouping, submit scrolls out of view.
- Replacement: `npx design-anchor add input select textarea checkbox switch`. Use the project's existing form library for logic; Design Anchor handles the field components.

**Dialog / Modal:**
- Must have focus trap, escape-to-close, overlay, accessible title, controlled state. Confirmations must have specific action labels and destructive variant.
- Replace when: `<div>` with `position: fixed`, no focus trap, no escape handling, generic "OK/Cancel".
- Replacement: `npx design-anchor add dialog` / `npx design-anchor add alert-dialog`.

**App Shell:**
- Must have consistent header + sidebar + content structure, responsive collapse, content area with independent scrolling.
- Replace when: each page defines its own header/sidebar, ad-hoc flex divs with hardcoded widths, nested scroll containers.
- Replacement: shared layout component in `src/components/anchor-ui/app-shell.tsx` using CSS Grid.

**Tabs:**
- Must have keyboard arrow navigation, active indicator, proper ARIA roles.
- Replace when: styled `<button>` groups without ARIA or keyboard nav.
- Replacement: `npx design-anchor add tabs`.

**Command Palette / Search:**
- Must have Cmd/Ctrl+K shortcut, keyboard nav, fuzzy filtering, grouped results.
- Replace when: plain `<input>` with manual dropdown.
- Replacement: `npx design-anchor add command`.

## Absolute Bans (Inline from SKILL.md)

When auditing, also check for these AI slop patterns and remove them:

1. Hero metrics grid (four identical stat cards as page opener).
2. Identical card grid (3-4 same-structure cards in a row).
3. Gradient text on headings.
4. Decorative glassmorphism.
5. Side accent stripes with no semantic meaning.
6. Marketing hero on a workbench page.
7. Rainbow status colors (5+ hues on one page).
8. Excessive rounded corners on data-dense components.
9. Decorative icons on every label.
10. Full-width everything regardless of content.

If any of these exist in the current product, flag them in the audit and remove them during restructuring.

## Audit Scope

### Layout Audit

For each page or major route:

- Identify the page's primary user task.
- Read the actual page source and identify the current layout structure.
- Evaluate against the layout quality principles above.
- Report: what sections exist, what is missing, what is misplaced, what is unnecessary.
- Check for absolute ban violations.
- Assess information hierarchy: is the most important content most visible? Are related items grouped?
- Assess action hierarchy: is the primary action obvious? Are destructive actions protected?
- Assess density fit: does the density match the workflow?

### Component Audit (Enforced Replacement)

- Check every sidebar, table, form, dialog, app shell, tabs, and search component against the component quality standards above.
- For each substandard component, note the specific violation and planned replacement.
- Identify raw HTML elements that should be governed components.

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
2. If not, select an appropriate prompt from the built-in pool based on the product's type, industry, tone, and density. Use `scripts/list-style-prompts.mjs` or scan `references/b2b-design-prompts/*.md` and match against frontmatter metadata.
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

4. **Replace substandard components aggressively.** Prefer full replacement over patching. Every sidebar, table, form, dialog, tabs, and search component that does not meet standards gets completely replaced via Design Anchor. This is not optional — substandard components are the primary source of visual debt.
5. **Identify 2-3 key touchpoints** for effect enhancement: CTA buttons, hero/header sections, feature highlights, onboarding states. These can use effect libraries (MagicUI, Reactbits) for animated borders, shimmer, spotlight, or motion effects — installed to `src/components/magicui/` or `src/components/effects/`.

**Present the restructuring plan** before writing code:
   - Current layout → proposed layout block.
   - Components to replace: list each substandard component and its Design Anchor replacement.
   - Key touchpoints: which elements get effect enhancement.
   - AI slop to remove: list any absolute ban violations found.
   - What stays: business logic, data bindings, API calls, state management.
   - What changes: layout structure, component implementations, section ordering, icon library, visual styling.

6. **Wait for per-page confirmation.** The user confirms each page before restructuring begins.
7. **Execute Phase 1 + Phase 2.** Rebuild the layout. Replace all substandard components with Design Anchor standard implementations. Add effect enhancements to key touchpoints. Unify icons. Remove AI slop patterns. Reorder sections by information priority.

**Phase 3 — Visual Styling:**

8. **Apply the matched style prompt's visual layer** to the entire page on top of the replaced components:
   - Color palette: primary actions, surface tints, accent backgrounds, status colors — using the prompt's specific hex values.
   - Typography: font pairing, heading weights, letter spacing per the prompt's spec.
   - Shadow/depth/border: per the prompt's surface approach.
   - Signature elements: 2-3 distinctive visual choices from the prompt.
   - Decorative touches: section background tints, accent borders, card styling, button treatments.
   - Each replaced component must be visually styled to match the product's design personality — not left as a default library look.
9. **Verify**: the page now looks professionally designed for this specific product, not like a generic component library demo.

**Post-change:**

10. **Run checks:**
    - `npx design-anchor sync`
    - `npx design-anchor audit`
11. **Verify against Production Quality Bar** (from SKILL.md Design Guidance). Pay special attention to item #1 (visual polish).
12. **Report what changed** with a Design Anchor self-check line.

### Restructuring Rules

- **Replace the entire page layout, not patches.** Patching a broken layout produces a patched broken layout.
- **Replace substandard components completely, then beautify.** If a sidebar has no collapse behavior, replace the entire sidebar. If a table uses inline icon soup, replace the entire table. If a form has no section grouping or validation, replace the entire form. Do not fix one property — rewrite to standard. Inherit only content and business logic from the original; discard its layout position, CSS, and DOM structure. Then apply the product's style prompt visual layer on top (Phase 3). The replaced component must look better than the original.
- **Use the replacement priority order:** first check `@design`, then `npx design-anchor add`, then write a new component in `src/components/anchor-ui/` following Design Anchor conventions (composable API, semantic token styling, accessibility). Then run `npx design-anchor sync` to register it. Never install UI primitives as direct project dependencies — Design Anchor bundles its own.
- **Unify icons in the same pass.** Replace all icons to the project's chosen library in the same restructuring pass.
- **Remove AI slop patterns in the same pass.** Do not leave hero metrics grids, gradient text, or decorative glassmorphism for later.
- **Preserve all data bindings and business logic.** API calls, state management, data transformations, event handlers, and routing logic stay untouched.
- **Preserve and enhance visual richness.** Decorative colors, accent backgrounds, gradients, shadows, and intentional styling are design choices — keep them. Only align structural anchors (primary, CTA, status, interactive states) to tokens. If the original page had visual personality, the restructured page must have at least the same level of visual appeal.
- **Match density to workflow.** Monitoring consoles are dense. Settings pages breathe. Do not apply one density everywhere.
- **One page per confirmation.** Restructure one page, let the user see the result, then continue.

### Component Replacement Announcement

For each component replaced, report both phases:

`Design Anchor 组件治理：[原组件描述] → [新组件] + [视觉美化]。原因：[具体不达标项]。`

Example: `Design Anchor 组件治理：自定义 div sidebar（无折叠、无分组、icon 混用）→ 标准 Sidebar 组件（可折叠、分组导航、统一 lucide icon）+ 应用产品风格（深色侧边栏、品牌色 active 指示器、柔和阴影过渡）。`

## Progressive Optimization Execution

When the user chooses progressive optimization instead of layout restructuring:

This path fixes structural color consistency and component quality without changing page-level layout or information architecture. Preserve all intentional visual design choices — decorative colors, accents, gradients, and shadows stay as-is.

**Style prompt matching is still required.** Follow the same "Style Prompt Matching" steps above. Even in progressive mode, replaced components must be beautified per the matched prompt, and each page gets a visual enhancement pass (within the existing layout).

- Align structural anchor colors only: primary interactive elements to the same `primary` token, CTA consistency, status color consistency, interactive state derivation. Do NOT replace decorative or page-specific colors with tokens.
- Replace raw HTML primitives with governed components.
- **Replace substandard components that violate Component Quality Standards** — even in progressive mode, a sidebar with no collapse, a table with icon soup, or a form with no validation should be replaced. The page layout stays the same but the components inside it get upgraded.
- Remove AI slop patterns (absolute bans) within existing components.
- Fix import paths to use `@design` or `@/components/anchor-ui`.
- Consolidate mixed icon libraries to a single library.
- Add missing Design Anchor directories and rules through `sync`.
- Add `.anchor/` to `.gitignore` if missing.
- Do not change page layout, section ordering, or information architecture.
- Do not rearrange sections or restructure the page shell.

## Read-Only Audit Scope

When the user chooses read-only audit:

Scan and report everything listed in the audit scope above. Produce a structured report with sections:

1. **Summary**: overall governance score and top 3 issues.
2. **Per-page analysis**: for each major page/route, report layout quality, component quality (with specific standard violations), icon consistency, and AI slop violations.
3. **Component replacement plan**: list every substandard component, what standard it violates, and what it should be replaced with.
4. **Structural color audit**: primary color misalignment across pages, CTA inconsistency, inconsistent hover/focus state derivation, status color mixing, contrast violations. Note: decorative and intentional colors are not flagged.
5. **Recommended action**: whether layout restructuring or progressive optimization is more appropriate, and why.

No files should be edited in read-only audit.
