import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sitemapPath = path.resolve(__dirname, '../src/.vitepress/dist/sitemap.xml')

console.log('=== 开始执行 jichangrumen.world 在线实时全站爬虫测试 ===\n')

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ 未找到 dist/sitemap.xml，请先运行 npm run docs:build！')
  process.exit(1)
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8')
const locMatches = sitemapContent.match(/<loc>https:\/\/jichangrumen\.world(.*?)<\/loc>/g)

if (!locMatches || locMatches.length === 0) {
  console.error('❌ sitemap.xml 中未找到任何 URL！')
  process.exit(1)
}

const paths = locMatches.map(m => {
  const clean = m.replace('<loc>https://jichangrumen.world', '').replace('</loc>', '')
  return clean === '' ? '/' : clean
})

console.log(`🌐 从 sitemap.xml 成功抽取 ${paths.length} 条全站 URL 路由。`)
console.log(`🚀 开始对 http://127.0.0.1:4173 发起全量真实 HTTP 并发探测...\n`)

async function fetchUrl(urlPath) {
  const startTime = Date.now()
  try {
    const res = await fetch(`http://127.0.0.1:4173${urlPath}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    })
    const body = await res.text()
    const duration = Date.now() - startTime
    return {
      path: urlPath,
      statusCode: res.status,
      duration,
      length: body.length,
      hasAnomaly: body.includes('[object Object]') || body.includes('TODO:')
    }
  } catch (err) {
    return {
      path: urlPath,
      statusCode: 0,
      duration: Date.now() - startTime,
      error: err.message
    }
  }
}

async function runCrawl() {
  const results = []
  const concurrency = 8
  let index = 0

  async function worker() {
    while (index < paths.length) {
      const current = paths[index++]
      const res = await fetchUrl(current)
      results.push(res)
      process.stdout.write(res.statusCode === 200 ? '🟢' : '🔴')
      if (results.length % 30 === 0) process.stdout.write('\n')
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker())
  await Promise.all(workers)

  console.log('\n\n--- 爬虫探测总看板 ---')
  const total = results.length
  const passed = results.filter(r => r.statusCode === 200 && !r.hasAnomaly)
  const failed = results.filter(r => r.statusCode !== 200 || r.hasAnomaly)

  const avgDuration = Math.round(results.reduce((acc, r) => acc + r.duration, 0) / total)

  console.log(`总探测路由: ${total}`)
  console.log(`成功响应 (HTTP 200 & 内容无异常): ${passed.length}`)
  console.log(`失败或异常路由: ${failed.length}`)
  console.log(`平均首屏响应延迟: ${avgDuration} ms`)

  if (failed.length > 0) {
    console.log('\n❌ 存在异常的路由清单:')
    failed.forEach(f => console.log(`  ${f.path} -> Status: ${f.statusCode}, Error: ${f.error || '内容异常'}`))
    process.exit(1)
  } else {
    console.log('\n🎉 全站在线爬取测试 100% 满分通过！所有页面响应极速，状态码全绿 (200 OK)！')
  }
}

runCrawl()
