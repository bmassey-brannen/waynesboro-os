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
    name: 'Census Reporter API / Profile',
    url: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
    dataType: 'ACS profile metrics and public GeoJSON boundary endpoint for Waynesboro place geography',
    geography: 'Waynesboro city, Burke County, Georgia; Census place GEOID 16000US1380984',
    accessMethod: 'Public no-key API and profile page; low-volume cached seed at src/data/censusReporterSeed.js.',
    cadence: 'ACS-backed profile updates when Census Reporter refreshes its latest ACS release',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume test returned population, median household income, poverty fields, margins of error, and a GeoJSON boundary endpoint. Use as a redundant ACS source path and map-boundary seed; keep Data Commons/official Census labels visible before using in KPI cards.'
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
    name: 'U.S. Bureau of Labor Statistics LAUS Public API',
    url: 'https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN130330000000003?startyear=2025&endyear=2025',
    dataType: 'County labor-force statistics: unemployment rate, labor force, employed persons, and unemployed persons',
    geography: 'Burke County, Georgia LAUS county area CN13033; not a Waynesboro city-level series',
    accessMethod: 'Public BLS API with no key required for low-volume single-series calls; use an API key for higher-volume scheduled ingestion.',
    cadence: 'Monthly LAUS releases; values may be preliminary/revised',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume API test returned December 2025 Burke County rate 4.2%, labor force 10,600, employed 10,156, unemployed 444. Added src/data/laborForceSeed.js and an economic workforce source snapshot; use as county context only.'
  },
  {
    name: 'USAspending.gov Spending Over Time API',
    url: 'https://api.usaspending.gov/api/v2/search/spending_over_time/',
    dataType: 'Federal award obligation totals by quarter and award category using place-of-performance filters',
    geography: 'Burke County, Georgia place of performance; not City of Waynesboro budget revenue',
    accessMethod: 'Public API POST endpoint; low-volume cached source seed at src/data/federalSpendingSeed.js.',
    cadence: 'USAspending updates as federal award records are published/revised; fiscal-year snapshots should be refreshed before presentations',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume FY2025 spending-over-time query for Burke County place of performance returned four quarterly rows and $184.9M total obligations, including $9.17M grant obligations. Added an economic funding context panel with caveats; award-level recipient/agency searches are required before any local-government or project claims.'
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
    name: 'City of Waynesboro Permitting / Planning / Open Records Routes',
    url: 'https://www.waynesboroga.com/sitemap.xml',
    dataType: 'Official city source routes for building permits, planning, licenses/permits, planning boards, zoning appeals, and open-records requests',
    geography: 'City of Waynesboro, Georgia',
    accessMethod: 'Public CivicPlus sitemap and pages; normalize links and lastmod metadata only until official exports or document contents are manually reviewed.',
    cadence: 'Sitemap lastmod dates vary by page; source pages update as city staff publish changes',
    difficulty: 'Medium',
    status: 'Source routes indexed',
    notes: 'Low-volume sitemap review found Building Permits, Planning, Licenses & Permits, Open Records Request, Planning Commission, and Zoning Board of Appeals pages. Added src/data/cityPermittingSeed.js and an economic-development intake panel; do not treat these routes as permit counts, license counts, or approval records.'
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
    dataType: 'Tax digest summaries, property tax millage-rate reports, and statewide ad valorem tax levy reports',
    geography: 'Georgia counties and local governments; future extraction should filter Burke County / Waynesboro where rows support it',
    accessMethod: 'Public state web pages and downloadable PDF/XLS reports; low-volume source index cached in src/data/taxDigestSeed.js.',
    cadence: 'Annual / periodic state reporting',
    difficulty: 'Medium',
    status: 'Seed connector ready',
    notes: 'Verified child hubs for Property Tax Millage Rates, Digest Consolidated Summaries, and Summary of Ad Valorem Taxes Levied. Latest observed 2025 downloads are indexed as a report-shape seed; no Burke row extraction yet.'
  },
  {
    name: 'Georgia Department of Revenue Distributions Section: Sales Tax Reports',
    url: 'https://dor.georgia.gov/local-government-services/distributions-section/sales-tax-distribution-rates-counties-and-cities',
    dataType: 'Local sales-tax distribution-rate reports, sales-tax commodity reports, and county/city sales-tax ID-code crosswalks',
    geography: 'Georgia counties and cities; filter to Burke County / Waynesboro only after row and jurisdiction-code verification',
    accessMethod: 'Public DOR web pages and downloadable reports; low-volume link index cached in src/data/salesTaxDistributionSeed.js.',
    cadence: 'Distribution-rate and ID-code pages update periodically; commodity report page observed as monthly/annual report surface',
    difficulty: 'Medium',
    status: 'Source pages verified',
    notes: 'Low-volume source check reached DOR pages for Sales Tax Distribution Rates for Counties and Cities, Sales Tax Commodity Report, and County and City Sales Tax ID Codes. Added src/data/salesTaxDistributionSeed.js and an economic local-revenue source panel; no Waynesboro sales-tax amount is displayed until rows are parsed and reconciled.'
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
    name: 'U.S. Census County Business Patterns API',
    url: 'https://api.census.gov/data/2022/cbp',
    dataType: 'County-level establishments, employment, and annual payroll by NAICS sector',
    geography: 'Burke County, Georgia; local Waynesboro business-license data still requires city/county source access',
    accessMethod: 'Public Census API; this environment returned a Census Missing Key page, so scheduled ingestion should use a Census API key and cache normalized observations.',
    cadence: 'Annual County Business Patterns release',
    difficulty: 'Medium',
    status: 'Connector scoped',
    notes: 'Query templates for all industries, retail, food/accommodation, and construction are captured in src/data/economicSourceSeed.js. Useful as county economic context, not a substitute for city license, downtown occupancy, or permit records.'
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
    name: 'City of Waynesboro City Maps / DocumentCenter map PDFs',
    url: 'https://www.waynesboroga.com/94/City-Maps',
    dataType: 'Official city map hub with ArcGIS web map links plus PDF references for downtown development area, ward boundaries, historic district, corporate limits, and unofficial zoning',
    geography: 'City of Waynesboro',
    accessMethod: 'Public city web page and DocumentCenter PDF links; index links only until ArcGIS service permissions and PDF contents are manually reviewed.',
    cadence: 'As posted by city; exact map update cadence not stated',
    difficulty: 'Medium',
    status: 'Seed connector ready',
    notes: 'Low-volume public check found City Maps, SmallMaps/ArcGIS app links, and DocumentCenter map PDFs. Added src/data/cityMapSourceSeed.js and a downtown map source stack. This improves map credibility but does not replace qPublic parcels or live GIS geometry.'
  },
  {
    name: 'City of Waynesboro Business / Resource Directory surface',
    url: 'https://www.waynesboroga.com/35/Business',
    dataType: 'Official business navigation, Resource Directory / Local Businesses, Downtown Businesses category, available downtown properties, licenses/permits, bid postings, and jobs modules',
    geography: 'City of Waynesboro',
    accessMethod: 'Public CivicPlus pages; low-volume link/category index only unless the city publishes exports or grants permission.',
    cadence: 'As posted by city; bid and job modules update when listings are published',
    difficulty: 'Medium',
    status: 'Source surface indexed',
    notes: 'Source check found Business page links for available downtown properties, licenses/permits, local businesses, starting a business, BusinessDirectoryII.aspx, Downtown Businesses category ID 29, Bids.aspx, and Jobs.aspx. Added src/data/businessSurfaceSeed.js as an economic drilldown/source-shape stub; not a verified license/vacancy count.'
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
    name: 'Burke County Board of Elections and Registration / Georgia SOS MVP',
    url: 'https://www.burkecounty-ga.gov/departments/board_of_elections_and_registration.php',
    dataType: 'County elections office source route, voter-information links, and state voter/election portal reference path',
    geography: 'Burke County / Waynesboro civic participation context',
    accessMethod: 'Public county page and Georgia Secretary of State portal links; reference only, no private voter lookup automation or scraping.',
    cadence: 'As posted by county/state; election calendars/results update by cycle',
    difficulty: 'Medium',
    status: 'Source routes identified',
    notes: 'Low-volume public check reached the county Board of Elections and Registration page and Georgia MVP portal. Added src/data/civicParticipationSeed.js and a Source Ledger panel; use only aggregate official results/turnout exports before displaying civic engagement metrics.'
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
    notes: 'Sitemap and page navigation expose About Our Water at /216/About-Our-Water and Water Rates at /219/Water-Rates. Good operations-lane anchors, but not live system telemetry.'
  },
  {
    name: 'City of Waynesboro Water Rates and DocumentCenter fee schedules',
    url: 'https://www.waynesboroga.com/219/Water-Rates',
    dataType: 'Official water-rate page plus DocumentCenter links for the 2025 Schedule of Rates and Fees and outdoor watering restrictions PDF',
    geography: 'City of Waynesboro utility customers / public water users',
    accessMethod: 'Public CivicPlus pages and PDF/document links; index links and manually verify PDFs before extracting charges or policy text.',
    cadence: 'As posted by city; fee schedules appear annual but cadence must be confirmed from adopted documents.',
    difficulty: 'Medium',
    status: 'Reference index ready',
    notes: 'Low-volume public check found /216/About-Our-Water, /219/Water-Rates, DocumentCenter/View/877/2025-Schedule-of-Rates-and-Fees, and DocumentCenter/View/143 outdoor watering restrictions. Added src/data/utilityRateSeed.js and an operations reference panel; do not present rates/rules as parsed facts until manual QA.'
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
    name: 'EPA ECHO SDWIS REST Services',
    url: 'https://echodata.epa.gov/echo/sdw_rest_services.get_systems?output=JSON&p_co=Burke&p_st=GA&p_act=Y',
    dataType: 'Public Safe Drinking Water Act system identity fields, PWSIDs, system type, primary source, served geography, activity status, and related compliance row counts',
    geography: 'Active Burke County public water systems, with a display subset for systems listing Waynesboro as served city',
    accessMethod: 'Public EPA ECHO REST endpoint; low-volume county query followed by get_qid pagination. Cache only public system identity fields and retrieval timestamp.',
    cadence: 'EPA ECHO/SDWIS refresh cadence varies by source table; snapshot should be refreshed before public presentations.',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume query returned 23 active Burke County systems; display seed identifies WAYNESBORO PWSID GA0330004 as a community water system using ground water with population served 5,900, plus five smaller systems listing Waynesboro as served city. Added src/data/waterSystemsSeed.js.'
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
    name: 'Georgia Bureau of Investigation Crime Statistics',
    url: 'https://gbi.georgia.gov/services/crime-statistics',
    dataType: 'State public crime-statistics service surface and Georgia crime-reporting context',
    geography: 'Georgia statewide; confirm Waynesboro/Burke County agency coverage before use',
    accessMethod: 'Public web page; reference/manual review first, then normalize only official downloadable or agency-level tables if exposed.',
    cadence: 'As published by GBI; exact table cadence must be confirmed',
    difficulty: 'Medium',
    status: 'Reference ready',
    notes: 'Low-volume check reached the GBI Crime Statistics page. Added src/data/publicSafetySourceSeed.js as a public-safety source ledger; do not replace demo public-safety counts until agency/ORI coverage, date ranges, and table definitions are verified.'
  },
  {
    name: 'FBI Crime Data Explorer',
    url: 'https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/home',
    dataType: 'National public crime data portal and potential agency-level crime-reporting API/source path',
    geography: 'United States; identify correct Waynesboro/Burke County reporting agency or ORI before binding values',
    accessMethod: 'Public web app/API surface; this environment reached the CDE web app but api.usa.gov CDE probes timed out, so confirm endpoint reliability before coding a connector.',
    cadence: 'FBI CDE updates as agencies submit/release data; reporting completeness varies by agency and year',
    difficulty: 'Medium',
    status: 'Endpoint needs confirmation',
    notes: 'Useful candidate for public-safety baselines after the correct agency/ORI and reporting coverage are verified. Treat as source routing only; no crime-rate claims were added.'
  },
  {
    name: 'Georgia DOT Crash Data & Reporting / AASHTOWare Safety Dashboard',
    url: 'https://www.dot.ga.gov/GDOT/Pages/CrashReporting.aspx',
    dataType: 'Crash-reporting source hub, public GDOT crash dashboard link, GEARS references, and crash-report documentation',
    geography: 'Georgia public roads; future use should verify Burke County / Waynesboro corridor filters and export permissions',
    accessMethod: 'Public GDOT page and public dashboard link; manually review dashboard filters/export terms before caching any local crash summaries.',
    cadence: 'GDOT crash dashboard/reporting updates as source systems publish; exact dashboard refresh cadence not confirmed',
    difficulty: 'Medium',
    status: 'Road-safety source routed',
    notes: 'Low-volume source check reached the GDOT Crash Data & Reporting page and found the GDOT Crash Data Dashboard link plus GEARS support/reporting documents. Dashboard direct request returned an old-browser page from this runtime, so keep as manual/source-routing path until Playwright/manual export rules are confirmed. No crash-rate claims added.'
  },
  {
    name: 'FEMA NFHL + NOAA Storm Events hazard source stack',
    url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer',
    dataType: 'Flood hazard map service references, FEMA Flood Map Service Center verification path, and NOAA/NCEI historical storm-event CSV source routing',
    geography: 'Waynesboro / Burke County, Georgia; parcel-specific flood claims require exact geometry and official source QA',
    accessMethod: 'Public FEMA/NOAA surfaces; use low-volume metadata/annual extracts only, and manually verify map products before presenting flood-zone or loss facts.',
    cadence: 'NFHL updates as FEMA map products are revised; NOAA Storm Events annual CSV files are updated as NCEI releases corrections.',
    difficulty: 'Medium',
    status: 'Source stack identified',
    notes: 'Added src/data/hazardResilienceSeed.js as a source-routing stub. Runtime TLS checks to hazards.fema.gov failed from this environment, so do not build an automated NFHL connector until service access is confirmed; NOAA/NCEI annual extract strategy still needs implementation.'
  },
  {
    name: 'National Weather Service API / api.weather.gov',
    url: 'https://api.weather.gov/points/33.0898731,-82.0156736',
    dataType: 'Public forecast office routing, county/forecast/fire-weather zone metadata, forecast endpoints, cached gridpoint forecast periods, and cached active-alert feature snapshots',
    geography: 'Waynesboro, Georgia point routed to Burke County zone GAC033 / forecast zone GAZ077 / WFO CAE grid 32,17',
    accessMethod: 'Public NWS API with required User-Agent header; low-volume cached metadata and timestamped forecast/alert pulls only.',
    cadence: 'Forecasts/alerts update continuously; point metadata changes rarely',
    difficulty: 'Low',
    status: 'Live connector active',
    notes: 'Low-volume point request returned grid office CAE, grid 32/17, county zone GAC033, forecast/fire zone GAZ077, and radar station KCLX. Active-alert snapshot for GAC033 returned zero features at 2026-05-31T01:18:07+00:00 and is cached in src/data/weatherAlertsSnapshot.js. Gridpoint forecast endpoint returned five periods at 2026-05-31T03:29:33+00:00 and is cached in src/data/weatherForecastSnapshot.js; not dispatch telemetry or an official emergency command feed.'
  },
  {
    name: 'EPA ECHO Clean Water Act REST Services',
    url: 'https://echodata.epa.gov/echo/cwa_rest_services.get_facilities?output=JSON&p_st=GA&p_co=Burke&p_act=Y',
    dataType: 'Public Clean Water Act facility identity, permit status, summary compliance-row counts, inspection-row counts, and query pagination metadata',
    geography: 'Active Burke County, Georgia CWA facilities; Waynesboro-addressed rows displayed as a source-routing sample',
    accessMethod: 'Public EPA ECHO REST endpoint; low-volume county query followed by get_qid pagination. Cache only public facility identity fields and retrieval timestamp.',
    cadence: 'EPA ECHO refresh cadence varies by source table; refresh and manually verify profiles before public presentation.',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume query returned 10 active Burke County CWA facility rows and summary counts; added src/data/cleanWaterPermitSeed.js with five Waynesboro-addressed sample rows. Use as environmental/source-routing context only, not a violation finding or live utility telemetry.'
  },
  {
    name: 'CDC PLACES Local Data for Better Health - Census Tract Data',
    url: 'https://data.cdc.gov/resource/cwsq-ngmh.json',
    dataType: 'Model-based public health estimates by census tract: prevention, health outcomes, disability, and risk-factor measures with confidence intervals',
    geography: 'Burke County census tracts including Waynesboro-area tracts; not a citywide aggregate until tract coverage is mapped',
    accessMethod: 'Public Socrata JSON API; low-volume filtered county/tract queries with CDC attribution and methodology links.',
    cadence: 'CDC PLACES annual releases; current endpoint metadata reports 2025 release with source years by measure.',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume probe returned 280 Burke County tract-measure rows and sample modeled estimates. Added src/data/healthEquitySeed.js and an Operations health/resilience source panel. Treat as model-based context for grants/resilience, not municipal operations telemetry or clinical records.'
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
  },
  {
    name: 'City of Waynesboro Community Development source stack',
    url: 'https://www.waynesboroga.com/118/Community-Development',
    dataType: 'Planning, zoning, sign ordinance, redevelopment powers, housing initiatives, applications, and DocumentCenter PDF routes',
    geography: 'City of Waynesboro, Georgia',
    accessMethod: 'Public CivicPlus page and DocumentCenter links; low-volume link index only until documents are manually reviewed.',
    cadence: 'As city staff update pages/documents; exact ordinance/document cadence not stated',
    difficulty: 'Medium',
    status: 'Source routes indexed',
    notes: 'Low-volume check reached the Community Development page and found zoning/sign ordinance PDFs, conditional-use/zoning/variance/subdivision/map-amendment forms, Special Event Application, Redevelopment Powers, and Housing Development/Initiatives routes. Added src/data/communityDevelopmentSeed.js and a Source Ledger policy panel; do not present legal/zoning summaries until PDFs/sections are manually verified.'
  }
];

export const readinessStrip = [
  { lane: 'Demographics', status: 'Live snapshot', source: 'Data Commons API', tone: 'good' },
  { lane: 'City documents', status: 'Index-ready', source: 'Agenda Center / Archive Center', tone: 'good' },
  { lane: 'Parcels', status: 'Manual / permissioned', source: 'qPublic / Schneider GIS', tone: 'watch' },
  { lane: 'Map base', status: 'Boundary seed ready', source: 'OSM + TIGERweb + Census Reporter GeoJSON', tone: 'good' },
  { lane: 'Economy', status: 'Workforce + funding seeds', source: 'BLS LAUS + USAspending + Census CBP', tone: 'good' },
  { lane: 'Finance', status: 'Sales-tax + digest routes', source: 'Georgia DOR Distributions / Digest Compliance', tone: 'good' },
  { lane: 'Permits', status: 'City route index', source: 'City Building Permits / Open Records', tone: 'watch' },
  { lane: 'Utilities', status: 'Rate refs indexed', source: 'City Water Rates / DocumentCenter', tone: 'good' },
  { lane: 'Environmental', status: 'CWA seed ready', source: 'EPA ECHO Clean Water Act', tone: 'good' },
  { lane: 'Resilience', status: 'Hazard source stack', source: 'FEMA NFHL / NOAA Storm Events', tone: 'watch' },
  { lane: 'Ordinances', status: 'Reference-ready', source: 'Municode Library', tone: 'good' },
  { lane: 'Public safety', status: 'Crime source routing', source: 'GBI Crime Statistics / FBI CDE / E-911', tone: 'watch' },
  { lane: 'Civic participation', status: 'Reference routes', source: 'Burke Elections / Georgia SOS MVP', tone: 'watch' },
  { lane: 'Policy / zoning', status: 'Route index', source: 'City Community Development / DocumentCenter', tone: 'watch' },
  { lane: 'Health equity', status: 'PLACES seed ready', source: 'CDC PLACES census tract estimates', tone: 'watch' }
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
    lane: 'Labor / workforce',
    target: 'Promote BLS LAUS seed into a monthly county workforce connector',
    source: 'U.S. Bureau of Labor Statistics LAUS Public API',
    value: 'Replaces vague workforce placeholders with source-labeled Burke County unemployment and labor-force context for economic-development briefs.',
    nextStep: 'Add a tiny refresh script for LAUCN13033 series, cache latest non-preliminary rows with revision flags, and keep labels county-only unless a city series is confirmed.',
    difficulty: 'Low'
  },
  {
    lane: 'Federal funding / grants',
    target: 'Move USAspending from quarterly obligation context to award-level grant review',
    source: 'USAspending.gov Spending Over Time API',
    value: 'Adds a no-key public funding source route for grant and federal-award context without presenting county place-of-performance obligations as city revenue.',
    nextStep: 'Run award-level API searches by award-type group, cache recipient/agency/project metadata, and cross-check local-government awards against agenda/budget documents before citation.',
    difficulty: 'Low'
  },
  {
    lane: 'Local revenue / sales tax',
    target: 'Parse Georgia DOR sales-tax distribution reports for Burke / Waynesboro rows',
    source: 'Georgia Department of Revenue Distributions Section: Sales Tax Reports',
    value: 'Gives the synthetic sales-tax revenue card a legitimate state source route before any finance KPI is promoted as local fact.',
    nextStep: 'Download the latest distribution-rate, commodity, and ID-code reports; verify jurisdiction codes and tax type, then cache only row-level values with source-report URL and period.',
    difficulty: 'Medium'
  },
  {
    lane: 'Permits / development',
    target: 'Bind city permit/planning routes to a narrow aggregate-records request',
    source: 'City of Waynesboro Building Permits / Licenses & Permits / Open Records Request',
    value: 'Creates an official city route for replacing permit and license placeholders without scraping private intake systems.',
    nextStep: 'Manually QA the city Building Permits, Licenses & Permits, Planning, and Open Records pages; if no tables are posted, request monthly aggregate permit/license counts only.',
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
    lane: 'Planning / zoning',
    target: 'Crosswalk Community Development PDFs with Municode and map references',
    source: 'City of Waynesboro Community Development source stack',
    value: 'Separates official zoning/sign/redevelopment source routes from synthetic development assumptions before Council or parcel modules cite policy.',
    nextStep: 'Open the zoning/sign ordinance PDFs, index only section titles/effective dates first, then reconcile against Municode and City Maps zoning references.',
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
    lane: 'Finance / tax digest',
    target: 'Parse Georgia DOR digest and millage reports for Burke County rows',
    source: 'Georgia Department of Revenue Digest Compliance',
    value: 'Creates a public, state-sourced finance baseline for millage rates, tax digest values, and ad valorem levy context while local budget documents are being indexed.',
    nextStep: 'Download the latest observed DOR PDF/XLS reports from taxDigestSeed, identify Burke County / Waynesboro rows manually first, then build a cached parser with retrieval timestamps.',
    difficulty: 'Medium'
  },
  {
    lane: 'Weather / readiness',
    target: 'Keep NWS active-alert snapshot fresh before presentations',
    source: 'National Weather Service API / api.weather.gov',
    value: 'Adds a legitimate public alert and forecast path for public works, events, emergency-preparedness, and Council weather-risk briefs.',
    nextStep: 'Schedule/trigger a low-volume refresh of active alerts for county zone GAC033 and gridpoint forecast periods for CAE 32/17 with retrieval timestamps and NWS attribution.',
    difficulty: 'Low'
  },
  {
    lane: 'Operations / water',
    target: 'Refresh EPA ECHO SDWIS water-system seed before presentation use',
    source: 'EPA ECHO SDWIS REST Services',
    value: 'Adds a public, timestamped water-system identity layer with Waynesboro PWSID GA0330004 while keeping utility health scores clearly separate from live telemetry.',
    nextStep: 'Build a small refresh script around get_systems + get_qid, then add manual QA against the EPA SDWIS Federal Reporting Services web view before citing compliance details.',
    difficulty: 'Low'
  },
  {
    lane: 'Environmental / utilities',
    target: 'Refresh EPA ECHO CWA facility seed and open profiles before public use',
    source: 'EPA ECHO Clean Water Act REST Services',
    value: 'Adds a legitimate public environmental-permit source path for utility, industrial, and infrastructure awareness without making unsupported compliance claims.',
    nextStep: 'Build a refresh script for get_facilities + get_qid, then manually verify facility profile pages before any detail beyond identity/status is promoted.',
    difficulty: 'Low'
  },
  {
    lane: 'Utilities / rates',
    target: 'Manually QA the 2025 Schedule of Rates and Fees before parsing any utility-cost facts',
    source: 'City of Waynesboro Water Rates / DocumentCenter fee schedule',
    value: 'Creates a public, city-sourced bridge from the operations lane to utility-cost and water-use reference cards without inventing rate figures.',
    nextStep: 'Open the linked DocumentCenter fee schedule and watering-restrictions PDF, extract only clearly labeled fields with retrieval dates, then compare against adopted budget/ordinance sources.',
    difficulty: 'Medium'
  },
  {
    lane: 'Hazard / resilience',
    target: 'Confirm FEMA NFHL runtime access and scope NOAA Storm Events annual extracts',
    source: 'FEMA NFHL / FEMA MSC / NOAA NCEI Storm Events',
    value: 'Adds defensible flood and historical severe-weather context for downtown, infrastructure, and Council planning without making unsupported parcel-risk claims.',
    nextStep: 'Confirm NFHL ArcGIS REST access outside this runtime TLS issue, then build a low-volume county/point metadata cache and filter NOAA annual Storm Events CSVs to Georgia / Burke County.',
    difficulty: 'Medium'
  },
  {
    lane: 'Public safety',
    target: 'Confirm agency/ORI and aggregate-reporting path before crime KPI promotion',
    source: 'GBI Crime Statistics / FBI Crime Data Explorer / Burke County E-911',
    value: 'Gives the public-safety lane a credible source-routing plan while preventing demo incident cards from reading like official crime claims.',
    nextStep: 'Manually identify the reporting agency/ORI for Waynesboro, test GBI/FBI table availability, and request only aggregate call/incident fields if local reports are not posted.',
    difficulty: 'Medium'
  },
  {
    lane: 'Civic participation',
    target: 'Find official aggregate election results / turnout exports',
    source: 'Burke County Board of Elections and Registration / Georgia SOS MVP',
    value: 'Adds a public civic-engagement source lane without touching voter-level records or private lookup workflows.',
    nextStep: 'Use the county elections page and Georgia SOS surfaces manually first; only cache aggregate official results, precinct lists, calendars, or turnout exports with election name/date/source URL.',
    difficulty: 'Medium'
  },
  {
    lane: 'Health / resilience',
    target: 'Turn CDC PLACES Burke tract rows into a mapped health-equity context layer',
    source: 'CDC PLACES Local Data for Better Health',
    value: 'Adds source-labeled quality-of-life and grant-writing context without pretending health estimates are municipal telemetry or individual records.',
    nextStep: 'Refresh selected measures, attach tract geometry and confidence intervals, then show only methodology-labeled aggregate context in Council briefs.',
    difficulty: 'Low'
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
