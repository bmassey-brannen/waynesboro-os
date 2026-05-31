export const civicParticipationSeed = {
  sourceName: 'Burke County Board of Elections and Registration + Georgia Secretary of State MVP',
  retrievedAt: '2026-05-31T09:24:39.000Z',
  status: 'Source routes identified',
  geography: 'Burke County / Waynesboro voters and precinct context',
  accessMethod: 'Public county department page and public Georgia SOS voter/election portal; reference links only, no voter-record scraping or private lookup automation.',
  caveat: 'Use this as civic participation source routing only. Do not display voter-level records, infer turnout, or claim precinct results until official aggregate reports or election results exports are manually verified.',
  routes: [
    {
      label: 'Burke County Board of Elections and Registration',
      url: 'https://www.burkecounty-ga.gov/departments/board_of_elections_and_registration.php',
      dataType: 'County elections office page, public election administration contacts and voter-information link path',
      status: 'Public page reached',
      integrationUse: 'Anchor a civic participation / election-admin source lane without touching private voter records.'
    },
    {
      label: 'Georgia Secretary of State elections portal / MVP',
      url: 'https://mvp.sos.ga.gov/s/',
      dataType: 'State voter/election portal for voter-facing lookup and election information',
      status: 'Public portal reached',
      integrationUse: 'Reference-only route for voter/election information; never automate private voter lookups.'
    },
    {
      label: 'Georgia Secretary of State main elections surface',
      url: 'https://sos.ga.gov/',
      dataType: 'State elections information and public election administration resources',
      status: 'Linked from county page',
      integrationUse: 'Manual path to public election calendars, notices, candidate/election resources, and official result links if exposed.'
    },
    {
      label: 'Burke County public sitemap',
      url: 'https://www.burkecounty-ga.gov/sitemap.php',
      dataType: 'County department navigation showing elections/registration source route',
      status: 'Public page reached',
      integrationUse: 'Low-volume source discovery / route verification only.'
    }
  ],
  nextActions: [
    'Manually identify official aggregate results/turnout exports before any election trend card is added.',
    'Keep voter-facing portals as links only; do not automate private voter lookups or credentialed workflows.',
    'If civic engagement metrics are needed, request or download aggregate precinct/municipal results with source dates and election names.'
  ]
};
