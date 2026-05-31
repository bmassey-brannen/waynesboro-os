export const housingTenureSeed = {
  provider: 'Census Reporter API / ACS 2024 5-year',
  fetchedAt: '2026-05-31T00:00:00.000Z',
  status: 'public_api_seed',
  geography: {
    name: 'Waynesboro city, Georgia',
    geoid: '16000US1380984',
    sourceProfile: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/'
  },
  endpoint: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25003,B25002,B25077,B25064&geo_ids=16000US1380984,05000US13033,04000US13',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  metrics: [
    {
      id: 'occupied-housing-units',
      label: 'Occupied housing units',
      value: 2204,
      displayValue: '2,204',
      moe: 243,
      table: 'B25003',
      field: 'B25003001'
    },
    {
      id: 'owner-occupied-units',
      label: 'Owner-occupied units',
      value: 648,
      displayValue: '648',
      moe: 216,
      table: 'B25003',
      field: 'B25003002'
    },
    {
      id: 'renter-occupied-units',
      label: 'Renter-occupied units',
      value: 1556,
      displayValue: '1,556',
      moe: 240,
      table: 'B25003',
      field: 'B25003003'
    },
    {
      id: 'vacant-housing-units',
      label: 'Vacant housing units',
      value: 469,
      displayValue: '469',
      moe: 236,
      table: 'B25002',
      field: 'B25002003'
    },
    {
      id: 'median-home-value',
      label: 'Median owner-occupied value',
      value: 161500,
      displayValue: '$161.5K',
      moe: 62191,
      table: 'B25077',
      field: 'B25077001'
    },
    {
      id: 'median-gross-rent',
      label: 'Median gross rent',
      value: 746,
      displayValue: '$746',
      moe: 73,
      table: 'B25064',
      field: 'B25064001'
    }
  ],
  derived: [
    {
      id: 'renter-share-occupied',
      label: 'Renter share of occupied units',
      value: 0.706,
      displayValue: '70.6%',
      formula: 'renter occupied / occupied housing units',
      caveat: 'Derived from ACS estimates; margins of error on component counts are material.'
    },
    {
      id: 'vacancy-share-total',
      label: 'Vacant share of total housing units',
      value: 0.175,
      displayValue: '17.5%',
      formula: 'vacant housing units / total housing units',
      caveat: 'Use as ACS housing context, not a parcel-verified vacancy inventory.'
    }
  ],
  nextActions: [
    'Cross-check ACS housing totals against Data Commons and Census Reporter profile text before promoting to executive KPIs.',
    'Request or locate parcel-level/qPublic vacancy and ownership exports before treating ACS vacancy as downtown or parcel-level fact.',
    'Pair median rent/value with DCA LIHTC materials and city housing-policy documents before writing affordability findings.'
  ],
  caveat: 'This seed is public ACS housing context from Census Reporter. It is not a parcel inventory, live vacancy survey, rent roll, tax record, code-enforcement list, or official city housing program finding.'
};
