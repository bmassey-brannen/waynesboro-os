export const raceEthnicitySeed = {
  sourceName: 'Census Reporter ACS race / Hispanic origin table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B03002&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B03002',
  release: { id: 'acs2024_5yr', name: 'ACS 2024 5-year', years: '2020-2024' },
  retrievedAt: '2026-06-01T04:25:20Z',
  geography: {
    city: '16000US1380984',
    county: '05000US13033',
    state: '04000US13'
  },
  totalPopulation: 5644,
  headline: {
    id: 'black-nonhispanic',
    label: 'Black alone, not Hispanic or Latino',
    estimate: 3694,
    moe: 481,
    share: 65.5,
    displayShare: '65.5%'
  },
  groups: [
    {
      id: 'black-nonhispanic',
      label: 'Black alone, not Hispanic or Latino',
      estimate: 3694,
      moe: 481,
      share: 65.5,
      displayShare: '65.5%',
      planningUse: 'Public communications, grant equity narratives, service-location review, and civic participation outreach context.'
    },
    {
      id: 'white-nonhispanic',
      label: 'White alone, not Hispanic or Latino',
      estimate: 1248,
      moe: 451,
      share: 22.1,
      displayShare: '22.1%',
      planningUse: 'Baseline demographic comparison context; not voter, program, or household-level evidence.'
    },
    {
      id: 'hispanic-or-latino',
      label: 'Hispanic or Latino',
      estimate: 486,
      moe: 258,
      share: 8.6,
      displayShare: '8.6%',
      planningUse: 'Language-access, meeting-notice, service-location, and outreach questions when paired with C16001 language data.'
    },
    {
      id: 'asian-nonhispanic',
      label: 'Asian alone, not Hispanic or Latino',
      estimate: 122,
      moe: 132,
      share: 2.2,
      displayShare: '2.2%',
      planningUse: 'Small-cell survey context only; margins of error are large relative to the estimate.'
    },
    {
      id: 'two-or-more-nonhispanic',
      label: 'Two or more races, not Hispanic or Latino',
      estimate: 94,
      moe: 101,
      share: 1.7,
      displayShare: '1.7%',
      planningUse: 'Small-cell survey context only; do not overinterpret without confidence notes.'
    }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      blackNonHispanicShare: '65.5%',
      whiteNonHispanicShare: '22.1%',
      hispanicShare: '8.6%'
    },
    {
      geography: 'Burke County',
      blackNonHispanicShare: '45.0%',
      whiteNonHispanicShare: '48.0%',
      hispanicShare: '3.6%'
    },
    {
      geography: 'Georgia',
      blackNonHispanicShare: '30.7%',
      whiteNonHispanicShare: '49.1%',
      hispanicShare: '11.0%'
    }
  ],
  caveat: 'ACS B03002 is survey demographic context. It is not voter data, program enrollment, household-level identity records, policing data, eligibility data, or a municipal service-demand measure. Small categories can have margins of error larger than estimates; keep MOE and source labels visible before using in public narratives.',
  nextSources: [
    'Pair with ACS C16001 language access before public-notice or translation recommendations.',
    'Pair with meeting attendance, service-location maps, recreation/library program data, and official outreach records before the public dashboard supports interventions.',
    'Cross-check Census Reporter values against official ACS API/Data Commons before using in public presentation packets.'
  ]
};
