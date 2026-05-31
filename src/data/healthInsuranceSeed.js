export const healthInsuranceSeed = {
  sourceName: 'Census Reporter ACS health insurance coverage table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B27010&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B27010 · Types of Health Insurance Coverage by Age',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey planning context only: not Medicaid enrollment files, clinical records, eligibility determinations, provider capacity, charity-care demand, EMS workload, or municipal health-service telemetry.',
  metrics: [
    {
      id: 'uninsured-total',
      label: 'No health insurance coverage',
      estimate: 1102,
      moe: 274,
      share: 0.1979,
      displayValue: '1,102',
      displayShare: '19.8%',
      displayMoe: '±274',
      note: 'Derived from ACS B27010 no-coverage cells across age groups for Waynesboro city; MOE is an approximate root-sum-square rollup.'
    },
    {
      id: 'insured-total',
      label: 'With health insurance coverage',
      estimate: 4467,
      moe: null,
      share: 0.8021,
      displayValue: '4,467',
      displayShare: '80.2%',
      displayMoe: 'Derived MOE pending',
      note: 'Derived as total ACS health-insurance universe minus no-coverage rollup.'
    },
    {
      id: 'age-19-34-uninsured',
      label: 'Uninsured age 19–34',
      estimate: 643,
      moe: 212,
      displayValue: '643',
      displayMoe: '±212',
      note: 'ACS B27010033 estimate for Waynesboro city.'
    },
    {
      id: 'age-35-64-uninsured',
      label: 'Uninsured age 35–64',
      estimate: 459,
      moe: 171,
      displayValue: '459',
      displayMoe: '±171',
      note: 'ACS B27010050 estimate for Waynesboro city.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', uninsuredShare: '19.8%', uninsuredEstimate: 1102, uninsuredMoe: '±274', tableUniverse: 5569 },
    { geography: 'Burke County', uninsuredShare: '13.8%', uninsuredEstimate: 3350, uninsuredMoe: '±515', tableUniverse: 24260 },
    { geography: 'Georgia', uninsuredShare: '12.4%', uninsuredEstimate: 1329511, uninsuredMoe: '±13,974', tableUniverse: 10746448 }
  ],
  caveat: 'Treat ACS B27010 as health-access and grant-planning context only. Do not present it as official enrollment, household-level hardship, provider capacity, clinical status, emergency-response demand, or municipal operational performance.',
  nextActions: [
    'Recalculate derived uninsured-share MOE with ACS ratio methodology before public narrative promotion.',
    'Pair with CDC PLACES, hospital/clinic access, insurance enrollment assistance, EMS/public-health aggregates, and nonprofit service-location sources before Council health-access recommendations.',
    'Keep the health-access context separate from public-safety, benefits eligibility, school, and case-management workloads unless those aggregate sources are explicitly cited.'
  ]
};
