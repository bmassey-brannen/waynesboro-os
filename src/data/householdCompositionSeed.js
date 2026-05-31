export const householdCompositionSeed = {
  sourceName: 'Census Reporter ACS household type table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B11001&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B11001 · Household Type (Including Living Alone)',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey context only: not household-level records, family-services caseloads, school enrollment, benefits eligibility, homelessness data, or municipal service telemetry.',
  metrics: [
    {
      id: 'total-households',
      label: 'Households in table universe',
      estimate: 2204,
      moe: 243,
      displayValue: '2,204',
      displayMoe: '±243',
      note: 'Total ACS B11001 household universe for Waynesboro.'
    },
    {
      id: 'family-households',
      label: 'Family households',
      estimate: 1469,
      moe: 166,
      share: 0.6665,
      displayValue: '1,469',
      displayShare: '66.7%',
      displayMoe: '±166',
      note: 'Family households as a share of all ACS households.'
    },
    {
      id: 'living-alone',
      label: 'Householders living alone',
      estimate: 623,
      moe: 224,
      share: 0.2827,
      displayValue: '623',
      displayShare: '28.3%',
      displayMoe: '±224',
      note: 'Planning context for outreach/access questions only; high MOE requires caution.'
    },
    {
      id: 'female-no-spouse-family',
      label: 'Female householder, no spouse present',
      estimate: 732,
      moe: 139,
      share: 0.3321,
      displayValue: '732',
      displayShare: '33.2%',
      displayMoe: '±139',
      note: 'Family-household composition context only; do not infer hardship or program eligibility.'
    },
    {
      id: 'nonfamily-households',
      label: 'Nonfamily households',
      estimate: 735,
      moe: 243,
      share: 0.3335,
      displayValue: '735',
      displayShare: '33.3%',
      displayMoe: '±243',
      note: 'Survey context for household mix; not a local registry.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', familyShare: '66.7%', livingAloneShare: '28.3%', femaleNoSpouseFamilyShare: '33.2%', totalHouseholds: 2204 },
    { geography: 'Burke County', familyShare: '67.0%', livingAloneShare: '28.7%', femaleNoSpouseFamilyShare: '19.8%', totalHouseholds: 9184 },
    { geography: 'Georgia', familyShare: '66.2%', livingAloneShare: '27.7%', femaleNoSpouseFamilyShare: '14.9%', totalHouseholds: 4074366 }
  ],
  nextActions: [
    'Pair with ACS age, disability, vehicle access, internet access, school-district, and recreation/service-location sources before The Council makes service-demand recommendations.',
    'Propagate margins of error for derived comparison shares before public narrative claims.',
    'Keep household composition separate from benefits eligibility, case management, homelessness, school enrollment, and household-level records unless official aggregate sources are added.'
  ]
};
