import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_PATHS = ['.env.local', '.env'];

function loadEnv() {
  for (const envPath of ENV_PATHS) {
    const fullPath = path.join(ROOT, envPath);
    if (!fs.existsSync(fullPath)) continue;
    const text = fs.readFileSync(fullPath, 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^["']|["']$/g, '');
    }
  }
}

const number = new Intl.NumberFormat('en-US');
const series = [
  { id: 'LAUCN130330000000003', label: 'Unemployment rate', unit: 'percent', format: (v) => `${Number(v).toFixed(1)}%` },
  { id: 'LAUCN130330000000006', label: 'Civilian labor force', unit: 'persons', format: (v) => number.format(Number(v)) },
  { id: 'LAUCN130330000000005', label: 'Employed persons', unit: 'persons', format: (v) => number.format(Number(v)) },
  { id: 'LAUCN130330000000004', label: 'Unemployed persons', unit: 'persons', format: (v) => number.format(Number(v)) }
];

function latestDataPoint(rows = []) {
  return rows.find((row) => row.value !== undefined && row.value !== null && row.value !== '-' && row.periodName && !/^Annual/i.test(row.periodName));
}

function footnoteText(point) {
  return (point?.footnotes || [])
    .map((item) => item?.text)
    .filter(Boolean)
    .join(' ');
}

async function main() {
  loadEnv();
  const apiKey = process.env.BLS_API_KEY || '';
  const currentYear = new Date().getUTCFullYear();
  const body = {
    seriesid: series.map((item) => item.id),
    startyear: String(Math.max(2024, currentYear - 1)),
    endyear: String(currentYear)
  };
  if (apiKey) body.registrationkey = apiKey;

  let credentialStatus = apiKey ? 'local_key_configured' : 'no_key_used';
  let response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) throw new Error(`BLS LAUS request failed: ${response.status}`);
  let payload = await response.json();
  if (payload.status !== 'REQUEST_SUCCEEDED' && apiKey) {
    credentialStatus = 'local_key_rejected_fell_back_to_public_low_volume';
    const fallbackBody = { ...body };
    delete fallbackBody.registrationkey;
    response = await fetch('https://api.bls.gov/publicAPI/v2/timeseries/data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackBody)
    });
    if (!response.ok) throw new Error(`BLS LAUS fallback request failed: ${response.status}`);
    payload = await response.json();
  }
  if (payload.status !== 'REQUEST_SUCCEEDED') {
    throw new Error(`BLS LAUS request not successful: ${payload.status} ${JSON.stringify(payload.message || [])}`);
  }

  const resultById = Object.fromEntries((payload.Results?.series || []).map((item) => [item.seriesID, item]));
  const normalized = series.map((meta) => {
    const point = latestDataPoint(resultById[meta.id]?.data || []);
    return {
      id: meta.id,
      label: meta.label,
      value: point ? Number(point.value) : null,
      displayValue: point ? meta.format(point.value) : 'No current value',
      unit: meta.unit,
      latestPeriod: point ? `${point.periodName} ${point.year}` : 'Unavailable',
      year: point?.year || null,
      period: point?.period || null,
      footnote: footnoteText(point) || null
    };
  });

  const latestPeriod = normalized.find((item) => item.year)?.latestPeriod || 'Unavailable';
  const revisionNote = normalized.map((item) => item.footnote).filter(Boolean)[0] || 'No BLS footnote returned for the latest selected rows.';
  const fetchedAt = new Date().toISOString();
  const snapshot = {
    sourceName: 'U.S. Bureau of Labor Statistics LAUS Public API',
    sourceUrl: 'https://api.bls.gov/publicAPI/v2/timeseries/data/',
    accessMethod: credentialStatus === 'local_key_configured' ? 'Server-side BLS API connector using BLS_API_KEY from .env.local; key is not written to this public snapshot.' : credentialStatus === 'local_key_rejected_fell_back_to_public_low_volume' ? 'BLS_API_KEY is present locally but BLS rejected it during refresh; this snapshot fell back to public low-volume API mode without writing the key.' : 'Public BLS API connector without registration key; low-volume only.',
    credentialStatus,
    geography: 'Burke County, Georgia (LAUS county area CN13033), not a Waynesboro city labor-force series.',
    retrievedAt: fetchedAt,
    latestPeriod,
    revisionNote,
    caveat: 'Use this as county workforce context for economic-development briefs. Do not present it as a City of Waynesboro unemployment rate, employer roster, or live payroll data.',
    series: normalized,
    queryTemplates: series.slice(0, 2).map((item) => ({
      label: `${item.label} series`,
      url: `https://api.bls.gov/publicAPI/v2/timeseries/data/${item.id}?startyear=${body.startyear}&endyear=${body.endyear}`
    }))
  };

  const outPath = path.join(ROOT, 'src/data/laborForceSeed.js');
  const content = `// Generated by scripts/fetch-bls-laus.js.\n// Contains public normalized BLS observations only; never write BLS_API_KEY here.\n\nexport const laborForceSeed = ${JSON.stringify(snapshot, null, 2)};\n`;
  fs.writeFileSync(outPath, content);
  console.log(`BLS LAUS snapshot written: ${outPath}`);
  console.log(`Credential status: ${snapshot.credentialStatus}`);
  for (const item of normalized) console.log(`${item.label}: ${item.displayValue} (${item.latestPeriod})`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
