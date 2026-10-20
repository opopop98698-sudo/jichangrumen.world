<template>
  <div v-if="brand" class="brand-card" :class="{ 'is-primary': brand.isPrimary }">
    <div class="brand-badge-strip">
      <span class="rank-badge" :class="'rank-' + brand.rank">TOP {{ brand.rank }}</span>
      <span v-if="brand.isPrimary" class="primary-flag">🏆 零基础新手首选推荐</span>
      <span v-if="brand.speedtestImage" class="speedtest-badge">📊 附真实测速长图</span>
      <span v-if="brand.unlockImages && brand.unlockImages.length > 0" class="unlock-badge">🔓 附流媒体/AI解锁实测</span>
      <span v-if="brand.since" class="since-chip">已稳定运营 {{ brand.since }} 年起</span>
    </div>

    <div class="brand-header">
      <div class="brand-title-group">
        <h3 class="brand-name">{{ brand.name }}</h3>
        <div class="rating-strip">
          <span class="stars">⭐⭐⭐⭐⭐</span>
          <span class="score-badge">{{ ratingScore }}分</span>
          <span class="ease-label">新手极易上手</span>
        </div>
      </div>
      <div class="price-box">
        <span class="price-prefix">起步门槛</span>
        <div class="price-amount">
          <span class="currency">¥</span>
          <span class="price-number">{{ cleanPrice(brand.priceFrom) }}</span>
          <span class="price-cycle">{{ getPriceCycle(brand.priceFrom) }}</span>
        </div>
      </div>
    </div>

    <div class="brand-specs">
      <div class="spec-row">
        <span class="spec-label">线路架构:</span>
        <div class="tag-list">
          <span v-for="line in brand.lineType" :key="line" class="tag-pill line-pill">
            <span class="pill-dot"></span>
            {{ line }}
          </span>
        </div>
      </div>
      <div class="spec-row">
        <span class="spec-label">支持协议:</span>
        <div class="tag-list">
          <span v-for="proto in brand.protocols" :key="proto" class="tag-pill proto-pill">
            {{ proto }}
          </span>
        </div>
      </div>
    </div>

    <div class="brand-features">
      <div class="feature-item" v-for="item in brand.highlights" :key="item">
        <span class="feature-check">✓</span>
        <span class="feature-text">{{ item }}</span>
      </div>
    </div>

    <div v-if="brand.promoCode" class="promo-box">
      <div class="promo-left">
        <span class="promo-icon">🎁</span>
        <span class="promo-label">专属折扣码:</span>
        <code class="promo-code">{{ brand.promoCode }}</code>
      </div>
      <button class="copy-btn" @click="copyCode(brand.promoCode)">
        {{ copied ? '✓ 已复制' : '一键复制' }}
      </button>
    </div>

    <div class="brand-actions">
      <a :href="'/reviews/#brand-' + brand.id" class="btn btn-secondary">
        查看深度评测详情
      </a>
      <a :href="brand.registerUrl" target="_blank" rel="nofollow sponsored noopener" class="btn btn-primary">
        <span>前往官网注册并体验</span>
        <span class="btn-arrow">→</span>
      </a>
    </div>

    <div class="brand-compliance-footer">
      <span class="compliance-icon">🛡️</span>
      <span class="compliance-text">
        含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。
        <span v-if="brand.dataStatus === 'vendor'" class="vendor-note">(部分参数源自品牌资料，实际以商家结算页为准)</span>
      </span>
    </div>
  </div>
  <div v-else class="brand-not-found">
    <span>未找到对应品牌档案 (ID: {{ brandId }})</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import brandsData from '../../../data/brands.json'

const props = defineProps<{
  brandId: string
}>()

const copied = ref(false)

const brand = computed(() => {
  return brandsData.find(b => b.id === props.brandId || String(b.rank) === props.brandId)
})

const ratingScore = computed(() => {
  if (!brand.value) return '4.5'
  if (brand.value.rank === 1) return '4.9'
  if (brand.value.rank <= 5) return '4.8'
  if (brand.value.rank <= 10) return '4.6'
  if (brand.value.rank <= 20) return '4.4'
  return '4.2'
})

const cleanPrice = (priceStr: string) => {
  if (!priceStr) return '8'
  const match = priceStr.match(/([0-9.]+)/)
  return match ? match[1] : priceStr
}

const getPriceCycle = (priceStr: string) => {
  if (priceStr.includes('季付')) return '/季'
  if (priceStr.includes('年付')) return '/年'
  return '/月'
}

const copyCode = (code: string) => {
  if (!code) return
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2200)
  })
}
</script>

<style scoped>
.brand-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 1.6rem 1.8rem;
  margin: 1.75rem 0;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.brand-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 28px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.brand-card.is-primary {
  border: 2px solid var(--vp-c-brand-1);
  background: linear-gradient(180deg, var(--vp-c-bg-soft) 0%, rgba(37, 99, 235, 0.04) 100%);
}

.brand-badge-strip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
}

.rank-badge {
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: #3b82f6;
  color: #fff;
  letter-spacing: 0.5px;
}

.rank-badge.rank-1 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.primary-flag {
  font-size: 0.76rem;
  font-weight: 700;
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 0.18rem 0.6rem;
  border-radius: 9999px;
}

.speedtest-badge {
  font-size: 0.75rem;
  font-weight: 750;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.25);
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
}

.unlock-badge {
  font-size: 0.75rem;
  font-weight: 750;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.25);
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
}

.since-chip {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.brand-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.brand-name {
  margin: 0 !important;
  font-size: 1.55rem !important;
  font-weight: 850;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.rating-strip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.86rem;
}

.stars {
  letter-spacing: 1px;
}

.score-badge {
  font-weight: 800;
  color: #f59e0b;
}

.ease-label {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.price-box {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.price-prefix {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.price-amount {
  display: flex;
  align-items: baseline;
  color: #ef4444;
}

.currency {
  font-size: 1.1rem;
  font-weight: 700;
  margin-right: 2px;
}

.price-number {
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1;
}

.price-cycle {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-left: 2px;
}

.brand-specs {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 1rem 0;
}

.spec-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.spec-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  min-width: 64px;
  font-weight: 600;
}

.tag-list {
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.tag-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.line-pill {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
}

.proto-pill {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.brand-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin: 1.1rem 0;
  background: var(--vp-c-bg);
  padding: 0.85rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.86rem;
}

.feature-check {
  color: #10b981;
  font-weight: 900;
}

.feature-text {
  color: var(--vp-c-text-1);
}

.promo-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0.55rem 0.95rem;
  background: rgba(245, 158, 11, 0.08);
  border-radius: 8px;
  border: 1px dashed rgba(245, 158, 11, 0.6);
}

.promo-left {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.promo-icon {
  font-size: 1rem;
}

.promo-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #b45309;
}

.promo-code {
  font-size: 0.92rem;
  font-weight: 800;
  color: #b45309;
  background: transparent;
  padding: 0;
}

.copy-btn {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  background: #f59e0b;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: #d97706;
}

.brand-actions {
  display: flex;
  gap: 0.85rem;
  margin-top: 1.35rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.68rem 1.35rem;
  border-radius: 9px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  cursor: pointer;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff !important;
  flex: 1.4;
  min-width: 200px;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
  display: flex;
  gap: 0.4rem;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
}

.btn-arrow {
  transition: transform 0.2s;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-secondary {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1) !important;
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
}

.brand-compliance-footer {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.95rem;
  padding-top: 0.65rem;
  border-top: 1px dotted var(--vp-c-divider);
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  line-height: 1.45;
}

.compliance-icon {
  font-size: 0.8rem;
  flex-shrink: 0;
}
</style>
