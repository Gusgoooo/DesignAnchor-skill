---
name: "Retro-Futurism"
slug: "retro-futurism"
user_facing_direction: "复古未来"
type: "General"
best_for:
  - "Gaming"
  - "entertainment"
  - "music platforms"
  - "tech brands"
  - "artistic projects"
  - "nostalgic"
avoid_for:
  - "Conservative industries"
  - "critical accessibility"
  - "professional/corporate"
  - "elderly"
keywords:
  - "Vintage sci-fi"
  - "80s aesthetic"
  - "neon glow"
  - "geometric patterns"
  - "CRT scanlines"
  - "pixel art"
  - "cyberpunk"
  - "synthwave"
density: "balanced"
tone: "retro"
mode: "light"
complexity: "Medium"
era: "1980s Retro"
---

# Internal Style Prompt: Retro-Futurism

## Design Philosophy

Build a retro-futuristic (cyberpunk/vaporwave) interface with neon colors (blue, pink, cyan), deep black background, 80s aesthetic, CRT scanlines, glitch effects, neon glow text/borders, monospace fonts, geometric patterns. Use neon text-shadow and animated glitch effects.

## Color Strategy

**Primary Colors:** Neon Blue #0080FF, Hot Pink #FF006E, Cyan #00FFFF, Deep Black #1A1A2E, Purple #5D34D0

**Secondary Colors:** Metallic Silver #C0C0C0, Gold #FFD700, duotone, 80s Pink #FF10F0, neon accents

## Effects & Animation

CRT scanlines (::before overlay), neon glow (text-shadow+box-shadow), glitch effects (skew/offset keyframes)

## CSS / Technical Keywords

color: neon colors (#0080FF, #FF006E, #00FFFF), text-shadow: 0 0 10px neon, background: #000 or #1A1A2E, font-family: monospace, animation: glitch (skew+offset), filter: hue-rotate

## Implementation Checklist

- [ ] Neon colors used, - [ ] CRT scanlines effect, - [ ] Glitch animations active, - [ ] Monospace font, - [ ] Deep black background, - [ ] Glow effects applied, - [ ] 80s patterns present

## Design System Variables

```css
--neon-colors: #0080FF #FF006E #00FFFF;
--background: #000000;
--font-family: monospace;
--effect: glitch+glow;
--scanline-opacity: 0.3;
--crt-effect: true
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Dark focused
- **Performance:** ⚠ Moderate
- **Accessibility:** ⚠ High contrast/strain
- **Mobile:** ◐ Medium
- **Frameworks:** Tailwind 8/10, CSS-in-JS 9/10
