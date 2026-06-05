---
name: "Bento Box Grid"
slug: "bento-box-grid"
user_facing_direction: "便当盒布局"
type: "General"
best_for:
  - "Dashboards"
  - "product pages"
  - "portfolios"
  - "Apple-style marketing"
  - "feature showcases"
  - "SaaS"
avoid_for:
  - "Dense data tables"
  - "text-heavy content"
  - "real-time monitoring"
keywords:
  - "Modular cards"
  - "asymmetric grid"
  - "varied sizes"
  - "Apple-style"
  - "dashboard tiles"
  - "negative space"
  - "clean hierarchy"
  - "cards"
density: "compact"
tone: "clean"
mode: "either"
complexity: "Low"
era: "2020s Apple"
---

# Internal Style Prompt: Bento Box Grid

## Design Philosophy

Design a Bento Box grid layout. Use: modular cards with varied sizes (1x1, 2x1, 2x2), Apple-style aesthetic, rounded corners (16-24px), soft shadows, clean hierarchy, asymmetric grid, neutral backgrounds (#F5F5F7), hover effects.

## Color Strategy

**Primary Colors:** Neutral base + brand accent, #FFFFFF, #F5F5F5, brand primary

**Secondary Colors:** Subtle gradients, shadow variations, accent highlights for interactive cards

## Effects & Animation

grid-template with varied spans, rounded-xl (16px), subtle shadows, hover scale (1.02), smooth transitions

## CSS / Technical Keywords

display: grid, grid-template-columns: repeat(4, 1fr), grid-auto-rows: 200px, gap: 16px, border-radius: 24px, background: #FFFFFF, box-shadow: 0 4px 6px rgba(0,0,0,0.05)

## Implementation Checklist

- [ ] Grid responsive (4→2→1 cols), - [ ] Card spans varied, - [ ] Rounded corners consistent, - [ ] Shadows subtle, - [ ] Content fits cards, - [ ] Hover scale (1.02)

## Design System Variables

```css
--grid-gap: 16px;
--card-radius: 24px;
--card-bg: #FFFFFF;
--page-bg: #F5F5F7;
--shadow: 0 4px 6px rgba(0,0,0,0.05);
--hover-scale: 1.02
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Full
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AA
- **Mobile:** ✓ High
- **Frameworks:** Tailwind 10/10, CSS Grid 10/10
