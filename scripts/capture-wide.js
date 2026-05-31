import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const url = process.env.WAYNESBORO_URL || 'http://127.0.0.1:4321/';
const outDir = '/root/.hermes/cache/screenshots';
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 3440, height: 1440 }, deviceScaleFactor: 1 });
const messages = [];
page.on('console', msg => messages.push({ type: msg.type(), text: msg.text() }));
page.on('pageerror', err => messages.push({ type: 'pageerror', text: err.message }));
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: `${outDir}/waynesboro-os-wide-3440x1440-top.png`, fullPage: false });
await page.screenshot({ path: `${outDir}/waynesboro-os-wide-3440-fullpage.png`, fullPage: true });
const metrics = await page.evaluate(() => ({
  title: document.title,
  viewport: { width: window.innerWidth, height: window.innerHeight },
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  bodyOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  kpis: document.querySelectorAll('.kpi-card').length,
  tables: document.querySelectorAll('table').length,
  disclaimer: document.body.innerText.includes('synthetic operating placeholders') || document.body.innerText.includes('synthetic mock data'),
  topbarHeight: Math.round(document.querySelector('.topbar')?.getBoundingClientRect().height || 0),
  firstPanelTop: Math.round(document.querySelector('#executive')?.getBoundingClientRect().top || 0)
}));
await browser.close();
console.log(JSON.stringify({
  screenshots: [
    `${outDir}/waynesboro-os-wide-3440x1440-top.png`,
    `${outDir}/waynesboro-os-wide-3440-fullpage.png`
  ],
  metrics,
  consoleMessages: messages
}, null, 2));
