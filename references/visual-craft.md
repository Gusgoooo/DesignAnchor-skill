# Visual Craft Playbook

Read this before final page polishing, beauty recovery, or any task where token governance is correct but the page still does not feel professionally designed.

This playbook adapts the useful parts of `figma-generate-library` with minimal tool dependency. It keeps the design-system workflow almost intact, but replaces Figma-specific calls with codebase inspection, Design Anchor tokens, existing project components, browser screenshots when available, and no-new-dependency repair.

## 1. The One Rule That Matters Most

**This is NEVER a one-shot task.** Making a product UI beautiful requires multiple phases, with validation between them. Any attempt to fix layout, tokens, typography, surfaces, components, states, responsiveness, and visual personality in one undifferentiated pass will produce generic, incomplete, or visually fragile results.

Break every operation to the smallest useful scope, validate, then proceed.

For Design Anchor, the smallest useful scope is usually:

- one page,
- one page section,
- one component family,
- one state family,
- or one token/foundation layer.

## 2. Mandatory Workflow

Every visual craft pass follows this phase order. Skipping or reordering phases causes structural failures that are expensive to undo.

```text
Phase 0: DISCOVERY (always first — no broad visual rewrite yet)
  0a. Analyze codebase -> extract tokens, components, layout shells, naming conventions
  0b. Inspect existing screens -> surfaces, typography, spacing, depth, states, icon language
  0c. Inspect available local components -> @design, src/components, existing accessible primitives
  0d. Lock current scope -> exact page/section/component/state being improved
  0e. Map style prompt -> existing product language -> resolve conflicts
  -> Exit criteria: you know what visual language exists and what this pass will change

Phase 1: FOUNDATIONS (tokens and visual foundations before components)
  1a. Confirm structural tokens in design-tokens.json
  1b. Identify primitive palette values and semantic token roles
  1c. Define surface system: page, section, card, popover/modal, overlay
  1d. Define typography system: display, section title, body, metadata, numeric/data text
  1e. Define effect styles: shadows, borders, radius, focus rings, motion timing
  1f. Confirm dark-mode impact if dark mode is enabled or requested
  -> Exit criteria: primary/status/interactive anchors are token-governed and visual foundations are clear

Phase 2: PAGE STRUCTURE (before visual component polish)
  2a. Confirm page nature: Functional or Showcase
  2b. Confirm primary workflow and first-fold hierarchy
  2c. Confirm section order and density
  2d. Confirm shell/navigation behavior and responsive layout
  2e. Confirm which sections are allowed to receive stronger visual treatment
  -> Exit criteria: the page has a stable spatial structure and the primary task is visually prioritized

Phase 3: SECTIONS + COMPONENTS (one meaningful area at a time)
  For EACH section/component family:
    3a. Inspect existing implementation and local reusable components
    3b. Reuse existing accessible primitives before installing anything
    3c. Bind structural colors to tokens; keep decorative richness prompt-aligned
    3d. Apply typography, spacing, radius, shadow, and state treatment from foundations
    3e. Add designed states: hover, active, selected, empty, loading, error, success
    3f. Validate section visually and responsively before moving on
  -> Exit criteria: section looks designed, not merely token-compliant

Phase 4: INTEGRATION + QA (final pass)
  4a. Visual beauty audit: not generic, not flat, not a component demo
  4b. Accessibility audit: contrast, focus visibility, target size, state clarity
  4c. Token audit: structural colors use semantic tokens consistently
  4d. Responsive audit: 320 / 768 / 1024 / 1440 when app can run
  4e. Screenshot or rendered-page review when possible; code-based visual review otherwise
  -> Exit criteria: page is both governed and more beautiful than before
```

## 3. Critical Rules

**Design system rules adapted from Figma workflows:**

1. **Foundations BEFORE components** — components inherit the page's token, surface, typography, and depth decisions. No foundation = no coherent page.
2. **Inspect before creating** — read existing pages, components, tokens, and style prompt before styling. Match and improve local conventions.
3. **One page/section/component family at a time** — do not perform a broad decorative sweep over the whole project.
4. **Bind structural visual properties to tokens** — primary fills, foregrounds, borders, focus rings, status colors, and interactive states should use token variables/classes. Exceptions: intentionally decorative accents, data visualization, illustration colors, and page-specific atmosphere.
5. **Do not flatten semantic tokens into raw values** — preserve `primary`, `background`, `foreground`, `muted`, `destructive`, `border`, etc. Raw hex values belong in token sources or intentional decorative treatments.
6. **Validate before proceeding** — never build later polish on an unvalidated section. If the first fold is weak, fix it before polishing secondary panels.
7. **Cap visual variants** — if a page starts accumulating many card styles, badge hues, button treatments, or icon sizes, consolidate. Variation should express hierarchy, not randomness.
8. **Use existing helpers and local patterns** — prefer existing CSS/Tailwind utilities, tokens, and components over new libraries.
9. **No destructive cleanup** — do not delete or rewrite business logic to make visuals easier. Keep data bindings, API calls, state management, and user flows intact.
10. **No dependency as beauty shortcut** — do not add animation, chart, icon, component, or effect libraries just to make a page feel designed.
11. **Explicit checkpoint for broad changes** — if the visual craft pass expands from one page/section into app shell, shared components, or governance bridge files, pause and confirm.
12. **Screenshot when available** — if a local app can run, use browser screenshot review to catch overlap, awkward spacing, weak hierarchy, and flatness. If screenshot is not possible, say the visual QA was code-based.

## 4. State Management For Long Governance

Do not write state ledger files into the user project. Keep state in the conversation and final summary unless the user explicitly asks for a persistent audit artifact.

For multi-page governance, track:

```json
{
  "phase": "phase3-sections",
  "currentPage": "Dashboard",
  "completed": ["discovery", "foundations", "page-structure"],
  "pendingValidation": ["mobile", "empty-state", "audit"],
  "tokenDecisions": {
    "primary": "kept from design-tokens.json",
    "decorativeAccents": "preserved from existing page"
  },
  "componentDecisions": {
    "dialog": "reused existing component",
    "sheet": "not installed"
  }
}
```

Resume protocol:

1. Re-run project probe if context is stale.
2. Re-read the touched page, root `design-tokens.json`, and relevant components.
3. Reconstruct what phase was completed from git diff and conversation summary.
4. Continue from the smallest unfinished validation, not from scratch.

## 5. Reuse Decision Matrix

Search local project patterns first, then runtime primitives, then external reference-only inspiration.

**Reuse if** all are true:

- Existing component covers the behavior and accessibility need.
- Visual treatment can be adapted to the active style prompt.
- Token model is compatible or easy to align.
- Using it avoids adding files/dependencies.

**Refine if**:

- Component behavior is correct but styling is plain.
- Layout works but hierarchy or density is weak.
- Token usage is mostly correct but decorative richness was lost.

**Install a Design Anchor primitive if**:

- The current real UI task needs a missing high-risk interaction primitive.
- No accessible project equivalent exists.
- The install is the smallest specific component source under `src/components/`.

**Reference-only if**:

- A block or external UI example has a useful structure but would add dependency weight.
- A component library looks good but duplicates the project's existing stack.
- The user requested minimal/no dependency changes.

**Create freely if**:

- The component is presentational: cards, stat blocks, shells, tables visuals, section treatments, empty states.
- Beauty depends on product-specific composition and style prompt application.

Priority: existing local pattern -> Design Anchor functional primitive only if needed -> reference-only external inspiration -> freely designed presentational code.

## 6. Visual Checkpoints

Use checkpoints as design judgment, not bureaucracy.

| After | Required artifact | Ask / decide |
|---|---|---|
| Discovery | Current visual language, token/component findings, page purpose | Is the next action style extraction, page structure, or visual polish? |
| Foundations | Palette/surface/type/depth decisions | Do these match the product and active prompt? |
| Page structure | First-fold hierarchy and section order | Is the primary workflow visually dominant? |
| Each section | Updated section code or screenshot when available | Does this section look designed and fit the foundations? |
| Final QA | Self-check line and screenshot/code-based visual review | Is the page governed and more beautiful than before? |

For mature products, user confirmation is still required before broad page restructuring. For ordinary visual polish inside a requested UI task, proceed when the scope is clear and low-risk.

## 7. Page-Type Craft Notes

### Functional Dashboard

Beauty comes from hierarchy and density control. One or two metrics/workflows should dominate; supporting stats should be quieter. Avoid equal-card grids unless the data is truly equal.

Useful moves:

- Make the most important metric larger or more visually distinct.
- Use varied card weights: featured, standard, compact.
- Keep chart/table areas calmer than summary areas.
- Use accent tints and borders sparingly to express priority, not decoration.

### AI Workspace / Chat / Agent Console

Beauty comes from workflow focus. The conversation, generated output, canvas, or current task should own the page; sidebars and logs support it.

Useful moves:

- Give the main work area a stronger surface or clearer boundary.
- Keep controls close to the workflow they affect.
- Style streaming/loading/progress states so the product feels alive.
- Avoid marketing heroes, CTA strips, and feature-card filler.

### Settings / Forms

Beauty comes from calm structure and trust. Users need clear grouping, readable labels, and confidence that changes are controlled.

Useful moves:

- Use section groups with concise titles and helper text.
- Keep destructive actions visually separated.
- Make save state, validation, and disabled states feel deliberate.
- Avoid over-decorating; polish through spacing, typography, and clear surfaces.

### Data Tables / Lists

Beauty comes from scanability. Dense content can still look refined if alignment, type, row rhythm, and states are handled carefully.

Useful moves:

- Use consistent numeric alignment and muted metadata.
- Make selected, hover, empty, and loading states designed.
- Keep row height appropriate to the task density.
- Use sticky/contextual actions only when they help the workflow.

### Detail Pages

Beauty comes from narrative order. The header should summarize identity/status/actions; sections should follow how users think, not database order.

Useful moves:

- Strong entity header with status and primary actions.
- Related information grouped into meaningful sections.
- Secondary data can live in side panels or compact metadata rows.
- Use visual rhythm to separate overview, details, history, and actions.

## 8. No-New-Dependency Beauty Moves

Use these before considering any external visual package:

- Rebalance scale: make primary sections bigger, secondary sections quieter.
- Improve typography: stronger heading/body contrast, better line height, better numeric styling.
- Add surface craft: tinted sections, subtle elevation, clean borders, inset panels.
- Add state craft: designed empty/loading/error/success/selected states.
- Add restrained motion with existing CSS/Tailwind utilities.
- Unify icons: one library, consistent size, purposeful placement.
- Preserve decorative richness while keeping structural anchors token-governed.

## 9. Failure Signals

Run a visual recovery pass when:

- The page looks like default Tailwind/shadcn with swapped colors.
- Every card has the same size, weight, and border.
- The primary task is not visually obvious.
- The page got cleaner but less appealing after token governance.
- Mobile is just a squeezed desktop layout.
- States are technically present but visually untreated.

Repair the smallest failing area first. Do not rewrite business logic and do not add dependencies just to create beauty.
