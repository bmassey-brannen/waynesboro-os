import { chromium } from 'playwright';

const widths = [390, 768, 1280, 1440];
const browser = await chromium.launch({ headless: true });
const results = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => ({
    viewport: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    disclaimer: document.body.innerText.includes('synthetic operating placeholders') || document.body.innerText.includes('synthetic mock data'),
    kpiCards: document.querySelectorAll('.kpi-card').length,
    tables: document.querySelectorAll('table').length,
    mapNodes: document.querySelectorAll('.map-node').length,
    activeAlertSnapshots: document.querySelectorAll('.active-alert-snapshot').length,
  }));
  results.push({ width, ...metrics, errors });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
