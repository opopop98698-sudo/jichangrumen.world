import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')

console.log('=== 开始全面验证 jichangrumen.world 站点数据与合规属性 ===\n')

let hasErrors = false

// 1. Verify brands.json (42 brands, 29-42 strictly ordered)
console.log('1. 验证 brands.json 数据集...')
const brandsFile = path.join(srcDir, 'data', 'brands.json')
if (!fs.existsSync(brandsFile)) {
  console.error('❌ 未找到 brands.json 文件！')
  hasErrors = true
} else {
  const brands = JSON.parse(fs.readFileSync(brandsFile, 'utf-8'))
  if (brands.length !== 42) {
    console.error(`❌ 品牌数量不符合要求：预期 42 个，实际有 ${brands.length} 个！`)
    hasErrors = true
  } else {
    console.log(`✅ 品牌总数准确：42 个品牌。`)
  }

  // Check GSY is primary
  const gsy = brands[0]
  if (gsy.id !== 'gsy' || !gsy.isPrimary) {
    console.error('❌ 第一位不是光速云 (gsy) 或未设置 isPrimary！')
    hasErrors = true
  } else {
    console.log('✅ 首推品牌正确：光速云 (gsy, isPrimary=true)。')
  }

  // Check ranks 29 to 42
  const expectedRanks = [
    { rank: 29, id: 'wgetcloud', name: 'WgetCloud' },
    { rank: 30, id: 'baiyueguang', name: '白月光' },
    { rank: 31, id: 'flyingbird', name: 'FlyingBird' },
    { rank: 32, id: 'cyberguard', name: 'CyberGuard' },
    { rank: 33, id: 'longmaoyun', name: '龙猫云' },
    { rank: 34, id: 'fatcat', name: 'FATCAT' },
    { rank: 35, id: 'tntcloud', name: 'TNTCloud' },
    { rank: 36, id: 'qingyunti', name: '青云梯' },
    { rank: 37, id: 'shanshuiyun', name: '山水云' },
    { rank: 38, id: 'lingdongyun', name: '灵动云' },
    { rank: 39, id: 'langwang', name: '浪网' },
    { rank: 40, id: 'edgenova', name: 'EdgeNova' },
    { rank: 41, id: 'firefly-2', name: '萤火虫' },
    { rank: 42, id: 'sslar', name: 'sslar' }
  ]

  let rankErrors = 0
  for (const exp of expectedRanks) {
    const brand = brands.find(b => b.rank === exp.rank)
    if (!brand || brand.id !== exp.id) {
      console.error(`❌ 第 ${exp.rank} 位品牌不匹配：预期 ${exp.name} (${exp.id})，实际为 ${brand ? brand.name : '缺失'}！`)
      rankErrors++
      hasErrors = true
    }
  }
  if (rankErrors === 0) {
    console.log('✅ 29-42 位新增品牌顺序严格准确！')
  }
}

// 2. Scan all markdown files for dead internal links
console.log('\n2. 扫描所有 Markdown 页面与内部链接...')

function getAllFiles(dir, ext = '.md') {
  let files = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === 'dist') continue
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, ext))
    } else if (item.name.endsWith(ext)) {
      files.push(fullPath)
    }
  }
  return files
}

const mdFiles = getAllFiles(srcDir, '.md')
console.log(`共扫描到 ${mdFiles.length} 篇 Markdown 文章。`)

let deadLinkCount = 0
let nextStepCount = 0

// Build all valid route paths
const validRoutes = new Set([
  '/',
  '/about/',
  '/recommend/',
  '/free/',
  '/what-is-airport/',
  '/guides/',
  '/clients/',
  '/tutorials/',
  '/faq/',
  '/reviews/'
])

for (const file of mdFiles) {
  const rel = path.relative(srcDir, file).replace(/\\/g, '/')
  if (rel.endsWith('index.md')) {
    const dirRoute = '/' + rel.slice(0, -8)
    validRoutes.add(dirRoute === '/index' ? '/' : dirRoute.endsWith('/') ? dirRoute : dirRoute + '/')
    validRoutes.add(dirRoute === '/index' ? '' : dirRoute.replace(/\/$/, ''))
  } else if (rel.endsWith('.md')) {
    const slugRoute = '/' + rel.slice(0, -3)
    validRoutes.add(slugRoute)
  }
}

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf-8')
  if (content.includes('<NextStep')) {
    nextStepCount++
  }

  // Match markdown links [text](link)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[2].trim()
    // Ignore external links, anchors, and mailto
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('mailto:')) {
      continue
    }

    // Clean anchor
    const cleanLink = link.split('#')[0]
    if (!cleanLink) continue

    // If image asset, verify existence in src/public
    if (link.startsWith('/images/') || link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.svg')) {
      const publicPath = path.join(srcDir, 'public', link.replace(/^\//, ''))
      if (!fs.existsSync(publicPath)) {
        console.warn(`⚠️ 在 ${path.relative(srcDir, file)} 中发现缺失图片资产: ${link}`)
        deadLinkCount++
      }
      continue
    }

    const normalized = cleanLink.endsWith('/') ? cleanLink : cleanLink

    // Check if route exists
    if (!validRoutes.has(normalized) && !validRoutes.has(normalized + '/') && !validRoutes.has(normalized.replace(/\/$/, ''))) {
      console.warn(`⚠️ 在 ${path.relative(srcDir, file)} 中发现潜在死链: ${link}`)
      deadLinkCount++
    }
  }
}

if (deadLinkCount === 0) {
  console.log('✅ 全站无任何死链！所有内部页面链接均有效。')
} else {
  console.log(`⚠️ 发现了 ${deadLinkCount} 个内部链接警示。`)
}

console.log(`✅ NextStep 引导组件覆盖：共检测到 ${nextStepCount} 处 NextStep 调用。`)

// 3. Verify compliance and sponsored attribute in components
console.log('\n3. 校验商业属性与免责披露规范...')
const brandCardFile = path.join(srcDir, '.vitepress', 'theme', 'components', 'BrandCard.vue')
const brandCardContent = fs.readFileSync(brandCardFile, 'utf-8')

if (!brandCardContent.includes('rel="nofollow sponsored noopener"')) {
  console.error('❌ BrandCard.vue 未包含 rel="nofollow sponsored noopener" 属性！')
  hasErrors = true
} else {
  console.log('✅ BrandCard.vue 严格带有 rel="nofollow sponsored noopener" 商业属性。')
}

if (!brandCardContent.includes('含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格')) {
  console.error('❌ BrandCard.vue 缺少商业披露声明文字！')
  hasErrors = true
} else {
  console.log('✅ BrandCard.vue 严格包含商业披露警示语。')
}

// 4. Verify Apache .htaccess
console.log('\n4. 校验 Apache .htaccess 静态部署配置...')
const htaccessFile = path.join(srcDir, 'public', '.htaccess')
if (!fs.existsSync(htaccessFile)) {
  console.error('❌ 未找到 src/public/.htaccess 文件！')
  hasErrors = true
} else {
  const htContent = fs.readFileSync(htaccessFile, 'utf-8')
  if (htContent.includes('RewriteEngine On') && htContent.includes('ErrorDocument 404')) {
    console.log('✅ src/public/.htaccess 配置完备。')
  } else {
    console.error('❌ src/public/.htaccess 内容缺少必要重写规则！')
    hasErrors = true
  }
}

console.log('\n========================================')
if (hasErrors) {
  console.error('❌ 验证失败，存在不合规项！')
  process.exit(1)
} else {
  console.log('🎉 验证全部通过！所有指标与合规标准 100% 达成。')
}
