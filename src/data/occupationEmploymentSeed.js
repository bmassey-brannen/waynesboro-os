export const occupationEmploymentSeed = {
  provider: 'Census Reporter API / ACS 2024 5-year',
  retrievedAt: '2026-06-01T03:23:26Z',
  status: 'public_api_seed',
  geography: {
    name: 'Waynesboro city, Georgia',
    geoid: '16000US1380984',
    sourceProfile: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/'
  },
  endpoint: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C24010&geo_ids=16000US1380984,05000US13033,04000US13',
  table: {
    id: 'C24010',
    title: 'Sex by Occupation for the Civilian Employed Population 16 Years and Over'
  },
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  universe: {
    label: 'Civilian employed population 16+',
    value: 2580,
    displayValue: '2,580',
    moe: 342,
    displayMoe: '±342'
  },
  occupations: [
    {
      id: 'sales-office',
      label: 'Sales / office',
      value: 739,
      displayValue: '739',
      share: 0.286,
      displayShare: '28.6%',
      moe: 286,
      male: 88,
      female: 651,
      sourceFields: ['C24010027', 'C24010063']
    },
    {
      id: 'production-transportation',
      label: 'Production / transportation',
      value: 686,
      displayValue: '686',
      share: 0.266,
      displayShare: '26.6%',
      moe: 278,
      male: 459,
      female: 227,
      sourceFields: ['C24010034', 'C24010070']
    },
    {
      id: 'service',
      label: 'Service',
      value: 530,
      displayValue: '530',
      share: 0.205,
      displayShare: '20.5%',
      moe: 252,
      male: 157,
      female: 373,
      sourceFields: ['C24010019', 'C24010055']
    },
    {
      id: 'management-science-arts',
      label: 'Management / science / arts',
      value: 470,
      displayValue: '470',
      share: 0.182,
      displayShare: '18.2%',
      moe: 170,
      male: 181,
      female: 289,
      sourceFields: ['C24010003', 'C24010039']
    },
    {
      id: 'natural-construction-maintenance',
      label: 'Natural resources / construction / maintenance',
      value: 155,
      displayValue: '155',
      share: 0.06,
      displayShare: '6.0%',
      moe: 101,
      male: 155,
      female: 0,
      sourceFields: ['C24010030', 'C24010066']
    }
  ],
  comparisonRows: [
    {
      geography: 'Waynesboro city',
      topOccupation: 'Sales / office',
      displayShare: '28.6%',
      universe: '2,580'
    },
    {
      geography: 'Burke County',
      topOccupation: 'Management / science / arts',
      displayShare: '28.3%',
      universe: '10,688'
    },
    {
      geography: 'Georgia',
      topOccupation: 'Management / science / arts',
      displayShare: '41.6%',
      universe: '5,213,857'
    }
  ],
  nextActions: [
    'Pair occupation mix with Census CBP, LEHD/LODES, Georgia DOL, and employer/public-record review before workforce-targeting claims.',
    'Preserve margins of error when turning occupation context into Council questions or grant narratives.',
    'Do not use ACS occupation categories as business-license, employer-roster, payroll, job-posting, or credential-completion data.'
  ],
  caveat: 'ACS C24010 is survey workforce context only. It is not an employer roster, payroll record, occupation credential inventory, job-posting dataset, business-license record, wage file, or municipal economic-development telemetry.'
};
