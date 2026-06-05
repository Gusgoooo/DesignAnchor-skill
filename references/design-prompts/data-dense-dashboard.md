---
name: "Data-Dense Dashboard"
slug: "data-dense-dashboard"
user_facing_direction: "数据密集"
type: "BI/Analytics"
best_for:
  - "Business intelligence dashboards"
  - "financial analytics"
  - "enterprise reporting"
  - "operational dashboards"
  - "data warehousing"
avoid_for:
  - "Marketing dashboards"
  - "consumer-facing analytics"
  - "simple reporting"
keywords:
  - "Multiple charts/widgets"
  - "data tables"
  - "KPI cards"
  - "minimal padding"
  - "grid layout"
  - "space-efficient"
  - "maximum data visibility"
density: "compact"
tone: "technical"
mode: "either"
complexity: "Medium"
era: "2020s Modern"
---

# Internal Style Prompt: Data-Dense Dashboard

## Design Philosophy

Design a data-dense dashboard. Use: multiple chart widgets, KPI cards row, data tables with sorting, minimal padding (8-12px), efficient grid layout, filter sidebar, dense but readable typography, maximum information density.

## Color Strategy

**Primary Colors:** Neutral primary (light grey/white #F5F5F5), data colors (blue/green/red), dark text #333333

**Secondary Colors:** Chart colors: success (green #22C55E), warning (amber #F59E0B), alert (red #EF4444), neutral (grey)

## Effects & Animation

Hover tooltips, chart zoom on click, row highlighting on hover, smooth filter animations, data loading spinners

## CSS / Technical Keywords

display: grid, grid-template-columns: repeat(12, 1fr), gap: 8px, padding: 12px, font-size: 12-14px, overflow: auto for tables, compact card design, sticky headers

## Implementation Checklist

- [ ] Grid layout 12 columns, - [ ] KPI cards responsive, - [ ] Tables sortable, - [ ] Filters functional, - [ ] Loading states for data, - [ ] Export functionality

## Design System Variables

```css
--grid-gap: 8px;
--card-padding: 12px;
--font-size-small: 12px;
--table-row-height: 36px;
--sidebar-width: 240px;
--header-height: 56px
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Full
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AA
- **Mobile:** ◐ Medium
- **Frameworks:** Recharts 9/10, Chart.js 9/10, D3.js 10/10
