---
name: "HUD / Sci-Fi FUI"
slug: "hud-sci-fi-fui"
user_facing_direction: "HUD 科幻"
type: "General"
best_for:
  - "Sci-fi games"
  - "space tech"
  - "cybersecurity"
  - "movie props"
  - "immersive dashboards"
avoid_for:
  - "Standard corporate"
  - "reading heavy content"
  - "accessible public services"
keywords:
  - "Futuristic"
  - "technical"
  - "wireframe"
  - "neon"
  - "data"
  - "transparency"
  - "iron man"
  - "sci-fi"
density: "compact"
tone: "technical"
mode: "dark"
complexity: "High"
era: "2010s Sci-Fi"
---

# Internal Style Prompt: HUD / Sci-Fi FUI

## Design Philosophy

Design a futuristic HUD (Heads Up Display) or FUI. Use: thin lines (1px), neon cyan/blue on black, technical markers, decorative brackets, data visualization, monospaced tech fonts, glowing elements, transparency.

## Color Strategy

**Primary Colors:** Neon Cyan #00FFFF, Holographic Blue #0080FF, Alert Red #FF0000

**Secondary Colors:** Transparent Black, Grid Lines #333333

## Effects & Animation

Glow effects, scanning animations, ticker text, blinking markers, fine line drawing

## CSS / Technical Keywords

border: 1px solid rgba(0,255,255,0.5), color: #00FFFF, background: transparent or rgba(0,0,0,0.8), font-family: monospace, text-shadow: 0 0 5px cyan

## Implementation Checklist

- [ ] Fine lines 1px, - [ ] Neon glow text/borders, - [ ] Monospaced font, - [ ] Dark/Transparent BG, - [ ] Decorative tech markers, - [ ] Holographic feel

## Design System Variables

```css
--hud-color: #00FFFF;
--bg-color: rgba(0,10,20,0.9);
--line-width: 1px;
--glow: 0 0 5px;
--font: monospace
```

## Compatibility

- **Light Mode:** ✓ Low
- **Dark Mode:** ✓ Full
- **Performance:** ⚠ Moderate (renders)
- **Accessibility:** ⚠ Poor (thin lines)
- **Mobile:** ◐ Medium
- **Frameworks:** React 9/10, Canvas 10/10
