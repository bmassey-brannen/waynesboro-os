export const hudUspsVacancySeed = {
  sourceName: 'HUD User USPS Vacancy Data',
  sourceUrl: 'https://www.huduser.gov/portal/datasets/usps.html',
  retrievedAt: '2026-06-01T00:00:00Z',
  geography: 'Census tract / ZIP-level vacancy context; filter to Waynesboro/Burke County only after permitted download and geography crosswalk QA',
  dataType: 'USPS administrative address counts for residential/business vacancies and no-stat addresses, distributed by HUD User as aggregate research files',
  accessMethod: 'Public HUD User dataset landing page reached with low-volume HTTP check. Manual download/terms review required before caching any tract/ZIP rows.',
  cadence: 'Quarterly releases when HUD updates the USPS vacancy dataset',
  integrationDifficulty: 'Medium',
  status: 'Source route verified',
  caveat: 'This seed is a housing-vacancy source route only. It contains no Waynesboro vacancy count, parcel vacancy finding, code-enforcement record, landlord list, downtown storefront occupancy status, or address-level USPS data.',
  candidateShape: [
    { field: 'geographyId', meaning: 'Census tract, ZIP, or other published geography identifier after download QA' },
    { field: 'period', meaning: 'Quarter/year attached to the HUD User USPS release' },
    { field: 'residentialAddresses', meaning: 'Aggregate residential address universe if included in permitted file' },
    { field: 'residentialVacant', meaning: 'Aggregate residential vacancy count/rate if included in permitted file' },
    { field: 'businessVacant', meaning: 'Aggregate business vacancy count/rate if included in permitted file' },
    { field: 'sourceUrl', meaning: 'Release or file URL retained with every normalized row' }
  ],
  nextActions: [
    'Review HUD User dataset terms and download workflow manually before adding a scheduled connector.',
    'Confirm the smallest public geography that can be joined safely to Waynesboro boundaries without implying parcel-level vacancy.',
    'Reconcile USPS vacancy context against ACS B25002, qPublic parcel samples, city business-directory routes, permits, code-enforcement aggregates, and field verification before any public vacancy claim.'
  ]
};
