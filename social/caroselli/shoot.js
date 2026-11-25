// Renders every <section> of each carousel page to its own PNG (1080 × 1350).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const name of (process.argv[2] ? process.argv.slice(2) : ['dizionario', 'flusso'])) {
    const out = path.join(__dirname, 'out', name);
    fs.mkdirSync(out, { recursive: true });
    await p.goto('file://' + path.join(__dirname, name + '.html'));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(500);
    const slides = await p.$$('section');
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(out, `${name}-${String(i + 1).padStart(2, '0')}.png`) });
    }
    console.log(name, slides.length);
  }
  await b.close();
})();
