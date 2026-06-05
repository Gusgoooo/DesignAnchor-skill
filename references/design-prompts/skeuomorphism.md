---
name: "Skeuomorphism"
slug: "skeuomorphism"
user_facing_direction: "拟物设计"
type: "General"
best_for:
  - "Legacy apps"
  - "gaming"
  - "immersive storytelling"
  - "premium products"
  - "luxury"
  - "realistic simulations"
avoid_for:
  - "Modern enterprise"
  - "critical accessibility"
  - "low-performance"
  - "web (use Flat/Modern)"
keywords:
  - "Realistic"
  - "texture"
  - "depth"
  - "3D appearance"
  - "real-world metaphors"
  - "shadows"
  - "gradients"
  - "tactile"
density: "balanced"
tone: "modern"
mode: "light"
complexity: "High"
era: "2007-2012 iOS"
---

# Internal Style Prompt: Skeuomorphism

## Design Philosophy

Design a realistic, textured interface with 3D depth, real-world metaphors (leather, wood, metal), complex gradients (8-12 stops), realistic shadows, grain/texture overlays, tactile press animations. Perfect for premium/luxury products.

## Color Strategy

**Primary Colors:** Rich realistic: wood, leather, metal colors, detailed gradients (8-12 stops), metallic effects

**Secondary Colors:** Realistic lighting gradients, shadow variations (30-50% darker), texture overlays, material colors

## Effects & Animation

Realistic shadows (layers), depth (perspective), texture details (noise, grain), realistic animations (300-500ms)

## CSS / Technical Keywords

background: complex gradient (8-12 stops), box-shadow: realistic multi-layer, background-image: texture overlay (noise, grain), filter: drop-shadow, transform: scale on press (300-500ms)

## Implementation Checklist

- [ ] Realistic textures applied, - [ ] Complex gradients 8-12 stops, - [ ] Multi-layer shadows, - [ ] Texture overlays present, - [ ] Tactile animations smooth, - [ ] Depth effect pronounced

## Design System Variables

```css
--gradient-stops: 8-12;
--texture-overlay: noise+grain;
--shadow-layers: 3+;
--animation-duration: 300-500ms;
--depth-effect: pronounced;
--tactile: true
```

## Compatibility

- **Light Mode:** ◐ Partial
- **Dark Mode:** ◐ Partial
- **Performance:** ❌ Poor
- **Accessibility:** ⚠ Textures reduce readability
- **Mobile:** ✗ Low
- **Frameworks:** CSS-in-JS 7/10, Custom 8/10
