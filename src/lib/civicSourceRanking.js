const OFFICIAL_DOMAIN_PATTERNS = [
  /(^|\.)gov$/,
  /(^|\.)ga\.gov$/,
  /(^|\.)burkecounty-ga\.gov$/,
  /(^|\.)cityofwaynesboro\.org$/,
  /(^|\.)waynesboroga\.com$/,
  /(^|\.)sos\.ga\.gov$/,
  /(^|\.)dor\.georgia\.gov$/,
  /(^|\.)georgia\.gov$/,
  /(^|\.)epa\.gov$/,
  /(^|\.)census\.gov$/,
  /(^|\.)bls\.gov$/
];

const OFFICIAL_LOCAL_DOMAINS = new Set([
  'cityofwaynesboro.org',
  'www.cityofwaynesboro.org',
  'waynesboroga.com',
  'www.waynesboroga.com',
  'burkecounty-ga.gov',
  'www.burkecounty-ga.gov'
]);

const PUBLIC_RECORD_KEYWORDS = [
  'agenda',
  'minutes',
  'packet',
  'ordinance',
  'resolution',
  'budget',
  'audit',
  'bid',
  'rfp',
  'procurement',
  'contract',
  'permit',
  'zoning',
  'planning',
  'council',
  'commission',
  'meeting',
  'financial statement',
  'comprehensive annual financial report',
  'acfr'
];

const LOW_VALUE_DOMAINS = [
  'facebook.com',
  'www.facebook.com',
  'x.com',
  'twitter.com',
  'instagram.com',
  'nextdoor.com',
  'yelp.com'
];

function hostname(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, 'www.');
  } catch {
    return '';
  }
}

function tokenize(text) {
  return String(text || '').toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
}

function termMatchScore(query, title, snippet) {
  const terms = tokenize(query);
  if (!terms.length) return 0;
  const haystackTitle = String(title || '').toLowerCase();
  const haystackSnippet = String(snippet || '').toLowerCase();
  let hits = 0;
  for (const term of terms) {
    if (haystackTitle.includes(term)) hits += 1.5;
    else if (haystackSnippet.includes(term)) hits += 0.75;
  }
  return hits / terms.length;
}

function hasPublicRecordKeyword(source) {
  const text = `${source.title || ''} ${source.snippet || ''} ${source.url || ''}`.toLowerCase();
  return PUBLIC_RECORD_KEYWORDS.some((keyword) => text.includes(keyword));
}

function isOfficialDomain(host) {
  if (!host) return false;
  return OFFICIAL_DOMAIN_PATTERNS.some((pattern) => pattern.test(host));
}

function hasUsefulMetadata(source) {
  return Boolean(source?.date && source?.geography);
}

export function classifyCivicSource(url) {
  const host = hostname(url);
  const reasons = [];
  let sourceType = 'unclassified';

  if (OFFICIAL_LOCAL_DOMAINS.has(host)) {
    sourceType = 'official-local';
    reasons.push('official-domain');
  } else if (host === 'ga.gov' || host.endsWith('.ga.gov') || host === 'georgia.gov' || host === 'sos.ga.gov') {
    sourceType = 'official-state';
    reasons.push('official-domain');
  } else if (host.endsWith('.gov')) {
    sourceType = 'official-federal';
    reasons.push('official-domain');
  } else if (isOfficialDomain(host)) {
    sourceType = 'official';
    reasons.push('official-domain');
  } else if (LOW_VALUE_DOMAINS.includes(host.replace(/^www\./, ''))) {
    sourceType = 'social-or-low-value';
    reasons.push('low-value-domain');
  }

  return { host, sourceType, reasons };
}

export function rankCivicSources(query, sources = []) {
  const seenContent = new Set();

  return sources
    .map((source, index) => {
      const classified = classifyCivicSource(source.url);
      const reasons = [...classified.reasons];
      let score = termMatchScore(query, source.title, source.snippet);
      const contentFingerprint = `${String(source.title || '').trim().toLowerCase()}::${String(source.snippet || '').trim().toLowerCase()}`;
      const isDuplicate = contentFingerprint !== '::' && seenContent.has(contentFingerprint);
      if (contentFingerprint !== '::') seenContent.add(contentFingerprint);

      if (classified.sourceType === 'official-local') score += 4;
      else if (classified.sourceType === 'official-state') score += 3.5;
      else if (classified.sourceType === 'official-federal') score += 3;
      else if (classified.sourceType === 'official') score += 2.5;

      if (hasPublicRecordKeyword(source)) {
        score += 1.75;
        reasons.push('public-record-keyword');
      }

      if (hasUsefulMetadata(source)) {
        score += 0.75;
        reasons.push('claim-metadata-present');
      } else {
        score -= 1;
        reasons.push('claim-metadata-missing');
      }

      if (classified.sourceType === 'social-or-low-value') score -= 2.5;

      if (isDuplicate) {
        score -= 1.25;
        reasons.push('duplicate-content-penalty');
      }

      return {
        ...source,
        sourceType: classified.sourceType,
        score: Number(score.toFixed(3)),
        reasons,
        originalIndex: index
      };
    })
    .sort((a, b) => b.score - a.score || a.originalIndex - b.originalIndex);
}

export function canPromoteClaim(claim) {
  return Boolean(claim?.sourceUrl && claim?.date && claim?.geography);
}
