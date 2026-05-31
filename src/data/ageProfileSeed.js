export const ageProfileSeed = {
  sourceName: 'Census Reporter ACS B01001 age-sex table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001&geo_ids=16000US1380984',
  geography: 'Waynesboro city, Georgia (16000US1380984)',
  retrievedAt: '2026-05-31T16:45:38Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  status: 'Public API seed ready',
  totalPopulation: {
    value: 5644,
    displayValue: '5,644',
    moe: 27,
    table: 'B01001'
  },
  groups: [
    {
      id: 'under-18',
      label: 'Under 18',
      value: 1374,
      displayValue: '1,374',
      share: 0.2434,
      displayShare: '24.3%',
      moe: 392,
      table: 'B01001',
      planningUse: 'School capacity, youth programming, recreation, family-service demand.'
    },
    {
      id: '18-to-24',
      label: 'Ages 18–24',
      value: 802,
      displayValue: '802',
      share: 0.1421,
      displayShare: '14.2%',
      moe: 314,
      table: 'B01001',
      planningUse: 'Early-career workforce, training, commute, and downtown retention questions.'
    },
    {
      id: '25-to-44',
      label: 'Ages 25–44',
      value: 1462,
      displayValue: '1,462',
      share: 0.259,
      displayShare: '25.9%',
      moe: 319,
      table: 'B01001',
      planningUse: 'Core workforce, household formation, housing demand, and childcare context.'
    },
    {
      id: '45-to-64',
      label: 'Ages 45–64',
      value: 1048,
      displayValue: '1,048',
      share: 0.1857,
      displayShare: '18.6%',
      moe: 270,
      table: 'B01001',
      planningUse: 'Established households, tax base stability, health access, and succession planning.'
    },
    {
      id: '65-plus',
      label: '65+',
      value: 958,
      displayValue: '958',
      share: 0.1697,
      displayShare: '17.0%',
      moe: 249,
      table: 'B01001',
      planningUse: 'Senior services, accessibility, EMS demand, housing retrofit, and public-health context.'
    }
  ],
  guardrails: [
    'ACS age groups are survey estimates with margins of error, not live school enrollment, EMS demand, voter files, or program participation counts.',
    'Use for service-demand framing only; pair with school district, EMS, recreation, health, and budget records before recommendations.',
    'Do not treat Census Reporter values as a replacement for official city operating data or department-level workload metrics.'
  ]
};
