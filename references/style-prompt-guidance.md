# Style Prompt Guidance

Read this when the user gives a design prompt, brand style, mood direction, visual recipe, or asks to extract design tokens from language.

## Role Of A Style Prompt

A style prompt is the **visual soul** of the product. It defines the aesthetic layer that makes the product look polished, distinctive, and memorable — not just structurally correct. It can come directly from the user, or from the skill's internal prompt pool when the user's request is incomplete.

**Beauty is the primary goal.** A style prompt must produce a product that looks visually appealing, colorful (where appropriate), and professionally designed. Token governance then locks the structural anchors (primary, CTA, status) for consistency across pages, but the visual richness comes entirely from the style prompt.

A comprehensive style prompt should cover:

- **Design philosophy** — the core visual concept, emotional vibe, and what makes this aesthetic distinctive (e.g., "cinematic depth with atmospheric lighting" or "editorial poster design in the palm of the hand").
- **Color strategy** — not just primary/secondary colors but the full palette mood: warm vs cool, muted vs vibrant, the role of accent colors, gradient direction, shadow coloring. Include specific hex values for key colors.
- **Typography system** — font pairings (display + body + mono), scale hierarchy, weight usage, letter spacing, line height. Explain the typographic personality.
- **Surface and depth** — shadow approach (soft colored shadows, hard offset shadows, no shadows), border treatment (hairline, thick, none), radius strategy, surface layering (flat vs elevated vs glassmorphic).
- **Component visual styling** — how buttons look and feel (gradient, flat, outline, pill vs squared), how cards present (bordered, elevated, color-blocked), how inputs respond (bottom-border, full-border, filled background). Include specific visual specifications, not just "use semantic tokens."
- **Effects and micro-interactions** — animation timing and easing, press/hover feedback style, loading state approach, transition philosophy.
- **Signature elements** — 3-5 bold visual choices that make this design immediately recognizable and non-generic. What is the one thing that makes someone say "this doesn't look like every other app"?
- **Style-specific anti-patterns** — what NOT to do within this aesthetic. Every style has its own pitfalls.
- **Density and spacing rhythm** — spacing scale, section padding, content width strategy.
- **Layout density preference** — compact vs balanced vs spacious, sidebar tone, content area rhythm.

Do not let the style prompt override:

- component interaction quality (accessibility, keyboard nav, state completeness),
- semantic token structure (the naming convention and inheritance),
- WCAG contrast requirements,
- product usability and data workflow clarity,
- user-owned component boundaries,
- screen type layout patterns from `layout-governance.md`,
- information architecture decisions driven by workflow analysis.

**But within those structural constraints, let the style prompt drive every visual decision.** The style prompt is what prevents the product from looking like a generic black-and-white skeleton.

## Detailed User Prompt Flow

Use this when the user already gives enough design language to infer token direction.

1. Save the user's prompt into a project-local markdown file, such as `design-prompt.md` or `.anchor/design-prompt-source.md`.
2. Run:

```bash
npx design-anchor theme <prompt.md>
```

3. Sync generated rules and token CSS:

```bash
npx design-anchor sync
```

4. If UI changed, run:

```bash
npx design-anchor audit
```

5. Generate the first page with the extracted style, product context, `@design` components, and semantic tokens.
6. Open `npx design-anchor portal tokens` only when the user wants to inspect or tune the result.

## Internal Prompt Flow

Use this when the user asks for a page or product but does not provide enough style language.

1. Read `style-source-selection.md`.
2. Ask one concise heuristic question if needed.
3. Select one prompt from `b2b-design-prompt-pool.md`.
4. Do not reveal the internal prompt name.
5. Tell the user: `我帮你匹配到一个适合这个场景的风格方向，会先转成 token，再生成页面。`
6. Save the selected prompt into `.anchor/design-prompt-source.md` or `design-prompt.md`.
7. Run `npx design-anchor theme <prompt.md>`, then sync and continue page generation.

## Product Restraint

Most Design Anchor users are building functional products (B2B, SaaS, AI tools, internal tools). The style prompt must balance visual richness with product usability:

- Use the style prompt's color palette, typography, shadow system, and signature elements to make pages visually compelling.
- Keep density appropriate for the workflow — monitoring is dense, settings breathe.
- Avoid marketing-style hero layouts on workbench pages — the style prompt's personality shows through component styling, color richness, and typography, not through decorative splash sections.
- Component composition follows layout governance — but the visual styling of each component comes from the style prompt.

Apply prompt layout preferences within the screen type pattern:

- a prompt that says "spacious" adjusts spacing tokens, not the section structure of a list page,
- a prompt that says "dark" applies dark surface tokens with appropriate depth and atmosphere, not just black backgrounds,
- a prompt that says "compact" increases density within sections, not by removing necessary sections,
- a prompt that says "friendly" adjusts radius, color warmth, shadow softness, and copy tone, not the information hierarchy.

The style prompt shapes the look; `layout-governance.md` shapes the structure. When they conflict, structure wins — but the style prompt must still be fully expressed within that structure.

**The first generated UI must look impressive and polished.** The excitement comes from:
- Rich, intentional color usage (not just black and white with a single accent),
- Professional typography with clear hierarchy and personality,
- Thoughtful shadow/depth treatment that creates visual layers,
- Signature elements that make the design memorable,
- Meaningful data, state design, and confident composition.

If the first page looks like a wireframe or a plain skeleton, the style prompt was not applied well enough. Go back and add more visual richness.

## Visual Quality Checklist

After generating UI from a style prompt, verify:

1. The page has visible color personality — not monochrome or generic gray.
2. Primary interactive elements (buttons, links, active states) use the style prompt's primary color, not default browser/framework blue.
3. Typography feels intentional — font pairing, weights, and sizes create clear hierarchy and visual personality.
4. Surfaces have depth — appropriate shadows, borders, or elevation per the style's approach.
5. At least 2-3 signature elements from the style prompt are visible.
6. The page does NOT look like every other Tailwind/shadcn default app.
7. A designer looking at this page would recognize an intentional aesthetic, not a template.
