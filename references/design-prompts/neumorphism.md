---
name: "Neumorphism"
slug: "neumorphism"
user_facing_direction: "新拟物"
type: "General"
best_for:
  - "Health/wellness apps"
  - "meditation platforms"
  - "fitness trackers"
  - "minimal interaction UIs"
avoid_for:
  - "Complex apps"
  - "critical accessibility"
  - "data-heavy dashboards"
  - "high-contrast required"
keywords:
  - "Soft UI"
  - "embossed"
  - "debossed"
  - "convex"
  - "concave"
  - "light source"
  - "subtle depth"
  - "rounded (12-16px)"
density: "balanced"
tone: "modern"
mode: "light"
complexity: "Medium"
era: "2020s Modern"
---

# Internal Style Prompt: Neumorphism

## Design Philosophy

Create a neumorphic UI with soft 3D effects. Use light pastels, rounded corners (12-16px), subtle soft shadows (multiple layers), no hard lines, monochromatic color scheme with light/dark variations. Embossed/debossed effect on interactive elements.

## Color Strategy

**Primary Colors:** Light pastels: Soft Blue #C8E0F4, Soft Pink #F5E0E8, Soft Grey #E8E8E8

**Secondary Colors:** Tints/shades (±30%), gradient subtlety, color harmony

## Effects & Animation

Soft box-shadow (multiple: -5px -5px 15px, 5px 5px 15px), smooth press (150ms), inner subtle shadow

## CSS / Technical Keywords

border-radius: 12-16px, box-shadow: -5px -5px 15px rgba(0,0,0,0.1), 5px 5px 15px rgba(255,255,255,0.8), background: linear-gradient(145deg, color1, color2), transform: scale on press

## Implementation Checklist

- [ ] Rounded corners 12-16px consistent, - [ ] Multiple shadow layers (2-3), - [ ] Pastel color verified, - [ ] Monochromatic palette checked, - [ ] Press animation smooth 150ms

## Design System Variables

```css
--border-radius: 14px;
--shadow-soft-1: -5px -5px 15px;
--shadow-soft-2: 5px 5px 15px;
--color-light: #F5F5F5;
--color-primary: single pastel
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ◐ Partial
- **Performance:** ⚡ Good
- **Accessibility:** ⚠ Low contrast
- **Mobile:** ✓ Good
- **Frameworks:** Tailwind 8/10, CSS-in-JS 9/10
