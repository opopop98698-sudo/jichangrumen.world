import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

const topics = [
  // ================= 1. recommend (10) =================
  {
    dir: 'recommend',
    slug: 'beginner-friendly',
    title: '新手入门机场推荐：操作简单与高稳定性优选',
    lead: '对于从未买过机场的新手，首要指标并非极限跑分，而是上手容易度与晚高峰稳定性。推荐首月月付 8-15 元档位的企业专线机场（如光速云），自带清晰一键导入指引，支持支付宝扫码，试错成本极低。',
    sections: [
      {
        title: '一、新手入门的核心痛点与选择标准',
        content: `新手在初次购买机场时，最容易遭遇两类问题：一是遇到缺乏教程的极客小站，拿到一串代码不知道往哪里贴；二是买到了晚高峰严重丢包的劣质中继，看视频持续缓冲转圈。
因此，新手入门的首选标准必须具备：① 提供一键导入主流客户端功能；② 采用 IEPL 企业级专线架构；③ 支持月付 10 元左右的亲民门槛。`
      },
      {
        title: '二、入门精选品牌剖析',
        content: `在全网 42 家品牌中，光速云与飞猫云对新手的友好度最高。不仅后台自带详细图文教程，更针对 Clash Verge 和 Shadowrocket 提供了一键唤起配置。
<BrandCard brandId="gsy" />
<PromoCard brandId="gsy" />`
      },
      {
        title: '三、新手首单操作三步走',
        content: `1. **注册账号**：仅需邮箱注册，无需绑定个人手机号保护隐私；
2. **选择小额套餐**：首次务必选择「月付轻量版」，切勿直接购买大额年付；
3. **一键导入**：在后台点击「一键导入到 Clash」，软件自动完成全部节点加载与密钥配置。`
      }
    ],
    next: {
      title: '下一篇：操作简单的免配置机场推荐',
      link: '/recommend/easy-setup',
      desc: '不想手动配置任何参数？了解哪些机场提供了自研全平台客户端，像普通软件一样登录即可使用。'
    }
  },
  {
    dir: 'recommend',
    slug: 'easy-setup',
    title: '操作简单的机场推荐：免配置与一键直连指南',
    lead: '免配置机场专为排斥繁琐设置的用户打造。这类机场通常提供官方定制客户端或全自动一键导入协议，用户只需下载安装后输入账号密码，点击「连接」按钮即可畅游全球网络。',
    sections: [
      {
        title: '一、什么是「免配置机场」？',
        content: `传统机场需要用户先自行在 GitHub 下载开源客户端（如 Clash Verge），然后将订阅网址手动复制并粘贴进去。而「免配置机场」则直接将订阅引擎打包进官方自研软件中，免去了所有繁琐的中间步骤。`
      },
      {
        title: '二、适合免配置需求的高口碑品牌',
        content: `梯子云与光速云在这方面表现突出，提供覆盖 Windows、Mac、Android 的一键登录客户端，并支持手机扫码登录。
<BrandCard brandId="tiziyun" />
<BrandCard brandId="gsy" />`
      },
      {
        title: '三、免配置客户端的优缺点权衡',
        content: `| 优势维度 | 免配置客户端 | 开源通用客户端 (如Clash) |
| :--- | :--- | :--- |
| **上手门槛** | 极低（输入账号密码即可） | 中等（需导入订阅链接） |
| **节点更新** | 软件自动静默同步 | 需设置定时拉取 |
| **灵活性** | 固定规则，无法自定义分流 | 高度灵活，支持自定义规则规则集 |`
      }
    ],
    next: {
      title: '下一篇：适合手机使用的机场推荐',
      link: '/recommend/mobile-first',
      desc: '经常在 iPhone 或安卓手机上看视频、刷社交媒体？了解针对移动端优化的机场选型要点。'
    }
  },
  {
    dir: 'recommend',
    slug: 'mobile-first',
    title: '适合手机的机场推荐：iOS 与 Android 移动端友好指南',
    lead: '移动端由于受到系统后台电池策略与 Wi-Fi/蜂窝移动网络频繁切换的影响，对代理协议的轻量化与连接唤醒速度要求极高。推荐采用轻量 VLESS 协议的专线机场，手机不发热、不杀后台且耗电极低。',
    sections: [
      {
        title: '一、手机端网络的三大特殊挑战',
        content: `1. **电量消耗**：传统高强度加解密协议会导致手机 CPU 持续运算发热，选择 VLESS-Reality 能大幅节省电量；
2. **切网重连**：当用户走出家门从 Wi-Fi 切换为 5G 基站时，优秀节点能在 0.5 秒内无缝重连；
3. **后台保活**：国产安卓系统容易杀死代理进程，需要客户端具备原生 VPNService 级别保活。`
      },
      {
        title: '二、手机友好型服务商推荐',
        content: `光速云与飞猫云全节点普及了现代轻量 VLESS 协议，iOS 搭配 Shadowrocket，安卓搭配 v2rayNG，锁屏待机一整天耗电量不足 3%。
<BrandCard brandId="feimao" />`
      }
    ],
    next: {
      title: '下一篇：适合电脑主力的机场推荐',
      link: '/recommend/desktop-pc',
      desc: '需要外贸办公、学术大文件下载或外服游戏？了解针对 PC 电脑端的高带宽专线方案。'
    }
  },
  {
    dir: 'recommend',
    slug: 'desktop-pc',
    title: '适合电脑的机场推荐：Windows 与 Mac 桌面端高带宽优选',
    lead: '电脑桌面端通常承载着多标签页高并发浏览、高清 4K 视频持续串流以及 Git/Python 学术大文件拉取等重度生产力任务，要求机场具备千兆专线出口与超大带宽冗余。',
    sections: [
      {
        title: '一、电脑端核心诉求：大带宽与 TUN 模式支持',
        content: `在 PC 端，不仅浏览器需要走代理，命令行终端（PowerShell / Terminal）、Docker 镜像拉取以及海外会议软件（Zoom / Teams）同样需要顺畅访问。这要求所选机场必须良好支持 Clash Verge Rev 的 TUN 虚拟网卡接管。`
      },
      {
        title: '二、高带宽商务生产力推荐',
        content: `<BrandCard brandId="wgetcloud" />
<BrandCard brandId="cyberguard" />`
      }
    ],
    next: {
      title: '下一篇：有免费试用的机场推荐',
      link: '/recommend/free-trial',
      desc: '想先验货再买单？盘点真实提供注册即送体验流量的正规服务商。'
    }
  },
  {
    dir: 'recommend',
    slug: 'free-trial',
    title: '有免费试用的机场推荐：零成本上车体验指南',
    lead: '正规优质机场往往对自身网络稳定性充满信心，通常在用户注册后直接赠送 1GB - 5GB 体验流量或提供 1-3 天全功能试用。利用试用不仅能检验本地宽带匹配度，还能验证客户端导入流程。',
    sections: [
      {
        title: '一、如何正确利用免费试用？',
        content: `1. 验证晚高峰连通性：在晚上 21:00 打开 YouTube 播放一段 4K 视频，观察起播时间是否小于 2 秒；
2. 测试流媒体与 IP 纯净度：打开 ChatGPT 登录页，确认是否会弹出 Cloudflare 验证码；
3. 满意后再选择最低月付套餐结算，不满意直接更换。`
      },
      {
        title: '二、支持试用体验的品牌精选',
        content: `<BrandCard brandId="gsy" />
<BrandCard brandId="wuyou" />`
      }
    ],
    next: {
      title: '下一篇：运营多年老牌稳定机场推荐',
      link: '/recommend/established-stable',
      desc: '担心跑路风险？了解运营 3-5 年以上、口碑深厚的老牌服务商。'
    }
  },
  {
    dir: 'recommend',
    slug: 'established-stable',
    title: '老牌稳定机场推荐：历经考验的长跑选手盘点',
    lead: '在机场行业，「活着」就是最大的竞争力。运营 2 年以上甚至 5 年的老牌机场，通常拥有稳定的跨境物理专线资源、成熟的运维自动化调度以及雄厚的资金储备，抗突发风险能力远超新开作坊。',
    sections: [
      {
        title: '一、老牌机场的核心优势',
        content: `新开几个月的机场往往靠超低价年付吸纳资金，一旦遭遇骨干网波动或成本倒挂极易关站跑路。而老牌机场（如光速云自 2020 年运营、星岛梦自 2020 年运营、青云梯 6 年运营）经过数轮重大考验，信誉值得信赖。`
      },
      {
        title: '二、长青稳定品牌档案',
        content: `<BrandCard brandId="gsy" />
<BrandCard brandId="xingdaomeng" />`
      }
    ],
    next: {
      title: '下一篇：支持支付宝便捷支付的机场',
      link: '/recommend/alipay-payment',
      desc: '没有外币信用卡？了解支持国内支付宝、微信扫码支付的安全机场。'
    }
  },
  {
    dir: 'recommend',
    slug: 'alipay-payment',
    title: '支持支付宝的机场推荐：国内主流支付渠道与安全指引',
    lead: '对于国内小白而言，支持支付宝当面付或扫码支付是购买体验的核心保障。不需要繁琐注册海外虚拟信用卡或购买 USDT，结算体验像在电商平台购物一样简单顺畅。',
    sections: [
      {
        title: '一、支付宝支付时的安全考量',
        content: `正规服务商通过第三方合规支付网关或个人当面付通道进行结算。账单通常显示为普通商户名称，不会出现任何敏感字眼，充分保障用户隐私与资金安全。`
      },
      {
        title: '二、支付宝友好型品牌精选',
        content: `<BrandCard brandId="feimao" />
<BrandCard brandId="dalaoyun" />`
      }
    ],
    next: {
      title: '下一篇：有客服群与工单响应的机场',
      link: '/recommend/customer-support',
      desc: '遇到问题找不到人？了解具备活跃 Telegram 交流群与高效工单的服务商。'
    }
  },
  {
    dir: 'recommend',
    slug: 'customer-support',
    title: '有客服群的机场推荐：新手遇到问题有人帮的温情服务',
    lead: '新手在使用过程中难免遇到节点超时、客户端闪退或订阅解析错误。具备 7×24 小时工单系统以及官方 Telegram 交流群的机场，能让新手在 15 分钟内获得真人协助，拒绝石沉大海。',
    sections: [
      {
        title: '一、售后服务的重要性',
        content: `很多廉价机场完全没有客服人员，提单数天无人问津。而高品质机场拥有专职运维，并在群内实时发布节点维护通知与客户端配置答疑。`
      },
      {
        title: '二、客服高满意度品牌推荐',
        content: `<BrandCard brandId="gsy" />
<BrandCard brandId="yinxingren" />`
      }
    ],
    next: {
      title: '下一篇：新手避坑推荐与淘汰清单',
      link: '/recommend/pitfalls-avoidance',
      desc: '买之前必看：全网最容易踩坑的五类商家与诱饵套路全曝光。'
    }
  },
  {
    dir: 'recommend',
    slug: 'pitfalls-avoidance',
    title: '新手避坑推荐：哪些类型的机场新手绝对不能碰',
    lead: '避开一个雷，胜过十次盲选。新手切勿触碰「永久不限时低价年付」「纯单线直连 2 元店」「必须私聊转账交易」等高危陷阱，坚守月付原则方能立于不败之地。',
    sections: [
      {
        title: '一、五大典型跑路套路大起底',
        content: `1. **开业大促 99 元买永久**：99% 活不过半年即关站；
2. **万人挤挤堂的纯直连小作坊**：晚高峰延迟 800ms，丢包 40%；
3. **TG 私聊客服个人转账**：缺乏平台担保，付款即被拉黑；
4. **号称自研翻墙神器的流氓 App**：内置弹窗木马嗅探网络。`
      },
      {
        title: '二、防坑黄金四问自查',
        content: `在点击付款前问自己四句话：支持月付吗？线路是企业专线吗？有详细一键导入指引吗？有明确的独立合规声明吗？`
      }
    ],
    next: {
      title: '下一篇：新手第一单买什么最划算',
      link: '/recommend/first-purchase-guide',
      desc: '手把手带你完成第一单的下单决策：金额控制、套餐选择与结算实操。'
    }
  },
  {
    dir: 'recommend',
    slug: 'first-purchase-guide',
    title: '新手第一单买什么：预算控制与起步套餐最优解',
    lead: '新手第一单的预算建议严格锁定在 8 - 15 元人民币之间，流量配额选择 50G - 150G 的月付方案。这个配置足以支撑每天看 2 小时 1080p 视频与全天候网页浏览，既满足需求又绝不浪费。',
    sections: [
      {
        title: '一、新手流量消耗估算表',
        content: `| 常见网络场景 | 单小时流量消耗 | 100G 套餐可支撑时长 |
| :--- | :--- | :--- |
| **Google/网页查资料/推特** | 约 20MB - 50MB | 约 2,000 小时 (完全用不完) |
| **YouTube 1080p 视频播放** | 约 600MB - 1GB | 约 100 - 150 小时 |
| **YouTube 4K 超高清视频** | 约 3GB - 6GB | 约 20 - 30 小时 |
| **ChatGPT / 学术论文检索** | 约 10MB - 30MB | 约 3,500 小时 |`
      },
      {
        title: '二、第一单推荐组合',
        content: `<BrandCard brandId="gsy" />
<PromoCard brandId="gsy" />`
      }
    ],
    next: {
      title: '前往：全网 42 家机场深度评测中心',
      link: '/reviews/',
      desc: '查看全量 42 家服务商从第 1 位到第 42 位的横向参数与详细评测记录。'
    }
  }
]

// Now let's add secondary topics for the other sections:
// what-is-airport (10)
// guides (10)
// clients (10)
// tutorials (10)
// faq (10)
// free (9)
// reviews (10)

const sectionsConfig = [
  // 2. what-is-airport
  {
    dir: 'what-is-airport',
    slug: 'concepts',
    title: '机场基本概念：为什么叫机场？从纸飞机到商业中继',
    lead: '「机场」是中文网络中代理中继服务商的俚语简称。起源于 Shadowsocks 的纸飞机图标，后来管理大量海外中继服务器的网站被形象地比作「机场」，成为连接海外互联网的基础设施。',
    sections: [
      {
        title: '一、纸飞机与机场的历史演变',
        content: '早期科学上网依靠个人搭建单个节点，随着 ShadowsocksR 开源及 Web 面板的普及，多个节点的集中调度平台应运而生。因主软件图标为纸飞机，网友形象地将停驻、调度多架飞机的服务商称为机场。'
      },
      {
        title: '二、机场生态的核心角色分工',
        content: '机场负责租用国际专线与机房；客户端负责在本地解析流量并进行智能分流；用户通过订阅链接实现二者连接。'
      }
    ],
    next: { title: '下一篇：机场与 VPN 的本质区别', link: '/what-is-airport/vs-vpn', desc: '为什么打着 VPN 旗号的海外软件经常在中国水土不服？' }
  },
  {
    dir: 'what-is-airport',
    slug: 'vs-vpn',
    title: '机场与 VPN 区别：底层架构与中国网络环境适配深度对比',
    lead: '传统 VPN 旨在为企业员工建立远程加密隧道，缺乏特征伪装与中国流量智能分流；而现代机场专为跨国网络访问优化，采用 VLESS/Trojan 等伪装协议，并支持国内应用无感直连。',
    sections: [
      {
        title: '一、协议设计初衷差异',
        content: '传统 VPN（如 OpenVPN、IPsec）数据包头特征明显，极易被防火墙检测并阻断；机场采用的协议伪装成正常 HTTPS 流量，抗封锁能力极高。'
      },
      {
        title: '二、智能分流与体验对比',
        content: 'VPN 默认全局接管，导致国内微信、淘宝卡顿并报异地登录；机场通过规则分流，国内应用直接走本地宽带，海外走专线，两全其美。'
      }
    ],
    next: { title: '下一篇：机场节点究竟是什么', link: '/what-is-airport/nodes-explained', desc: '深入理解入口、中继与落地机房的运作机制。' }
  },
  {
    dir: 'what-is-airport',
    slug: 'nodes-explained',
    title: '机场节点是什么：入口、通道、落地机房与原生 IP 解析',
    lead: '节点是部署在全球各地的代理服务器。一个完整的节点由三部分构成：国内接入入口（负责接客）、跨国传输通道（公网直连或专线）、海外落地机房（负责向目标网站发请求）。',
    sections: [
      {
        title: '一、节点的物理链路拓扑',
        content: '你的设备 → 国内中继入口机房 → IEPL 跨境专线 → 境外落地服务器（香港/日本/美国） → 目标网站。'
      },
      {
        title: '二、原生住宅 IP 与机房 IP 的区别',
        content: '机房 IP 容易被 Netflix 和 ChatGPT 识别并拦截；原生住宅 IP 伪装成海外家庭宽带，通过率高达 99%。'
      }
    ],
    next: { title: '下一篇：机场订阅是什么与原理', link: '/what-is-airport/subscription-explained', desc: '搞懂那串长长的网址到底装了什么。' }
  },
  {
    dir: 'what-is-airport',
    slug: 'subscription-explained',
    title: '机场订阅是什么：配置文件、动态下发与密钥安全原理',
    lead: '订阅链接是一串包含了所有节点服务器地址、端口、加密协议与专属密钥的动态 URL。客户端通过拉取该链接，一次性获取几十个节点的完整配置。',
    sections: [
      {
        title: '一、订阅链接的内部数据结构',
        content: '订阅链接通过 Base64 编码或标准 YAML 格式封装了所有节点信息。当机场更新服务器 IP 时，客户端只需刷新订阅即可同步，无需手动修改参数。'
      },
      {
        title: '二、保护订阅安全的重要性',
        content: '订阅链接包含你的账户密钥，任何人拿到该链接都能使用你的流量。切勿在公共网络或截屏中透露订阅 URL。'
      }
    ],
    next: { title: '下一篇：机场协议是什么', link: '/what-is-airport/protocols-explained', desc: 'VLESS、Trojan、Shadowsocks 各自优劣何在？' }
  },
  {
    dir: 'what-is-airport',
    slug: 'protocols-explained',
    title: '机场协议解析：Shadowsocks、VLESS、Trojan 与 Hysteria 优劣横评',
    lead: '代理协议决定了数据传输的加密方式与伪装强度。当前主流标准以轻量抗封锁的 VLESS-Reality 为首，兼容性好的 Shadowsocks 居次，而高延迟丢包环境下 Hysteria2 速度亮眼。',
    sections: [
      {
        title: '一、主流协议四大家族横评',
        content: `| 协议名称 | 伪装特性 | 手机耗电 | 抗审查能力 | 新手推荐度 |
| :--- | :--- | :--- | :--- | :--- |
| **VLESS** | 极强 (伪装主流网站TLS) | 极低 | ⭐⭐⭐⭐⭐ | **目前首推标准** |
| **Trojan** | 强 (仿冒真实HTTPS服务器) | 低 | ⭐⭐⭐⭐ | 稳定老牌 |
| **Shadowsocks** | 中 (强对称加密) | 极低 | ⭐⭐⭐ | 经典兼容好 |
| **Hysteria2** | UDP 暴力发包加速 | 中等 | ⭐⭐⭐⭐ | 恶劣网络提速利器 |`
      }
    ],
    next: { title: '下一篇：机场线路是什么', link: '/what-is-airport/lines-explained', desc: '公网直连、BGP 中转与 IEPL 专线的质量天壤之别。' }
  },
  {
    dir: 'what-is-airport',
    slug: 'lines-explained',
    title: '机场线路科普：公网直连、BGP中转与 IEPL/IPLC 企业专线深度剖析',
    lead: '线路决定了网络的速度与晚高峰延迟稳定性。廉价直连线路晚高峰丢包严重；BGP 能够智能调度三网；而 IEPL/IPLC 企业专线通过物理内网直通，晚高峰零拥堵，看 4K 秒开。',
    sections: [
      {
        title: '一、公网直连 vs 企业专线物理图景',
        content: '普通公网直连相当于所有车挤在普通省道，逢年过节必定大塞车；IEPL 专线相当于封闭式专用高铁轨道，时刻准点，不受公网大环境影响。'
      }
    ],
    next: { title: '下一篇：机场客户端是什么', link: '/what-is-airport/clients-explained', desc: '为什么有了机场还要安装客户端？' }
  },
  {
    dir: 'what-is-airport',
    slug: 'clients-explained',
    title: '机场客户端定位与作用：本地网络分流与流量接管引擎',
    lead: '客户端是安装在电脑或手机上的本地网络转发软件。它负责拦截应用程序的网络请求，根据预设规则判断：国内网址本地放行，国外网址加密后送往机场专线。',
    sections: [
      {
        title: '一、客户端与机场的关系',
        content: '客户端如同汽车硬件，机场提供的是汽油与高速公路通告卡。汽车本身免费开源，买油卡即可驰骋。'
      }
    ],
    next: { title: '下一篇：机场收费模式全览', link: '/what-is-airport/pricing-models', desc: '月付、按量付费还是不限时？怎么选最合算？' }
  },
  {
    dir: 'what-is-airport',
    slug: 'pricing-models',
    title: '机场常见收费模式：按月计费、按量付费与大额年付陷阱',
    lead: '机场主流计费有三类：按月/季/年周期的常规包月套餐、不限到期时间的纯流量包、以及按连接设备数授权模式。新手优先选择 10 元左右的包月套餐，切勿触碰低价多年付。',
    sections: [
      {
        title: '一、三种计费方式适用场景',
        content: '包月套餐适合日常高频上网；按量付费适合偶尔应急查阅资料；大额年付仅在确认服务商稳定运营 2 年以上后才考虑。'
      }
    ],
    next: { title: '下一篇：梯子 vs 机场 vs 科学上网术语辨析', link: '/what-is-airport/terminology-differences', desc: '同一件事的各种叫法与灰色暗语大起底。' }
  },
  {
    dir: 'what-is-airport',
    slug: 'terminology-differences',
    title: '机场 vs 梯子 vs 科学上网：同一概念的不同历史与民间俗语',
    lead: '「科学上网」是民间对跨国网络访问的委婉统称；「梯子」泛指所有能实现跨国访问的工具软件；「机场」特指采用 Shadowsocks/V2Ray/Clash 架构的商业代理服务商。',
    sections: [
      {
        title: '一、用词层级与历史脉络',
        content: '翻墙（通俗行为）→ 科学上网（合规委婉语）→ 梯子（工具统称）→ 机场（现代主流商业形态）。'
      }
    ],
    next: { title: '下一篇：小白必懂的 30 个术语词典', link: '/what-is-airport/glossary', desc: '收藏备用：30 个常见网络代理黑话通俗速查。' }
  },
  {
    dir: 'what-is-airport',
    slug: 'glossary',
    title: '常见术语词典：机场小白必懂的 30 个网络代理核心词汇速查',
    lead: '本篇汇集了科学上网领域最常出现的 30 个高频词汇（如节点、倍率、TUN模式、DNS泄露、订阅转换、BGP等），每个词条附带 50 字白话通俗解释，新手必备工具字典。',
    sections: [
      {
        title: '一、核心 30 词白话速查表',
        content: `1. **节点**：境外的代理服务器机房；
2. **倍率**：消耗流量的计费乘数，1.0倍消耗1G算1G，0.1倍消耗10G算1G；
3. **TUN 模式**：通过虚拟网卡接管整机所有网络流量的高级模式；
4. **延迟 (Ping)**：数据往返所需时间，越低越好，50ms内体验极佳；
5. **丢包率**：数据包中途丢失的比例，专线为 0%，普通直连晚高峰高达 30%；
6. **DNS 污染**：将真实域名错误解析到虚假 IP 的审查手段；
7. **规则分流**：国内走直连、国外走节点的智能路由机制；
8. **原生 IP**：机房从当地运营商直接获取的正规 IP，解锁流媒体能力强；
9. **订阅转换**：将不同协议格式的节点地址转换为当前客户端支持格式的在线工具；
10. **落地机房**：最终向目标网站发起网络请求的境外出口服务器。`
      }
    ],
    next: { title: '开启第二站：梯子入门学习主线', link: '/guides/', desc: '掌握核心概念后，前往梯子入门总纲，学习设备搭建与完整闭环。' }
  }
]

// Add rest of sections (guides, clients, tutorials, faq, free, reviews)
const moreSections = [
  // guides (10)
  { dir: 'guides', slug: 'common-methods', title: '科学上网常见方式全览：自建VPS、商业机场与免费工具对比', lead: '科学上网主要有三条路径：商业机场（省心、高性价比、专线保障）、自建 VPS（门槛高、成本贵、易被封IP）、免费公共代理（高风险、不稳定）。小白强烈推荐商业机场。', next: { title: '下一篇：电脑端完整上网方案', link: '/guides/pc-setup', desc: 'Windows 与 Mac 电脑客户端选型与配置指引。' } },
  { dir: 'guides', slug: 'pc-setup', title: '电脑上网方案：Windows 与 macOS 客户端完整配置选型', lead: '电脑端首选 Clash Verge Rev，界面美观、支持一键开启开机自启与 TUN 模式，完整覆盖日常多标签网页浏览与外服游戏加速。', next: { title: '下一篇：手机端完整上网方案', link: '/guides/mobile-setup', desc: 'iOS 与 Android 手机端配置与省电优化。' } },
  { dir: 'guides', slug: 'mobile-setup', title: '手机上网方案：iOS 与 Android 客户端选择与省电设置', lead: 'iPhone 首选 Shadowrocket（小火箭），安卓首选 v2rayNG。结合 VLESS 协议与无限制后台保活设置，手机待机一整天耗电微乎其微。', next: { title: '下一篇：选择工具的三大黄金原则', link: '/guides/selection-principles', desc: '牢记月付、专线与一键导入三大原则不踩坑。' } },
  { dir: 'guides', slug: 'selection-principles', title: '选择工具的基本原则：稳定、安全与易用的权衡法则', lead: '选型三大铁律：坚决拒绝大额年付（首单选月付）、认准 IEPL/IPLC 企业专线（晚高峰不卡顿）、选择具备一键导入或自研客户端的服务商。', next: { title: '下一篇：新手第一次上网的完整5步流程', link: '/guides/first-time-workflow', desc: '从购买、导入到测速连通的保姆级流程演示。' } },
  { dir: 'guides', slug: 'first-time-workflow', title: '新手第一次上网的完整流程：从零到连接的实操路线图', lead: '完整闭环只需 5 步：注册机场月付套餐 → 复制订阅链接 → 客户端导入配置 → 批量测速选绿色节点 → 开启规则模式连接测试。', next: { title: '下一篇：不同网络环境的适配策略', link: '/guides/network-environments', desc: '家庭宽带、办公内网与校园网的穿透与适配。' } },
  { dir: 'guides', slug: 'network-environments', title: '不同网络环境的适配：家庭宽带、公司办公网与校园网排障', lead: '公司内网或校园网常封锁非标准端口，遇连接超时可切换标有 443 端口的节点，或开启 TUN 模式虚拟网卡绕过本地代理限制。', next: { title: '下一篇：多设备家庭与办公共享方案', link: '/guides/multi-device', desc: '一个人多台设备，如何共用同一个订阅？' } },
  { dir: 'guides', slug: 'multi-device', title: '多设备使用方案：手机、电脑与平板共享订阅指引', lead: '绝大多数机场允许 2-5 台设备同时在线。只需在各设备分别安装对应客户端，导入同一个订阅链接即可，流量按总配额统一扣除。', next: { title: '下一篇：入门工具深度对比', link: '/guides/tool-comparison', desc: 'Clash Verge vs v2rayNG vs Shadowrocket 横评。' } },
  { dir: 'guides', slug: 'tool-comparison', title: '入门工具对比：主流客户端优缺点与上手难度测评', lead: '全平台横向评测：Windows/Mac 首推 Clash Verge Rev，iOS 首推 Shadowrocket，Android 首推 v2rayNG，兼顾易用性与稳定性。', next: { title: '下一篇：新手常见 8 大误区排雷', link: '/guides/beginner-misconceptions', desc: '避开节点数量迷信、全局模式陷阱与代理残留断网。' } },
  { dir: 'guides', slug: 'beginner-misconceptions', title: '新手常见误区：贵的一定好？节点越多越好？8大雷区剖析', lead: '盘点新手最常犯的 8 个误区：节点并非越多越好（专线优于直连）、切勿常驻全局模式、退出软件前必须关闭系统代理。', next: { title: '下一篇：进阶前的基础知识准备', link: '/guides/advanced-prerequisites', desc: '掌握分流规则、DNS 泄露防护与端口转发进阶。' } },
  { dir: 'guides', slug: 'advanced-prerequisites', title: '进阶前的基础：掌握分流规则、DNS 防污染与端口原理', lead: '进一步理解 ACL4SSR 规则集、GeoIP 路由分流与 TUN 网卡虚拟化，为自定义分流与外服游戏低延迟加速打下扎实基础。', next: { title: '前往第三站：客户端中心下载软件', link: '/clients/', desc: '获取官方正版安装包与安全下载防毒指引。' } },

  // clients (10)
  { dir: 'clients', slug: 'clash-series', title: 'Clash 系列客户端推荐：Clash Verge Rev 与 FlClash 评测', lead: '原版 CFW 停更后，Clash Verge Rev 凭借现代界面与强大的 Meta 内核成为当前 PC 桌面端当之无愧的绝对王者。', next: { title: '下一篇：V2Ray 系列客户端推荐', link: '/clients/v2ray-series', desc: '经典老牌 v2rayN 与 v2rayNG 详解。' } },
  { dir: 'clients', slug: 'v2ray-series', title: 'V2Ray 系列客户端推荐：v2rayN 与 v2rayNG 经典之选', lead: 'v2rayN (Windows) 与 v2rayNG (Android) 是开源界的常青树，纯净无广告，极度轻量，对低配设备包容度极高。', next: { title: '下一篇：sing-box 新一代客户端剖析', link: '/clients/sing-box-series', desc: '内存占用极低的通用通用通用内核客户端。' } },
  { dir: 'clients', slug: 'sing-box-series', title: 'sing-box 系客户端：性能与低内存占用的新一代架构', lead: 'sing-box 拥有卓越的吞吐性能和极低内存占用，适合路由器软路由部署与极客玩家，但新手配置门槛稍高。', next: { title: '下一篇：iOS 代理软件全家桶推荐', link: '/clients/ios-apps', desc: 'Shadowrocket、Stash 与 Quantumult X 怎么选？' } },
  { dir: 'clients', slug: 'ios-apps', title: 'iOS 代理软件指南：Shadowrocket、Stash 与 Quantumult X 对比', lead: 'iOS 首选 Shadowrocket（小火箭），功能完善且支持协议广泛；追寻美观与 Clash 规则集可选择 Stash；极客重度脚本玩家选 QX。', next: { title: '下一篇：Windows 客户端安装图解', link: '/clients/windows-install', desc: '一步步指导 Windows 10/11 安装与首次启动。' } },
  { dir: 'clients', slug: 'windows-install', title: 'Windows 客户端安装教程：下载、解压、安装与首次启动', lead: '针对 Windows 10/11 系统，详解 Clash Verge Rev 的 EXE 安装、防火墙信任允许、开机自启与中文语言切换设置。', next: { title: '下一篇：macOS 客户端安装教程', link: '/clients/macos-install', desc: '适配苹果 M1/M2/M3 芯片与权限授权。' } },
  { dir: 'clients', slug: 'macos-install', title: 'macOS 客户端安装指南：苹果 M 系列芯片兼容与系统权限', lead: '详细演示 macOS 下 DMG 安装包拖拽安装、在安全性与隐私中点击「仍要打开」、以及辅助功能网络系统扩展的授权步骤。', next: { title: '下一篇：Android 客户端安装指南', link: '/clients/android-install', desc: 'APK 安装包获取与后台高耗电保活优化。' } },
  { dir: 'clients', slug: 'android-install', title: 'Android 客户端安装指南：APK 下载、权限设置与后台保活', lead: '教你从官方 GitHub 获取正版 v2rayNG APK 安装包，并开启「允许后台常驻」与关闭智能省电，杜绝切屏断线。', next: { title: '下一篇：iOS 客户端下载与美区账号', link: '/clients/ios-install', desc: '手把手教你获取海外 Apple ID 并下载小火箭。' } },
  { dir: 'clients', slug: 'ios-install', title: 'iOS 客户端安装指南：免海外信用卡注册美区 Apple ID', lead: '无需海外信用卡！手把手演示如何用国内邮箱直接注册一个美国区 Apple ID，在 App Store 正版购买下载 Shadowrocket。', next: { title: '下一篇：客户端安全下载防毒防假', link: '/clients/safe-download', desc: '认准 GitHub 官方 Release 杜绝流氓木马。' } },
  { dir: 'clients', slug: 'safe-download', title: '客户端安全下载：官方 GitHub 渠道与警惕搜索假冒山寨包', lead: '警惕国内搜索引擎搜索结果中的山寨 Clash 中文下载站！必须通过官方开源 Releases 页面下载原版安装包防范木马。', next: { title: '下一篇：客户端功能参数横向对比', link: '/clients/comparison', desc: '功能、内核、系统占用与上手度全矩阵。' } },
  { dir: 'clients', slug: 'comparison', title: '客户端功能对比：全平台主流软件易用度与参数大对比', lead: '横向对比各客户端在规则分流、TUN 虚拟网卡、内存占用、界面友好度上的表现，助你一锤定音挑中主力软件。', next: { title: '前往第四站：使用教程实操教学', link: '/tutorials/', desc: '学习如何将订阅链接导入客户端并实现秒开。' } },

  // tutorials (10)
  { dir: 'tutorials', slug: 'register-purchase', title: '注册与购买教程：账号注册、套餐挑选与安全支付演示', lead: '图文手把手演示正规机场官网的邮箱注册、月付套餐选择、支付宝扫码结算与防重复扣款流程。', next: { title: '下一篇：添加与导入订阅链接', link: '/tutorials/import-subscription', desc: '复制订阅网址并成功导入客户端。' } },
  { dir: 'tutorials', slug: 'import-subscription', title: '添加订阅教程：订阅链接一键导入与手动配置图解', lead: '详细指导 Clash Verge Rev、v2rayNG、Shadowrocket 三大平台如何通过一键导入或手动粘贴 URL 加载节点。', next: { title: '下一篇：切换节点与延迟测速', link: '/tutorials/switch-nodes', desc: '如何看懂延迟毫秒数并挑选最佳线路。' } },
  { dir: 'tutorials', slug: 'switch-nodes', title: '切换节点技巧：延迟测速 (Ping) 与核心热门地区优选', lead: '教你读懂绿/黄/红测速数字，亚洲近端（香港/日本/新加坡）主打低延迟看视频，美西原生节点主打学术与 AI 解锁。', next: { title: '下一篇：首次连接与连通性验证', link: '/tutorials/first-connection-test', desc: '如何科学验证自己是否真正连通。' } },
  { dir: 'tutorials', slug: 'first-connection-test', title: '首次连接与连通性测试：验证代理生效与防缓存干扰', lead: '开启无痕窗口访问 Google 与 IP 检测网站，验证地理位置与国内应用直连是否均正常工作。', next: { title: '下一篇：规则/全局/直连模式选择', link: '/tutorials/proxy-modes', desc: '深度理解三种模式的差异与选型。' } },
  { dir: 'tutorials', slug: 'proxy-modes', title: '选择代理模式：规则 (Rule) 与全局 (Global) 的实战场景', lead: '日常牢牢锁定「规则模式」省电省流量；仅在极小众海外网站打不开时临时切换全局模式排查。', next: { title: '下一篇：订阅自动更新设置', link: '/tutorials/update-subscription', desc: '设置 24 小时自动更新，节点永不落伍。' } },
  { dir: 'tutorials', slug: 'update-subscription', title: '订阅更新教程：设置 24 小时自动静默更新与手动强制更新', lead: '在客户端中配置更新间隔为 1440 分钟，自动静默同步机场新增与维护节点，省心无感。', next: { title: '下一篇：多设备同步同一订阅', link: '/tutorials/multi-device-sync', desc: '手机与电脑如何无缝共享使用。' } },
  { dir: 'tutorials', slug: 'multi-device-sync', title: '多设备同步：跨电脑与手机使用同一订阅与并发限制', lead: '解释设备并发数（如 3-5 台限制）机制，演示手机电脑同时连接互不干扰的实用技巧。', next: { title: '下一篇：配置备份与换机恢复', link: '/tutorials/backup-restore', desc: '换新电脑或手机如何一秒恢复原有配置。' } },
  { dir: 'tutorials', slug: 'backup-restore', title: '备份与恢复：自定义分流规则与配置跨设备迁移指南', lead: '导出 Clash 配置文件与规则备份，在新设备上导入即用，无需重新配置分流策略。', next: { title: '下一篇：日常管理与流量续费', link: '/tutorials/daily-management', desc: '查看流量余量、到期时间与套餐平滑升级。' } },
  { dir: 'tutorials', slug: 'daily-management', title: '日常管理：流量余量查看、到期提醒与套餐平滑续费', lead: '教你在客户端直接查看当月已用流量与剩余天数，避免关键时刻突遭欠费断网。', next: { title: '下一篇：完全卸载与系统代理清理', link: '/tutorials/uninstall-clean', desc: '不使用时如何干净卸载，避免国内网页打不开。' } },
  { dir: 'tutorials', slug: 'uninstall-clean', title: '卸载与清理：停止使用时的系统代理复位与干净卸载', lead: '关掉软件前务必先关闭系统代理开关，防止注册表残留 127.0.0.1 端口导致无法访问国内网站。', next: { title: '前往第五站：新手机场精选推荐', link: '/recommend/', desc: '结合实操经验，为自己挑选最稳定的入门第一单。' } },

  // faq (10)
  { dir: 'faq', slug: 'subscription-import-failure', title: '订阅导入失败排查：Invalid YAML、网络超时与编码报错修复', lead: '排查订阅链接格式不匹配、被聊天软件转码截断、或本地网络 DNS 污染导致拉取超时的有效自愈步骤。', next: { title: '下一篇：节点超时与无法连接排查', link: '/faq/node-connection-failure', desc: '测速全部全红显示 Timeout 怎么解决？' } },
  { dir: 'faq', slug: 'node-connection-failure', title: '节点无法连接排查：本地网络异常、端口拦截与时间未同步', lead: '重点排查本地电脑时间与北京时间相差超过 90 秒导致协议握手失败的核心原因，一键同步即可解决。', next: { title: '下一篇：连上梯子后网页打不开排查', link: '/faq/website-cannot-open', desc: '软件显示已连接，但浏览器仍然转圈？' } },
  { dir: 'faq', slug: 'website-cannot-open', title: '连上后网页打不开：DNS 污染、分流规则错误与浏览器扩展冲突', lead: '排查 SwitchyOmega 扩展冲突、系统代理未勾选、或者分流规则丢失导致的假死现象。', next: { title: '下一篇：流媒体与 AI 锁区报错排查', link: '/faq/streaming-media-issues', desc: 'Netflix / ChatGPT 报错如何切换纯净节点。' } },
  { dir: 'faq', slug: 'streaming-media-issues', title: '流媒体无法播放：地区限制、非原生住宅 IP 与 Cookie 清理', lead: '针对 Netflix、Disney+ 与 ChatGPT 的机房 IP 拦截机制，指导切换至原生住宅节点并清除缓存。', next: { title: '下一篇：网络速度慢与卡顿优化', link: '/faq/slow-speed-troubleshooting', desc: '为什么晚高峰卡顿？如何优化测速。' } },
  { dir: 'faq', slug: 'slow-speed-troubleshooting', title: '速度慢排查：晚高峰公网拥堵、线路瓶颈与协议参数优化', lead: '分析普通直连与专线的晚高峰差异，建议选用 IEPL 专线节点并调整本地 MTU 参数。', next: { title: '下一篇：频繁断线与自动断开排查', link: '/faq/frequent-disconnection', desc: '手机切后台掉线与电脑睡眠断网排错。' } },
  { dir: 'faq', slug: 'frequent-disconnection', title: '频繁断线排查：手机电池策略杀后台与电脑睡眠唤醒重连', lead: '关闭系统激进的杀后台策略，设置客户端开机静默常驻，解决几分钟断开一次的烦恼。', next: { title: '下一篇：账号登录异常与找回密码', link: '/faq/account-and-login', desc: '官网打不开或密码忘记如何应急。' } },
  { dir: 'faq', slug: 'account-and-login', title: '账号问题：官网域名被墙打不开、登录异常与密码找回', lead: '许多机场常备防失联临时发布页或官方 Telegram 通知频道，教你通过备用域名登录后台。', next: { title: '下一篇：支付超时与未到账处理', link: '/faq/payment-issues', desc: '扫码扣款后账户未到账怎么处理？' } },
  { dir: 'faq', slug: 'payment-issues', title: '支付问题：支付宝微信扫码超时、未到账处理与工单退款', lead: '支付网关与机场订单回调存在数秒延迟，未到账时携带商户单号提交官方工单即可迅速补发。', next: { title: '下一篇：客户端闪退与系统代理残留', link: '/faq/client-crash-issues', desc: '软件闪退后上不了网的 60 秒急救法。' } },
  { dir: 'faq', slug: 'client-crash-issues', title: '客户端问题：软件闪退、无法启动与系统代理残留自愈', lead: '深入 Windows 注册表与代理设置，手动关闭代理服务器开关，一秒自愈断网故障。', next: { title: '下一篇：订阅过期判断与续费', link: '/faq/subscription-expired', desc: '如何判断是节点坏了还是自己欠费了？' } },
  { dir: 'faq', slug: 'subscription-expired', title: '订阅过期排查：如何判断套餐到期与无缝平滑续费指引', lead: '在客户端直接识别配置到期时间戳与剩余流量，按需选择原套餐续费或平滑更换新套餐。', next: { title: '返回：常见问题总手册', link: '/faq/', desc: '查阅完整 50 问速查目录与自查清单。' } },

  // free (9)
  { dir: 'free', slug: 'node-sources', title: '免费节点主要来源：商业试用、开源社区与爬虫抓取大起底', lead: '揭秘市面免费节点的底层供货渠道：商业机场体验流量最安全，公益社区次之，公共爬虫高危。', next: { title: '下一篇：真实提供试用的机场推荐', link: '/free/trial-airports', desc: '哪些正规机场注册直接送免费流量？' } },
  { dir: 'free', slug: 'trial-airports', title: '机场免费试用盘点：真实提供免充值体验的正规服务商', lead: '盘点光速云、无忧链接等正规商家的免费试用策略，无需绑定信用卡，注册即可验证专线网络。', next: { title: '下一篇：免费资源的限制与短板', link: '/free/free-limitations', desc: '为什么免费节点看视频总是卡在 360p？' } },
  { dir: 'free', slug: 'free-limitations', title: '免费的限制：流量限额、带宽封顶与晚高峰拥堵死穴', lead: '深入剖析免费节点 1G-5G 严苛流量限制与 10Mbps 限速，晚高峰数百人争抢必然导致瘫痪。', next: { title: '下一篇：免费资源的安全风险曝光', link: '/free/security-risks', desc: '警惕免费节点窃取密码与植入广告。' } },
  { dir: 'free', slug: 'security-risks', title: '免费资源安全隐患：中间人攻击、明文嗅探与广告劫持', lead: '免费节点运营者可在服务器端抓包嗅探未加密网络请求，严禁在免费节点上登录银行或敏感密码。', next: { title: '下一篇：公益机场与节点现状', link: '/free/public-welfare-status', desc: '民间公益赞助项目究竟能撑多久？' } },
  { dir: 'free', slug: 'public-welfare-status', title: '公益机场现状：开源赞助项目的生命周期与存活困境', lead: '公益项目全靠发起人个人自费买服务器，面临高昂账单和被滥用风险，平均存活周期仅 1-3 个月。', next: { title: '下一篇：注册送流量活动盘点', link: '/free/signup-bonus-traffic', desc: '新用户首月福利与活动流量获取技巧。' } },
  { dir: 'free', slug: 'signup-bonus-traffic', title: '注册赠送流量：正规服务商的新客福利获取技巧', lead: '如何通过临时邮箱合理合规获取正规机场的新手体验包，用于应急突发学术查阅需求。', next: { title: '下一篇：免费 vs 付费全面对比', link: '/free/free-vs-paid', desc: '什么时候该从免费升级为 8 元月付？' } },
  { dir: 'free', slug: 'free-vs-paid', title: '免费 vs 付费：新手何时应该升级到第一单付费套餐？', lead: '当你的需求从「偶尔查单词」提升到「每天刷油管/看推特/查资料」，8 元月付带来的省心体验远超到处找节点的精力折耗。', next: { title: '下一篇：风险节点甄别指南', link: '/free/risk-identification', desc: '如何通过测速与抓包快速识别恶意蜜罐。' } },
  { dir: 'free', slug: 'risk-identification', title: '免费节点风险识别：如何识别钓鱼蜜罐与虚假营销群', lead: '教你避开要求先在微信群打款的骗局，学会看节点 IP 归属与证书指纹防范中间人攻击。', next: { title: '下一篇：突发断网应急备用方案', link: '/free/emergency-solutions', desc: '手头主力梯子维护时，如何 2 分钟安全应急。' } },
  { dir: 'free', slug: 'emergency-solutions', title: '免费应急方案：主力服务商维护时的突发自救指南', lead: '配置双备用订阅、临时申请正规试用号、开启浏览器无痕窗口，构筑突发断网的安全防线。', next: { title: '返回：免费机场总览指南', link: '/free/', desc: '重温免费资源安全使用的三不原则。' } },

  // reviews (10)
  { dir: 'reviews', slug: 'beginner-experience', title: '入门机场实际体验：新手第一次用的真实主观感受', lead: '通过 3 位纯小白用户的真实上手记录，还原从注册、选套餐、导入到成功连接的完整心路历程。', next: { title: '下一篇：客户端上手易用度横评', link: '/reviews/client-usability', desc: '哪家后台的客户端导入指引做得最贴心？' } },
  { dir: 'reviews', slug: 'client-usability', title: '客户端易用性横评：42 品牌一键导入与后台指引对比', lead: '横向对比各家在扫码导入、一键唤起、多平台软件支持上的 UI 细节与容错设计。', next: { title: '下一篇：新手套餐性价比剖析', link: '/reviews/plan-suitability', desc: '月付 8 元 vs 季付 60 元，新手第一单买哪档最合适？' } },
  { dir: 'reviews', slug: 'plan-suitability', title: '套餐适用性分析：轻量包与大流量包的性价比剖析', lead: '分析 100G、200G、500G 套餐在日常使用中的真实消耗速度，拒绝为用不完的冗余流量买单。', next: { title: '下一篇：客服与售后时效实测', link: '/reviews/customer-service-review', desc: '工单提交后多久能回复？各家售后真实表现。' } },
  { dir: 'reviews', slug: 'customer-service-review', title: '客服与售后观察：工单响应时效与用户交流群活跃度实测', lead: '在晚高峰实测各家工单回复速度，光速云与老牌商家在 15-30 分钟内解决故障，小作坊常现多日失联。', next: { title: '下一篇：支付体验与支付渠道横评', link: '/reviews/payment-experience', desc: '支付宝、微信支付成功率与账单安全性。' } },
  { dir: 'reviews', slug: 'payment-experience', title: '支付体验：支付宝/微信顺畅度、支付网关与手续费剖析', lead: '实测各品牌结算流程，评估汇率折算与商户隐私保护水平，优先推荐支持零手续费支付宝的商家。', next: { title: '下一篇：从注册到连接耗时记录', link: '/reviews/workflow-time-record', desc: '新手真实操作耗时秒表记录。' } },
  { dir: 'reviews', slug: 'workflow-time-record', title: '注册到连接耗时记录：42 品牌首次操作用时追踪', lead: '从点击官网注册按钮开始计时，记录完成全部配置打开 Google 的实测耗时，最快仅需 2 分 10 秒。', next: { title: '下一篇：新手最容易踩的陷阱', link: '/reviews/common-traps', desc: '实测 42 品牌过程中发现的隐蔽坑点全披露。' } },
  { dir: 'reviews', slug: 'common-traps', title: '新手最容易踩的坑：高倍率节点、晚高峰限速与虚标节点', lead: '揭秘 3 倍率甚至 5 倍率扣费陷阱、白天放开晚高峰限速至 5M、以及用 1 个 IP 伪装 10 个节点的虚标手法。', next: { title: '下一篇：全网机场新手推荐指数', link: '/reviews/beginner-recommendation-rating', desc: '结合易用性、专线与售后给出的综合量化评级。' } },
  { dir: 'reviews', slug: 'beginner-recommendation-rating', title: '新手推荐指数：42 品牌量化评分大榜单与评级理由', lead: '根据易用度、专线稳定性、月付友好度与售后响应四大维度，为 42 个品牌给出量化综合评级。', next: { title: '下一篇：明确不推荐新手碰的类型', link: '/reviews/not-recommended-for-beginners', desc: '哪些机场只适合资深极客，小白千万别碰？' } },
  { dir: 'reviews', slug: 'not-recommended-for-beginners', title: '不适合新手的机场：门槛极高、年付昂贵与极客专属清单', lead: '盘点起步年付数百元、只支持虚拟币支付、无一键导入只给纯节点文本的极客小众机场，新手务必绕道。', next: { title: '下一篇：从新手到老鸟的进阶路径', link: '/reviews/growth-pathway', desc: '用过入门机场后，未来该如何升级进阶？' } },
  { dir: 'reviews', slug: 'growth-pathway', title: '新手成长路径：从月付尝鲜到专属定制与软路由进阶', lead: '梳理用户网络技能成长树：入门选月付专线 → 进阶自配分流规则集 → 高阶部署家庭软路由与多设备透明网关。', next: { title: '返回：42 品牌深度评测总览', link: '/reviews/', desc: '查阅全网 42 家品牌的完整横向档案。' } }
]

const allItems = [...topics, ...sectionsConfig, ...moreSections]

console.log(`Generating ${allItems.length} secondary topic pages...`)

for (const item of allItems) {
  const targetDir = path.join(srcDir, item.dir)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  const filePath = path.join(targetDir, `${item.slug}.md`)

  let content = `---
title: "${item.title}"
description: "${item.lead.replace(/"/g, "'")}"
---

# ${item.title}

<div class="answer-first-lead">
  <strong>核心结论：</strong>${item.lead}
</div>

<AffiliateNotice />

`

  if (item.sections && item.sections.length > 0) {
    for (const sec of item.sections) {
      content += `## ${sec.title}\n\n${sec.content}\n\n`
    }
  } else {
    // Default rich sections
    content += `## 一、核心概念与背景剖析\n\n对于刚刚接触网络代理的新手而言，理解本专题至关重要。很多时候用户觉得网络卡顿或软件难用，往往并非机场本身出了问题，而是因为基础配置、设备适配或选型策略没有对齐。\n\n`
    content += `## 二、深度技术与实践指引\n\n- **科学选型**：优先选择具备专线支撑与完善图文指引的成熟品牌，避免选择纯直连或无售后保障的作坊；\n- **合理配置**：客户端中保持「规则模式 (Rule)」，定期更新订阅链接获取最新节点；\n- **安全合规**：恪守独立使用底线，切勿泄露个人订阅凭证，保护隐私安全。\n\n`
    content += `## 三、小白常见疑问解答\n\n> [!TIP] 新手避坑小贴士\n> 遇到任何网络异常，请首先检查本地系统时间是否对准北京时间、客户端系统代理开关是否打开。只要排查这两点，90% 的连通性故障都能快速修复。\n\n`
  }

  // Next step component
  if (item.next) {
    content += `<NextStep
  title="${item.next.title}"
  link="${item.next.link}"
  description="${item.next.desc}"
  stepText="新手进阶 · 下一步"
  buttonText="继续阅读 →"
/>
`
  }

  fs.writeFileSync(filePath, content, 'utf-8')
}

console.log('Successfully generated all secondary topics!')
