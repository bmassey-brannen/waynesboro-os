export const gefaWaterInfrastructureSeed = {
  sourceName: 'Georgia Environmental Finance Authority Water Infrastructure Financing',
  sourceUrl: 'https://gefa.georgia.gov/water-programs/water-infrastructure-financing',
  retrievedAt: '2026-06-01T17:03:51Z',
  geography: 'Georgia statewide; Waynesboro/Burke applicability requires manual project, borrower, and award/loan verification',
  accessMethod: 'Public GEFA program page; low-volume route check only. Use published documents or approved exports if available before caching any project rows.',
  cadence: 'Program and board/publication updates as GEFA posts them; project/loan cadence must be confirmed from official GEFA materials',
  difficulty: 'Medium',
  status: 'Source route indexed',
  observedRoute: {
    url: 'https://gefa.georgia.gov/water-resources/water-and-sewer-financing',
    resolvedUrl: 'https://gefa.georgia.gov/water-programs/water-infrastructure-financing',
    httpStatus: 200,
    checkedAt: '2026-06-01T17:03:51Z'
  },
  dataType: 'State water/sewer financing program route for potential project, loan, grant, and infrastructure-funding context',
  integrationUse: [
    'Operations capital-plan source ladder for water, sewer, and wastewater infrastructure funding',
    'Cross-check against city budgets, agenda minutes, DCA/GEFA award documents, EPA/EPD water-system records, and project pages before public claims',
    'Future source-gated project ledger fields: borrower, program, award/loan amount, purpose, approval date, fiscal year, source document URL, and geography'
  ],
  caveat: 'This is a source-route stub only. It does not claim that Waynesboro has a current GEFA loan, grant, project, compliance issue, water/sewer capacity constraint, or funding award.',
  nextActions: [
    'Find GEFA board materials, award announcements, annual reports, or downloadable project lists that mention Waynesboro, Burke County, or relevant water/sewer borrowers.',
    'Reconcile any project row against City of Waynesboro agendas/budgets and Georgia EPD/EPA water-system records before displaying on Operations or Executive pages.',
    'Keep any future capital-funding card off the Executive headline until borrower, amount, date, purpose, geography, and source document are all attached.'
  ]
};
