export const trafficCountSourceSeed = {
  sourceName: 'Georgia DOT Traffic Analysis & Data Application (TADA)',
  sourceUrl: 'https://gdottrafficdata.drakewell.com/publicmultinodemap.asp',
  supportingUrl: 'https://www.dot.ga.gov/GDOT/Pages/RoadTrafficData.aspx',
  retrievedAt: '2026-06-01T14:36:00+00:00',
  geography: 'Georgia statewide traffic-count station map; manually filter around Waynesboro / Burke County corridors before local claims',
  accessMethod: 'Public GDOT/Drakewell web app and GDOT Road Traffic Data page reached with low-volume HTTP checks. Use manual review and permitted report/export paths before caching any station rows.',
  status: 'Source route verified; station export rules pending',
  observedShape: {
    mapStatus: 'HTTP 200 public map application reached',
    roadTrafficDataPageStatus: 'HTTP 200 GDOT reference page reached',
    fieldsToConfirm: ['stationId', 'route', 'county', 'latitude', 'longitude', 'countYear', 'aadt', 'vehicleClass', 'direction', 'sourceReportUrl']
  },
  integrationUses: [
    'Replace downtown foot-traffic assumptions with source-labeled corridor-volume context after permitted station rows are exported.',
    'Support gateway/corridor planning questions beside ACS commute and LEHD data without implying live traffic or safety outcomes.',
    'Give Operations and Downtown drilldowns a defensible source route for AADT, not an executive headline KPI.'
  ],
  caveats: [
    'This seed contains no traffic counts, AADT values, station coordinates, road-condition scores, crash counts, or live traffic data.',
    'Do not scrape the web app or cache generated reports unless GDOT/Drakewell access terms and export paths permit it.',
    'Do not use traffic-count stations as proof of downtown foot traffic, retail demand, pedestrian activity, road safety, or city project priority without supporting local sources.'
  ],
  nextActions: [
    'Open TADA manually and identify count stations on US-25, SR-24, Liberty Street, and key Waynesboro gateways.',
    'Confirm whether reports expose stable public URLs or downloadable CSV/PDF outputs with GDOT attribution.',
    'Cache a small station metadata sample only after export permission and field definitions are clear.'
  ]
};
