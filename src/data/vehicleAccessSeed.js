export const vehicleAccessSeed = {
  sourceName: 'Census Reporter ACS household vehicle availability table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08201&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'B08201 · Household Size by Vehicles Available',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey context only: not live traffic, transit ridership, household hardship, school transportation, emergency response, or municipal operations telemetry.',
  metrics: [
    {
      id: 'total-households',
      label: 'Households in table universe',
      estimate: 2204,
      moe: 243,
      displayValue: '2,204',
      displayMoe: '±243',
      note: 'Total households in the ACS B08201 universe for Waynesboro.'
    },
    {
      id: 'no-vehicle',
      label: 'No vehicle available',
      estimate: 353,
      moe: 195,
      share: 0.1602,
      displayValue: '353',
      displayShare: '16.0%',
      displayMoe: '±195',
      note: 'Use as access/resilience context only; high MOE requires caution.'
    },
    {
      id: 'one-vehicle',
      label: '1 vehicle available',
      estimate: 1072,
      moe: 267,
      share: 0.4864,
      displayValue: '1,072',
      displayShare: '48.6%',
      displayMoe: '±267',
      note: 'Households with exactly one vehicle available.'
    },
    {
      id: 'two-plus-vehicles',
      label: '2+ vehicles available',
      estimate: 779,
      moe: null,
      share: 0.3534,
      displayValue: '779',
      displayShare: '35.3%',
      displayMoe: 'MOE derived after covariance review',
      note: 'Sum of two, three, and four-or-more vehicle categories; derived MOE not yet calculated.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', noVehicleShare: '16.0%', noVehicleEstimate: 353, totalHouseholds: 2204 },
    { geography: 'Burke County', noVehicleShare: '9.0%', noVehicleEstimate: 823, totalHouseholds: 9184 },
    { geography: 'Georgia', noVehicleShare: '5.9%', noVehicleEstimate: 240272, totalHouseholds: 4074366 }
  ],
  householdSizeCaveat: 'The table can break vehicle availability by household size, but this seed surfaces only high-level city/county/state context until derived MOE and interpretation notes are added.',
  nextActions: [
    'Propagate margins of error for derived 2+ vehicle and comparison metrics before public narrative claims.',
    'Pair with ACS commute tables, LEHD/LODES, GDOT traffic counts, transit/nonprofit transportation sources, and service-location maps before Council mobility recommendations.',
    'Keep zero-vehicle access separate from poverty, disability, age, and school transportation claims unless those source tables are joined with visible methodology.'
  ]
};
