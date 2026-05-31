export const cityPermittingSeed = {
  sourceName: 'City of Waynesboro permitting, planning, and open-records surfaces',
  retrievedAt: '2026-05-31T00:00:00Z',
  sourceUrl: 'https://www.waynesboroga.com/sitemap.xml',
  accessMethod: 'Public city sitemap and CivicPlus pages; link/index only until permit exports or records are officially provided.',
  geography: 'City of Waynesboro, Georgia',
  caveat: 'This is a source-routing/intake layer, not a permit-count dataset, license registry, project approval list, or legal determination. Keep permit, zoning, and license KPIs synthetic until official records are parsed with dates and document citations.',
  routes: [
    {
      label: 'Building Permits',
      url: 'https://www.waynesboroga.com/235/Building-Permits',
      dataType: 'City building-permit instructions and workflow reference',
      lastmod: '2022-06-21',
      integrationUse: 'Anchor future permit-count connector or records-request template for building/development dashboard cards.'
    },
    {
      label: 'Planning Department',
      url: 'https://www.waynesboroga.com/169/Planning',
      dataType: 'Planning and zoning source hub',
      lastmod: '2025-09-22',
      integrationUse: 'Source route for planning-board, zoning, development-review, and land-use context before project tracker promotion.'
    },
    {
      label: 'Licenses & Permits',
      url: 'https://www.waynesboroga.com/128/Licenses-Permits',
      dataType: 'Business/license/permit navigation surface',
      lastmod: '2023-06-09',
      integrationUse: 'Official route for active-license research; not a verified business-license count.'
    },
    {
      label: 'Open Records Request',
      url: 'https://www.waynesboroga.com/275/Open-Records-Request',
      dataType: 'Official open-records request pathway',
      lastmod: '2022-09-28',
      integrationUse: 'Records-request path for permits, code-enforcement aggregates, adopted documents, and public datasets not posted as downloads.'
    },
    {
      label: 'Planning Commission',
      url: 'https://www.waynesboroga.com/154/Planning-Commission',
      dataType: 'Board/commission context and meeting route',
      lastmod: '2024-02-20',
      integrationUse: 'Citation route for development-review governance and public meeting traceability.'
    },
    {
      label: 'Zoning Board of Appeals',
      url: 'https://www.waynesboroga.com/155/Zoning-Board-of-Appeals',
      dataType: 'Appeals/variance board context and meeting route',
      lastmod: '2025-01-07',
      integrationUse: 'Source route for variance/appeal watchlist after agenda/minute parsing.'
    }
  ],
  nextActions: [
    'Manually open Building Permits and Licenses & Permits pages before extracting any fields.',
    'If no historical permit/license tables are posted, draft a narrow records request for monthly aggregate counts only.',
    'Cross-link permit/zoning agenda items from Agenda Center before promoting project statuses.'
  ]
};
