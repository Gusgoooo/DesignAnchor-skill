---
name: "AI-Native UI"
slug: "ai-native-ui"
user_facing_direction: "AI 原生"
type: "General"
best_for:
  - "AI products"
  - "chatbots"
  - "voice assistants"
  - "copilots"
  - "AI-powered tools"
  - "conversational interfaces"
avoid_for:
  - "Traditional forms"
  - "data-heavy dashboards"
  - "print-first content"
keywords:
  - "Chatbot"
  - "conversational"
  - "voice"
  - "assistant"
  - "agentic"
  - "ambient"
  - "minimal chrome"
  - "streaming text"
density: "balanced"
tone: "modern"
mode: "either"
complexity: "Low"
era: "2020s AI-Era"
---

# Internal Style Prompt: AI-Native UI

## Design Philosophy

Design an AI-native interface. Use: minimal chrome, conversational layout, streaming text area, typing indicators (3-dot pulse), context cards, subtle AI accent color (#6366F1), clean input field, response bubbles.

## Color Strategy

**Primary Colors:** Neutral + single accent, #6366F1 (AI Purple), #10B981 (Success), #F5F5F5 (Background)

**Secondary Colors:** Status indicators, streaming highlights, context card colors, subtle accent variations

## Effects & Animation

Typing indicators (3-dot pulse), streaming text animations, pulse animations, context cards, smooth reveals

## CSS / Technical Keywords

chat bubble layout (flex-direction: column), typing animation (3 dots pulse), streaming text (overflow: hidden + animation), input: sticky bottom, context cards (border-left accent), minimal borders

## Implementation Checklist

- [ ] Chat layout responsive, - [ ] Typing indicator smooth, - [ ] Input always visible, - [ ] Context cards styled, - [ ] AI responses distinct, - [ ] User messages aligned right

## Design System Variables

```css
--ai-accent: #6366F1;
--user-bubble-bg: #E0E7FF;
--ai-bubble-bg: #F9FAFB;
--input-height: 48px;
--typing-dot-size: 8px;
--message-gap: 16px
```

## Compatibility

- **Light Mode:** ✓ Full
- **Dark Mode:** ✓ Full
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AA
- **Mobile:** ✓ High
- **Frameworks:** Tailwind 10/10, React 10/10
