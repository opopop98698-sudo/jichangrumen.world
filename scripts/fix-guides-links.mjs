import fs from 'fs';
import path from 'path';

const guidesDir = path.resolve('src/guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(guidesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace file:///links with canonical site paths
  content = content.replace(/file:\/\/\/reviews\/#gsy/g, '/reviews/#brand-gsy');
  content = content.replace(/file:\/\/\/reviews\/#brand-gsy/g, '/reviews/#brand-gsy');
  content = content.replace(/file:\/\/\/clients\/index\.md/g, '/clients/');
  content = content.replace(/file:\/\/\/clients\/safe-download/g, '/clients/safe-download');
  content = content.replace(/file:\/\/\/clients\//g, '/clients/');
  content = content.replace(/file:\/\/\/guides\/([a-zA-Z0-9_-]+)/g, '/guides/$1');
  content = content.replace(/\/reviews\/#gsy/g, '/reviews/#brand-gsy');
  content = content.replace(/\/clients\/index\.md/g, '/clients/');
  content = content.replace(/\.md\)/g, ')');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Normalized links in ${file}`);
}
