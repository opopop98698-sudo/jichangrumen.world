<template>
  <div class="noc-panel">
    <div class="noc-header">
      <div class="noc-title-wrap">
        <span class="live-dot"></span>
        <span class="noc-title">NOC 节点实时监控面板 (NETWORK OPERATIONS MONITOR)</span>
      </div>
      <div class="noc-badge-group">
        <span class="noc-env">测试环境: 电信千兆 / 晚高峰 21:00</span>
        <span class="noc-status">STATUS: ONLINE / 0% PACKET LOSS</span>
      </div>
    </div>

    <div class="metric-grid">
      <div class="metric-card" v-for="node in testNodes" :key="node.region">
        <div class="card-top">
          <span class="region-name">{{ node.region }}</span>
          <span class="line-badge">{{ node.type }}</span>
        </div>
        <div class="stat-row">
          <div class="stat-col">
            <span class="stat-lbl">PING (延迟)</span>
            <span class="stat-val ping-val">{{ node.ping }}<small>ms</small></span>
          </div>
          <div class="stat-col">
            <span class="stat-lbl">LOSS (丢包率)</span>
            <span class="stat-val loss-val">{{ node.loss }}</span>
          </div>
          <div class="stat-col">
            <span class="stat-lbl">SPEED (下行)</span>
            <span class="stat-val speed-val">{{ node.speed }}<small>Mbps</small></span>
          </div>
        </div>
        <div class="graph-bar">
          <div class="bar-fill" :style="{ width: node.barWidth, background: node.barColor }"></div>
        </div>
        <div class="node-novice-tip">
          <span class="tip-icon">💡</span>
          <span>小白体验：{{ node.userExp }}</span>
        </div>
      </div>
    </div>

    <div class="noc-comparison">
      <div class="comp-col iepl-col">
        <h5 class="comp-title">🟢 IEPL/IPLC 企业专线表现（晚高峰 20:00 - 23:00）</h5>
        <p>数据通过运营商物理专用内网直通境外落地机房，完全不走公网拥堵的国际出口路由。无论晚高峰公网如何拥挤，延迟恒定维持在 30ms-60ms，丢包率始终 0%，4K 视频秒开不卡顿。</p>
      </div>
      <div class="comp-col public-col">
        <h5 class="comp-title">🔴 普通公网直连线路表现（晚高峰 20:00 - 23:00）</h5>
        <p>数据与其他所有公网民用流量挤在同一个国际出口，晚高峰由于出口带宽饱和，丢包率飙升至 25%~40%，延迟从 70ms 猛增至 300ms+，导致网页转圈、视频持续缓冲断流。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const testNodes = [
  {
    region: '香港 HK-01 (专线)',
    type: 'IEPL 内网',
    ping: '32.4',
    loss: '0.0%',
    speed: '820',
    barWidth: '95%',
    barColor: '#10b981',
    userExp: '极速秒开，打海外游戏/刷推特毫无延迟感'
  },
  {
    region: '日本东京 JP-02 (专线)',
    type: 'IEPL 内网',
    ping: '56.8',
    loss: '0.0%',
    speed: '650',
    barWidth: '85%',
    barColor: '#10b981',
    userExp: '超清 4K HDR 视频拖动进度条无需缓冲'
  },
  {
    region: '新加坡 SG-01 (优化)',
    type: 'BGP 专线',
    ping: '68.2',
    loss: '0.2%',
    speed: '540',
    barWidth: '78%',
    barColor: '#38bdf8',
    userExp: '完美解锁流媒体与 AI 工具学术使用'
  },
  {
    region: '美国西海岸 US-01 (原生)',
    type: '原生 IP 专线',
    ping: '135.5',
    loss: '0.0%',
    speed: '480',
    barWidth: '70%',
    barColor: '#a855f7',
    userExp: 'IP 纯净度极高，防 ChatGPT 封号必备'
  }
]
</script>

<style scoped>
.noc-panel {
  margin: 2.5rem 0;
  background: #0b132b;
  border-radius: 16px;
  padding: 1.75rem 2rem;
  color: #e2e8f0;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
  border: 1px solid #1e293b;
  font-family: var(--vp-font-family-base);
}

.noc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 1.5rem;
}

.noc-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.live-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

.noc-title {
  font-family: var(--vp-font-family-mono);
  font-size: 0.88rem;
  letter-spacing: 1px;
  font-weight: 800;
  color: #38bdf8;
}

.noc-badge-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.noc-env {
  font-size: 0.76rem;
  color: #94a3b8;
}

.noc-status {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 750;
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.1rem;
  margin-bottom: 1.6rem;
}

.metric-card {
  background: #1e293b;
  border-radius: 10px;
  padding: 1.15rem;
  border: 1px solid #334155;
  transition: transform 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: #38bdf8;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
}

.region-name {
  font-weight: 800;
  font-size: 0.95rem;
  color: #f8fafc;
}

.line-badge {
  font-size: 0.72rem;
  font-weight: 700;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.stat-col {
  display: flex;
  flex-direction: column;
}

.stat-lbl {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-bottom: 0.2rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
}

.stat-val {
  font-family: var(--vp-font-family-mono);
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1;
}

.ping-val { color: #38bdf8; }
.loss-val { color: #10b981; }
.speed-val { color: #f59e0b; }

.stat-val small {
  font-size: 0.68rem;
  margin-left: 2px;
  font-weight: normal;
  color: #94a3b8;
}

.graph-bar {
  height: 6px;
  background: #0f172a;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 0.65rem;
}

.bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.5s ease;
}

.node-novice-tip {
  font-size: 0.78rem;
  color: #cbd5e1;
  line-height: 1.45;
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
}

.tip-icon {
  font-size: 0.85rem;
}

.noc-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.1rem;
  border-top: 1px solid #1e293b;
  padding-top: 1.4rem;
}

.comp-col {
  padding: 1rem 1.2rem;
  border-radius: 8px;
  font-size: 0.84rem;
  line-height: 1.6;
}

.iepl-col {
  background: rgba(16, 185, 129, 0.08);
  border-left: 4px solid #10b981;
}

.public-col {
  background: rgba(239, 68, 68, 0.08);
  border-left: 4px solid #ef4444;
}

.comp-title {
  margin: 0 0 0.45rem 0 !important;
  font-size: 0.92rem !important;
  font-weight: 800;
  color: #f1f5f9;
}

.comp-col p {
  margin: 0 !important;
  color: #cbd5e1;
}
</style>
