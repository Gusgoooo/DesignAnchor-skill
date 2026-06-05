# Layout Governance

Read this when the skill enters layout restructuring mode for an existing product, or when generating a new page that needs layout decisions.

Layout governance is the highest-leverage intervention Design Anchor can make. Token compliance fixes colors; component governance fixes primitives; but layout governance fixes how the user actually experiences the product.

## Design Thinking: Why Layout Matters Most

Most AI-generated interfaces fail not because of wrong colors or missing components, but because of poor spatial decisions:

- Information that should be scannable is buried in scroll.
- Actions that should be primary are visually equal to secondary ones.
- Content that should be grouped is scattered across unrelated sections.
- The layout density does not match the task's cognitive load.
- Navigation structures fight the user's mental model instead of supporting it.

The goal of layout governance is to make the product feel like it was designed by someone who understands the user's job — not just someone who knows how to write JSX.

## Layout Quality Principles

These principles are the governance standard. AI should freely design the best layout for each page, then verify the result against these principles. They are not a checklist to follow mechanically — they are the criteria for judging whether a layout is good.

### Purpose–Layout Fit

Every page exists because a user needs to accomplish something. The layout should be shaped by that purpose.

- A page for monitoring live systems needs density, real-time indicators, and severity ordering — not cards with generous padding.
- A page for writing long-form content needs a focused single-column with minimal distraction — not a dashboard grid.
- A page for comparing options needs side-by-side presentation — not a sequential list the user must scroll to remember.
- A chat interface needs the conversation to dominate — input at bottom, history scrollable, minimal chrome.

Ask: **if I described what this page is for to a designer, would they expect this layout?**

### Information Hierarchy

The most important content should be the most visually prominent. This sounds obvious but is violated constantly.

- Primary content gets primary space. If a data table is the page's purpose, it should not be squeezed into 40% width by a sidebar.
- Status is always visible — the user should never need to click to discover the current state.
- Numbers have context: trend direction, comparison, threshold, or time range. A number alone is decoration.
- Related content stays together in the same visual group. If two pieces of information are used in the same decision, they belong near each other.

Ask: **if the user glances at this page for 2 seconds, do they see the most important thing?**

### Action Hierarchy

Not all actions are equal. The layout should make this obvious.

- Primary actions are visually prominent and reachable without scrolling.
- Secondary actions are visually subordinate — smaller, lighter, or behind a menu.
- Destructive actions are separated, sometimes gated by confirmation.
- Repeated-use actions (things done 50 times a day) should be the most accessible, regardless of their semantic importance.

Ask: **can the user perform their most frequent action within one click of landing on this page?**

### Density–Task Fit

Different tasks demand different information density. Applying one density everywhere is a layout failure.

- Monitoring and operations: dense. Every pixel earns its space. The user needs to see many signals at once.
- Data entry and forms: balanced. Fields need breathing room for clarity, but not marketing-level whitespace.
- Content consumption (docs, articles, chat): focused. Single-column, generous line height, minimal distraction.
- Settings and configuration: calm. Sections with clear labels, toggles, and descriptions. Not cramped, not sparse.
- Creative tools and canvases: minimal chrome. The canvas or workspace dominates; toolbars and panels are collapsible.

Ask: **does the density serve the task, or does it serve the aesthetic?**

### Spatial Efficiency

Space is a limited resource. Every element above the main content pushes it down.

- Headers, banners, and announcements must earn their vertical position. A "Welcome back!" banner that the user sees 200 times is wasted space.
- Sidebars are supplementary. If the sidebar contains more content than the main area, the proportions are wrong.
- Whitespace is intentional — it groups and separates. Whitespace that does neither is waste.
- Scroll is acceptable for content; scroll to reach controls is a problem.

Ask: **if I removed this element, would the user notice or care?**

### Navigation Clarity

The user always knows where they are, how they got here, and how to go somewhere else.

- Active states in navigation are visible and unambiguous.
- Depth matches product complexity. A 5-page tool does not need sidebar + tabs + breadcrumbs. A 50-page platform might.
- Consistent shell across pages: sidebar, header, and content area should not rearrange between pages unless there is a deliberate mode change.
- Back navigation is predictable. The user should never wonder how to return.

Ask: **if the user was teleported to this page, would they know where they are in the product?**

### State Completeness

Every page has more than one state. Good layouts account for all of them.

- Empty state: what the user sees before there is data. Should explain what will appear and offer the primary action to populate it.
- Loading state: the user should know something is happening — skeleton screens, progress indicators, or spinners.
- Error state: what went wrong, what the user can do about it. Not just a red banner.
- Partial state: some data loaded, some did not. The layout should not break.
- Edge cases: very long text, very many items, zero items, one item, permissions-restricted content.

Ask: **what does this page look like when things go wrong, or when there is nothing to show?**

## Layout Analysis Flow

When analyzing an existing page, do not start from a template. Start from the page's purpose.

1. **Read the full page source** — understand every section, component, data flow, and user interaction.
2. **Identify the primary user task** — what is the user trying to accomplish on this page?
3. **Evaluate against the quality principles** — which principles are satisfied, which are violated?
4. **Identify the biggest layout problems** — ranked by impact on the user's ability to do their job.
5. **Design a better layout** — freely, based on the page's purpose and the principles. Reference examples below if helpful, but do not force-fit a template.
6. **Present the restructuring recommendation** — current layout vs proposed layout, with rationale tied to user workflow improvement.

## Reference Examples

These are common page patterns encountered in real products. Use them as inspiration and starting points, not as templates to match against. Many products will have pages that combine or deviate from these — that is fine as long as the layout principles are satisfied.

### Data-Heavy Workspaces

Pages where the user browses, filters, compares, and acts on collections of records.

Common elements: search, filters, table/list/grid, bulk actions, pagination, row actions, status indicators.

Layout instincts:
- Search and filters always visible, not hidden behind toggles.
- The data view (table, list, or grid) is the centerpiece and gets maximum space.
- Row actions use a dropdown menu, not a row of inline icons.
- Bulk actions appear contextually when items are selected.
- Status uses visual indicators (badges, dots, colors), not plain text.

### Record / Detail Pages

Pages focused on a single entity — viewing its state, history, and taking actions.

Common elements: header with identity and status, metadata summary, tabbed content, related records, timeline/activity, action buttons.

Layout instincts:
- The record's identity (name + status) and primary actions are in the header — always visible.
- Key metadata is summarized in a strip or compact section before detailed content.
- Tabs organize content by user concern, not by data model structure.
- Supplementary context (related records, sidebar info) does not compete with primary content for space.

### Dashboards and Overviews

Pages that give the user a status snapshot and route attention.

Common elements: KPI indicators, charts, trend visualizations, alert lists, activity feeds, quick actions.

Layout instincts:
- The headline numbers are at the top — the user gets the answer in 2 seconds.
- Charts serve the narrative: trends, comparisons, or distributions — not decoration.
- Activity and alerts are secondary — they support the headline, not replace it.
- Every number has context (trend, comparison, threshold).
- No hero banners, welcome messages, or decorative illustrations.

### Forms and Input Pages

Pages where the user provides structured input.

Common elements: grouped fields, validation, section headers, submit/cancel actions, conditional fields.

Layout instincts:
- Sections group related fields with clear headings.
- Actions (submit/cancel) are always reachable — sticky footer on long forms.
- Validation is inline, shown on blur — not batched on submit.
- Progressive disclosure: show simple first, reveal advanced options on demand.
- Multi-step only when the form has clearly distinct phases.

### Chat and Conversational Interfaces

Pages centered on a conversation between the user and an AI, another user, or a system.

Common elements: message history, input area, model/context selectors, streaming responses, tool/function outputs, attachments, code blocks.

Layout instincts:
- Conversation dominates the viewport. Minimal chrome around it.
- Input is anchored at the bottom — always visible and accessible.
- Message history scrolls up. New messages appear at the bottom.
- Streaming responses render incrementally — the user sees progress, not a loading spinner followed by a wall of text.
- Code blocks, tool outputs, and structured content are visually distinct from plain text messages.
- Sidebar (conversation list, settings, context) is collapsible — it should not permanently steal width from the conversation.
- Model or context selectors are compact — they matter but are not the main interaction.

### Canvas and Workspace Interfaces

Pages where the user creates, edits, or manipulates content in a spatial workspace.

Common elements: main canvas/editor, toolbar, properties panel, layer/object list, zoom controls, undo/redo.

Layout instincts:
- The canvas/workspace takes maximum available space.
- Toolbars are compact and positioned at edges — top or left are conventional.
- Properties panels are collapsible sidebars — visible when needed, hidden when not.
- Zoom, undo/redo, and view controls are always accessible but visually quiet.
- No persistent headers or banners stealing vertical space from the workspace.

### Agent and Multi-Step Workflows

Pages where an AI agent or automated process executes steps, and the user monitors, intervenes, or reviews.

Common elements: step/task list, progress indicators, current step detail, logs/output, intervention controls, result summary.

Layout instincts:
- Step progression is visible — the user can see what has been done, what is happening now, and what comes next.
- The current step's detail area is prominent — this is where the action is.
- Logs and output are available but secondary — a collapsible panel or scrollable region.
- Intervention controls (pause, cancel, modify, approve) are contextually placed near the current step.
- The final result or summary is clearly distinguished from intermediate output.

### Settings and Configuration

Pages where the user adjusts system behavior.

Common elements: category navigation, setting rows (label + description + control), sections, danger zones.

Layout instincts:
- Category navigation is persistent — not a dropdown.
- Each setting is a row: label, brief description, and control. Not a card.
- Sections within a category group related settings.
- Dangerous or irreversible actions at the bottom, visually separated.
- Feedback on changes: auto-save with confirmation, or explicit save per section.

## Component Strategy

Components split into two categories: functional and presentational. This distinction drives all component decisions during layout governance.

### Functional Components — Design Anchor Required

These are interaction primitives where accessibility, focus management, and keyboard behavior are critical. When they are implemented as raw HTML or custom code without proper accessibility, replace them with Design Anchor primitives.

**Dialog / Modal:**
- Must have: focus trap, escape-to-close, overlay, accessible title (`aria-labelledby`), content scrolls inside dialog.
- Confirmation dialogs need clear action labels ("Delete project" not "OK") and destructive button variant.
- Replace when: raw `<div>` with `position: fixed` and no focus trap, or no escape-to-close.
- Install: `npx design-anchor add dialog` or `npx design-anchor add alert-dialog`.

**Command Palette / Search:**
- Must have: keyboard shortcut (Cmd/Ctrl+K), arrow key navigation, fuzzy filtering, grouped results, escape-to-close.
- Replace when: plain `<input>` with manually managed dropdown, no keyboard navigation.
- Install: `npx design-anchor add command`.

**Tabs:**
- Must have: keyboard arrow navigation between tabs, active visual indicator, ARIA `role="tabpanel"` with `aria-labelledby`.
- Replace when: styled `<button>` groups without ARIA roles or keyboard navigation.
- Install: `npx design-anchor add tabs`.

**Select / Dropdown:**
- Must have: keyboard navigation, ARIA listbox semantics, viewport overflow handling.
- Replace when: raw `<select>` or custom dropdown without keyboard support.
- Install: `npx design-anchor add select` or `npx design-anchor add dropdown-menu`.

**Popover / Sheet / Tooltip:**
- Must have: proper positioning, focus management, dismissal behavior.
- Install: `npx design-anchor add popover`, `npx design-anchor add sheet`, `npx design-anchor add tooltip`.

### Presentational Components — AI Freely Designs, But Has Quality Standards

All visual/display components are freely designed based on the style prompt. No mandatory library, no forced structure. The token system constrains structural colors; everything else is creative freedom.

**But "freely designed" does not mean "anything goes."** Each presentational component has quality criteria. When a component fails these criteria, redesign it freely based on the style prompt — not by installing a library component, but by writing a better version that fits this product's visual personality.

#### Sidebar / Navigation

A sidebar is the backbone of product navigation. A bad sidebar makes the entire product feel amateur.

**Quality criteria:**
- Collapsible to icon-only mode with a toggle control.
- Grouped navigation items with section labels (e.g., "Main", "Settings", "Admin").
- Active route highlighted with a clear visual indicator — background color or left border, not just font weight.
- Icons consistent in library, size, and style — one icon per nav item, aligned.
- Nested items with expandable/collapsible groups for deep navigation.
- User/org section at bottom or top with avatar, name, and account menu.
- Responsive: on mobile, sidebar becomes a drawer or sheet overlay (use Design Anchor `sheet` for the overlay behavior).
- Keyboard accessible: focusable items, arrow key navigation.
- Uses semantic tokens for structural colors — no hardcoded hex for primary/active states.

**Redesign when:**
- Sidebar is a flat `<ul>` or plain `<a>` tags with no grouping, collapse, or active state.
- Mixed icon sizes or icon libraries within the sidebar.
- No collapse behavior on any screen size.
- Hardcoded colors that don't respond to theme changes.
- Navigation items are buttons with `onClick` doing `router.push` instead of proper `<Link>` elements.

#### Data Table

Tables are the most common component in product UIs and the most commonly botched.

**Quality criteria:**
- Column headers with sort indicators (ascending/descending/unsorted).
- Row selection with checkboxes (header checkbox for select-all).
- Status displayed as semantic badges with color coding — never plain text.
- Row actions in a single dropdown menu (`⋯` trigger) — never a row of inline icons.
- Pagination with page count, current page, page size selector, and total count.
- Empty state with explanation and primary action.
- Loading state with skeleton rows — never a spinner replacing the entire table.
- Responsive: horizontal scroll with sticky first column, or card-based layout on small screens.
- Column widths proportional to content — name columns wider than status columns.

**Redesign when:**
- Inline icon buttons for each row action (icon soup).
- No empty state — just blank when no data.
- No loading state or full-page spinner.
- Status rendered as unstyled text strings.
- No sort capability on sortable columns.
- Pagination missing or only "Load more".

#### Form

**Quality criteria:**
- Every field has a visible label — never placeholder-only labels.
- Related fields grouped in sections with section headings.
- Field descriptions for non-obvious inputs (below the field, muted).
- Inline validation on blur — error message below the field with destructive color.
- Consistent field spacing using a form layout pattern, not ad-hoc margins.
- Submit and cancel actions in a sticky footer on long forms.
- Disabled state for submit button during submission, with loading indicator.

**Redesign when:**
- Fields have no visible labels (placeholder-only).
- Validation only triggers on submit with a list at the top.
- No section grouping — all fields in a flat list.
- Submit button scrolls out of view on long forms.
- Fields use raw `<input>` without wrapper, label, or error display.

#### App Shell / Layout

**Quality criteria:**
- Consistent structure across pages: sidebar + header + content area (or appropriate variation).
- Sidebar and content area do not shift or rearrange between pages.
- Content area fills available space and handles its own scrolling.
- Header stays fixed or sticky at top.
- Responsive: sidebar collapses on small viewports; content area adapts.
- No nested scroll containers that fight with each other.

**Redesign when:**
- Each page defines its own header and sidebar independently — no shared shell.
- Layout uses ad-hoc flex/grid divs with hardcoded pixel widths.
- Content area nested inside multiple scroll containers.
- Sidebar width changes between pages or routes.

#### General Rule

When any presentational component fails its quality criteria, the AI should:
1. Flag it in the audit or restructuring analysis.
2. Redesign it freely based on the style prompt — use the product's color palette, typography, shadow approach, and signature elements.
3. Preserve all data bindings, event handlers, routes, and business logic from the original.
4. Prefer open-source blocks (shadcn blocks, shadcn-admin, Kibo UI, etc.) as structural starting points when they match, then customize extensively with the style prompt.
5. The result should look like it was custom-designed for this specific product — not a library default.

**Token constraint applies to all.** Whether functional or presentational, structural colors (primary, CTA, status, foreground, background) must reference token CSS variables. Decorative colors, gradients, shadows, and accents are free.

## Icon Governance

Icons are a design language. Mixed icon libraries create visual dissonance that users feel but cannot name.

### Detection

Check the project for these icon packages:
- `lucide-react` — recommended default
- `@heroicons/react`
- `react-icons` (wraps FontAwesome, Material, Feather, etc.)
- `@fortawesome/react-fontawesome`
- `@phosphor-icons/react`
- `@tabler/icons-react`
- `@mui/icons-material`

If more than one icon library is installed, flag it. If `react-icons` is used, check whether multiple icon families are mixed (e.g., `FaUser` + `MdSettings` + `FiSearch`).

### Rules

- One icon library per project. Recommend `lucide-react` for new projects.
- Consistent size: pick a base size (16px, 20px, or 24px) and use it everywhere except explicit large/small variants.
- Consistent stroke weight: do not mix outline and filled styles in the same context.
- Meaningful icons only — remove decorative icons that add no recognition value.
- Icon + label for primary actions; icon-only for secondary/repeated actions with tooltips.

### Migration

When consolidating icon libraries:
1. List all icon usages across the project.
2. Map each icon to its equivalent in the target library.
3. Replace all imports in a single pass.
4. Remove the unused icon packages from dependencies.

## Layout Restructuring Execution

When restructuring a page:

1. **Preserve all data bindings and business logic.** Layout changes are UI-layer only. Do not touch API calls, state management, or data transformations.
2. **Design the best layout for this page's purpose.** Do not force-fit a template. Use the quality principles to guide decisions and the reference examples as inspiration.
3. **Redesign presentational components freely.** Sidebar, data tables, cards, app shell — redesign them based on the style prompt. Replace raw HTML modals, selects, and dropdowns with Design Anchor functional primitives.
4. **Unify icons in the same pass.** Do not leave mixed icon libraries for a future cleanup.
5. **Match density to task.** Read the page's purpose — do not apply dashboard density to a settings page or settings density to a creative canvas.
6. **Present the before/after.** Tell the user what the layout was and what it will become, with clear rationale tied to the user's workflow.
7. **One page per confirmation.** Restructure one page at a time. After the user sees the result, continue to the next.
