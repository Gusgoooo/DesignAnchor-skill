# Design Anchor Quality Bar

Read this before final delivery for any UI change, and before dark mode, responsive repair, accessibility cleanup, token governance, or visual recovery work.

This file holds the detailed quality rules that should not live in `SKILL.md` on every activation.

## Constitutional Rules

These rules override stylistic preferences, user prompts, and internal style matching.

1. Token governance exists to enforce structural consistency, not to remove visual richness.
2. A governed product must look more polished and appealing than before governance.
3. Style prompt drives beauty: palette richness, typography, depth, surface treatment, accent tones, effects, and signature elements.
4. Functional components provide behavior, not aesthetics. Beauty comes from composition and styling judgment, not library defaults.
5. Every product needs visible design personality from the active style prompt.
6. If governance makes the page flatter, colder, less colorful, or more generic, repair the visual regression while keeping structural anchors governed.

## AI Pattern Awareness

Be aware of common AI-generated UI patterns that can make output feel generic. These are not bans. The problem is when they appear by default, without intent.

- Turning a Functional page into a Showcase page: dashboard with a hero, settings with CTA blocks, agent workspace with feature cards.
- Four identical stat cards in a row as the first element on every dashboard.
- Three cards in a grid, same height and structure, differing only in icon and text.
- Gradient text on headings as a default decorative choice.
- `backdrop-blur` glassmorphism everywhere without purpose.
- Colored left borders on every card as generic decoration.
- "Welcome back" hero sections on frequently visited workbench pages.
- 5+ different hues for status badges on a single page.
- `rounded-2xl` or `rounded-3xl` on data-dense components.
- An icon on every heading, label, or title where it adds no recognition value.
- Every element stretched to 100% width regardless of content.

The test is intent. If a pattern serves the page purpose and the user's task, use it. If it appears because it is the first thing that came to mind, find a better solution.

## Beauty Ownership

Looking good is a delivery requirement. Do not finish a UI task just because tokens, imports, and components are correct.

A page is not ready if:

- It looks like default Tailwind/shadcn, a wireframe, or a component demo.
- Token compliance made it flatter, colder, less colorful, or less brand-specific.
- All cards, sections, and controls have the same visual weight.
- Typography is readable but has no hierarchy or personality.
- The page has no recognizable signature element from the active style prompt.
- Empty, loading, error, and success states are functional but visually untreated.

Beauty recovery protocol:

1. Strengthen composition and hierarchy so the primary workflow is visually dominant.
2. Reapply the active style prompt: palette richness, typography, surface/depth, radius, shadow, and signature elements.
3. Add restrained visual contrast: featured surfaces, accent backgrounds, section rhythm, varied card weights, refined borders, or subtle motion using existing CSS/utilities.
4. Preserve token governance for structural anchors, while keeping intentional decorative color, gradients, depth, and texture.
5. Recheck responsive views so beautification does not create overlap, overflow, or cramped mobile UI.

Never solve beauty by adding a large dependency or another component library.

## Color Governance

Color governance targets structural anchors only. Decorative accents, illustration colors, page-specific backgrounds, gradients, and shadows are intentional design choices and should be preserved.

Govern these structural anchors:

- Primary interactive color: buttons, links, active nav, selected states, toggles, checkboxes, focus rings.
- CTA elements: align with primary or a designated accent token.
- Status colors: success, warning, error, info through semantic tokens.
- Base text colors: `text-foreground`, `text-muted-foreground`.
- Interactive states: hover, focus, active, disabled derived from the base token.

Preserve these:

- Page-specific decorative colors, accent backgrounds, gradients, and shadows.
- Illustration and data visualization colors.
- Intentional one-off Tailwind utility colors for a clear visual reason.
- Third-party embedded content.

How to distinguish:

- Accidental inconsistency: the same semantic concept appears in different colors across pages.
- Intentional design choice: a specific element has a unique color for a clear visual reason.

When in doubt, preserve the existing color and govern only the structural anchor.

For existing products, use `rg` to scan hardcoded Tailwind color classes, classify each match as structural or decorative, build a replacement map, verify root `design-tokens.json`, then execute. See `references/govern-existing-product.md` for the full replacement flow.

Contrast:

- Text must meet WCAG 2.1 AA contrast: 4.5:1 normal text, 3:1 large text.
- Color must not be the only way to convey information.

## Responsive Design

Every page must work across common viewport widths. This is part of the initial build.

Checkpoints:

| Width | Use |
|---|---|
| 320px | Small phone |
| 768px | Tablet |
| 1024px | Laptop |
| 1440px | Desktop |

Rules:

- Sidebar collapses or hides below `lg`; on mobile it becomes a sheet/drawer overlay. Reuse an existing accessible sheet first; install Design Anchor `sheet` only when missing.
- Multi-column grids collapse below `md`.
- Data tables scroll horizontally below `lg`, or become card-based below `md` when useful.
- Split views stack below `md`.
- Forms become single column below `sm`.
- Charts simplify or stack below `md`; never overflow horizontally.
- Sticky header remains accessible; mobile submit actions can use a sticky footer.
- Touch targets are at least 44x44px on mobile.
- Body text stays within 55-75 characters on large screens.

Implementation:

- Write mobile-first CSS.
- Use Tailwind responsive utilities when the project uses Tailwind.
- Container queries are acceptable for component-level responsiveness.

## Dark Mode

After generating the first page or completing a governance pass, ask:

```text
页面已完成。需要我顺便做一个暗色模式吗？会基于 token 系统实现，一套代码自动适配。
```

If confirmed:

1. Define dark values for structural tokens in root `design-tokens.json`.
2. Use `prefers-color-scheme: dark` or `.dark` depending on project setup.
3. Let token CSS variables swap values instead of adding `dark:` classes everywhere.
4. Adapt decorative colors to dark mode without stripping visual richness.
5. Verify contrast in both modes.
6. Run `npx design-anchor sync` after token updates.

Do not ship washed-out inverted dark mode. It should look intentionally designed.

## Typography

- Body line width: 55-75 characters.
- Heading hierarchy must be visible without reading the words.
- Maximum 2 font families per project.
- Avoid all caps for body text and long labels.
- Avoid font sizes below 12px.

## Interaction

- Every clickable element has visible hover and focus states.
- Destructive actions are visually distinct and require confirmation when irreversible.
- Loading states are visible.
- Disabled elements look disabled and explain why.
- Dropdowns and popovers handle viewport overflow.

## Accessibility

- Form inputs have associated labels.
- Images have `alt`; use empty `alt=""` only for decorative images.
- Interactive elements are keyboard reachable and operable.
- Focus indicators are visible.
- Respect `prefers-reduced-motion`.

## Production Quality Bar

Every UI output must meet this minimum bar before delivery:

1. Visual polish: polished, colorful where appropriate, appealing, and visibly tied to the style prompt.
2. Text passes WCAG AA contrast.
3. Interactive elements have hover and focus states.
4. Empty, loading, and error states are handled.
5. Responsive at 320 / 768 / 1024 / 1440px.
6. Structural anchor colors use token CSS variables or semantic token classes.
7. Primary color is consistent across primary buttons, links, active states, and focus rings.
8. Hover, focus, active, and disabled states are token-derived.
9. No mixed icon libraries.
10. Form fields have visible labels.
11. Destructive actions are visually distinguished and gated.
12. Keyboard navigation works for all interactive elements.
13. Page renders without layout shift.
