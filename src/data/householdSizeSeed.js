export const householdSizeSeed = {
  sourceName: 'Census Reporter ACS average household size table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25010&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B25010 · Average Household Size of Occupied Housing Units by Tenure',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  retrievedAt: '2026-06-01',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  caveat: 'ACS survey planning context only: not household-level records, occupancy certificates, code-enforcement findings, school enrollment, homelessness data, utility account counts, or live municipal service demand.',
  metrics: [
    {
      id: 'average-household-size',
      label: 'Average household size',
      estimate: 2.53,
      moe: 0.27,
      displayValue: '2.53',
      displayMoe: '±0.27',
      note: 'Average size across occupied housing units in the ACS B25010 universe.'
    },
    {
      id: 'owner-occupied-household-size',
      label: 'Owner-occupied average size',
      estimate: 2.31,
      moe: 0.57,
      displayValue: '2.31',
      displayMoe: '±0.57',
      note: 'Owner-occupied survey context; high MOE means use cautiously.'
    },
    {
      id: 'renter-occupied-household-size',
      label: 'Renter-occupied average size',
      estimate: 2.62,
      moe: 0.34,
      displayValue: '2.62',
      displayMoe: '±0.34',
      note: 'Renter-occupied survey context only, not rent-roll or inspection evidence.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', average: '2.53', owner: '2.31', renter: '2.62', moe: '±0.27' },
    { geography: 'Burke County', average: '2.64', owner: '2.72', renter: '2.45', moe: '±0.11' },
    { geography: 'Georgia', average: '2.62', owner: '2.72', renter: '2.43', moe: '±0.01' }
  ],
  nextActions: [
    'Pair household-size context with ACS household composition, youth profile, housing crowding, housing tenure, and school/recreation/service-location sources before Council recommendations.',
    'Do not use B25010 as proof of overcrowding, code issues, occupancy violations, or department workload; use B25014 crowding and local records for those lanes.',
    'Propagate MOE and tenure differences before public narrative claims.'
  ]
};
