<div align="center">

# Design Anchor

**把 AI UI 从第一屏的灵感，固定成第一百屏的秩序。**

<br/>

<p>
  <img src="https://img.shields.io/npm/v/design-anchor?style=flat-square&color=0a0a0a" alt="npm" />
  <img src="https://img.shields.io/badge/Claude_Code-Agent_Skill-6B5CE7?style=flat-square" alt="Claude Code" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=0a0a0a" alt="MIT" />
</p>

<br/>

<h3>Design Anchor 是 design-anchor npm runtime 的 AI Skill 层<br/>先建立 token 基座，再把页面做漂亮、做一致、做可维护</h3>

<br/>

[English](./README.en.md)

</div>

---

## 一句话

Design Anchor 不是让 AI 偶然生成一个好看的页面，而是让 AI 在长期项目里持续读取同一套 token、组件边界、布局原则和质量门槛。

开始时，它先帮你建立 `design-tokens.json` token 基座并定设计方向；维护时，它守住结构色、组件来源和布局一致性；审查时，它发现漂移；修改时，它能整页治理，但不乱动业务逻辑。

完整 runtime 体验面向 **React + Tailwind Web 产品项目**。其他技术栈也可以使用它的设计诊断、token 思路、布局治理和视觉打磨方法，但 runtime / component 安装会先按技术栈确认。

---

## 产品结构大图

```mermaid
flowchart TB
  Request["用户需求<br/>新页面 / 风格 prompt / 已有产品治理"] --> Skill["SKILL.md<br/>需求分类与执行规则"]

  Skill --> Probe["预检脚本<br/>probe-design-anchor.mjs"]
  Skill --> Prompt["风格匹配<br/>list-style-prompts.mjs + design-prompts"]
  Skill --> Guides["按需手册<br/>layout / style / product / existing"]

  Probe --> Mode["治理模式<br/>布局重构 / 渐进优化 / 只读审计"]
  Prompt --> Theme["theme<br/>风格 prompt -> tokens"]
  Guides --> Pipeline["页面渲染管线<br/>布局蓝图 -> 组件填充 -> 风格绘制"]
  Mode --> Pipeline

  subgraph Runtime["npm runtime: design-anchor"]
    Baseline["token baseline<br/>install/sync -> design-tokens.json"]
    Theme
    Sync["sync<br/>.anchor / CSS / rules mirror"]
    Add["add<br/>功能型组件"]
    Audit["audit<br/>13 项质量门槛"]
    Portal["portal<br/>按需检查设计系统"]
    Govern["govern<br/>可选 AI bridge"]
  end

  Skill --> Baseline
  Baseline --> Theme
  Baseline --> Pipeline
  Pipeline --> Sync
  Pipeline --> Add
  Sync --> Artifacts["项目产物<br/>design-tokens.json / .anchor CSS / src/components"]
  Add --> Artifacts
  Govern --> Artifacts
  Artifacts --> UI["长期一致的产品 UI"]
  Audit --> UI
  Portal -.-> UI

  classDef core fill:#0a0a0a,stroke:#0a0a0a,color:#ffffff;
  classDef soft fill:#f8fafc,stroke:#cbd5e1,color:#0f172a;
  classDef runtime fill:#eef2ff,stroke:#6366f1,color:#111827;
  classDef output fill:#ecfdf5,stroke:#10b981,color:#064e3b;
  class Skill core;
  class Request,Probe,Prompt,Guides,Mode,Pipeline soft;
  class Baseline,Theme,Sync,Add,Audit,Portal,Govern runtime;
  class Artifacts,UI output;
```

---

## 它解决什么

AI 生成 UI 最大的问题不是第一页不够惊艳，而是长期项目会慢慢失控：按钮颜色微妙偏移、hover 状态各自硬编码、icon 库混用、布局越来越像默认模板。

Design Anchor 给 AI 加上一层稳定的设计记忆：

| 设计问题 | Design Anchor 怎么处理 |
|---|---|
| 一开始没有设计基座 | 先安装并 sync runtime，建立 `design-tokens.json` token 系统 |
| 风格输入很散 | 把用户 prompt 或内置风格方向提取成 token |
| 页面越做越不一致 | 结构色、交互态、状态色统一走 token |
| 组件要好看又要可用 | 功能型组件走运行时，展示型组件交给 AI 自由设计 |
| 已有产品不能乱改 | 先预检，再让用户选择治理模式 |
| 用户不知道下一步该做什么 | 像设计负责人一样判断阶段，主动建议下一步设计动作 |
| 页面 token 合规但不好看 | 继续做无新增依赖的视觉修复，直到像专业产品页面 |
| 生成完缺少验收 | 用 13 项质量门槛审查视觉、布局、token、交互和可访问性 |

---

## 设计师式引导

Design Anchor 不是被动等用户说 `theme`、`add`、`audit`。它会先判断项目阶段，再给出下一步建议：新产品先建立 token 基座，再定风格和第一张可用页面；成熟产品先做只读诊断并推荐布局重构；单页问题先处理信息层级和响应式；组件缺失时先复用已有能力，必要时才安装最小交互原语。

它会主动说清楚三件事：**建议先做什么、这轮改到什么范围、是否需要新增依赖**。只有整页重构、root-level AI bridge、Portal 主流程或新增依赖这类会扩大范围的动作，才要求用户明确确认。

最重要的是，它不会把“token 合规”当成交付完成。页面必须有明确的视觉层级、风格 personality、精致的表面/间距/字体处理和完整状态；如果治理后页面变平、变灰、像默认模板，就继续做视觉修复。

视觉修复借鉴 Figma design system workflow 的方法：先发现现有视觉语言，先定 foundations，再逐个区域打磨并验证；但不引入 Figma 工具链，也不新增依赖。

## 五种工作流

| 场景 | Skill 会怎么做 | 关键产物 |
|---|---|---|
| **有清晰设计方向** | 先建立 token 基座，保存 prompt，运行 `theme` 抽取 token，再按视觉方向生成页面 | `design-tokens.json`、本地生成 CSS、设计一致的页面 |
| **只有产品想法** | 先建立 token 基座，再从内置风格池匹配方向，不暴露内部 preset 名称，直接转 token | 适合场景的风格源 + 首个高完成度页面 |
| **已有成熟产品** | 先预检，再让用户选择 `布局重构`、`渐进优化` 或 `只读审计` | 逐页治理计划和确认后的 UI 改造 |
| **不知道下一步** | 主动判断当前最该做的是首屏、重构、响应式、暗色、审计还是 Portal 检查 | 一条带原因和范围的设计建议 |
| **设计系统检查** | 仅在用户明确要看时打开 Portal | tokens、组件、规则和文档检查面板 |

---

## 治理边界

### 适合的技术栈

Design Anchor runtime 的完整体验面向 **React + Tailwind 的 Web 产品项目**。Skill 本身可以用于更广的设计诊断和视觉治理建议，但 runtime / component 安装要按技术栈判断。

| 技术栈 | 适配程度 | 安装策略 |
|---|---|---|
| Next.js / Vite React / Remix / React Router + Tailwind | 完整支持 | 实现 UI 前先建立 token 基座：安装 runtime + `sync`；缺少功能型交互时再 `add`。 |
| React 但没有 Tailwind | 部分支持 | 先确认是否愿意接入 token CSS / Tailwind；默认不安装组件。 |
| Astro + React islands + Tailwind | 部分支持 | 只在 React island 内按需接入；先确认再安装。 |
| Vue / Nuxt / Svelte / SvelteKit / Angular / Solid / 纯 HTML/CSS | 默认只做设计治理建议 | 不默认安装 runtime 或组件；需要时先做适配方案。 |
| React Native / Flutter / 原生移动端 / 后端仓库 | 非直接 runtime 目标 | 不安装；可使用 prompt、token、布局和视觉原则做设计指导。 |

简单判断：**React + Tailwind 项目可以优先安装；其他栈先问清楚再装；非 Web UI 不装。**

### Token 只管结构，不抹掉个性

| 必须治理 | 保持自由 |
|---|---|
| 主按钮、链接、active、focus 使用 `primary` token | 装饰性渐变、插图色、局部背景 |
| 成功、警告、错误、信息使用语义 token | 数据可视化配色 |
| hover / disabled 从基础 token 派生 | 页面级氛围、阴影、质感 |
| 基础文字色统一 | 风格 prompt 里的 signature elements |

治理的目标是**更精致、更统一**，不是把页面压成黑白线框。

### 功能型组件走运行时，展示型组件自由设计

| 类型 | 策略 | 例子 |
|---|---|---|
| **功能型组件** | 先判断诉求和已有组件；缺少可访问交互原语时才 `npx design-anchor add <component>` | dialog、command、select、popover、sheet、tooltip、tabs |
| **展示型组件** | AI 根据风格 prompt 自由设计 | 卡片、导航外观、表格布局、数据区、hero、表单排布 |

功能型组件负责可访问性、键盘交互、focus trap、ARIA；但安装不是默认动作。只读审计、文档说明、轻量样式调整、已有可访问组件可复用时，都不安装新组件。视觉表现和页面气质仍由风格 prompt 与 AI 设计判断决定。

### 依赖默认做减法

Design Anchor 的默认姿态是**token 基座之外零新增依赖**：React + Tailwind 实现任务先建立 runtime/token 基座，然后复用项目已有组件、图标库、动效、表格、图表和表单能力。只有真实 UI 任务缺少可访问交互原语时，才安装最小的 `design-anchor add <component>`。外部 block 优先作为结构参考，只有兼容项目、能明显减少布局/响应式工作，并且不会带来一串新依赖时才引入。

### Skill 本身不往项目里塞文件

Design Anchor Skill 只负责判断、引导和调用 runtime。它自己不新增 helper、wrapper、docs、临时文件或重复设计系统文件。用户项目里可能新增的内容只来自 `design-anchor` CLI：

真实项目检测时，默认先做预检和只读判断，不写文件。只有当项目是 React + Tailwind 且用户目标是实现 UI / token / 组件 / 治理时，才把 runtime/token baseline 作为第一步；其他技术栈或 test-only 场景先说明适配方案，不默认安装。

| 触发动作 | 可能新增 / 修改 | 默认提交策略 |
|---|---|---|
| 预检 / 建议 / 只读审计 | 无 | 无需提交 |
| 建立 token 基座 | `package.json`、lockfile、`node_modules/`、`design-tokens.json`、`.anchor/`、生成 CSS | 提交 manifest/lockfile 和 token 源，不提交 `node_modules/`，`.anchor/` 默认不提交 |
| `sync` / `hydrate` | `design-tokens.json`、`.anchor/`、`.anchor/design-tokens.generated.css` | 提交 `design-tokens.json`，`.anchor/` 默认不提交 |
| `theme` | `.anchor/design-prompt.md`、`.anchor/` 内 active prompt 规则、token 更新 | 默认只提交 token 源 |
| `add <component>` | `src/components/` 下最小功能型组件源码 | 只有 app 实际使用时提交 |
| `govern` | `AGENTS.md`、`CLAUDE.md`、Cursor / MCP bridge 等 | 仅团队明确要共享时提交 |
| `portal` / `audit` | 不直接新增业务 UI 源码 | 无需提交 |

每次真实项目实现后，Skill 都应该说明本轮实际新增 / 修改了什么、哪些 `.anchor/` 生成文件没有提交、是否引入了依赖或组件源码。

### 布局靠原则，不靠模板

布局第一步先判断页面性质：大多数产品页都是 **Functional（工具型）**，例如 dashboard、chat、settings、data table、agent workspace；只有 landing、pricing、product tour 这类页面才是 **Showcase（展示型）**。工具型页面不能被风格 prompt 带成营销页：不加无意义 hero、不塞 feature cards、不写 CTA 式文案。

Design Anchor 用 7 条原则判断页面是否真的适合当前产品：

| 原则 | 检查问题 |
|---|---|
| 目的-布局匹配 | 这个页面的空间结构是否服务主要任务？ |
| 信息层级 | 用户 2 秒内能否看到最重要内容？ |
| 操作层级 | 高频操作是否一眼可达？ |
| 密度适配 | 密度是为任务服务，还是只是装饰？ |
| 空间效率 | 去掉这个模块，用户会不会真的少了什么？ |
| 导航清晰 | 用户跳进这个页面后能否知道自己在哪？ |
| 状态完整 | 空、加载、错误、成功状态是否都设计过？ |

---

## 快速开始

### 安装 Skill

项目级安装：

```bash
mkdir -p .claude/skills/design-anchor
cp -R SKILL.md scripts references agents .claude/skills/design-anchor/
```

个人全局安装：

```bash
mkdir -p ~/.claude/skills/design-anchor
cp -R SKILL.md scripts references agents ~/.claude/skills/design-anchor/
```

Claude.ai 上传时，把顶层目录命名为 `design-anchor` 后再打包；压缩包内部应该是 `design-anchor/SKILL.md`，不要让 `SKILL.md` 直接位于 zip 根目录。

### 建立 token 基座

在 React + Tailwind 目标产品项目里，只要进入实际 UI / theme / token / 组件 / 治理实现，就先安装并激活 runtime，让项目从一开始就有 `design-tokens.json` token 系统。其他技术栈先按上面的适配表判断，只读预检、建议或审计不需要安装：

```bash
npm install -D design-anchor
npx design-anchor sync
```

如果你使用其他包管理器：

| 包管理器 | 安装 | 激活 |
|---|---|---|
| pnpm | `pnpm add -D design-anchor` | `pnpm exec design-anchor sync` |
| yarn | `yarn add -D design-anchor` | `yarn design-anchor sync` |
| bun | `bun add -d design-anchor` | `bunx design-anchor sync` |

> `probe-design-anchor.mjs` 应该在目标产品根目录运行。对这个 skill 仓库本身运行时，它会把仓库当作普通消费项目扫描，因此会出现“缺少 package.json / 建议安装 runtime”的提示；这不是 skill 损坏。

---

## 命令速查

| 命令 | 作用 |
|---|---|
| `npx design-anchor sync` | 后台激活治理：`.anchor`、token CSS、Tailwind 扩展、本地规则镜像 |
| `npx design-anchor govern` | 可选注入 root-level AI bridge：AGENTS、CLAUDE、Cursor、MCP |
| `npx design-anchor theme <prompt.md>` | 从设计方向提取 token |
| `npx design-anchor add <component>` | 仅在缺少可访问交互原语时安装最小功能型组件 |
| `npx design-anchor audit` | 运行设计合规审查 |
| `npx design-anchor hydrate` | clone 后重建本地 `.anchor/` |
| `npx design-anchor portal` | 按需查看设计系统，不作为普通 UI 生成入口 |

---

## 交付物边界

| 层级 | 路径 | 是否提交 |
|---|---|---|
| Token 源文件 | `design-tokens.json` | 提交 |
| 生成 CSS | `.anchor/design-tokens.generated.css` | 默认不提交，可重建 |
| 功能型组件源码 | `src/components/` | 按需提交 |
| AI bridge | `AGENTS.md` / `CLAUDE.md` / `.cursor/rules/` / MCP config | 仅在团队决定共享时提交 |
| 本地控制面 | `.anchor/` | 不提交，可由 `sync` / `hydrate` 重建 |

业务代码只从 `@design` 或 `@/components` 引入组件，不从 `.anchor/` 或 `node_modules/design-anchor/` 深层路径导入。

---

## 目录结构

```text
design-anchor/
├── SKILL.md                        # AI 入口：分类、路由、按需加载
├── agents/
│   └── openai.yaml                 # OpenAI agent metadata
├── scripts/
│   ├── probe-design-anchor.mjs     # 项目预检：成熟度、技术栈、icon、布局信号
│   └── list-style-prompts.mjs      # 风格池 metadata
└── references/
    ├── project-contract.md         # 文件边界、source/consumer 判断
    ├── component-decision.md       # 组件安装、依赖预算、文件边界
    ├── quality-bar.md              # 视觉、响应式、可访问性、token 质量门槛
    ├── page-rendering-pipeline.md  # 页面渲染三阶段与 block 决策
    ├── govern-existing-product.md  # 已有产品治理流程
    ├── layout-governance.md        # 布局原则、组件策略、icon 规则
    ├── product-context.md          # 产品类型和页面目的
    ├── style-source-selection.md   # 风格来源选择
    ├── style-prompt-guidance.md    # 风格 prompt -> token 指南
    ├── visual-craft.md             # 借鉴设计系统流程的视觉打磨手册
    ├── design-prompt-pool.md       # 内置风格池格式
    ├── portal-routing.md           # Portal 使用时机
    └── design-prompts/             # 26 套内置风格方向
```

---

## 内置风格池

风格文件位于 `references/design-prompts/`。每个文件都带 frontmatter，用于匹配产品类型、密度、语气和明暗模式。

新增风格时，至少包含这些字段：

```yaml
---
name: "Internal Name"
slug: "stable-slug"
user_facing_direction: "给用户看的风格方向"
best_for:
  - "适合的产品或场景"
keywords:
  - "匹配关键词"
density: "compact | balanced | spacious | command-center"
tone: "focused, trustworthy, friendly"
mode: "light | dark | mixed | either"
---
```

内部 prompt 名称不直接展示给用户；对外只表达产品化的风格方向。

---

## 质量门槛

每次 UI 修改后都应通过 13 项自检：

| # | 门槛 |
|---|---|
| 1 | 视觉完成度高，不是线框图或默认模板 |
| 2 | 文本满足 WCAG AA 对比度 |
| 3 | 所有交互元素有 hover / focus |
| 4 | 空、加载、错误状态完整 |
| 5 | 320、768、1024、1440px 常见视口不破版 |
| 6 | 结构色使用语义 token |
| 7 | 主色在全产品一致 |
| 8 | hover、focus、disabled 派生一致 |
| 9 | 单一 icon 库 |
| 10 | 表单字段有可见 label |
| 11 | 破坏性操作有确认门槛 |
| 12 | 键盘可达 |
| 13 | 页面加载无布局跳动 |

---

## 设计思路

**确定性预检**：脚本在 AI 会话前扫描项目，输出结构化 JSON，让 AI 少猜一点。

**渐进加载**：`SKILL.md` 负责路由，references 只在相关场景加载，避免上下文被一次性塞满。

**模式觉察**：受 [Impeccable](https://github.com/pbakaus/impeccable) 启发，拦截的是 AI 无意识默认输出，不是禁止有意图的设计选择。

**原则驱动**：布局治理基于质量原则，而不是固定模板。AI 可以自由设计，但必须能解释为什么这样布局。

---

MIT
