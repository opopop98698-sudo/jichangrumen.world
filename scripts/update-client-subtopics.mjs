import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

const subtopics = [
  {
    slug: 'clash-series',
    title: 'Clash 系列客户端推荐：Clash Verge Rev、FlClash 与 Mihomo 生态全景',
    lead: '原版 Clash for Windows 停更后，社区全面转向开源活跃的 Mihomo (Clash.Meta) 内核。Windows 与 Mac 首选 Clash Verge Rev，多平台首选极简 FlClash，二次元推荐 Clash Nyanpasu。',
    sections: [
      {
        title: '一、Clash 内核演进与 Mihomo 的崛起',
        content: `2023 年底原版 Clash 核心停更后，社区开发者创建了 **Mihomo (原名 Clash.Meta)**。Mihomo 完美继承了原有 Clash YAML 配置文件的全部规则语法，并原生增加了对 **VLESS-Reality、Hysteria2、TUIC、WireGuard** 等现代抗封锁协议的支持，同时大幅优化了 TUN 虚拟网卡接管引擎。`
      },
      {
        title: '二、主流 Clash 系客户端特性横评',
        content: `| 客户端名称 | 适用平台 | 特色与适用人群 | 官方项目地址 |
| :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Windows / macOS / Linux | 界面现代化、内置内核自动更新、TUN 模式完善、新手及进阶用户第一首选 | [GitHub Releases](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| **FlClash** | Windows / Mac / Android / Linux | 基于 Flutter 打造，轻量纯净，跨设备拥有完全一致的交互体验 | [GitHub Releases](https://github.com/chen08209/FlClash/releases) |
| **Clash Nyanpasu** | Windows / macOS / Linux | 基于 Rust + Tauri 框架开发，内存占用极低，二次元猫咪主题 | [GitHub Releases](https://github.com/libnyanpasu/clash-nyanpasu/releases) |
| **Clash Mi** | Windows / Android / iOS / macOS | 体积轻量，完全兼容 Clash 风格配置导入，运行高效 | [GitHub Releases](https://github.com/Clash-Mi/Clash-Mi/releases) |
| **Mihomo Party** | Windows / macOS | 针对 Mihomo 特性定制分流规则管理器，适合复杂路由与迁移用户 | [GitHub Releases](https://github.com/mihomo-party-org/mihomo-party/releases) |`
      },
      {
        title: '三、Mihomo Party 维护状态特别关注',
        content: `> [!NOTE] 维护活跃度提醒
> 选择客户端时务必关注项目的持续维护情况。Mihomo Party 应单独关注其项目更新频率，不宜在未经核实的情况下盲目将其标为持续更新的首选工具。日常使用建议稳妥选择活跃度极高的 **Clash Verge Rev** 或 **FlClash**。`
      }
    ],
    next: {
      title: '下一篇：V2Ray 系列客户端推荐',
      link: '/clients/v2ray-series',
      desc: '经典老牌 v2rayN、v2rayNG 与支持 Web 控制台的 v2rayA 详解。'
    }
  },
  {
    slug: 'v2ray-series',
    title: 'V2Ray 系列客户端推荐：v2rayN、v2rayNG 与 v2rayA 经典工具深度解析',
    lead: 'V2Ray (Xray) 家族是科学上网界历史最悠久的基石。Windows 首选 v2rayN，安卓手机首选 v2rayNG，而无桌面 Linux 服务器与家庭 NAS 则首选带 Web UI 的 v2rayA。',
    sections: [
      {
        title: '一、V2Ray 与 Xray 核心生态',
        content: `V2Ray 项目最早由 Victoria Raymond 发起，后经社区衍生出性能更高、协议更先进的 **Xray-core**。其最大优势在于对各种裸协议链接（如 \`vless://\`、\`vmess://\`、\`ss://\`、\`trojan://\`）的原生兼容度极高。`
      },
      {
        title: '二、三大家族成员分工',
        content: `1. **v2rayN (Windows PC)**：支持单节点、批量导入与多种规则路由包，是老牌网络爱好者的必备利器；
2. **v2rayNG (Android 手机)**：安卓生态中稳定性最好、内存占用最低的开源客户端，支持扫码导入与分应用代理；
3. **v2rayA (Linux / NAS / 路由器)**：提供独立的 Web 控制台网页，能在没有图形桌面的 Linux 主机或软路由中通过浏览器一键配置透明代理。`
      }
    ],
    next: {
      title: '下一篇：sing-box 新一代客户端生态',
      link: '/clients/sing-box-series',
      desc: '探索吞吐量巨大、内存占用超低的 sing-box 架构与 Hiddify、Karing。'
    }
  },
  {
    slug: 'sing-box-series',
    title: 'sing-box 系客户端：性能与低内存占用的新一代全平台架构',
    lead: 'sing-box 是近年来极客社区最推崇的高性能通用代理引擎。除了官方 SFA/SFI/SFM 原生客户端外，面向新手的 Hiddify 与 Karing 极大地降低了使用门槛。',
    sections: [
      {
        title: '一、sing-box 的技术优势',
        content: `相比传统内核，sing-box 使用纯 Go 语言进行了激进的重构与内存复用，其在路由器和移动端上的 CPU 占用率与耗电量比传统工具低 30% 以上。`
      },
      {
        title: '二、sing-box 衍生客户端矩阵',
        content: `| 客户端名称 | 适用平台 | 面向人群 | 特点说明 |
| :--- | :--- | :--- | :--- |
| **Karing** | iOS / Android / Win / Mac | 新手与多设备党 | 跨平台统一设计，国区 App Store 曾可直接搜索下载，多订阅合并管理 |
| **Hiddify** | 全平台 (Win/Mac/And/iOS/Linux) | 小白用户 | 多协议解析，自动测试最佳节点，界面简洁 |
| **sing-box 原生版** | SFA(安卓) / SFI(iOS) / SFM(Mac) | 极客开发者 | 支持直接加载原生 JSON 格式配置，无多余冗余 UI |`
      }
    ],
    next: {
      title: '下一篇：iOS 代理软件全家桶推荐',
      link: '/clients/ios-apps',
      desc: 'Shadowrocket、Stash、Quantumult X 与 Surge 5 权威横评。'
    }
  },
  {
    slug: 'ios-apps',
    title: 'iOS 代理软件指南：Shadowrocket、Stash、Quantumult X 与 Surge 5 权威横评',
    lead: '盘点苹果 App Store 上的 11 款主流代理工具：从 2.99 美元的装机神器小火箭，到 Clash 风格的 Stash，再到脚本极客的圈 X 与专业级 Surge 5，资费与功能深度对比。',
    sections: [
      {
        title: '一、11 款 iOS 代理软件全景观',
        content: `由于苹果审核规则，中国大陆区 App Store 无法直接上架此类工具。大部分应用需登录美区、港区或日区 Apple ID 获取：
1. **Shadowrocket (小火箭 - $2.99 买断)**：装机量最大的神器，扫码即用，极低功耗；
2. **Stash ($3.99 买断)**：Clash 风格的 iOS 客户端，完美兼容覆写与策略组；
3. **Quantumult X ($7.99 买断)**：功能全面的 JS 脚本调试与规则工具；
4. **Surge 5 (免费下载+高额内购)**：网络工程师的专业抓包分析神器；
5. **Karing (免费)**：国区 App Store 曾可直接获取，免去海外账号门槛；
6. **Streisand、Potatso、OneClick、Hiddify、Clash Mi**：免费备选多协议工具。`
      }
    ],
    next: {
      title: '下一篇：Windows 电脑客户端安装图解',
      link: '/clients/windows-install',
      desc: 'Clash Verge Rev 官方安装、TUN 虚拟网卡与开机自启动指引。'
    }
  },
  {
    slug: 'windows-install',
    title: 'Windows 客户端安装教程：Clash Verge Rev 下载、配置与 TUN 模式开启',
    lead: '手把手图文指导 Windows 10/11 安装 Clash Verge Rev：从 GitHub Release 获取 x64 安装包、解除 Windows Defender 拦截、配置开机静默自启与开启全局 TUN 虚拟网卡。',
    sections: [
      {
        title: '一、Windows 8 大客户端选型速览',
        content: `Windows 平台推荐以 **Clash Verge Rev** 为首选，**FlClash** 与 **v2rayN** 为备选。对于有特定需求的用户，还可选用 **Clash Nyanpasu**（二次元主题）或 **Hiddify**。`
      },
      {
        title: '二、Clash Verge Rev 安装四步法',
        content: `1. 访问官方仓库下载 \`Clash.Verge_x.x.x_x64-setup.exe\`；
2. 运行安装包，若弹出 Defender 拦截，点击「更多信息」→「仍要运行」；
3. 进入软件「设置」，开启「开机自启」与「静默启动」；
4. 若需外服游戏或命令行代理，进入「TUN 模式」安装服务组件并勾选开启。`
      }
    ],
    next: {
      title: '下一篇：macOS 客户端安装指南',
      link: '/clients/macos-install',
      desc: '苹果 M 系列与 Intel 芯片安装包选择与安全性授权。'
    }
  },
  {
    slug: 'macos-install',
    title: 'macOS 客户端安装指南：苹果 M 系列芯片 (Apple Silicon) 与 Intel 架构正确选型',
    lead: '针对 Mac 用户的专属指引：精准区分 aarch64 (M1/M2/M3/M4) 与 x64 (Intel) 安装包，在「安全性与隐私」中授权网络扩展，实现菜单栏优雅常驻。',
    sections: [
      {
        title: '一、如何确认自己的 Mac 芯片架构？',
        content: `点击屏幕左上角苹果图标  →「关于本机」：
- 若显示为 **Apple M1 / M2 / M3 / M4**，请下载文件名包含 **\`aarch64\`** 或 **\`arm64\`** 的 DMG 安装包；
- 若显示为 **Intel Core i5 / i7 / i9**，请下载文件名包含 **\`x64\`** 的 DMG 安装包。
混淆架构会导致 Rosetta 转译性能损耗甚至无法打开应用。`
      }
    ],
    next: {
      title: '下一篇：Android 客户端安装指南',
      link: '/clients/android-install',
      desc: 'APK 安装包获取、后台高耗电保活与 NekoBox 仿冒警示。'
    }
  },
  {
    slug: 'android-install',
    title: 'Android 客户端安装指南：APK 下载、后台保活设置与 NekoBox 仿冒警示',
    lead: '安卓手机保姆级教程：从 GitHub 下载正版 v2rayNG 与 FlClash，设置自启动与关闭智能省电，特别曝光 Google Play 上的 NekoBox 恶意仿冒陷阱。',
    sections: [
      {
        title: '一、安卓安装三要素',
        content: `1. **正版 APK 下载**：认准官方 GitHub Releases，下载 \`universal.apk\` 或 \`arm64-v8a.apk\`；
2. **防被杀后台设置**：在系统设置中允许自启动，电池策略调整为「无限制 / 允许后台高耗电」；
3. **分应用代理**：在设置中排除国内银行、外卖、购物 App，实现仅让指定软件走代理。`
      },
      {
        title: '二、NekoBox 仿冒木马风险曝光',
        content: `> [!CAUTION] 官方安全告警
> NekoBox 官方项目组已特别警示：其项目维护资源有限，**切勿下载 Google Play 商店中已被第三方恶意控制的仿冒版本**！所有安卓代理工具均请通过 GitHub 官方仓库直接下载原包。`
      }
    ],
    next: {
      title: '下一篇：iOS 客户端下载与美区账号获取',
      link: '/clients/ios-install',
      desc: '零海外信用卡获取美区 Apple ID 并下载正版小火箭。'
    }
  },
  {
    slug: 'ios-install',
    title: 'iOS 客户端安装指南：免海外信用卡注册美区 Apple ID 与购买指引',
    lead: '教你不用海外信用卡、使用普通国内邮箱直接注册免费美区 Apple ID，在 App Store 搜索购买正版 Shadowrocket (小火箭) 或免费获取 Karing。',
    sections: [
      {
        title: '一、两种最简 iOS 解决方案',
        content: `1. **方案 A（免海外 ID）**：在国区 App Store 直接搜索下载 **Karing**，同样支持导入多种机场订阅；或选择内置自研免配客户端的机场（如光速云）；
2. **方案 B（正版美区 ID）**：在苹果官网用全新邮箱注册国家选「美国」，付款方式选「None (无)」，在电商平台购买 3 美元礼品卡充值，即可终身正版购买 Shadowrocket。`
      }
    ],
    next: {
      title: '下一篇：客户端安全下载防毒指南',
      link: '/clients/safe-download',
      desc: '认准 GitHub 官方 Release 仓库，杜绝百度假冒全家桶。'
    }
  },
  {
    slug: 'safe-download',
    title: '客户端安全下载防毒指南：官方 GitHub 仓库合集与避坑流氓镜像站',
    lead: '曝光国内搜索引擎中所谓的「Clash 中文官网」流氓捆绑黑幕，汇集 40+ 款客户端的真实官方开源仓库网址，为小白筑牢第一道安全防线。',
    sections: [
      {
        title: '一、百度假冒 Clash 官网套路大起底',
        content: `搜索结果前三位的假冒网站会将原版开源程序解包，强行塞入弹窗挖矿脚本、广告推广全家桶甚至勒索病毒。正规开源项目均以 **GitHub Releases** 页面为唯一官方发行渠道。`
      }
    ],
    next: {
      title: '下一篇：40+ 客户端全维度功能横评',
      link: '/clients/comparison',
      desc: '内核、分流、内存占用与上手度全矩阵对比。'
    }
  },
  {
    slug: 'comparison',
    title: '客户端功能对比：全平台 40+ 款代理软件参数与易用度终极大对比',
    lead: '全景呈现 Windows、Android、iOS、macOS、Linux、OpenWrt 软路由 6 大平台 40+ 款客户端的内核、资费、TUN模式与分流深度全矩阵横向对比。',
    sections: [
      {
        title: '一、全平台客户端综合对比大表',
        content: `| 软件名称 | 主力平台 | 核心内核 | 资费类型 | TUN虚拟网卡 | 规则分流 | 新手推荐评分 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Win / Mac / Linux | Mihomo | 免费开源 | 支持 (一键) | 极强 | **99 分 (桌面首选)** |
| **v2rayNG** | Android | Xray-core | 免费开源 | 支持 (系统VPN) | 强 | **98 分 (安卓标配)** |
| **Shadowrocket** | iOS | 自研引擎 | 买断制 ($2.99) | 深度集成 | 极强 | **98 分 (苹果首选)** |
| **FlClash** | 全平台多端 | Mihomo | 免费开源 | 支持 | 极强 | **96 分 (跨端推荐)** |
| **Karing** | 全平台多端 | sing-box | 免费 | 支持 | 强 | **95 分 (新手友好)** |
| **OpenClash** | OpenWrt 软路由 | Mihomo/Clash | 免费开源 | 全局透明 | 极强 | **97 分 (路由首选)** |
| **Nikki** | OpenWrt (24.10+) | Mihomo | 免费开源 | 全局透明 | 极强 | **95 分 (新固件首选)** |`
      }
    ],
    next: {
      title: '前往第四站：使用教程实操指南',
      link: '/tutorials/',
      desc: '手把手教你如何将订阅链接导入客户端并实现秒开。'
    }
  }
]

for (const sub of subtopics) {
  const filePath = path.join(srcDir, 'clients', `${sub.slug}.md`)
  let content = `---
title: "${sub.title}"
description: "${sub.lead.replace(/"/g, "'")}"
---

# ${sub.title}

<div class="answer-first-lead">
  <strong>核心结论：</strong>${sub.lead}
</div>

<AffiliateNotice />

`
  for (const sec of sub.sections) {
    content += `## ${sec.title}\n\n${sec.content}\n\n`
  }

  if (sub.next) {
    content += `<NextStep
  title="${sub.next.title}"
  link="${sub.next.link}"
  description="${sub.next.desc}"
  stepText="客户端指南 · 下一步"
  buttonText="继续阅读 →"
/>
`
  }

  fs.writeFileSync(filePath, content, 'utf-8')
}

console.log('Successfully updated all 10 client subtopic pages!')
