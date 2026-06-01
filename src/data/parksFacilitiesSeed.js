export const parksFacilitiesSeed = {
  sourceName: 'City of Waynesboro Facilities directory',
  sourceUrl: 'https://www.waynesboroga.com/Facilities',
  retrievedAt: '2026-06-01T00:00:00.000Z',
  accessMethod: 'Public CivicEngage Facilities pages; low-volume HTTP 200 checks for the directory and five facility-detail routes; no forms submitted.',
  geography: 'City of Waynesboro public facilities and parks pages',
  status: 'Official route index ready',
  posture: 'This is a service-location and civic-asset source route only. It is not a parks condition assessment, reservation log, program attendance count, maintenance backlog, capital-improvement plan, accessibility audit, or live facility telemetry.',
  observedShape: {
    directoryStatus: 200,
    facilityRoutesObserved: 5,
    detailPagesChecked: 5,
    namedFacilities: ['City Park', 'Mini Park', 'Park at Liberty and Ninth', 'Davis Park (Sixth Street Park)', 'City of Waynesboro Ice Plant'],
    directoryLabels: ['Find A Facility', 'Features', 'Desirable Days', 'Facilities']
  },
  facilities: [
    {
      id: 'city-park',
      name: 'City Park',
      type: 'Park / civic gathering space',
      url: 'https://www.waynesboroga.com/Facilities/Facility/Details/City-Park-1',
      observedFeatures: ['Gazebo', 'Picnic Tables', 'Playground'],
      sourceSnippet: "Located at the corner of Liberty and Fifth Street next to St. Michael's Episcopal Church; gazebo reservation language appears on the facility detail page.",
      integrationUse: 'Useful anchor for a future service-location map, event/public-space inventory, and downtown civic asset layer after manual QA.'
    },
    {
      id: 'davis-park',
      name: 'Davis Park (Sixth Street Park)',
      type: 'Neighborhood park',
      url: 'https://www.waynesboroga.com/Facilities/Facility/Details/Davis-Park-Sixth-Street-Park-4',
      observedFeatures: ['Basketball Court', 'Benches', 'Playground'],
      sourceSnippet: 'Facility page describes the park as across from Thomas Grove Baptist Church on the west side of town with basketball courts and a play area.',
      integrationUse: 'Potential anchor for youth/recreation access and neighborhood amenity mapping once addresses and coordinates are verified.'
    },
    {
      id: 'ice-plant',
      name: 'City of Waynesboro Ice Plant',
      type: 'Event / meeting facility',
      url: 'https://www.waynesboroga.com/Facilities/Facility/Details/City-of-Waynesboro-Ice-Plant-6',
      observedFeatures: ['Chairs', 'Restrooms', 'Tables'],
      sourceSnippet: 'Facility page describes the Ice Plant as available for celebrations, family reunions, business meetings, and other affairs.',
      integrationUse: 'Good public-facility source for civic event capacity questions after rates, reservation rules, and ADA/access details are manually reviewed.'
    },
    {
      id: 'mini-park',
      name: 'Mini Park',
      type: 'Small park route',
      url: 'https://www.waynesboroga.com/Facilities/Facility/Details/Mini-Park-2',
      observedFeatures: [],
      sourceSnippet: 'Official facility detail route returned HTTP 200; content needs manual feature/address review before mapping.',
      integrationUse: 'Keep as route metadata until coordinates/features are confirmed.'
    },
    {
      id: 'liberty-ninth',
      name: 'Park at Liberty and Ninth',
      type: 'Small park route',
      url: 'https://www.waynesboroga.com/Facilities/Facility/Details/Park-at-Liberty-and-Ninth-3',
      observedFeatures: [],
      sourceSnippet: 'Official facility detail route returned HTTP 200; content needs manual feature/address review before mapping.',
      integrationUse: 'Keep as route metadata until coordinates/features are confirmed.'
    }
  ],
  nextActions: [
    'Manually verify addresses/coordinates before placing facilities on the schematic map.',
    'Check reservation/rate documents before displaying costs, availability, or permitted uses.',
    'Pair with parks budgets, maintenance work orders, ADA/facility inventories, and recreation-program calendars before Council recommendations.'
  ],
  caveat: 'Official facility pages can anchor a public civic-asset inventory, but they do not prove condition, capacity, utilization, safety, accessibility, or capital need.'
};
