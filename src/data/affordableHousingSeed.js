export const affordableHousingSeed = {
  sourceName: 'City of Waynesboro LIHTC submittal information',
  sourceUrl: 'https://www.waynesboroga.com/DocumentCenter/View/914/2026-LIHTC-submittal-info',
  cityRouteUrl: 'https://www.waynesboroga.com/279/Low-Income-Housing-Tax-Credit',
  stateProgramUrl: 'https://dca.georgia.gov/',
  retrievedAt: '2026-05-31T00:00:00-04:00',
  geography: 'City of Waynesboro, Georgia; state program context through Georgia DCA',
  accessMethod: 'Public City of Waynesboro DocumentCenter PDF route; low-volume source check only. State LIHTC program details should be manually confirmed on Georgia DCA before interpreting scoring or application requirements.',
  status: 'Official local PDF route verified',
  cadence: 'As city/DCA publish annual LIHTC notices, application-cycle documents, and state housing-credit materials',
  difficulty: 'Medium',
  caveat: 'This is a housing-policy/source-routing seed only. It does not claim affordable-housing unit counts, eligibility, award status, financing terms, project approvals, or development pipeline facts until the PDF and DCA records are manually reviewed and source-labeled.',
  routes: [
    {
      label: 'City LIHTC PDF route',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/914/2026-LIHTC-submittal-info',
      dataType: 'Local submittal notice / application-cycle reference PDF',
      integrationUse: 'Anchor housing-affordability and development-intake questions to an official city document route before replacing synthetic housing heat scores.'
    },
    {
      label: 'City LIHTC navigation route',
      url: 'https://www.waynesboroga.com/279/Low-Income-Housing-Tax-Credit',
      dataType: 'CivicPlus route resolving to the current city-hosted LIHTC document',
      integrationUse: 'Monitor whether the city updates the route for future application cycles without scraping private submissions.'
    },
    {
      label: 'Georgia DCA program cross-check',
      url: 'https://dca.georgia.gov/',
      dataType: 'State housing-program authority and LIHTC context route',
      integrationUse: 'Cross-check state terminology, application-cycle calendars, award records, and compliance context before the public dashboard cites housing-credit policy.'
    }
  ],
  normalizedShape: [
    { field: 'document_year', meaning: 'Application or notice year as stated in the city/DCA document after manual review' },
    { field: 'program_route', meaning: 'City LIHTC route, DCA program page, and any official application-cycle URL' },
    { field: 'project_or_applicant', meaning: 'Only if publicly disclosed in official documents; never infer from rumor or private submissions' },
    { field: 'status_label', meaning: 'Source-labeled notice, submitted, awarded, denied, under review, or unknown' },
    { field: 'evidence_url', meaning: 'Direct public URL and retrieval timestamp for every future housing-credit observation' }
  ],
  nextActions: [
    'Manually open the PDF and record title, date, responsible office, and required submission fields.',
    'Cross-check Georgia DCA LIHTC / Qualified Allocation Plan pages for the matching cycle and public award list.',
    'Keep housing heat-map numbers synthetic until unit counts, awards, permits, and project status are source-labeled.'
  ]
};
