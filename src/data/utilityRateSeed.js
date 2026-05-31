export const utilityRateSeed = {
  retrievedAt: '2026-05-31T00:00:00-04:00',
  sourceName: 'City of Waynesboro Water / Water Rates pages',
  sourceUrl: 'https://www.waynesboroga.com/124/Water',
  caveat: 'Official city pages and PDF links are indexed as a public reference surface only. Rate amounts, watering rules, fees, and customer-service details must be verified directly against the linked city pages/PDFs before being treated as current facts.',
  references: [
    {
      label: 'Water Department',
      url: 'https://www.waynesboroga.com/124/Water',
      type: 'Official city department page',
      observedAccess: 'Public CivicPlus page returned HTTP 200 in low-volume source check.',
      integrationUse: 'Operations source hub for water-service context and links to rate/schedule references.'
    },
    {
      label: 'About Our Water',
      url: 'https://www.waynesboroga.com/216/About-Our-Water',
      type: 'Official city water information page',
      observedAccess: 'Public page returned HTTP 200; linked from the Water Department page.',
      integrationUse: 'Reference page for water-system public information before citing any claims.'
    },
    {
      label: 'Water Rates',
      url: 'https://www.waynesboroga.com/219/Water-Rates',
      type: 'Official city rates page',
      observedAccess: 'Public page returned HTTP 200 and linked a 2025 Schedule of Rates and Fees document.',
      integrationUse: 'Candidate source for future utility-cost cards after manual extraction/QA.'
    },
    {
      label: '2025 Schedule of Rates and Fees',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/877/2025-Schedule-of-Rates-and-Fees',
      type: 'City DocumentCenter fee schedule',
      observedAccess: 'Public DocumentCenter link discovered from Water Rates page; content must be opened and manually checked before parsing.',
      integrationUse: 'Potential normalized fee/rate seed for water, sewer, sanitation, and administrative charges.'
    },
    {
      label: 'Outdoor Watering Restrictions',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/143/Outdoor-Watering-Restrictions?bidId=',
      type: 'City DocumentCenter PDF',
      observedAccess: 'Public PDF returned HTTP 200 during low-volume source check.',
      integrationUse: 'Candidate policy/reference citation for drought/readiness and water-use guidance; not telemetry.'
    }
  ]
};
