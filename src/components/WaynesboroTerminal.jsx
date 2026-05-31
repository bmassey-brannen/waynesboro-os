import React, { useMemo, useState } from 'react';
import {
  beautificationFactors,
  councilBrief,
  downtownProperties,
  economicPipeline,
  housing,
  infrastructure,
  integrationRoadmap,
  kpis,
  mapLayers,
  projects,
  safety
} from '../data/cityData.js';
import { osmWaynesboroSeed, readinessStrip, sourcePriorities, sourceRegistry } from '../data/sourceRegistry.js';
import { dataCommonsSnapshot } from '../data/dataCommonsSnapshot.js';
import { officialDocumentsSnapshot } from '../data/officialDocumentsSnapshot.js';
import { waynesboroGeographySeed } from '../data/geographySeed.js';
import { regionalDevelopmentSeed } from '../data/regionalDevelopmentSeed.js';
import { operationsSourceSeed } from '../data/operationsSourceSeed.js';
import { osmCivicAssetsSeed } from '../data/osmCivicAssetsSeed.js';
import { weatherReadinessSeed } from '../data/weatherReadinessSeed.js';
import { weatherAlertsSnapshot } from '../data/weatherAlertsSnapshot.js';
import './WaynesboroTerminal.css';

const statusTone = {
  Active: 'good',
  Planning: 'neutral',
  Procurement: 'watch',
  Blocked: 'bad',
  'Site visit': 'good',
  'Incentive review': 'watch',
  'Property control': 'neutral',
  'Utility due diligence': 'watch',
  Financing: 'neutral'
};

function Sparkline({ points, inverse = false }) {
  const width = 112;
  const height = 30;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const d = points
    .map((p, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const positive = points[points.length - 1] >= points[0];
  const good = inverse ? !positive : positive;
  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} aria-label="trend sparkline">
      <path d={d} className={good ? 'spark-good' : 'spark-bad'} />
    </svg>
  );
}

function KpiCard({ item }) {
  const danger = item.mom?.startsWith('-') && !item.inverse;
  const synthetic = item.sourceStatus === 'synthetic';
  const unavailable = item.sourceStatus === 'unavailable';
  return (
    <article className={`kpi-card ${synthetic ? 'synthetic' : ''} ${unavailable ? 'unavailable' : ''}`}>
      <div className="kpi-topline">
        <span>{item.label}</span>
        <span className={danger ? 'delta bad' : 'delta good'}>{item.mom === 'n/a' ? item.deltaLabel || 'verified' : `${item.mom} MoM`}</span>
      </div>
      <div className="kpi-value">{item.value}</div>
      <div className="kpi-bottom">
        <span>YoY {item.yoy}</span>
        <Sparkline points={item.trend} inverse={item.inverse} />
      </div>
      {item.source && (
        <div className="kpi-source">
          <b>{item.sourceBadge}</b>
          <span>{item.source}</span>
        </div>
      )}
    </article>
  );
}

function DataTable({ title, eyebrow, rows, columns }) {
  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <span className="terminal-badge">LIVE MOCK</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{columns.map((col) => <th key={col.key}>{col.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`}>
                {columns.map((col) => (
                  <td key={col.key} className={col.numeric ? 'num' : ''}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ScoreBar({ score }) {
  return (
    <div className="score-bar" aria-label={`score ${score}`}>
      <span style={{ width: `${score}%` }} />
      <b>{score}</b>
    </div>
  );
}

const metricById = Object.fromEntries(dataCommonsSnapshot.metrics.map((metric) => [metric.id, metric]));
const formatPercent = (value, digits = 1) => `${(value * 100).toFixed(digits)}%`;
const formatDelta = (value) => `${value > 0 ? '+' : ''}${(value * 100).toFixed(1)}%`;
const compactMoney = (value) => value == null ? 'N/A' : `$${Math.round(value / 1000).toLocaleString()}K`;

function verifiedKpi(metricId, fallback, overrides = {}) {
  const metric = metricById[metricId];
  if (!metric || metric.status !== 'verified_connector') return fallback;
  return {
    ...fallback,
    value: overrides.value || metric.displayValue,
    mom: overrides.mom || 'n/a',
    yoy: overrides.yoy || metric.date,
    source: `${metric.sourceName} · ${metric.date || 'no date'} · ${metric.entity}`,
    sourceBadge: 'Verified connector',
    sourceStatus: 'verified',
    metric
  };
}

function buildExecutiveKpis() {
  const population = metricById['waynesboro-population'];
  const poverty = metricById['waynesboro-poverty-count'];
  const countyUnemployment = metricById['burke-county-unemployment'];
  const cityPovertyRate = population?.value && poverty?.value ? poverty.value / population.value : null;
  const peoplePerHousingUnit = population?.value && metricById['waynesboro-housing-units']?.value
    ? population.value / metricById['waynesboro-housing-units'].value
    : null;

  const syntheticKpis = kpis.slice(4).map((item) => ({
    ...item,
    source: 'Synthetic operating placeholder · source pending',
    sourceBadge: 'Synthetic',
    sourceStatus: 'synthetic'
  }));

  return [
    verifiedKpi('waynesboro-population', kpis[0], { mom: 'n/a', yoy: population?.date || 'n/a' }),
    {
      ...verifiedKpi('waynesboro-median-income', kpis[2], { value: compactMoney(metricById['waynesboro-median-income']?.value), mom: 'n/a', yoy: metricById['waynesboro-median-income']?.date || 'n/a' }),
      label: 'Median Income'
    },
    {
      label: 'Poverty Rate',
      value: cityPovertyRate == null ? 'N/A' : formatPercent(cityPovertyRate, 1),
      mom: 'n/a',
      yoy: poverty?.date || 'n/a',
      trend: [29, 28, 27, 28, 26, 26, 25, cityPovertyRate == null ? 26 : cityPovertyRate * 100],
      inverse: true,
      source: poverty ? `${poverty.sourceName} · derived from poverty count / population · ${poverty.date}` : 'Data Commons unavailable',
      sourceBadge: poverty ? 'Derived verified' : 'Unavailable',
      sourceStatus: poverty ? 'verified' : 'unavailable'
    },
    verifiedKpi('waynesboro-median-age', { label: 'Median Age', value: 'N/A', mom: 'n/a', yoy: 'n/a', trend: [29, 29, 29, 29, 29, 29, 29, 29] }),
    {
      label: 'Housing Units',
      value: metricById['waynesboro-housing-units']?.displayValue || 'N/A',
      mom: 'n/a',
      yoy: metricById['waynesboro-housing-units']?.date || 'n/a',
      trend: [2500, 2540, 2580, 2600, 2620, 2640, 2660, metricById['waynesboro-housing-units']?.value || 2673],
      source: metricById['waynesboro-housing-units'] ? `${metricById['waynesboro-housing-units'].sourceName} · ${metricById['waynesboro-housing-units'].date}` : 'Data Commons unavailable',
      sourceBadge: 'Verified connector',
      sourceStatus: metricById['waynesboro-housing-units'] ? 'verified' : 'unavailable'
    },
    {
      label: 'County Unemployment',
      value: countyUnemployment?.displayValue || 'N/A',
      mom: 'n/a',
      yoy: countyUnemployment?.date || 'n/a',
      trend: [5.2, 4.9, 4.7, 4.5, 4.6, 4.4, 4.3, countyUnemployment?.value || 4.3],
      inverse: true,
      source: countyUnemployment ? `${countyUnemployment.sourceName} · Burke County context · ${countyUnemployment.date}` : 'City unemployment unavailable in Data Commons',
      sourceBadge: countyUnemployment ? 'County context' : 'Unavailable',
      sourceStatus: countyUnemployment ? 'verified' : 'unavailable'
    },
    {
      label: 'People / Housing Unit',
      value: peoplePerHousingUnit == null ? 'N/A' : peoplePerHousingUnit.toFixed(2),
      mom: 'n/a',
      yoy: metricById['waynesboro-housing-units']?.date || 'n/a',
      trend: [2.26, 2.22, 2.18, 2.14, 2.11, 2.09, 2.08, peoplePerHousingUnit || 2.08],
      inverse: true,
      source: 'Derived from Data Commons population and housing units',
      sourceBadge: 'Derived verified',
      sourceStatus: 'verified'
    },
    ...syntheticKpis.slice(0, 5)
  ];
}

function BaselineComparisonPanel() {
  const cityPop = metricById['waynesboro-population'];
  const countyPop = metricById['burke-county-population'];
  const cityIncome = metricById['waynesboro-median-income'];
  const countyIncome = metricById['burke-county-median-income'];
  const stateIncome = metricById['georgia-median-income'];
  const cityPoverty = metricById['waynesboro-poverty-count'];
  const countyPoverty = metricById['burke-county-poverty-count'];
  const cityShareCounty = cityPop?.value && countyPop?.value ? cityPop.value / countyPop.value : null;
  const incomeVsCounty = cityIncome?.value && countyIncome?.value ? cityIncome.value / countyIncome.value - 1 : null;
  const incomeVsState = cityIncome?.value && stateIncome?.value ? cityIncome.value / stateIncome.value - 1 : null;
  const cityPovertyRate = cityPoverty?.value && cityPop?.value ? cityPoverty.value / cityPop.value : null;
  const countyPovertyRate = countyPoverty?.value && countyPop?.value ? countyPoverty.value / countyPop.value : null;

  const comparisons = [
    { label: 'City share of Burke County', value: cityShareCounty == null ? 'N/A' : formatPercent(cityShareCounty, 1), note: 'population weight inside county strategy' },
    { label: 'Income vs Burke County', value: incomeVsCounty == null ? 'N/A' : formatDelta(incomeVsCounty), note: `${cityIncome?.displayValue || 'N/A'} city vs ${countyIncome?.displayValue || 'N/A'} county` },
    { label: 'Income vs Georgia', value: incomeVsState == null ? 'N/A' : formatDelta(incomeVsState), note: `${cityIncome?.displayValue || 'N/A'} city vs ${stateIncome?.displayValue || 'N/A'} state` },
    { label: 'City poverty burden', value: cityPovertyRate == null ? 'N/A' : formatPercent(cityPovertyRate, 1), note: `${cityPoverty?.displayValue || 'N/A'} people below poverty level` },
    { label: 'County poverty context', value: countyPovertyRate == null ? 'N/A' : formatPercent(countyPovertyRate, 1), note: 'Burke County comparison baseline' }
  ];

  return (
    <section className="baseline-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">REAL BASELINE COMPARISON</span>
          <h2>Waynesboro vs Burke County vs Georgia</h2>
        </div>
        <span className="terminal-badge live">DATA COMMONS</span>
      </div>
      <div className="comparison-grid">
        {comparisons.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <b className={item.value.startsWith('-') ? 'bad' : ''}>{item.value}</b>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
      <p className="baseline-brief"><b>Mayor brief:</b> Waynesboro is roughly {cityShareCounty == null ? 'n/a' : formatPercent(cityShareCounty, 1)} of Burke County’s population, but its income baseline trails both county and state levels. Treat economic mobility, housing quality, and downtown reinvestment as linked priorities until parcel, permit, and budget evidence narrows the map.</p>
    </section>
  );
}

function ExecutiveDashboard() {
  const executiveKpis = buildExecutiveKpis();
  return (
    <section id="executive" className="module executive-grid">
      <div className="module-title">
        <span className="eyebrow">EXECUTIVE DASHBOARD</span>
        <h1>First-meeting city intelligence board</h1>
        <p>If you became Mayor tomorrow morning, these are the gauges you would check before sitting down with staff.</p>
      </div>
      <SourceStatusStrip />
      <div className="kpi-grid">{executiveKpis.map((item) => <KpiCard key={item.label} item={item} />)}</div>
      <BaselineComparisonPanel />
    </section>
  );
}

function SourceStatusStrip() {
  return (
    <section className="source-status-strip" aria-label="dashboard source readiness by data lane">
      {readinessStrip.map((item) => (
        <article key={item.lane} className={`source-chip ${item.tone}`}>
          <b>{item.lane}</b>
          <span>{item.status}</span>
          <small>{item.source}</small>
        </article>
      ))}
    </section>
  );
}

function DataCommonsLivePanel() {
  const highlights = dataCommonsSnapshot.executiveHighlights || [];
  const countyUnemployment = dataCommonsSnapshot.metrics.find(
    (metric) => metric.entityDcid === 'geoId/13033' && metric.variableDcid === 'UnemploymentRate_Person'
  );

  return (
    <section className="panel data-commons-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">LIVE PUBLIC CONNECTOR</span>
          <h2>Data Commons baseline snapshot</h2>
        </div>
        <span className="terminal-badge live">CONNECTED</span>
      </div>
      <div className="dc-meta-grid">
        <div><span>Provider</span><b>{dataCommonsSnapshot.provider}</b></div>
        <div><span>Waynesboro DCID</span><b>geoId/1380984</b></div>
        <div><span>Fetched</span><b>{new Date(dataCommonsSnapshot.fetchedAt).toLocaleString()}</b></div>
      </div>
      <div className="dc-metric-grid">
        {highlights.map((metric) => (
          <article key={metric.id} className="dc-metric-card">
            <span>{metric.variable}</span>
            <b>{metric.displayValue}</b>
            <small>{metric.date || 'No date'} · {metric.sourceName}</small>
          </article>
        ))}
        {countyUnemployment && (
          <article className="dc-metric-card county-context">
            <span>County unemployment context</span>
            <b>{countyUnemployment.displayValue}</b>
            <small>{countyUnemployment.date} · Burke County · {countyUnemployment.sourceName}</small>
          </article>
        )}
      </div>
      <p className="source-note">This panel is generated from a server-side Data Commons API fetch. It stores only public observations and provenance metadata in the app; keys remain in `.env.local` and are not exposed to the browser.</p>
    </section>
  );
}

function OfficialDocumentsPanel() {
  const summary = officialDocumentsSnapshot.summary;
  const typeLabels = Object.entries(summary.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <section className="panel official-docs-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">OFFICIAL DOCUMENT INDEX</span>
          <h2>City + county evidence trail</h2>
        </div>
        <span className="terminal-badge live">{summary.documentCount} LINKS</span>
      </div>
      <div className="doc-source-grid">
        {officialDocumentsSnapshot.sources.map((source) => (
          <article key={source.id}>
            <b>{source.documentCount}</b>
            <span>{source.name}</span>
          </article>
        ))}
      </div>
      <div className="doc-type-strip">
        {typeLabels.map(([type, count]) => <span key={type}>{type.replaceAll('_', ' ')} · {count}</span>)}
      </div>
      <div className="doc-link-list">
        {officialDocumentsSnapshot.recentDocuments.slice(0, 8).map((doc) => (
          <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer">
            <b>{doc.title}</b>
            <span>{doc.geography} · {doc.documentType.replaceAll('_', ' ')} · {doc.year || 'date in document'}</span>
          </a>
        ))}
      </div>
      <p className="source-note">Document index is metadata only: official public links are cached so the terminal can build Council briefs, spending trails, and project evidence without scraping private systems or over-claiming document contents.</p>
    </section>
  );
}

function SourceReadiness() {
  const statusCounts = sourceRegistry.reduce((counts, source) => {
    counts[source.status] = (counts[source.status] || 0) + 1;
    return counts;
  }, {});
  const featuredSources = sourceRegistry
    .filter((source) => ['Live connector active', 'Ready for document index', 'Seed connector ready', 'Reference ready', 'Source hub identified'].includes(source.status))
    .slice(0, 7);

  return (
    <section id="sources" className="module source-readiness">
      <section className="panel source-summary">
        <div className="panel-head">
          <div>
            <span className="eyebrow">SOURCE CONFIDENCE LEDGER</span>
            <h2>Mock data is labeled; real connectors are being staged</h2>
          </div>
          <span className="terminal-badge gold">PUBLIC DATA TRACKER</span>
        </div>
        <div className="source-stats">
          <article><b>{sourceRegistry.length}</b><span>sources identified</span></article>
          <article><b>{statusCounts['Reference ready'] || 0}</b><span>reference ready</span></article>
          <article><b>{statusCounts['Ready for document index'] || 0}</b><span>doc-index ready</span></article>
          <article><b>{statusCounts['Seed connector ready'] || 0}</b><span>seed connector</span></article>
        </div>
        <p className="source-note">Every dashboard number remains synthetic until it carries a source, timestamp, geography, and connector status. Data Commons is now connected server-side for baseline demographics; city documents remain the next official local evidence lane.</p>
      </section>
      <DataCommonsLivePanel />
      <OfficialDocumentsPanel />
      <section className="panel source-queue-card">
        <div className="panel-head"><div><span className="eyebrow">CONNECTOR ACTION QUEUE</span><h2>Highest-trust next moves</h2></div></div>
        <div className="priority-list">
          {sourcePriorities.map((item) => (
            <article key={item.lane}>
              <div className="priority-top"><span>{item.lane}</span><b>{item.difficulty}</b></div>
              <h3>{item.target}</h3>
              <p>{item.value}</p>
              <small>{item.nextStep}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="panel source-map-card">
        <span className="eyebrow">MAP CREDIBILITY SEED</span>
        <h2>OpenStreetMap center point</h2>
        <div className="coordinate-grid">
          <div><span>Latitude</span><b>{osmWaynesboroSeed.lat}</b></div>
          <div><span>Longitude</span><b>{osmWaynesboroSeed.lon}</b></div>
          <div><span>OSM ID</span><b>{osmWaynesboroSeed.osmType} {osmWaynesboroSeed.osmId}</b></div>
        </div>
        <small>{osmWaynesboroSeed.license}</small>
      </section>
      <section className="panel source-table-panel">
        <div className="panel-head"><div><span className="eyebrow">REAL DATA ACCESS PATHS</span><h2>Ready references</h2></div></div>
        <div className="source-list">
          {featuredSources.map((source) => (
            <article key={source.name}>
              <div><a href={source.url} target="_blank" rel="noreferrer"><b>{source.name}</b></a><span>{source.dataType}</span></div>
              <span className="source-difficulty">{source.difficulty}</span>
              <span className="source-status">{source.status}</span>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function EconomicDevelopment() {
  const driRecord = regionalDevelopmentSeed.records[0];
  return (
    <section id="economic" className="module two-col">
      <DataTable
        title="Ranked Development Pipeline"
        eyebrow="ECONOMIC DEVELOPMENT"
        rows={economicPipeline}
        columns={[
          { key: 'prospect', label: 'Prospect' },
          { key: 'industry', label: 'Industry' },
          { key: 'jobs', label: 'Jobs', numeric: true },
          { key: 'investment', label: 'CapEx', numeric: true },
          { key: 'status', label: 'Status', render: (row) => <span className={`pill ${statusTone[row.status] || 'neutral'}`}>{row.status}</span> },
          { key: 'probability', label: 'Prob.', render: (row) => <ScoreBar score={row.probability} /> }
        ]}
      />
      <section className="panel intelligence-card">
        <span className="eyebrow">EMPLOYERS / ASSETS / OPPORTUNITIES</span>
        <h2>Economic command notes</h2>
        <div className="metric-stack">
          <div><b>Active business licenses</b><span>312 · +18 YoY</span></div>
          <div><b>New businesses</b><span>14 this period · restaurants, trades, services</span></div>
          <div><b>Business closures</b><span>4 · concentrated in low-foot-traffic retail</span></div>
          <div><b>Largest employers</b><span>Government, healthcare, education, industrial employers</span></div>
          <div><b>Available commercial property</b><span>11 tracked spaces · 4 redevelopment-grade</span></div>
          <div><b>Industrial sites</b><span>3 priority pads · utilities diligence required</span></div>
        </div>
        <div className="dri-watch-card">
          <span className="eyebrow">REGIONAL DEVELOPMENT WATCH · SOURCE SEED</span>
          <h3>{driRecord.projectName}</h3>
          <div className="dri-facts">
            <span>{driRecord.developmentType}</span>
            <span>{driRecord.county} County</span>
            <span>{driRecord.jurisdiction}</span>
            <span>{driRecord.currentStatus}</span>
          </div>
          <p>DCA DRI record {driRecord.driId} gives the economic-development module a real public record shape for major development review tracking.</p>
          <a href={driRecord.detailUrl} target="_blank" rel="noreferrer">Open DCA application summary</a>
        </div>
      </section>
    </section>
  );
}

function DowntownCommandCenter() {
  const civicAssets = osmCivicAssetsSeed.assets.slice(0, 5);

  return (
    <section id="downtown" className="module three-col">
      <section className="panel map-panel">
        <div className="panel-head"><div><span className="eyebrow">DOWNTOWN COMMAND CENTER</span><h2>Core map / parcel operating picture</h2></div></div>
        <div className="map-source-bar" aria-label="map source status">
          <article>
            <span>Place seed</span>
            <b>{waynesboroGeographySeed.attributes.name}</b>
            <small>Census GEOID {waynesboroGeographySeed.geoid} · place {waynesboroGeographySeed.placeCode}</small>
          </article>
          <article>
            <span>Boundary source</span>
            <b>{waynesboroGeographySeed.sourceName}</b>
            <small>{waynesboroGeographySeed.accessMethod}</small>
          </article>
          <article>
            <span>Map status</span>
            <b>Schematic overlay</b>
            <small>Real parcel geometry still requires qPublic/export permission.</small>
          </article>
        </div>
        <div className="city-map">
          <div className="gridlines" />
          {downtownProperties.map((p, index) => <button key={p.name} className={`map-node node-${index}`}>{p.name}</button>)}
          <span className="map-label label-a">Liberty St</span>
          <span className="map-label label-b">Sixth St</span>
          <span className="map-label label-c">Redevelopment seam</span>
          <div className="map-disclaimer">Schematic mock parcel layer · centered from OSM seed, not a live GIS boundary</div>
        </div>
        <div className="layer-strip">{mapLayers.map((layer) => <span key={layer}>{layer}</span>)}</div>
        <div className="civic-asset-seed" aria-label="OpenStreetMap civic asset seed">
          <div className="civic-asset-head">
            <span className="eyebrow">OSM CIVIC ASSET SEED</span>
            <b>{civicAssets.length} public map anchors · verify before official use</b>
          </div>
          <div className="civic-asset-list">
            {civicAssets.map((asset) => (
              <article key={asset.id}>
                <span>{asset.type}</span>
                <b>{asset.name}</b>
                <small>{asset.osmElement} · {asset.lat.toFixed(4)}, {asset.lon.toFixed(4)}</small>
              </article>
            ))}
          </div>
          <p>{osmCivicAssetsSeed.caveat}</p>
        </div>
      </section>
      <DataTable
        title="Storefront Intelligence"
        eyebrow="OCCUPANCY / OWNERSHIP / TRAFFIC"
        rows={downtownProperties}
        columns={[
          { key: 'name', label: 'Asset' },
          { key: 'occupancy', label: 'Occupancy', render: (row) => <span className={`pill ${row.occupancy === 'Vacant' ? 'bad' : row.occupancy === 'Partial' ? 'watch' : 'good'}`}>{row.occupancy}</span> },
          { key: 'owner', label: 'Owner' },
          { key: 'footTraffic', label: 'Foot traffic', render: (row) => <ScoreBar score={row.footTraffic} /> },
          { key: 'status', label: 'Readout' }
        ]}
      />
    </section>
  );
}

function BeautificationIndex() {
  const score = useMemo(() => Math.round(beautificationFactors.reduce((sum, item) => sum + item.score, 0) / beautificationFactors.length), []);
  return (
    <section id="beautification" className="module two-col compact">
      <section className="panel score-panel">
        <span className="eyebrow">PROPRIETARY CITY SCORE</span>
        <h2>Beautification Index</h2>
        <div className="big-score"><span>{score}</span><small>/100</small></div>
        <p>Composite of code pressure, vacancy, abandoned structures, downtown occupancy, landscaping, public art, and streetscape momentum.</p>
        <Sparkline points={[52, 55, 58, 60, 63, 66, 70, score]} />
      </section>
      <section className="panel factor-list">
        {beautificationFactors.map((item) => (
          <div className="factor" key={item.factor}>
            <div><b>{item.factor}</b><span>{item.signal}</span></div>
            <ScoreBar score={item.score} />
          </div>
        ))}
      </section>
    </section>
  );
}

function ProjectTracker() {
  return (
    <section id="projects" className="module two-col">
      <DataTable
        title="Project Tracker"
        eyebrow="GANTT + KANBAN DATA MODEL"
        rows={projects}
        columns={[
          { key: 'name', label: 'Project' },
          { key: 'owner', label: 'Owner' },
          { key: 'budget', label: 'Budget', numeric: true },
          { key: 'status', label: 'Status', render: (row) => <span className={`pill ${statusTone[row.status] || 'neutral'}`}>{row.status}</span> },
          { key: 'completion', label: 'Done', render: (row) => <ScoreBar score={row.completion} /> },
          { key: 'priority', label: 'Pri.' }
        ]}
      />
      <section className="panel kanban">
        <span className="eyebrow">KANBAN VIEW</span>
        <div className="kanban-grid">
          {['Planning', 'Active', 'Blocked', 'Procurement'].map((lane) => (
            <div key={lane} className="lane"><h3>{lane}</h3>{projects.filter((p) => p.status === lane).map((p) => <article key={p.name}><b>{p.name}</b><span>{p.owner} · {p.completion}%</span></article>)}</div>
          ))}
        </div>
      </section>
    </section>
  );
}

function WeatherReadinessPanel() {
  return (
    <section className="panel weather-readiness-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">WEATHER / HAZARD READINESS SOURCE</span>
          <h2>NWS point routing for emergency briefings</h2>
        </div>
        <span className="terminal-badge live">PUBLIC API</span>
      </div>
      <div className="weather-meta-grid">
        <article><span>Forecast office</span><b>{weatherReadinessSeed.point.gridId}</b><small>Grid {weatherReadinessSeed.point.gridX},{weatherReadinessSeed.point.gridY}</small></article>
        <article><span>County zone</span><b>{weatherReadinessSeed.point.countyZone}</b><small>Burke County alert path</small></article>
        <article><span>Forecast / fire zone</span><b>{weatherReadinessSeed.point.forecastZone}</b><small>Fire weather {weatherReadinessSeed.point.fireWeatherZone}</small></article>
        <article><span>Radar station</span><b>{weatherReadinessSeed.point.radarStation}</b><small>{weatherReadinessSeed.point.relativeLocation}</small></article>
      </div>
      <div className="weather-endpoint-list">
        {weatherReadinessSeed.endpoints.map((endpoint) => (
          <a key={endpoint.label} href={endpoint.url} target="_blank" rel="noreferrer">
            <b>{endpoint.label}</b>
            <span>{endpoint.use}</span>
          </a>
        ))}
      </div>
      <div className="active-alert-snapshot" aria-label="cached NWS active alert snapshot">
        <div>
          <span className="eyebrow">CACHED ACTIVE ALERT SNAPSHOT</span>
          <h3>{weatherAlertsSnapshot.featureCount === 0 ? 'No active NWS alerts in cached Burke County snapshot' : `${weatherAlertsSnapshot.featureCount} active NWS alert(s) cached`}</h3>
          <p>{weatherAlertsSnapshot.summary}</p>
        </div>
        <div className="alert-meta">
          <b>{new Date(weatherAlertsSnapshot.fetchedAt).toLocaleString()}</b>
          <small>{weatherAlertsSnapshot.geography}</small>
          <a href={weatherAlertsSnapshot.sourceUrl} target="_blank" rel="noreferrer">Open NWS alert endpoint</a>
        </div>
      </div>
      <p className="source-note">{weatherReadinessSeed.caveat} {weatherAlertsSnapshot.caveat}</p>
    </section>
  );
}

function InfrastructureSafetyHousing() {
  return (
    <section id="operations" className="module operations-module">
      <div className="three-stack">
        <section className="panel">
          <div className="panel-head"><div><span className="eyebrow">INFRASTRUCTURE</span><h2>System health</h2></div><span className="terminal-badge">SYNTHETIC</span></div>
          {infrastructure.map((item) => <div key={item.system} className="ops-row"><b>{item.system}</b><ScoreBar score={item.health} /><span>{item.risk}</span><em>{item.next}</em></div>)}
        </section>
        <section className="panel">
          <div className="panel-head"><div><span className="eyebrow">PUBLIC SAFETY</span><h2>Incidents / response / trends</h2></div><span className="terminal-badge">NEEDS AGGREGATE</span></div>
          <div className="safety-grid">{safety.map((item) => <article key={item.metric} className={`safety-card ${item.severity}`}><span>{item.metric}</span><b>{item.value}</b><em>{item.trend}</em></article>)}</div>
          <p className="source-note">Displayed public-safety figures are demo placeholders until official aggregate incident or response-time data is released or obtained through a records process.</p>
        </section>
        <section className="panel">
          <div className="panel-head"><div><span className="eyebrow">HOUSING & DEVELOPMENT</span><h2>Development heat map</h2></div><span className="terminal-badge">SYNTHETIC</span></div>
          {housing.map((zone) => <div key={zone.zone} className="heat-row"><b>{zone.zone}</b><div className="heat"><span style={{ width: `${zone.heat}%` }} /></div><em>{zone.note}</em></div>)}
        </section>
      </div>
      <WeatherReadinessPanel />
      <section className="panel ops-source-ledger">
        <div className="panel-head">
          <div>
            <span className="eyebrow">OPERATIONS SOURCE LEDGER</span>
            <h2>Official city service pages now anchor the operations lane</h2>
          </div>
          <span className="terminal-badge gold">REFERENCE LAYER</span>
        </div>
        <div className="ops-source-grid">
          {operationsSourceSeed.map((source) => (
            <article key={source.lane}>
              <div className="ops-source-top"><span>{source.lane}</span><b>{source.status}</b></div>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
              <p>{source.integrationUse}</p>
              {source.secondaryUrl && <small>Secondary reference linked in seed file</small>}
            </article>
          ))}
        </div>
        <p className="source-note">This is a public reference layer, not live telemetry. The next trustworthy upgrade is to attach retrieval dates, reports, adopted budgets, work orders, or records-request responses before any operational score is treated as fact.</p>
      </section>
    </section>
  );
}

function Council() {
  const councilEvidence = [
    {
      label: 'Baseline facts',
      confidence: 'Verified connector',
      title: 'Demographics, income, housing, and county labor context',
      note: `${dataCommonsSnapshot.metrics.length} Data Commons observations cached with dates and upstream source names.`
    },
    {
      label: 'Official record trail',
      confidence: 'Public links indexed',
      title: 'City/county agenda, budget, check-register, and financial-report links',
      note: `${officialDocumentsSnapshot.summary.documentCount} links are metadata-indexed; quote contents only after manual document review.`
    },
    {
      label: 'Development watch',
      confidence: 'Seed record',
      title: regionalDevelopmentSeed.records[0].projectName,
      note: `DCA DRI ${regionalDevelopmentSeed.records[0].driId} is a public review seed, not a complete project pipeline.`
    },
    {
      label: 'Still placeholder',
      confidence: 'Needs source',
      title: 'Crime, permits, downtown occupancy, beautification, and parcel-level claims',
      note: 'Council recommendations must stay framed as hypotheses until these lanes have official exports or public aggregates.'
    }
  ];

  return (
    <section id="council" className="module council-panel">
      <section className="panel council-main">
        <div className="panel-head"><div><span className="eyebrow">AI LAYER</span><h2>The Council</h2></div><span className="terminal-badge gold">MAYOR BRIEF</span></div>
        <div className="council-grid">
          <div className="orb">WOS</div>
          <div className="brief-list">{councilBrief.map((line, index) => <p key={line}><b>{String(index + 1).padStart(2, '0')}</b>{line}</p>)}</div>
        </div>
      </section>
      <section className="panel roadmap">
        <span className="eyebrow">FUTURE DATA CONNECTORS</span>
        <h2>Integration spine</h2>
        <div className="connector-grid">{integrationRoadmap.map((source) => <span key={source}>{source}</span>)}</div>
      </section>
      <section className="panel council-evidence-card">
        <div className="panel-head">
          <div>
            <span className="eyebrow">COUNCIL SOURCE DISCIPLINE</span>
            <h2>What the AI advisor is allowed to know today</h2>
          </div>
          <span className="terminal-badge">PUBLIC DEMO GUARDRAIL</span>
        </div>
        <div className="evidence-grid">
          {councilEvidence.map((item) => (
            <article key={item.label}>
              <div><span>{item.label}</span><b>{item.confidence}</b></div>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
        <p className="source-note">The Council should brief decisions like a civic analyst: verified baseline first, official records second, labeled hypotheses last. No synthetic operating metric should be presented as municipal fact.</p>
      </section>
    </section>
  );
}

function PublicTrustRibbon() {
  const officialLinks = officialDocumentsSnapshot.summary.documentCount;
  const liveConnectors = sourceRegistry.filter((source) => source.status === 'Live connector active').length;

  return (
    <section className="trust-ribbon" aria-label="public demo data status">
      <article>
        <span>Demo posture</span>
        <b>Verified baseline + labeled placeholders</b>
        <small>No municipal claim is promoted until it has source, geography, and timestamp.</small>
      </article>
      <article>
        <span>Live baseline</span>
        <b>{liveConnectors} public connector active</b>
        <small>Data Commons baseline and NWS alert snapshot are source-labeled.</small>
      </article>
      <article>
        <span>Evidence trail</span>
        <b>{officialLinks} official document links indexed</b>
        <small>Metadata only; documents still require manual verification before quotation.</small>
      </article>
    </section>
  );
}

function CivicBriefingStrip() {
  const cityPopulation = metricById['waynesboro-population'];
  const medianIncome = metricById['waynesboro-median-income'];
  const latestDocYear = officialDocumentsSnapshot.recentDocuments
    .map((doc) => Number(doc.year))
    .filter(Boolean)
    .sort((a, b) => b - a)[0];
  const waterSource = sourceRegistry.find((source) => source.name.includes('SDWIS'));

  const briefItems = [
    {
      label: 'Verified baseline',
      value: `${cityPopulation?.displayValue || 'N/A'} residents`,
      detail: `${medianIncome?.displayValue || 'N/A'} median household income · Data Commons`
    },
    {
      label: 'Official record trail',
      value: `${officialDocumentsSnapshot.summary.documentCount} links indexed`,
      detail: `City/county documents metadata only${latestDocYear ? ` · latest year ${latestDocYear}` : ''}`
    },
    {
      label: 'Decision focus',
      value: 'Parcels + permits + corridors',
      detail: 'Next layer should narrow downtown assets, development signals, and gateway traffic.'
    },
    {
      label: 'Operations source watch',
      value: waterSource ? 'EPA SDWIS scoped' : 'Water source pending',
      detail: 'Use public water-system reports as evidence, not live utility telemetry.'
    }
  ];

  return (
    <section className="civic-briefing-strip" aria-label="civic briefing snapshot">
      <div>
        <span className="eyebrow">CIVIC BRIEF SNAPSHOT</span>
        <h2>What the first screen says before the meeting starts</h2>
      </div>
      <div className="briefing-cards">
        {briefItems.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <b>{item.value}</b>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function WaynesboroTerminal() {
  const [active, setActive] = useState('executive');
  const nav = [
    ['executive', 'Executive'], ['sources', 'Sources'], ['economic', 'Economic'], ['downtown', 'Downtown'], ['beautification', 'Beautification'],
    ['projects', 'Projects'], ['operations', 'Operations'], ['council', 'Council']
  ];
  return (
    <main className="terminal-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>W</span><div><b>Waynesboro OS</b><small>Municipal Intelligence Terminal</small></div></div>
        <nav>{nav.map(([id, label]) => <a key={id} onClick={() => setActive(id)} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
        <div className="sidebar-note"><b>Core question</b><span>If I became Mayor tomorrow morning, what do I need before my first meeting?</span></div>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">WAYNESBORO, GEORGIA · CITY OPERATING PICTURE</span>
            <h1>Municipal Operating Picture for Waynesboro.</h1>
            <p className="public-disclaimer">Public-presentable demo interface with verified Data Commons baselines, official document links, and clearly labeled synthetic operating placeholders for lanes not yet connected.</p>
          </div>
          <div className="market-clock"><b>HYBRID DATA MODE</b><span>Data Commons live · local ops placeholders labeled</span></div>
        </header>
        <PublicTrustRibbon />
        <CivicBriefingStrip />
        <ExecutiveDashboard />
        <SourceReadiness />
        <EconomicDevelopment />
        <DowntownCommandCenter />
        <BeautificationIndex />
        <ProjectTracker />
        <InfrastructureSafetyHousing />
        <Council />
      </section>
    </main>
  );
}
