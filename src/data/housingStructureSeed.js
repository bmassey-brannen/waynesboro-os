export const housingStructureSeed = {
  sourceName: 'Census Reporter ACS Units in Structure table B25024',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25024&geo_ids=16000US1380984,05000US13033,04000US13',
  table: 'B25024',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro, GA',
  retrievedAt: '2026-05-31T00:00:00Z',
  totalHousingUnits: 2673,
  totalMoe: 334,
  groups: [
    { id: 'one-detached', code: 'B25024002', label: '1-unit detached', estimate: 1595, moe: 325, share: 0.5967, displayShare: '59.7%' },
    { id: 'one-attached', code: 'B25024003', label: '1-unit attached', estimate: 10, moe: 17, share: 0.0037, displayShare: '0.4%' },
    { id: 'two-units', code: 'B25024004', label: '2 units', estimate: 286, moe: 186, share: 0.1070, displayShare: '10.7%' },
    { id: 'three-four-units', code: 'B25024005', label: '3 or 4 units', estimate: 468, moe: 173, share: 0.1751, displayShare: '17.5%' },
    { id: 'five-nine-units', code: 'B25024006', label: '5 to 9 units', estimate: 144, moe: 88, share: 0.0539, displayShare: '5.4%' },
    { id: 'ten-nineteen-units', code: 'B25024007', label: '10 to 19 units', estimate: 6, moe: 15, share: 0.0022, displayShare: '0.2%' },
    { id: 'twenty-forty-nine-units', code: 'B25024008', label: '20 to 49 units', estimate: 36, moe: 46, share: 0.0135, displayShare: '1.3%' },
    { id: 'fifty-plus-units', code: 'B25024009', label: '50+ units', estimate: 56, moe: 72, share: 0.0209, displayShare: '2.1%' },
    { id: 'mobile-home', code: 'B25024010', label: 'Mobile home', estimate: 72, moe: 96, share: 0.0269, displayShare: '2.7%' },
    { id: 'boat-rv-van', code: 'B25024011', label: 'Boat, RV, van, etc.', estimate: 0, moe: 20, share: 0, displayShare: '0.0%' }
  ],
  derived: [
    { id: 'single-family', label: 'Single-family units', value: 1605, displayValue: '1,605', share: 0.6004, displayShare: '60.0%' },
    { id: 'small-multifamily', label: '2–4 unit structures', value: 754, displayValue: '754', share: 0.2821, displayShare: '28.2%' },
    { id: 'larger-multifamily', label: '5+ unit structures', value: 242, displayValue: '242', share: 0.0905, displayShare: '9.1%' },
    { id: 'mobile-home', label: 'Mobile homes', value: 72, displayValue: '72', share: 0.0269, displayShare: '2.7%' }
  ],
  comparison: [
    { geography: 'Waynesboro, GA', totalUnits: 2673, singleFamilyShare: '60.0%', smallMultifamilyShare: '28.2%', largerMultifamilyShare: '9.1%', mobileHomeShare: '2.7%' },
    { geography: 'Burke County, GA', totalUnits: 11300, singleFamilyShare: '58.4%', smallMultifamilyShare: '7.5%', largerMultifamilyShare: '2.8%', mobileHomeShare: '30.0%' },
    { geography: 'Georgia', totalUnits: 4541835, singleFamilyShare: '70.8%', smallMultifamilyShare: '5.1%', largerMultifamilyShare: '16.2%', mobileHomeShare: '7.8%' }
  ],
  caveat: 'ACS B25024 is survey housing-stock structure context only. It is not a parcel inventory, zoning determination, building-code record, occupancy certificate, tax record, permit history, rent-roll dataset, or affordability-program evidence.',
  posture: 'Useful for housing typology, infill strategy, infrastructure planning, and grant framing once paired with parcels, zoning, permits, LIHTC/DCA records, and local housing initiatives.',
  nextActions: [
    'Pair structure mix with qPublic/parcel exports and City zoning maps before making infill or density recommendations.',
    'Cross-check small multifamily context with permits, inspections, and local housing-program records before any project pipeline claim.',
    'Keep margins of error visible; some detailed B25024 cells have large MOE relative to estimates.'
  ]
};
