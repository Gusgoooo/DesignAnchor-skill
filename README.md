# Design Anchor Skill

[English](./README.en.md)

**你的设计系统终于能管住 AI 了。**

Design Anchor 在 AI 写第一行代码之前，就接住你的品牌色、间距、组件规范和布局原则。写完之后自动审计。从第 1 个页面到第 100 个页面，看起来像同一位设计师的作品。

<p align="center">
  <img src="https://img.shields.io/npm/v/design-anchor?style=flat-square&color=0a0a0a" alt="npm" />
  <img src="https://img.shields.io/badge/Claude_Code-Agent_Skill-6B5CE7?style=flat-square" alt="Claude Code" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square&color=0a0a0a" alt="MIT" />
</p>

---

## 设计师最头痛的问题

AI 写代码已经很快了，但它**没有设计记忆**。

> 第 1 个页面还不错。第 10 个页面主色偏了。第 30 个页面 hover 状态有三种写法。第 50 个页面，按钮蓝得都不一样了。

你花了几周定义的设计体系——品牌色、间距节奏、组件规范、信息层级——在 AI 的第三次对话后就开始崩塌。因为每一次 AI 会话都是一张白纸。

**Design Anchor 让 AI 不再从白纸开始。**

## 它做什么

```
AI 写代码前  →  读取你的 token、组件约束、布局原则
AI 写代码后  →  自动审计合规，不合规直接替换
```

| 你的项目状态 | Design Anchor 的行为 |
|---|---|
| 新项目，有设计方向 | 提取你的设计为 token → 每个页面都在这套 token 下生成 |
| 新项目，还没想好 | 匹配一套成熟的风格方向 → 转 token → 第一个页面就很完整 |
| 已有产品，想治理 | 逐页分析 → 对齐 token 体系 → 重构布局 → 替换不达标组件 |

## 为什么不只是「换个颜色」

大多数设计治理工具停在 lint 层——报个警告，告诉你某个地方色值硬编码了。Design Anchor 治理的是整个设计执行链：

### Token 体系对齐

不是「别硬编码颜色」这么简单。是**全产品的视觉语言必须统一**：

- 所有主交互色（按钮、链接、选中态、focus 环）追溯到同一个 `primary` token
- hover / focus / disabled 从 token 派生，不是每个组件自己编一个
- surface 层级分明（background → card → popover），不是三个随机灰
- border 一个 token，文本色分三级，状态色限四类
- 暗色模式不是反转颜色——每个 token 都有对应的暗色值

### 布局治理

颜色对了但布局乱了，产品依然不像一个人做的。Design Anchor 用 7 条设计质量原则检验每个页面：

- 页面的布局是否匹配它的用途？
- 用户 2 秒扫一眼能看到最重要的信息吗？
- 最频繁的操作触手可及吗？
- 内容密度匹配任务还是匹配审美？
- 数据为空、加载中、出错时，页面设计过了吗？

AI 自由设计最佳布局，然后用原则验证——不是套模板。

### 组件质量执行

不报告问题。**直接替换。**

没有折叠功能的 sidebar → 替换。行内 icon 泛滥的表格 → 替换。占位符代替 label 的表单 → 替换。没有焦点陷阱的弹窗 → 替换。所有组件操作统一走 `design-anchor add`。

### AI 生成物拦截

10 条绝对禁令——四宫格指标卡开头、渐变文字标题、磨砂玻璃装饰、彩虹状态色、满屏圆角。这些一眼就能看出「AI 做的」。

还有二阶检测——当所有人学会避免上述模式后出现的新套路（bento grid、动态渐变边框、极端极简），同样拦截。

### 产出质量门槛

12 项硬性检查。对比度、hover/focus 状态、主色一致性、交互状态统一、空状态设计、键盘导航、布局不跳动。**任何一项不通过，AI 不能说「完成了」。**

## 快速开始

```bash
# 1. 安装 Skill
mkdir -p .claude/skills
cp -R design-anchor .claude/skills/design-anchor

# 2. 安装运行时
npm install -D design-anchor

# 3. 激活治理
npx design-anchor sync
```

全局安装：`cp -R design-anchor ~/.claude/skills/design-anchor`

Claude.ai：`zip -r design-anchor.zip design-anchor` 后上传。

## 命令速查

| 命令 | 作用 |
|---|---|
| `npx design-anchor sync` | 激活治理：token CSS + AI 规则 + MCP |
| `npx design-anchor theme <prompt.md>` | 设计方向 → token 提取 |
| `npx design-anchor add <component>` | 按需安装组件 |
| `npx design-anchor audit` | 合规检查 |
| `npx design-anchor hydrate` | 重建本地控制面（clone 后） |
| `npx design-anchor portal` | 检视设计系统状态 |

## 已有产品？

Design Anchor 检测到成熟产品时，默认推荐**布局重构**——不是换个颜色，是逐页重新审视布局和组件质量，保留全部业务逻辑：

```
布局重构（推荐）→ 逐页确认 → 整页重构 UI 层
渐进优化        → 只修 token + 组件 → 保留布局
只读审计        → 扫描报告 → 不动文件
```

每个页面单独确认后才修改。AI 不会偷偷改你的产品。

## 架构

```
design-anchor/
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
