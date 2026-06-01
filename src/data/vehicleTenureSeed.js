export const vehicleTenureSeed = {
  id: 'acs-b25044-vehicle-tenure',
  table: 'B25044',
  title: 'Tenure by vehicles available',
  release: 'ACS 2024 5-year',
  years: '2020-2024',
  sourceName: 'Census Reporter / U.S. Census ACS table B25044',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25044&geo_ids=16000US1380984,05000US13033,04000US13',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  retrievedAt: '2026-06-01T05:27:53Z',
  geography: {
    city: '16000US1380984',
    county: '05000US13033',
    state: '04000US13'
  },
  metrics: [
    {
      id: 'city-zero-vehicle-total',
      label: 'All zero-vehicle households',
      estimate: 353,
      totalHouseholds: 2204,
      share: 16.0,
      displayValue: '353',
      displayShare: '16.0%',
      displayMoe: 'MOE derived from owner/renter cells pending',
      planningUse: 'Mobility-access and service-location questions only.'
    },
    {
      id: 'owner-zero-vehicle',
      label: 'Owner households with no vehicle',
      estimate: 0,
      totalHouseholds: 648,
      moe: 20,
      share: 0.0,
      displayValue: '0',
      displayShare: '0.0%',
      displayMoe: 'MOE ±20',
      planningUse: 'Zero estimate has nonzero MOE; do not treat as absence of need.'
    },
    {
      id: 'renter-zero-vehicle',
      label: 'Renter households with no vehicle',
      estimate: 353,
      totalHouseholds: 1556,
      moe: 195,
      share: 22.7,
      displayValue: '353',
      displayShare: '22.7%',
      displayMoe: 'MOE ±195',
      planningUse: 'Planning context for transit, service locations, downtown access, and emergency communications.'
    },
    {
      id: 'renter-one-vehicle',
      label: 'Renter households with one vehicle',
      estimate: 804,
      totalHouseholds: 1556,
      moe: 232,
      share: 51.7,
      displayValue: '804',
      displayShare: '51.7%',
      displayMoe: 'MOE ±232',
      planningUse: 'Helps distinguish zero-access issues from single-car household fragility.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', totalHouseholds: 2204, zeroVehicleEstimate: 353, zeroVehicleShare: '16.0%', renterZeroVehicleShare: '22.7%' },
    { geography: 'Burke County', totalHouseholds: 9184, zeroVehicleEstimate: 823, zeroVehicleShare: '9.0%', renterZeroVehicleShare: '21.6%' },
    { geography: 'Georgia', totalHouseholds: 4074366, zeroVehicleEstimate: 240272, zeroVehicleShare: '5.9%', renterZeroVehicleShare: '12.8%' }
  ],
  evidenceLadder: [
    {
      label: 'ACS survey context',
      value: 'B08201 + B25044',
      note: 'Household vehicle availability and tenure split; margins of error visible.'
    },
    {
      label: 'Route / access next',
      value: 'Service locations + local transit/nonprofit routes',
      note: 'Needed before translating vehicle access into program or facility recommendations.'
    },
    {
      label: 'Corridor evidence',
      value: 'GDOT / commute / safety sources',
      note: 'Needed before any road, traffic, transit, or pedestrian-safety conclusion.'
    }
  ],
  posture: 'ACS B25044 is household survey context for mobility and service-access planning. It is not vehicle registration data, transit ridership, traffic volume, school transportation records, emergency-response evidence, code-enforcement evidence, or municipal telemetry.',
  caveat: 'Zero estimates can carry nonzero margins of error; derived combined shares need proper MOE propagation before public narrative claims.'
};
