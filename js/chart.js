// ============================================================
// chart.js - TradingView Lightweight Charts 图表渲染
// ============================================================

let currentChart = null;
let currentCandleSeries = null;
let maLines = [];

function renderChart(stockCode) {
  const stock = STOCK_PICKS.find(s => s.code === stockCode);
  if (!stock) return;

  const container = document.getElementById('chart-container');
  container.innerHTML = '';

  const chartEl = document.createElement('div');
  chartEl.id = 'tv-chart';
  chartEl.style.width = '100%';
  chartEl.style.height = '100%';
  container.appendChild(chartEl);

  currentChart = LightweightCharts.createChart(chartEl, {
    width: container.clientWidth,
    height: container.clientHeight || 500,
    layout: {
      background: { type: 'solid', color: '#0f1729' },
      textColor: '#94a3b8',
      fontSize: 12,
    },
    grid: {
      vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
      horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
      vertLine: {
        color: 'rgba(224, 227, 235, 0.2)',
        style: 0,
        labelBackgroundColor: '#1e293b',
      },
      horzLine: {
        color: 'rgba(224, 227, 235, 0.2)',
        labelBackgroundColor: '#1e293b',
      },
    },
    rightPriceScale: {
      borderColor: 'rgba(42, 46, 57, 0.8)',
    },
    timeScale: {
      borderColor: 'rgba(42, 46, 57, 0.8)',
      timeVisible: false,
    },
  });

  // K线
  const candleData = generateCandlestickData(stock.currentPrice);
  currentCandleSeries = currentChart.addCandlestickSeries({
    upColor: '#ef4444',
    downColor: '#22c55e',
    borderUpColor: '#ef4444',
    borderDownColor: '#22c55e',
    wickUpColor: '#ef4444',
    wickDownColor: '#22c55e',
  });
  currentCandleSeries.setData(candleData);

  // 成交量
  const volumeSeries = currentChart.addHistogramSeries({
    priceFormat: { type: 'volume' },
    priceScaleId: 'volume',
  });

  currentChart.priceScale('volume').applyOptions({
    scaleMargins: { top: 0.8, bottom: 0 },
  });

  volumeSeries.setData(
    candleData.map(d => ({
      time: d.time,
      value: d.volume,
      color: d.close >= d.open ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)',
    }))
  );

  // 均线
  maLines = [];
  const maConfigs = [
    { period: 5, color: '#fbbf24', width: 1 },
    { period: 10, color: '#60a5fa', width: 1 },
    { period: 20, color: '#c084fc', width: 1.5 },
    { period: 60, color: '#f472b6', width: 2 },
  ];

  maConfigs.forEach(({ period, color, width }) => {
    const maData = calculateMA(candleData, period);
    const maSeries = currentChart.addLineSeries({
      color: color,
      lineWidth: width,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    maSeries.setData(maData);
    maLines.push({ period, series: maSeries });
  });

  currentChart.timeScale().fitContent();

  // 响应式
  const resizeObserver = new ResizeObserver(() => {
    currentChart.applyOptions({
      width: container.clientWidth,
      height: container.clientHeight,
    });
  });
  resizeObserver.observe(container);

  // 更新图表标题
  document.getElementById('chart-stock-name').textContent = `${stock.name} (${stock.code})`;
  document.getElementById('chart-stock-price').textContent = `¥${stock.currentPrice.toFixed(2)}`;
  
  const change = ((stock.currentPrice - candleData[candleData.length - 2]?.close) || 0).toFixed(2);
  const changePct = ((change / stock.currentPrice) * 100).toFixed(2);
  const changeEl = document.getElementById('chart-stock-change');
  const isUp = change >= 0;
  changeEl.textContent = `${isUp ? '+' : ''}${change} (${isUp ? '+' : ''}${changePct}%)`;
  changeEl.className = isUp ? 'text-red-400' : 'text-green-400';
}
