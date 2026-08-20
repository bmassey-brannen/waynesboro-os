import { chromium } from 'playwright';
import fs from 'node:fs';

const inputBaseUrl = process.argv[2] || 'http://127.0.0.1:4321';
const baseUrl = inputBaseUrl.replace(/\/$/, '');
const bundledExecutable = chromium.executablePath();
const browser = await chromium.launch({
  headless: true,
  ...(fs.existsSync(bundledExecutable) ? { executablePath: bundledExecutable } : {})
});

const routes = [
  '/',
  '/briefing/',
  '/council/',
  '/downtown/',
  '/economic/',
  '/operations/',
  '/sources/'
];
const viewports = [
  { label: 'phone', viewport: { width: 390, height: 844, isMobile: true } },
  { label: 'desktop', viewport: { width: 1440, height: 1000 } }
];
const blockedPublicTerms = [
  new RegExp('Waynesboro,\\s*Virginia', 'i'),
  new RegExp('Waynesboro\\s+VA\\b', 'i'),
  new RegExp(['Small', 'Town', 'Capital'].join('\\s+'), 'i'),
  new RegExp(['King', 'Beemo'].join('\\s+'), 'i'),
  new RegExp(['Command', 'Center'].join('\\s+'), 'i'),
  new RegExp('Ody' + 'sseus', 'i'),
  new RegExp('Abe' + 'be', 'i'),
  new RegExp(['charity', 'integrity'].join('\\s+'), 'i'),
  new RegExp(['source', 'pending'].join('[-\\s]+'), 'i'),
  new RegExp(['invented', 'project'].join('\\s+'), 'i'),
  new RegExp(['private', 'internal'].join('\\/'), 'i'),
  new RegExp(['token', 'configured'].join('\\s+'), 'i'),
  new RegExp(['key', 'ready'].join('\\s+'), 'i'),
  new RegExp(['API', 'credential', 'readiness'].join('\\s+'), 'i'),
  new RegExp(['local', 'keys', 'staged'].join('\\s+'), 'i')
];

const findings = [];
const failures = [];

function joinUrl(base, route) {
  return `${base}${route}`;
}

for (const route of routes) {
  for (const { label, viewport } of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    const pageErrors = [];
    const networkErrors = [];
    const requests = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error' && !text.startsWith('Failed to load resource:')) consoleErrors.push(text);
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('response', (response) => {
      if (response.status() >= 400) networkErrors.push(`${response.status()} ${response.url()}`);
    });
    page.on('request', (request) => requests.push(request.url()));

    const url = joinUrl(baseUrl, route);
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate((patterns) => {
      const bodyText = document.body.innerText || '';
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.href);
      const images = [...document.querySelectorAll('img[src]')].map((img) => img.src);
      return {
        title: document.title,
        h1: document.querySelector('h1')?.innerText?.trim() || null,
        bodyTextLength: bodyText.trim().length,
        hasGeorgia: /Waynesboro,\s*Georgia|Burke County|Georgia/i.test(bodyText),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        badAssetRefs: [...links, ...images, ...[...document.querySelectorAll('link[href]')].map((link) => link.href)]
          .filter((href) => /waynesboro-os(?:favicon|assets)/i.test(href)),
        blockedTerms: patterns
          .map((pattern) => new RegExp(pattern.source, pattern.flags))
          .filter((pattern) => pattern.test(bodyText))
          .map((pattern) => pattern.toString())
      };
    }, blockedPublicTerms);

    const status = response?.status() ?? 0;
    const routeFinding = { route, label, url, status, consoleErrors, pageErrors, networkErrors, metrics };
    findings.push(routeFinding);

    if (status >= 400 || status === 0) failures.push(`${route} ${label}: HTTP status ${status}`);
    if (consoleErrors.length) failures.push(`${route} ${label}: console errors: ${consoleErrors.join('; ')}`);
    if (pageErrors.length) failures.push(`${route} ${label}: page errors: ${pageErrors.join('; ')}`);
    if (networkErrors.length) failures.push(`${route} ${label}: network errors: ${networkErrors.join('; ')}`);
    if (metrics.bodyTextLength < 500) failures.push(`${route} ${label}: thin/empty page body (${metrics.bodyTextLength} chars)`);
    if (metrics.overflow > 2) failures.push(`${route} ${label}: horizontal overflow ${metrics.overflow}px`);
    if (!metrics.hasGeorgia) failures.push(`${route} ${label}: missing explicit Georgia/Burke geography context`);
    if (metrics.badAssetRefs.length) failures.push(`${route} ${label}: malformed base asset refs: ${metrics.badAssetRefs.join(', ')}`);
    if (metrics.blockedTerms.length) failures.push(`${route} ${label}: blocked public terms present: ${metrics.blockedTerms.join(', ')}`);

    await page.close();
  }
}

await browser.close();
console.log(JSON.stringify(findings, null, 2));

if (failures.length) {
  console.error(`QA FAIL\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`QA PASS: ${routes.length} public routes passed phone + desktop render checks at ${baseUrl}.`);
