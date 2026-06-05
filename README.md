# Design Anchor

[English](./README.en.md)

**全流程设计 Skill——适合长期项目的设计 skill**

<p align="center">
  <img src="https://img.shields.io/npm/v/design-anchor?style=flat-square&color=0a0a0a" alt="npm" />
  <img src="https://img.shields.io/badge/Claude_Code-Agent_Skill-6B5CE7?style=flat-square" alt="Claude Code" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=0a0a0a" alt="MIT" />
</p>

从第一个页面的设计落地，到第一百个页面的设计一致性，Design Anchor 覆盖设计的完整生命周期。不是生成完就不管了——是持续守护你的设计意图。

---

## 为什么需要 Design Anchor

AI 生成 UI 有一个核心矛盾：**第一个页面很惊艳，第十个页面就开始走样。**

按钮的蓝色在不同页面微妙偏移，hover 状态各自硬编码，icon 库混着三四套，布局从 dashboard 到 settings 全是一个模子。这不是 AI 不够聪明——而是它没有持久的设计记忆。

Design Anchor 给 AI 装上这份记忆：token 体系锁住关键色、风格 prompt 驱动视觉方向、布局原则保证每个页面的结构合理性。

---

## 全流程覆盖

| 阶段 | 做什么 |
|---|---|
| **开始** | 从设计方向提取 token → 匹配风格 → 生成第一个高完成度页面 |
| **维护** | AI 写代码前读 token + 风格 prompt + 布局原则，新页面自动对齐 |
| **审查** | 13 项质量门槛自动审计，全过才交付 |
| **修改** | 逐页分析 → 整页重构 UI 层 → 保留业务逻辑 |

---

## 开始设计

```bash
npx design-anchor theme design-prompt.md   # 设计方向 → token
npx design-anchor sync                      # 激活治理
```

三种入口：

- **有设计方向** — 品牌色、风格描述、Figma 截图 → 结构化 token，AI 在这套 token 下生成每一个页面
- **还没想好** — 自动从 26 套内置风格中匹配（紧凑高效 / 稳重可信 / 清爽友好 / 深色专注……），转 token 后直接生成
- **已有产品** — 预检脚本扫描项目状态，推荐治理策略，逐页重构

第一个页面就是高完成度的——不是线框图，是带真实数据结构、交互状态、空状态设计的完整页面。

---

## 设计治理体系

### Token 治理

**只管结构色，不碰装饰色。**

| 治理范围 | 自由范围 |
|---|---|
| 主交互色 → `primary` token | 装饰性渐变、阴影 |
| hover / focus / disabled 从 token 派生 | 页面特有的背景色调 |
| 状态色（成功/警告/错误/信息）全产品一致 | 插图、数据可视化配色 |
| CTA 颜色对齐 | 所有非结构性的视觉设计 |

### 组件策略

| 类型 | 策略 | 原因 |
|---|---|---|
| **功能型** — dialog, command, select, tabs, popover, sheet, tooltip | `design-anchor add` 安装 | 需要 focus trap、键盘导航、ARIA，手写容易出错 |
| **展示型** — 卡片、导航外观、数据展示、hero、表格、表单布局 | AI 根据风格 prompt 自由设计 | 视觉多样性是设计品质的来源 |

展示型组件优先参考开源 blocks（shadcn blocks / shadcn-admin / Kibo UI / Launch UI 等）作为结构起点，再用风格 prompt 全面定制视觉。

### 布局治理

基于 7 条设计质量原则，不是套模板：

> 目的-布局匹配 · 信息层级 · 操作层级 · 密度适配 · 空间效率 · 导航清晰 · 状态完整

AI 自由设计最佳布局，然后用原则验证。

### AI 模式觉察

不是绝对禁令——有意图地使用没问题，拦截的是 AI 无意识的默认输出：

四宫格指标卡 · 渐变文字 · 无目的磨砂玻璃 · 彩虹状态色 · 装饰性 icon · 千篇一律的圆角卡片……

---

## 设计审查

13 项质量门槛，全过才能标记完成：

| # | 门槛 |
|---|---|
| 1 | 视觉完成度——精致有品质感，不是线框图 |
| 2 | WCAG AA 对比度 |
| 3 | 所有交互元素有 hover / focus 状态 |
| 4 | 空状态、加载状态、错误状态都设计过 |
| 5 | 常见视口宽度不破版 |
| 6 | 关键色统一——结构色 token 对齐 |
| 7 | 主色全产品一致——不同页面的按钮同色 |
| 8 | 交互状态统一——hover / disabled 全局一致 |
| 9 | 单一 icon 库 |
| 10 | 所有表单字段有可见 label |
| 11 | 破坏性操作有确认门槛 |
| 12 | 键盘可达 |
| 13 | 页面加载无布局跳动 |

```bash
npx design-anchor audit
```

---

## 已有产品治理

预检脚本自动检测项目状态（成熟度、技术栈、组件库、icon 混用、布局信号），推荐治理策略：

```
布局重构（推荐）→ 逐页分析 → 整页重构 UI 层 → 保留全部业务逻辑
渐进优化        → 只修 token + 功能型组件 → 保留现有布局
只读审计        → 扫描报告 → 不动文件
```

每个页面**单独确认**后才修改。

---

## 快速开始

```bash
# 安装 Skill（Claude Code 项目级）
mkdir -p .claude/skills/design-anchor
cp SKILL.md scripts/ references/ agents/ .claude/skills/design-anchor/ -r

# 安装运行时
npm install -D design-anchor

# 激活治理
npx design-anchor sync
```

> 全局安装：复制到 `~/.claude/skills/design-anchor/`
>
> Claude.ai 上传：打包为 zip（顶层目录名 `design-anchor`）后上传

---

## 命令速查

| 命令 | 作用 |
|---|---|
| `npx design-anchor sync` | 激活治理：token CSS + AI 规则 + MCP |
| `npx design-anchor theme <prompt.md>` | 设计方向 → token |
| `npx design-anchor add <component>` | 按需安装功能型组件 |
| `npx design-anchor audit` | 合规审查 |
| `npx design-anchor hydrate` | 重建 `.anchor/`（clone 后） |
| `npx design-anchor portal` | 检视设计系统 |

---

## 架构

```
├── SKILL.md                        # AI 入口——路由、规则、渲染管线
├── scripts/
│   ├── probe-design-anchor.mjs     # 项目预检
│   └── list-style-prompts.mjs      # 风格池元数据
├── references/
│   ├── govern-existing-product.md  # 已有产品治理（自包含）
│   ├── layout-governance.md        # 布局原则 + 组件策略
│   ├── style-prompt-guidance.md    # 风格 prompt → token
│   ├── design-prompt-pool.md       # 风格池格式规范
│   └── design-prompts/             # 26 套内置风格方向
└── agents/
    └── openai.yaml                 # OpenAI 适配
```

---

## 设计思路

**确定性预检** — 脚本在 AI 会话前扫描项目，输出结构化 JSON。AI 不猜，脚本告诉它。

**模式觉察** — 受 [Impeccable](https://github.com/pbakaus/impeccable) 启发。不是硬性禁令，而是让 AI 意识到自己的默认输出倾向。

**自包含执行** — 关键手册内联所有知识，AI 加载一个文件跑完整个流程。

**原则驱动** — 布局治理基于质量原则而非模板。AI 自由设计，原则验证。

---

MIT
