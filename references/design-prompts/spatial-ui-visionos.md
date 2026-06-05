---
name: "Spatial UI (VisionOS)"
slug: "spatial-ui-visionos"
user_facing_direction: "空间界面"
type: "General"
best_for:
  - "Spatial computing apps"
  - "VR/AR interfaces"
  - "immersive media"
  - "futuristic dashboards"
avoid_for:
  - "Text-heavy documents"
  - "high-contrast requirements"
  - "non-3D capable devices"
keywords:
  - "Glass"
  - "depth"
  - "immersion"
  - "spatial"
  - "translucent"
  - "gaze"
  - "gesture"
  - "apple"
density: "compact"
tone: "modern"
mode: "either"
complexity: "High"
era: "2024 Spatial Era"
---

# Internal Style Prompt: Spatial UI (VisionOS)

## Design Philosophy

Design a VisionOS-style spatial interface. Use: frosted glass panels, depth layers, translucent backgrounds (15-30% opacity), vibrant colors for active states, gaze-hover effects, floating windows, immersive feel.

## Color Strategy

**Primary Colors:** Frosted Glass #FFFFFF (15-30% opacity), System White

**Secondary Colors:** Vibrant system colors for active states, deep shadows for depth

## Effects & Animation

Parallax depth, dynamic lighting response, gaze-hover effects, smooth scale on focus

## CSS / Technical Keywords

backdrop-filter: blur(40px) saturate(180%), background: rgba(255,255,255,0.2), border-radius: 24px, box-shadow: 0 8px 32px rgba(0,0,0,0.1), transform: scale on focus, depth via shadows

## Implementation Checklist

- [ ] Glass effect visible, - [ ] Depth layers clear, - [ ] Hover states defined, - [ ] Colors vibrant on active, - [ ] Floating feel achieved, - [ ] Contrast maintained

## Design System Variables

```css
--glass-bg: rgba(255,255,255,0.2);
--glass-blur: 40px;
--glass-saturate: 180%;
--window-radius: 24px;
--depth-shadow: 0 8px 32px rgba(0,0,0,0.1);
--focus-scale: 1.02
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Full
- **Performance:** ⚠ Moderate (blur cost)
- **Accessibility:** ⚠ Contrast risks
- **Mobile:** ✓ High (if adapted)
- **Frameworks:** SwiftUI, React (Three.js/Fiber)
