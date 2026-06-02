export const mentalHealthResourcesSeed = {
  sourceName: 'City of Waynesboro Mental Health Resources page',
  sourceUrl: 'https://www.waynesboroga.com/265/Mental-Health-Resources',
  retrievedAt: '2026-06-01T00:00:00.000Z',
  accessMethod: 'Public CivicPlus page; low-volume source-route review only.',
  status: 'Official local resource route indexed',
  geography: 'Waynesboro, Georgia residents; local, state, and national resource links listed by the city.',
  caveat: 'Source route only. This panel is not a clinical recommendation, provider endorsement, utilization count, emergency dispatch tool, eligibility finding, or measure of local mental-health burden.',
  observedShape: [
    { label: 'Local resource page', value: 'HTTP 200', detail: 'City-hosted page with community-resource framing and local/national links.' },
    { label: 'Local provider examples', value: 'Address/phone text', detail: 'Page text lists local/regional counseling and treatment resources; manual QA required before structured provider display.' },
    { label: 'Crisis routes', value: '988 / GCAL', detail: 'Links include 988 Georgia, Georgia Crisis and Access Line, and national crisis/help resources.' }
  ],
  links: [
    {
      label: 'City resource page',
      title: 'Mental Health Resources | Waynesboro, GA',
      url: 'https://www.waynesboroga.com/265/Mental-Health-Resources',
      use: 'Official local source hub for public-facing service-navigation links.'
    },
    {
      label: 'State crisis access',
      title: 'Georgia Crisis and Access Line (GCAL)',
      url: 'https://www.georgiacollaborative.com/providers/georgia-crisis-and-access-line-gcal/',
      use: 'Reference route only; do not ingest private help-seeking or call records.'
    },
    {
      label: '988 Georgia',
      title: '988 Suicide & Crisis Lifeline in Georgia',
      url: 'https://988ga.org/',
      use: 'Crisis-resource link; display as public information, not municipal incident telemetry.'
    },
    {
      label: 'State agency hub',
      title: 'Georgia DBHDD',
      url: 'https://dbhdd.georgia.gov/',
      use: 'State behavioral-health source route for future aggregate program/context research.'
    }
  ],
  nextActions: [
    'Manually QA the city page and linked providers before exposing any structured provider names, addresses, or phone numbers.',
    'Pair with ACS health insurance, CDC PLACES, local clinic/hospital/service-location data, and public-health partners before the public dashboard supports health-access recommendations.',
    'Keep crisis links as public reference routes only; never scrape, infer, or display private help-seeking, call, patient, or eligibility data.'
  ]
};
