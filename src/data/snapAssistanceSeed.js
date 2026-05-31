export const snapAssistanceSeed = {
  sourceName: 'Census Reporter ACS food stamp / SNAP receipt table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B22001&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B22001 · Receipt of Food Stamps/SNAP in the Past 12 Months by Presence of People 60 Years and Over for Households',
  release: {
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  retrievedAt: '2026-05-31T23:05:57+00:00',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  universe: 'Households',
  posture: 'ACS survey planning context only: not household-level benefit records, eligibility determinations, EBT participation files, school meal data, case-management workload, nonprofit client counts, or live municipal service telemetry.',
  metrics: [
    {
      id: 'snap-households',
      label: 'Households receiving SNAP',
      estimate: 731,
      moe: 231,
      denominator: 2204,
      denominatorMoe: 243,
      share: 0.3317,
      displayValue: '731',
      displayShare: '33.2%',
      displayMoe: '±231',
      tableCells: ['B22001001', 'B22001002'],
      note: 'Waynesboro city ACS B22001 households receiving Food Stamps/SNAP in the past 12 months divided by total households.'
    },
    {
      id: 'non-snap-households',
      label: 'Households not receiving SNAP',
      estimate: 1473,
      moe: 309,
      denominator: 2204,
      denominatorMoe: 243,
      share: 0.6683,
      displayValue: '1,473',
      displayShare: '66.8%',
      displayMoe: '±309',
      tableCells: ['B22001005'],
      note: 'ACS B22001 households not receiving Food Stamps/SNAP; use alongside poverty, income, food access, and vehicle access context before any recommendation.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', snapShare: '33.2%', snapHouseholds: 731, snapMoe: '±231', totalHouseholds: 2204, totalMoe: '±243' },
    { geography: 'Burke County', snapShare: '18.9%', snapHouseholds: 1736, snapMoe: '±298', totalHouseholds: 9184, totalMoe: '±397' },
    { geography: 'Georgia', snapShare: '12.3%', snapHouseholds: 499864, snapMoe: '±6,209', totalHouseholds: 4074366, totalMoe: '±9,635' }
  ],
  caveat: 'Treat ACS B22001 as household survey context for food-security and benefit-access planning only. Do not present it as program enrollment administration, household eligibility, school-meal participation, nonprofit demand, agency caseload, or municipal service telemetry.',
  nextActions: [
    'Pair B22001 with USDA Food Access Research Atlas tract extracts before any grocery-access or nutrition-access recommendation.',
    'Cross-check against poverty status, household income distribution, vehicle access, and local service-location maps before The Council suggests interventions.',
    'If official aggregate benefits, school-meal, pantry, or nonprofit service data is obtained later, keep those records source-labeled and separate from ACS survey estimates.'
  ]
};
