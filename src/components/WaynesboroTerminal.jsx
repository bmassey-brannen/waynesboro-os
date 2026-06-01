import React, { useMemo } from 'react';
import {
  beautificationFactors,
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
import { weatherForecastSnapshot } from '../data/weatherForecastSnapshot.js';
import { waterSystemsSeed } from '../data/waterSystemsSeed.js';
import { economicSourceSeed } from '../data/economicSourceSeed.js';
import { censusReporterSeed } from '../data/censusReporterSeed.js';
import { taxDigestSeed } from '../data/taxDigestSeed.js';
import { cityMapSourceSeed } from '../data/cityMapSourceSeed.js';
import { businessSurfaceSeed } from '../data/businessSurfaceSeed.js';
import { utilityRateSeed } from '../data/utilityRateSeed.js';
import { utilityEnergySeed } from '../data/utilityEnergySeed.js';
import { cleanWaterPermitSeed } from '../data/cleanWaterPermitSeed.js';
import { hazardResilienceSeed } from '../data/hazardResilienceSeed.js';
import { stormEventsSeed } from '../data/stormEventsSeed.js';
import { publicSafetySourceSeed } from '../data/publicSafetySourceSeed.js';
import { healthEquitySeed } from '../data/healthEquitySeed.js';
import { laborForceSeed } from '../data/laborForceSeed.js';
import { salesTaxDistributionSeed } from '../data/salesTaxDistributionSeed.js';
import { cityPermittingSeed } from '../data/cityPermittingSeed.js';
import { federalSpendingSeed } from '../data/federalSpendingSeed.js';
import { civicParticipationSeed } from '../data/civicParticipationSeed.js';
import { communityDevelopmentSeed } from '../data/communityDevelopmentSeed.js';
import { broadbandAccessSeed } from '../data/broadbandAccessSeed.js';
import { stateDrinkingWaterSeed } from '../data/stateDrinkingWaterSeed.js';
import { transportationProjectSeed } from '../data/transportationProjectSeed.js';
import { educationWorkforceSeed } from '../data/educationWorkforceSeed.js';
import { affordableHousingSeed } from '../data/affordableHousingSeed.js';
import { usgsHydrologySeed } from '../data/usgsHydrologySeed.js';
import { hydrologyObservationsSeed } from '../data/hydrologyObservationsSeed.js';
import { lehdCommutingSeed } from '../data/lehdCommutingSeed.js';
import { housingTenureSeed } from '../data/housingTenureSeed.js';
import { housingAgeSeed } from '../data/housingAgeSeed.js';
import { housingCostBurdenSeed } from '../data/housingCostBurdenSeed.js';
import { housingMonthlyCostsSeed } from '../data/housingMonthlyCostsSeed.js';
import { housingStructureSeed } from '../data/housingStructureSeed.js';
import { housingCrowdingSeed } from '../data/housingCrowdingSeed.js';
import { homeValueDistributionSeed } from '../data/homeValueDistributionSeed.js';
import { commuteProfileSeed } from '../data/commuteProfileSeed.js';
import { workforceEducationSeed } from '../data/workforceEducationSeed.js';
import { foodAccessSeed } from '../data/foodAccessSeed.js';
import { internetSubscriptionSeed } from '../data/internetSubscriptionSeed.js';
import { ageProfileSeed } from '../data/ageProfileSeed.js';
import { vehicleAccessSeed } from '../data/vehicleAccessSeed.js';
import { disabilityAccessSeed } from '../data/disabilityAccessSeed.js';
import { hazardousWasteSeed } from '../data/hazardousWasteSeed.js';
import { incomeDistributionSeed } from '../data/incomeDistributionSeed.js';
import { mapboxReadinessSeed } from '../data/mapboxReadinessSeed.js';
import { householdCompositionSeed } from '../data/householdCompositionSeed.js';
import { languageAccessSeed } from '../data/languageAccessSeed.js';
import { healthInsuranceSeed } from '../data/healthInsuranceSeed.js';
import { povertyStatusSeed } from '../data/povertyStatusSeed.js';
import { youthProfileSeed } from '../data/youthProfileSeed.js';
import { snapAssistanceSeed } from '../data/snapAssistanceSeed.js';
import { localFinancialDocumentsSeed } from '../data/localFinancialDocumentsSeed.js';
import { householdSizeSeed } from '../data/householdSizeSeed.js';
import { industryEmploymentSeed } from '../data/industryEmploymentSeed.js';
import { schoolEnrollmentSeed } from '../data/schoolEnrollmentSeed.js';
import { veteranStatusSeed } from '../data/veteranStatusSeed.js';
import { occupationEmploymentSeed } from '../data/occupationEmploymentSeed.js';
import { socialVulnerabilitySeed } from '../data/socialVulnerabilitySeed.js';
import { raceEthnicitySeed } from '../data/raceEthnicitySeed.js';
import { vehicleTenureSeed } from '../data/vehicleTenureSeed.js';
import { mentalHealthResourcesSeed } from '../data/mentalHealthResourcesSeed.js';
import { publicWorksServiceSeed } from '../data/publicWorksServiceSeed.js';
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

function DataTable({ title, eyebrow, rows, columns, badge = 'SYNTHETIC TABLE', note = 'Demo table: values remain placeholders until connected to source-labeled public records.' }) {
  return (
    <section className="panel table-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <span className="terminal-badge gold">{badge}</span>
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
      {note && <p className="table-source-note">{note}</p>}
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

function AgeProfilePanel() {
  const peakGroup = ageProfileSeed.groups.reduce((leader, group) => group.share > leader.share ? group : leader, ageProfileSeed.groups[0]);
  return (
    <section className="age-profile-panel" aria-label="ACS age profile and service demand context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">SERVICE DEMAND CONTEXT</span>
          <h2>Age profile adds a human-services lens to the baseline</h2>
        </div>
        <span className="terminal-badge live">ACS B01001</span>
      </div>
      <div className="age-profile-grid">
        {ageProfileSeed.groups.map((group) => (
          <article key={group.id}>
            <div>
              <span>{group.label}</span>
              <b>{group.displayShare}</b>
            </div>
            <div className="age-share-bar"><span style={{ width: group.displayShare }} /></div>
            <small>{group.displayValue} people · MOE ±{group.moe.toLocaleString()} · {group.planningUse}</small>
          </article>
        ))}
      </div>
      <p className="baseline-brief"><b>Council read:</b> ACS estimates show {peakGroup.label.toLowerCase()} as the largest age band in the cached profile ({peakGroup.displayShare}). Use this as service-demand framing only: school, EMS, recreation, housing, health, and workforce records still gate any department-level recommendation.</p>
    </section>
  );
}

function YouthProfilePanel() {
  const earlyChildhood = youthProfileSeed.ageBands.filter((band) => ['under-3', '3-4', '5'].includes(band.id));
  const schoolAge = youthProfileSeed.ageBands.filter((band) => ['6-8', '9-11', '12-14', '15-17'].includes(band.id));
  const largestBand = youthProfileSeed.ageBands.reduce((leader, band) => band.value > leader.value ? band : leader, youthProfileSeed.ageBands[0]);

  return (
    <section className="youth-profile-panel" aria-label="ACS youth age cohort and service planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">YOUTH / FAMILY SERVICE CONTEXT · ACS B09001</span>
          <h2>Under-18 cohorts break the age profile into usable planning bands</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="youth-profile-hero">
        <article>
          <span>Under 18</span>
          <b>{youthProfileSeed.totalUnder18.displayShareOfPopulation}</b>
          <small>{youthProfileSeed.totalUnder18.displayValue} residents · MOE {youthProfileSeed.totalUnder18.displayMoe} · {youthProfileSeed.release.name}</small>
        </article>
        <div>
          <h3>Why this improves the executive screen</h3>
          <p>The earlier age panel showed a single under-18 bucket. This source-labeled split lets the OS ask better questions about childcare, school readiness, youth programs, safe routes, library/recreation, and early workforce pathways without pretending to know enrollment or department workload.</p>
          <a href={youthProfileSeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter B09001 query</a>
        </div>
      </div>
      <div className="youth-profile-grid">
        {youthProfileSeed.ageBands.map((band) => (
          <article key={band.id}>
            <div>
              <span>{band.label}</span>
              <b>{band.displayChildShare}</b>
            </div>
            <div className="age-share-bar"><span style={{ width: band.displayChildShare }} /></div>
            <small>{band.displayValue} people · MOE {band.displayMoe} · {band.planningUse}</small>
          </article>
        ))}
      </div>
      <div className="youth-context-strip">
        <article>
          <span>Early childhood</span>
          <b>{earlyChildhood.reduce((sum, band) => sum + band.value, 0).toLocaleString()}</b>
          <small>Under 6 estimate from B09001 rows; use as pre-K/childcare planning context only.</small>
        </article>
        <article>
          <span>School-age bands</span>
          <b>{schoolAge.reduce((sum, band) => sum + band.value, 0).toLocaleString()}</b>
          <small>Ages 6–17 estimate; pair with Burke County Public Schools and Georgia Insights before conclusions.</small>
        </article>
        <article>
          <span>Largest cohort</span>
          <b>{largestBand.label}</b>
          <small>{largestBand.displayValue} estimate · {largestBand.displayMoe} MOE · small cohorts need caution.</small>
        </article>
      </div>
      <div className="youth-comparison-strip">
        {youthProfileSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.under18Share}</b>
            <small>{row.under18.toLocaleString()} under 18 · MOE ±{row.under18Moe.toLocaleString()} · population {row.totalPopulation.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p>{youthProfileSeed.caveat} Next: {youthProfileSeed.nextActions[0]}</p>
    </section>
  );
}

function RaceEthnicityPanel() {
  const headline = raceEthnicitySeed.headline;
  return (
    <section className="household-composition-panel race-ethnicity-panel" aria-label="ACS race and ethnicity demographic planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">DEMOGRAPHIC CONTEXT · ACS B03002</span>
          <h2>Race / ethnicity lens before outreach assumptions</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="household-composition-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.estimate.toLocaleString()} residents · MOE ±{headline.moe.toLocaleString()} · total ACS population {raceEthnicitySeed.totalPopulation.toLocaleString()}</small>
        </article>
        <div>
          <h3>Public-facing use: better questions, not identity files</h3>
          <p>Use this panel to frame outreach, public notices, language-access pairing, service-location review, and grant narratives. It does not imply voter records, benefits files, household-level identity data, policing data, eligibility, or department workload.</p>
          <a href={raceEthnicitySeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B03002 source query</a>
        </div>
      </div>
      <div className="household-composition-grid race-ethnicity-grid">
        {raceEthnicitySeed.groups.map((group) => (
          <article key={group.id}>
            <span>{group.label}</span>
            <b>{group.displayShare}</b>
            <small>{group.estimate.toLocaleString()} residents · MOE ±{group.moe.toLocaleString()} · {group.planningUse}</small>
          </article>
        ))}
      </div>
      <div className="household-comparison-strip race-ethnicity-comparison">
        {raceEthnicitySeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.blackNonHispanicShare}</b>
            <small>Black alone non-Hispanic · {item.whiteNonHispanicShare} White alone non-Hispanic · {item.hispanicShare} Hispanic/Latino</small>
          </article>
        ))}
      </div>
      <p className="source-note">{raceEthnicitySeed.caveat} Release: {raceEthnicitySeed.release.name} ({raceEthnicitySeed.release.years}); retrieved {new Date(raceEthnicitySeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HouseholdCompositionPanel() {
  const primaryMetrics = householdCompositionSeed.metrics.filter((metric) => ['family-households', 'living-alone', 'female-no-spouse-family', 'nonfamily-households'].includes(metric.id));
  const headline = householdCompositionSeed.metrics.find((metric) => metric.id === 'living-alone');

  return (
    <section className="household-composition-panel" aria-label="ACS household composition context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSEHOLD COMPOSITION · ACS CONTEXT</span>
          <h2>Service-demand context before households become assumptions</h2>
        </div>
        <span className="terminal-badge gold">NO-KEY API SEED</span>
      </div>
      <div className="household-composition-hero">
        <article>
          <span>Planning context</span>
          <b>{headline?.displayShare || 'N/A'}</b>
          <small>{headline?.displayValue || 'N/A'} Waynesboro ACS households living alone · MOE {headline?.displayMoe || 'n/a'}</small>
        </article>
        <div>
          <h3>Why this belongs on the executive screen</h3>
          <p>Household mix changes how the city should ask questions about outreach, recreation, housing, broadband, mobility, and emergency-readiness. This panel keeps that context source-labeled without implying case files, eligibility, school enrollment, or live service demand.</p>
          <a href={householdCompositionSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B11001 source route</a>
        </div>
      </div>
      <div className="household-composition-grid">
        {primaryMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} households · MOE {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="household-comparison-strip">
        {householdCompositionSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.livingAloneShare}</b>
            <small>living alone · {row.familyShare} family households · {row.femaleNoSpouseFamilyShare} female no-spouse family households</small>
          </article>
        ))}
      </div>
      <p>{householdCompositionSeed.posture}</p>
    </section>
  );
}

function HouseholdSizePanel() {
  const average = householdSizeSeed.metrics.find((metric) => metric.id === 'average-household-size');
  const tenureMetrics = householdSizeSeed.metrics.filter((metric) => metric.id !== 'average-household-size');

  return (
    <section className="household-composition-panel household-size-panel" aria-label="ACS average household size by tenure context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSEHOLD SIZE · ACS CONTEXT</span>
          <h2>Tenure-aware household-size context before service assumptions</h2>
        </div>
        <span className="terminal-badge gold">NO-KEY API SEED</span>
      </div>
      <div className="household-composition-hero">
        <article>
          <span>{average?.label || 'Average household size'}</span>
          <b>{average?.displayValue || 'N/A'}</b>
          <small>persons per occupied housing unit · MOE {average?.displayMoe || 'n/a'} · ACS B25010</small>
        </article>
        <div>
          <h3>Why this improves the executive lane</h3>
          <p>Average household size helps keep housing, recreation, emergency-readiness, and service-location conversations from defaulting to one-size-fits-all assumptions. It stays paired with household composition and crowding context, and it is not evidence of occupancy violations or department workload.</p>
          <a href={householdSizeSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25010 source query</a>
        </div>
      </div>
      <div className="household-composition-grid household-size-grid">
        {tenureMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayValue}</b>
            <small>persons/unit · MOE {metric.displayMoe} · {metric.note}</small>
          </article>
        ))}
        <article>
          <span>Release</span>
          <b>{householdSizeSeed.release.name}</b>
          <small>{householdSizeSeed.release.years} · retrieved {householdSizeSeed.retrievedAt}</small>
        </article>
        <article>
          <span>Use posture</span>
          <b>Survey context</b>
          <small>No household-level records, occupancy certificates, code findings, or live service telemetry.</small>
        </article>
      </div>
      <div className="household-comparison-strip">
        {householdSizeSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.average}</b>
            <small>avg household size · owner {row.owner} · renter {row.renter} · MOE {row.moe}</small>
          </article>
        ))}
      </div>
      <p>{householdSizeSeed.caveat}</p>
    </section>
  );
}

function VeteranStatusPanel() {
  const headline = veteranStatusSeed.headline;
  return (
    <section className="household-composition-panel veteran-status-panel" aria-label="ACS veteran-status planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">VETERAN STATUS · ACS CONTEXT</span>
          <h2>Veteran-service lens before outreach becomes guesswork</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="household-composition-hero veteran-status-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} veterans · MOE {headline.displayMoe} · universe {headline.universe.toLocaleString()}</small>
        </article>
        <div>
          <h3>Why this belongs in the civic brief</h3>
          <p>Veteran status adds a respectful service-planning lens for recognition, outreach, mobility, health-access, aging-services, and nonprofit partnership questions. It stays source-labeled and does not imply VA enrollment, benefits eligibility, or municipal caseload.</p>
          <a href={veteranStatusSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B21001 source query</a>
        </div>
      </div>
      <div className="household-composition-grid veteran-status-grid">
        {veteranStatusSeed.metrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} estimate · MOE {metric.displayMoe} · {metric.planningUse}</small>
          </article>
        ))}
      </div>
      <div className="household-comparison-strip veteran-comparison-strip">
        {veteranStatusSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.veteranShare}</b>
            <small>{row.veterans.toLocaleString()} veterans · MOE ±{row.veteranMoe} · universe {row.universe.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p>{veteranStatusSeed.caveat} Release: {veteranStatusSeed.release.name} ({veteranStatusSeed.release.years}).</p>
    </section>
  );
}

function PovertyStatusPanel() {
  const headline = povertyStatusSeed.metrics.find((metric) => metric.id === 'poverty-total');
  const child = povertyStatusSeed.metrics.find((metric) => metric.id === 'poverty-child-under-18');

  return (
    <section className="poverty-status-panel" aria-label="ACS poverty status and economic mobility context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">ECONOMIC MOBILITY · ACS CONTEXT</span>
          <h2>Poverty-status seed adds a source-labeled need lens to the executive board</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="poverty-status-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} residents · MOE {headline.displayMoe} · universe {headline.denominator.toLocaleString()}</small>
        </article>
        <div>
          <h3>Why this matters for the civic operating picture</h3>
          <p>Use this as planning context for grant readiness, housing cost burden, food access, health access, mobility access, and service-location questions — not as proof of household eligibility or department workload.</p>
          <a href={povertyStatusSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B17001 source query</a>
        </div>
      </div>
      <div className="poverty-context-grid">
        {povertyStatusSeed.metrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare || metric.displayValue}</b>
            <small>{metric.displayValue} estimate · {metric.displayMoe} · {metric.note}</small>
          </article>
        ))}
      </div>
      <div className="poverty-comparison-strip">
        {povertyStatusSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.povertyShare}</b>
            <small>{row.belowPovertyEstimate.toLocaleString()} below poverty · MOE {row.belowPovertyMoe} · universe {row.universe.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p>{povertyStatusSeed.caveat} Child below-poverty subtotal shown as {child?.displayValue || 'N/A'} with rollup MOE pending; release {povertyStatusSeed.release.name} ({povertyStatusSeed.release.years}).</p>
    </section>
  );
}

function SnapAssistancePanel() {
  const headline = snapAssistanceSeed.metrics.find((metric) => metric.id === 'snap-households');
  const nonSnap = snapAssistanceSeed.metrics.find((metric) => metric.id === 'non-snap-households');

  return (
    <section className="poverty-status-panel snap-assistance-panel" aria-label="ACS food assistance and household economic mobility context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">FOOD SECURITY · ACS CONTEXT</span>
          <h2>SNAP receipt seed gives the need lens a food-access cross-check</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="poverty-status-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} households · MOE {headline.displayMoe} · universe {headline.denominator.toLocaleString()}</small>
        </article>
        <div>
          <h3>Public-facing guardrail</h3>
          <p>This is survey context for food-security planning and grant framing. It is not a benefits file, eligibility screen, school-meal count, pantry demand ledger, or department workload metric.</p>
          <a href={snapAssistanceSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B22001 source query</a>
        </div>
      </div>
      <div className="poverty-context-grid">
        {snapAssistanceSeed.metrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} estimate · MOE {metric.displayMoe} · {metric.note}</small>
          </article>
        ))}
        <article>
          <span>Use with</span>
          <b>Food access</b>
          <small>Pair with USDA ERS tract extraction, poverty status, vehicle access, and local service-location maps before any Council recommendation.</small>
        </article>
      </div>
      <div className="poverty-comparison-strip">
        {snapAssistanceSeed.comparison.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.snapShare}</b>
            <small>{row.snapHouseholds.toLocaleString()} households receiving SNAP · MOE {row.snapMoe} · total households {row.totalHouseholds.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p>{snapAssistanceSeed.caveat} Non-SNAP household estimate shown as {nonSnap?.displayValue || 'N/A'} with MOE {nonSnap?.displayMoe || 'pending'}; release {snapAssistanceSeed.release.name} ({snapAssistanceSeed.release.years}).</p>
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
      <PovertyStatusPanel />
      <SnapAssistancePanel />
      <AgeProfilePanel />
      <YouthProfilePanel />
      <RaceEthnicityPanel />
      <HouseholdCompositionPanel />
      <HouseholdSizePanel />
      <VeteranStatusPanel />
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

function CensusReporterCrosscheckPanel() {
  const population = censusReporterSeed.metrics.find((metric) => metric.id === 'cr-waynesboro-population');
  const income = censusReporterSeed.metrics.find((metric) => metric.id === 'cr-waynesboro-median-household-income');
  const povertyCount = censusReporterSeed.metrics.find((metric) => metric.id === 'cr-waynesboro-poverty-count');
  const povertyUniverse = censusReporterSeed.metrics.find((metric) => metric.id === 'cr-waynesboro-poverty-universe');
  const povertyRate = povertyCount?.value && povertyUniverse?.value ? povertyCount.value / povertyUniverse.value : null;
  const landSquareMiles = censusReporterSeed.geography.alandSquareMeters / 2589988.110336;

  return (
    <section className="panel census-reporter-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">ACS REDUNDANCY / BOUNDARY PATH</span>
          <h2>Census Reporter public API cross-check</h2>
        </div>
        <span className="terminal-badge live">NO KEY</span>
      </div>
      <div className="census-crosscheck-grid">
        <article><span>Population</span><b>{population?.displayValue || 'N/A'}</b><small>ACS table {population?.table} · MOE ±{population?.moe?.toLocaleString?.() || 'n/a'}</small></article>
        <article><span>Median household income</span><b>{income?.displayValue || 'N/A'}</b><small>ACS table {income?.table} · MOE ±${income?.moe?.toLocaleString?.() || 'n/a'}</small></article>
        <article><span>Poverty cross-check</span><b>{povertyRate == null ? 'N/A' : formatPercent(povertyRate, 1)}</b><small>{povertyCount?.displayValue || 'N/A'} of {povertyUniverse?.displayValue || 'N/A'} poverty universe</small></article>
        <article><span>Boundary seed</span><b>{landSquareMiles.toFixed(2)} sq mi</b><small>GeoJSON endpoint for place 16000US1380984</small></article>
      </div>
      <div className="census-link-row">
        <a href={censusReporterSeed.endpoints.profile} target="_blank" rel="noreferrer">Open profile</a>
        <a href={censusReporterSeed.endpoints.geo} target="_blank" rel="noreferrer">Open GeoJSON</a>
        <a href={censusReporterSeed.endpoints.data} target="_blank" rel="noreferrer">Open data API</a>
      </div>
      <p className="source-note">{censusReporterSeed.caveat} Snapshot fetched {new Date(censusReporterSeed.fetchedAt).toLocaleString()}.</p>
    </section>
  );
}

function TaxDigestSourcePanel() {
  return (
    <section className="panel tax-digest-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">FINANCE / TAX DIGEST SOURCE</span>
          <h2>Georgia DOR digest report index</h2>
        </div>
        <span className="terminal-badge gold">SOURCE SEED</span>
      </div>
      <div className="tax-digest-grid">
        {taxDigestSeed.reportHubs.map((hub) => (
          <article key={hub.id}>
            <span>{hub.dataType}</span>
            <a href={hub.url} target="_blank" rel="noreferrer"><b>{hub.label}</b></a>
            <small>{hub.latestObserved}</small>
            <a className="download-link" href={hub.latestDownloadUrl} target="_blank" rel="noreferrer">Latest observed download</a>
          </article>
        ))}
      </div>
      <p className="source-note">{taxDigestSeed.caveat} Use this as a state report bridge for finance drilldowns; city budget/adopted-rate documents still need local official records.</p>
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

function CivicParticipationSourcePanel() {
  return (
    <section className="panel civic-participation-panel" aria-label="Civic participation and elections source routing panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">CIVIC PARTICIPATION · SOURCE ROUTES</span>
          <h2>Elections and voter-information lane is reference-only</h2>
        </div>
        <span className="terminal-badge gold">NO VOTER SCRAPING</span>
      </div>
      <div className="civic-route-grid">
        {civicParticipationSeed.routes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.status}</span>
            <b>{route.label}</b>
            <small>{route.dataType}</small>
          </a>
        ))}
      </div>
      <div className="civic-next-steps">
        {civicParticipationSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{civicParticipationSeed.caveat} Retrieved {new Date(civicParticipationSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function CommunityDevelopmentPolicyPanel() {
  const featuredRoutes = communityDevelopmentSeed.routes.slice(0, 6);

  return (
    <section className="panel community-development-panel" aria-label="Community development and zoning source routes">
      <div className="panel-head">
        <div>
          <span className="eyebrow">COMMUNITY DEVELOPMENT · POLICY SOURCES</span>
          <h2>Zoning, signs, redevelopment, and housing routes now sit before claims</h2>
        </div>
        <span className="terminal-badge gold">CITATION ROUTES</span>
      </div>
      <div className="community-route-grid">
        {featuredRoutes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.type}</span>
            <b>{route.label}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="community-form-strip" aria-label="community development forms indexed">
        {communityDevelopmentSeed.forms.map((form) => <span key={form}>{form}</span>)}
      </div>
      <div className="community-next-steps">
        {communityDevelopmentSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{communityDevelopmentSeed.caveat} Retrieved {new Date(communityDevelopmentSeed.retrievedAt).toLocaleDateString()} from the public City Community Development page.</p>
    </section>
  );
}

function CredentialReadinessPanel() {
  const connectorCards = [
    {
      label: 'Data Commons baseline',
      status: dataCommonsSnapshot.status === 'active' ? 'LIVE SNAPSHOT' : 'CHECK',
      detail: `${dataCommonsSnapshot.metrics.length} normalized observations · fetched ${new Date(dataCommonsSnapshot.fetchedAt).toLocaleDateString()}`,
      tone: 'live'
    },
    {
      label: 'BLS LAUS workforce',
      status: laborForceSeed.credentialStatus === 'local_key_configured' ? 'KEY OK' : laborForceSeed.credentialStatus === 'local_key_rejected_fell_back_to_public_low_volume' ? 'KEY REJECTED · PUBLIC FALLBACK' : 'PUBLIC MODE',
      detail: `${laborForceSeed.latestPeriod} · ${laborForceSeed.series.length} Burke County metrics cached`,
      tone: laborForceSeed.credentialStatus === 'local_key_rejected_fell_back_to_public_low_volume' ? 'watch' : 'live'
    },
    {
      label: 'CDC PLACES / Socrata',
      status: healthEquitySeed.credentialStatus?.appTokenStatus === 'local_token_configured' ? 'TOKEN OK' : healthEquitySeed.credentialStatus?.appTokenStatus === 'local_token_rejected_fell_back_to_public_low_volume' ? 'TOKEN REJECTED · PUBLIC FALLBACK' : 'PUBLIC MODE',
      detail: `${healthEquitySeed.observedShape.rowsForBurkeCountyObserved} Burke County tract-measure rows observed`,
      tone: healthEquitySeed.credentialStatus?.appTokenStatus === 'local_token_rejected_fell_back_to_public_low_volume' ? 'watch' : 'live'
    },
    {
      label: 'Census API',
      status: 'KEY PENDING',
      detail: 'ACS Profile, Building Permits, and CBP remain on Census Reporter/source-route fallbacks until key is added.',
      tone: 'watch'
    },
    {
      label: 'Mapbox presentation map',
      status: mapboxReadinessSeed.credentialStatus === 'local_token_configured' ? 'TOKEN READY · THROTTLED' : 'TOKEN MISSING',
      detail: mapboxReadinessSeed.publicUsePolicy,
      tone: 'watch'
    }
  ];

  return (
    <section className="panel credential-readiness-panel" aria-label="local API credential readiness without exposing secrets">
      <div className="panel-head">
        <div>
          <span className="eyebrow">API CREDENTIAL READINESS</span>
          <h2>Local keys are staged; public snapshots never expose secrets</h2>
        </div>
        <span className="terminal-badge gold">NO SECRETS IN BROWSER</span>
      </div>
      <div className="credential-grid">
        {connectorCards.map((card) => (
          <article key={card.label} className={`credential-card ${card.tone}`}>
            <span>{card.label}</span>
            <b>{card.status}</b>
            <small>{card.detail}</small>
          </article>
        ))}
      </div>
      <p className="source-note">Credential status is generated server-side from .env.local as a public-safe readiness summary. Raw keys stay ignored by git and are not bundled into the GitHub Pages site.</p>
    </section>
  );
}

function SourceReadiness() {
  const statusCounts = sourceRegistry.reduce((counts, source) => {
    counts[source.status] = (counts[source.status] || 0) + 1;
    return counts;
  }, {});
  const seedReadyCount = (statusCounts['Seed connector ready'] || 0) + (statusCounts['Public API seed ready'] || 0);
  const maturityStatuses = [
    { label: 'Live connector active', statuses: ['Live connector active'], detail: 'browser-safe snapshots only' },
    { label: 'Seed connector ready', statuses: ['Seed connector ready', 'Public API seed ready'], detail: 'cached public seeds' },
    { label: 'Source routes indexed', statuses: ['Source routes indexed', 'Source route indexed'], detail: 'identified, not parsed' },
    { label: 'Reference / doc ready', statuses: ['Reference ready', 'Ready for document index'], detail: 'citation or document lane' },
    { label: 'Manual / scoped', statuses: ['Manual research', 'Connector scoped', 'Connector planned'], detail: 'requires QA or access' }
  ];
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
          <article><b>{seedReadyCount}</b><span>seed connector</span></article>
        </div>
        <div className="source-maturity-strip" aria-label="source maturity summary">
          {maturityStatuses.map((group) => (
            <article key={group.label}>
              <span>{group.label}</span>
              <b>{group.statuses.reduce((total, status) => total + (statusCounts[status] || 0), 0)}</b>
              <small>{group.detail}</small>
            </article>
          ))}
        </div>
        <p className="source-note">Every dashboard number remains synthetic until it carries a source, timestamp, geography, and connector status. Data Commons is now connected server-side for baseline demographics; city documents remain the next official local evidence lane.</p>
      </section>
      <CredentialReadinessPanel />
      <DataCommonsLivePanel />
      <CensusReporterCrosscheckPanel />
      <TaxDigestSourcePanel />
      <LocalFinancialDocumentsPanel />
      <OfficialDocumentsPanel />
      <CommunityDevelopmentPolicyPanel />
      <CivicParticipationSourcePanel />
      <section className="panel source-queue-card">
        <div className="panel-head"><div><span className="eyebrow">CONNECTOR ACTION QUEUE</span><h2>Highest-trust next moves</h2></div></div>
        <div className="priority-list">
          {sourcePriorities.slice(0, 8).map((item) => (
            <article key={`${item.lane}-${item.target}`}>
              <div className="priority-top"><span>{item.lane}</span><b>{item.difficulty}</b></div>
              <h3>{item.target}</h3>
              <p>{item.value}</p>
              <small>{item.nextStep}</small>
            </article>
          ))}
        </div>
        <p className="source-note">Showing the top 8 connector moves from {sourcePriorities.length} tracked source tasks. Keep this queue tight so the page stays operational instead of becoming a full backlog.</p>
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

function LocalFinancialDocumentsPanel() {
  const latestBudget = localFinancialDocumentsSeed.documents.find((doc) => doc.type === 'Budget Report');
  const latestFinancial = localFinancialDocumentsSeed.documents.find((doc) => doc.type === 'Financial Report');

  return (
    <section className="panel local-finance-documents-panel" aria-label="Waynesboro public budget and financial report source index">
      <div className="panel-head">
        <div>
          <span className="eyebrow">LOCAL FINANCE DOCUMENTS · PUBLIC PORTAL</span>
          <h2>Waynesboro budget and financial-report PDFs are now indexed before dollar claims</h2>
        </div>
        <span className="terminal-badge live">DOC INDEX SEED</span>
      </div>
      <div className="local-finance-summary">
        <article>
          <span>Observed portal rows</span>
          <b>{localFinancialDocumentsSeed.observedShape.rowsObserved}</b>
          <small>{localFinancialDocumentsSeed.entity} · FY {localFinancialDocumentsSeed.observedShape.fiscalYears.join(', ')}</small>
        </article>
        <article>
          <span>Latest budget route</span>
          <b>FY {latestBudget?.fiscalYear || 'N/A'}</b>
          <small>{latestBudget?.filename || 'No linked budget found'}</small>
        </article>
        <article>
          <span>Latest financial route</span>
          <b>FY {latestFinancial?.fiscalYear || 'N/A'}</b>
          <small>{latestFinancial?.filename || 'No linked report found'}</small>
        </article>
      </div>
      <div className="local-finance-doc-grid">
        {localFinancialDocumentsSeed.documents.map((doc) => (
          <a href={doc.url} target="_blank" rel="noreferrer" key={doc.filename}>
            <span>FY {doc.fiscalYear} · {doc.type}</span>
            <b>{doc.filename}</b>
            <small>{doc.posture}</small>
          </a>
        ))}
      </div>
      <div className="local-finance-actions">
        {localFinancialDocumentsSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{localFinancialDocumentsSeed.caveat} Source-checked from {localFinancialDocumentsSeed.provider}; retrieved {new Date(localFinancialDocumentsSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function EconomicSourceBridge() {
  return (
    <section className="economic-source-bridge" aria-label="economic data source bridge">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">ECONOMIC DATA BRIDGE</span>
          <h3>Census CBP connector scoped for county business baselines</h3>
        </div>
        <span className="terminal-badge gold">KEY REQUIRED</span>
      </div>
      <div className="cbp-query-grid">
        {economicSourceSeed.queryTemplates.map((query) => (
          <a key={query.naics} href={query.url} target="_blank" rel="noreferrer">
            <span>NAICS {query.naics}</span>
            <b>{query.label}</b>
            <small>{query.use}</small>
          </a>
        ))}
      </div>
      <p>{economicSourceSeed.caveat}</p>
    </section>
  );
}

function BusinessSurfacePanel() {
  const sourceCards = businessSurfaceSeed.surfaces.slice(0, 6);
  return (
    <section className="business-surface-panel" aria-label="official Waynesboro business source surface">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">CITY BUSINESS SOURCE SURFACE</span>
          <h3>Official pages now route economic drilldowns before license data is connected</h3>
        </div>
        <span className="terminal-badge gold">PUBLIC LINKS</span>
      </div>
      <div className="business-source-grid">
        {sourceCards.map((source) => (
          <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.dataType.split(':')[0]}</span>
            <b>{source.label}</b>
            <small>{source.integrationUse}</small>
          </a>
        ))}
      </div>
      <p>{businessSurfaceSeed.caveat}</p>
    </section>
  );
}

function LaborForceSourcePanel() {
  return (
    <section className="labor-force-panel" aria-label="Burke County labor force public source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">WORKFORCE SOURCE SNAPSHOT</span>
          <h3>BLS LAUS county labor context refreshed from public API with credential fallback status</h3>
        </div>
        <span className="terminal-badge live">BLS PUBLIC API</span>
      </div>
      <div className="labor-force-grid">
        {laborForceSeed.series.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayValue}</b>
            <small>{metric.latestPeriod} · {metric.id}</small>
          </article>
        ))}
      </div>
      <div className="labor-query-row">
        {laborForceSeed.queryTemplates.map((query) => (
          <a key={query.label} href={query.url} target="_blank" rel="noreferrer">{query.label}</a>
        ))}
      </div>
      <p>{laborForceSeed.caveat} Retrieved {new Date(laborForceSeed.retrievedAt).toLocaleString()} · {laborForceSeed.revisionNote}</p>
    </section>
  );
}

function IncomeDistributionPanel() {
  const under50 = incomeDistributionSeed.rollups.find((item) => item.id === 'under-50k');
  const over100 = incomeDistributionSeed.rollups.find((item) => item.id === '100k-plus');

  return (
    <section className="income-distribution-panel" aria-label="ACS household income distribution context">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">HOUSEHOLD INCOME DISTRIBUTION · ACS CONTEXT</span>
          <h3>B19001 bracket seed adds affordability context without tax-record claims</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="income-rollup-grid">
        <article>
          <span>{under50?.label}</span>
          <b>{under50?.displayShare}</b>
          <small>{under50?.estimate.toLocaleString()} households · MOE ±{under50?.moe.toLocaleString()}</small>
        </article>
        <article>
          <span>{over100?.label}</span>
          <b>{over100?.displayShare}</b>
          <small>{over100?.estimate.toLocaleString()} households · MOE ±{over100?.moe.toLocaleString()}</small>
        </article>
        <article>
          <span>Total households</span>
          <b>{incomeDistributionSeed.totals.households.toLocaleString()}</b>
          <small>MOE ±{incomeDistributionSeed.totals.householdMoe.toLocaleString()} · {incomeDistributionSeed.release.name}</small>
        </article>
      </div>
      <div className="income-bracket-grid">
        {incomeDistributionSeed.brackets.map((bracket) => (
          <article key={bracket.id}>
            <div>
              <span>{bracket.label}</span>
              <b>{bracket.displayShare}</b>
            </div>
            <div className="income-share-bar"><span style={{ width: bracket.displayShare }} /></div>
            <small>{bracket.estimate.toLocaleString()} households · MOE ±{bracket.moe.toLocaleString()} · {bracket.planningUse}</small>
          </article>
        ))}
      </div>
      <div className="income-next-actions">
        {incomeDistributionSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{incomeDistributionSeed.caveat} Retrieved {new Date(incomeDistributionSeed.retrievedAt).toLocaleDateString()} from Census Reporter table {incomeDistributionSeed.table}.</p>
    </section>
  );
}

function SalesTaxDistributionPanel() {
  return (
    <section className="sales-tax-panel" aria-label="Georgia DOR sales tax distribution source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">LOCAL REVENUE ROUTE · SOURCE-GATED</span>
          <h3>{salesTaxDistributionSeed.sourceName}</h3>
        </div>
        <span className="terminal-badge gold">ROW PARSE PENDING</span>
      </div>
      <div className="sales-tax-source-grid">
        {salesTaxDistributionSeed.sources.map((source) => (
          <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.cadence}</span>
            <b>{source.label}</b>
            <small>{source.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="sales-tax-next">
        {salesTaxDistributionSeed.nextSteps.map((step) => <span key={step}>{step}</span>)}
      </div>
      <p>{salesTaxDistributionSeed.caveat}</p>
    </section>
  );
}

function EducationWorkforcePanel() {
  return (
    <section className="education-workforce-panel" aria-label="education and workforce source routing panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">EDUCATION / WORKFORCE ROUTE · SOURCE-GATED</span>
          <h3>GaDOE source paths now frame school-district and talent-pipeline context</h3>
        </div>
        <span className="terminal-badge gold">ROUTE INDEX</span>
      </div>
      <div className="education-route-grid">
        {educationWorkforceSeed.routes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.dataType}</span>
            <b>{route.label}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="education-next-steps">
        {educationWorkforceSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{educationWorkforceSeed.caveat} Retrieved {new Date(educationWorkforceSeed.retrievedAt).toLocaleDateString()} · {educationWorkforceSeed.geography}</p>
    </section>
  );
}

function SchoolEnrollmentPanel() {
  const topLevels = schoolEnrollmentSeed.levels.filter((level) => ['preschool', 'grades-5-8', 'grades-9-12', 'college-undergrad'].includes(level.id));
  return (
    <section className="education-workforce-panel" aria-label="ACS school enrollment source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">SCHOOL ENROLLMENT · ACS CONTEXT</span>
          <h3>B14001 adds a public service-demand lens before school-district exports are integrated</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="labor-force-grid">
        <article>
          <span>Enrollment universe</span>
          <b>{schoolEnrollmentSeed.totalPopulation3Plus.displayValue}</b>
          <small>Population age 3+ · MOE {schoolEnrollmentSeed.totalPopulation3Plus.displayMoe}</small>
        </article>
        <article>
          <span>Enrolled in school</span>
          <b>{schoolEnrollmentSeed.enrolled.displayShare}</b>
          <small>{schoolEnrollmentSeed.enrolled.displayValue} residents · MOE {schoolEnrollmentSeed.enrolled.displayMoe}</small>
        </article>
        {topLevels.map((level) => (
          <article key={level.id}>
            <span>{level.label}</span>
            <b>{level.displayShare}</b>
            <small>{level.displayValue} estimate · MOE {level.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="education-route-grid">
        {schoolEnrollmentSeed.comparison.map((row) => (
          <a key={row.geography} href={schoolEnrollmentSeed.sourceUrl} target="_blank" rel="noreferrer">
            <span>{row.geography}</span>
            <b>{row.enrolledShare} enrolled</b>
            <small>{row.enrolled.toLocaleString()} of {row.universe.toLocaleString()} age 3+ · MOE ±{row.enrolledMoe.toLocaleString()}</small>
          </a>
        ))}
      </div>
      <div className="education-next-steps">
        {schoolEnrollmentSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{schoolEnrollmentSeed.caveat} Release: {schoolEnrollmentSeed.release.name} ({schoolEnrollmentSeed.release.years}); retrieved {new Date(schoolEnrollmentSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function LehdCommutingPanel() {
  return (
    <section className="lehd-commuting-panel" aria-label="LEHD commuting and jobs source routing panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">WORKFORCE / COMMUTING · SOURCE ROUTE</span>
          <h3>Census LEHD can replace guesswork on jobs and commuter flows</h3>
        </div>
        <span className="terminal-badge gold">BLOCK AGGREGATION PENDING</span>
      </div>
      <div className="lehd-route-grid">
        {lehdCommutingSeed.sourceRoutes.map((route) => (
          <a key={route.table} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.table} · {route.observedStatus}</span>
            <b>{route.label}</b>
            <small>{route.observedSize} · modified {route.lastModified}</small>
          </a>
        ))}
      </div>
      <div className="lehd-shape-strip">
        {lehdCommutingSeed.normalizedShape.slice(0, 8).map((field) => <span key={field}>{field}</span>)}
      </div>
      <div className="lehd-next-steps">
        {lehdCommutingSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{lehdCommutingSeed.caveat} Retrieved {new Date(lehdCommutingSeed.retrievedAt).toLocaleString()} from public Census LEHD/LODES file routes.</p>
    </section>
  );
}

function WorkforceEducationPanel() {
  const primary = workforceEducationSeed.metrics.filter((metric) => ['high-school-or-higher', 'bachelor-or-higher', 'labor-force', 'acs-unemployed'].includes(metric.id));
  return (
    <section className="workforce-education-panel" aria-label="ACS workforce and education source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">WORKFORCE EDUCATION · ACS CONTEXT</span>
          <h3>City-level attainment and labor-force context is now source-labeled</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="workforce-education-grid">
        {primary.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.percent ? `${metric.percent.toFixed(1)}%` : metric.displayValue}</b>
            <small>{metric.displayValue} estimate{metric.moe ? ` · MOE ±${metric.moe}` : ''} · {metric.table}</small>
          </article>
        ))}
      </div>
      <div className="workforce-table-routes">
        {workforceEducationSeed.tables.map((route) => (
          <a key={route.table} href={workforceEducationSeed.queryUrl} target="_blank" rel="noreferrer">
            <span>{route.table}</span>
            <b>{route.label}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="workforce-next-actions">
        {workforceEducationSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{workforceEducationSeed.caveat} Release: {workforceEducationSeed.release.name} ({workforceEducationSeed.release.years}); retrieved {new Date(workforceEducationSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function IndustryEmploymentPanel() {
  const topSectors = industryEmploymentSeed.sectors.slice(0, 5);
  const maxShare = Math.max(...topSectors.map((sector) => sector.share));
  return (
    <section className="industry-employment-panel" aria-label="ACS industry employment source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">INDUSTRY EMPLOYMENT · ACS CONTEXT</span>
          <h3>C24030 adds a source-labeled workforce-cluster lens before employer or license data exists</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="industry-summary-grid">
        <article>
          <span>Universe</span>
          <b>{industryEmploymentSeed.universe.displayValue}</b>
          <small>{industryEmploymentSeed.universe.label} · MOE ±{industryEmploymentSeed.universe.moe.toLocaleString()}</small>
        </article>
        {industryEmploymentSeed.comparisonRows.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.leadingSectorShare.toFixed(1)}%</b>
            <small>{row.leadingSector} leads; second: {row.secondSector} {row.secondSectorShare.toFixed(1)}%</small>
          </article>
        ))}
      </div>
      <div className="industry-sector-list">
        {topSectors.map((sector) => (
          <article key={sector.id}>
            <div>
              <span>{sector.label}</span>
              <b>{sector.share.toFixed(1)}%</b>
            </div>
            <div className="industry-share-bar"><span style={{ width: `${(sector.share / maxShare) * 100}%` }} /></div>
            <small>{sector.displayValue} estimate · MOE ±{sector.moe.toLocaleString()} · Burke {sector.comparison.burkeCountyShare.toFixed(1)}% / GA {sector.comparison.georgiaShare.toFixed(1)}%</small>
          </article>
        ))}
      </div>
      <div className="industry-next-actions">
        {industryEmploymentSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{industryEmploymentSeed.caveat} Release: {industryEmploymentSeed.release.name} ({industryEmploymentSeed.release.years}); retrieved {new Date(industryEmploymentSeed.retrievedAt).toLocaleDateString()} from Census Reporter table {industryEmploymentSeed.table.id}.</p>
    </section>
  );
}

function OccupationEmploymentPanel() {
  const topOccupations = occupationEmploymentSeed.occupations.slice(0, 5);
  const maxShare = Math.max(...topOccupations.map((occupation) => occupation.share));
  return (
    <section className="occupation-employment-panel" aria-label="ACS occupation employment source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">OCCUPATION MIX · ACS CONTEXT</span>
          <h3>C24010 adds a worker-role lens before employer, payroll, or job-posting data exists</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="occupation-summary-grid">
        <article>
          <span>Universe</span>
          <b>{occupationEmploymentSeed.universe.displayValue}</b>
          <small>{occupationEmploymentSeed.universe.label} · MOE {occupationEmploymentSeed.universe.displayMoe}</small>
        </article>
        {occupationEmploymentSeed.comparisonRows.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.displayShare}</b>
            <small>{row.topOccupation} leads · universe {row.universe}</small>
          </article>
        ))}
      </div>
      <div className="occupation-role-list">
        {topOccupations.map((occupation) => (
          <article key={occupation.id}>
            <div>
              <span>{occupation.label}</span>
              <b>{occupation.displayShare}</b>
            </div>
            <div className="occupation-share-bar"><span style={{ width: `${(occupation.share / maxShare) * 100}%` }} /></div>
            <small>{occupation.displayValue} estimate · MOE ±{occupation.moe.toLocaleString()} · source fields {occupation.sourceFields.join(' + ')}</small>
          </article>
        ))}
      </div>
      <div className="occupation-next-actions">
        {occupationEmploymentSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{occupationEmploymentSeed.caveat} Release: {occupationEmploymentSeed.release.name} ({occupationEmploymentSeed.release.years}); retrieved {new Date(occupationEmploymentSeed.retrievedAt).toLocaleDateString()} from Census Reporter table {occupationEmploymentSeed.table.id}.</p>
    </section>
  );
}

function CommuteProfilePanel() {
  const primary = commuteProfileSeed.metrics.filter((metric) => ['drove-alone', 'worked-from-home', 'commute-under-15', 'commute-45-plus'].includes(metric.id));
  return (
    <section className="commute-profile-panel" aria-label="ACS commute profile source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">COMMUTE PROFILE · ACS CONTEXT</span>
          <h3>Census Reporter adds source-labeled journey-to-work context</h3>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="commute-profile-grid">
        {primary.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.percent ? `${metric.percent.toFixed(1)}%` : metric.displayValue}</b>
            <small>{metric.displayValue} estimate{metric.moe ? ` · MOE ±${metric.moe}` : ''} · {metric.table}</small>
          </article>
        ))}
      </div>
      <div className="commute-route-grid">
        {commuteProfileSeed.tableRoutes.map((route) => (
          <a key={route.table} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.table}</span>
            <b>{route.label}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="commute-next-actions">
        {commuteProfileSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{commuteProfileSeed.caveat} Release: {commuteProfileSeed.release.name} ({commuteProfileSeed.release.years}); retrieved through Census Reporter.</p>
    </section>
  );
}

function FederalFundingPanel() {
  const money = (value) => `$${(value / 1000000).toFixed(value >= 10000000 ? 1 : 2)}M`;
  return (
    <section className="federal-funding-panel" aria-label="USAspending federal funding source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">FEDERAL FUNDING CONTEXT · SOURCE-GATED</span>
          <h3>USAspending exposes Burke County place-of-performance obligations</h3>
        </div>
        <span className="terminal-badge live">PUBLIC API</span>
      </div>
      <div className="funding-summary-grid">
        <article><span>FY{federalSpendingSeed.fiscalYear} obligations</span><b>{money(federalSpendingSeed.totals.totalObligations)}</b><small>{federalSpendingSeed.geography}</small></article>
        <article><span>Grant obligations</span><b>{money(federalSpendingSeed.totals.grantObligations)}</b><small>Requires award-level recipient review before local use.</small></article>
        <article><span>Contract obligations</span><b>{money(federalSpendingSeed.totals.contractObligations)}</b><small>County context, not a city procurement claim.</small></article>
      </div>
      <div className="funding-quarter-grid">
        {federalSpendingSeed.quarters.map((quarter) => (
          <article key={quarter.label}>
            <span>{quarter.label}</span>
            <b>{money(quarter.total)}</b>
            <small>Grants {money(quarter.grants)} · contracts {money(quarter.contracts)}</small>
          </article>
        ))}
      </div>
      <div className="funding-next-steps">
        {federalSpendingSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{federalSpendingSeed.caveat} Retrieved {new Date(federalSpendingSeed.retrievedAt).toLocaleDateString()} from {federalSpendingSeed.sourceName}.</p>
    </section>
  );
}

function CityPermittingIntakePanel() {
  return (
    <section className="permitting-intake-panel" aria-label="City permitting and planning intake source panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">DEVELOPMENT INTAKE · OFFICIAL CITY ROUTES</span>
          <h3>Permits, planning, licenses, and records requests</h3>
        </div>
        <span className="terminal-badge gold">SOURCE ROUTES ONLY</span>
      </div>
      <div className="permit-route-grid">
        {cityPermittingSeed.routes.slice(0, 4).map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.dataType}</span>
            <b>{route.label}</b>
            <small>Last sitemap update {route.lastmod} · {route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="permit-next-steps">
        {cityPermittingSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p>{cityPermittingSeed.caveat}</p>
    </section>
  );
}

function EconomicEvidenceStrip() {
  const cards = [
    {
      label: 'County labor',
      value: laborForceSeed.series.find((metric) => metric.id === 'unemployment-rate')?.displayValue || 'Seeded',
      detail: 'BLS LAUS county context; not city-level unemployment.'
    },
    {
      label: 'City workforce',
      value: workforceEducationSeed.metrics.find((metric) => metric.id === 'high-school-or-higher')?.percent?.toFixed(1) + '%',
      detail: 'ACS attainment/labor-force context with MOE visible.'
    },
    {
      label: 'Industry lens',
      value: industryEmploymentSeed.sectors[0]?.share.toFixed(1) + '%',
      detail: `${industryEmploymentSeed.sectors[0]?.label} leads ACS C24030; not employer payroll.`
    },
    {
      label: 'Occupation lens',
      value: occupationEmploymentSeed.occupations[0]?.displayShare,
      detail: `${occupationEmploymentSeed.occupations[0]?.label} leads ACS C24010; not job postings.`
    }
  ];

  return (
    <section className="economic-evidence-strip" aria-label="economic page evidence hierarchy">
      <div>
        <span className="eyebrow">ECONOMIC EVIDENCE LADDER</span>
        <h2>Source-backed context now sits above synthetic prospect tables</h2>
        <p>Use this page from verified/seeded workforce context toward harder local records: permits, business licenses, property, DCA project records, and official finance documents.</p>
      </div>
      <div className="economic-evidence-cards">
        {cards.map((card) => (
          <article key={card.label}>
            <span>{card.label}</span>
            <b>{card.value}</b>
            <small>{card.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function EconomicDevelopment() {
  const driRecord = regionalDevelopmentSeed.records[0];
  return (
    <section id="economic" className="module economic-module">
      <EconomicEvidenceStrip />
      <DataTable
        title="Ranked Development Pipeline"
        eyebrow="ECONOMIC DEVELOPMENT"
        rows={economicPipeline}
        badge="SYNTHETIC PIPELINE"
        note="Prospect ranking is demo architecture only; DCA DRI, city permits, business records, and source-labeled project documents must be attached before public project claims."
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
          <div><b>Active business licenses</b><span>Synthetic placeholder · official licenses/permits path indexed</span></div>
          <div><b>New businesses</b><span>Synthetic placeholder · directory/source surface ready for normalization</span></div>
          <div><b>Business closures</b><span>Synthetic placeholder · requires official export or records request</span></div>
          <div><b>Largest employers</b><span>Government, healthcare, education, industrial employers</span></div>
          <div><b>Available commercial property</b><span>11 tracked spaces · 4 redevelopment-grade</span></div>
          <div><b>Industrial sites</b><span>3 priority pads · utilities diligence required</span></div>
        </div>
        <BusinessSurfacePanel />
        <CityPermittingIntakePanel />
        <LaborForceSourcePanel />
        <IncomeDistributionPanel />
        <EducationWorkforcePanel />
        <SchoolEnrollmentPanel />
        <WorkforceEducationPanel />
        <IndustryEmploymentPanel />
        <OccupationEmploymentPanel />
        <LehdCommutingPanel />
        <CommuteProfilePanel />
        <FederalFundingPanel />
        <SalesTaxDistributionPanel />
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
        <EconomicSourceBridge />
      </section>
    </section>
  );
}

function DowntownCommandCenter() {
  const civicAssets = osmCivicAssetsSeed.assets.slice(0, 5);
  const mapSources = cityMapSourceSeed.links.slice(0, 5);
  const latValues = civicAssets.map((asset) => asset.lat);
  const lonValues = civicAssets.map((asset) => asset.lon);
  const bounds = {
    minLat: Math.min(...latValues) - 0.006,
    maxLat: Math.max(...latValues) + 0.006,
    minLon: Math.min(...lonValues) - 0.006,
    maxLon: Math.max(...lonValues) + 0.006
  };
  const projectAsset = (asset) => ({
    left: `${12 + ((asset.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 76}%`,
    top: `${12 + ((bounds.maxLat - asset.lat) / (bounds.maxLat - bounds.minLat)) * 70}%`
  });

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
        <div className="city-map evidence-map" aria-label="Cached civic anchor map for Waynesboro">
          <div className="gridlines" />
          <div className="map-route route-liberty" />
          <div className="map-route route-sixth" />
          <div className="map-zone zone-downtown">Downtown core</div>
          <div className="map-zone zone-health">Health / services</div>
          {downtownProperties.map((p, index) => <button key={p.name} className={`map-node parcel-node node-${index}`} type="button"><span>Mock parcel</span>{p.name}</button>)}
          {civicAssets.map((asset, index) => (
            <a
              key={asset.id}
              className={`asset-marker asset-${asset.type} asset-index-${index}`}
              href={`https://www.openstreetmap.org/${asset.osmElement}`}
              target="_blank"
              rel="noreferrer"
              style={projectAsset(asset)}
              title={`${asset.name} · ${asset.type}`}
            >
              <span>{asset.type}</span>
              <b>{asset.name}</b>
            </a>
          ))}
          <span className="map-label label-a">schematic corridor</span>
          <span className="map-label label-b">orientation axis</span>
          <span className="map-label label-c">redevelopment study area</span>
          <div className="map-disclaimer">Relative OSM anchor plot + schematic parcel layer · not survey/GIS accurate · no Mapbox requests</div>
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
        <div className="city-map-source-stack" aria-label="official city map source stack">
          <div className="civic-asset-head">
            <span className="eyebrow">OFFICIAL CITY MAP SOURCE STACK</span>
            <b>{cityMapSourceSeed.links.length} public map references indexed from City Maps</b>
          </div>
          <div className="city-map-source-list">
            {mapSources.map((source) => (
              <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
                <span>{source.type}</span>
                <b>{source.label}</b>
                <small>{source.integrationUse}</small>
              </a>
            ))}
          </div>
          <p>{cityMapSourceSeed.caveat}</p>
        </div>
      </section>
      <DataTable
        title="Storefront Intelligence"
        eyebrow="OCCUPANCY / OWNERSHIP / TRAFFIC"
        rows={downtownProperties}
        badge="SCHEMATIC MOCK"
        note="Storefront rows are presentation placeholders until parcel, business-directory, DDA, qPublic/export, or field-verified records are attached."
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

function TransportationProjectSourcePanel() {
  return (
    <section className="panel transportation-project-panel" aria-label="transportation project source routing">
      <div className="panel-head">
        <div>
          <span className="eyebrow">TRANSPORTATION PROJECT SOURCE</span>
          <h2>GDOT GeoPI queued before road-project claims</h2>
        </div>
        <span className="terminal-badge gold">FILTER PENDING</span>
      </div>
      <div className="transport-project-grid">
        {transportationProjectSeed.routes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.label}</span>
            <b>{route.dataType}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
        <article>
          <span>Observed public shape</span>
          <b>{transportationProjectSeed.observedShape.pageTitle}</b>
          <small>{transportationProjectSeed.observedShape.dashboardStatus} · map surface also reached.</small>
        </article>
      </div>
      <div className="transport-project-actions">
        {transportationProjectSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{transportationProjectSeed.caveat} Retrieved {new Date(transportationProjectSeed.retrievedAt).toLocaleDateString()} from public GDOT surfaces.</p>
    </section>
  );
}

function WeatherReadinessPanel() {
  const forecastPeriods = weatherForecastSnapshot.periods.slice(0, 4);

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
      <div className="forecast-snapshot" aria-label="cached NWS forecast snapshot">
        <div className="forecast-snapshot-head">
          <div>
            <span className="eyebrow">CACHED GRIDPOINT FORECAST</span>
            <h3>{weatherForecastSnapshot.periodCount} NWS periods cached for source-labeled public works / event readiness</h3>
          </div>
          <div className="forecast-meta">
            <b>{new Date(weatherForecastSnapshot.generatedAt || weatherForecastSnapshot.fetchedAt).toLocaleString()}</b>
            <small>{weatherForecastSnapshot.geography}</small>
            <a href={weatherForecastSnapshot.sourceUrl} target="_blank" rel="noreferrer">Open NWS forecast endpoint</a>
          </div>
        </div>
        <div className="forecast-period-grid">
          {forecastPeriods.map((period) => (
            <article key={period.number}>
              <span>{period.name}</span>
              <b>{period.temperature}°{period.temperatureUnit}</b>
              <small>{period.shortForecast}</small>
              <em>{period.windSpeed} {period.windDirection}{period.probabilityOfPrecipitation != null ? ` · ${period.probabilityOfPrecipitation}% precip.` : ''}</em>
            </article>
          ))}
        </div>
        <p>{weatherForecastSnapshot.caveat}</p>
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

function WaterSystemsPanel() {
  const primarySystem = waterSystemsSeed.systemsServingWaynesboro.find((system) => system.pwsName === 'WAYNESBORO');
  const smallSystems = waterSystemsSeed.systemsServingWaynesboro.filter((system) => system.pwsName !== 'WAYNESBORO').slice(0, 5);

  return (
    <section className="panel water-system-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">DRINKING WATER SOURCE SNAPSHOT</span>
          <h2>EPA ECHO / SDWIS public water-system identity</h2>
        </div>
        <span className="terminal-badge live">PWSID SEED</span>
      </div>
      <div className="water-system-primary">
        <article>
          <span>Primary community system</span>
          <b>{primarySystem?.pwsName || 'Waynesboro system pending'}</b>
          <small>{primarySystem?.pwsId || 'PWSID pending'} · {primarySystem?.pwsType || 'type pending'} · {primarySystem?.primarySource || 'source pending'}</small>
        </article>
        <article>
          <span>Population served</span>
          <b>{primarySystem ? primarySystem.populationServed.toLocaleString() : 'N/A'}</b>
          <small>EPA ECHO/SDWIS field, not a live city utility count.</small>
        </article>
        <article>
          <span>Query scope</span>
          <b>{waterSystemsSeed.query.returnedRows} active Burke systems</b>
          <small>Filtered display: systems listing Waynesboro as served city.</small>
        </article>
      </div>
      <div className="water-system-list">
        {smallSystems.map((system) => (
          <article key={system.pwsId}>
            <span>{system.pwsId}</span>
            <b>{system.pwsName}</b>
            <small>{system.pwsType} · pop. {system.populationServed.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p className="source-note">{waterSystemsSeed.caveat} Retrieved {new Date(waterSystemsSeed.retrievedAt).toLocaleString()} from a public EPA ECHO SDWIS REST query.</p>
    </section>
  );
}

function StateDrinkingWaterPanel() {
  return (
    <section className="panel state-water-panel" aria-label="Georgia EPD drinking water verification routes">
      <div className="panel-head">
        <div>
          <span className="eyebrow">STATE WATER VERIFICATION</span>
          <h2>Georgia EPD route added before water-quality claims</h2>
        </div>
        <span className="terminal-badge gold">VERIFY BEFORE USE</span>
      </div>
      <div className="state-water-grid">
        {stateDrinkingWaterSeed.routes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.type}</span>
            <b>{route.label}</b>
            <small>{route.status} · {route.use}</small>
          </a>
        ))}
      </div>
      <div className="state-water-shape">
        {stateDrinkingWaterSeed.normalizedShape.map((field) => <span key={field}>{field}</span>)}
      </div>
      <div className="state-water-next">
        {stateDrinkingWaterSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{stateDrinkingWaterSeed.caveat} Retrieved {new Date(stateDrinkingWaterSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function UtilityRateReferencePanel() {
  return (
    <section className="panel utility-rate-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">UTILITY RATE / WATER REFERENCES</span>
          <h2>Official city pages now separate source links from operating guesses</h2>
        </div>
        <span className="terminal-badge gold">REFERENCE INDEX</span>
      </div>
      <div className="utility-reference-grid">
        {utilityRateSeed.references.map((ref) => (
          <a href={ref.url} target="_blank" rel="noreferrer" key={ref.label}>
            <span>{ref.type}</span>
            <b>{ref.label}</b>
            <small>{ref.integrationUse}</small>
          </a>
        ))}
      </div>
      <p className="source-note">{utilityRateSeed.caveat} Retrieved/source-checked {new Date(utilityRateSeed.retrievedAt).toLocaleDateString()} from public City of Waynesboro pages.</p>
    </section>
  );
}

function CleanWaterPermitPanel() {
  const statusCounts = cleanWaterPermitSeed.facilities.reduce((counts, facility) => {
    counts[facility.permitStatus] = (counts[facility.permitStatus] || 0) + 1;
    return counts;
  }, {});

  return (
    <section className="panel clean-water-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">CLEAN WATER PERMIT SOURCE</span>
          <h2>EPA ECHO facility identity seed for Burke / Waynesboro</h2>
        </div>
        <span className="terminal-badge live">PUBLIC REST</span>
      </div>
      <div className="clean-water-summary">
        <article><span>County query rows</span><b>{cleanWaterPermitSeed.query.queryRows}</b><small>Active Burke County CWA facility query</small></article>
        <article><span>Current violation rows</span><b>{cleanWaterPermitSeed.query.currentViolationRows}</b><small>Summary count from ECHO response; verify before citing</small></article>
        <article><span>Waynesboro sample</span><b>{cleanWaterPermitSeed.facilities.length}</b><small>{statusCounts.Effective || 0} effective · {statusCounts.Expired || 0} expired in cached sample</small></article>
      </div>
      <div className="clean-water-list">
        {cleanWaterPermitSeed.facilities.map((facility) => (
          <article key={facility.sourceId}>
            <div><span>{facility.sourceId}</span><b>{facility.name}</b><small>{facility.address} · {facility.permitStatus}{facility.masterPermitNumber ? ` · ${facility.masterPermitNumber}` : ''}</small></div>
            <em>{facility.statute}</em>
          </article>
        ))}
      </div>
      <p className="source-note">{cleanWaterPermitSeed.caveat} Retrieved {new Date(cleanWaterPermitSeed.retrievedAt).toLocaleString()} from EPA ECHO; this panel is a public source path, not a municipal environmental claim.</p>
    </section>
  );
}

function HazardousWasteSourcePanel() {
  const waynesboroRows = hazardousWasteSeed.facilities.filter((facility) => facility.address.includes('Waynesboro'));
  return (
    <section className="panel hazardous-waste-panel" aria-label="EPA RCRA hazardous waste source routing">
      <div className="panel-head">
        <div>
          <span className="eyebrow">RCRA / HAZARDOUS WASTE SOURCE</span>
          <h2>EPA ECHO handler identity seed for environmental context</h2>
        </div>
        <span className="terminal-badge live">PUBLIC REST SEED</span>
      </div>
      <div className="hazardous-waste-summary">
        <article><span>County query rows</span><b>{hazardousWasteSeed.query.queryRows}</b><small>Active Burke County RCRA handler query</small></article>
        <article><span>Waynesboro sample</span><b>{waynesboroRows.length}</b><small>Cached public identity rows, not a complete inventory</small></article>
        <article><span>Violation rows</span><b>{hazardousWasteSeed.query.currentViolationRows}</b><small>Summary metadata only; profile QA required before citing</small></article>
      </div>
      <div className="hazardous-waste-list">
        {hazardousWasteSeed.facilities.map((facility) => (
          <article key={facility.sourceId}>
            <div>
              <span>{facility.sourceId} · {facility.universe}</span>
              <b>{facility.name}</b>
              <small>{facility.address} · {facility.complianceStatus}</small>
            </div>
            <em>{facility.significantNoncomplier === 'No' ? 'No SNC' : 'Review'}</em>
          </article>
        ))}
      </div>
      <div className="hazardous-waste-actions">
        {hazardousWasteSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{hazardousWasteSeed.caveat} Retrieved {new Date(hazardousWasteSeed.retrievedAt).toLocaleString()} from EPA ECHO RCRA REST Services.</p>
    </section>
  );
}

function HazardResiliencePanel() {
  const sampleEvent = stormEventsSeed.sampleEvents[0];
  return (
    <section className="panel hazard-resilience-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HAZARD / RESILIENCE SOURCE ROUTING</span>
          <h2>Flood and storm-history sources queued before map claims</h2>
        </div>
        <span className="terminal-badge gold">SOURCE STUB</span>
      </div>
      <div className="hazard-source-grid">
        {hazardResilienceSeed.sources.map((source) => (
          <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.shortLabel}</span>
            <b>{source.status}</b>
            <small>{source.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="storm-event-snapshot" aria-label="NOAA storm events seed snapshot">
        <div>
          <span className="eyebrow">NOAA STORM EVENTS SEED</span>
          <h3>{stormEventsSeed.observedShape.rowsMatched} Burke County row found in {stormEventsSeed.observedShape.year}</h3>
          <p>{stormEventsSeed.geography}</p>
        </div>
        <article>
          <span>{sampleEvent.beginDateTime}</span>
          <b>{sampleEvent.eventType}</b>
          <small>{sampleEvent.note}</small>
        </article>
        <article>
          <span>Connector posture</span>
          <b>CSV filter proven</b>
          <small>{stormEventsSeed.sourceFile}</small>
        </article>
      </div>
      <p className="source-note">{hazardResilienceSeed.caveat} {stormEventsSeed.caveat}</p>
    </section>
  );
}

function HydrologySourcePanel() {
  const primarySite = usgsHydrologySeed.activeStreamSites.find((site) => site.stationName.includes('BRIER CREEK')) || usgsHydrologySeed.activeStreamSites[0];

  return (
    <section className="panel hydrology-source-panel" aria-label="USGS hydrology source inventory">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HYDROLOGY / STORMWATER SOURCE</span>
          <h2>USGS active stream-gage inventory for Burke County</h2>
        </div>
        <span className="terminal-badge live">PUBLIC NWIS</span>
      </div>
      <div className="hydrology-summary-grid">
        <article>
          <span>Query result</span>
          <b>{usgsHydrologySeed.query.returnedRows} active stream sites</b>
          <small>{usgsHydrologySeed.query.countyCd} county code · {usgsHydrologySeed.query.siteType} site type</small>
        </article>
        <article>
          <span>Closest named route</span>
          <b>{primarySite.stationName}</b>
          <small>HUC {primarySite.hydrologicUnit} · drainage area {primarySite.drainageAreaSqMi.toLocaleString()} sq mi</small>
        </article>
        <article>
          <span>Use in OS</span>
          <b>Source inventory only</b>
          <small>Current stage/flow cards require separate timestamped observations and unit QA.</small>
        </article>
      </div>
      <div className="hydrology-site-list">
        {usgsHydrologySeed.activeStreamSites.map((site) => (
          <article key={site.siteNo}>
            <div>
              <span>{site.siteNo} · {site.mapName}</span>
              <b>{site.stationName}</b>
              <small>{site.latitude.toFixed(4)}, {site.longitude.toFixed(4)} · HUC {site.hydrologicUnit}</small>
            </div>
            <em>{site.drainageAreaSqMi.toLocaleString()} sq mi</em>
          </article>
        ))}
      </div>
      <div className="hydrology-next-actions">
        {usgsHydrologySeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{usgsHydrologySeed.caveat} Retrieved {new Date(usgsHydrologySeed.retrievedAt).toLocaleString()} from the public USGS NWIS Site Service.</p>
    </section>
  );
}

function HydrologyObservationsPanel() {
  const streamflowRows = hydrologyObservationsSeed.latestObservations.filter((observation) => observation.parameterCd === '00060');
  const primaryObservation = hydrologyObservationsSeed.latestObservations.find((observation) => observation.siteNo === '02197830' && observation.parameterCd === '00065') || hydrologyObservationsSeed.latestObservations[0];

  return (
    <section className="panel hydrology-observations-panel" aria-label="USGS latest hydrology observations">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HYDROLOGY OBSERVATION SEED</span>
          <h2>Latest USGS point readings added with strict caveats</h2>
        </div>
        <span className="terminal-badge live">PUBLIC IV SNAPSHOT</span>
      </div>
      <div className="hydrology-observation-hero">
        <article>
          <span>Primary local gage</span>
          <b>{primaryObservation.value} {primaryObservation.unit}</b>
          <small>{primaryObservation.stationName} · {primaryObservation.parameterName} · provisional {primaryObservation.qualifiers.join(', ')}</small>
        </article>
        <div>
          <span className="eyebrow">Connector shape</span>
          <h3>{hydrologyObservationsSeed.observedShape.returnedSeries} public observation series across {hydrologyObservationsSeed.observedShape.requestedSites} stations</h3>
          <p>{hydrologyObservationsSeed.geography}</p>
        </div>
      </div>
      <div className="hydrology-observation-grid">
        {streamflowRows.map((row) => (
          <a key={`${row.siteNo}-${row.parameterCd}`} href={row.siteUrl} target="_blank" rel="noreferrer">
            <span>{row.siteNo}</span>
            <b>{row.value} {row.unit}</b>
            <small>{row.stationName} · {new Date(row.dateTime).toLocaleString()} · provisional {row.qualifiers.join(', ')}</small>
          </a>
        ))}
      </div>
      <div className="hydrology-observation-actions">
        {hydrologyObservationsSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{hydrologyObservationsSeed.caveat} Retrieved {new Date(hydrologyObservationsSeed.retrievedAt).toLocaleString()} from the USGS NWIS Instantaneous Values Service.</p>
    </section>
  );
}

function HealthEquitySourcePanel() {
  return (
    <section className="panel health-equity-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HEALTH + RESILIENCE SOURCE</span>
          <h2>CDC PLACES tract estimates scoped for Burke County</h2>
        </div>
        <span className="terminal-badge gold">PUBLIC MODEL DATA</span>
      </div>
      <div className="health-equity-summary">
        <article>
          <span>Observed public shape</span>
          <b>{healthEquitySeed.observedShape.rowsForBurkeCountyObserved} tract-measure rows</b>
          <small>{healthEquitySeed.sourceName}</small>
        </article>
        <article>
          <span>Geography guardrail</span>
          <b>Burke County census tracts</b>
          <small>Not yet a Waynesboro citywide metric; needs tract boundary review.</small>
        </article>
        <article>
          <span>Best use</span>
          <b>Grant and resilience context</b>
          <small>Pair with ACS, hazards, and local service records before Council recommendations.</small>
        </article>
      </div>
      <div className="health-equity-samples">
        {healthEquitySeed.sampleRows.map((row) => (
          <article key={`${row.tract}-${row.measure}`}>
            <span>{row.year} · tract {row.tract}</span>
            <b>{row.measure}</b>
            <em>{row.value} · CI {row.confidenceInterval}</em>
            <small>{row.note}</small>
          </article>
        ))}
      </div>
      <p className="source-note">{healthEquitySeed.caveat}</p>
    </section>
  );
}

function SocialVulnerabilityPanel() {
  return (
    <section className="panel health-equity-panel social-vulnerability-panel" aria-label="CDC social vulnerability source seed">
      <div className="panel-head">
        <div>
          <span className="eyebrow">RESILIENCE / EMERGENCY PLANNING</span>
          <h2>CDC/ATSDR SVI adds tract-level vulnerability context</h2>
        </div>
        <span className="terminal-badge gold">TRACT CONTEXT</span>
      </div>
      <div className="health-equity-summary">
        {socialVulnerabilitySeed.summary.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <b>{item.value}</b>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
      <div className="health-equity-samples">
        {socialVulnerabilitySeed.topTracts.map((tract) => (
          <article key={tract.fips}>
            <span>{tract.fips} · pop. {tract.population.toLocaleString()}</span>
            <b>{tract.tract} · overall {tract.overallPercentile.toFixed(4)}</b>
            <em>Theme percentiles: socioeconomic {tract.socioeconomicPercentile.toFixed(4)} · household {tract.householdCharacteristicsPercentile.toFixed(4)} · housing/transport {tract.housingTransportationPercentile.toFixed(4)}</em>
            <small>Planning flags: {tract.poverty150Share} at/under 150% poverty · {tract.noVehicleShare} no vehicle · {tract.noInternetShare} no internet</small>
          </article>
        ))}
      </div>
      <p className="source-note">{socialVulnerabilitySeed.caveat} Retrieved {new Date(socialVulnerabilitySeed.retrievedAt).toLocaleDateString()} from the public CDC/ATSDR Georgia CSV.</p>
    </section>
  );
}

function FoodAccessSourcePanel() {
  return (
    <section className="panel food-access-panel" aria-label="USDA food access source routing">
      <div className="panel-head">
        <div>
          <span className="eyebrow">FOOD ACCESS / GRANT READINESS</span>
          <h2>USDA ERS tract dataset route indexed before grocery-access claims</h2>
        </div>
        <span className="terminal-badge gold">EXTRACT PENDING</span>
      </div>
      <div className="food-access-grid">
        {foodAccessSeed.observedDownloads.map((source) => (
          <a key={`${source.label}-${source.format}`} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.format} · {source.size}</span>
            <b>{source.label}</b>
            <small>{source.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="food-access-actions">
        {foodAccessSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{foodAccessSeed.caveat} Retrieved {new Date(foodAccessSeed.retrievedAt).toLocaleDateString()} from the USDA ERS download page.</p>
    </section>
  );
}

function PublicSafetySourcePanel() {
  return (
    <section className="panel public-safety-source-panel" aria-label="public safety source routing">
      <div className="panel-head">
        <div>
          <span className="eyebrow">PUBLIC SAFETY SOURCE ROUTING</span>
          <h2>Crime and response cards stay synthetic until agency-level aggregates are verified</h2>
        </div>
        <span className="terminal-badge gold">NO LIVE DISPATCH</span>
      </div>
      <div className="public-safety-source-grid">
        {publicSafetySourceSeed.sources.map((source) => (
          <a key={source.label} href={source.url} target="_blank" rel="noreferrer">
            <span>{source.status}</span>
            <b>{source.label}</b>
            <small>{source.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="public-safety-questions">
        {publicSafetySourceSeed.nextQuestions.map((question) => <span key={question}>{question}</span>)}
      </div>
      <p className="source-note">{publicSafetySourceSeed.posture}</p>
    </section>
  );
}

function OperationsConfidenceStrip() {
  const liveWeather = weatherAlertsSnapshot.featureCount === 0 ? 'Cached no-alert snapshot' : `${weatherAlertsSnapshot.featureCount} cached alert(s)`;
  const primarySystem = waterSystemsSeed.systemsServingWaynesboro.find((system) => system.pwsName === 'WAYNESBORO');
  const safetySources = publicSafetySourceSeed.sources.length;
  const electricHeat = utilityEnergySeed.metrics.find((metric) => metric.id === 'electricity');

  const lanes = [
    {
      label: 'Health cards',
      status: 'Synthetic scores',
      detail: 'Infrastructure, housing, and response metrics are presentation placeholders until official exports exist.',
      tone: 'watch'
    },
    {
      label: 'Weather readiness',
      status: liveWeather,
      detail: `${weatherReadinessSeed.point.countyZone} / ${weatherReadinessSeed.point.forecastZone} public NWS routing cached for briefings.`,
      tone: 'good'
    },
    {
      label: 'Water identity',
      status: primarySystem ? `${primarySystem.pwsId} seed` : 'PWSID pending',
      detail: 'EPA ECHO/SDWIS identity only; no water-quality or live-utility claim promoted.',
      tone: 'good'
    },
    {
      label: 'Energy resilience',
      status: `${electricHeat?.displayShare || 'ACS seeded'} electric heat`,
      detail: 'ACS B25040 is heating-fuel planning context only; no utility account, outage, or rate-affordability claim promoted.',
      tone: 'neutral'
    },
    {
      label: 'Safety sources',
      status: `${safetySources} routes indexed`,
      detail: 'Crime, E-911, fire, and crash data paths are separated from synthetic public-safety counts.',
      tone: 'neutral'
    },
    {
      label: 'Language access',
      status: `${languageAccessSeed.metrics.find((metric) => metric.id === 'language-other-than-english')?.displayShare || 'ACS seeded'} context`,
      detail: 'Census Reporter C16001 supports public-communication planning only; no translation workload or service-demand claim promoted.',
      tone: 'good'
    },
    {
      label: 'Hydrology',
      status: `${usgsHydrologySeed.query.returnedRows} USGS sites`,
      detail: `${hydrologyObservationsSeed.observedShape.returnedSeries} provisional IV series cached; still not flood telemetry or drainage performance.`,
      tone: 'good'
    },
    {
      label: 'SVI resilience',
      status: `${socialVulnerabilitySeed.observedShape.burkeCountyTractsObserved} tract rows`,
      detail: 'CDC/ATSDR SVI is county tract context until Waynesboro boundary overlap is mapped.',
      tone: 'neutral'
    },
    {
      label: 'Environmental permits',
      status: `${hazardousWasteSeed.query.queryRows} RCRA rows`,
      detail: 'EPA ECHO handler identity is source context only; no city inspection, zoning, or violation claim promoted.',
      tone: 'neutral'
    }
  ];

  return (
    <section className="operations-confidence-strip" aria-label="operations lane data confidence">
      <div>
        <span className="eyebrow">OPERATIONS DATA CONFIDENCE</span>
        <h2>Reference layer first; no live telemetry claims</h2>
      </div>
      <div className="operations-confidence-grid">
        {lanes.map((lane) => (
          <article key={lane.label} className={lane.tone}>
            <span>{lane.label}</span>
            <b>{lane.status}</b>
            <small>{lane.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function PublicWorksServiceRoutePanel() {
  const priorityRoutes = publicWorksServiceSeed.routes.filter((route) => [
    'Public works hub',
    'Solid waste',
    'Streets',
    'Storm drainage',
    'Natural gas',
    'Fire department'
  ].includes(route.lane));

  return (
    <section className="panel public-works-route-panel" aria-label="official public works and service route index">
      <div className="panel-head">
        <div>
          <span className="eyebrow">OFFICIAL OPERATIONS ROUTES</span>
          <h2>Public service pages now sit above synthetic system-health cards</h2>
        </div>
        <span className="terminal-badge gold">CITY ROUTE INDEX</span>
      </div>
      <div className="public-works-route-hero">
        <article>
          <span>{publicWorksServiceSeed.status}</span>
          <b>{publicWorksServiceSeed.routes.length} verified routes</b>
          <small>HTTP 200 confirmed · sitemap + department pages · {new Date(publicWorksServiceSeed.retrievedAt).toLocaleDateString()}</small>
          <a href={publicWorksServiceSeed.sourceUrl} target="_blank" rel="noreferrer">Open official sitemap source</a>
        </article>
        <div>
          <h3>What this fixes in the operations lane</h3>
          <p>Before the platform shows infrastructure, safety, streets, drainage, sanitation, or utility health as operating scores, this panel gives the page a visible official-route spine and makes clear what records are still missing.</p>
          <p>{publicWorksServiceSeed.posture}</p>
        </div>
      </div>
      <div className="public-works-route-grid">
        {priorityRoutes.map((route) => (
          <a key={route.lane} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.lane}</span>
            <b>{route.title}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="public-works-next-actions">
        {publicWorksServiceSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">Access method: {publicWorksServiceSeed.accessMethod}</p>
    </section>
  );
}

function BroadbandAccessPanel() {
  const digitalMetrics = internetSubscriptionSeed.metrics.filter((metric) => [
    'with-internet-subscription',
    'broadband-any-type',
    'cellular-only',
    'cable-fiber-dsl',
    'no-internet-access'
  ].includes(metric.id));

  return (
    <section className="panel broadband-access-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">DIGITAL INFRASTRUCTURE SOURCE</span>
          <h2>Digital access context separated from coverage claims</h2>
        </div>
        <span className="terminal-badge live">ACS CONTEXT + FCC ROUTE</span>
      </div>
      <div className="internet-subscription-grid" aria-label="ACS internet subscription context">
        {digitalMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} households · MOE ±{metric.moe.toLocaleString()} · {metric.code}</small>
          </article>
        ))}
      </div>
      <div className="broadband-source-grid">
        {broadbandAccessSeed.sourceRoutes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.label}</span>
            <b>{route.dataType}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="broadband-shape-strip">
        {broadbandAccessSeed.normalizedShape.map((field) => (
          <article key={field.field}>
            <span>{field.field}</span>
            <small>{field.meaning}</small>
          </article>
        ))}
      </div>
      <div className="digital-next-actions">
        {internetSubscriptionSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">{internetSubscriptionSeed.caveat} Source: {internetSubscriptionSeed.name} {internetSubscriptionSeed.release.name} ({internetSubscriptionSeed.release.years}). {broadbandAccessSeed.caveat} {broadbandAccessSeed.verification}</p>
    </section>
  );
}

function UtilityEnergyContextPanel() {
  const electricMetric = utilityEnergySeed.metrics.find((metric) => metric.id === 'electricity');
  const utilityGasMetric = utilityEnergySeed.metrics.find((metric) => metric.id === 'utility-gas');
  const detailMetrics = utilityEnergySeed.metrics.filter((metric) => ['total-occupied-units', 'electricity', 'utility-gas'].includes(metric.id));

  return (
    <section className="panel utility-energy-panel" aria-label="ACS heating fuel planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">ENERGY RESILIENCE · ACS CONTEXT</span>
          <h2>Heating-fuel mix seed before utility or outage claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="utility-energy-hero">
        <article>
          <span>Electricity as heating fuel</span>
          <b>{electricMetric?.displayShare || 'N/A'}</b>
          <small>{electricMetric?.displayValue || 'N/A'} households · {electricMetric?.displayMoe || 'MOE pending'} · {utilityEnergySeed.release}</small>
        </article>
        <div>
          <h3>Resilience planning context, not utility telemetry</h3>
          <p>{utilityEnergySeed.posture}</p>
          <a href={utilityEnergySeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter B25040 query</a>
        </div>
      </div>
      <div className="utility-energy-grid">
        {detailMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare || metric.displayValue}</b>
            <small>{metric.displayValue} households · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="utility-energy-comparison">
        {utilityEnergySeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.electricityShare}</b>
            <small>{item.utilityGasShare} utility gas · {item.propaneShare} propane · {item.totalOccupiedUnits.toLocaleString()} occupied units</small>
          </article>
        ))}
      </div>
      <p className="source-note">{utilityEnergySeed.caveat} Waynesboro utility-gas seed: {utilityGasMetric?.displayShare || 'N/A'} ({utilityGasMetric?.displayValue || 'N/A'} households), with share MOE still pending.</p>
    </section>
  );
}

function VehicleAccessPanel() {
  const noVehicleMetric = vehicleAccessSeed.metrics.find((metric) => metric.id === 'no-vehicle');

  return (
    <section className="panel vehicle-access-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">MOBILITY ACCESS · ACS CONTEXT</span>
          <h2>Household vehicle availability seed</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="vehicle-access-hero">
        <article>
          <span>Zero-vehicle households</span>
          <b>{noVehicleMetric?.displayShare || 'N/A'}</b>
          <small>{noVehicleMetric?.displayValue || 'N/A'} households · {noVehicleMetric?.displayMoe || 'MOE pending'} · {vehicleAccessSeed.release}</small>
        </article>
        <div>
          <h3>Service-access context, not a transportation conclusion</h3>
          <p>{vehicleAccessSeed.posture}</p>
          <a href={vehicleAccessSeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter B08201 query</a>
        </div>
      </div>
      <div className="vehicle-access-grid">
        {vehicleAccessSeed.metrics.slice(1).map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare || metric.displayValue}</b>
            <small>{metric.displayValue} households · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="vehicle-comparison-strip">
        {vehicleAccessSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.noVehicleShare}</b>
            <small>{item.noVehicleEstimate.toLocaleString()} of {item.totalHouseholds.toLocaleString()} households</small>
          </article>
        ))}
      </div>
      <div className="mobility-evidence-ladder" aria-label="mobility source evidence ladder">
        {vehicleTenureSeed.evidenceLadder.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <b>{item.value}</b>
            <small>{item.note}</small>
          </article>
        ))}
      </div>
      <div className="vehicle-tenure-grid" aria-label="ACS vehicle availability by housing tenure">
        {vehicleTenureSeed.metrics.slice(1).map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} households · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <p className="source-note">{vehicleAccessSeed.householdSizeCaveat} Added B25044 tenure split: renter zero-vehicle households are {vehicleTenureSeed.metrics.find((metric) => metric.id === 'renter-zero-vehicle')?.displayShare || 'N/A'} of renter households in the cached ACS seed. {vehicleTenureSeed.posture} Pair with commute, GDOT, transit/nonprofit, school, and service-location sources before any Council recommendation.</p>
    </section>
  );
}

function DisabilityAccessPanel() {
  const disabledMetric = disabilityAccessSeed.metrics.find((metric) => metric.id === 'with-disability');
  const ageBreakout = disabilityAccessSeed.metrics.filter((metric) => [
    'under-18-with-disability',
    'age-18-64-with-disability',
    'age-65-plus-with-disability'
  ].includes(metric.id));

  return (
    <section className="panel disability-access-panel" aria-label="ACS disability access context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">ACCESSIBILITY / SERVICE CONTEXT · ACS</span>
          <h2>Disability-by-age seed before ADA or service-demand claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="disability-access-hero">
        <article>
          <span>Waynesboro disability estimate</span>
          <b>{disabledMetric?.displayShare || 'N/A'}</b>
          <small>{disabledMetric?.displayValue || 'N/A'} people · {disabledMetric?.displayMoe || 'MOE pending'} · {disabilityAccessSeed.release}</small>
        </article>
        <div>
          <h3>Planning context, not a finding</h3>
          <p>{disabilityAccessSeed.posture}</p>
          <a href={disabilityAccessSeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter B18101 query</a>
        </div>
      </div>
      <div className="disability-age-grid">
        {ageBreakout.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayValue}</b>
            <small>{metric.displayShare} · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="disability-comparison-strip">
        {disabilityAccessSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.disabledShare}</b>
            <small>{item.disabledEstimate.toLocaleString()} of {item.totalPopulation.toLocaleString()} residents in ACS universe</small>
          </article>
        ))}
      </div>
      <p className="source-note">{disabilityAccessSeed.caveat} Next: {disabilityAccessSeed.nextActions[0]}</p>
    </section>
  );
}

function LanguageAccessPanel() {
  const nonEnglishMetric = languageAccessSeed.metrics.find((metric) => metric.id === 'language-other-than-english');
  const limitedEnglishMetric = languageAccessSeed.metrics.find((metric) => metric.id === 'english-less-than-very-well');
  const detailMetrics = languageAccessSeed.metrics.filter((metric) => ['english-only', 'spanish', 'english-less-than-very-well'].includes(metric.id));

  return (
    <section className="panel language-access-panel" aria-label="ACS language access planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">LANGUAGE ACCESS · ACS CONTEXT</span>
          <h2>Public communications seed before translation-demand claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="language-access-hero">
        <article>
          <span>Language other than English at home</span>
          <b>{nonEnglishMetric?.displayShare || 'N/A'}</b>
          <small>{nonEnglishMetric?.displayValue || 'N/A'} residents age 5+ · {nonEnglishMetric?.displayMoe || 'MOE pending'} · {languageAccessSeed.release}</small>
        </article>
        <div>
          <h3>Communication planning context, not a municipal workload claim</h3>
          <p>{languageAccessSeed.posture}</p>
          <a href={languageAccessSeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter C16001 query</a>
        </div>
      </div>
      <div className="language-access-grid">
        {detailMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare || metric.displayValue}</b>
            <small>{metric.displayValue} people · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="language-comparison-strip">
        {languageAccessSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.nonEnglishShare}</b>
            <small>{item.nonEnglishEstimate.toLocaleString()} non-English at home · {item.lessThanVeryWellShare} less than very well</small>
          </article>
        ))}
      </div>
      <p className="source-note">{languageAccessSeed.caveat} Waynesboro limited-English ACS seed: {limitedEnglishMetric?.displayShare || 'N/A'} ({limitedEnglishMetric?.displayValue || 'N/A'} residents age 5+), with derived MOE still pending.</p>
    </section>
  );
}

function HealthInsuranceAccessPanel() {
  const uninsuredMetric = healthInsuranceSeed.metrics.find((metric) => metric.id === 'uninsured-total');
  const detailMetrics = healthInsuranceSeed.metrics.filter((metric) => ['insured-total', 'age-19-34-uninsured', 'age-35-64-uninsured'].includes(metric.id));

  return (
    <section className="panel health-insurance-panel" aria-label="ACS health insurance access planning context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HEALTH ACCESS · ACS CONTEXT</span>
          <h2>Insurance-coverage seed before health-service claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="health-insurance-hero">
        <article>
          <span>Waynesboro uninsured estimate</span>
          <b>{uninsuredMetric?.displayShare || 'N/A'}</b>
          <small>{uninsuredMetric?.displayValue || 'N/A'} residents · {uninsuredMetric?.displayMoe || 'MOE pending'} · {healthInsuranceSeed.release}</small>
        </article>
        <div>
          <h3>Planning context, not clinical or eligibility data</h3>
          <p>{healthInsuranceSeed.posture}</p>
          <a href={healthInsuranceSeed.sourceUrl} target="_blank" rel="noreferrer">Open Census Reporter B27010 query</a>
        </div>
      </div>
      <div className="health-insurance-grid">
        {detailMetrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare || metric.displayValue}</b>
            <small>{metric.displayValue} people · {metric.displayMoe}</small>
          </article>
        ))}
      </div>
      <div className="health-insurance-comparison">
        {healthInsuranceSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.uninsuredShare}</b>
            <small>{item.uninsuredEstimate.toLocaleString()} uninsured · {item.uninsuredMoe} · universe {item.tableUniverse.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <p className="source-note">{healthInsuranceSeed.caveat} Next: {healthInsuranceSeed.nextActions[1]}</p>
    </section>
  );
}

function MentalHealthResourcesPanel() {
  return (
    <section className="panel mental-health-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">SERVICE ACCESS · OFFICIAL CITY ROUTE</span>
          <h2>Mental health resource navigation</h2>
        </div>
        <span className="terminal-badge gold">RESOURCE ROUTE</span>
      </div>
      <div className="mental-health-hero">
        <article>
          <span>{mentalHealthResourcesSeed.status}</span>
          <b>City page indexed</b>
          <small>{mentalHealthResourcesSeed.geography}</small>
          <a href={mentalHealthResourcesSeed.sourceUrl} target="_blank" rel="noreferrer">Open official city resource page</a>
        </article>
        <div>
          <h3>What this adds to the operations lane</h3>
          <p>The platform now has a public, city-hosted service-navigation route beside ACS health-insurance and language-access context. This keeps The Council from treating health-access questions as only survey metrics.</p>
          <p>{mentalHealthResourcesSeed.caveat}</p>
        </div>
      </div>
      <div className="mental-health-shape-grid">
        {mentalHealthResourcesSeed.observedShape.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <b>{item.value}</b>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
      <div className="mental-health-link-grid">
        {mentalHealthResourcesSeed.links.map((link) => (
          <a key={link.title} href={link.url} target="_blank" rel="noreferrer">
            <span>{link.label}</span>
            <b>{link.title}</b>
            <small>{link.use}</small>
          </a>
        ))}
      </div>
      <div className="mental-health-actions">
        {mentalHealthResourcesSeed.nextActions.map((action) => <span key={action}>{action}</span>)}
      </div>
      <p className="source-note">Retrieved by low-volume public page review on {new Date(mentalHealthResourcesSeed.retrievedAt).toLocaleDateString()}. Keep this as source routing and public service-navigation context until provider details are manually verified.</p>
    </section>
  );
}

function AffordableHousingSourcePanel() {
  return (
    <section className="panel affordable-housing-panel">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSING AFFORDABILITY SOURCE</span>
          <h2>LIHTC route indexed before housing pipeline claims</h2>
        </div>
        <span className="terminal-badge gold">PDF REVIEW PENDING</span>
      </div>
      <div className="housing-source-grid">
        {affordableHousingSeed.routes.map((route) => (
          <a key={route.label} href={route.url} target="_blank" rel="noreferrer">
            <span>{route.label}</span>
            <b>{route.dataType}</b>
            <small>{route.integrationUse}</small>
          </a>
        ))}
      </div>
      <div className="housing-shape-strip">
        {affordableHousingSeed.normalizedShape.map((field) => (
          <article key={field.field}>
            <span>{field.field}</span>
            <small>{field.meaning}</small>
          </article>
        ))}
      </div>
      <p className="source-note">{affordableHousingSeed.caveat} Source route checked as public DocumentCenter access; no unit-count, award, or project-status claim is promoted.</p>
    </section>
  );
}

function HousingTenureSourcePanel() {
  const primary = housingTenureSeed.metrics.filter((metric) => ['occupied-housing-units', 'renter-occupied-units', 'vacant-housing-units', 'median-gross-rent'].includes(metric.id));
  return (
    <section className="housing-tenure-panel">
      <div className="bridge-head">
        <div>
          <span className="eyebrow">HOUSING SOURCE SNAPSHOT</span>
          <h3>ACS housing context before parcel-level vacancy claims</h3>
        </div>
        <span className="terminal-badge live">PUBLIC API SEED</span>
      </div>
      <div className="housing-tenure-grid">
        {primary.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayValue}</b>
            <small>MOE ±{metric.moe.toLocaleString()} · {metric.table}</small>
          </article>
        ))}
      </div>
      <div className="housing-derived-strip">
        {housingTenureSeed.derived.map((item) => (
          <span key={item.id}><b>{item.displayValue}</b> {item.label}</span>
        ))}
      </div>
      <p>{housingTenureSeed.caveat} Release: {housingTenureSeed.release.name} ({housingTenureSeed.release.years}); retrieved through Census Reporter, not the credentialed Census API.</p>
    </section>
  );
}

function HousingCostBurdenPanel() {
  const headline = housingCostBurdenSeed.metrics.find((metric) => metric.id === 'renter-cost-burden');
  return (
    <section className="panel housing-cost-panel" aria-label="ACS housing cost burden source snapshot">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSING COST BURDEN · ACS CONTEXT</span>
          <h2>Affordability pressure context before program or eligibility claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-cost-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} of {headline.denominator.toLocaleString()} renter-occupied units · MOE ±{headline.moe.toLocaleString()}</small>
        </article>
        <div>
          <h3>Guardrail for public use</h3>
          <p>Cost-burden estimates can frame affordability questions, grant readiness, and housing-source priorities — but they cannot stand in for rent rolls, household eligibility, eviction records, or city program enrollment.</p>
          <a href={housingCostBurdenSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25070 / B25091 source query</a>
        </div>
      </div>
      <div className="housing-cost-grid">
        {housingCostBurdenSeed.metrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayShare}</b>
            <small>{metric.displayValue} households · MOE ±{metric.moe.toLocaleString()} · {metric.sourceTable}</small>
          </article>
        ))}
      </div>
      <div className="housing-cost-comparison">
        {housingCostBurdenSeed.comparisonRows.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.renterCostBurdenShare}</b>
            <small>renter cost burden · {row.ownerCostBurdenShare} owner burden</small>
          </article>
        ))}
      </div>
      <p className="source-note">{housingCostBurdenSeed.caveat} Release: {housingCostBurdenSeed.release.name} ({housingCostBurdenSeed.release.years}); retrieved {new Date(housingCostBurdenSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HousingMonthlyCostsPanel() {
  const rent = housingMonthlyCostsSeed.metrics.find((metric) => metric.id === 'median-gross-rent');
  const mortgage = housingMonthlyCostsSeed.metrics.find((metric) => metric.id === 'median-owner-costs-mortgage');

  return (
    <section className="panel housing-monthly-costs-panel" aria-label="ACS monthly housing costs source snapshot">
      <div className="panel-head">
        <div>
          <span className="eyebrow">MONTHLY HOUSING COSTS · ACS CONTEXT</span>
          <h2>Rent and owner-cost medians before local affordability claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-cost-hero">
        <article>
          <span>{rent.label}</span>
          <b>{rent.displayValue}</b>
          <small>MOE ±${rent.moe.toLocaleString()} · {rent.table} · Burke {rent.comparison.county}</small>
        </article>
        <div>
          <h3>Cost context, not a rent roll</h3>
          <p>{housingMonthlyCostsSeed.posture} Mortgage-owner median: <b>{mortgage.displayValue}</b> with MOE ±${mortgage.moe.toLocaleString()}.</p>
          <a href={housingMonthlyCostsSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25064 / B25088 source query</a>
        </div>
      </div>
      <div className="housing-cost-grid monthly-cost-grid">
        {housingMonthlyCostsSeed.metrics.map((metric) => (
          <article key={metric.id}>
            <span>{metric.label}</span>
            <b>{metric.displayValue}</b>
            <small>MOE ±${metric.moe.toLocaleString()} · county {metric.comparison.county} · state {metric.comparison.state}</small>
          </article>
        ))}
      </div>
      <div className="housing-cost-comparison">
        {housingMonthlyCostsSeed.comparisonRows.map((row) => (
          <article key={row.geography}>
            <span>{row.geography}</span>
            <b>{row.medianGrossRent}</b>
            <small>median rent · {row.ownerCostsTotal} owner total · {row.ownerCostsWithMortgage} mortgage-owner</small>
          </article>
        ))}
      </div>
      <p className="source-note">{housingMonthlyCostsSeed.caveat} Release: {housingMonthlyCostsSeed.release.name} ({housingMonthlyCostsSeed.release.years}); retrieved {new Date(housingMonthlyCostsSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HousingSourceLadder() {
  const ladder = [
    { label: 'Survey context', value: 'ACS tenure, burden, monthly costs, typology, crowding, values', note: 'Good for planning questions; never a parcel, lease, or program record.' },
    { label: 'Official route', value: 'City LIHTC + Community Development + utility/rate pages', note: 'PDF/page review pending before claims about projects, rates, or eligibility.' },
    { label: 'Hard-data next', value: 'qPublic parcels, tax digest, permits, code aggregates', note: 'Needs export permission, records request, or manual source review.' }
  ];

  return (
    <section className="housing-source-ladder" aria-label="Housing evidence hierarchy">
      {ladder.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <b>{item.value}</b>
          <small>{item.note}</small>
        </article>
      ))}
    </section>
  );
}

function HousingAgeSourcePanel() {
  const headline = housingAgeSeed.derived.find((item) => item.id === 'pre-1980-housing');
  const vintageBars = housingAgeSeed.groups.slice(5);

  return (
    <section className="panel housing-age-panel" aria-label="ACS housing age source snapshot">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSING STOCK AGE · ACS CONTEXT</span>
          <h2>Older housing context before rehab, blight, or infrastructure claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-age-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} of {housingAgeSeed.totalHousingUnits.toLocaleString()} ACS housing units · MOE on total ±{housingAgeSeed.totalMoe.toLocaleString()}</small>
        </article>
        <div>
          <h3>Presentation-safe use</h3>
          <p>Use this as a planning signal for rehabilitation, weatherization, grant readiness, and parcel-export prioritization — not as a condition finding or inspection record.</p>
          <a href={housingAgeSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25034 source query</a>
        </div>
      </div>
      <div className="housing-age-bars">
        {vintageBars.map((group) => (
          <article key={group.id}>
            <div><span>{group.label}</span><b>{group.displayShare}</b></div>
            <div className="mini-bar"><span style={{ width: group.displayShare }} /></div>
            <small>{group.estimate.toLocaleString()} units · MOE ±{group.moe.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <div className="housing-age-comparison">
        {housingAgeSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.pre1980Share}</b>
            <small>pre-1980 share · {item.post2000Share} post-2000 · {item.totalUnits.toLocaleString()} units</small>
          </article>
        ))}
      </div>
      <p className="source-note">{housingAgeSeed.caveat} Release: {housingAgeSeed.release.name} ({housingAgeSeed.release.years}); retrieved {new Date(housingAgeSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HousingStructurePanel() {
  const headline = housingStructureSeed.derived.find((item) => item.id === 'small-multifamily');
  const bars = housingStructureSeed.derived;

  return (
    <section className="panel housing-structure-panel" aria-label="ACS units in structure housing typology snapshot">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSING TYPOLOGY · ACS CONTEXT</span>
          <h2>Structure mix before parcel, zoning, or infill claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-structure-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} of {housingStructureSeed.totalHousingUnits.toLocaleString()} ACS housing units · total MOE ±{housingStructureSeed.totalMoe.toLocaleString()}</small>
        </article>
        <div>
          <h3>Planning use, not a parcel inventory</h3>
          <p>{housingStructureSeed.posture}</p>
          <a href={housingStructureSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25024 source query</a>
        </div>
      </div>
      <div className="housing-structure-bars">
        {bars.map((group) => (
          <article key={group.id}>
            <div><span>{group.label}</span><b>{group.displayShare}</b></div>
            <div className="mini-bar"><span style={{ width: group.displayShare }} /></div>
            <small>{group.displayValue} units · derived from {housingStructureSeed.table}</small>
          </article>
        ))}
      </div>
      <div className="housing-structure-comparison">
        {housingStructureSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.singleFamilyShare}</b>
            <small>single-family · {item.smallMultifamilyShare} 2–4 unit · {item.mobileHomeShare} mobile home</small>
          </article>
        ))}
      </div>
      <p className="source-note">{housingStructureSeed.caveat} Release: {housingStructureSeed.release.name} ({housingStructureSeed.release.years}); retrieved {new Date(housingStructureSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HousingCrowdingPanel() {
  const headline = housingCrowdingSeed.derived.find((item) => item.id === 'all-overcrowded');

  return (
    <section className="panel housing-crowding-panel" aria-label="ACS occupants per room housing crowding context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOUSING CROWDING · ACS CONTEXT</span>
          <h2>Occupancy pressure lens before code, rental, or service claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-crowding-hero">
        <article>
          <span>{headline.label}</span>
          <b>{headline.displayShare}</b>
          <small>{headline.displayValue} of {housingCrowdingSeed.totalOccupiedUnits.toLocaleString()} occupied ACS units · derived MOE ±{headline.moeApprox.toLocaleString()}</small>
        </article>
        <div>
          <h3>Read the zero correctly</h3>
          <p>{housingCrowdingSeed.posture}</p>
          <a href={housingCrowdingSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25014 source query</a>
        </div>
      </div>
      <div className="housing-crowding-tenure">
        {housingCrowdingSeed.tenure.map((item) => (
          <article key={item.id}>
            <span>{item.label}</span>
            <b>{item.displayShare}</b>
            <small>{item.displayValue} occupied units · MOE ±{item.moe.toLocaleString()}</small>
          </article>
        ))}
      </div>
      <div className="housing-crowding-bands">
        {housingCrowdingSeed.occupancyBands.map((band) => (
          <article key={band.id}>
            <div><span>{band.tenure}</span><b>{band.displayShareOfTenure}</b></div>
            <div className="mini-bar"><span style={{ width: band.displayShareOfTenure }} /></div>
            <small>{band.label} · {band.estimate.toLocaleString()} units · MOE {band.moe ? `±${band.moe.toLocaleString()}` : `approx. ±${band.moeApprox.toLocaleString()}`}</small>
          </article>
        ))}
      </div>
      <div className="housing-crowding-comparison">
        {housingCrowdingSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.overcrowdedShare}</b>
            <small>{item.overcrowdedUnits.toLocaleString()} units &gt;1.00 occupants/room · {item.renterShare} renter share</small>
          </article>
        ))}
      </div>
      <p className="source-note">{housingCrowdingSeed.caveat} Release: {housingCrowdingSeed.release.name} ({housingCrowdingSeed.release.years}); retrieved {new Date(housingCrowdingSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function HomeValueDistributionPanel() {
  const headline = homeValueDistributionSeed.brackets.find((item) => item.id === '200k-299k');

  return (
    <section className="panel housing-structure-panel" aria-label="ACS owner-occupied home value distribution context">
      <div className="panel-head">
        <div>
          <span className="eyebrow">HOME VALUE DISTRIBUTION · ACS CONTEXT</span>
          <h2>Owner-occupied value lens before parcel/tax claims</h2>
        </div>
        <span className="terminal-badge live">NO-KEY API SEED</span>
      </div>
      <div className="housing-structure-hero">
        <article>
          <span>{headline.label} band</span>
          <b>{headline.displayShare}</b>
          <small>{headline.estimate.toLocaleString()} of {homeValueDistributionSeed.totalOwnerOccupiedUnits.toLocaleString()} owner-occupied units · total MOE ±{homeValueDistributionSeed.totalMoe.toLocaleString()}</small>
        </article>
        <div>
          <h3>Tax-base signal, not tax records</h3>
          <p>{homeValueDistributionSeed.posture}</p>
          <a href={homeValueDistributionSeed.sourceUrl} target="_blank" rel="noreferrer">Census Reporter B25075 source query</a>
        </div>
      </div>
      <div className="housing-structure-bars">
        {homeValueDistributionSeed.brackets.map((bracket) => (
          <article key={bracket.id}>
            <div><span>{bracket.label}</span><b>{bracket.displayShare}</b></div>
            <div className="mini-bar"><span style={{ width: bracket.displayShare }} /></div>
            <small>{bracket.estimate.toLocaleString()} units · derived from {homeValueDistributionSeed.table}</small>
          </article>
        ))}
      </div>
      <div className="housing-structure-comparison">
        {homeValueDistributionSeed.comparison.map((item) => (
          <article key={item.geography}>
            <span>{item.geography}</span>
            <b>{item.twoHundredPlusShare}</b>
            <small>$200K+ owner-occupied units · {item.under100kShare} under $100K · {item.oneHundredTo199Share} $100K–$199K</small>
          </article>
        ))}
      </div>
      <p className="source-note">{homeValueDistributionSeed.caveat} Release: {homeValueDistributionSeed.release.name} ({homeValueDistributionSeed.release.years}); retrieved {new Date(homeValueDistributionSeed.retrievedAt).toLocaleDateString()}.</p>
    </section>
  );
}

function InfrastructureSafetyHousing() {
  return (
    <section id="operations" className="module operations-module">
      <OperationsConfidenceStrip />
      <PublicWorksServiceRoutePanel />
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
      <TransportationProjectSourcePanel />
      <PublicSafetySourcePanel />
      <HealthEquitySourcePanel />
      <SocialVulnerabilityPanel />
      <HealthInsuranceAccessPanel />
      <MentalHealthResourcesPanel />
      <DisabilityAccessPanel />
      <LanguageAccessPanel />
      <FoodAccessSourcePanel />
      <HousingSourceLadder />
      <HousingTenureSourcePanel />
      <HousingCostBurdenPanel />
      <HousingMonthlyCostsPanel />
      <HousingAgeSourcePanel />
      <HousingStructurePanel />
      <HousingCrowdingPanel />
      <HomeValueDistributionPanel />
      <AffordableHousingSourcePanel />
      <WeatherReadinessPanel />
      <WaterSystemsPanel />
      <StateDrinkingWaterPanel />
      <UtilityRateReferencePanel />
      <UtilityEnergyContextPanel />
      <BroadbandAccessPanel />
      <VehicleAccessPanel />
      <CleanWaterPermitPanel />
      <HazardousWasteSourcePanel />
      <HydrologySourcePanel />
      <HydrologyObservationsPanel />
      <HazardResiliencePanel />
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
  const disciplinedBrief = [
    {
      status: 'Verified baseline',
      title: `${metricById['waynesboro-population']?.displayValue || 'N/A'} residents · ${metricById['waynesboro-median-income']?.displayValue || 'N/A'} median income`,
      note: 'Use Data Commons as the opening baseline, then compare against county/state context before making operating claims.',
      action: 'Ask staff to validate whether local service demand, housing, and budget assumptions match the baseline.'
    },
    {
      status: 'Official record trail',
      title: `${officialDocumentsSnapshot.summary.documentCount} public document links indexed`,
      note: 'Agendas, budgets, check registers, and finance reports are citation paths; contents still need manual review before quotation.',
      action: 'Turn the next Council brief into a document-backed decision log, not a generic chatbot summary.'
    },
    {
      status: 'Economic mobility context',
      title: `${povertyStatusSeed.metrics.find((metric) => metric.id === 'poverty-total')?.displayShare || 'N/A'} ACS poverty-status estimate`,
      note: 'The executive lane now has B17001 poverty-status context with MOE and city/county/state comparison, but it is still survey planning context only.',
      action: 'Pair with income distribution, housing burden, vehicle access, food access, health access, and source-labeled service locations before The Council recommends interventions.'
    },
    {
      status: 'Still synthetic',
      title: 'Permits, parcels, crime, occupancy, and blight scores remain hypotheses',
      note: 'The Council may discuss these as questions and operating priorities, not as municipal facts.',
      action: 'Prioritize parcel/export permission, permit history, public-safety aggregates, and downtown inventory QA.'
    }
  ];

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
        <div className="panel-head"><div><span className="eyebrow">AI LAYER</span><h2>The Council</h2></div><span className="terminal-badge gold">SOURCE-GATED BRIEF</span></div>
        <div className="council-grid">
          <div className="orb">WOS</div>
          <div className="brief-list council-brief-cards">
            {disciplinedBrief.map((line, index) => (
              <article key={line.title}>
                <div><b>{String(index + 1).padStart(2, '0')}</b><span>{line.status}</span></div>
                <h3>{line.title}</h3>
                <p>{line.note}</p>
                <em>{line.action}</em>
              </article>
            ))}
          </div>
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
  const connectorLabel = `${liveConnectors} public connector${liveConnectors === 1 ? '' : 's'} active`;

  return (
    <section className="trust-ribbon" aria-label="public demo data status">
      <article>
        <span>Demo posture</span>
        <b>Verified baseline + labeled placeholders</b>
        <small>No municipal claim is promoted until it has source, geography, and timestamp.</small>
      </article>
      <article>
        <span>Live baseline</span>
        <b>{connectorLabel}</b>
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

function MeetingReadinessStrip() {
  const checks = [
    { label: 'First-screen posture', value: 'Public demo', detail: 'White/silver civic surface, forest-green identity, no affiliation or trading language.' },
    { label: 'Claims discipline', value: 'Source-gated', detail: 'Verified baseline first; synthetic operating scores stay visibly labeled.' },
    { label: 'Presentation packet', value: 'Print aware', detail: 'Dense panels remain readable for PDF/meeting screenshots and council-style review.' },
    { label: 'Next evidence lane', value: 'Occupation mix', detail: `${occupationEmploymentSeed.occupations[0].displayShare} ACS C24010 ${occupationEmploymentSeed.occupations[0].label.toLowerCase()} context is seeded; pair it with CBP, LEHD, Georgia DOL, employer records, and training sources before Council workforce recommendations.` }
  ];

  return (
    <section className="meeting-readiness-strip" aria-label="presentation and public readiness checklist">
      {checks.map((item) => (
        <article key={item.label}>
          <span>{item.label}</span>
          <b>{item.value}</b>
          <small>{item.detail}</small>
        </article>
      ))}
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
      value: waterSource ? `${waterSystemsSeed.systemsServingWaynesboro[0]?.pwsId || 'PWSID'} scoped` : 'Water source pending',
      detail: 'EPA ECHO/SDWIS public water-system identity is cached as evidence, not live utility telemetry.'
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

const pageMeta = {
  executive: {
    eyebrow: 'WAYNESBORO, GEORGIA · EXECUTIVE HOME',
    title: 'Municipal Operating Picture for Waynesboro.',
    description: 'First-meeting dashboard with verified baseline facts, public trust status, and source-gated civic brief cards.'
  },
  sources: {
    eyebrow: 'WAYNESBORO, GEORGIA · SOURCE CONFIDENCE',
    title: 'Source ledger and evidence intake.',
    description: 'Public connectors, official document routes, source maturity, and next actions grouped away from the executive home.'
  },
  economic: {
    eyebrow: 'WAYNESBORO, GEORGIA · ECONOMIC DEVELOPMENT',
    title: 'Economic development and workforce picture.',
    description: 'Development pipeline placeholders, business source routes, workforce context, commute data, and revenue-source routing.'
  },
  downtown: {
    eyebrow: 'WAYNESBORO, GEORGIA · DOWNTOWN + PROJECTS',
    title: 'Downtown, beautification, and project control.',
    description: 'Map/source stack, storefront intelligence, beautification score, and project tracker grouped as a physical-city workbench.'
  },
  operations: {
    eyebrow: 'WAYNESBORO, GEORGIA · OPERATIONS',
    title: 'Infrastructure, safety, housing, and resilience.',
    description: 'Operations source confidence, public works references, weather, water, housing, environmental, mobility, and hazard context.'
  },
  council: {
    eyebrow: 'WAYNESBORO, GEORGIA · THE COUNCIL',
    title: 'AI advisor and source-gated brief.',
    description: 'Council-style decision framing that separates verified baseline, official record trails, seed evidence, and placeholders.'
  }
};

const appBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const withBase = (path) => `${appBase}${path}` || '/';

const nav = [
  { id: 'executive', label: 'Executive', href: withBase('/') },
  { id: 'sources', label: 'Sources', href: withBase('/sources/') },
  { id: 'economic', label: 'Economic', href: withBase('/economic/') },
  { id: 'downtown', label: 'Downtown + Projects', href: withBase('/downtown/') },
  { id: 'operations', label: 'Operations', href: withBase('/operations/') },
  { id: 'council', label: 'Council', href: withBase('/council/') }
];

function PageContent({ page }) {
  if (page === 'sources') return <SourceReadiness />;
  if (page === 'economic') return <EconomicDevelopment />;
  if (page === 'downtown') return <><DowntownCommandCenter /><BeautificationIndex /><ProjectTracker /></>;
  if (page === 'operations') return <InfrastructureSafetyHousing />;
  if (page === 'council') return <Council />;
  return <><PublicTrustRibbon /><CivicBriefingStrip /><MeetingReadinessStrip /><ExecutiveDashboard /></>;
}

function PageBriefStrip({ page }) {
  const noVehicleMetric = vehicleAccessSeed.metrics.find((metric) => metric.id === 'no-vehicle');
  const disabledMetric = disabilityAccessSeed.metrics.find((metric) => metric.id === 'with-disability');
  const briefs = {
    executive: [
      { label: 'Baseline', value: metricById['waynesboro-population']?.displayValue || 'N/A', detail: 'Verified city population connector.' },
      { label: 'Claim posture', value: 'Hybrid mode', detail: 'Real baselines first; operating placeholders labeled.' },
      { label: 'Need lens', value: povertyStatusSeed.metrics.find((metric) => metric.id === 'poverty-total')?.displayShare || 'ACS seeded', detail: 'B17001 context visible with MOE and strict eligibility guardrails.' },
      { label: 'Food security', value: snapAssistanceSeed.metrics.find((metric) => metric.id === 'snap-households')?.displayShare || 'ACS seeded', detail: 'B22001 SNAP receipt context; not eligibility, benefits files, pantry demand, or service workload.' },
      { label: 'Demographic lens', value: raceEthnicitySeed.headline.displayShare, detail: 'ACS B03002 race/origin context; not voter, household, eligibility, policing, or workload data.' },
      { label: 'Youth lens', value: youthProfileSeed.totalUnder18.displayShareOfPopulation, detail: 'B09001 splits under-18 cohorts for family-service planning only.' }
    ],
    sources: [
      { label: 'Registry', value: `${sourceRegistry.length} sources`, detail: 'Source routes, seeds, and manual lanes tracked.' },
      { label: 'Queue', value: `${sourcePriorities.length} tasks`, detail: 'Top 8 rendered to avoid backlog sprawl.' },
      { label: 'Finance docs', value: `${localFinancialDocumentsSeed.observedShape.rowsObserved} PDFs`, detail: 'UGA/CVIOG budget + financial-report routes indexed; PDF review pending.' }
    ],
    economic: [
      { label: 'Workforce', value: 'ACS + BLS', detail: 'City survey context plus county LAUS.' },
      { label: 'School lens', value: schoolEnrollmentSeed.enrolled.displayShare, detail: 'ACS B14001 age-3+ enrollment context; not district enrollment or school performance.' },
      { label: 'Revenue', value: 'DOR route', detail: 'Sales tax remains row-parse pending.' },
      { label: 'Income', value: incomeDistributionSeed.rollups?.under50k?.displayShare || 'ACS seeded', detail: 'Household bracket context is source-labeled.' }
    ],
    downtown: [
      { label: 'Map posture', value: 'Schematic', detail: 'OSM/TIGER seeds support orientation only.' },
      { label: 'Projects', value: `${projects.length} demo rows`, detail: 'Tracker remains synthetic until agendas/docs are parsed.' },
      { label: 'Storefronts', value: `${downtownProperties.length} mock assets`, detail: 'Needs parcel and field-verification layer.' }
    ],
    operations: [
      { label: 'Telemetry guardrail', value: 'Reference layer', detail: 'No live dispatch, utility, or emergency claims.' },
      { label: 'Mobility', value: noVehicleMetric?.displayShare || 'ACS seeded', detail: 'Zero-vehicle context with MOE caveats.' },
      { label: 'Accessibility', value: disabledMetric?.displayShare || 'ACS seeded', detail: 'Disability context added for planning only.' },
      { label: 'Health access', value: healthInsuranceSeed.metrics.find((metric) => metric.id === 'uninsured-total')?.displayShare || 'ACS seeded', detail: 'B27010 insurance-coverage context; not enrollment, clinical, or service-demand data.' },
      { label: 'Service routes', value: 'City resource page', detail: 'Mental-health links indexed as navigation only; not clinical, crisis-call, or utilization data.' },
      { label: 'SVI resilience', value: socialVulnerabilitySeed.summary.find((item) => item.label === 'Highest overall SVI percentile')?.value || 'CDC seeded', detail: 'Burke County tract vulnerability context; not yet a city score or live emergency feed.' },
      { label: 'Energy mix', value: utilityEnergySeed.metrics.find((metric) => metric.id === 'electricity')?.displayShare || 'ACS seeded', detail: 'B25040 heating-fuel context; not utility accounts, outage exposure, or rate burden.' },
      { label: 'Language access', value: languageAccessSeed.metrics.find((metric) => metric.id === 'language-other-than-english')?.displayShare || 'ACS seeded', detail: 'C16001 communication-planning context; not a service workload claim.' },
      { label: 'Affordability', value: housingCostBurdenSeed.metrics.find((metric) => metric.id === 'renter-cost-burden')?.displayShare || 'ACS seeded', detail: 'Renter cost-burden survey context with MOE caveats.' },
      { label: 'Housing type', value: housingStructureSeed.derived.find((item) => item.id === 'small-multifamily')?.displayShare || 'ACS seeded', detail: 'B25024 units-in-structure context; not parcels, zoning, or permits.' },
      { label: 'Crowding', value: housingCrowdingSeed.derived.find((item) => item.id === 'all-overcrowded')?.displayShare || 'ACS seeded', detail: 'B25014 occupants-per-room context; zero estimate carries MOE and is not an inspection or service record.' },
      { label: 'Mobility tenure', value: vehicleTenureSeed.metrics.find((metric) => metric.id === 'renter-zero-vehicle')?.displayShare || 'B25044', detail: 'Renter zero-vehicle context; pair with service locations, transit/nonprofit routes, commute, and GDOT before recommendations.' },
      { label: 'Home values', value: homeValueDistributionSeed.brackets.find((item) => item.id === '200k-299k')?.displayShare || 'ACS seeded', detail: 'B25075 value distribution; not assessments, sales, or tax records.' }
    ],
    council: [
      { label: 'Advisor mode', value: 'Source-gated', detail: 'The Council separates evidence from placeholder judgment.' },
      { label: 'Safe brief', value: 'Caveated', detail: 'No real municipal claim without source label.' },
      { label: 'Next upgrade', value: 'Citation cards', detail: 'Manual document review should feed decisions.' }
    ]
  };

  return (
    <section className="page-brief-strip" aria-label="active page briefing summary">
      {(briefs[page] || briefs.executive).map((item) => (
        <article key={`${page}-${item.label}`}>
          <span>{item.label}</span>
          <b>{item.value}</b>
          <small>{item.detail}</small>
        </article>
      ))}
    </section>
  );
}

export default function WaynesboroTerminal({ page = 'executive' }) {
  const activePage = pageMeta[page] ? page : 'executive';
  const meta = pageMeta[activePage];
  return (
    <main className={`terminal-shell terminal-page-${activePage}`}>
      <aside className="sidebar">
        <div className="brand-mark"><span>W</span><div><b>Waynesboro OS</b><small>Municipal Intelligence Terminal</small></div></div>
        <nav>{nav.map((item) => <a key={item.id} href={item.href} className={activePage === item.id ? 'active' : ''}>{item.label}</a>)}</nav>
        <div className="sidebar-note"><b>Core question</b><span>If I became Mayor tomorrow morning, what do I need before my first meeting?</span></div>
      </aside>
      <section className="workspace paged-workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">{meta.eyebrow}</span>
            <h1>{meta.title}</h1>
            <p className="public-disclaimer">{meta.description}</p>
          </div>
          <div className="civic-mode-card"><b>CIVIC DEMO MODE</b><span>Verified baselines · source routes · placeholders labeled</span></div>
        </header>
        <section className="page-switcher" aria-label="Waynesboro OS page groups">
          {nav.map((item) => <a key={item.id} href={item.href} className={activePage === item.id ? 'active' : ''}>{item.label}</a>)}
        </section>
        <PageBriefStrip page={activePage} />
        <PageContent page={activePage} />
      </section>
    </main>
  );
}
