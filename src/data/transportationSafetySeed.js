export const transportationSafetySeed = {
  sourceName: 'Georgia DOT Crash Reporting and Crash Data Dashboard routes',
  primaryUrl: 'https://www.dot.ga.gov/GDOT/Pages/CrashReporting.aspx',
  dashboardUrl: 'https://gdot.numetric.net/georgia-crash-data-dashboard/',
  safetyPortalUrl: 'https://gdot.aashtowaresafety.com/',
  trafficUrl: 'https://511ga.org/',
  retrievedAt: '2026-06-01T00:00:00Z',
  geography: 'Georgia statewide crash-reporting, crash-dashboard, safety-analysis, and traveler-information surfaces; Burke County / Waynesboro filters must be manually confirmed before local use',
  accessMethod: 'Low-volume public route check only. Do not scrape dynamic dashboard apps, bypass upgrade/auth flows, or present filtered crash counts until export/share permissions and reporting coverage are verified.',
  observedShape: {
    crashReportingPage: 'HTTP 200 public GDOT route reached',
    numetricDashboard: 'Public dashboard route identified; runtime check returned HTTP 426 upgrade-required in this environment, so use browser/manual review first',
    safetyPortal: 'Public safety-analysis portal route identified; runtime check returned HTTP 426 upgrade-required in this environment, so use browser/manual review first',
    travelerInfoPage: 'HTTP 200 public 511GA route reached for incidents/traffic context; not a historic crash data source'
  },
  routes: [
    {
      label: 'GDOT Crash Reporting',
      url: 'https://www.dot.ga.gov/GDOT/Pages/CrashReporting.aspx',
      dataType: 'Official crash-reporting page and routing context',
      integrationUse: 'Source label for crash data methodology and links before any public-safety trend card uses roadway crash counts.'
    },
    {
      label: 'Georgia Crash Data Dashboard',
      url: 'https://gdot.numetric.net/georgia-crash-data-dashboard/',
      dataType: 'Public crash dashboard surface, likely interactive/dynamic',
      integrationUse: 'Manual county/city/corridor filter testing; cache only permitted exports or citation screenshots with retrieval date.'
    },
    {
      label: 'AASHTOWare Safety / Georgia Safety Data Portal',
      url: 'https://gdot.aashtowaresafety.com/',
      dataType: 'Safety-analysis portal route',
      integrationUse: 'Confirm public access scope and export terms before using for corridor risk or crash-history panels.'
    },
    {
      label: '511 Georgia',
      url: 'https://511ga.org/',
      dataType: 'Traveler information, incidents, cameras, road conditions where published',
      integrationUse: 'Possible live readiness link only; do not confuse with historic crash, police incident, or response-time records.'
    }
  ],
  nextActions: [
    'Open GDOT/Numetric dashboard manually and test Burke County, Waynesboro, state-route, and date filters.',
    'Confirm whether public exports, stable share URLs, or documented APIs exist; if not, keep only citation/source-route metadata.',
    'Keep roadway crash context separate from police incident data, emergency response time, crime trend, and local street-condition claims.'
  ],
  caveat: 'Transportation-safety source route only. No crash counts, crash trends, corridor rankings, police incidents, or response-time claims are asserted until official exports or reviewed public rows are attached.'
};
