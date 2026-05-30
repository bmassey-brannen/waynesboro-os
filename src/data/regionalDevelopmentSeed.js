export const regionalDevelopmentSeed = {
  sourceName: 'Georgia Department of Community Affairs DRI Submissions',
  sourceUrl: 'https://apps.dca.ga.gov/DRI/Submissions.aspx',
  detailUrl: 'https://apps.dca.ga.gov/DRI/AppSummary.aspx?driid=4155',
  retrievedAt: '2026-05-30T00:00:00Z',
  accessMethod: 'Public DCA submissions table and application-summary pages; low-volume cached seed only.',
  status: 'Source-identified seed',
  caveat: 'Single public DRI record used as a data-shape stub; do not treat as a complete development pipeline.',
  records: [
    {
      driId: '4155',
      projectName: 'St. George Crossing',
      developmentType: 'Mixed Use',
      county: 'Burke',
      jurisdiction: 'Waynesboro',
      regionalCommission: 'CSRA',
      submittedDate: '2024-02-26',
      currentStatus: 'Completed',
      determination: 'in the best interest of the region and therefore of the state',
      detailUrl: 'https://apps.dca.ga.gov/DRI/AppSummary.aspx?driid=4155'
    }
  ]
};
