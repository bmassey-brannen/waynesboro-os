export const publicSafetySourceSeed = {
  posture: 'Public-safety operating metrics remain synthetic until official aggregate incident, response-time, or crime-reporting data is released or obtained through a lawful records process.',
  retrievedAt: '2026-05-31T00:00:00Z',
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
      label: 'GDOT Crash Data & Reporting',
      url: 'https://www.dot.ga.gov/GDOT/Pages/CrashReporting.aspx',
      dataType: 'State crash-reporting source hub with GDOT Crash Data Dashboard link, GEARS references, and crash report documentation',
      accessMethod: 'Public GDOT page; dashboard is a public web app but should be manually reviewed before any automated connector or local crash claims.',
      status: 'Road-safety source routed',
      integrationUse: 'Potential roadway/crash-safety context for corridors and downtown access after geography filters, dashboard export rules, and publication caveats are verified.'
    }
  ],
  nextQuestions: [
    'Which agency/ORI should represent City of Waynesboro police reporting in FBI CDE or GBI tables?',
    'Does the city or county publish monthly aggregate incident, fire, EMS, or E-911 call-volume reports?',
    'Can GDOT crash dashboard filters/export rules support Burke County or Waynesboro corridor safety summaries without scraping the web app?',
    'What fields can be safely requested as aggregate public records without exposing private incident details?'
  ]
};
