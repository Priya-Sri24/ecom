const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, '..', 'assets', 'css');

function cleanContent(s) {
  return s
    .replace(/\uFEFF/g, '')    // BOM
    .replace(/\u200B/g, '')    // zero-width space
    .replace(/\u00A0/g, ' ')   // non-breaking space -> normal space
    .replace(/\uFFFD/g, '')    // replacement char
    ;
}

function run() {
  if (!fs.existsSync(CSS_DIR)) {
    console.error('CSS directory not found:', CSS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  let changed = 0;

  files.forEach(file => {
    const p = path.join(CSS_DIR, file);
    let src = fs.readFileSync(p, 'utf8');
    const cleaned = cleanContent(src);
    if (cleaned !== src) {
      fs.writeFileSync(p, cleaned, 'utf8');
      console.log('Cleaned:', file);
      changed++;
    }
  });

  if (!changed) console.log('No control characters found.');
}

run();
