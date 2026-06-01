import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ENV_PATHS = ['.env.local', '.env'];
const ENDPOINT = 'https://data.cdc.gov/resource/cwsq-ngmh.json';

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

let socrataCredentialStatus = 'not_checked';

function basicAuthHeader(keyId, secret) {
  return `Basic ${Buffer.from(`${keyId}:${secret}`).toString('base64')}`;
}

async function socrataGet(params) {
  const url = new URL(ENDPOINT);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const baseHeaders = { Accept: 'application/json' };
  const keyId = process.env.SOCRATA_API_KEY_ID || process.env.SOCRATA_APP_TOKEN;
  const secret = process.env.SOCRATA_API_SECRET;

  if (keyId && secret) {
    const response = await fetch(url, {
      headers: { ...baseHeaders, Authorization: basicAuthHeader(keyId, secret) }
    });
    if (response.ok) {
      socrataCredentialStatus = 'local_api_key_basic_auth_configured';
      return response.json();
    }
  }

  let response = await fetch(url, {
    headers: process.env.SOCRATA_APP_TOKEN ? { ...baseHeaders, 'X-App-Token': process.env.SOCRATA_APP_TOKEN } : baseHeaders
  });
  if ((response.status === 401 || response.status === 403) && process.env.SOCRATA_APP_TOKEN) {
    socrataCredentialStatus = keyId && secret
      ? 'local_basic_auth_rejected_and_app_token_rejected_fell_back_to_public_low_volume'
      : 'local_token_rejected_fell_back_to_public_low_volume';
    response = await fetch(url, { headers: baseHeaders });
  } else if (process.env.SOCRATA_APP_TOKEN) {
    socrataCredentialStatus = 'local_app_token_configured';
  } else {
    socrataCredentialStatus = 'no_token_used';
  }
  if (!response.ok) throw new Error(`Socrata request failed: ${response.status} ${url.toString()}`);
  return response.json();
}

function displayPercent(row) {
  const value = row.data_value ?? row.datavalue ?? row.value;
  return value ? `${Number(value).toFixed(1)}%` : 'No value';
}

function confidence(row) {
  const low = row.low_confidence_limit ?? row.low_confidence_limit_95 ?? row.low_confidence_limit_value;
  const high = row.high_confidence_limit ?? row.high_confidence_limit_95 ?? row.high_confidence_limit_value;
  if (low && high) return `${Number(low).toFixed(1)}–${Number(high).toFixed(1)}`;
  return 'CI not returned in selected fields';
}

async function main() {
  loadEnv();
  const hasToken = Boolean(process.env.SOCRATA_APP_TOKEN);
  const hasSecret = Boolean(process.env.SOCRATA_API_SECRET);
  const fetchedAt = new Date().toISOString();

  const countRows = await socrataGet({
    '$select': 'count(*)',
    stateabbr: 'GA',
    countyname: 'Burke'
  });
  const sampleRows = await socrataGet({
    '$limit': '6',
    '$order': 'year DESC, locationname ASC, measure ASC',
    stateabbr: 'GA',
    countyname: 'Burke'
  });

  const normalizedSamples = sampleRows.slice(0, 4).map((row) => ({
    year: row.year || 'n/a',
    county: row.countyname || 'Burke',
    tract: row.locationname || row.locationid || 'tract not returned',
    category: row.category || 'Uncategorized',
    measure: row.measure || 'Measure not returned',
    value: displayPercent(row),
    populationContext: row.totalpopulation ? `Total population ${Number(row.totalpopulation).toLocaleString('en-US')}` : 'Census tract modeled estimate',
    confidenceInterval: confidence(row),
    note: 'Pulled from public CDC PLACES Socrata API with county filter; display as data-shape/context only until tract geography and methodology are visible.'
  }));

  const snapshot = {
    sourceName: 'CDC PLACES: Local Data for Better Health, Census Tract Data, 2025 release',
    sourceUrl: ENDPOINT,
    metadataUrl: 'https://data.cdc.gov/api/views/cwsq-ngmh',
    referenceUrl: 'https://www.cdc.gov/places/measure-definitions/index.html',
    geography: 'Burke County census tracts including Waynesboro-area tracts; not a citywide Waynesboro aggregate',
    retrievedAt: fetchedAt,
    accessMethod: socrataCredentialStatus === 'local_api_key_basic_auth_configured' ? 'Server-side Socrata connector using HTTP Basic Auth with the local API key ID/secret pair from .env.local; credentials are not written to this public snapshot.' : socrataCredentialStatus === 'local_app_token_configured' ? 'Server-side Socrata API connector using SOCRATA_APP_TOKEN as X-App-Token from .env.local; token/secret are not written to this public snapshot.' : socrataCredentialStatus.includes('fell_back_to_public_low_volume') ? 'Local Socrata credentials are present but rejected by this endpoint during refresh; this snapshot fell back to public low-volume Socrata reads without writing credentials.' : 'Public Socrata JSON API without app token; low-volume only.',
    credentialStatus: {
      authStatus: socrataCredentialStatus,
      apiKeyIdStatus: hasToken ? 'local_key_id_configured' : 'missing',
      apiSecretStatus: hasSecret ? 'local_secret_configured' : 'missing'
    },
    observedShape: {
      datasetName: 'PLACES: Local Data for Better Health, Census Tract Data, 2025 release',
      rowsForBurkeCountyObserved: Number(countRows?.[0]?.count || 0),
      sampleQuery: `${ENDPOINT}?$limit=5&stateabbr=GA&countyname=Burke`,
      countQuery: `${ENDPOINT}?$select=count(*)&stateabbr=GA&countyname=Burke`
    },
    sampleRows: normalizedSamples,
    integrationUses: [
      'Quality-of-life and resilience context for Council briefs',
      'Census-tract drilldowns when paired with official boundary geometry',
      'Grant-writing and public-health partnership evidence after methodology review'
    ],
    caveat: 'CDC PLACES values are model-based public-health estimates. Do not present them as municipal operations telemetry, clinical records, or citywide Waynesboro claims until geography, tract coverage, year, confidence intervals, and methodology are visible.'
  };

  const outPath = path.join(ROOT, 'src/data/healthEquitySeed.js');
  const content = `// Generated by scripts/fetch-cdc-places.js.\n// Contains public normalized CDC PLACES rows only; never write Socrata credentials here.\n\nexport const healthEquitySeed = ${JSON.stringify(snapshot, null, 2)};\n`;
  fs.writeFileSync(outPath, content);
  console.log(`CDC PLACES snapshot written: ${outPath}`);
  console.log(`Credential status: auth=${snapshot.credentialStatus.authStatus}, apiKeyId=${snapshot.credentialStatus.apiKeyIdStatus}, apiSecret=${snapshot.credentialStatus.apiSecretStatus}`);
  console.log(`Rows observed for Burke County: ${snapshot.observedShape.rowsForBurkeCountyObserved}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
