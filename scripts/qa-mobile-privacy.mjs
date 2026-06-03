import { chromium } from 'playwright';
import fs from 'node:fs';

const baseUrl = process.argv[2] || 'http://127.0.0.1:4321';
const bundledExecutable = chromium.executablePath();
const browser = await chromium.launch({
  headless: true,
  ...(fs.existsSync(bundledExecutable) ? { executablePath: bundledExecutable } : {})
});
const findings = [];

async function inspectPage(path, viewport, screenshotName) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  const networkErrors = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' && !text.startsWith('Failed to load resource:')) errors.push(text);
  });
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('response', (response) => {
    if (response.status() >= 400) networkErrors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: screenshotName, fullPage: true });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    bodyTextLength: document.body.innerText.length,
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    navItems: [...document.querySelectorAll('.sidebar nav a')].map(a => a.textContent.trim()),
    hasCalendar: Boolean(document.querySelector('.meeting-calendar-panel')),
    hasMap: Boolean(document.querySelector('.public-map-ui')),
    hasWithheld: document.body.innerText.includes('Withheld for residential'),
    visibleDollarMatches: (document.body.innerText.match(/\$[0-9][0-9,.]*K/g) || []).slice(0, 12),
    hasDoorEvents: document.body.innerText.includes('D.O.O.R. / Downtown Events'),
    calendar: (() => {
      const panel = document.querySelector('.meeting-calendar-panel');
      const shell = document.querySelector('.meeting-calendar-shell');
      const grid = document.querySelector('.meeting-month-grid');
      if (!panel || !shell || !grid) return null;
      const panelRect = panel.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      return {
        panelWidth: Math.round(panelRect.width),
        shellWidth: Math.round(shellRect.width),
        gridWidth: Math.round(gridRect.width),
        shellScrollWidth: shell.scrollWidth,
        gridOverPanel: Math.round(gridRect.width - panelRect.width),
        minChipHeight: Math.round(Math.min(...[...document.querySelectorAll('.calendar-event-chip')].map((chip) => chip.getBoundingClientRect().height))),
        doorDateCaveatPresent: /date not confirmed|exact date not confirmed/i.test(document.body.innerText),
      };
    })(),
  }));
  findings.push({ path, viewport, screenshotName, errors, networkErrors, metrics });
  await page.close();
}

await inspectPage('/', { width: 390, height: 844, isMobile: true }, '/tmp/waynesboro-home-mobile.png');
await inspectPage('/downtown/', { width: 390, height: 844, isMobile: true }, '/tmp/waynesboro-downtown-mobile.png');
await inspectPage('/downtown/', { width: 1440, height: 1000 }, '/tmp/waynesboro-downtown-desktop.png');

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${baseUrl}/downtown/`, { waitUntil: 'networkidle' });
const privacy = await page.evaluate(() => {
  const residentialDots = [...document.querySelectorAll('.parcel-dot.parcel-residential')];
  const residentialTitles = residentialDots.map(dot => dot.getAttribute('title') || '');
  const residentialTitleLeaks = residentialTitles.filter(title => /\$[0-9][0-9,.]*K/.test(title));
  const tableRows = [...document.querySelectorAll('tbody tr')].map(row => [...row.cells].map(cell => cell.innerText.trim()));
  const residentialRows = tableRows.filter(cells => cells.some(cell => cell === 'Residential'));
  const residentialRowLeaks = residentialRows.filter(cells => cells.some(cell => /\$[0-9][0-9,.]*K/.test(cell)));
  return {
    residentialDotCount: residentialDots.length,
    residentialTitleSample: residentialTitles.slice(0, 5),
    residentialTitleLeaks,
    residentialRowCount: residentialRows.length,
    residentialRowLeakCount: residentialRowLeaks.length,
    firstResidentialRow: residentialRows[0] || null,
    bodyHasWithheld: document.body.innerText.includes('Withheld for residential'),
    bodyHasPrivacyCopy: document.body.innerText.includes('residential assessed values withheld'),
  };
});
findings.push({ path: '/downtown/', privacy });
await page.close();

await browser.close();
console.log(JSON.stringify(findings, null, 2));

const failures = [];
for (const item of findings) {
  if (item.errors?.length) failures.push(`${item.path} console errors: ${item.errors.join('; ')}`);
  if (item.networkErrors?.length) failures.push(`${item.path} network errors: ${item.networkErrors.join('; ')}`);
  if (item.metrics?.overflow > 2) failures.push(`${item.path} horizontal document overflow ${item.metrics.overflow}px at ${item.viewport.width}px`);
  if (item.path === '/' && item.metrics && !item.metrics.hasCalendar) failures.push('home mobile missing calendar panel');
  if (item.path === '/' && item.viewport?.width <= 430 && item.metrics?.calendar?.gridOverPanel > 2) failures.push(`home mobile calendar grid wider than panel by ${item.metrics.calendar.gridOverPanel}px`);
  if (item.path === '/' && item.viewport?.width <= 430 && item.metrics?.calendar?.minChipHeight < 12) failures.push(`home mobile calendar chips too small: ${item.metrics.calendar.minChipHeight}px`);
  if (item.path === '/' && item.metrics && !item.metrics.hasDoorEvents) failures.push('home mobile missing D.O.O.R. event watch rows');
  if (item.path === '/' && item.metrics?.hasDoorEvents && !item.metrics?.calendar?.doorDateCaveatPresent) failures.push('D.O.O.R. source-route events missing date-confirmation caveat');
  if (item.path === '/downtown/' && item.metrics && !item.metrics.hasMap) failures.push('downtown mobile missing map');
  if (item.privacy) {
    if (item.privacy.residentialTitleLeaks.length) failures.push(`residential title leaks: ${item.privacy.residentialTitleLeaks.slice(0, 3).join(' | ')}`);
    if (item.privacy.residentialRowLeakCount) failures.push(`residential table leaks: ${item.privacy.residentialRowLeakCount}`);
    if (!item.privacy.bodyHasWithheld) failures.push('withheld label not rendered');
    if (!item.privacy.bodyHasPrivacyCopy) failures.push('privacy copy not rendered');
  }
}
if (failures.length) {
  console.error(`QA FAIL\n${failures.join('\n')}`);
  process.exit(1);
}
