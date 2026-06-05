# Design Anchor Skill

[English](./README.en.md)

**全流程设计 Skill。**

从第一个页面的设计落地，到第一百个页面的设计一致性，Design Anchor 覆盖设计的完整生命周期：开始、维护、审查、修改。

<p align="center">
  <img src="https://img.shields.io/npm/v/design-anchor?style=flat-square&color=0a0a0a" alt="npm" />
  <img src="https://img.shields.io/badge/Claude_Code-Agent_Skill-6B5CE7?style=flat-square" alt="Claude Code" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=0a0a0a" alt="MIT" />
</p>

---

## 全流程，不是某个环节

| 阶段 | Design Anchor 做什么 |
|---|---|
| **开始设计** | 从你的设计方向提取 token 体系，匹配风格，生成第一个高完成度页面 |
| **设计维护** | 每次 AI 写代码前读取 token、组件规范和布局原则，新页面自动对齐已有设计 |
| **设计审查** | 自动审计颜色对齐、组件质量、布局合理性、icon 一致性，12 项质量门槛全过才交付 |
| **设计修改** | 识别不达标组件和布局问题，逐页重构 UI 层，保留全部业务逻辑 |

不是生成完就不管了——是持续守护你的设计意图。

## 开始设计

还没有设计系统？Design Anchor 帮你从零建立。

- **有设计方向**：把你的品牌色、风格描述、Figma 截图转成结构化 token，AI 在这套 token 下生成每一个页面
- **还没想好**：自动匹配一套成熟的风格方向（紧凑高效、稳重可信、清爽友好、深色专注等），转 token 后直接生成
- **第一个页面就是高完成度的**：不是线框图，是带真实数据结构、交互状态、空状态设计的完整页面

```bash
npx design-anchor theme design-prompt.md   # 你的设计方向 → token
npx design-anchor sync                      # 激活治理
```

## 设计维护

AI 写 UI 最大的问题不是第一个页面，是后面的每一个页面。

Design Anchor 让 AI 每次写代码前先读取项目的 token 体系、组件约束和布局质量原则。第 50 个页面的按钮颜色、hover 状态、间距节奏和第 1 个页面一模一样——因为它们用的是同一套 token，不是 AI 临时编的。

**Token 体系对齐：**
- 所有主交互色（按钮、链接、选中态、focus 环）追溯到同一个 `primary` token
- hover / focus / disabled 从 token 派生，不是每个组件自己硬编码
- surface 层级分明（background → card → popover），border 统一，文本色分三级
- 暗色模式每个 token 都有对应值

**布局一致性：**
- 7 条设计质量原则检验每个页面的布局是否合理
- AI 自由设计最佳布局，然后用原则验证——不是套模板
- 信息层级、操作层级、密度适配、导航清晰度、状态完整性

**组件规范：**
- 所有组件操作统一走 `design-anchor add`，不引入外部 UI 库直接依赖
- 不达标组件不报告，直接替换

## 设计审查

每一个 UI 产出在交付前自动审查，12 项质量门槛全部通过才能标记完成：

1. WCAG AA 对比度
2. 所有交互元素有 hover / focus 状态
3. 空状态、加载状态、错误状态都设计过
4. 常见视口宽度不破版
5. 零硬编码颜色——全部语义 token
6. **主色全产品一致**——不同页面的按钮不能蓝得不一样
7. **交互状态统一**——hover / disabled 从 token 派生，全局一致
8. 单一 icon 库
9. 所有表单字段有可见 label
10. 破坏性操作有确认门槛
11. 键盘可达
12. 页面加载无布局跳动

还有 10 条 AI 生成物绝对禁令（四宫格指标卡、渐变文字、磨砂玻璃、彩虹状态色等）+ 二阶检测，拦截 AI 的本能输出倾向。

```bash
npx design-anchor audit   # 合规检查
```

## 设计修改

已有产品怎么办？Design Anchor 不只能从零开始，也能接住已有产品的设计治理。

预检脚本自动检测项目状态（成熟度、技术栈、组件库、icon 混用、布局信号），然后推荐治理策略：

```
布局重构（推荐）→ 逐页分析 → 整页重构 UI 层 → 保留全部业务逻辑
渐进优化        → 只修 token + 组件 → 保留现有布局
只读审计        → 扫描报告 → 不动文件
```

每个页面**单独确认**后才修改。AI 不会偷偷改你的产品。

修改范围：对齐 token 体系、统一 icon 库、替换不达标组件（sidebar / 表格 / 表单 / 弹窗 / tabs）、移除 AI slop 模式、重构不合理的布局。

## 快速开始

```bash
# 1. 安装 Skill（Claude Code 项目级）
mkdir -p .claude/skills/design-anchor
cp SKILL.md scripts/ references/ agents/ .claude/skills/design-anchor/ -r

# 2. 安装运行时
npm install -D design-anchor

# 3. 激活治理
npx design-anchor sync
```

全局安装：复制到 `~/.claude/skills/design-anchor/`

Claude.ai 上传：将 SKILL.md + scripts/ + references/ + agents/ 打包为 zip（顶层目录名为 `design-anchor`）后上传。

## 命令速查

| 命令 | 作用 |
|---|---|
| `npx design-anchor sync` | 激活治理：token CSS + AI 规则 + MCP |
| `npx design-anchor theme <prompt.md>` | 设计方向 → token 提取 |
| `npx design-anchor add <component>` | 按需安装组件 |
| `npx design-anchor audit` | 合规审查 |
| `npx design-anchor hydrate` | 重建本地控制面（clone 后） |
| `npx design-anchor portal` | 检视设计系统状态 |

## 架构

```
├── SKILL.md                        # AI 入口 — 路由、规则、设计宪法
├── scripts/
│   ├── probe-design-anchor.mjs     # 项目预检（成熟度 / 技术栈 / icon / 布局）
│   └── list-style-prompts.mjs      # 风格池元数据
├── references/
│   ├── govern-existing-product.md  # 已有产品治理手册（自包含）
│   ├── layout-governance.md        # 布局原则 + 组件标准 + 参考案例
│   ├── style-prompt-guidance.md    # 设计方向 → token 指南
│   └── ...                         # 产品上下文 / 风格匹配 / Portal 路由
└── agents/
    └── openai.yaml                 # OpenAI 适配
```

## 设计思路来源

**确定性预检。** 脚本在 AI 会话前扫描项目状态，输出结构化 JSON。AI 不猜，脚本告诉它。

**显式禁令。** 受 [Impeccable](https://github.com/pbakaus/impeccable) 启发——用宪法级规则拦截 AI 的本能输出倾向，包括一阶 slop 禁令和二阶反 slop 检测。

**自包含执行。** 关键手册内联所有知识，AI 加载一个文件跑完整个流程。同样受 Impeccable 启发。

**原则驱动。** 布局治理基于质量原则而非模板。AI 自由设计，原则验证。

**硬性门槛。** 12 项质量检查是交付前的必过关卡，不是建议。

## License

MIT
