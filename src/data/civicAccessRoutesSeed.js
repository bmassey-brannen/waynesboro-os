// Low-volume public route seed captured from official City of Waynesboro CivicPlus pages.
// Route evidence only: these entries identify legitimate access paths, not permit counts, license counts, agenda findings, or document contents.

export const civicAccessRoutesSeed = {
  provider: 'City of Waynesboro official website / CivicPlus public routes',
  fetchedAt: '2026-06-01T00:00:00.000Z',
  method: 'Manual low-volume HTTP checks of public pages and sitemap; no private portals or credentialed systems accessed.',
  posture: 'Source-route evidence only. Use these paths to build normalized connectors or records-review queues before promoting any municipal fact.',
  routes: [
    {
      id: 'city-agenda-center-route',
      label: 'Agenda Center',
      url: 'https://www.waynesboroga.com/AgendaCenter',
      dataType: 'City council / board agendas and minutes route',
      accessMethod: 'Public CivicPlus page; index links and meeting metadata only until document contents are manually reviewed.',
      integrationUse: 'Decision trail, project approvals, public hearing queue, Council citation cards',
      status: 'HTTP 200 verified; contains Agenda and Minutes labels',
      difficulty: 'Low'
    },
    {
      id: 'city-licenses-permits-route',
      label: 'Licenses & permits / business route',
      url: 'https://www.waynesboroga.com/171/Licenses-Permits',
      dataType: 'Business, license, permit, state tax, and qPublic reference route',
      accessMethod: 'Public city page; treat as navigation/source route, not an export of active licenses or permit history.',
      integrationUse: 'Permit/license intake map, business-record request checklist, downtown verification workflow',
      status: 'HTTP 200 verified; page references Georgia DOR tax route and Burke qPublic',
      difficulty: 'Medium'
    },
    {
      id: 'city-document-center-route',
      label: 'Document Center',
      url: 'https://www.waynesboroga.com/DocumentCenter',
      dataType: 'Official city document repository route',
      accessMethod: 'Public CivicPlus document center; index document metadata and retrieve files only at low volume with citations.',
      integrationUse: 'Budget, notices, ordinances, agenda packets, and public-record evidence queue',
      status: 'HTTP 200 verified; route visible from official site',
      difficulty: 'Medium'
    },
    {
      id: 'city-sitemap-route',
      label: 'Official sitemap',
      url: 'https://www.waynesboroga.com/sitemap.xml',
      dataType: 'Machine-readable city route inventory with lastmod fields where present',
      accessMethod: 'Public XML sitemap; safe low-volume route discovery for public pages only.',
      integrationUse: 'Connector discovery, freshness checks, source registry auditing',
      status: 'HTTP 200 verified; found Agenda, Business, License, Permit, Downtown labels',
      difficulty: 'Low'
    }
  ],
  nextActions: [
    'Normalize Agenda Center links into meeting-date, board, packet/minutes, URL, and retrieved-at fields.',
    'Review Licenses & Permits page links manually before treating anything as a city business-license dataset.',
    'Pair any permit/license route with open-records process, qPublic parcel IDs, and document citations before map claims.'
  ]
};
