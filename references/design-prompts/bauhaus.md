---
name: "Bauhaus (包豪斯)"
slug: "bauhaus"
user_facing_direction: "包豪斯"
type: "Mobile"
best_for:
  - "Mobile-first apps needing high personality"
  - "onboarding flows"
  - "branding-forward product screens"
  - "artisan/design brands"
  - "editorial mobile experiences"
avoid_for:
  - "Enterprise dashboards"
  - "accessibility-critical contexts (requires extra a11y work)"
  - "data-heavy screens"
  - "conservative industries"
keywords:
  - "bauhaus"
  - "geometric"
  - "constructivist"
  - "primary colors"
  - "hard shadow"
  - "bold"
  - "tactile"
  - "functional"
density: "balanced"
tone: "clean, bold, playful"
mode: "light"
complexity: "Medium"
era: "1919 Bauhaus Movement"
---

# Internal Style Prompt: Bauhaus (包豪斯)

## Design Philosophy

Design a Bauhaus mobile app. Use strict geometric shapes (circles and squares only), primary color blocking (Red #D02020, Blue #1040C0, Yellow #F0C020), hard 4px offset black shadows, OFF-WHITE canvas (#F0F0F0), massive bold uppercase headlines (Outfit Black 900), rectangular full-width buttons with mechanical press animation. No gradients. No rounded cards. No soft transitions.

## Color Strategy

**Primary Colors:** Primary Red #D02020, Primary Blue #1040C0, Primary Yellow #F0C020

**Secondary Colors:** Background #F0F0F0 (Off-white), Foreground #121212 (Stark Black), Muted #E0E0E0

## Effects & Animation

Hard offset shadows (4px 4px 0px black), mechanical press active:translate, no smooth hover — instant 0ms transitions, dot grid pattern on sections, slide-over transitions

## CSS / Technical Keywords

border-radius: 0px (cards/inputs) or 9999px (buttons/FAB), box-shadow: 4px 4px 0px 0px #121212, active:translate-x-[2px] active:translate-y-[2px] active:shadow-none, border: 2px solid #121212, font-family: Outfit, font-weight: 900 uppercase tracking-tighter (headlines)

## Implementation Checklist

- [ ] Geometric shapes only (circle/square), - [ ] Primary color blocking applied, - [ ] Hard offset shadows 4px, - [ ] border-2 border-black on all elements, - [ ] Mechanical press active state, - [ ] Outfit Black 900 uppercase headlines, - [ ] Safe area (pt-safe pb-safe) respected, - [ ] Thumb-friendly h-12/h-14 touch targets, - [ ] No hover states (mobile-only), - [ ] Vertical rhythm single-column stack

## Design System Variables

```css
--color-red: #D02020;
--color-blue: #1040C0;
--color-yellow: #F0C020;
--color-bg: #F0F0F0;
--color-fg: #121212;
--border-width: 2px;
--shadow-hard: 4px 4px 0px 0px #121212;
--radius-block: 0px;
--radius-pill: 9999px;
--font-display: Outfit;
--font-weight-hero: 900
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ◐ Partial (primary palette only)
- **Performance:** ⚡ Excellent
- **Accessibility:** ⚠ WCAG AA (high contrast primaries; verify yellow text separately)
- **Mobile:** ✓ Mobile-First
- **Frameworks:** React Native 10/10, Expo 10/10, SwiftUI 9/10, Flutter 9/10, Tailwind 9/10
