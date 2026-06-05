---
name: "Cyberpunk UI"
slug: "cyberpunk-ui"
user_facing_direction: "赛博朋克"
type: "General"
best_for:
  - "Gaming platforms"
  - "tech products"
  - "crypto apps"
  - "sci-fi applications"
  - "developer tools"
  - "entertainment"
avoid_for:
  - "Corporate enterprise"
  - "healthcare"
  - "family apps"
  - "conservative brands"
keywords:
  - "Neon"
  - "dark mode"
  - "terminal"
  - "HUD"
  - "sci-fi"
  - "glitch"
  - "dystopian"
  - "futuristic"
density: "balanced"
tone: "modern"
mode: "dark"
complexity: "Medium"
era: "2020s Cyberpunk"
---

# Internal Style Prompt: Cyberpunk UI

## Design Philosophy

Design a cyberpunk interface. Use: neon colors on dark (#0D0D0D), terminal/HUD aesthetic, glitch effects, scanlines overlay, matrix green accents, monospace fonts, angular shapes, dystopian tech feel.

## Color Strategy

**Primary Colors:** #00FF00 (Matrix Green), #FF00FF (Magenta), #00FFFF (Cyan), #0D0D0D (Dark)

**Secondary Colors:** Neon gradients, scanline overlays, glitch colors, terminal green accents

## Effects & Animation

Neon glow (text-shadow), glitch animations (skew/offset), scanlines (::before overlay), terminal fonts

## CSS / Technical Keywords

background: #0D0D0D, color: #00FF00 or #FF00FF, font-family: monospace, text-shadow: 0 0 10px neon, animation: glitch (transform skew), ::before scanlines (repeating-linear-gradient)

## Implementation Checklist

- [ ] Dark background only, - [ ] Neon accents visible, - [ ] Glitch effect subtle, - [ ] Scanlines optional, - [ ] Monospace font, - [ ] Terminal aesthetic

## Design System Variables

```css
--bg-dark: #0D0D0D;
--neon-green: #00FF00;
--neon-magenta: #FF00FF;
--neon-cyan: #00FFFF;
--scanline-opacity: 0.1;
--glitch-duration: 0.3s
```

## Compatibility

- **Light Mode:** ✗ No
- **Dark Mode:** ✓ Only
- **Performance:** ⚠ Moderate
- **Accessibility:** ⚠ Limited (dark+neon)
- **Mobile:** ◐ Medium
- **Frameworks:** Tailwind 8/10, Custom CSS 10/10
