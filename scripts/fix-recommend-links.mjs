import fs from 'fs';
import path from 'path';

const dir = 'src/recommend';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace [text](/path/to/page.md#anchor) -> [text](/path/to/page#anchor)
  // Replace [text](/reviews/index.md#gsy) -> [text](/reviews/#gsy)
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
    if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('mailto:')) {
      return match;
    }
    
    let [rawUrl, hash] = link.split('#');
    hash = hash ? '#' + hash : '';

    if (rawUrl.endsWith('/index.md') || rawUrl.endsWith('/index')) {
      rawUrl = rawUrl.replace(/\/index(?:\.md)?$/, '/');
    } else if (rawUrl.endsWith('.md')) {
      rawUrl = rawUrl.slice(0, -3);
    }
    
    return `[${text}](${rawUrl}${hash})`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log('Successfully cleaned .md extensions from internal links in src/recommend!');
