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
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
    }
  }
}

function pickLatestFacet(entityBlock, facets = {}) {
  const ordered = entityBlock?.orderedFacets || [];
  const withObs = ordered
    .map((facet) => ({
      ...facet,
      observation: facet.observations?.at(-1),
      source: facets[facet.facetId] || {}
    }))
    .filter((facet) => facet.observation && facet.observation.value !== undefined)
    .sort((a, b) => String(b.observation.date).localeCompare(String(a.observation.date)));
  return withObs[0] || null;
}

function normalizeMetric({ variable, entity, response, facets }) {
  const entityBlock = response.byVariable?.[variable.dcid]?.byEntity?.[entity.dcid];
  const facet = pickLatestFacet(entityBlock, facets);
  if (!facet) {
    return {
      id: `${entity.id}-${variable.id}`,
      entity: entity.label,
      entityDcid: entity.dcid,
      variable: variable.label,
      variableDcid: variable.dcid,
      value: null,
      displayValue: 'No current value',
      date: null,
      status: 'not_available',
      sourceName: 'Data Commons',
      provenanceUrl: 'https://datacommons.org/',
      note: 'Data Commons returned no current observation for this entity/variable pair.'
    };
  }

  const value = facet.observation.value;
  const formatted = variable.format(value);
  return {
    id: `${entity.id}-${variable.id}`,
    entity: entity.label,
    entityDcid: entity.dcid,
    variable: variable.label,
    variableDcid: variable.dcid,
    value,
    displayValue: formatted,
    date: facet.observation.date,
    status: 'verified_connector',
    sourceName: facet.source.importName || 'Data Commons',
    provenanceUrl: facet.source.provenanceUrl || 'https://datacommons.org/',
    facetId: facet.facetId,
    measurementMethod: facet.source.measurementMethod || null,
    observationPeriod: facet.source.observationPeriod || null
  };
}

const number = new Intl.NumberFormat('en-US');
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });

const entities = [
  { id: 'waynesboro', label: 'Waynesboro city, GA', dcid: 'geoId/1380984' },
  { id: 'burke-county', label: 'Burke County, GA', dcid: 'geoId/13033' },
  { id: 'georgia', label: 'Georgia', dcid: 'geoId/13' }
];

const variables = [
  { id: 'population', label: 'Population', dcid: 'Count_Person', format: (v) => number.format(v) },
  { id: 'median-income', label: 'Median household income', dcid: 'Median_Income_Household', format: (v) => currency.format(v) },
  { id: 'housing-units', label: 'Housing units', dcid: 'Count_HousingUnit', format: (v) => number.format(v) },
  { id: 'poverty-count', label: 'People below poverty level', dcid: 'Count_Person_BelowPovertyLevelInThePast12Months', format: (v) => number.format(v) },
  { id: 'median-age', label: 'Median age', dcid: 'Median_Age_Person', format: (v) => `${v} yrs` },
  { id: 'unemployment', label: 'Unemployment rate', dcid: 'UnemploymentRate_Person', format: (v) => `${v}%` }
];

async function main() {
  loadEnv();
  const apiKey = process.env.DATA_COMMONS_API_KEY;
  if (!apiKey) {
    throw new Error('DATA_COMMONS_API_KEY is missing. Add it to .env.local before running this connector.');
  }

  const resolvedAt = new Date().toISOString();
  const resolveBody = {
    nodes: ['Waynesboro, Georgia', '33.0899#-82.0157'],
    property: '<-description{typeOf:City}->dcid'
  };

  const obsBody = {
    date: 'LATEST',
    variable: { dcids: variables.map((item) => item.dcid) },
    entity: { dcids: entities.map((item) => item.dcid) },
    select: ['entity', 'variable', 'value', 'date', 'facet']
  };

  const [resolveResponse, observationResponse] = await Promise.all([
    fetch('https://api.datacommons.org/v2/resolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(resolveBody)
    }),
    fetch('https://api.datacommons.org/v2/observation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify(obsBody)
    })
  ]);

  if (!resolveResponse.ok) throw new Error(`Data Commons resolve failed: ${resolveResponse.status}`);
  if (!observationResponse.ok) throw new Error(`Data Commons observation failed: ${observationResponse.status}`);

  const resolved = await resolveResponse.json();
  const observations = await observationResponse.json();
  const facets = observations.facets || {};

  const metrics = entities.flatMap((entity) =>
    variables.map((variable) => normalizeMetric({ variable, entity, response: observations, facets }))
  );

  const waynesboroMetrics = Object.fromEntries(
    metrics
      .filter((metric) => metric.entityDcid === 'geoId/1380984')
      .map((metric) => [metric.variableDcid, metric])
  );

  const snapshot = {
    provider: 'Data Commons',
    fetchedAt: resolvedAt,
    status: 'active',
    apiVersion: 'v2',
    placeResolution: {
      query: 'Waynesboro, Georgia',
      expectedDcid: 'geoId/1380984',
      candidates: resolved.entities || []
    },
    entities,
    variables: variables.map(({ format, ...variable }) => variable),
    metrics,
    executiveHighlights: [
      waynesboroMetrics.Count_Person,
      waynesboroMetrics.Median_Income_Household,
      waynesboroMetrics.Count_HousingUnit,
      waynesboroMetrics.Count_Person_BelowPovertyLevelInThePast12Months,
      waynesboroMetrics.Median_Age_Person
    ].filter(Boolean)
  };

  const outPath = path.join(ROOT, 'src/data/dataCommonsSnapshot.js');
  const content = `// Generated by scripts/fetch-data-commons.js.\n// Do not include API keys here; this file contains only public normalized observations.\n\nexport const dataCommonsSnapshot = ${JSON.stringify(snapshot, null, 2)};\n`;
  fs.writeFileSync(outPath, content);

  console.log(`Data Commons snapshot written: ${outPath}`);
  console.log(`Metrics normalized: ${metrics.length}`);
  console.log(`Waynesboro DCID: geoId/1380984`);
  for (const metric of snapshot.executiveHighlights) {
    console.log(`${metric.variable}: ${metric.displayValue} (${metric.date}) via ${metric.sourceName}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
