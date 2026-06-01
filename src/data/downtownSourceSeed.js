export const downtownSourceSeed = {
  id: 'waynesboro-downtown-public-source-stack',
  name: 'Waynesboro downtown public source stack',
  retrievedAt: '2026-06-01T09:05:23Z',
  geography: 'City of Waynesboro downtown / public commercial-property and DDA context',
  sourceStatus: 'Official routes indexed; operational counts not promoted',
  caveat: 'This seed is a public source-routing layer only. It does not verify storefront occupancy, ownership, asking price, license status, parcel condition, foot traffic, redevelopment eligibility, or DDA action. Keep the downtown table schematic until parcel, business-directory, agenda/minutes, qPublic/export, or field-verified records are attached.',
  routes: [
    {
      label: 'Real Estate Locator / Available Downtown Properties route',
      url: 'https://www.waynesboroga.com/realestate.aspx',
      accessMethod: 'Public CivicEngage real-estate locator; low-volume page review only, no account actions.',
      observedShape: 'Featured listing module with residential/commercial search controls; page text stated no available properties were posted at retrieval time.',
      integrationUse: 'Use as an official listing route and null-state signal, not as a complete vacancy or parcel inventory.'
    },
    {
      label: 'Downtown Businesses category in official Business Directory',
      url: 'https://www.waynesboroga.com/BusinessDirectoryII.aspx?lngBusinessCategoryID=29',
      accessMethod: 'Public city business-directory category page; index category/page structure before any row extraction.',
      observedShape: 'Official business-directory category route reached with HTTP 200; category navigation includes downtown/business classifications.',
      integrationUse: 'Candidate for a source-labeled downtown business roster after row definitions, update cadence, and completeness are manually checked.'
    },
    {
      label: 'Downtown Development Authority page',
      url: 'https://www.waynesboroga.com/152/Downtown-Development-Authority',
      accessMethod: 'Public city DDA source hub; pair with Agenda Center packets/minutes before extracting board actions.',
      observedShape: 'Official DDA page reached with HTTP 200 and city-published board/context surface.',
      integrationUse: 'Use as board/program context for redevelopment narratives; do not infer project approvals without agenda/minute citations.'
    },
    {
      label: 'Agenda Center DDA packet/minute trail',
      url: 'https://www.waynesboroga.com/AgendaCenter',
      accessMethod: 'Public CivicPlus Agenda Center and RSS/list views; cache metadata only until documents are manually reviewed.',
      observedShape: 'Agenda Center page exposes Downtown Development Authority meeting agenda links alongside city meeting records.',
      integrationUse: 'Best near-term evidence path for downtown decisions, board cadence, and source-linked Council briefs.'
    }
  ],
  nextActions: [
    'Manually review latest DDA agendas/minutes before summarizing board action.',
    'Decide whether official Business Directory rows can be cached with source timestamps.',
    'Keep Real Estate Locator null-state visible but do not treat it as a vacancy count.',
    'Pair downtown source routes with qPublic/export permission before parcel ownership claims.'
  ]
};
