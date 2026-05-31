export const sourceRegistry = [
  {
    name: 'Data Commons API',
    url: 'https://docs.datacommons.org/api/rest/v2/',
    dataType: 'Normalized public demographic, housing, income, labor, and place-identifier observations',
    geography: 'Waynesboro city, Burke County, Georgia',
    accessMethod: 'Server-side API connector using .env.local credentials; never expose keys in browser code.',
    cadence: 'Depends on upstream source/facet; snapshot records observation dates and provenance.',
    difficulty: 'Low',
    status: 'Live connector active',
    notes: 'Resolved Waynesboro, Georgia to Data Commons DCID geoId/1380984. Current connector writes public observations to src/data/dataCommonsSnapshot.js.'
  },
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
    name: 'U.S. Census Building Permits Survey API',
    url: 'https://api.census.gov/data/timeseries/eits/bps',
    dataType: 'Monthly building permit counts and valuation by state/county/place where published',
    geography: 'Burke County / Georgia; confirm whether Waynesboro place-level series are available',
    accessMethod: 'Public Census API endpoint; this environment returned a valid-key requirement, so use an environment API key for scheduled pulls.',
    cadence: 'Monthly Census Building Permits Survey releases',
    difficulty: 'Medium',
    status: 'Connector planned',
    notes: 'Good candidate to replace synthetic housing/development permit cards. Start with county-level permit trend, then test place-level coverage for Waynesboro.'
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
    name: 'U.S. Census TIGERweb Incorporated Places',
    url: 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/4',
    dataType: 'Official Census incorporated-place boundary metadata, GEOID, place code, center/interior points, land and water area',
    geography: 'Waynesboro city, Georgia (GEOID 1380984 / place 80984)',
    accessMethod: 'Public ArcGIS REST service; low-volume query can be cached into a normalized seed file.',
    cadence: 'Census TIGER/Line geography updates annually/periodically by vintage',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Test query returned Waynesboro city attributes. Added src/data/geographySeed.js as a lightweight map credibility stub; geometry can be added later if needed.'
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
    name: 'OpenStreetMap Overpass API Civic Assets',
    url: 'https://overpass-api.de/api/interpreter',
    dataType: 'Community-maintained civic asset points/ways: hospital, library, police/sheriff, schools, fire/townhall where tagged',
    geography: '7km radius around Waynesboro, Georgia OSM/Nominatim center point',
    accessMethod: 'Public Overpass API; low-volume cached query only with OSM attribution and verification caveat.',
    cadence: 'Community updated; no official municipal publication cadence',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume query returned 12 civic asset elements around Waynesboro. Added src/data/osmCivicAssetsSeed.js with a 5-record normalized seed for map orientation only; verify against official city/county/school/health sources before treating as authoritative.'
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
  },
  {
    name: 'City of Waynesboro Water Department / About Our Water',
    url: 'https://www.waynesboroga.com/124/Water',
    dataType: 'Official city water department pages, water service context, water quality/public information surface',
    geography: 'City of Waynesboro',
    accessMethod: 'Public city pages; cite as reference first, then connect reports or official exports if published.',
    cadence: 'As posted by city; report cadence not yet confirmed',
    difficulty: 'Medium',
    status: 'Reference ready',
    notes: 'Sitemap also exposes About Our Water and Water Rates pages. Good operations-lane anchor, but not live system telemetry.'
  },
  {
    name: 'EPA SDWIS Federal Reporting Services',
    url: 'https://sdwis.epa.gov/ords/sfdw_pub/r/sfdw/sdwis_fed_reports_public/200',
    dataType: 'Public drinking-water system search and federal reporting views: water-system identity, inventory, monitoring/reporting context, and compliance report paths where published',
    geography: 'Public water systems serving Waynesboro / Burke County; confirm exact PWSID before display',
    accessMethod: 'Public EPA SDWIS Federal Reporting Services web application; manual search/reference first, then cache only permitted public report exports if an export path is exposed.',
    cadence: 'EPA/state reporting updates; report-specific cadence varies',
    difficulty: 'Medium',
    status: 'Source hub identified',
    notes: 'Useful operations-lane source for water-system identity and compliance context. Treat as evidence/reference, not live utility telemetry; confirm PWSID and Georgia primacy-source details before binding metrics.'
  },
  {
    name: 'City of Waynesboro Sewer & Wastewater',
    url: 'https://www.waynesboroga.com/123/Sewer-Wastewater',
    dataType: 'Official sewer/wastewater department reference surface',
    geography: 'City of Waynesboro',
    accessMethod: 'Public city page; use as source hub for wastewater responsibilities and future capital/compliance document requests.',
    cadence: 'As posted by city',
    difficulty: 'Medium',
    status: 'Reference ready',
    notes: 'Supports infrastructure source labeling while operational scores remain synthetic.'
  },
  {
    name: 'City of Waynesboro Public Works / Solid Waste / Storm Drainage',
    url: 'https://www.waynesboroga.com/200/Public-Works',
    dataType: 'Official public works, solid waste, storm drainage, roads/maintenance information pages',
    geography: 'City of Waynesboro',
    accessMethod: 'Public city pages; index source links and retrieval dates before extracting any operational claims.',
    cadence: 'As posted by city',
    difficulty: 'Medium',
    status: 'Source hub identified',
    notes: 'Sitemap exposes Public Works, Solid Waste, and Storm Drainage Information. Useful for operations-lane references; routes/work orders/complaints require official data or requests.'
  },
  {
    name: 'City of Waynesboro Police and Fire department pages',
    url: 'https://www.waynesboroga.com/122/Police',
    dataType: 'Official public safety department pages and service/contact context',
    geography: 'City of Waynesboro',
    accessMethod: 'Public city pages; no access to incident systems, dispatch, or private records.',
    cadence: 'As posted by city',
    difficulty: 'High',
    status: 'Reference only',
    notes: 'Sitemap exposes Police and Fire pages. Public-safety KPIs must stay synthetic until aggregate incident/response records are officially published or obtained.'
  },
  {
    name: 'Georgia DCA Developments of Regional Impact Submissions',
    url: 'https://apps.dca.ga.gov/DRI/Submissions.aspx',
    dataType: 'Major development review submissions, project names, development type, county, jurisdiction, regional commission, status, and determination text',
    geography: 'Georgia statewide; filterable by Burke County / Waynesboro where records exist',
    accessMethod: 'Public DCA submissions table and application-summary pages; use low-volume cached records and cite detail URLs.',
    cadence: 'As DRI submissions are filed and reviewed',
    difficulty: 'Medium',
    status: 'Seed connector ready',
    notes: 'Test lookup found public DRI record 4155 for St. George Crossing in Waynesboro/Burke County. Added src/data/regionalDevelopmentSeed.js as a one-record data-shape stub; do not treat it as a complete development pipeline.'
  },
  {
    name: 'Georgia DOT Traffic Analysis & Data Application (TADA)',
    url: 'https://gdottrafficdata.drakewell.com/publicmultinodemap.asp',
    dataType: 'Public traffic count stations, AADT context, roadway-volume map views and reports',
    geography: 'Georgia statewide; filter or map-query around Waynesboro/Burke County corridors',
    accessMethod: 'Public GDOT/Drakewell web application; use as a reference surface first, then identify permitted export/report endpoints before caching counts.',
    cadence: 'Traffic count updates as published by GDOT; exact station cadence varies',
    difficulty: 'Medium',
    status: 'Source hub identified',
    notes: 'Low-volume check returned the public map application. This can support downtown foot-traffic, corridor-priority, and infrastructure modules once station export rules/endpoints are confirmed.'
  }
];

export const readinessStrip = [
  { lane: 'Demographics', status: 'Live snapshot', source: 'Data Commons API', tone: 'good' },
  { lane: 'City documents', status: 'Index-ready', source: 'Agenda Center / Archive Center', tone: 'good' },
  { lane: 'Parcels', status: 'Manual / permissioned', source: 'qPublic / Schneider GIS', tone: 'watch' },
  { lane: 'Map base', status: 'Seed ready', source: 'OSM + Census TIGERweb', tone: 'good' },
  { lane: 'Ordinances', status: 'Reference-ready', source: 'Municode Library', tone: 'good' },
  { lane: 'Public safety', status: 'Official aggregate needed', source: 'E-911 / records request path', tone: 'neutral' }
];

export const sourcePriorities = [
  {
    lane: 'City documents',
    target: 'Review top city/county document links and tag policy topics',
    source: 'City of Waynesboro Agenda Center / Archive Center',
    value: 'Turns the active public-link index into source-labeled Council brief ingredients without over-claiming document contents.',
    nextStep: 'Manually parse a small selected set of agendas/minutes/check registers into topic tags and citation cards.',
    difficulty: 'Low'
  },
  {
    lane: 'Regional development',
    target: 'Expand DCA DRI seed into a Burke / Waynesboro review watchlist',
    source: 'Georgia DCA Developments of Regional Impact Submissions',
    value: 'Adds real public development-review records to the economic-development pipeline without relying on rumors or private deal chatter.',
    nextStep: 'Build a cached low-volume parser for public DRI submissions and link only source pages / summaries; keep the project pipeline distinct from official status.',
    difficulty: 'Medium'
  },
  {
    lane: 'Permits / development',
    target: 'Scope Census Building Permits Survey connector',
    source: 'U.S. Census Building Permits Survey API',
    value: 'Creates a defensible public permit trend while city/county permit exports are still manual or permissioned.',
    nextStep: 'Add Census API key support, confirm Burke County query fields, and test whether Waynesboro place-level data exists.',
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
  },
  {
    lane: 'Traffic / corridors',
    target: 'Scope GDOT TADA station exports around Waynesboro gateways',
    source: 'Georgia DOT Traffic Analysis & Data Application (TADA)',
    value: 'Adds defensible roadway-volume context to downtown foot-traffic assumptions, corridor prioritization, and infrastructure planning.',
    nextStep: 'Use the public map/report interface manually first, then cache only permitted station metadata/AADT exports with GDOT attribution.',
    difficulty: 'Medium'
  },
  {
    lane: 'Operations / water',
    target: 'Confirm Waynesboro public-water system identity in EPA SDWIS',
    source: 'EPA SDWIS Federal Reporting Services',
    value: 'Adds a federal public reporting path for water-system inventory/compliance context while city utility widgets remain labeled placeholders.',
    nextStep: 'Manually search SDWIS for Waynesboro/Burke County, confirm the exact PWSID, then cache only permitted public report metadata with EPA attribution.',
    difficulty: 'Medium'
  },
  {
    lane: 'Civic assets / map',
    target: 'Verify OSM civic asset seed against official facility pages',
    source: 'OpenStreetMap Overpass API Civic Assets',
    value: 'Gives the downtown/map module real public map anchors without pretending the schematic parcel layer is live GIS.',
    nextStep: 'Cross-check hospital, library, sheriff/police, school, fire, and city-hall assets against official department pages before exposing as authoritative facility inventory.',
    difficulty: 'Low'
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
