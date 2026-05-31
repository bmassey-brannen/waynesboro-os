export const housingAgeSeed = {
  sourceName: 'Census Reporter ACS Year Structure Built table B25034',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25034&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B25034',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro, GA',
  retrievedAt: '2026-05-31T19:08:48Z',
  totalHousingUnits: 2673,
  totalMoe: 334,
  groups: [
    { id: 'b25034002', label: '2020 or later', estimate: 0, moe: 20, share: 0, displayShare: '0.0%' },
    { id: 'b25034003', label: '2010 to 2019', estimate: 253, moe: 169, share: 0.0947, displayShare: '9.5%' },
    { id: 'b25034004', label: '2000 to 2009', estimate: 40, moe: 62, share: 0.015, displayShare: '1.5%' },
    { id: 'b25034005', label: '1990 to 1999', estimate: 99, moe: 80, share: 0.037, displayShare: '3.7%' },
    { id: 'b25034006', label: '1980 to 1989', estimate: 245, moe: 126, share: 0.0917, displayShare: '9.2%' },
    { id: 'b25034007', label: '1970 to 1979', estimate: 546, moe: 257, share: 0.2043, displayShare: '20.4%' },
    { id: 'b25034008', label: '1960 to 1969', estimate: 376, moe: 188, share: 0.1407, displayShare: '14.1%' },
    { id: 'b25034009', label: '1950 to 1959', estimate: 244, moe: 141, share: 0.0913, displayShare: '9.1%' },
    { id: 'b25034010', label: '1940 to 1949', estimate: 356, moe: 261, share: 0.1332, displayShare: '13.3%' },
    { id: 'b25034011', label: '1939 or earlier', estimate: 514, moe: 162, share: 0.1923, displayShare: '19.2%' }
  ],
  derived: [
    { id: 'pre-1980-housing', label: 'Pre-1980 housing units', value: 2036, displayValue: '2,036', share: 0.7617, displayShare: '76.2%' },
    { id: 'pre-1950-housing', label: 'Pre-1950 housing units', value: 870, displayValue: '870', share: 0.3255, displayShare: '32.5%' },
    { id: 'post-2000-housing', label: 'Post-2000 housing units', value: 293, displayValue: '293', share: 0.1096, displayShare: '11.0%' }
  ],
  comparison: [
    { geography: 'Waynesboro, GA', totalUnits: 2673, pre1980Share: '76.2%', post2000Share: '11.0%' },
    { geography: 'Burke County, GA', totalUnits: 11300, pre1980Share: '47.6%', post2000Share: '24.6%' },
    { geography: 'Georgia', totalUnits: 4541835, pre1980Share: '31.5%', post2000Share: '35.1%' }
  ],
  caveat: 'ACS B25034 is survey housing-stock context only. It is not a parcel condition survey, code-enforcement record, lead-paint finding, rehabilitation-cost estimate, vacancy count, or downtown building inventory.',
  nextActions: [
    'Pair pre-1980 housing context with parcel/qPublic exports, code-enforcement aggregates, and local housing-program records before any rehabilitation or blight recommendation.',
    'Cross-check ACS housing age against City Community Development, LIHTC/DCA, and permit records before promoting project pipeline claims.',
    'Propagate margins of error in any public drilldown; older-housing shares are planning context, not inspection evidence.'
  ]
};
