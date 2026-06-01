export const gscccaPropertyRecordsSeed = {
  sourceName: 'Georgia Superior Court Clerks\' Cooperative Authority search portal',
  sourceUrl: 'https://www.gsccca.org/search',
  retrievedAt: '2026-06-01T16:32:47Z',
  geography: 'Georgia statewide; filter manually to Burke County / Waynesboro records before any local use',
  accessMethod: 'Public search index route with separate basic and premium search workflows; low-volume route/link discovery only in this seed.',
  status: 'Source route indexed',
  integrationDifficulty: 'Medium',
  observedRoutes: [
    {
      label: 'Search hub',
      url: 'https://www.gsccca.org/search',
      observedStatus: 'HTTP 200',
      use: 'Discover official real estate, PT-61 transfer, lien, plat, UCC, notary, and carbon-registry search paths.'
    },
    {
      label: 'Real Estate name search',
      url: 'https://search.gsccca.org/RealEstate/namesearch.asp',
      observedStatus: 'Linked from GSCCCA search hub',
      use: 'Manual clerk-index lookup path for recorded real-estate instruments; not a parcel assessment substitute.'
    },
    {
      label: 'PT-61 document search',
      url: 'https://search.gsccca.org/pt61/docnumsearch.asp',
      observedStatus: 'Linked from GSCCCA search hub',
      use: 'Manual transfer-tax / property-transfer document route after document number or name context is known.'
    },
    {
      label: 'Lien name search',
      url: 'https://search.gsccca.org/Lien/namesearch.asp',
      observedStatus: 'Linked from GSCCCA search hub',
      use: 'Manual lien-index route; do not publish party-level conclusions without document review and citation.'
    }
  ],
  fieldsToConfirm: [
    'Whether Burke County records are complete for the desired years and instrument types',
    'Whether address-level/PT-61 search requires premium access or account terms',
    'Permitted citation format for public record references',
    'Document images, book/page links, recording dates, grantor/grantee names, and parcel/address crosswalk availability'
  ],
  integrationUses: [
    'Cross-check qPublic parcel ownership changes with recorded deed/plat/PT-61 routes',
    'Build a source-gated property-history drilldown for downtown parcels after manual verification',
    'Support grantor/grantee, lien, and plat questions without scraping private or premium systems'
  ],
  caveats: [
    'This seed is an access-path index only; no deed, sale price, lien, ownership, vacancy, or property-condition claim is displayed.',
    'Do not automate account-only, premium, captcha-protected, or terms-restricted workflows without permission.',
    'Recorded instruments and assessor parcel records answer different questions; reconcile with qPublic, tax digest, and city/county documents before public conclusions.'
  ],
  nextActions: [
    'Manually test Burke County real-estate and PT-61 search filters for stable citation links and export permissions.',
    'Define a normalized recorded-instrument shape: county, instrument type, recording date, book/page, parties, legal description/address if present, source URL, retrieval date.',
    'Keep any party-level details off the public dashboard unless already public, citation-backed, and necessary for a specific property drilldown.'
  ]
};
