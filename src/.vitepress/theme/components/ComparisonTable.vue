<template>
  <div class="comparison-card-container">
    <div class="table-top-bar">
      <div class="bar-left">
        <span class="bar-badge">📊 新手白话对照矩阵</span>
        <span class="bar-sub">包含「参数技术解读」，告别术语迷茫</span>
      </div>
      <div class="bar-right">
        <span class="scroll-hint">👉 支持横向滑动对比</span>
      </div>
    </div>

    <div class="table-scroll-wrap">
      <table class="pro-table">
        <thead>
          <tr>
            <th class="col-brand">排名与品牌</th>
            <th class="col-price">起步门槛</th>
            <th class="col-line">线路架构与【小白解读】</th>
            <th class="col-proto">协议与【特性】</th>
            <th class="col-ease">上手难度</th>
            <th class="col-rate">推荐度</th>
            <th class="col-act">快速通道</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filteredBrands" :key="b.id" :class="{ 'is-primary-row': b.isPrimary }">
            <td class="col-brand">
              <div class="brand-cell">
                <span class="rank-chip" :class="'chip-' + b.rank">#{{ b.rank }}</span>
                <span class="b-name">{{ b.name }}</span>
                <span v-if="b.isPrimary" class="primary-star">★首推</span>
              </div>
            </td>
            <td class="col-price">
              <span class="price-val">{{ b.priceFrom }}</span>
            </td>
            <td class="col-line">
              <div class="line-wrap">
                <div class="pills">
                  <span class="line-chip" v-for="l in b.lineType" :key="l">{{ l }}</span>
                </div>
                <span class="explain-text">{{ getLineExplain(b.lineType) }}</span>
              </div>
            </td>
            <td class="col-proto">
              <div class="proto-wrap">
                <div class="pills">
                  <span class="proto-chip" v-for="p in b.protocols" :key="p">{{ p }}</span>
                </div>
                <span class="explain-text">{{ getProtoExplain(b.protocols) }}</span>
              </div>
            </td>
            <td class="col-ease">
              <span class="ease-tag" :class="getEaseClass(b)">
                {{ getEaseLabel(b) }}
              </span>
            </td>
            <td class="col-rate">
              <div class="rate-wrap">
                <span class="stars-gold">⭐⭐⭐⭐⭐</span>
                <span class="rate-num">{{ getRating(b) }}</span>
              </div>
            </td>
            <td class="col-act">
              <a :href="b.registerUrl" target="_blank" rel="nofollow sponsored noopener" class="act-btn">
                直达官网
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-disclosure-note">
      <span>🛡️ 声明：数据综合网络稳定性、新手易用度、客服响应与性价比考量。含推广赞助链接，不影响用户结算价格。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import brandsData from '../../../data/brands.json'

const props = defineProps<{
  brandIds?: string[]
  limit?: number
}>()

const filteredBrands = computed(() => {
  let list = brandsData
  if (props.brandIds && props.brandIds.length > 0) {
    list = list.filter(b => props.brandIds?.includes(b.id))
  }
  const max = props.limit || (props.brandIds ? props.brandIds.length : 12)
  return list.slice(0, max)
})

const getLineExplain = (lines: string[]) => {
  const lineStr = lines.join(' ')
  if (lineStr.includes('IPLC')) return '【专线通道】物理直连不过公网防火墙，极低延迟，晚高峰零卡顿'
  if (lineStr.includes('IEPL') || lineStr.includes('内网专线')) return '【企业专线】陆港内网大带宽直连，晚高峰看超高清4K不缓冲'
  return '【中转优化】常规网络调度，适合日常网页浏览'
}

const getProtoExplain = (protos: string[]) => {
  const pStr = protos.join(' ')
  if (pStr.includes('VLESS')) return '轻量新标准，手机不发热，抗干扰能力强'
  if (pStr.includes('Trojan')) return '高仿 HTTPS 流量，隐蔽性极高不易被阻断'
  if (pStr.includes('Shadowsocks')) return '经典老牌协议，全平台客户端适配极广'
  return '通用代理标准'
}

const getEaseLabel = (brand: any) => {
  if (brand.rank === 1 || brand.id === 'tiziyun') return '极简单 (新手友好)'
  if (brand.rank <= 10) return '简单 (标准导入)'
  return '中等 (需按教程配置)'
}

const getEaseClass = (brand: any) => {
  if (brand.rank === 1 || brand.id === 'tiziyun') return 'ease-super'
  if (brand.rank <= 10) return 'ease-mid'
  return 'ease-norm'
}

const getRating = (brand: any) => {
  if (brand.rank === 1) return '4.9 分'
  if (brand.rank <= 5) return '4.8 分'
  if (brand.rank <= 15) return '4.6 分'
  return '4.3 分'
}
</script>

<style scoped>
.comparison-card-container {
  margin: 2.2rem 0;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.table-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.9rem 1.3rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.bar-badge {
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
}

.bar-sub {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.scroll-hint {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
}

.table-scroll-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pro-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  margin: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

.pro-table th {
  background: var(--vp-c-bg-soft);
  padding: 0.95rem 1rem;
  font-weight: 800;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  text-align: left;
  border-bottom: 2px solid var(--vp-c-divider);
  white-space: nowrap;
}

.pro-table td {
  padding: 0.95rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: middle;
}

.pro-table tr:hover {
  background: var(--vp-c-bg-mute);
}

.is-primary-row {
  background: rgba(37, 99, 235, 0.05) !important;
}

.brand-cell {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
}

.rank-chip {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: #3b82f6;
  color: #fff;
}

.rank-chip.chip-1 {
  background: #f59e0b;
}

.b-name {
  font-weight: 750;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}

.primary-star {
  font-size: 0.72rem;
  background: #10b981;
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-weight: 700;
}

.price-val {
  font-weight: 850;
  color: #ef4444;
  white-space: nowrap;
  font-size: 0.98rem;
}

.line-wrap, .proto-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 180px;
}

.pills {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.line-chip {
  font-size: 0.74rem;
  font-weight: 700;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.proto-chip {
  font-size: 0.74rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.explain-text {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  line-height: 1.35;
}

.ease-tag {
  font-size: 0.76rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  white-space: nowrap;
}

.ease-super {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
  font-weight: 750;
}

.ease-mid {
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-weight: 600;
}

.ease-norm {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
}

.rate-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  white-space: nowrap;
}

.stars-gold {
  letter-spacing: 1px;
  font-size: 0.8rem;
}

.rate-num {
  font-weight: 800;
  font-size: 0.82rem;
  color: var(--vp-c-text-1);
}

.act-btn {
  display: inline-block;
  padding: 0.4rem 0.85rem;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.2);
}

.act-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.table-disclosure-note {
  padding: 0.75rem 1.3rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}
</style>
