import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

const file28 = 'C:/Users/Pro User/Desktop/机场品牌信息/28个机场品牌清单.txt'
const file14 = 'C:/Users/Pro User/Desktop/机场品牌信息/14个机场品牌清单.txt'

const text28 = fs.readFileSync(file28, 'utf-8')
const text14 = fs.readFileSync(file14, 'utf-8')

const existingBrands = JSON.parse(fs.readFileSync(path.join(srcDir, 'data', 'brands.json'), 'utf-8'))

// Image mapping dictionary
const speedtestImgMap = {
  'gsy': '/images/speedtests/光速云-节点测速实测.png',
  'feimao': '/images/speedtests/飞猫云-节点测速实测.png',
  'weifeng': '/images/speedtests/微风-节点测速实测.png',
  'muguang': '/images/speedtests/幕光加速-节点测速实测.png',
  'xingdaomeng': '/images/speedtests/星岛梦-节点测速实测.png',
  'ermao': '/images/speedtests/二猫云-节点测速实测.png',
  'weitu': '/images/speedtests/唯兔云-节点测速实测.png',
  'yuzhou': '/images/speedtests/宇宙云-节点测速实测.png',
  'u1s1': '/images/speedtests/U1S1-节点测速实测.png',
  'lingmao': '/images/speedtests/灵猫网络-节点测速实测.png',
  'jilian': '/images/speedtests/极连云-节点测速实测.png',
  'guangnian': '/images/speedtests/光年梯-节点测速实测.png',
  'yifan': '/images/speedtests/一翻云-节点测速实测.png',
  'sogo': '/images/speedtests/SOGO云-节点测速实测.png',
  'kexin': '/images/speedtests/可信云-节点测速实测.png',
  'sujie': '/images/speedtests/速界-节点测速实测.png',
  'quanqiu': '/images/speedtests/全球云-节点测速实测.png'
}

const unlockImgMap = {
  'gsy': [
    { title: '流媒体服务 (YouTube/Netflix) 解锁实测', url: '/images/unlock/photo_2026-08-19_12-13-01.jpg' },
    { title: '海外音乐与社交平台 (Spotify/TikTok) 实测', url: '/images/unlock/photo_2026-08-19_12-13-50.jpg' },
    { title: '多区域落地节点流媒体支持状态表', url: '/images/unlock/photo_2026-08-19_12-13-58.jpg' },
    { title: 'ChatGPT / Claude AI 工具与流媒体解锁矩阵', url: '/images/unlock/photo_2026-08-19_12-18-40.jpg' },
    { title: '光速云全节点批量延迟与速率实测图', url: '/images/unlock/photo_2026-08-19_12-20-10.jpg' }
  ]
}

// Helper to parse TSV/table text
function parsePlans(block) {
  const plans = []
  const planIdx = block.indexOf('套餐价格')
  if (planIdx === -1) return plans
  const sub = block.slice(planIdx)
  const lines = sub.split('\n')
  let inTable = false
  for (let l of lines) {
    l = l.trim()
    if (!l) {
      if (inTable) break
      continue
    }
    if (l.includes('套餐名称') && l.includes('价格')) {
      inTable = true
      continue
    }
    if (inTable) {
      if (l.startsWith('测速') || l.startsWith('流媒体') || l.startsWith('介绍') || l.startsWith('待核实') || l.startsWith('##')) {
        break
      }
      const parts = l.split(/\t+|\s{2,}/).map(s => s.trim()).filter(Boolean)
      if (parts.length >= 3) {
        plans.push({
          name: parts[0] || '',
          billing: parts[1] || '月付',
          price: parts[2] || '',
          traffic: parts[3] || '',
          cycle: parts[4] || '每月'
        })
      }
    }
  }
  return plans
}

function parseSpeedtest(block) {
  const tests = []
  const testIdx = block.indexOf('测速（')
  if (testIdx === -1) return tests
  const sub = block.slice(testIdx)
  const lines = sub.split('\n')
  let inTable = false
  for (let l of lines) {
    l = l.trim()
    if (!l) {
      if (inTable) break
      continue
    }
    if (l.includes('节点') && (l.includes('延迟') || l.includes('统计延迟'))) {
      inTable = true
      continue
    }
    if (inTable) {
      if (l.startsWith('流媒体') || l.startsWith('介绍') || l.startsWith('待核实') || l.startsWith('##') || l.startsWith('这些是旧资料')) {
        break
      }
      const parts = l.split(/\t+|\s{2,}/).map(s => s.trim()).filter(Boolean)
      if (parts.length >= 2) {
        tests.push({
          region: parts[0] || '',
          ping: parts[1] || '',
          speed: parts[2] || '',
          date: parts[3] || '2026-10-19'
        })
      }
    }
  }
  return tests
}

function parseUnlock(block) {
  const unlock = { ai: [], streaming: [], notes: '' }
  const unIdx = block.indexOf('流媒体 & AI 解锁')
  if (unIdx === -1) return unlock
  const sub = block.slice(unIdx)
  const lines = sub.split('\n')
  for (let l of lines) {
    l = l.trim()
    if (l.startsWith('介绍说明') || l.startsWith('待核实') || l.startsWith('##')) break
    if (l.includes('ChatGPT') || l.includes('Claude') || l.includes('Gemini') || l.includes('OpenAI')) {
      unlock.ai.push(l.replace(/^[-*•]\s*/, ''))
    } else if (l.includes('Netflix') || l.includes('Disney+') || l.includes('YouTube') || l.includes('TikTok') || l.includes('Spotify')) {
      unlock.streaming.push(l.replace(/^[-*•]\s*/, ''))
    }
  }
  return unlock
}

function parseDescription(block) {
  const introIdx = block.indexOf('介绍说明')
  if (introIdx === -1) return ''
  const sub = block.slice(introIdx)
  const lines = sub.split('\n')
  const content = []
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].trim()
    if (l.startsWith('待核实') || l.startsWith('注意事项') || l.startsWith('##') || l.startsWith('---') || l.startsWith('注册链接')) {
      break
    }
    if (l) content.push(l)
  }
  return content.join('\n\n')
}

// Build map for 28 brands
const brand28Map = {}
const blocks28 = text28.split(/\n(?=##\s*\d+\.)/)
for (const b of blocks28) {
  const m = b.match(/##\s*(\d+)\.\s*([^\n\r]+)/)
  if (!m) continue
  const title = m[2]
  // Extract ID if present in parentheses like （feimao）
  const idMatch = title.match(/（([a-zA-Z0-9_-]+)）/)
  let id = idMatch ? idMatch[1].toLowerCase() : ''
  if (!id) {
    if (title.includes('光速云')) id = 'gsy'
    else if (title.includes('飞猫云')) id = 'feimao'
    else if (title.includes('微风网络')) id = 'weifeng'
    else if (title.includes('暮光加速')) id = 'muguang'
    else if (title.includes('大佬云')) id = 'dalaoyun'
    else if (title.includes('星岛梦')) id = 'xingdaomeng'
    else if (title.includes('二猫云')) id = 'ermao'
    else if (title.includes('无忧链接')) id = 'wuyou'
    else if (title.includes('唯兔云')) id = 'weitu'
    else if (title.includes('Firefly')) id = 'firefly'
    else if (title.includes('宇宙云')) id = 'yuzhou'
    else if (title.includes('U1S1')) id = 'u1s1'
    else if (title.includes('灵猫网络')) id = 'lingmao'
    else if (title.includes('极连云')) id = 'jilian'
    else if (title.includes('光年梯')) id = 'guangnian'
    else if (title.includes('一翻云')) id = 'yifan'
    else if (title.includes('SOGO')) id = 'sogo'
    else if (title.includes('可信云')) id = 'kexin'
    else if (title.includes('速界')) id = 'sujie'
    else if (title.includes('闪跃')) id = 'shanyue'
    else if (title.includes('全球云')) id = 'quanqiu'
    else if (title.includes('闪电鼠')) id = 'shandianshu'
    else if (title.includes('云界线')) id = 'yunjiexian'
    else if (title.includes('榴莲云')) id = 'liulianyun'
    else if (title.includes('神行加速')) id = 'shenxing'
    else if (title.includes('环球梯')) id = 'huanqiuti'
    else if (title.includes('隐形人')) id = 'yinxingren'
    else if (title.includes('梯子云')) id = 'tiziyun'
  }
  if (id) {
    brand28Map[id] = {
      raw: b,
      plans: parsePlans(b),
      speedtest: parseSpeedtest(b),
      unlock: parseUnlock(b),
      description: parseDescription(b)
    }
  }
}

// Build map for 14 brands
const brand14Names = [
  { name: 'WgetCloud', id: 'wgetcloud' },
  { name: '白月光', id: 'baiyueguang' },
  { name: 'FlyingBird', id: 'flyingbird' },
  { name: 'CyberGuard', id: 'cyberguard' },
  { name: '龙猫云', id: 'longmaoyun' },
  { name: 'FATCAT', id: 'fatcat' },
  { name: 'TNTCloud', id: 'tntcloud' },
  { name: '青云梯', id: 'qingyunti' },
  { name: '山水云', id: 'shanshuiyun' },
  { name: '灵动云', id: 'lingdongyun' },
  { name: '浪网', id: 'langwang' },
  { name: 'EdgeNova', id: 'edgenova' },
  { name: '萤火虫', id: 'firefly-2' },
  { name: 'sslar', id: 'sslar' }
]

const brand14Map = {}
for (let i = 0; i < brand14Names.length; i++) {
  const cur = brand14Names[i]
  const next = brand14Names[i + 1]
  const startIdx = text14.indexOf(cur.name)
  const endIdx = next ? text14.indexOf(next.name, startIdx + cur.name.length) : text14.length
  if (startIdx !== -1) {
    const block = text14.slice(startIdx, endIdx !== -1 ? endIdx : text14.length)
    brand14Map[cur.id] = {
      raw: block,
      plans: parsePlans(block),
      speedtest: parseSpeedtest(block),
      unlock: parseUnlock(block),
      description: parseDescription(block)
    }
  }
}

console.log('Parsed brand28 count:', Object.keys(brand28Map).length)
console.log('Parsed brand14 count:', Object.keys(brand14Map).length)

// Merge into existing brands
const enrichedBrands = existingBrands.map(b => {
  const extra = brand28Map[b.id] || brand14Map[b.id] || {}
  const speedtestImage = speedtestImgMap[b.id] || null
  const unlockImages = unlockImgMap[b.id] || null

  return {
    ...b,
    plans: extra.plans && extra.plans.length > 0 ? extra.plans : undefined,
    speedtest: extra.speedtest && extra.speedtest.length > 0 ? extra.speedtest : undefined,
    unlock: extra.unlock && (extra.unlock.ai.length > 0 || extra.unlock.streaming.length > 0) ? extra.unlock : undefined,
    reviewNotes: extra.description || undefined,
    speedtestImage,
    unlockImages
  }
})

// Save enriched brands.json
fs.writeFileSync(path.join(srcDir, 'data', 'brands.json'), JSON.stringify(enrichedBrands, null, 2), 'utf-8')
console.log('Successfully enriched src/data/brands.json!')

// Check how many brands have speedtestImage and plans
const withSpeedImg = enrichedBrands.filter(b => b.speedtestImage)
const withPlans = enrichedBrands.filter(b => b.plans)
const withSpeedData = enrichedBrands.filter(b => b.speedtest)
console.log(`Brands with speedtest image: ${withSpeedImg.length}`)
console.log(`Brands with plans table: ${withPlans.length}`)
console.log(`Brands with speed test data: ${withSpeedData.length}`)
