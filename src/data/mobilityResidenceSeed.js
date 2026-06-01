export const mobilityResidenceSeed = {
  id: 'census-reporter-b07003-residence-one-year-ago',
  retrievedAt: '2026-06-01T00:00:00.000Z',
  sourceName: 'Census Reporter ACS geographical mobility table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B07003&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B07003',
  geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  headline: {
    label: 'Moved in the past year',
    value: 840,
    displayValue: '840 residents',
    displayShare: '14.9%',
    note: 'Derived as total population age 1+ minus same-house estimate. Use as population-turnover context only.'
  },
  metrics: [
    {
      id: 'total-population-one-plus',
      label: 'Population age 1+',
      estimate: 5644,
      moe: 27,
      displayValue: '5,644',
      displayMoe: '±27'
    },
    {
      id: 'same-house',
      label: 'Same house one year ago',
      estimate: 4804,
      moe: 421,
      displayValue: '4,804',
      displayShare: '85.1%',
      displayMoe: '±421'
    },
    {
      id: 'moved-within-same-county',
      label: 'Moved within Burke County',
      estimate: 497,
      moe: 273,
      displayValue: '497',
      displayShare: '8.8%',
      displayMoe: '±273'
    },
    {
      id: 'moved-from-different-ga-county',
      label: 'Moved from another Georgia county',
      estimate: 331,
      moe: 310,
      displayValue: '331',
      displayShare: '5.9%',
      displayMoe: '±310'
    },
    {
      id: 'moved-from-different-state',
      label: 'Moved from another state',
      estimate: 12,
      moe: 23,
      displayValue: '12',
      displayShare: '0.2%',
      displayMoe: '±23'
    },
    {
      id: 'moved-from-abroad',
      label: 'Moved from abroad',
      estimate: 0,
      moe: 20,
      displayValue: '0',
      displayShare: '0.0%',
      displayMoe: '±20'
    }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      total: 5644,
      sameHouse: 4804,
      movers: 840,
      moverShare: '14.9%',
      withinSameCountyShare: '8.8%',
      differentCountySameStateShare: '5.9%'
    },
    {
      geography: 'Burke County',
      total: 24338,
      sameHouse: 22295,
      movers: 2043,
      moverShare: '8.4%',
      withinSameCountyShare: '4.1%',
      differentCountySameStateShare: '3.4%'
    },
    {
      geography: 'Georgia',
      total: 10823693,
      sameHouse: 9417165,
      movers: 1406528,
      moverShare: '13.0%',
      withinSameCountyShare: '5.3%',
      differentCountySameStateShare: '4.4%'
    }
  ],
  observedShape: {
    rowsObserved: 3,
    fields: ['total', 'same house', 'moved within same county', 'moved from different county in Georgia', 'moved from different state', 'moved from abroad'],
    routeStatus: 'Public no-key Census Reporter API returned B07003 estimates and margins of error for city/county/state rows.'
  },
  caveat: 'ACS B07003 is survey planning context about residence one year ago. It is not a mover registry, lease record, utility-start dataset, school enrollment change, code-enforcement evidence, voter file, or real-time population feed.'
};
