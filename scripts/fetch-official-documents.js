import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const USER_AGENT = 'WaynesboroOS/0.1 public-document-index (low-volume civic research)';

const sources = [
  {
    id: 'city-agenda-center',
    name: 'City of Waynesboro Agenda Center',
    geography: 'City of Waynesboro',
    sourceType: 'city_agendas_minutes',
    url: 'https://www.waynesboroga.com/AgendaCenter',
    include: ['agendacenter/viewfile', 'agendacenter/previousversions'],
    exclude: ['javascript:', '#']
  },
  {
    id: 'burke-commission-agendas-minutes',
    name: 'Burke County Board of Commissioners agendas and minutes',
    geography: 'Burke County',
    sourceType: 'county_agendas_minutes',
    url: 'https://www.burkecounty-ga.gov/departments/board_of_commissioners/meetings_agendas_minutes.php',
    include: ['document center/agendas & minutes', '.pdf', '.doc', '.docx'],
    exclude: ['facebook.com', 'twitter.com', 'reddit.com']
  },
  {
    id: 'burke-check-registers',
    name: 'Burke County Check Registers',
    geography: 'Burke County',
    sourceType: 'county_spending',
    url: 'https://www.burkecounty-ga.gov/departments/administration/check_registers.php',
    include: ['check registers', 'ap run', '.pdf'],
    exclude: ['facebook.com', 'twitter.com', 'reddit.com']
  },
  {
    id: 'burke-budgets-financial-reports',
    name: 'Burke County Budgets and Financial Reports',
    geography: 'Burke County',
    sourceType: 'county_finance',
    url: 'https://www.burkecounty-ga.gov/departments/administration/budgets___financial_reports.php',
    include: ['budgets & financial reports', 'budget', 'financial report', 'splost', '.pdf', '.xlsx', '.docx'],
    exclude: ['facebook.com', 'twitter.com', 'reddit.com']
  }
];

function decodeEntities(text) {
  return String(text || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(html) {
  return decodeEntities(String(html || '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function extractLinks(html, baseUrl) {
  const links = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = re.exec(html))) {
    const attrs = match[1];
    const text = stripTags(match[2]);
    const hrefMatch = attrs.match(/href\s*=\s*(["'])(.*?)\1/i) || attrs.match(/href\s*=\s*([^\s>]+)/i);
    if (!hrefMatch) continue;
    const rawHref = decodeEntities(hrefMatch[2] || hrefMatch[1]);
    if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) continue;
    let url;
    try {
      url = new URL(rawHref, baseUrl).toString();
    } catch {
      continue;
    }
    links.push({ text, url });
  }
  return links;
}

function classifyDocument(link, source) {
  const text = String(link.text || '').toLowerCase();
  const decodedUrl = decodeURIComponent(link.url).toLowerCase();
  const blob = `${text} ${decodedUrl}`;
  if (source.sourceType === 'city_agendas_minutes') {
    if (decodedUrl.includes('/minutes/')) return 'minutes';
    if (decodedUrl.includes('/agenda/')) return 'agenda_or_packet';
    return 'city_document';
  }
  if (source.sourceType === 'county_spending' && (blob.includes('ap run') || blob.includes('check register'))) return 'check_register';
  if (source.sourceType === 'county_finance') {
    if (blob.includes('financial report') || blob.includes('financials') || blob.includes('audited') || blob.includes(' fs')) return 'financial_report';
    if (blob.includes('splost')) return 'splost_report';
    if (blob.includes('budget')) return 'budget';
  }
  if (source.sourceType === 'county_agendas_minutes') {
    if (text === 'minutes' || /\bminutes?\b/.test(text) || decodedUrl.includes('minutes archive')) return 'minutes';
    if (text === 'agenda' || /\bagenda\b/.test(text)) return 'agenda';
    if (decodedUrl.includes('.doc')) return 'minutes';
    if (decodedUrl.includes('.pdf')) return 'agenda';
  }
  if (blob.includes('check register') || blob.includes('ap run')) return 'check_register';
  if (blob.includes('financial report') || blob.includes('financials') || blob.includes('audited')) return 'financial_report';
  if (blob.includes('budget')) return 'budget';
  if (blob.includes('splost')) return 'splost_report';
  if (blob.includes('minutes')) return 'minutes';
  if (blob.includes('agenda')) return 'agenda';
  return 'document';
}

function inferYear(link) {
  const blob = `${link.text} ${decodeURIComponent(link.url)}`;
  const years = [...blob.matchAll(/\b(20\d{2})\b/g)].map((m) => Number(m[1]));
  if (!years.length) return null;
  return Math.max(...years.filter((y) => y >= 2010 && y <= 2035));
}

function passes(link, source) {
  const blob = `${link.text} ${decodeURIComponent(link.url)}`.toLowerCase();
  if (source.exclude.some((term) => blob.includes(term))) return false;
  if (link.url.startsWith('javascript:')) return false;
  return source.include.some((term) => blob.includes(term));
}

function displayTitle(link, source) {
  const generic = !link.text || ['agenda', 'minutes', 'pdf', 'packet'].includes(link.text.trim().toLowerCase());
  if (!generic) return link.text;
  try {
    const url = new URL(link.url);
    const file = decodeURIComponent(url.pathname.split('/').pop() || '').replace(/\.(pdf|docx?|xlsx?)$/i, '');
    if (file) return file.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  } catch {
    // fall through
  }
  return link.text || source.name;
}

async function fetchPage(source) {
  const response = await fetch(source.url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`${source.name} failed with HTTP ${response.status}`);
  const html = await response.text();
  const allLinks = extractLinks(html, source.url);
  const seen = new Set();
  const documents = allLinks
    .filter((link) => passes(link, source))
    .map((link) => {
      const urlHash = crypto.createHash('sha1').update(link.url).digest('hex').slice(0, 12);
      return {
        id: `${source.id}-${urlHash}`,
        title: displayTitle(link, source),
        documentType: classifyDocument(link, source),
        year: inferYear(link),
        url: link.url,
        sourceId: source.id,
        sourceName: source.name,
        geography: source.geography,
        confidence: 'verified_public_link'
      };
    })
    .filter((doc) => {
      if (seen.has(doc.url)) return false;
      seen.add(doc.url);
      return true;
    });

  return {
    ...source,
    fetchedStatus: response.status,
    documentCount: documents.length,
    documents
  };
}

async function main() {
  const fetchedAt = new Date().toISOString();
  const sourceResults = await Promise.all(sources.map(fetchPage));
  const documents = sourceResults.flatMap((source) => source.documents);
  const byType = documents.reduce((acc, doc) => {
    acc[doc.documentType] = (acc[doc.documentType] || 0) + 1;
    return acc;
  }, {});
  const bySource = sourceResults.map(({ id, name, url, geography, sourceType, fetchedStatus, documentCount }) => ({
    id, name, url, geography, sourceType, fetchedStatus, documentCount
  }));
  const recent = [...documents]
    .sort((a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title))
    .slice(0, 18);

  const snapshot = {
    provider: 'Official local government web pages',
    fetchedAt,
    status: 'active',
    method: 'low-volume public-link index; document metadata only; no private portals scraped',
    summary: {
      sourceCount: sourceResults.length,
      documentCount: documents.length,
      byType
    },
    sources: bySource,
    recentDocuments: recent,
    documents
  };

  const outPath = path.join(ROOT, 'src/data/officialDocumentsSnapshot.js');
  const content = `// Generated by scripts/fetch-official-documents.js.\n// Public document-link metadata only. Keep claims source-labeled and verify PDFs/docs before quoting contents.\n\nexport const officialDocumentsSnapshot = ${JSON.stringify(snapshot, null, 2)};\n`;
  fs.writeFileSync(outPath, content);

  console.log(`Official document snapshot written: ${outPath}`);
  console.log(`Sources indexed: ${snapshot.summary.sourceCount}`);
  console.log(`Documents indexed: ${snapshot.summary.documentCount}`);
  for (const [type, count] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
    console.log(`${type}: ${count}`);
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
