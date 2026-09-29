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
const issues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    // 1. text-white used without dark: and without a dark bg class in the same line or element
    if (/text-white\b/.test(l) && !/bg-(blue|cyan|indigo|rose|emerald|amber|red|gray-900|gray-950|black|slate-900|slate-950|purple)/.test(l) && !l.includes('dark:text-white') && !l.includes('hover:text-white') && !l.includes('//')) {
      issues.push({ file: f, line: idx + 1, reason: 'text-white without dark bg in light mode', text: l.trim() });
    }
    // 2. Light gray text on light background (e.g. text-gray-300 or text-slate-300 without dark:)
    if (/(text-(gray|slate|zinc)-(300|200))\b/.test(l) && !l.includes('dark:') && !/bg-(slate|gray)-(800|900|950)/.test(l) && !l.includes('//')) {
      issues.push({ file: f, line: idx + 1, reason: 'low contrast light text in light mode', text: l.trim() });
    }
    // 3. Inputs without text color or border
    if (/<(input|textarea|select)\b/.test(l) && !l.includes('text-') && !l.includes('//')) {
      issues.push({ file: f, line: idx + 1, reason: 'input without explicit text color', text: l.trim() });
    }
  });
});

console.log(`Found ${issues.length} potential light mode contrast / invisible text issues.`);
issues.forEach(i => console.log(`[${i.reason}] ${i.file}:${i.line} -> ${i.text}`));
