const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('src/pages').concat(walk('src/components'));
const missingDarkMap = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (/(text-(gray|slate|zinc)-(700|800|900))/.test(l) && !l.includes('dark:text-') && !l.includes('//')) {
      if (!missingDarkMap[f]) missingDarkMap[f] = [];
      missingDarkMap[f].push({ line: idx + 1, text: l.trim() });
    }
  });
});

for (const [file, items] of Object.entries(missingDarkMap)) {
  console.log(`\n=== ${file} (${items.length} issues) ===`);
  items.slice(0, 5).forEach(i => console.log(`  L${i.line}: ${i.text}`));
}
