<template>
  <div v-if="showByline" class="author-byline-bar">
    <div class="byline-meta-left">
      <div class="author-avatar-wrap">
        <img src="/avatar.webp" alt="作者团队头像" class="author-avatar" width="38" height="38" loading="lazy" decoding="async" />
      </div>
      <div class="author-info-group">
        <div class="author-name-row">
          <span class="author-role-label">执笔作者：</span>
          <span class="author-name">网络通信与协议评测组</span>
          <span class="verified-tag">🛡️ 专家核验</span>
        </div>
        <div class="author-subtext">
          <span>审核：资深架构团队</span>
          <span class="dot-divider">·</span>
          <span>测试基准：三网 1000M FTTH 实测</span>
          <span class="dot-divider">·</span>
          <span class="audit-date">更新于：2026年10月</span>
        </div>
      </div>
    </div>
    <div class="byline-meta-right">
      <span class="eeat-badge">
        <span class="badge-icon">✓</span>
        <span class="badge-text">原创首发 / 独立实测</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

// Only show on doc content pages (not home, not 404, not privacy, not terms)
const showByline = computed(() => {
  const p = page.value.relativePath || ''
  if (!p || p === 'index.md' || p === '404.md' || p === 'privacy.md' || p === 'terms.md') {
    return false
  }
  return true
})
</script>

<style scoped>
.author-byline-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1.15rem;
  margin: 1.25rem 0 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.byline-meta-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.author-avatar-wrap {
  flex-shrink: 0;
}

.author-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid var(--vp-c-brand-1);
  display: block;
}

.author-info-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author-name-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.92rem;
}

.author-role-label {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.author-name {
  font-weight: 750;
  color: var(--vp-c-text-1);
}

.verified-tag {
  font-size: 0.74rem;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.dark .verified-tag {
  color: #10b981;
}

.author-subtext {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.dot-divider {
  color: var(--vp-c-divider);
}

.audit-date {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.byline-meta-right {
  flex-shrink: 0;
}

.eeat-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 700;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  color: var(--vp-c-text-1);
}

.badge-icon {
  color: #10b981;
  font-weight: 800;
}

@media (max-width: 640px) {
  .author-byline-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .byline-meta-right {
    align-self: flex-end;
  }
}
</style>
