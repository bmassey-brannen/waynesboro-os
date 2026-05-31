export const disabilityAccessSeed = {
  sourceName: 'Census Reporter ACS disability-by-age table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B18101&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B18101 · Sex by Age by Disability Status',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey context only: not clinical records, benefits eligibility, ADA compliance findings, department workload, EMS demand, school special-education data, or live service telemetry.',
  metrics: [
    {
      id: 'total-civilian-noninstitutionalized-population',
      label: 'Civilian noninstitutionalized population in table universe',
      estimate: 5569,
      moe: 27,
      displayValue: '5,569',
      displayMoe: '±27',
      note: 'ACS B18101 universe for Waynesboro city.'
    },
    {
      id: 'with-disability',
      label: 'With a disability',
      estimate: 495,
      moe: null,
      share: 0.0889,
      displayValue: '495',
      displayShare: '8.9%',
      displayMoe: 'MOE derived after covariance review',
      note: 'Sum of ACS disability-status cells across sex and age groups; keep as survey context until derived MOE is calculated.'
    },
    {
      id: 'under-18-with-disability',
      label: 'Under 18 with disability',
      estimate: 28,
      moe: null,
      shareOfDisabled: 0.0566,
      displayValue: '28',
      displayShare: '5.7% of disabled estimate',
      displayMoe: 'Derived MOE pending',
      note: 'Under-5 and 5-17 disabled cells, both sexes.'
    },
    {
      id: 'age-18-64-with-disability',
      label: 'Age 18-64 with disability',
      estimate: 321,
      moe: null,
      shareOfDisabled: 0.6485,
      displayValue: '321',
      displayShare: '64.8% of disabled estimate',
      displayMoe: 'Derived MOE pending',
      note: '18-34 and 35-64 disabled cells, both sexes.'
    },
    {
      id: 'age-65-plus-with-disability',
      label: 'Age 65+ with disability',
      estimate: 146,
      moe: null,
      shareOfDisabled: 0.2949,
      displayValue: '146',
      displayShare: '29.5% of disabled estimate',
      displayMoe: 'Derived MOE pending',
      note: '65-74 and 75+ disabled cells, both sexes.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', disabledShare: '8.9%', disabledEstimate: 495, totalPopulation: 5569 },
    { geography: 'Burke County', disabledShare: '16.3%', disabledEstimate: 3961, totalPopulation: 24260 },
    { geography: 'Georgia', disabledShare: '13.1%', disabledEstimate: 1409891, totalPopulation: 10746448 }
  ],
  caveat: 'Treat ACS B18101 as accessibility and grant-planning context only. Do not present it as ADA compliance, local service burden, health diagnosis, benefit participation, or individual-level disability evidence.',
  nextActions: [
    'Calculate proper MOE for derived disability rollups before any public narrative claim.',
    'Pair with ADA transition plans, sidewalk/public-facility inventories, transit/nonprofit mobility routes, age profile, CDC PLACES, and city capital-project records before recommendations.',
    'Keep disability context separate from school, EMS, housing, and benefits claims unless those aggregate sources are explicitly cited.'
  ]
};
