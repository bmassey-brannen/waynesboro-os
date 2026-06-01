export const veteranStatusSeed = {
  sourceName: 'Census Reporter ACS B21001 veteran-status table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B21001&geo_ids=16000US1380984,05000US13033,04000US13',
  geography: 'Waynesboro city, Georgia (16000US1380984), with Burke County and Georgia comparison rows',
  retrievedAt: '2026-06-01T02:51:24Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  status: 'Public API seed ready',
  table: 'B21001',
  universe: 'Civilian population 18 years and over',
  headline: {
    id: 'waynesboro-veterans',
    label: 'Veterans',
    estimate: 313,
    displayValue: '313',
    moe: 158,
    displayMoe: '±158',
    universe: 4270,
    share: 0.0733,
    displayShare: '7.3%'
  },
  metrics: [
    {
      id: 'male-veterans',
      label: 'Male veterans',
      estimate: 301,
      displayValue: '301',
      moe: 158,
      displayMoe: '±158',
      veteranShare: 0.9617,
      displayShare: '96.2%',
      planningUse: 'VA outreach, event planning, aging-service referrals, and veterans-organization source-routing context.'
    },
    {
      id: 'female-veterans',
      label: 'Female veterans',
      estimate: 12,
      displayValue: '12',
      moe: 21,
      displayMoe: '±21',
      veteranShare: 0.0383,
      displayShare: '3.8%',
      planningUse: 'Small-estimate caveat: use only as ACS context, not as proof of exact program reach.'
    },
    {
      id: 'veterans-55-plus',
      label: 'Veterans age 55+',
      estimate: 263,
      displayValue: '263',
      moe: null,
      displayMoe: 'MOE pending for derived sum',
      veteranShare: 0.8403,
      displayShare: '84.0%',
      planningUse: 'Aging-service, health-access, mobility, and civic-recognition planning context before local service-provider records are integrated.'
    }
  ],
  ageBands: [
    { label: '18–34', estimate: 50, displayValue: '50', moe: 65, displayMoe: '±65' },
    { label: '35–54', estimate: 0, displayValue: '0', moe: 20, displayMoe: '±20' },
    { label: '55–64', estimate: 46, displayValue: '46', moe: 51, displayMoe: '±51' },
    { label: '65–74', estimate: 126, displayValue: '126', moe: null, displayMoe: 'derived from male/female cells' },
    { label: '75+', estimate: 91, displayValue: '91', moe: null, displayMoe: 'derived from male/female cells' }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      universe: 4270,
      veterans: 313,
      veteranMoe: 158,
      veteranShare: '7.3%'
    },
    {
      geography: 'Burke County',
      universe: 18465,
      veterans: 1610,
      veteranMoe: 302,
      veteranShare: '8.7%'
    },
    {
      geography: 'Georgia',
      universe: 8340227,
      veterans: 601304,
      veteranMoe: 7700,
      veteranShare: '7.2%'
    }
  ],
  caveat: 'ACS B21001 is survey context for the civilian population age 18+. It is not VA enrollment, benefits eligibility, service-connected disability, household-level records, military-installation activity, nonprofit caseload, or live municipal service demand.',
  nextSourceNeeds: [
    'Pair with VA facility/service-location sources, local veterans organizations, disability/accessibility context, health-insurance context, and age profile before Council recommendations.',
    'Calculate proper derived MOE before making age-band share narratives from summed cells.',
    'Keep zero or small ACS estimates visible with nonzero MOE instead of treating them as exact counts.'
  ]
};
