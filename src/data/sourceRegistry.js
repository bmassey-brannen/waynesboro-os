export const sourceRegistry = [
  {
    name: 'U.S. Census Bureau ACS Profile API',
    url: 'https://api.census.gov/data/2023/acs/acs5/profile',
    dataType: 'Population, household income, employment, housing profile metrics',
    geography: 'Waynesboro city place + Burke County',
    accessMethod: 'Public API; this environment returned a Census "Missing Key" response, so use an API key for scheduled ingestion.',
    cadence: 'Annual ACS 5-year release',
    difficulty: 'Medium',
    status: 'Connector planned',
    notes: 'Candidate query shape: get=NAME,DP05_0001E,DP03_0062E,DP03_0005PE&for=place:*&in=state:13. Confirm Waynesboro place code during integration.'
  },
  {
    name: 'Census QuickFacts',
    url: 'https://www.census.gov/quickfacts/fact/table/waynesborocitygeorgia,burkecountygeorgia/PST045223',
    dataType: 'Public demographic and economic quick facts for city/county context',
    geography: 'Waynesboro city and Burke County',
    accessMethod: 'Public web page; cite as source, avoid aggressive scraping.',
    cadence: 'Periodic Census updates',
    difficulty: 'Low',
    status: 'Reference ready',
    notes: 'Useful public-facing citation while structured ACS connector is built.'
  },
  {
    name: 'Burke County qPublic / Schneider GIS',
    url: 'http://qpublic.net/ga/burke/',
    dataType: 'Parcel maps, property assessment records, ownership, parcel attributes',
    geography: 'Burke County parcels including Waynesboro',
    accessMethod: 'Public assessor/GIS portal linked by City and County; manual review first, do not bypass bot protection.',
    cadence: 'Assessor updates; cadence not yet confirmed',
    difficulty: 'High',
    status: 'Manual research',
    notes: 'Schneider-hosted pages may present anti-bot protection. Use official exports/API only if offered or obtain permission.'
  },
  {
    name: 'Burke County Planning: Permits and Inspections',
    url: 'https://www.burkecounty-ga.gov/departments/planning_department/permits_and_inspections.php',
    dataType: 'Building permits, inspections process, planning contacts',
    geography: 'Burke County / Waynesboro area where county permitting applies',
    accessMethod: 'Public web page plus linked iWorQ permit request portal.',
    cadence: 'Operational; publication cadence not stated',
    difficulty: 'Medium',
    status: 'Access path identified',
    notes: 'Immediate next step is determine whether historical permit reports are published or must be requested.'
  },
  {
    name: 'Burke County iWorQ Building Permit Request',
    url: 'https://burke.portal.iworq.net/BURKE/new-request/700/3610',
    dataType: 'Permit intake workflow; potential lead for permit status/reporting system',
    geography: 'Burke County',
    accessMethod: 'Public request portal; no scraping of private submissions.',
    cadence: 'Live operational portal',
    difficulty: 'High',
    status: 'Portal identified',
    notes: 'Treat as an intake endpoint, not a public records database unless the vendor/county exposes public reports.'
  },
  {
    name: 'Burke County Board of Commissioners Agendas and Minutes',
    url: 'https://www.burkecounty-ga.gov/departments/board_of_commissioners/meetings_agendas_minutes.php',
    dataType: 'Meetings, agendas, minutes, policy/project decision trail',
    geography: 'Burke County',
    accessMethod: 'Public county web pages.',
    cadence: 'Meeting-cycle updates',
    difficulty: 'Low',
    status: 'Ready for document index',
    notes: 'Good source for project tracker events and Council brief citations.'
  },
  {
    name: 'Burke County Budgets and Financial Reports',
    url: 'https://www.burkecounty-ga.gov/departments/administration/budgets___financial_reports.php',
    dataType: 'Budgets, financial reports, check registers',
    geography: 'Burke County',
    accessMethod: 'Public county web pages / PDF downloads where available.',
    cadence: 'Annual budgets; periodic reports/check registers',
    difficulty: 'Medium',
    status: 'Ready for document index',
    notes: 'Useful for capital projects, public spending, and county context around Waynesboro.'
  },
  {
    name: 'Georgia Department of Revenue Digest Compliance',
    url: 'https://dor.georgia.gov/local-government-services/digest-compliance',
    dataType: 'Tax digest summaries, millage rates, ad valorem tax reports',
    geography: 'Georgia counties and local governments',
    accessMethod: 'Public state web pages and downloadable reports.',
    cadence: 'Annual / periodic state reporting',
    difficulty: 'Medium',
    status: 'Ready for connector scoping',
    notes: 'Follow child pages for Tax Digest Consolidated Summaries and Property Tax Millage Rates.'
  },
  {
    name: 'Georgia Department of Labor Area Labor Profiles',
    url: 'https://dol.georgia.gov/workforce-statistics-economic-research',
    dataType: 'Labor force, unemployment, workforce and industry statistics',
    geography: 'County / regional labor market',
    accessMethod: 'Public state workforce statistics pages; exact downloadable endpoint still to confirm.',
    cadence: 'Monthly for labor force series where published',
    difficulty: 'Medium',
    status: 'Needs endpoint confirmation',
    notes: 'Legacy DOL pages timed out from this environment; keep as a research target before coding ingestion.'
  },
  {
    name: 'OpenStreetMap / Nominatim',
    url: 'https://nominatim.openstreetmap.org/search?format=json&q=Waynesboro%2C%20Georgia&limit=1',
    dataType: 'Boundary lookup, place coordinates, basemap context',
    geography: 'Waynesboro, Georgia',
    accessMethod: 'Public OSM/Nominatim endpoint with usage-policy-compliant low-volume queries and attribution.',
    cadence: 'Community updated',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Test call returned Waynesboro relation with lat/lon; suitable for normalizing the map center and attribution.'
  },
  {
    name: 'City of Waynesboro official website',
    url: 'https://www.waynesboroga.com/',
    dataType: 'City departments, public notices, official local links, tax/GIS references',
    geography: 'City of Waynesboro',
    accessMethod: 'Public web pages.',
    cadence: 'As posted by city',
    difficulty: 'Medium',
    status: 'Source hub identified',
    notes: 'City page links to Georgia DOR and Burke County Tax Assessors/qPublic; city Agenda Center and Archive Center paths are now separately tracked.'
  },
  {
    name: 'City of Waynesboro Agenda Center',
    url: 'https://www.waynesboroga.com/AgendaCenter',
    dataType: 'City council agendas, agenda packets, meeting notices, RSS/list views',
    geography: 'City of Waynesboro',
    accessMethod: 'Public CivicPlus Agenda Center page with RSS/list links; low-volume document index only.',
    cadence: 'Meeting-cycle updates',
    difficulty: 'Low',
    status: 'Ready for document index',
    notes: 'Official city page exposes /rss.aspx#agendaCenter and /list.aspx#agendaCenter links. Good first city-level document connector.'
  },
  {
    name: 'City of Waynesboro Archive Center',
    url: 'https://www.waynesboroga.com/Archive.aspx',
    dataType: 'Archived city documents and public records published through CivicPlus',
    geography: 'City of Waynesboro',
    accessMethod: 'Public CivicPlus archive page; index document links and dates conservatively.',
    cadence: 'As documents are posted',
    difficulty: 'Medium',
    status: 'Ready for document index',
    notes: 'Use as the discovery surface for budgets, minutes, ordinances, or plans if exposed; do not infer completeness without manual review.'
  },
  {
    name: 'Waynesboro WIPP / Edmunds Associates tax portal',
    url: 'https://wipp.edmundsassoc.com/Wipp?wippid=WYNS',
    dataType: 'Online municipal tax/payment portal and account lookup workflow',
    geography: 'City of Waynesboro',
    accessMethod: 'Public payment portal; link/reference only unless the city/vendor publishes permitted exports.',
    cadence: 'Operational live portal',
    difficulty: 'High',
    status: 'Reference only',
    notes: 'The official city homepage links to WIPP. Treat as a citizen service/payment system, not a scrape target.'
  },
  {
    name: 'Burke County Check Registers',
    url: 'https://www.burkecounty-ga.gov/departments/administration/check_registers.php',
    dataType: 'County expenditure check registers and public finance documents',
    geography: 'Burke County',
    accessMethod: 'Public Revize document-center page / downloads where posted.',
    cadence: 'Periodic as published',
    difficulty: 'Medium',
    status: 'Ready for document index',
    notes: 'Useful for spending context and vendor/project trail; normalize only posted document metadata first.'
  },
  {
    name: 'Burke County Code Enforcement page',
    url: 'https://www.burkecounty-ga.gov/departments/planning_department/code_enforcement.php',
    dataType: 'Code enforcement program information, contacts, potential records request path',
    geography: 'Burke County / Waynesboro area',
    accessMethod: 'Public county information page; records-level data likely requires request or official export.',
    cadence: 'As posted by county',
    difficulty: 'High',
    status: 'Records path identified',
    notes: 'Could support Beautification Index once violation records are obtained legally and source-labeled.'
  },
  {
    name: 'Burke County E-911 department page',
    url: 'https://www.burkecounty-ga.gov/departments/e911.php',
    dataType: 'Emergency communications department context and public contacts',
    geography: 'Burke County',
    accessMethod: 'Public information page; do not attempt access to dispatch systems.',
    cadence: 'As posted by county',
    difficulty: 'High',
    status: 'Reference only',
    notes: 'Public safety dashboard needs aggregated, officially released incident/response data or records request results.'
  },
  {
    name: 'City of Waynesboro Code of Ordinances / Municode Library',
    url: 'https://library.municode.com/ga/waynesboro/codes/code_of_ordinances',
    dataType: 'Municipal code, ordinances, zoning/code context and local regulatory baseline',
    geography: 'City of Waynesboro',
    accessMethod: 'Public Municode library page; cite/link for ordinance references and manually verify before extracting legal text.',
    cadence: 'Updated as ordinances are codified; exact lag varies by Municode/city publication cycle',
    difficulty: 'Medium',
    status: 'Reference ready',
    notes: 'Useful for Council/legal context, zoning/code-enforcement definitions, and source-labeled policy drilldowns. Do not present as legal advice.'
  },
  {
    name: 'City of Waynesboro Downtown Development Authority page',
    url: 'https://www.waynesboroga.com/152/Downtown-Development-Authority',
    dataType: 'Official downtown/economic-development board context, contacts, program surface',
    geography: 'City of Waynesboro downtown / DDA district context',
    accessMethod: 'Public city web page; use as a source hub and manually verify linked agendas/program materials.',
    cadence: 'As posted by city',
    difficulty: 'Low',
    status: 'Source hub identified',
    notes: 'Good candidate to connect the downtown command center to official redevelopment and board context before parcel-level data is available.'
  }
];

export const readinessStrip = [
  { lane: 'Demographics', status: 'API key needed', source: 'Census ACS Profile API', tone: 'watch' },
  { lane: 'City documents', status: 'Index-ready', source: 'Agenda Center / Archive Center', tone: 'good' },
  { lane: 'Parcels', status: 'Manual / permissioned', source: 'qPublic / Schneider GIS', tone: 'watch' },
  { lane: 'Map base', status: 'Seed ready', source: 'OpenStreetMap', tone: 'good' },
  { lane: 'Ordinances', status: 'Reference-ready', source: 'Municode Library', tone: 'good' },
  { lane: 'Public safety', status: 'Official aggregate needed', source: 'E-911 / records request path', tone: 'neutral' }
];

export const sourcePriorities = [
  {
    lane: 'City documents',
    target: 'Index Agenda Center + Archive Center links',
    source: 'City of Waynesboro Agenda Center / Archive Center',
    value: 'Creates the first official city-level evidence trail for Council briefs and project tracker updates.',
    nextStep: 'Build a cached document-link snapshot with title, date, URL, board/category, and retrieval timestamp.',
    difficulty: 'Low'
  },
  {
    lane: 'Census baseline',
    target: 'Resolve ACS profile connector with API key',
    source: 'U.S. Census ACS Profile API',
    value: 'Replaces population, income, housing, and employment mock KPI cards with timestamped public estimates.',
    nextStep: 'Add API-key-backed scheduled fetch and confirm Waynesboro place code before binding to KPI values.',
    difficulty: 'Medium'
  },
  {
    lane: 'Parcels / blight',
    target: 'Confirm qPublic export rules before parcel ingestion',
    source: 'Burke County qPublic / Schneider GIS',
    value: 'Enables parcel-linked downtown occupancy, ownership, vacancy, and beautification drilldowns.',
    nextStep: 'Manual terms review or official export request; no automated scraping until permitted.',
    difficulty: 'High'
  },
  {
    lane: 'Ordinances / policy',
    target: 'Build a citation-only ordinance reference panel',
    source: 'City of Waynesboro Code of Ordinances / Municode Library',
    value: 'Gives The Council and code/blight modules an official regulatory baseline without inventing policy claims.',
    nextStep: 'Create a curated index of relevant ordinance sections after manual verification; cite Municode URLs and retrieval dates.',
    difficulty: 'Medium'
  }
];

export const osmWaynesboroSeed = {
  source: 'OpenStreetMap / Nominatim',
  retrievedShape: 'normalized seed from verified public endpoint, not live-fetched in the browser',
  queryUrl: 'https://nominatim.openstreetmap.org/search?format=json&q=Waynesboro%2C%20Georgia&limit=1',
  displayName: 'Waynesboro, Burke County, Georgia, United States',
  osmType: 'relation',
  osmId: 119523,
  lat: 33.0898731,
  lon: -82.0156736,
  license: 'Data © OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright'
};
