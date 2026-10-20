<template>
  <div class="affiliate-notice-card">
    <div class="notice-badge-col">
      <span class="shield-badge">🛡️ 合规披露</span>
    </div>
    <div class="notice-content-col">
      <h5 class="notice-headline">独立第三方科普立场与商业佣金声明</h5>
      <p class="notice-text">
        本站为面向零基础用户的独立网络通信技术与软件使用教育博客，与任何第三方服务商无资本或股权隶属关系。
        站内部分前往服务商官网的通道包含推广链接（Affiliate Links），通过链接完成注册可能为本站运营带来少量佣金支持，但这<strong>绝不会影响您的结算价格与会员权益</strong>。
        所有数据均基于公开资料与标准化环境实测，未确认指标统一标记为「待核实」，商家宣传标注「品牌资料显示」。
        本站严格遵守法律法规，<strong>坚决拒绝并严禁提供任何形式的翻墙节点、绕过审查教程或非法订阅资源</strong>。
      </p>
    </div>
  </div>
</template>

<style scoped>
.affiliate-notice-card {
  display: flex;
  gap: 1.25rem;
  margin: 2.2rem 0;
  padding: 1.25rem 1.6rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: 5px solid var(--vp-c-brand-1);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}

.notice-badge-col {
  flex-shrink: 0;
}

.shield-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  background: rgba(37, 99, 235, 0.1);
  color: var(--vp-c-brand-1);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid rgba(37, 99, 235, 0.25);
  white-space: nowrap;
}

.notice-content-col {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.notice-headline {
  margin: 0 !important;
  font-size: 1.02rem !important;
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.notice-text {
  margin: 0 !important;
  font-size: 0.88rem !important;
  line-height: 1.7 !important;
  color: var(--vp-c-text-2) !important;
}

.notice-text strong {
  color: var(--vp-c-text-1);
  font-weight: 750;
}

@media (max-width: 640px) {
  .affiliate-notice-card {
    flex-direction: column;
    gap: 0.6rem;
    padding: 1rem 1.2rem;
  }
}
</style>
