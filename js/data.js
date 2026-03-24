// ============================================================
// data.js - 模拟数据层 (MVP阶段使用模拟数据，后续接入akshare)
// ============================================================

const STOCK_PICKS = [
  {
    code: "300750",
    name: "宁德时代",
    sector: "新能源",
    currentPrice: 218.50,
    targetPrice: 285.00,
    targetReason: "全球动力电池龙头，2025年固态电池量产预期提升估值空间；海外产能扩张带来新增长极",
    recommendation: "强烈推荐",
    riskLevel: "中",
    financials: {
      pe: 22.5,
      pb: 5.8,
      roe: 21.3,
      revenueGrowth: 28.5,
      netProfitGrowth: 35.2,
      debtRatio: 45.2,
      grossMargin: 26.8,
      marketCap: "5320亿"
    },
    risks: ["原材料价格波动", "行业竞争加剧", "海外政策不确定性"],
    maSignal: "MA5上穿MA20，金叉形成",
    news: [
      { date: "2026-03-22", title: "宁德时代固态电池研发取得重大突破" },
      { date: "2026-03-20", title: "欧洲工厂产能利用率突破80%" },
      { date: "2026-03-18", title: "一季度预告净利润同比增长40%以上" }
    ]
  },
  {
    code: "600519",
    name: "贵州茅台",
    sector: "消费",
    currentPrice: 1685.00,
    targetPrice: 2100.00,
    targetReason: "白酒行业回暖，茅台提价预期强烈；国际化布局加速，品牌溢价持续提升",
    recommendation: "推荐",
    riskLevel: "低",
    financials: {
      pe: 28.3,
      pb: 9.2,
      roe: 32.5,
      revenueGrowth: 15.8,
      netProfitGrowth: 18.2,
      debtRatio: 18.5,
      grossMargin: 91.5,
      marketCap: "21160亿"
    },
    risks: ["消费降级风险", "政策监管风险", "库存周期波动"],
    maSignal: "股价站稳MA60，长期趋势向好",
    news: [
      { date: "2026-03-21", title: "茅台2025年报：营收同比增16.2%" },
      { date: "2026-03-19", title: "i茅台平台用户突破5000万" },
      { date: "2026-03-17", title: "海外市场销售额同比翻倍" }
    ]
  },
  {
    code: "002594",
    name: "比亚迪",
    sector: "新能源汽车",
    currentPrice: 312.80,
    targetPrice: 420.00,
    targetReason: "智能驾驶技术突破，高端品牌仰望放量在即；海外市场快速扩张，2026年出口目标翻倍",
    recommendation: "强烈推荐",
    riskLevel: "中",
    financials: {
      pe: 25.6,
      pb: 6.1,
      roe: 18.7,
      revenueGrowth: 42.3,
      netProfitGrowth: 55.8,
      debtRatio: 52.1,
      grossMargin: 22.4,
      marketCap: "9100亿"
    },
    risks: ["价格战压力", "智驾研发投入大", "汇率波动影响出口"],
    maSignal: "MACD底背离，反弹信号明确",
    news: [
      { date: "2026-03-23", title: "比亚迪3月销量有望突破50万辆" },
      { date: "2026-03-20", title: "仰望U9交付量超预期" },
      { date: "2026-03-18", title: "泰国工厂正式投产" }
    ]
  },
  {
    code: "688981",
    name: "中芯国际",
    sector: "半导体",
    currentPrice: 85.60,
    targetPrice: 130.00,
    targetReason: "国产替代加速推进，先进制程良率持续提升；AI芯片需求爆发带动晶圆代工景气上行",
    recommendation: "推荐",
    riskLevel: "高",
    financials: {
      pe: 45.2,
      pb: 2.8,
      roe: 8.5,
      revenueGrowth: 32.1,
      netProfitGrowth: 68.5,
      debtRatio: 38.6,
      grossMargin: 19.8,
      marketCap: "6780亿"
    },
    risks: ["技术封锁升级", "行业周期性波动", "资本开支压力大"],
    maSignal: "放量突破前期平台，均线多头排列",
    news: [
      { date: "2026-03-22", title: "中芯国际产能利用率回升至90%以上" },
      { date: "2026-03-19", title: "获国家大基金三期追加投资" },
      { date: "2026-03-16", title: "先进制程客户数量同比增长60%" }
    ]
  },
  {
    code: "601012",
    name: "隆基绿能",
    sector: "光伏",
    currentPrice: 22.35,
    targetPrice: 38.00,
    targetReason: "BC电池技术领先，产品溢价能力强；光伏行业触底反弹信号明确，龙头估值修复空间大",
    recommendation: "推荐",
    riskLevel: "高",
    financials: {
      pe: 18.5,
      pb: 1.8,
      roe: 10.2,
      revenueGrowth: -5.2,
      netProfitGrowth: -15.8,
      debtRatio: 55.8,
      grossMargin: 15.2,
      marketCap: "1690亿"
    },
    risks: ["行业产能过剩", "技术路线竞争", "海外贸易壁垒"],
    maSignal: "超跌反弹，RSI从超卖区回升",
    news: [
      { date: "2026-03-23", title: "隆基BC电池效率刷新世界纪录" },
      { date: "2026-03-20", title: "获中东大额组件订单" },
      { date: "2026-03-17", title: "行业协会呼吁限制低价竞争" }
    ]
  }
];

// 生成模拟K线数据
function generateCandlestickData(basePrice, days = 120) {
  const data = [];
  let price = basePrice * 0.85;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 跳过周末
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const change = (Math.random() - 0.48) * price * 0.04;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * price * 0.015;
    const low = Math.min(open, close) - Math.random() * price * 0.015;
    const volume = Math.floor(Math.random() * 5000000 + 1000000);
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: volume
    });
    
    price = close;
  }
  
  return data;
}

// 计算移动平均线
function calculateMA(data, period) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push({ time: data[i].time, value: undefined });
      continue;
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    result.push({
      time: data[i].time,
      value: parseFloat((sum / period).toFixed(2))
    });
  }
  return result.filter(d => d.value !== undefined);
}

// 路线图数据
const ROADMAP = [
  {
    phase: "Phase 1",
    title: "MVP 基础框架",
    status: "completed",
    items: [
      { task: "项目初始化与仓库创建", done: true },
      { task: "TradingView Lightweight Charts 集成", done: true },
      { task: "股票卡片展示（目标价/理由/财务指标/风险）", done: true },
      { task: "交互式K线图 + MA5/MA10/MA20/MA60", done: true },
      { task: "GitHub Pages 部署", done: true },
      { task: "响应式布局设计", done: true }
    ]
  },
  {
    phase: "Phase 2",
    title: "真实数据接入",
    status: "next",
    items: [
      { task: "接入 akshare API 获取实时行情", done: false },
      { task: "Python 数据采集脚本（每日/每周）", done: false },
      { task: "GitHub Actions 定时任务自动更新数据", done: false },
      { task: "历史K线数据存储（JSON/CSV）", done: false },
      { task: "财务指标自动拉取（PE/PB/ROE等）", done: false }
    ]
  },
  {
    phase: "Phase 3",
    title: "量化选股引擎",
    status: "planned",
    items: [
      { task: "均线交叉策略（金叉/死叉检测）", done: false },
      { task: "MACD / RSI / KDJ 技术指标计算", done: false },
      { task: "基本面筛选（ROE>15%, PE<30等）", done: false },
      { task: "多因子综合评分模型", done: false },
      { task: "回测框架搭建", done: false },
      { task: "选股结果自动排名", done: false }
    ]
  },
  {
    phase: "Phase 4",
    title: "新闻与舆情分析",
    status: "planned",
    items: [
      { task: "财经新闻爬虫（东财/同花顺/新浪财经）", done: false },
      { task: "新闻情感分析（NLP）", done: false },
      { task: "利好/利空事件自动标注", done: false },
      { task: "新闻与股价联动分析", done: false },
      { task: "实时新闻推送到页面", done: false }
    ]
  },
  {
    phase: "Phase 5",
    title: "高级可视化与交互",
    status: "planned",
    items: [
      { task: "多股票对比图表", done: false },
      { task: "板块热力图", done: false },
      { task: "资金流向可视化", done: false },
      { task: "自选股管理", done: false },
      { task: "历史推荐回顾与收益追踪", done: false },
      { task: "深色/浅色主题切换", done: false }
    ]
  },
  {
    phase: "Phase 6",
    title: "智能化与自动化",
    status: "planned",
    items: [
      { task: "AI 生成每周选股报告", done: false },
      { task: "机器学习预测模型", done: false },
      { task: "风险预警系统", done: false },
      { task: "Telegram/微信推送通知", done: false },
      { task: "用户自定义筛选条件", done: false },
      { task: "API 接口供第三方调用", done: false }
    ]
  }
];
