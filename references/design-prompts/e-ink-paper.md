---
name: "E-Ink / Paper"
slug: "e-ink-paper"
user_facing_direction: "电子墨水"
type: "General"
best_for:
  - "Reading apps"
  - "digital newspapers"
  - "minimal journals"
  - "distraction-free writing"
  - "slow-living brands"
avoid_for:
  - "Gaming"
  - "video platforms"
  - "high-energy marketing"
  - "dark mode dependent apps"
keywords:
  - "Paper-like"
  - "matte"
  - "high contrast"
  - "texture"
  - "reading"
  - "calm"
  - "slow tech"
  - "monochrome"
density: "balanced"
tone: "modern"
mode: "light"
complexity: "Low"
era: "2020s Digital Well-being"
---

# Internal Style Prompt: E-Ink / Paper

## Design Philosophy

Design an e-ink/paper style interface. Use: high contrast black on off-white, paper texture, no animations (instant transitions), reading-focused, minimal UI chrome, distraction-free, calm aesthetic, monochrome.

## Color Strategy

**Primary Colors:** Off-White #FDFBF7, Paper White #F5F5F5, Ink Black #1A1A1A

**Secondary Colors:** Pencil Grey #4A4A4A, Highlighter Yellow #FFFF00 (accent)

## Effects & Animation

No motion blur, distinct page turns, grain/noise texture, sharp transitions (no fade)

## CSS / Technical Keywords

background: #FDFBF7 (paper white), color: #1A1A1A, transition: none, font-family: serif for reading, no gradients, border: 1px solid #E0E0E0, texture overlay (noise)

## Implementation Checklist

- [ ] Paper background color, - [ ] High contrast text, - [ ] No animations, - [ ] Reading optimized, - [ ] Distraction-free, - [ ] Print-friendly

## Design System Variables

```css
--paper-bg: #FDFBF7;
--ink-color: #1A1A1A;
--pencil-grey: #4A4A4A;
--border-color: #E0E0E0;
--font-reading: Georgia;
--transition: none
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✗ Low (inverted only)
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AAA
- **Mobile:** ✓ High
- **Frameworks:** Tailwind 10/10, CSS 10/10
