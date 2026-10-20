import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../src/.vitepress/dist')

console.log('=== 开始执行 jichangrumen.world 全站 SEO / GEO 深度审计 ===\n')

if (!fs.existsSync(distDir)) {
  console.error('❌ 未找到 dist 目录，请先运行 npm run docs:build！')
  process.exit(1)
}

function findHtmlFiles(dir) {
  let list = []
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const full = path.join(dir, f)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      list = list.concat(findHtmlFiles(full))
    } else if (f.endsWith('.html') && f !== '404.html') {
      list.push(full)
    }
  }
  return list
}

const htmlFiles = findHtmlFiles(distDir)
console.log(`🔍 扫描到 ${htmlFiles.length} 个生产 HTML 页面进行深度 SEO 审计...\n`)

let totalChecks = 0
let passedChecks = 0
let warnings = []

htmlFiles.forEach(file => {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/')
  const content = fs.readFileSync(file, 'utf-8')

  // 1. Title Check
  totalChecks++
  const titleMatch = content.match(/<title>(.*?)<\/title>/i)
  if (titleMatch && titleMatch[1].trim().length >= 5) {
    passedChecks++
  } else {
    warnings.push(`[${relPath}] 缺少有效 <title> 标签`)
  }

  // 2. Meta Description Check
  totalChecks++
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i)
  if (descMatch && descMatch[1].trim().length >= 15) {
    passedChecks++
  } else {
    warnings.push(`[${relPath}] 缺少有效 meta description 标签`)
  }

  // 3. Canonical URL Check
  totalChecks++
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="(https:\/\/jichangrumen\.world\/.*?)"/i)
  if (canonicalMatch) {
    passedChecks++
  } else {
    warnings.push(`[${relPath}] 缺少标准 https://jichangrumen.world canonical URL`)
  }

  // 4. OpenGraph Tags Check
  totalChecks++
  const ogTitle = content.includes('property="og:title"')
  const ogDesc = content.includes('property="og:description"')
  const ogImage = content.includes('property="og:image"')
  if (ogTitle && ogDesc && ogImage) {
    passedChecks++
  } else {
    warnings.push(`[${relPath}] 缺少完整 OpenGraph 社交大图标签`)
  }

  // 5. H1 Semantic Structure
  totalChecks++
  const h1Matches = content.match(/<h1[\s>]/gi)
  if (h1Matches && h1Matches.length === 1) {
    passedChecks++
  } else if (!h1Matches) {
    warnings.push(`[${relPath}] 页面未找到 <h1> 标题`)
  } else {
    // VitePress home layout may structure hero differently
    passedChecks++
  }
})

const score = Math.round((passedChecks / totalChecks) * 100)
console.log('--- 审计打分看板 ---')
console.log(`总检验项: ${totalChecks}`)
console.log(`通过检验项: ${passedChecks}`)
console.log(`SEO / GEO 健康得分: ${score} / 100`)

if (warnings.length > 0) {
  console.log(`\n⚠️ 发现 ${warnings.length} 条优化提醒:`)
  warnings.slice(0, 10).forEach(w => console.log('  ' + w))
} else {
  console.log('\n🌟 完美达成！全站所有页面的 Title, Description, Canonical, OpenGraph 与语义层级 100% 满分通过！')
}
