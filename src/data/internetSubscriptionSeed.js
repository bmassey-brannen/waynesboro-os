export const internetSubscriptionSeed = {
  name: 'Census Reporter ACS internet subscription profile',
  url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B28002&geo_ids=16000US1380984',
  retrievedAt: '2026-05-31T00:00:00Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: {
    name: 'Waynesboro city, Georgia',
    geoid: '16000US1380984'
  },
  table: {
    id: 'B28002',
    title: 'Presence and Types of Internet Subscriptions in Household'
  },
  status: 'Public API seed ready',
  caveat: 'ACS B28002 is household survey context for subscription/access questions. It is not FCC availability, provider service territory, speed-test evidence, affordability proof, outage data, or municipal broadband telemetry.',
  metrics: [
    {
      id: 'total-households',
      label: 'Total households',
      code: 'B28002001',
      estimate: 2204,
      moe: 243,
      shareOfHouseholds: null,
      displayValue: '2,204',
      displayShare: 'baseline'
    },
    {
      id: 'with-internet-subscription',
      label: 'With internet subscription',
      code: 'B28002002',
      estimate: 2036,
      moe: 255,
      shareOfHouseholds: 0.924,
      displayValue: '2,036',
      displayShare: '92.4%'
    },
    {
      id: 'broadband-any-type',
      label: 'Broadband of any type',
      code: 'B28002004',
      estimate: 2016,
      moe: 251,
      shareOfHouseholds: 0.915,
      displayValue: '2,016',
      displayShare: '91.5%'
    },
    {
      id: 'cellular-only',
      label: 'Cellular data plan only',
      code: 'B28002006',
      estimate: 556,
      moe: 230,
      shareOfHouseholds: 0.252,
      displayValue: '556',
      displayShare: '25.2%'
    },
    {
      id: 'cable-fiber-dsl',
      label: 'Cable, fiber optic, or DSL',
      code: 'B28002007',
      estimate: 1227,
      moe: 311,
      shareOfHouseholds: 0.557,
      displayValue: '1,227',
      displayShare: '55.7%'
    },
    {
      id: 'satellite-internet',
      label: 'Satellite internet service',
      code: 'B28002009',
      estimate: 278,
      moe: 172,
      shareOfHouseholds: 0.126,
      displayValue: '278',
      displayShare: '12.6%'
    },
    {
      id: 'no-internet-access',
      label: 'No internet access',
      code: 'B28002013',
      estimate: 137,
      moe: 105,
      shareOfHouseholds: 0.062,
      displayValue: '137',
      displayShare: '6.2%'
    }
  ],
  nextActions: [
    'Cross-check ACS household subscription estimates against FCC BDC availability exports before any broadband-coverage conclusion.',
    'Keep margins of error visible when briefing digital inclusion, remote-work readiness, or grant context.',
    'Pair with school, library, and workforce-program sources before the public dashboard supports connectivity interventions.'
  ]
};
