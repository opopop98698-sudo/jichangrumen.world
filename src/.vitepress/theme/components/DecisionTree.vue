<template>
  <div class="decision-tree-container">
    <div class="tree-header">
      <div class="header-pill">🧭 互动决策向导</div>
      <h3 class="tree-title">新手 30 秒选型决策罗盘</h3>
      <p class="tree-desc">回答 3 个关键问题，系统将根据你的真实需求自动匹配最适合的机场与客户端方案：</p>
    </div>

    <!-- Step 1 -->
    <div class="tree-step">
      <div class="step-label">
        <span class="num">1</span>
        <span>你的核心使用场景？</span>
      </div>
      <div class="options-grid">
        <button
          v-for="opt in purposeOptions"
          :key="opt.id"
          class="option-card"
          :class="{ active: selectedPurpose === opt.id }"
          @click="selectedPurpose = opt.id"
        >
          <span class="opt-icon">{{ opt.icon }}</span>
          <div class="opt-texts">
            <span class="opt-name">{{ opt.name }}</span>
            <span class="opt-hint">{{ opt.hint }}</span>
          </div>
          <span v-if="selectedPurpose === opt.id" class="check-mark">✓</span>
        </button>
      </div>
      <div class="novice-tip">
        <strong>💡 小白须知：</strong>不同场景对网络性能要求天差地别。日常刷视频重在持续大带宽；而使用 ChatGPT/Claude 则对 IP 干净度与防封控能力要求极高。
      </div>
    </div>

    <!-- Step 2 -->
    <div class="tree-step" v-if="selectedPurpose">
      <div class="step-label">
        <span class="num">2</span>
        <span>你最主要的使用设备？</span>
      </div>
      <div class="options-grid">
        <button
          v-for="opt in deviceOptions"
          :key="opt.id"
          class="option-card"
          :class="{ active: selectedDevice === opt.id }"
          @click="selectedDevice = opt.id"
        >
          <span class="opt-icon">{{ opt.icon }}</span>
          <div class="opt-texts">
            <span class="opt-name">{{ opt.name }}</span>
            <span class="opt-hint">{{ opt.hint }}</span>
          </div>
          <span v-if="selectedDevice === opt.id" class="check-mark">✓</span>
        </button>
      </div>
      <div class="novice-tip">
        <strong>💡 小白须知：</strong>iPhone/iPad 需海外 Apple ID 下载 Shadowrocket 或选择有自研免配客户端的机场；Windows/Android 优先使用 Clash Verge 或 v2rayNG。
      </div>
    </div>

    <!-- Step 3 -->
    <div class="tree-step" v-if="selectedDevice">
      <div class="step-label">
        <span class="num">3</span>
        <span>你的月度预算承受范围？</span>
      </div>
      <div class="options-grid">
        <button
          v-for="opt in budgetOptions"
          :key="opt.id"
          class="option-card"
          :class="{ active: selectedBudget === opt.id }"
          @click="selectedBudget = opt.id"
        >
          <span class="opt-icon">{{ opt.icon }}</span>
          <div class="opt-texts">
            <span class="opt-name">{{ opt.name }}</span>
            <span class="opt-hint">{{ opt.hint }}</span>
          </div>
          <span v-if="selectedBudget === opt.id" class="check-mark">✓</span>
        </button>
      </div>
      <div class="novice-tip">
        <strong>💡 避坑铁律：</strong>强烈建议新手第一单只买月付（8-15元档）！切勿一开始直接买年付，确认自己常用且稳定后再考虑续费。
      </div>
    </div>

    <!-- Recommendation Result -->
    <div class="tree-result" v-if="selectedPurpose && selectedDevice && selectedBudget">
      <div class="result-top">
        <span class="result-badge">🎉 为你匹配的最佳入门组合</span>
        <h4 class="result-title">{{ recommendation.title }}</h4>
      </div>

      <div class="result-body">
        <div class="result-reasons">
          <div class="reason-row">
            <span class="reason-tag tag-why">推荐理由</span>
            <span class="reason-val">{{ recommendation.reason }}</span>
          </div>
          <div class="reason-row">
            <span class="reason-tag tag-tool">推荐客户端</span>
            <span class="reason-val">{{ recommendation.client }}</span>
          </div>
          <div class="reason-row">
            <span class="reason-tag tag-warn">防坑警示</span>
            <span class="reason-val">{{ recommendation.warning }}</span>
          </div>
        </div>

        <div class="matched-brand-card">
          <div class="mb-left">
            <div class="mb-title-wrap">
              <span class="mb-rank">TOP {{ recommendation.brand.rank }}</span>
              <strong class="mb-name">{{ recommendation.brand.name }}</strong>
            </div>
            <div class="mb-chips">
              <span class="mb-chip" v-for="h in recommendation.brand.highlights" :key="h">{{ h }}</span>
            </div>
          </div>
          <div class="mb-right">
            <div class="mb-price-wrap">
              <span class="mb-price">{{ recommendation.brand.priceFrom }}</span>
            </div>
            <a :href="recommendation.brand.registerUrl" target="_blank" rel="nofollow sponsored noopener" class="mb-btn">
              前往注册体验 →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import brandsData from '../../../data/brands.json'

const selectedPurpose = ref('daily')
const selectedDevice = ref('all')
const selectedBudget = ref('low')

const purposeOptions = [
  { id: 'daily', name: '日常刷视频与网页', hint: 'YouTube/Twitter/资讯', icon: '🎬' },
  { id: 'ai', name: 'AI工具与学术研究', hint: 'ChatGPT/Claude/论文检索', icon: '🤖' },
  { id: 'budget', name: '尝鲜与极低预算', hint: '花最少钱体验科学上网', icon: '🪙' },
  { id: 'business', name: '外贸跨国办公/稳定', hint: '追求长期稳定不掉线', icon: '💼' }
]

const deviceOptions = [
  { id: 'all', name: '手机 + 电脑多端', hint: 'iPhone/Mac/Windows同时用', icon: '💻📱' },
  { id: 'ios', name: '主要用 iPhone/iPad', hint: '关注客户端安装便利度', icon: '🍏' },
  { id: 'pc', name: '主要用 Windows 电脑', hint: '需要稳定的系统代理', icon: '🪟' },
  { id: 'android', name: '主要用 Android 安卓机', hint: '需要一键导入与后台常驻', icon: '🤖' }
]

const budgetOptions = [
  { id: 'low', name: '月付 6-8 元轻量档', hint: '低成本入门无压力', icon: '🌱' },
  { id: 'mid', name: '月付 15-25 元专线档', hint: '晚高峰极速企业专线', icon: '🚀' },
  { id: 'high', name: '大流量或不限时套餐', hint: '适合下载与团队共用', icon: '📦' }
]

const recommendation = computed(() => {
  if (selectedPurpose.value === 'budget' || selectedBudget.value === 'low') {
    const brand = brandsData.find(b => b.id === 'gsy') || brandsData[0]
    return {
      title: '低门槛高性价比入门组合：光速云 / 飞猫云',
      reason: '月付仅 7-8 元，配备 IEPL 企业级专线，相比廉价直连节点抗封锁能力高数倍，且官方提供一键订阅与客服指导。',
      client: selectedDevice.value === 'ios' ? '推荐在美区商店获取 Shadowrocket 或使用网页版一键配置' : 'Windows 推荐 Clash Verge Rev；Android 推荐 v2rayNG',
      warning: '不要碰 2-3 元的公网单节点小作坊，跑路概率极高且晚高峰卡顿严重。',
      brand
    }
  }

  if (selectedPurpose.value === 'ai') {
    const brand = brandsData.find(b => b.id === 'yinxingren') || brandsData.find(b => b.id === 'firefly') || brandsData[0]
    return {
      title: 'AI工具防风控专线方案：隐形人 / Firefly',
      reason: '提供机房原生纯净 IP，避免因滥用被 OpenAI / Claude 封号或频繁弹 Cloudflare 人机验证码。',
      client: '全平台推荐启用规则模式 (Rule Mode)，国内网站直连，AI工具走纯净美国节点',
      warning: '切勿在免费公共节点登录重要 ChatGPT 账号，极易触发关联风控封禁。',
      brand
    }
  }

  if (selectedPurpose.value === 'business') {
    const brand = brandsData.find(b => b.id === 'wgetcloud') || brandsData.find(b => b.id === 'gsy') || brandsData[0]
    return {
      title: '企业与稳定生产力方案：WgetCloud / 光速云',
      reason: '全节点 IEPL 专线调度，亚洲近端低延迟，晚高峰无丢包，保障邮件收发与海外会议不中断。',
      client: 'Windows/macOS 部署 Clash Verge Rev 并开启 TUN 虚拟网卡模式',
      warning: '长期业务请按季付结算，避免单次充值过多资金。',
      brand
    }
  }

  // Default to GSY
  const brand = brandsData.find(b => b.id === 'gsy') || brandsData[0]
  return {
    title: '全能平衡首推方案：光速云 (双线路架构)',
    reason: '双线路架构支持，多档套餐灵活切换，覆盖 11 个热门地区，对小白用户的客户端指引最全面。',
    client: 'Windows 用 Clash Verge Rev，iOS 用 Shadowrocket，安卓用 v2rayNG',
    warning: '首次使用请务必进行「连通性测试」，确认能够打开 Google 后再关闭页面。',
    brand
  }
})
</script>

<style scoped>
.decision-tree-container {
  margin: 2.2rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  padding: 1.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.tree-header {
  margin-bottom: 1.5rem;
}

.header-pill {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  margin-bottom: 0.4rem;
}

.tree-title {
  margin: 0 0 0.45rem 0 !important;
  font-size: 1.45rem !important;
  font-weight: 850;
  color: var(--vp-c-text-1);
}

.tree-desc {
  margin: 0 !important;
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
}

.tree-step {
  margin-bottom: 1.6rem;
  padding-bottom: 1.4rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.step-label {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 0.9rem;
  color: var(--vp-c-text-1);
}

.step-label .num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.8rem;
}

.option-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  text-align: left;
  transition: all 0.22s ease;
  position: relative;
}

.option-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.option-card.active {
  border: 2px solid var(--vp-c-brand-1);
  background: rgba(37, 99, 235, 0.08);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.opt-icon {
  font-size: 1.6rem;
}

.opt-texts {
  display: flex;
  flex-direction: column;
}

.opt-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.opt-hint {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
}

.check-mark {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--vp-c-brand-1);
}

.novice-tip {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  background: var(--vp-c-bg);
  padding: 0.55rem 0.85rem;
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand-1);
}

.tree-result {
  margin-top: 1.75rem;
  background: var(--vp-c-bg);
  border: 2px solid #10b981;
  border-radius: 14px;
  padding: 1.6rem;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.08);
}

.result-top {
  margin-bottom: 1.2rem;
}

.result-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  background: #10b981;
  color: #fff;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  margin-bottom: 0.45rem;
}

.result-title {
  margin: 0 !important;
  font-size: 1.35rem !important;
  font-weight: 850;
  color: var(--vp-c-text-1);
}

.result-reasons {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.4rem;
}

.reason-row {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.reason-tag {
  font-size: 0.75rem;
  font-weight: 750;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag-why { background: rgba(37, 99, 235, 0.1); color: #2563eb; }
.tag-tool { background: rgba(16, 185, 129, 0.1); color: #059669; }
.tag-warn { background: rgba(239, 68, 68, 0.1); color: #dc2626; }

.reason-val {
  color: var(--vp-c-text-1);
}

.matched-brand-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: var(--vp-c-bg-soft);
  padding: 1.1rem 1.3rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.mb-left {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mb-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mb-rank {
  font-size: 0.75rem;
  font-weight: 800;
  background: #3b82f6;
  color: #fff;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.mb-name {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.mb-chips {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.mb-chip {
  font-size: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.mb-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mb-price {
  font-size: 1.35rem;
  font-weight: 900;
  color: #ef4444;
}

.mb-btn {
  display: inline-block;
  padding: 0.55rem 1.3rem;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 8px;
  font-weight: 750;
  font-size: 0.92rem;
  text-decoration: none !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.2s;
}

.mb-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}
</style>
