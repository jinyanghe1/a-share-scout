# 📈 A-Share Scout — 智能A股周度选股平台

> ⚠️ **重要声明：当前版本使用模拟数据（MOCK DATA），所有分析和推荐仅供功能演示，不构成任何投资建议。股市有风险，投资需谨慎。**

一个基于 GitHub Pages 的A股智能选股分析平台，每周动态选出 5 只值得关注的股票，使用类 TradingView 专业视图展示。

## ✨ 功能特性

- 🏆 **周度 TOP 5 推荐** — 每周精选 5 只值得关注的A股
- 📊 **专业 K 线图** — 基于 TradingView Lightweight Charts，支持缩放/十字光标
- 📈 **多周期均线** — MA5 / MA10 / MA20 / MA60 均线叠加显示
- 📋 **全面分析卡片** — 目标价、理由、核心财务指标、风险提示
- 📰 **最新动态** — 每只股票的相关新闻
- 🗺️ **可视化路线图** — 从 MVP 到完整平台的演进路径
- 📱 **响应式设计** — 桌面端和移动端均可访问

## 🚀 在线预览

👉 **[https://jinyanghe1.github.io/a-share-scout/](https://jinyanghe1.github.io/a-share-scout/)**

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML / CSS / JavaScript | 前端核心 |
| [TradingView Lightweight Charts](https://github.com/nickvdyck/lightweight-charts) | K线图渲染 |
| [Tailwind CSS](https://tailwindcss.com/) (CDN) | UI 样式 |
| GitHub Pages | 静态站点部署 |

## 📁 项目结构

```
a-share-scout/
├── index.html          # 主页面
├── css/
│   └── style.css       # 自定义样式
├── js/
│   ├── app.js          # 主应用逻辑
│   ├── chart.js        # 图表渲染
│   └── data.js         # 数据层（当前为模拟数据）
├── ROADMAP.md          # 详细开发路线图
├── README.md           # 本文件
└── .nojekyll           # 禁用 Jekyll 处理
```

## 🗺️ 路线图概览

| 阶段 | 内容 | 状态 |
|------|------|------|
| Phase 1 | MVP 基础框架 | ✅ 已完成 |
| Phase 2 | 真实数据接入 (akshare + GitHub Actions) | 🔨 下一步 |
| Phase 3 | 量化选股引擎 | 📋 规划中 |
| Phase 4 | 新闻与舆情分析 | 📋 规划中 |
| Phase 5 | 高级可视化与交互 | 📋 规划中 |
| Phase 6 | 智能化与自动化 | 📋 规划中 |

👉 查看 [完整路线图](ROADMAP.md)

## 🏃 本地运行

```bash
git clone https://github.com/jinyanghe1/a-share-scout.git
cd a-share-scout

# 使用任意静态服务器
python3 -m http.server 8080
# 或
npx serve .
```

然后访问 http://localhost:8080

## ⚠️ 免责声明

- 本项目所有数据目前均为**模拟数据**，不反映真实市场行情
- 所有分析和推荐**不构成投资建议**
- 投资有风险，入市需谨慎
- 任何投资决策请咨询专业持牌金融顾问

## 📄 License

MIT
