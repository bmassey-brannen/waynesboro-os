export const povertyStatusSeed = {
  sourceName: 'Census Reporter ACS poverty status table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B17001&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B17001 · Poverty Status in the Past 12 Months by Sex by Age',
  release: {
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  retrievedAt: '2026-05-31T21:33:49+00:00',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  universe: 'Population for whom poverty status is determined',
  posture: 'ACS survey planning context only: not household-level poverty records, benefits eligibility, program enrollment, tax files, school free/reduced lunch data, or municipal service-demand telemetry.',
  metrics: [
    {
      id: 'poverty-total',
      label: 'Below poverty level',
      estimate: 1433,
      moe: 485,
      denominator: 5507,
      denominatorMoe: 105,
      share: 0.2602,
      displayValue: '1,433',
      displayShare: '26.0%',
      displayMoe: '±485',
      tableCells: ['B17001001', 'B17001002'],
      note: 'Waynesboro city ACS B17001 total below-poverty estimate divided by poverty-status universe.'
    },
    {
      id: 'not-in-poverty-total',
      label: 'At or above poverty level',
      estimate: 4074,
      moe: null,
      denominator: 5507,
      share: 0.7398,
      displayValue: '4,074',
      displayShare: '74.0%',
      displayMoe: 'Derived MOE pending',
      tableCells: ['B17001031'],
      note: 'Derived as poverty-status universe minus below-poverty estimate; keep MOE pending until ratio/derived methodology is implemented.'
    },
    {
      id: 'poverty-child-under-18',
      label: 'Under-18 below poverty',
      estimate: 292,
      moe: null,
      denominator: 1433,
      shareOfPovertyPopulation: 0.2038,
      displayValue: '292',
      displayShare: '20.4% of below-poverty estimate',
      displayMoe: 'Rollup MOE pending',
      tableCells: ['B17001004', 'B17001005', 'B17001006', 'B17001018', 'B17001019', 'B17001020'],
      note: 'Approximate child subtotal from male/female below-poverty under-18 B17001 age cells.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', povertyShare: '26.0%', belowPovertyEstimate: 1433, belowPovertyMoe: '±485', universe: 5507 },
    { geography: 'Burke County', povertyShare: '18.3%', belowPovertyEstimate: 4411, belowPovertyMoe: '±839', universe: 24051 },
    { geography: 'Georgia', povertyShare: '13.4%', belowPovertyEstimate: 1430012, belowPovertyMoe: '±19,111', universe: 10679691 }
  ],
  caveat: 'Treat ACS B17001 as poverty-status survey context only. Do not present it as household-level evidence, eligibility determinations, public-benefits enrollment, local program workload, school meal participation, tax data, or live municipal telemetry.',
  nextActions: [
    'Calculate ratio margins of error before promoting poverty-rate comparison into public narrative copy.',
    'Pair B17001 with household income distribution, housing cost burden, vehicle access, food access, health insurance, and local nonprofit/service-location sources before Council recommendations.',
    'Keep ACS poverty context separate from official program participation, school, court, tax, or case-management datasets unless those aggregate sources are explicitly cited.'
  ]
};
