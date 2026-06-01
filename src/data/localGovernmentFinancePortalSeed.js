export const localGovernmentFinancePortalSeed = {
  sourceName: 'Georgia Data Local Government Financial Portal / DCA RLGF',
  sourceUrl: 'https://georgiadata.org/financialdata',
  dcaReferenceUrl: 'https://dca.georgia.gov/community-assistance/government-authority-reporting/report-local-government-finance-rlgf',
  retrievedAt: '2026-06-01T15:10:00Z',
  geography: 'Georgia local governments; filter to City of Waynesboro and Burke County before display',
  accessMethod: 'Public no-login web portal and DCA reference pages; low-volume route verification only in this seed.',
  cadence: 'Annual Report of Local Government Finance submissions; portal/update cadence should be confirmed before scheduled ingestion.',
  status: 'Source route verified',
  integrationDifficulty: 'Medium',
  dataTypes: [
    'Local-government finance submission portal',
    'DCA Report of Local Government Finance reference materials',
    'Potential revenue, expenditure, debt, and fund-category context after row-level verification'
  ],
  verifiedRoutes: [
    {
      label: 'Local Government Financial Portal',
      url: 'https://georgiadata.org/financialdata',
      observedStatus: 200,
      note: 'Public portal route reached; filter/export behavior still requires manual review.'
    },
    {
      label: 'DCA Report of Local Government Finance (RLGF)',
      url: 'https://dca.georgia.gov/community-assistance/government-authority-reporting/report-local-government-finance-rlgf',
      observedStatus: 200,
      note: 'DCA reference page reached with TLS verification disabled due a certificate hostname mismatch in this runtime; browser/manual verification recommended.'
    }
  ],
  caveats: [
    'Do not show revenue, expenditure, fund-balance, debt, or tax claims until Waynesboro/Burke rows are filtered, dated, downloaded or cited, and reconciled against UGA CVIOG PDFs and city agendas.',
    'Treat the portal as a source route first; do not automate form workflows unless export/download terms are clear.',
    'Keep any future finance card labeled by fiscal year, government entity, report type, and retrieval date.'
  ],
  nextActions: [
    'Manually test entity/year filters for City of Waynesboro and Burke County.',
    'Identify whether the portal offers stable CSV/XLS/PDF exports or only interactive views.',
    'Build a small normalized finance-row shape only after export terms and fiscal-year definitions are confirmed.'
  ]
};
