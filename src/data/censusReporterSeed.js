export const censusReporterSeed = {
  provider: 'Census Reporter API',
  fetchedAt: '2026-05-31T02:36:33.530227+00:00',
  status: 'public_api_seed',
  geography: {
    geoid: '16000US1380984',
    displayName: 'Waynesboro, GA',
    alandSquareMeters: 14173194,
    awaterSquareMeters: 136229
  },
  endpoints: {
    profile: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
    geo: 'https://api.censusreporter.org/1.0/geo/show/tiger2023?geo_ids=16000US1380984',
    data: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001,B19013,B17001&geo_ids=16000US1380984,05000US13033,04000US13'
  },
  metrics: [
    { id: 'cr-waynesboro-population', label: 'Waynesboro population', value: 5644, displayValue: '5,644', moe: 27, table: 'B01001', field: 'B01001001' },
    { id: 'cr-waynesboro-median-household-income', label: 'Waynesboro median household income', value: 41620, displayValue: '$41.6K', moe: 9969, table: 'B19013', field: 'B19013001' },
    { id: 'cr-burke-median-household-income', label: 'Burke County median household income', value: 53014, displayValue: '$53.0K', moe: 3683, table: 'B19013', field: 'B19013001' },
    { id: 'cr-georgia-median-household-income', label: 'Georgia median household income', value: 77353, displayValue: '$77.4K', moe: 407, table: 'B19013', field: 'B19013001' },
    { id: 'cr-waynesboro-poverty-universe', label: 'Waynesboro poverty universe', value: 5507, displayValue: '5,507', moe: 105, table: 'B17001', field: 'B17001001' },
    { id: 'cr-waynesboro-poverty-count', label: 'Waynesboro below poverty level', value: 1433, displayValue: '1,433', moe: 485, table: 'B17001', field: 'B17001002' }
  ],
  caveat: 'Census Reporter is a public API/UI over ACS data. Use as a redundant ACS access path and map-boundary seed; keep official source labels and margins of error visible when binding metrics.'
};
