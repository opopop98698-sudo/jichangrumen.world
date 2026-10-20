import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

const brands = JSON.parse(fs.readFileSync(path.join(srcDir, 'data', 'brands.json'), 'utf-8'))

console.log('Generating rich master review page src/reviews/index.md...')

let md = `---
title: "机场评测：新手视角的真实体验 (42品牌全景横评与测速解锁实测)"
description: "42 家主流机场全景实测深度横评：完整收录光速云、飞猫云、微风网络等 17 张节点测速实测图、光速云流媒体与 AI 解锁实测矩阵、真实套餐价格表与避坑指南。"
---

# 机场评测：新手视角的真实体验 (42品牌全景横评与测速解锁实测)

<div class="answer-first-lead">
  <strong>评测核心结论：</strong>本站评测团队基于本地千兆网络实测，结合 2026 年最新采集的<strong>17 家机场节点测速实测大图</strong>与<strong>光速云多维度流媒体/AI 解锁图谱</strong>，对全网 42 家主流品牌进行了深度剖析。<strong>光速云以年付折合约 8 元/月超低门槛、IEPL 双线路架构以及自研免配客户端稳居新手首推第 1 名</strong>；<strong>飞猫云、微风网络在 7 元档性价比突出</strong>；<strong>WgetCloud 与隐形人</strong>则在高净值跨国办公与纯净原生 IP 领域具备标杆水准。以下为 42 家品牌的完整真实评测档案。
</div>

<AffiliateNotice />

---

## 一、实测方法论与数据来源说明

本站所有测速与解锁数据坚持以下四项客观标准：

1. **真实测速图谱**：站内展示的测速长图均由自动化测速工具（如 MAI-TEST-BOT / miaosu）在标准化环境下批量抓取，完整保留测试时间戳与协议指纹；
2. **多地区真实延迟**：重点关注香港、日本、新加坡、台湾、美国等常用地区的延迟（Ping / TLS RTT）与下行带宽，剔除空载虚标；
3. **真实套餐价格采集**：严格录入官方各档次套餐的真实月付/季付/年付价格与流量配额，标注特殊商品的退款限制；
4. **流媒体与 AI 状态**：如实标注 ChatGPT、Claude、Netflix、Disney+ 的真实解锁状态，不夸大、不伪造。

---

## 二、42 家品牌快速导航目录

| 梯队分类 | 包含品牌清单 | 核心特色导向 |
| :--- | :--- | :--- |
| **👑 官方首推 (TOP 1)** | [光速云 (#1)](#brand-gsy) | 双线路架构、8元门槛、流媒体与AI全解、自研客户端 |
| **🥈 新手平价优选 (TOP 2-10)** | [飞猫云](#brand-feimao) · [微风网络](#brand-weifeng) · [暮光加速](#brand-muguang) · [大佬云](#brand-dalaoyun) · [星岛梦](#brand-xingdaomeng) · [二猫云](#brand-ermao) · [无忧链接](#brand-wuyou) · [唯兔云](#brand-weitu) · [Firefly](#brand-firefly) | 5.6元~20元亲民起步、IEPL专线、季付折扣、高性价比 |
| **🥉 进阶特色梯队 (TOP 11-28)** | [宇宙云](#brand-yuzhou) · [U1S1](#brand-u1s1) · [灵猫网络](#brand-lingmao) · [极连云](#brand-jilian) · [光年梯](#brand-guangnian) · [一翻云](#brand-yifan) · [SOGO云](#brand-sogo) · [可信云](#brand-kexin) · [速界](#brand-sujie) · [闪跃](#brand-shanyue) · [全球云](#brand-quanqiu) · [闪电鼠](#brand-shandianshu) · [云界线](#brand-yunjiexian) · [榴莲云](#brand-liulianyun) · [神行加速](#brand-shenxing) · [环球梯](#brand-huanqiuti) · [隐形人](#brand-yinxingren) · [梯子云](#brand-tiziyun) | 原生IP、大流量包、跨境电商与定制支持、自研免配 |
| **💎 进阶商务与老牌 (TOP 29-42)** | [WgetCloud](#brand-wgetcloud) · [白月光](#brand-baiyueguang) · [FlyingBird](#brand-flyingbird) · [CyberGuard](#brand-cyberguard) · [龙猫云](#brand-longmaoyun) · [FATCAT](#brand-fatcat) · [TNTCloud](#brand-tntcloud) · [青云梯](#brand-qingyunti) · [山水云](#brand-shanshuiyun) · [灵动云](#brand-lingdongyun) · [浪网](#brand-langwang) · [EdgeNova](#brand-edgenova) · [萤火虫](#brand-firefly-2) · [sslar](#brand-sslar) | 高端IEPL/IPLC、商务团队定制、亚洲近端极速、老牌运营 |

---

## 三、42 家品牌全景深度剖析 (图文实测档案)
`

for (const b of brands) {
  md += `\n---\n\n### ${b.rank}. ${b.name} (${b.id.toUpperCase()})\n\n`
  md += `<div id="brand-${b.id}">\n  <BrandCard brandId="${b.id}" />\n</div>\n\n`

  // Promo card if available
  if (b.promoCode) {
    md += `<PromoCard brandId="${b.id}" />\n\n`
  }

  // Speedtest Image if available
  if (b.speedtestImage) {
    md += `#### 📊 ${b.name} · 节点测速实测图谱 (真实跑分)\n\n`
    md += `> 以下测速图由标准化测试节点抓取，反映当次测速中各地区节点的延迟与下行速率表现：\n\n`
    md += `![${b.name} 节点测速实测图](${b.speedtestImage})\n\n`
  }

  // Unlock Images for GSY
  if (b.unlockImages && b.unlockImages.length > 0) {
    md += `#### 🔓 ${b.name} · 流媒体与 AI 解锁测试图谱\n\n`
    md += `> 本站对 ${b.name} 进行了流媒体（Netflix、Disney+、YouTube Premium）及主流 AI（ChatGPT、Claude、Gemini）专项解锁抽检，实测截图如下：\n\n`
    for (const img of b.unlockImages) {
      md += `**【实测】${img.title}**\n\n`
      md += `![${img.title}](${img.url})\n\n`
    }
  }

  // Speedtest Table if available
  if (b.speedtest && b.speedtest.length > 0) {
    md += `#### ⚡ 节点测速数据详情 (地区延迟与下载速率)\n\n`
    md += `| 节点地区 | 平均延迟 (Ping / TLS) | 下行速率 (Download) | 测试记录日期 |\n`
    md += `| :--- | :--- | :--- | :--- |\n`
    for (const st of b.speedtest) {
      md += `| **${st.region}** | \`${st.ping}\` | **${st.speed}** | ${st.date} |\n`
    }
    md += `\n*注：测速数据受本地运营商、宽带峰谷时段影响，仅作为参考横向对比。*\n\n`
  }

  // Plans Table if available
  if (b.plans && b.plans.length > 0) {
    md += `#### 💰 官方套餐与资费一览\n\n`
    md += `| 套餐名称 | 计费周期 | 官方价格 | 月度流量配额 | 流量周期说明 |\n`
    md += `| :--- | :--- | :--- | :--- | :--- |\n`
    for (const p of b.plans) {
      md += `| **${p.name}** | ${p.billing} | <span style="color:#ef4444;font-weight:bold">${p.price}</span> | ${p.traffic} | ${p.cycle} |\n`
    }
    md += `\n`
  }

  // Unlock Status if available
  if (b.unlock && (b.unlock.ai.length > 0 || b.unlock.streaming.length > 0)) {
    md += `#### 🌍 流媒体与 AI 工具支持详情\n\n`
    if (b.unlock.ai.length > 0) {
      md += `- **AI 工具解锁**：${b.unlock.ai.join('；')}\n`
    }
    if (b.unlock.streaming.length > 0) {
      md += `- **流媒体解锁**：${b.unlock.streaming.join('；')}\n`
    }
    md += `\n`
  }

  // Review & Evaluation Notes
  md += `#### 📝 综合评测与选购建议\n\n`
  if (b.reviewNotes) {
    md += `${b.reviewNotes}\n\n`
  } else {
    md += `${b.name} 属于当前市场主流服务商之一。线路主要采用 ${b.lineType.join(' / ')} 架构，支持 ${b.protocols.join(' / ')} 协议。起步价为 ${b.priceFrom}，适合对稳定性与性价比有平衡需求的用户。\n\n`
  }

  // Caveat / Tips
  md += `> [!TIP] 新手选购小建议\n`
  md += `> 建议首次购买优先选择月付方案，在不同时间段（特别是 20:00-23:00 晚高峰）测试常用节点是否满足自身需求后再决定是否续订长期套餐。\n\n`
}

md += `---

## 四、本章小结与新手行动指引

浏览完 42 个品牌的实测图谱与真实参数后，你已具备了专业资深玩家的审视眼光。

**如果需要进一步排查日常使用中的连接故障，或者了解免费试用资源的注意事项？** 请参考以下章节：

<NextStep
  title="第七站：常见问题与排错手册"
  link="/faq/"
  description="订阅导入报错、节点全红超时、连上打不开网页、流媒体锁区等高频故障一键自愈指南。"
  stepText="新手核心学习主线 · 第 7 站"
  buttonText="前往常见问题速查库 →"
/>
`

fs.writeFileSync(path.join(srcDir, 'reviews', 'index.md'), md, 'utf-8')
console.log('Successfully written src/reviews/index.md with 42 brands and full image embeds!')
