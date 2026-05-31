export const transportationProjectSeed = {
  sourceName: 'Georgia DOT GeoPI Project Information',
  sourceUrl: 'https://www.dot.ga.gov/applications/geopi/Pages/Dashboard.aspx',
  mapUrl: 'https://gdot.maps.arcgis.com/apps/webappviewer/index.html?id=1ef99c71274b4d2aaa4ed1be88ef54e8',
  retrievedAt: '2026-05-31T11:41:51+00:00',
  geography: 'Georgia statewide project-information surface; filter manually to Burke County / Waynesboro before local claims',
  accessMethod: 'Public GDOT web application reached with low-volume HTTP 200 check; use manual browser review and permitted exports/share links before caching project rows.',
  observedShape: {
    pageTitle: 'GeoPI Project Information',
    dashboardStatus: 'HTTP 200 public GDOT application surface reached',
    mapStatus: 'HTTP 200 public ArcGIS web-app surface reached',
    fieldsToConfirm: ['projectId', 'projectName', 'county', 'route', 'phase', 'letDate', 'status', 'cost', 'fundingProgram', 'sourceUrl']
  },
  routes: [
    {
      label: 'GeoPI Dashboard',
      url: 'https://www.dot.ga.gov/applications/geopi/Pages/Dashboard.aspx',
      dataType: 'Project search / project information web app',
      integrationUse: 'Manual source route for GDOT transportation projects before any project tracker row is promoted.'
    },
    {
      label: 'Project Search Map',
      url: 'https://gdot.maps.arcgis.com/apps/webappviewer/index.html?id=1ef99c71274b4d2aaa4ed1be88ef54e8',
      dataType: 'Public ArcGIS project map surface',
      integrationUse: 'Candidate map/filter path for Burke County corridor context after export/share rules are verified.'
    }
  ],
  nextActions: [
    'Open GeoPI manually and test Burke County / Waynesboro filters; record only shareable project links or exported public rows.',
    'Separate GDOT state-route projects from City of Waynesboro capital projects, utility work, and local resurfacing lists.',
    'If stable rows exist, cache a small project identity snapshot with retrieval date, source URL, phase/status definitions, and no unsupported cost/schedule claims.'
  ],
  caveat: 'Source-routing seed only. This is not a confirmed Waynesboro project list, capital plan, road-condition score, construction schedule, or funding claim until specific GDOT rows are filtered, timestamped, and manually verified.'
};
