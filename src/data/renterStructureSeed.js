export const renterStructureSeed = {
  sourceName: 'Census Reporter ACS B25032 · Tenure by units in structure',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25032&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B25032',
  release: { id: 'acs2024_5yr', name: 'ACS 2024 5-year', years: '2020-2024' },
  retrievedAt: '2026-06-01T08:34:02Z',
  geography: {
    city: { geoid: '16000US1380984', name: 'Waynesboro, GA' },
    county: { geoid: '05000US13033', name: 'Burke County, GA' },
    state: { geoid: '04000US13', name: 'Georgia' }
  },
  totalOccupiedUnits: 2204,
  totalOccupiedMoe: 243,
  ownerOccupiedUnits: 648,
  renterOccupiedUnits: 1556,
  renterOccupiedMoe: 240,
  metrics: [
    {
      id: 'renter-share',
      label: 'Renter-occupied share',
      estimate: 1556,
      denominator: 2204,
      share: 70.6,
      displayValue: '1,556',
      displayShare: '70.6%',
      moe: 240,
      fieldId: 'B25032013',
      planningUse: 'Tenure context for housing, mobility, affordability, and service-location questions.'
    },
    {
      id: 'renter-single-detached',
      label: 'Renter units · 1 detached',
      estimate: 579,
      denominator: 1556,
      share: 37.2,
      displayValue: '579',
      displayShare: '37.2%',
      moe: 206,
      fieldId: 'B25032014',
      planningUse: 'Renter single-family context before parcel ownership, landlord, or code-enforcement claims.'
    },
    {
      id: 'renter-2-4-unit',
      label: 'Renter units · 2-4 structures',
      estimate: 725,
      denominator: 1556,
      share: 46.6,
      displayValue: '725',
      displayShare: '46.6%',
      moeApprox: 241,
      fieldIds: ['B25032016', 'B25032017'],
      planningUse: 'Missing-middle / small multifamily rental context before zoning, parcel, or permit evidence is promoted.'
    },
    {
      id: 'renter-5-plus-unit',
      label: 'Renter units · 5+ structures',
      estimate: 242,
      denominator: 1556,
      share: 15.6,
      displayValue: '242',
      displayShare: '15.6%',
      moeApprox: 122,
      fieldIds: ['B25032018', 'B25032019', 'B25032020', 'B25032021'],
      planningUse: 'Apartment-scale context; not a unit inventory, property list, or occupancy record.'
    }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      renterShare: '70.6%',
      renterDetachedShare: '37.2%',
      renterSmallMultifamilyShare: '46.6%',
      renterApartmentScaleShare: '15.6%'
    },
    {
      geography: 'Burke County',
      renterShare: '30.0%',
      renterDetachedShare: '39.8%',
      renterSmallMultifamilyShare: '29.8%',
      renterApartmentScaleShare: '10.2%'
    },
    {
      geography: 'Georgia',
      renterShare: '34.3%',
      renterDetachedShare: '33.5%',
      renterSmallMultifamilyShare: '13.2%',
      renterApartmentScaleShare: '41.5%'
    }
  ],
  caveat: 'ACS B25032 is household survey context only. Do not treat it as parcel inventory, rental registry, landlord ownership data, zoning determination, permit history, rent roll, code-enforcement evidence, or municipal telemetry.',
  nextSources: [
    'qPublic / parcel export with owner and land-use fields',
    'City zoning map and permitted-use review',
    'Building permit history and code-enforcement aggregates',
    'Local rental/property-management records if publicly obtainable'
  ]
};
