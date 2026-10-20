import fs from 'fs';
import path from 'path';

const dir = 'src/what-is-airport';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace file:///reviews/#gsy or file:///what-is-airport/... with canonical routes
  content = content.replace(/file:\/\/\/([a-zA-Z0-9_\-\/]+?)(?:\.md)?(#[^\s\)\"]*)?/gi, (match, p1, p2) => {
    let cleanPath = p1;
    if (cleanPath.endsWith('/index')) {
      cleanPath = cleanPath.slice(0, -5);
    } else if (cleanPath === 'index') {
      cleanPath = '';
    }
    const hash = p2 || '';
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    if (cleanPath === '/reviews' && hash) {
      cleanPath = '/reviews/';
    }
    return cleanPath + hash;
  });

  // Strip .md from links
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

console.log('Successfully cleaned links in src/what-is-airport!');
