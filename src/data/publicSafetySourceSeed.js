export const publicSafetySourceSeed = {
  posture: 'Public-safety operating metrics remain synthetic until official aggregate incident, response-time, or crime-reporting data is released or obtained through a lawful records process.',
  retrievedAt: '2026-06-01T00:00:00Z',
  sources: [
    {
      label: 'GBI Crime Statistics',
      url: 'https://gbi.georgia.gov/services/crime-statistics',
      dataType: 'State public crime-statistics service page and Georgia crime-reporting context',
      accessMethod: 'Public web page; use as reference surface first, then identify any official downloadable reports or agency-level tables before normalizing.',
      status: 'Reference ready',
      integrationUse: 'Validate whether Waynesboro/Burke County agency-level crime counts are published through GBI before replacing demo public-safety trends.'
    },
    {
      label: 'FBI Crime Data Explorer',
      url: 'https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home',
      dataType: 'National public crime data portal and agency/reporting context',
      accessMethod: 'Public web app/API surface; runtime API probe to api.usa.gov timed out from this environment, so use manual portal confirmation or a later low-volume API retry.',
      status: 'Endpoint needs confirmation',
      integrationUse: 'Potential agency-level crime baseline once the correct ORI/reporting agency is identified and response reliability is confirmed.'
    },
    {
      label: 'City Police / Fire pages',
      url: 'https://www.waynesboroga.com/122/Police',
      dataType: 'Official department service/contact pages',
      accessMethod: 'Public city pages only; no dispatch/private system access.',
      status: 'Reference only',
      integrationUse: 'Anchor department context while incident counts, response times, and call categories remain request/export dependent.'
    },
    {
      label: 'Burke County E-911 page',
      url: 'https://www.burkecounty-ga.gov/departments/e911.php',
      dataType: 'Emergency communications department context and public contacts',
      accessMethod: 'Public county information page; records-level data requires official aggregate release or records request.',
      status: 'Records path identified',
      integrationUse: 'Future source path for aggregate call volume and response-time questions, not live dispatch telemetry.'
    },
    {
      label: 'GEMA/HS Burke County profile',
      url: 'https://gema.georgia.gov/locations/burke',
      dataType: 'Official Georgia Emergency Management and Homeland Security Agency county location/profile route',
      accessMethod: 'Public state page reached by low-volume route check; use as emergency-management contact/source routing only until published plans or aggregates are reviewed.',
      status: 'Emergency route indexed',
      integrationUse: 'Adds a state emergency-management anchor for preparedness, hazard, and coordination drilldowns without implying live incident status or response capability.'
    },
    {
      label: 'Burke County Sheriff public site',
      url: 'https://www.burkecountysheriff.com/',
      dataType: 'Official sheriff public information surface for department context, divisions, and public notices where published',
      accessMethod: 'Public web page; manual review before extracting any reports, notices, jail, warrant, or incident information.',
      status: 'Agency route indexed',
      integrationUse: 'Cross-check agency identity and published public-safety context before trying to map GBI/FBI ORI rows or county-level safety indicators.'
    },
    {
      label: 'GDOT Crash Data & Reporting',
      url: 'https://www.dot.ga.gov/GDOT/Pages/CrashReporting.aspx',
      dataType: 'State crash-reporting source hub with GDOT Crash Data Dashboard, AASHTOWare Safety, GEARS references, and crash report documentation',
      accessMethod: 'Public GDOT page plus public dashboard/safety portal routes; dashboard apps require manual review before any automated connector or local crash claims.',
      status: 'Seed connector ready',
      integrationUse: 'Potential roadway/crash-safety context for corridors and downtown access after geography filters, dashboard export rules, and publication caveats are verified.'
    },
    {
      label: '511 Georgia',
      url: 'https://511ga.org/',
      dataType: 'Public traveler-information route for incidents, cameras, road conditions, and traffic where published',
      accessMethod: 'Public web route; use as readiness/source link only unless a documented public feed/export is confirmed.',
      status: 'Reference route indexed',
      integrationUse: 'Keep live road-condition awareness separate from historic crash counts, police incidents, response times, and local street-condition claims.'
    }
  ],
  nextQuestions: [
    'Which agency/ORI should represent City of Waynesboro police reporting in FBI CDE or GBI tables?',
    'Does the city, sheriff, county EMA, or E-911 office publish monthly aggregate incident, fire, EMS, emergency-management, or call-volume reports?',
    'Can GDOT crash dashboard filters/export rules support Burke County or Waynesboro corridor safety summaries without scraping the web app?',
    'What fields can be safely requested as aggregate public records without exposing private incident details?'
  ]
};
