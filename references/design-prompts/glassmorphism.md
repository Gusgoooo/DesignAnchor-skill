---
name: "Glassmorphism"
slug: "glassmorphism"
user_facing_direction: "毛玻璃"
type: "General"
best_for:
  - "Modern SaaS"
  - "financial dashboards"
  - "high-end corporate"
  - "lifestyle apps"
  - "modal overlays"
  - "navigation"
avoid_for:
  - "Low-contrast backgrounds"
  - "critical accessibility"
  - "performance-limited"
  - "dark text on dark"
keywords:
  - "Frosted glass"
  - "transparent"
  - "blurred background"
  - "layered"
  - "vibrant background"
  - "light source"
  - "depth"
  - "multi-layer"
density: "compact"
tone: "bold"
mode: "either"
complexity: "Medium"
era: "2020s Modern"
---

# Internal Style Prompt: Glassmorphism

## Design Philosophy

Design a glassmorphic interface with frosted glass effect. Use backdrop blur (10-20px), translucent overlays (rgba 10-30% opacity), vibrant background colors, subtle borders, light source reflection, layered depth. Perfect for modern overlays and cards.

## Color Strategy

**Primary Colors:** Translucent white: rgba(255,255,255,0.1-0.3)

**Secondary Colors:** Vibrant: Electric Blue #0080FF, Neon Purple #8B00FF, Vivid Pink #FF1493, Teal #20B2AA

## Effects & Animation

Backdrop blur (10-20px), subtle border (1px solid rgba white 0.2), light reflection, Z-depth

## CSS / Technical Keywords

backdrop-filter: blur(15px), background: rgba(255, 255, 255, 0.15), border: 1px solid rgba(255,255,255,0.2), -webkit-backdrop-filter: blur(15px), z-index layering for depth

## Implementation Checklist

- [ ] Backdrop-filter blur 10-20px, - [ ] Translucent white 15-30% opacity, - [ ] Subtle border 1px light, - [ ] Vibrant background verified, - [ ] Text contrast 4.5:1 checked

## Design System Variables

```css
--blur-amount: 15px;
--glass-opacity: 0.15;
--border-color: rgba(255,255,255,0.2);
--background: vibrant color;
--text-color: light/dark based on BG
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Full
- **Performance:** ⚠ Good
- **Accessibility:** ⚠ Ensure 4.5:1
- **Mobile:** ✓ Good
- **Frameworks:** Tailwind 9/10, MUI 8/10, Chakra 8/10
