export const stateLaborMarketExplorerSeed = {
  id: 'georgia-dol-labor-market-explorer',
  name: 'Georgia Department of Labor / Employ Georgia Labor Market Explorer',
  sourceUrl: 'https://explorer.gdol.ga.gov/vosnet/Default.aspx',
  dataType: 'State labor-market explorer route for workforce, employer, occupation, and labor-market reports',
  geography: 'Georgia statewide portal with county/regional filters to be verified for Burke County and Waynesboro-area context',
  accessMethod: 'Public web application route; low-volume HTTP check only. Use manual exports or documented download paths before automation.',
  observedShape: {
    httpStatus: 200,
    contentType: 'text/html; charset=utf-8',
    routeType: 'ASP.NET public labor-market explorer landing page',
    credentialRequiredForLandingPage: false,
    checkedAt: '2026-06-01T14:07:33Z'
  },
  integrationDifficulty: 'Medium',
  updateCadence: 'State labor-market reports are updated as GDOL publishes them; exact report-level cadence and export stability still need confirmation.',
  integrationUses: [
    'Cross-check Burke County workforce and occupation context against BLS LAUS/QCEW and ACS seeds',
    'Find public employer/industry report paths that can support economic-development drilldowns',
    'Keep state workforce source routing visible without promoting monthly city unemployment claims'
  ],
  nextQuestions: [
    'Which GDOL Explorer reports support stable Burke County filters and export/download links without login?',
    'Can occupation, employer, or industry tables be exported as CSV/XLS with retrieval timestamps?',
    'How should GDOL state reports be reconciled with BLS LAUS/QCEW revisions before public briefing claims?'
  ],
  caveat: 'Route evidence only. This seed does not provide city unemployment, employer counts, job postings, wage records, business licenses, or program-participant data.'
};
