import fs from 'node:fs'
import path from 'node:path'

const file28 = 'C:/Users/Pro User/Desktop/机场品牌信息/28个机场品牌清单.txt'
const file14 = 'C:/Users/Pro User/Desktop/机场品牌信息/14个机场品牌清单.txt'

const text28 = fs.readFileSync(file28, 'utf-8')
const text14 = fs.readFileSync(file14, 'utf-8')

// Split text28 by ##
const parts28 = text28.split(/\n(?=##\s*\d+\.)/)
console.log('parts28 count:', parts28.length)

// Split text14 by brand headers
const parts14 = text14.split(/\n(?=[A-Za-z0-9\u4e00-\u9fa5]+\s*\n基础信息)/)
console.log('parts14 count:', parts14.length)

for (let i = 0; i < Math.min(3, parts28.length); i++) {
  console.log(`\n--- Brand 28 #${i} preview ---`)
  console.log(parts28[i].slice(0, 300))
}

for (let i = 0; i < Math.min(3, parts14.length); i++) {
  console.log(`\n--- Brand 14 #${i} preview ---`)
  console.log(parts14[i].slice(0, 300))
}
