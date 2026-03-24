// ============================================================
// app.js - 主应用逻辑
// ============================================================

let selectedStock = null;

document.addEventListener('DOMContentLoaded', () => {
  renderStockCards();
  renderRoadmap();
  renderMALegend();
  
  // 默认选中第一只股票
  if (STOCK_PICKS.length > 0) {
    selectStock(STOCK_PICKS[0].code);
  }

  // 更新日期
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4);
  
  document.getElementById('week-range').textContent = 
    `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  document.getElementById('update-time').textContent = 
    `最后更新: ${now.toLocaleString('zh-CN')}`;
});

function formatDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function selectStock(code) {
  selectedStock = code;
  
  // 更新卡片选中状态
  document.querySelectorAll('.stock-card').forEach(card => {
    card.classList.toggle('ring-2', card.dataset.code === code);
    card.classList.toggle('ring-blue-500', card.dataset.code === code);
    card.classList.toggle('bg-slate-800/80', card.dataset.code === code);
    card.classList.toggle('bg-slate-800/40', card.dataset.code !== code);
  });

  // 渲染图表
  renderChart(code);

  // 更新详情面板
  renderStockDetail(code);
}

function renderStockCards() {
  const container = document.getElementById('stock-cards');
  container.innerHTML = '';

  STOCK_PICKS.forEach((stock, index) => {
    const upside = (((stock.targetPrice - stock.currentPrice) / stock.currentPrice) * 100).toFixed(1);
    const card = document.createElement('div');
    card.className = 'stock-card bg-slate-800/40 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:bg-slate-700/60 hover:scale-[1.02] border border-slate-700/50';
    card.dataset.code = stock.code;
    card.onclick = () => selectStock(stock.code);

    const riskColor = stock.riskLevel === '低' ? 'green' : stock.riskLevel === '中' ? 'yellow' : 'red';
    const recColor = stock.recommendation === '强烈推荐' ? 'red' : 'blue';

    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div>
          <span class="text-white font-bold text-lg">${stock.name}</span>
          <span class="text-slate-400 text-sm ml-2">${stock.code}</span>
        </div>
        <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-${recColor}-500/20 text-${recColor}-400 border border-${recColor}-500/30">
          ${stock.recommendation}
        </span>
      </div>
      <div class="flex items-baseline gap-3 mb-2">
        <span class="text-2xl font-bold text-white">¥${stock.currentPrice.toFixed(2)}</span>
        <span class="text-sm text-slate-400">→</span>
        <span class="text-lg font-semibold text-red-400">¥${stock.targetPrice.toFixed(2)}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-emerald-400 text-sm font-medium">↑ ${upside}% 上涨空间</span>
        <span class="px-2 py-0.5 rounded text-xs bg-${riskColor}-500/10 text-${riskColor}-400">
          风险: ${stock.riskLevel}
        </span>
      </div>
      <div class="mt-2 text-xs text-slate-500">${stock.sector} · PE ${stock.financials.pe} · ROE ${stock.financials.roe}%</div>
    `;

    container.appendChild(card);
  });
}

function renderStockDetail(code) {
  const stock = STOCK_PICKS.find(s => s.code === code);
  if (!stock) return;

  const detailPanel = document.getElementById('stock-detail');
  const f = stock.financials;
  
  detailPanel.innerHTML = `
    <div class="space-y-4">
      <!-- 目标价与理由 -->
      <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
        <h4 class="text-blue-400 font-semibold mb-2 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          目标价分析
        </h4>
        <div class="flex items-baseline gap-4 mb-2">
          <div>
            <span class="text-slate-400 text-xs">当前价</span>
            <p class="text-white text-xl font-bold">¥${stock.currentPrice.toFixed(2)}</p>
          </div>
          <span class="text-slate-500 text-2xl">→</span>
          <div>
            <span class="text-slate-400 text-xs">目标价</span>
            <p class="text-red-400 text-xl font-bold">¥${stock.targetPrice.toFixed(2)}</p>
          </div>
          <div class="ml-auto text-right">
            <span class="text-slate-400 text-xs">上涨空间</span>
            <p class="text-emerald-400 text-xl font-bold">${(((stock.targetPrice - stock.currentPrice) / stock.currentPrice) * 100).toFixed(1)}%</p>
          </div>
        </div>
        <p class="text-slate-300 text-sm leading-relaxed">${stock.targetReason}</p>
      </div>

      <!-- 核心财务指标 -->
      <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
        <h4 class="text-purple-400 font-semibold mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
          核心财务指标
        </h4>
        <div class="grid grid-cols-2 gap-3">
          ${renderMetric('市盈率(PE)', f.pe, f.pe < 30 ? 'green' : 'yellow')}
          ${renderMetric('市净率(PB)', f.pb, f.pb < 5 ? 'green' : 'yellow')}
          ${renderMetric('ROE', f.roe + '%', f.roe > 15 ? 'green' : 'yellow')}
          ${renderMetric('营收增长', f.revenueGrowth + '%', f.revenueGrowth > 0 ? 'green' : 'red')}
          ${renderMetric('净利增长', f.netProfitGrowth + '%', f.netProfitGrowth > 0 ? 'green' : 'red')}
          ${renderMetric('资产负债率', f.debtRatio + '%', f.debtRatio < 50 ? 'green' : 'yellow')}
          ${renderMetric('毛利率', f.grossMargin + '%', f.grossMargin > 20 ? 'green' : 'yellow')}
          ${renderMetric('总市值', f.marketCap, 'blue')}
        </div>
      </div>

      <!-- 技术信号 -->
      <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
        <h4 class="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"/></svg>
          均线信号
        </h4>
        <p class="text-slate-300 text-sm">${stock.maSignal}</p>
      </div>

      <!-- 风险提示 -->
      <div class="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
        <h4 class="text-red-400 font-semibold mb-2 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/></svg>
          风险提示
        </h4>
        <ul class="space-y-1">
          ${stock.risks.map(r => `<li class="text-slate-400 text-sm flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-red-400 flex-shrink-0"></span>${r}</li>`).join('')}
        </ul>
      </div>

      <!-- 最新新闻 -->
      <div class="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
        <h4 class="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"/><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/></svg>
          最新动态
        </h4>
        <div class="space-y-2">
          ${stock.news.map(n => `
            <div class="flex items-start gap-2">
              <span class="text-slate-500 text-xs mt-0.5 flex-shrink-0">${n.date.slice(5)}</span>
              <span class="text-slate-300 text-sm">${n.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderMetric(label, value, color) {
  return `
    <div class="bg-slate-900/50 rounded-lg p-2">
      <span class="text-slate-500 text-xs">${label}</span>
      <p class="text-${color}-400 font-semibold">${value}</p>
    </div>
  `;
}

function renderMALegend() {
  const legend = document.getElementById('ma-legend');
  if (!legend) return;
  legend.innerHTML = `
    <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-yellow-400 inline-block"></span><span class="text-yellow-400">MA5</span></span>
    <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-blue-400 inline-block"></span><span class="text-blue-400">MA10</span></span>
    <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-purple-400 inline-block"></span><span class="text-purple-400">MA20</span></span>
    <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-pink-400 inline-block"></span><span class="text-pink-400">MA60</span></span>
  `;
}

function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (!container) return;
  container.innerHTML = '';

  ROADMAP.forEach(phase => {
    const statusColors = {
      completed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: '✅ 已完成' },
      next: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: '🔨 进行中' },
      planned: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', badge: '📋 规划中' }
    };
    const sc = statusColors[phase.status];
    
    const el = document.createElement('div');
    el.className = `${sc.bg} rounded-xl p-5 border ${sc.border} transition-all duration-300`;
    
    const doneCount = phase.items.filter(i => i.done).length;
    const progress = phase.items.length > 0 ? (doneCount / phase.items.length * 100) : 0;
    
    el.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <div>
          <span class="text-xs font-mono ${sc.text} opacity-70">${phase.phase}</span>
          <h4 class="text-white font-semibold text-lg">${phase.title}</h4>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text} border ${sc.border}">
          ${sc.badge}
        </span>
      </div>
      <div class="w-full bg-slate-700/50 rounded-full h-1.5 mb-3">
        <div class="h-1.5 rounded-full transition-all duration-500 ${phase.status === 'completed' ? 'bg-emerald-500' : phase.status === 'next' ? 'bg-blue-500' : 'bg-slate-600'}" style="width: ${progress}%"></div>
      </div>
      <ul class="space-y-1.5">
        ${phase.items.map(item => `
          <li class="flex items-center gap-2 text-sm">
            <span class="${item.done ? 'text-emerald-400' : 'text-slate-600'}">${item.done ? '✓' : '○'}</span>
            <span class="${item.done ? 'text-slate-300' : 'text-slate-500'}">${item.task}</span>
          </li>
        `).join('')}
      </ul>
    `;
    
    container.appendChild(el);
  });
}
