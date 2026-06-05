---
name: "Trustworthy Enterprise"
slug: "stripe"
user_facing_direction: "稳重可信"
best_for:
  - "billing"
  - "finance"
  - "compliance"
  - "account management"
  - "enterprise settings"
avoid_for:
  - "real-time command center"
  - "playful consumer app"
keywords:
  - "invoice"
  - "payment"
  - "audit"
  - "risk"
  - "permissions"
density: "balanced"
tone: "credible, stable, precise"
mode: "light"
---

# Internal Style Prompt: Trustworthy Enterprise

## Design Philosophy

A refined, business-grade interface that communicates reliability through precision, not decoration. Every pixel serves a purpose: clear data hierarchy, trustworthy state labels, and professional polish. The aesthetic is "quiet confidence" — the UI never shouts but always feels premium. It draws from the best of enterprise fintech: crisp typography, calm surfaces, and decisive interaction patterns.

Emotional vibe: composed, authoritative, precise, reassuring. Users handle money, compliance, and permissions here — the design must earn their trust.

## Color Strategy

- Background: `#FAFAFA` — warm off-white, avoids clinical pure white
- Surface / card: `#FFFFFF` — pure white for elevated elements
- Primary: `#635BFF` — confident indigo-violet, distinctive without being playful
- Primary hover: `#5851DB` — slightly deeper, same hue family
- Secondary accent: `#0A2540` — deep navy for headers and key text
- Text primary: `#1A1F36` — near-black with slight warmth
- Text secondary: `#697386` — balanced gray, passes AA on white
- Border: `#E3E8EE` — subtle cool gray, never invisible
- Focus ring: `#635BFF` with 3px offset ring
- Success: `#30B566` — warm green, paired with `#ECFDF5` background
- Warning: `#F5A623` — amber, paired with `#FFFBEB` background
- Error: `#DF1B41` — clear red, paired with `#FEF2F4` background
- Info: `#3B82F6` — standard blue

Palette mood: cool-toned with a subtle warmth. No pure grays — everything has a slight blue or warm undertone. Color is used sparingly but precisely: the primary indigo appears only on CTAs, active states, and focus rings, making it visually impactful when it does appear.

## Typography System

- Heading: Inter or system sans-serif, weight 600-700
- Body: Inter, weight 400, 15px, line-height 1.5
- Monospace: JetBrains Mono for data, codes, amounts — 13px
- Display: 28-32px, weight 600, letter-spacing -0.02em
- H2: 20-22px, weight 600
- H3: 16px, weight 600
- Body: 15px, weight 400, line-height 24px
- Small / caption: 13px, weight 400, color text-secondary
- Amount / currency: monospace, tabular-nums, weight 500

Typographic personality: no-nonsense precision. The slight negative letter-spacing on headings creates a tighter, more professional feel. Monospace for financial data adds trust — numbers are clearly aligned and readable.

## Surface and Depth

- Shadow: soft, multi-layered. Cards use `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` — barely visible but creates clear hierarchy.
- Elevated hover: `0 4px 12px rgba(0,0,0,0.1)` — subtle lift on interactive cards.
- Border: 1px `#E3E8EE` on cards and sections. Borders are always visible — no borderless floating cards.
- Radius: 8px for cards and containers, 6px for inputs and buttons, 4px for small badges and chips.
- Surface layering: white cards on off-white background. Sections use subtle background tints (`#F6F9FC`) for visual grouping without borders.

## Component Visual Styling

- **Buttons**: Primary — `#635BFF` background, white text, 6px radius, 14px font, 500 weight, subtle shadow `0 1px 2px rgba(0,0,0,0.1)`. Press state: `#5851DB`, shadow removed. Secondary — white background, `#E3E8EE` border, dark text. Destructive — `#DF1B41` background, white text. All buttons have 36-40px height.
- **Cards**: white background, 1px `#E3E8EE` border, 8px radius, 24px padding, soft shadow. Section headers inside cards use 13px uppercase text-secondary with letter-spacing 0.05em.
- **Inputs**: white background, 1px `#E3E8EE` border, 6px radius, 36px height, 15px font. Focus: 2px `#635BFF` border with 2px offset ring. Error: `#DF1B41` border.
- **Tables**: clean lines, alternating row backgrounds (`#F6F9FC`), sortable column headers with subtle underline, row hover with `#F6F9FC` background. Amount columns right-aligned in monospace.
- **Navigation**: minimal sidebar with grouped sections, 13px uppercase labels, 15px nav items, active item has `#635BFF` text and subtle left border or background tint.

## Effects and Micro-interactions

- Animation: 150-200ms, ease-out. No spring physics — everything is crisp and immediate.
- Button press: subtle background darken, shadow removal. No scale.
- Card hover: gentle shadow increase (150ms transition).
- Loading: skeleton screens with subtle shimmer in `#E3E8EE` → `#F0F3F7` gradient.
- Toast notifications: slide in from top-right, auto-dismiss after 5s.
- Tab transitions: no animation — instant switch. Content may fade in (100ms).

## Signature Elements

1. **Monospace financial data**: all currency amounts, transaction IDs, and timestamps use monospace with tabular-nums. Creates unmistakable "financial precision" feel.
2. **Uppercase section labels**: 13px, weight 500, letter-spacing 0.05em, `#697386` color. Used as card section headers and sidebar group labels.
3. **Indigo focus rings**: 3px offset `#635BFF` focus ring visible on all interactive elements. Distinctive and accessibility-forward.
4. **Status pill badges**: small rounded-full badges with tinted backgrounds (green/amber/red/gray) and matching text, 12px font, weight 500.
5. **Clean data density**: tables and lists feel information-rich without feeling cramped. Generous cell padding (12-16px vertical) with clear separators.

## Anti-Patterns

- No gradient backgrounds or gradient text — surfaces are flat solid colors.
- No decorative illustrations or mascots in the workspace area.
- No large rounded corners (no rounded-2xl on data components).
- No colorful card backgrounds — cards are always white.
- No playful animations (no bounce, no spring, no wiggle).
- No icon-heavy navigation — text labels are primary.

## Token Extraction

Translate into Design Anchor tokens:
- `--primary`: #635BFF, `--primary-foreground`: #FFFFFF
- `--background`: #FAFAFA, `--foreground`: #1A1F36
- `--card`: #FFFFFF, `--card-foreground`: #1A1F36
- `--muted`: #F6F9FC, `--muted-foreground`: #697386
- `--border`: #E3E8EE, `--input`: #E3E8EE
- `--ring`: #635BFF
- `--destructive`: #DF1B41, `--destructive-foreground`: #FFFFFF
- `--radius`: 0.5rem (8px)
