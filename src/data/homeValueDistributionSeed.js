export const homeValueDistributionSeed = {
  sourceName: 'Census Reporter ACS owner-occupied home value table B25075',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25075&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B25075',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro, GA',
  retrievedAt: '2026-05-31T00:00:00Z',
  universe: 'Owner-occupied housing units by value',
  totalOwnerOccupiedUnits: 648,
  totalMoe: 216,
  brackets: [
    { id: 'lt-100k', label: 'Under $100K', codes: ['B25075002', 'B25075003', 'B25075004', 'B25075005', 'B25075006', 'B25075007', 'B25075008', 'B25075009', 'B25075010', 'B25075011', 'B25075012', 'B25075013', 'B25075014'], estimate: 235, share: 0.3627, displayShare: '36.3%' },
    { id: '100k-199k', label: '$100K–$199K', codes: ['B25075015', 'B25075016', 'B25075017', 'B25075018'], estimate: 149, share: 0.2299, displayShare: '23.0%' },
    { id: '200k-299k', label: '$200K–$299K', codes: ['B25075019', 'B25075020'], estimate: 145, share: 0.2238, displayShare: '22.4%' },
    { id: '300k-plus', label: '$300K+', codes: ['B25075021', 'B25075022', 'B25075023', 'B25075024', 'B25075025', 'B25075026', 'B25075027'], estimate: 119, share: 0.1836, displayShare: '18.4%' }
  ],
  notableCells: [
    { code: 'B25075019', label: '$200,000 to $249,999', estimate: 124, moe: 117, displayShare: '19.1%' },
    { code: 'B25075014', label: '$90,000 to $99,999', estimate: 75, moe: 82, displayShare: '11.6%' },
    { code: 'B25075021', label: '$300,000 to $399,999', estimate: 75, moe: 73, displayShare: '11.6%' },
    { code: 'B25075016', label: '$125,000 to $149,999', estimate: 65, moe: 70, displayShare: '10.0%' }
  ],
  comparison: [
    { geography: 'Waynesboro, GA', totalOwnerOccupiedUnits: 648, under100kShare: '36.3%', oneHundredTo199Share: '23.0%', twoHundredPlusShare: '40.7%' },
    { geography: 'Burke County, GA', totalOwnerOccupiedUnits: 6429, under100kShare: '39.9%', oneHundredTo199Share: '23.2%', twoHundredPlusShare: '37.0%' },
    { geography: 'Georgia', totalOwnerOccupiedUnits: 2676357, under100kShare: '12.3%', oneHundredTo199Share: '16.0%', twoHundredPlusShare: '71.7%' }
  ],
  caveat: 'ACS B25075 is owner-occupied home-value survey context only. It is not an appraisal roll, parcel valuation export, tax assessment, sale record, rent-roll dataset, code-enforcement evidence, or affordability-program eligibility finding.',
  posture: 'Useful as a housing-market/value-distribution planning lens after pairing with qPublic parcels, tax digest, sales, permits, housing condition, and affordability-program records.',
  nextActions: [
    'Reconcile ACS value distribution with qPublic parcel assessed values and recent sales before making neighborhood or tax-base claims.',
    'Pair with housing cost burden, tenure, structure age, and LIHTC/DCA sources before affordability recommendations.',
    'Calculate derived margins of error for rollups before turning shares into public narrative claims.'
  ]
};
