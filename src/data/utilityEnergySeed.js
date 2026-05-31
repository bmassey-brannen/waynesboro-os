export const utilityEnergySeed = {
  sourceName: 'Census Reporter ACS house heating fuel table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25040&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B25040 · House Heating Fuel',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey context only: not utility account records, outage data, load forecasts, rate studies, emergency shelter demand, energy-burden eligibility, or live municipal telemetry.',
  metrics: [
    {
      id: 'total-occupied-units',
      code: 'B25040001',
      label: 'Occupied housing units in table universe',
      estimate: 2204,
      moe: 243,
      displayValue: '2,204',
      displayMoe: '±243',
      note: 'ACS B25040 universe for Waynesboro city.'
    },
    {
      id: 'electricity',
      code: 'B25040004',
      label: 'Electricity as house-heating fuel',
      estimate: 1584,
      moe: 257,
      share: 0.7187,
      displayValue: '1,584',
      displayShare: '71.9%',
      displayMoe: '±257 households',
      note: 'Primary planning signal for weatherization / resilience context; not utility load or outage telemetry.'
    },
    {
      id: 'utility-gas',
      code: 'B25040002',
      label: 'Utility gas as house-heating fuel',
      estimate: 620,
      moe: 221,
      share: 0.2813,
      displayValue: '620',
      displayShare: '28.1%',
      displayMoe: '±221 households',
      note: 'Survey estimate only; do not present as a customer count or franchise/service-area fact.'
    },
    {
      id: 'propane',
      code: 'B25040003',
      label: 'Bottled or tank gas',
      estimate: 0,
      moe: 20,
      share: 0,
      displayValue: '0',
      displayShare: '0.0%',
      displayMoe: '±20 households',
      note: 'Zero estimate still has MOE; avoid categorical public claims without utility/local verification.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', electricityShare: '71.9%', utilityGasShare: '28.1%', propaneShare: '0.0%', totalOccupiedUnits: 2204 },
    { geography: 'Burke County', electricityShare: '76.6%', utilityGasShare: '11.4%', propaneShare: '10.3%', totalOccupiedUnits: 9184 },
    { geography: 'Georgia', electricityShare: '57.0%', utilityGasShare: '37.4%', propaneShare: '4.2%', totalOccupiedUnits: 4074366 }
  ],
  caveat: 'Treat ACS B25040 as energy-resilience planning context only. Do not use it as electric/gas customer counts, utility service territory, outage exposure, energy-burden eligibility, affordability, or emergency-response workload evidence.',
  nextActions: [
    'Pair heating-fuel context with city utility-rate documents, electric provider/service-area references, weatherization programs, and NWS heat/cold risk before Council recommendations.',
    'Calculate derived MOE for shares before any public narrative claim about heating-fuel mix.',
    'Keep energy-resilience context separate from outage telemetry, billing data, rate affordability, and household-level utility hardship records unless official aggregate sources are obtained.'
  ]
};
