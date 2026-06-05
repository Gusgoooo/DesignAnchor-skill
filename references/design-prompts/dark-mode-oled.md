---
name: "Dark Mode (OLED)"
slug: "dark-mode-oled"
user_facing_direction: "OLED 暗黑"
type: "General"
best_for:
  - "Night-mode apps"
  - "coding platforms"
  - "entertainment"
  - "eye-strain prevention"
  - "OLED devices"
  - "low-light"
avoid_for:
  - "Print-first content"
  - "high-brightness outdoor"
  - "color-accuracy-critical"
keywords:
  - "Dark theme"
  - "low light"
  - "high contrast"
  - "deep black"
  - "midnight blue"
  - "eye-friendly"
  - "OLED"
  - "night mode"
density: "balanced"
tone: "friendly"
mode: "dark"
complexity: "Low"
era: "2020s Modern"
---

# Internal Style Prompt: Dark Mode (OLED)

## Design Philosophy

Create an OLED-optimized dark interface with deep black (#000000), dark grey (#121212), midnight blue accents. Use minimal glow effects, vibrant neon accents (green, blue, gold, purple), high contrast text. Optimize for eye comfort and OLED power saving.

## Color Strategy

**Primary Colors:** Deep Black #000000, Dark Grey #121212, Midnight Blue #0A0E27

**Secondary Colors:** Vibrant accents: Neon Green #39FF14, Electric Blue #0080FF, Gold #FFD700, Plasma Purple #BF00FF

## Effects & Animation

Minimal glow (text-shadow: 0 0 10px), dark-to-light transitions, low white emission, high readability, visible focus

## CSS / Technical Keywords

background: #000000 or #121212, color: #FFFFFF or #E0E0E0, text-shadow: 0 0 10px neon-color (sparingly), filter: brightness(0.8) if needed, color-scheme: dark

## Implementation Checklist

- [ ] Deep black #000000 or #121212, - [ ] Vibrant neon accents used, - [ ] Text contrast 7:1+, - [ ] Minimal glow effects, - [ ] OLED power optimization, - [ ] No white (#FFFFFF) background

## Design System Variables

```css
--bg-black: #000000;
--bg-dark-grey: #121212;
--text-primary: #FFFFFF;
--accent-neon: neon colors;
--glow-effect: minimal;
--oled-optimized: true
```

## Compatibility

- **Light Mode:** ✗ No
- **Dark Mode:** ✓ Only
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AAA
- **Mobile:** ✓ High
- **Frameworks:** Tailwind 10/10, MUI 10/10, Chakra 10/10
