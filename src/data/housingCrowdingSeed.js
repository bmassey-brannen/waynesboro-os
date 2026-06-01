export const housingCrowdingSeed = {
  sourceName: 'Census Reporter ACS Occupants per Room table B25014',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25014&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B25014',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro, GA',
  retrievedAt: '2026-06-01T00:00:00Z',
  totalOccupiedUnits: 2204,
  totalMoe: 243,
  tenure: [
    { id: 'owner-occupied', label: 'Owner occupied', estimate: 648, moe: 216, displayValue: '648', share: 0.2940, displayShare: '29.4%' },
    { id: 'renter-occupied', label: 'Renter occupied', estimate: 1556, moe: 240, displayValue: '1,556', share: 0.7060, displayShare: '70.6%' }
  ],
  occupancyBands: [
    { id: 'owner-low-density', tenure: 'Owner occupied', label: '≤0.50 occupants / room', estimate: 525, moe: 201, shareOfTenure: 0.8102, displayShareOfTenure: '81.0%' },
    { id: 'owner-standard-density', tenure: 'Owner occupied', label: '0.51–1.00 occupants / room', estimate: 123, moe: 103, shareOfTenure: 0.1898, displayShareOfTenure: '19.0%' },
    { id: 'owner-overcrowded', tenure: 'Owner occupied', label: '>1.00 occupants / room', estimate: 0, moeApprox: 35, shareOfTenure: 0, displayShareOfTenure: '0.0%' },
    { id: 'renter-low-density', tenure: 'Renter occupied', label: '≤0.50 occupants / room', estimate: 680, moe: 241, shareOfTenure: 0.4370, displayShareOfTenure: '43.7%' },
    { id: 'renter-standard-density', tenure: 'Renter occupied', label: '0.51–1.00 occupants / room', estimate: 876, moe: 271, shareOfTenure: 0.5630, displayShareOfTenure: '56.3%' },
    { id: 'renter-overcrowded', tenure: 'Renter occupied', label: '>1.00 occupants / room', estimate: 0, moeApprox: 35, shareOfTenure: 0, displayShareOfTenure: '0.0%' }
  ],
  derived: [
    { id: 'all-overcrowded', label: 'Occupied units >1.00 occupants/room', value: 0, displayValue: '0', moeApprox: 49, share: 0, displayShare: '0.0%' },
    { id: 'standard-or-less', label: 'Occupied units at or below 1.00 occupants/room', value: 2204, displayValue: '2,204', share: 1, displayShare: '100.0%' },
    { id: 'renter-share', label: 'Renter share of occupied units', value: 1556, displayValue: '1,556', share: 0.7060, displayShare: '70.6%' }
  ],
  comparison: [
    { geography: 'Waynesboro, GA', totalOccupiedUnits: 2204, overcrowdedUnits: 0, overcrowdedShare: '0.0%', renterShare: '70.6%', moeApprox: 49 },
    { geography: 'Burke County, GA', totalOccupiedUnits: 9184, overcrowdedUnits: 71, overcrowdedShare: '0.8%', renterShare: '30.0%', moeApprox: 80 },
    { geography: 'Georgia', totalOccupiedUnits: 4074366, overcrowdedUnits: 97290, overcrowdedShare: '2.4%', renterShare: '34.3%', moeApprox: 2694 }
  ],
  caveat: 'ACS B25014 is survey planning context only. A zero estimate with nonzero margin of error must not be interpreted as proof no household is crowded; it is not a code-enforcement, inspection, rent-roll, occupancy-certificate, homelessness, household-level, or municipal service record.',
  posture: 'Useful as a housing-condition pressure lens when paired with cost burden, housing age, qPublic/parcel exports, code-enforcement aggregates, LIHTC/DCA records, and local service-provider evidence.',
  nextActions: [
    'Pair B25014 with B25070/B25091 cost-burden and B25034 housing-age context before making affordability or rehab recommendations.',
    'Request or manually review local housing/code-enforcement aggregates before treating crowding pressure as an operational workload signal.',
    'Propagate margins of error for derived shares before any public narrative claim beyond source-context display.'
  ]
};
