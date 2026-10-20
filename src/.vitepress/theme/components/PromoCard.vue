<template>
  <div v-if="brand && brand.promoCode" class="promo-card">
    <div class="promo-main">
      <div class="promo-left">
        <div class="promo-title-row">
          <span class="promo-chip">🎁 限时折上折</span>
          <span class="promo-brand">{{ brand.name }} 专属礼券</span>
        </div>
        <div class="code-action-row">
          <code class="code-display">{{ brand.promoCode }}</code>
          <button class="copy-action-btn" @click="copyCode">
            <span v-if="!copied">一键复制优惠码</span>
            <span v-else class="copied-indicator">✓ 已复制到剪贴板</span>
          </button>
        </div>
      </div>
      <div class="promo-right">
        <span class="promo-hint">结算时粘贴优惠代码即可立享折扣</span>
        <a :href="brand.registerUrl" target="_blank" rel="nofollow sponsored noopener" class="redeem-btn">
          <span>直达官网兑换</span>
          <span>→</span>
        </a>
      </div>
    </div>
    <div class="promo-footer">
      <span>含推广返利链接，通过链接完成注册可能为本站带来维护佣金，绝不影响您的最终付款价格。</span>
    </div>
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

const copyCode = () => {
  if (!brand.value?.promoCode) return
  navigator.clipboard.writeText(brand.value.promoCode).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  })
}
</script>

<style scoped>
.promo-card {
  margin: 1.75rem 0;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%);
  border: 1.5px dashed rgba(245, 158, 11, 0.55);
  padding: 1.4rem 1.6rem;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.05);
}

.promo-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.promo-left {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.promo-title-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.promo-chip {
  font-size: 0.75rem;
  font-weight: 800;
  color: #b45309;
  background: rgba(245, 158, 11, 0.15);
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
}

.promo-brand {
  font-size: 0.95rem;
  font-weight: 800;
  color: #b45309;
}

.code-action-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.code-display {
  font-family: var(--vp-font-family-mono);
  font-size: 1.2rem;
  font-weight: 850;
  color: #b45309;
  background: var(--vp-c-bg);
  border: 1.5px solid rgba(245, 158, 11, 0.4);
  padding: 0.35rem 0.95rem;
  border-radius: 8px;
  letter-spacing: 1.5px;
}

.copy-action-btn {
  background: #f59e0b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.3);
  transition: all 0.2s ease;
}

.copy-action-btn:hover {
  background: #d97706;
  transform: translateY(-1px);
}

.copied-indicator {
  color: #fff;
  font-weight: 800;
}

.promo-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.45rem;
}

.promo-hint {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.redeem-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 750;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
}

.redeem-btn:hover {
  text-decoration: underline !important;
}

.promo-footer {
  margin-top: 0.85rem;
  padding-top: 0.6rem;
  border-top: 1px dotted rgba(245, 158, 11, 0.3);
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  line-height: 1.45;
}

@media (max-width: 640px) {
  .promo-right {
    align-items: flex-start;
  }
}
</style>
