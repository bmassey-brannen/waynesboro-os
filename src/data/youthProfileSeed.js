export const youthProfileSeed = {
  sourceName: 'Census Reporter ACS B09001 population under 18 by age table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B09001,B01001&geo_ids=16000US1380984,05000US13033,04000US13',
  geography: 'Waynesboro city, Georgia (16000US1380984), with Burke County and Georgia comparison rows',
  retrievedAt: '2026-05-31T22:05:19Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  status: 'Public API seed ready',
  table: 'B09001',
  universe: 'Population under 18 years',
  totalPopulation: {
    value: 5644,
    displayValue: '5,644',
    table: 'B01001'
  },
  totalUnder18: {
    value: 1374,
    displayValue: '1,374',
    moe: 308,
    displayMoe: '±308',
    shareOfPopulation: 0.2434,
    displayShareOfPopulation: '24.3%'
  },
  ageBands: [
    {
      id: 'under-3',
      label: 'Under 3',
      value: 217,
      displayValue: '217',
      moe: 143,
      displayMoe: '±143',
      childShare: 0.1579,
      displayChildShare: '15.8%',
      planningUse: 'Childcare, family outreach, health-access and early-intervention questions.'
    },
    {
      id: '3-4',
      label: 'Ages 3–4',
      value: 200,
      displayValue: '200',
      moe: 107,
      displayMoe: '±107',
      childShare: 0.1456,
      displayChildShare: '14.6%',
      planningUse: 'Pre-K, library programming, recreation, and school-readiness context.'
    },
    {
      id: '5',
      label: 'Age 5',
      value: 187,
      displayValue: '187',
      moe: 166,
      displayMoe: '±166',
      childShare: 0.1361,
      displayChildShare: '13.6%',
      planningUse: 'Kindergarten transition and parks/recreation planning context.'
    },
    {
      id: '6-8',
      label: 'Ages 6–8',
      value: 184,
      displayValue: '184',
      moe: 119,
      displayMoe: '±119',
      childShare: 0.1339,
      displayChildShare: '13.4%',
      planningUse: 'Elementary-age programming, safe routes, and family-service questions.'
    },
    {
      id: '9-11',
      label: 'Ages 9–11',
      value: 142,
      displayValue: '142',
      moe: 149,
      displayMoe: '±149',
      childShare: 0.1033,
      displayChildShare: '10.3%',
      planningUse: 'After-school, recreation, mentoring, and library-programming context.'
    },
    {
      id: '12-14',
      label: 'Ages 12–14',
      value: 227,
      displayValue: '227',
      moe: 178,
      displayMoe: '±178',
      childShare: 0.1652,
      displayChildShare: '16.5%',
      planningUse: 'Middle-school, youth safety, mobility, and recreation context.'
    },
    {
      id: '15-17',
      label: 'Ages 15–17',
      value: 217,
      displayValue: '217',
      moe: 141,
      displayMoe: '±141',
      childShare: 0.1579,
      displayChildShare: '15.8%',
      planningUse: 'Career pathways, youth employment, commute, and civic-participation questions.'
    }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      totalPopulation: 5644,
      under18: 1374,
      under18Moe: 308,
      under18Share: '24.3%'
    },
    {
      geography: 'Burke County',
      totalPopulation: 24470,
      under18: 6005,
      under18Moe: 26,
      under18Share: '24.5%'
    },
    {
      geography: 'Georgia',
      totalPopulation: 10940407,
      under18: 2541498,
      under18Moe: 810,
      under18Share: '23.2%'
    }
  ],
  caveat: 'ACS B09001 is survey planning context only. Do not treat these estimates as school enrollment, childcare slots, youth-program demand, juvenile justice records, household-level data, or municipal department workload.',
  nextActions: [
    'Pair B09001 with Burke County Public Schools enrollment, Georgia Insights aggregate dashboards, recreation/library program data, and service-location maps before youth-service recommendations.',
    'Propagate derived MOE for grouped youth age bands before any public presentation that compares small age cohorts.',
    'Keep school district and city-government responsibilities separate in Council briefs.'
  ]
};
