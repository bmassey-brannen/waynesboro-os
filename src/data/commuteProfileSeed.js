export const commuteProfileSeed = {
  sourceName: 'Census Reporter ACS journey-to-work tables',
  retrievedAt: '2026-05-31T00:00:00-04:00',
  geography: 'Waynesboro city, Georgia (16000US1380984)',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  requestUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08301,B08303&geo_ids=16000US1380984',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  accessMethod: 'Public no-key Census Reporter API; low-volume journey-to-work table request with User-Agent.',
  metrics: [
    {
      id: 'workers-16-plus',
      table: 'B08301',
      label: 'Workers 16+',
      value: 2566,
      displayValue: '2,566',
      moe: 344,
      note: 'Universe for means-of-transportation context.'
    },
    {
      id: 'drove-alone',
      table: 'B08301',
      label: 'Drove alone',
      value: 2010,
      displayValue: '2,010',
      moe: 319,
      percent: 78.3,
      note: 'Estimate divided by B08301 total; show with ACS MOE caveat.'
    },
    {
      id: 'carpooled',
      table: 'B08301',
      label: 'Carpooled',
      value: 324,
      displayValue: '324',
      moe: 169,
      percent: 12.6,
      note: 'Potential rideshare/commuter-pattern context, not a traffic count.'
    },
    {
      id: 'worked-from-home',
      table: 'B08301',
      label: 'Worked from home',
      value: 146,
      displayValue: '146',
      moe: 107,
      percent: 5.7,
      note: 'ACS estimate only; not a broadband subscription or employer-policy metric.'
    },
    {
      id: 'commute-under-15',
      table: 'B08303',
      label: 'Under 15 min commute',
      value: 1094,
      displayValue: '1,094',
      moe: null,
      percent: 45.2,
      note: 'Derived from B08303 <5, 5-9, and 10-14 minute buckets over travel-time total.'
    },
    {
      id: 'commute-45-plus',
      table: 'B08303',
      label: '45+ min commute',
      value: 566,
      displayValue: '566',
      moe: null,
      percent: 23.4,
      note: 'Derived from B08303 45-59 and 60-89 minute buckets over travel-time total.'
    }
  ],
  tableRoutes: [
    {
      table: 'B08301',
      label: 'Means of Transportation to Work',
      url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08301&geo_ids=16000US1380984',
      integrationUse: 'Frame commuter mode split before replacing downtown foot-traffic or corridor assumptions.'
    },
    {
      table: 'B08303',
      label: 'Travel Time to Work',
      url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08303&geo_ids=16000US1380984',
      integrationUse: 'Frame workforce-access and corridor questions; not a road-volume, transit, or congestion dataset.'
    }
  ],
  nextActions: [
    'Cross-check ACS commute estimates against Census LEHD/LODES workplace/residence aggregation before drawing commuter-flow conclusions.',
    'Pair journey-to-work context with GDOT TADA station exports before any corridor-traffic or downtown foot-traffic claim.',
    'Keep margins of error visible and avoid presenting ACS commute shares as real-time traffic, transit demand, or employer rosters.'
  ],
  caveat: 'ACS journey-to-work data is survey-based city context with margins of error. It does not identify employers, live traffic volumes, transit ridership, road safety, or downtown foot traffic. Use it as a source-labeled workforce-access question generator until LEHD, GDOT, and local records are connected.'
};
