import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// 搜索引擎站长平台所有权验证 (环境变量驱动，配置真实代码时自动输出至最终 HTML <head>)
const siteVerification = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.BING_SITE_VERIFICATION || '',
  shenma: process.env.SHENMA_SITE_VERIFICATION || '',
  baidu: process.env.BAIDU_SITE_VERIFICATION || ''
}

export default withMermaid(
  defineConfig({
    title: '机场入门',
    titleTemplate: ':title - 零基础新手科学上网教育指南',
    description: '零基础新手教育型网络代理与科学上网入门指南。从什么是机场、节点与订阅原理，到客户端下载与首次连接，每一步都有清晰引导。',
    lang: 'zh-CN',
    srcDir: '.',
    cleanUrls: true,
    lastUpdated: true,
    sitemap: {
      hostname: 'https://jichangrumen.world',
      transformItems(items) {
        return items
          .filter(item => !item.url.includes('404'))
          .map(item => ({
            ...item,
            lastmod: item.lastmod || new Date().toISOString()
          }))
      }
    },
    head: [
      ['link', { rel: 'icon', type: 'image/webp', href: '/avatar.webp' }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ...(siteVerification.google ? [['meta', { name: 'google-site-verification', content: siteVerification.google }]] : []),
      ...(siteVerification.bing ? [['meta', { name: 'msvalidate.01', content: siteVerification.bing }]] : []),
      ...(siteVerification.shenma ? [['meta', { name: 'shenma-site-verification', content: siteVerification.shenma }]] : []),
      ...(siteVerification.baidu ? [['meta', { name: 'baidu-site-verification', content: siteVerification.baidu }]] : []),
      ['meta', { name: 'keywords', content: '机场入门, 什么是机场, 机场推荐, 梯子入门, 科学上网教程, Clash下载, v2ray教程, 零基础代理指南' }],
      ['meta', { property: 'og:site_name', content: '机场入门 jichangrumen.world' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:image', content: 'https://jichangrumen.world/avatar.webp' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: 'https://jichangrumen.world/avatar.webp' }],
      [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '机场入门',
          url: 'https://jichangrumen.world',
          description: '零基础新手教育型网络代理与科学上网入门指南。从什么是机场、节点与订阅原理，到客户端下载与首次连接，每一步都有清晰引导。',
          publisher: {
            '@type': 'Organization',
            name: '机场入门 编辑团队',
            logo: {
              '@type': 'ImageObject',
              url: 'https://jichangrumen.world/avatar.webp'
            }
          }
        })
      ]
    ],
    transformHead({ pageData }) {
      const cleanPath = pageData.relativePath
        .replace(/\.md$/, '')
        .replace(/index$/, '')
      const canonicalUrl = `https://jichangrumen.world/${cleanPath}`
      const title = pageData.title ? `${pageData.title} - 机场入门` : '机场入门 - 零基础新手科学上网教育指南'
      const desc = pageData.description || '零基础新手教育型网络代理与科学上网入门指南。'
      const isArticle = Boolean(cleanPath && !cleanPath.endsWith('/') && !cleanPath.includes('404'))

      const tags: any[] = [
        ['link', { rel: 'canonical', href: canonicalUrl }],
        ['meta', { property: 'og:url', content: canonicalUrl }],
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: desc }],
        ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
        ['meta', { name: 'twitter:title', content: title }],
        ['meta', { name: 'twitter:description', content: desc }]
      ]

      if (isArticle) {
        tags.push(
          ['meta', { property: 'article:published_time', content: '2024-01-01T00:00:00Z' }],
          ['meta', { property: 'article:modified_time', content: new Date().toISOString() }],
          ['meta', { property: 'article:author', content: 'https://jichangrumen.world/about/' }]
        )
      }

      const sectionTitles: Record<string, string> = {
        'what-is-airport': '什么是机场',
        'guides': '梯子入门',
        'clients': '客户端中心',
        'tutorials': '使用教程',
        'faq': '常见问题',
        'recommend': '机场推荐',
        'reviews': '机场评测',
        'free': '免费机场',
        'about': '关于与合规',
        'privacy': '隐私政策',
        'terms': '服务条款'
      }

      // BreadcrumbList Schema for all pages except home
      if (cleanPath && cleanPath !== '/') {
        const parts = cleanPath.split('/').filter(Boolean)
        const breadcrumbItems: any[] = [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: 'https://jichangrumen.world/'
          }
        ]

        if (parts.length >= 1) {
          const sectionKey = parts[0]
          const sectionName = sectionTitles[sectionKey] || sectionKey
          breadcrumbItems.push({
            '@type': 'ListItem',
            position: 2,
            name: sectionName,
            item: `https://jichangrumen.world/${sectionKey}/`
          })
        }

        if (parts.length >= 2) {
          breadcrumbItems.push({
            '@type': 'ListItem',
            position: 3,
            name: pageData.title || title,
            item: canonicalUrl
          })
        }

        tags.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems
          })
        ])
      }

      // Contextual Page Schemas
      const isSectionIndex = pageData.relativePath.endsWith('/index.md') || cleanPath === 'about' || cleanPath === 'about/'

      if (pageData.relativePath.startsWith('faq/') && pageData.relativePath !== 'faq/index.md') {
        tags.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: pageData.title || title,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: desc
                }
              }
            ]
          })
        ])
      } else if (cleanPath === 'about' || cleanPath === 'about/') {
        tags.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: '关于机场入门与测试规范',
            description: desc,
            url: canonicalUrl,
            publisher: {
              '@type': 'Organization',
              name: '机场入门',
              url: 'https://jichangrumen.world',
              logo: 'https://jichangrumen.world/avatar.webp'
            }
          })
        ])
      } else if (isSectionIndex && cleanPath) {
        // Section Overview -> CollectionPage / ItemList
        const collSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: pageData.title || title,
          description: desc,
          url: canonicalUrl
        }
        if (cleanPath.startsWith('recommend') || cleanPath.startsWith('reviews')) {
          collSchema['@type'] = 'ItemList'
          collSchema['itemListOrder'] = 'https://schema.org/ItemListOrderDescending'
        }
        tags.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(collSchema)
        ])
      } else if (cleanPath && !cleanPath.includes('404')) {
        tags.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: pageData.title || title,
            description: desc,
            url: canonicalUrl,
            inLanguage: 'zh-CN',
            author: {
              '@type': 'Organization',
              name: '机场入门 网络通信评测组',
              url: 'https://jichangrumen.world/about/'
            },
            publisher: {
              '@type': 'Organization',
              name: '机场入门',
              url: 'https://jichangrumen.world',
              logo: {
                '@type': 'ImageObject',
                url: 'https://jichangrumen.world/avatar.webp'
              }
            },
            datePublished: '2024-01-01T00:00:00Z',
            dateModified: new Date().toISOString()
          })
        ])
      }

      return tags
    },
    themeConfig: {
      siteTitle: '机场入门',
      logo: { src: '/avatar.webp', alt: '机场入门' },
      nav: [
        { text: '首页', link: '/' },
        { text: '机场推荐', link: '/recommend/' },
        { text: '免费机场', link: '/free/' },
        { text: '什么是机场', link: '/what-is-airport/' },
        { text: '梯子入门', link: '/guides/' },
        { text: '客户端中心', link: '/clients/' },
        { text: '使用教程', link: '/tutorials/' },
        { text: '常见问题', link: '/faq/' },
        { text: '机场评测', link: '/reviews/' },
        { text: '关于与合规', link: '/about/' }
      ],
      sidebar: {
        '/recommend/': [
          {
            text: '机场推荐指南 (新手导向)',
            items: [
              { text: '【总览】新手买机场怎么选', link: '/recommend/' },
              { text: '1. 新手入门机场精选', link: '/recommend/beginner-friendly' },
              { text: '2. 操作简单的免配置机场', link: '/recommend/easy-setup' },
              { text: '3. 适合手机使用的机场', link: '/recommend/mobile-first' },
              { text: '4. 适合电脑主力的机场', link: '/recommend/desktop-pc' },
              { text: '5. 支持免费试用的机场', link: '/recommend/free-trial' },
              { text: '6. 运营多年老牌稳定机场', link: '/recommend/established-stable' },
              { text: '7. 支持支付宝便捷支付', link: '/recommend/alipay-payment' },
              { text: '8. 具备人工客服与交流群', link: '/recommend/customer-support' },
              { text: '9. 新手第一单避坑警示', link: '/recommend/pitfalls-avoidance' },
              { text: '10. 新手第一单购买决策', link: '/recommend/first-purchase-guide' }
            ]
          }
        ],
        '/free/': [
          {
            text: '免费机场与应急资源',
            items: [
              { text: '【总览】如何安全免费体验', link: '/free/' },
              { text: '1. 免费节点的主要来源', link: '/free/node-sources' },
              { text: '2. 真实提供试用的机场', link: '/free/trial-airports' },
              { text: '3. 免费资源的限制与短板', link: '/free/free-limitations' },
              { text: '4. 免费资源的安全风险', link: '/free/security-risks' },
              { text: '5. 公益机场与节点现状', link: '/free/public-welfare-status' },
              { text: '6. 注册送流量活动盘点', link: '/free/signup-bonus-traffic' },
              { text: '7. 免费 vs 付费全面对比', link: '/free/free-vs-paid' },
              { text: '8. 风险节点甄别指南', link: '/free/risk-identification' },
              { text: '9. 突发断网应急备用方案', link: '/free/emergency-solutions' }
            ]
          }
        ],
        '/what-is-airport/': [
          {
            text: '什么是机场 (概念认知)',
            items: [
              { text: '【总览】零基础认知通识', link: '/what-is-airport/' },
              { text: '1. 机场基本概念与由来', link: '/what-is-airport/concepts' },
              { text: '2. 机场与 VPN 的本质区别', link: '/what-is-airport/vs-vpn' },
              { text: '3. 节点究竟是什么', link: '/what-is-airport/nodes-explained' },
              { text: '4. 机场订阅链接与工作原理', link: '/what-is-airport/subscription-explained' },
              { text: '5. 常用协议解析 (VLESS/SS)', link: '/what-is-airport/protocols-explained' },
              { text: '6. 线路类型科普 (直连/IEPL)', link: '/what-is-airport/lines-explained' },
              { text: '7. 客户端是什么与定位', link: '/what-is-airport/clients-explained' },
              { text: '8. 机场常见收费模式解析', link: '/what-is-airport/pricing-models' },
              { text: '9. 机场/梯子/科学上网概念剖析', link: '/what-is-airport/terminology-differences' },
              { text: '10. 小白必懂的 30 个术语词典', link: '/what-is-airport/glossary' }
            ]
          }
        ],
        '/guides/': [
          {
            text: '梯子入门 (学习路线)',
            items: [
              { text: '【总览】新手从零开始步骤', link: '/guides/' },
              { text: '1. 常见上网方式全览', link: '/guides/common-methods' },
              { text: '2. 电脑端完整上网方案', link: '/guides/pc-setup' },
              { text: '3. 手机端完整上网方案', link: '/guides/mobile-setup' },
              { text: '4. 选择工具的黄金原则', link: '/guides/selection-principles' },
              { text: '5. 第一次上网完整闭环流程', link: '/guides/first-time-workflow' },
              { text: '6. 不同网络环境的适配策略', link: '/guides/network-environments' },
              { text: '7. 多设备家庭/办公共享方案', link: '/guides/multi-device' },
              { text: '8. 热门入门工具深度对比', link: '/guides/tool-comparison' },
              { text: '9. 新手最容易犯的 8 个误区', link: '/guides/beginner-misconceptions' },
              { text: '10. 迈向进阶前的核心基础知识', link: '/guides/advanced-prerequisites' }
            ]
          }
        ],
        '/clients/': [
          {
            text: '客户端中心 (软件下载)',
            items: [
              { text: '【总览】新手软件选择与下载', link: '/clients/' },
              { text: '1. Clash 系列客户端推荐', link: '/clients/clash-series' },
              { text: '2. V2Ray 系列客户端推荐', link: '/clients/v2ray-series' },
              { text: '3. sing-box 新一代客户端', link: '/clients/sing-box-series' },
              { text: '4. iOS 苹果手机客户端指南', link: '/clients/ios-apps' },
              { text: '5. Windows 电脑客户端安装', link: '/clients/windows-install' },
              { text: '6. macOS 苹果电脑客户端安装', link: '/clients/macos-install' },
              { text: '7. Android 安卓手机客户端安装', link: '/clients/android-install' },
              { text: '8. iOS 账号获取与安装指南', link: '/clients/ios-install' },
              { text: '9. 客户端官方安全下载防毒', link: '/clients/safe-download' },
              { text: '10. 主流客户端特性横向对比', link: '/clients/comparison' }
            ]
          }
        ],
        '/tutorials/': [
          {
            text: '使用教程 (实操教学)',
            items: [
              { text: '【总览】从零到一连接教程', link: '/tutorials/' },
              { text: '1. 账号注册与套餐购买演示', link: '/tutorials/register-purchase' },
              { text: '2. 一键导入订阅链接详细图解', link: '/tutorials/import-subscription' },
              { text: '3. 节点选择与延迟测速技巧', link: '/tutorials/switch-nodes' },
              { text: '4. 首次启动与连通性验证', link: '/tutorials/first-connection-test' },
              { text: '5. 规则/全局/直连模式详解', link: '/tutorials/proxy-modes' },
              { text: '6. 订阅链接自动更新设置', link: '/tutorials/update-subscription' },
              { text: '7. 手机电脑多端同步订阅', link: '/tutorials/multi-device-sync' },
              { text: '8. 配置文件备份与跨机恢复', link: '/tutorials/backup-restore' },
              { text: '9. 流量余量查看与日常维护', link: '/tutorials/daily-management' },
              { text: '10. 完全卸载与系统代理清理', link: '/tutorials/uninstall-clean' }
            ]
          }
        ],
        '/faq/': [
          {
            text: '常见问题与排错 (FAQ)',
            items: [
              { text: '【总览】新手排错 50 问', link: '/faq/' },
              { text: '1. 订阅链接导入失败怎么办', link: '/faq/subscription-import-failure' },
              { text: '2. 节点超时/无法连接排查', link: '/faq/node-connection-failure' },
              { text: '3. 连上后网页依然打不开', link: '/faq/website-cannot-open' },
              { text: '4. 流媒体提示非原生或锁区', link: '/faq/streaming-media-issues' },
              { text: '5. 网络速度慢/卡顿如何优化', link: '/faq/slow-speed-troubleshooting' },
              { text: '6. 频繁掉线与自动断开排查', link: '/faq/frequent-disconnection' },
              { text: '7. 账号登录异常与密码找回', link: '/faq/account-and-login' },
              { text: '8. 支付超时与未到账处理', link: '/faq/payment-issues' },
              { text: '9. 客户端闪退或无法启动修复', link: '/faq/client-crash-issues' },
              { text: '10. 订阅到期判断与套餐续费', link: '/faq/subscription-expired' }
            ]
          }
        ],
        '/reviews/': [
          {
            text: '机场深度评测 (新手视角)',
            items: [
              { text: '【总览】新手视角 42 品牌总评', link: '/reviews/' },
              { text: '1. 入门级低门槛机场实测体验', link: '/reviews/beginner-experience' },
              { text: '2. 各家客户端上手容易度横评', link: '/reviews/client-usability' },
              { text: '3. 新手起步套餐性价比剖析', link: '/reviews/plan-suitability' },
              { text: '4. 售后响应速度与客服群实测', link: '/reviews/customer-service-review' },
              { text: '5. 支付流程顺畅度与支付渠道', link: '/reviews/payment-experience' },
              { text: '6. 从注册到连接耗时追踪记录', link: '/reviews/workflow-time-record' },
              { text: '7. 真实用户最容易踩的陷阱', link: '/reviews/common-traps' },
              { text: '8. 全网机场新手推荐综合指数', link: '/reviews/beginner-recommendation-rating' },
              { text: '9. 明确不推荐新手购买的类型', link: '/reviews/not-recommended-for-beginners' },
              { text: '10. 从新手到老鸟的进阶成长路径', link: '/reviews/growth-pathway' }
            ]
          }
        ]
      },
      search: {
        // 搜索方案：VitePress Local Search（备，即开即用零依赖）+ Algolia DocSearch（主，预留配置位）
        provider: 'local',
        /*
        // 如需启用 Algolia DocSearch，请注释上方 provider: 'local' 并解除下方注释：
        provider: 'algolia',
        options: {
          appId: 'YOUR_APP_ID',
          apiKey: 'YOUR_SEARCH_API_KEY',
          indexName: 'jichangrumen_world',
          placeholder: '搜索教程与知识点...',
          translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: {
              searchBox: { resetButtonTitle: '清除查询', cancelButtonText: '取消' },
              startScreen: { recentSearchesTitle: '历史搜索', noRecentSearchesText: '没有历史搜索记录' },
              errorScreen: { titleText: '无法获取结果', helpText: '请检查网络连接' },
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        },
        */
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索教程与知识点...',
                  buttonAriaLabel: '搜索教程与知识点'
                },
                modal: {
                  noResultsText: '无法找到相关指南',
                  resetButtonTitle: '清除搜索词',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭'
                  }
                }
              }
            }
          }
        }
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com' }
      ],
      footer: {
        message: '本站为独立第三方网络技术科普博客，与任何机场品牌无隶属关系。内容仅供计算机网络通信与软件使用学习。',
        copyright: 'Copyright © 2024-2026 机场入门 jichangrumen.world | <a href="/about/">合规披露</a> | <a href="/privacy/">隐私政策</a> | <a href="/terms/">服务条款</a>'
      },
      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },
      outline: {
        level: [2, 3],
        label: '本章知识大纲'
      }
    },
    markdown: {
      config(md) {
        const defaultImageRule = md.renderer.rules.image || function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
          const token = tokens[idx];
          token.attrSet('loading', 'lazy');
          token.attrSet('decoding', 'async');
          return defaultImageRule(tokens, idx, options, env, self);
        };
      }
    },
    vite: {
      build: {
        chunkSizeWarningLimit: 1200,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/mermaid') || id.includes('node_modules/@mermaid-js') || id.includes('node_modules/cytoscape') || id.includes('node_modules/cose-base')) {
                return 'vendor-diagrams';
              }
              if (id.includes('node_modules/@iconify')) {
                return 'vendor-iconify';
              }
            }
          }
        }
      }
    }
  })
)
