<template>
  <div class="next-step-card">
    <div class="next-step-inner">
      <div class="step-top-bar">
        <div class="step-pill">
          <span class="step-pulse"></span>
          <span class="step-badge-text">{{ stepText || '新手进阶 · 下一步' }}</span>
        </div>
        <span class="step-hint">循序渐进，建立系统化认知</span>
      </div>

      <div class="step-main">
        <h3 class="step-title">{{ title }}</h3>
        <p v-if="description" class="step-desc">{{ description }}</p>
      </div>

      <div class="step-bottom">
        <a :href="link" class="step-btn">
          <span>{{ buttonText || '开启下一章学习' }}</span>
          <span class="step-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  link: string
  description?: string
  stepText?: string
  buttonText?: string
}>()
</script>

<style scoped>
.next-step-card {
  margin: 3.5rem 0 2.5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
  border: 2px solid rgba(37, 99, 235, 0.25);
  padding: 1.75rem 2rem;
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.next-step-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2563eb, #10b981, #f59e0b);
}

.next-step-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 36px rgba(37, 99, 235, 0.12);
  transform: translateY(-2px);
}

.next-step-inner {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.step-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.step-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.step-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: step-blink 1.8s infinite;
}

@keyframes step-blink {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

.step-badge-text {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.step-hint {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.step-main {
  margin: 0.2rem 0;
}

.step-title {
  margin: 0 0 0.5rem 0 !important;
  font-size: 1.45rem !important;
  font-weight: 850;
  color: var(--vp-c-text-1);
  line-height: 1.35;
}

.step-desc {
  margin: 0 !important;
  font-size: 0.96rem;
  line-height: 1.68;
  color: var(--vp-c-text-2);
}

.step-bottom {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.4rem;
}

.step-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.8rem;
  background: var(--vp-c-brand-1);
  color: #fff !important;
  border-radius: 10px;
  font-weight: 750;
  font-size: 0.98rem;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
  transition: all 0.25s ease;
}

.step-btn:hover {
  background: var(--vp-c-brand-2);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.38);
  gap: 0.85rem;
}

.step-arrow {
  font-size: 1.15rem;
  transition: transform 0.2s ease;
}

.step-btn:hover .step-arrow {
  transform: translateX(4px);
}
</style>
