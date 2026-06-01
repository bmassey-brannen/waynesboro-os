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
    name: 'Census Reporter ACS household income distribution table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B19001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B19001 household income bracket estimates and margins of error for affordability and economic-mobility context',
    geography: 'Waynesboro city with Burke County / Georgia comparison rows available',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/incomeDistributionSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B19001 income brackets; the UI shows under-$50K and $100K+ rollups plus bracket bars with MOE. Treat as ACS survey context only, not tax records, payroll data, poverty eligibility, local revenue, or household-level data.'
  },
  {
    name: 'Census Reporter ACS household composition table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B11001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B11001 household type estimates: family households, nonfamily households, living-alone householders, and household-composition comparison context with margins of error',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/householdCompositionSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B11001 context including 2,204 households, 66.7% family households, 28.3% householders living alone, and 33.2% female householder/no spouse family households. Added an executive household-composition panel. Treat as ACS survey planning context only; not household-level records, benefits eligibility, school enrollment, homelessness, or municipal service telemetry.'
  },
  {
    name: 'Census Reporter ACS average household size table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25010&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25010 average household size by tenure with margins of error for service-demand and housing planning context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows; occupied housing-unit universe',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/householdSizeSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B25010 context: average household size 2.53 ±0.27, owner-occupied average 2.31 ±0.57, renter-occupied average 2.62 ±0.34. Added an executive household-size panel. Treat as ACS survey context only; not occupancy certificates, code enforcement, school enrollment, homelessness data, utility account counts, or municipal service telemetry.'
  },
  {
    name: 'Census Reporter ACS language spoken at home table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C16001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS C16001 language spoken at home / English ability estimates for public communication and language-access planning context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows; population age 5 years and over',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/languageAccessSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro C16001 context: 5,227 residents age 5+, 379 / 7.3% speaking a language other than English at home, 319 Spanish at home, and 240 / 4.6% speaking English less than very well. Treat as ACS survey planning context only; not school enrollment, translation-demand proof, immigration status, emergency communications performance, or municipal service telemetry.'
  },
  {
    name: 'Census Reporter ACS health insurance coverage table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B27010&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B27010 health insurance coverage by age: uninsured and insured planning-context estimates with margins of error',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows; civilian noninstitutionalized population universe',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/healthInsuranceSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B27010 context: 5,569 table-universe residents, 1,102 / 19.8% estimated uninsured with approximate MOE ±274, concentrated in age 19-64 cells. Treat as ACS survey planning context only; not Medicaid enrollment, clinical records, provider capacity, household eligibility, EMS demand, or municipal health telemetry.'
  },
  {
    name: 'Census Reporter ACS poverty status table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B17001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B17001 poverty-status estimates by sex and age with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows; poverty-status universe',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/povertyStatusSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B17001 context: 5,507-person poverty-status universe, 1,433 / 26.0% estimated below poverty with MOE ±485, plus Burke County and Georgia comparison rows. Added an executive economic-mobility panel. Treat as ACS survey planning context only; not benefits eligibility, household-level records, program enrollment, tax data, school meal participation, or municipal service-demand telemetry.'
  },
  {
    name: 'Census Reporter ACS race and Hispanic origin table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B03002&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B03002 race and Hispanic/Latino origin estimates with margins of error for public communications, outreach, and demographic context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows; total population universe',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/raceEthnicitySeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro B03002 context: 5,644 total ACS population, 65.5% Black alone non-Hispanic, 22.1% White alone non-Hispanic, and 8.6% Hispanic/Latino, with MOE visible. Added an Executive demographic lens panel. Treat as ACS survey planning context only; not voter data, program enrollment, household identity records, policing data, eligibility data, or municipal service workload.'
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
    name: 'Census Reporter ACS industry employment table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C24030&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS C24030 civilian employed population by broad industry with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/industryEmploymentSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro C24030 context: 2,580 civilian employed residents/workers, led by education/health care 21.2%, retail trade 19.3%, transportation/utilities 13.2%, professional/admin services 12.7%, and manufacturing 11.4%. Treat as ACS survey workforce context only; not employer payroll, establishment counts, business-license records, job postings, wages, tax revenue, or live economic-development telemetry.'
  },
  {
    name: 'Census Reporter ACS occupation employment table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C24010&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS C24010 occupation mix for the civilian employed population 16+ with broad occupation categories, city/county/state comparison, and margins of error',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/occupationEmploymentSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro C24010 context: 2,580 civilian employed residents/workers, led by sales/office 28.6%, production/transportation 26.6%, service 20.5%, management/science/arts 18.2%, and natural resources/construction/maintenance 6.0%. Treat as ACS survey workforce context only; not employer payroll, job postings, occupational credentials, business-license records, wages, or municipal telemetry.'
  },
  {
    name: 'Georgia Insights / GaDOE Education Dashboards',
    url: 'https://georgiainsights.gadoe.org/data-downloads/',
    dataType: 'Public state education dashboards and data-download route for accountability, attendance, CTAE/workforce pathway, district finance, and whole-child indicators',
    geography: 'Georgia school districts and schools; route to Burke County Public Schools / Waynesboro-area context after filters/export rules are confirmed',
    accessMethod: 'Public Georgia Insights pages; manual dashboard/export review first, then cache only aggregate district/school records with school year and source URL.',
    cadence: 'Dashboard/data-release cadence varies by GaDOE program and school year',
    difficulty: 'Medium',
    status: 'Source routes indexed',
    notes: 'Low-volume checks reached Georgia Insights, Data Downloads, CCRPI, CTAE Advantage, Attendance, District Financial Information, and the Burke County Public Schools official site. Added src/data/educationWorkforceSeed.js and an economic education/workforce route panel; no student-level data or school-performance claims are displayed.'
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
    name: 'UGA CVIOG Local Government Financial Documents Online',
    url: 'https://ted.cviog.uga.edu/financial-documents/budget_docs_view?og_group_ref_target_id%5B%5D=727&field_fiscal_year_value%5Bmin%5D%5Byear%5D=2024&field_fiscal_year_value%5Bmax%5D%5Byear%5D=2026',
    dataType: 'City of Waynesboro annual operating budget reports and financial report PDFs indexed by fiscal year and document type',
    geography: 'City of Waynesboro, Georgia; entity node 727 in the public GeorgiaData/CVIOG financial-documents portal',
    accessMethod: 'Public no-login document portal; low-volume filtered GET query cached in src/data/localFinancialDocumentsSeed.js. PDF contents require manual review/page citations before facts are promoted.',
    cadence: 'Annual budget and financial-report postings; portal states budget documents can be searched by fiscal year, document type, and local government.',
    difficulty: 'Low',
    status: 'Ready for document index',
    notes: 'Runtime filtered query returned FY2026, FY2025, and FY2024 Waynesboro budget-report PDFs plus the FY2024 financial-report PDF. UI now renders a source-index panel; no revenue, spending, fund-balance, audit, tax-rate, or policy claims are displayed until PDFs are reviewed and cited.'
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
    name: 'Georgia EPD Drinking Water Program / Drinking Water Watch',
    url: 'https://epd.georgia.gov/watershed-protection-branch/drinking-water',
    dataType: 'State drinking-water source hub, Drinking Water Watch public lookup route, annual public-water-system compliance report PDFs, and violations appendix paths',
    geography: 'Georgia public water systems; Waynesboro/Burke County use requires exact PWSID cross-check such as GA0330004 / WAYNESBORO',
    accessMethod: 'Public EPD web page and linked public lookup/report PDFs; use manual verification and low-volume cached report metadata only. Do not scrape lookup forms or imply current compliance without row/page citations.',
    cadence: 'Program page updates as posted; annual compliance reports are report-year based; Drinking Water Watch reflects state/EPA reporting updates',
    difficulty: 'Medium',
    status: 'State verification route added',
    notes: 'Low-volume check reached the Georgia EPD Drinking Water page with HTTP 200 and verified linked annual PWS compliance-report PDFs. Added src/data/stateDrinkingWaterSeed.js and an operations verification panel; this is not live telemetry or a water-quality claim.'
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
    name: 'USGS NWIS Site Service: Burke County active stream sites',
    url: 'https://waterservices.usgs.gov/nwis/site/?format=rdb&countyCd=13033&siteType=ST&siteStatus=active&siteOutput=expanded',
    dataType: 'Public hydrology station inventory: active stream-gage site numbers, names, coordinates, HUCs, drainage areas, and map references',
    geography: 'Burke County, Georgia; stream sites near/around Waynesboro including Brier Creek and Savannah/Ogeechee River context',
    accessMethod: 'Public USGS waterservices endpoint; low-volume RDB/tab-delimited query cached in src/data/usgsHydrologySeed.js.',
    cadence: 'Site inventory changes infrequently; current observations require separate NWIS instantaneous/daily-value endpoints with timestamps and units',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume query returned three active Burke County stream sites: Savannah River near Waynesboro, Brier Creek near Waynesboro, and Ogeechee River at Midville. Added an Operations hydrology source panel; do not present as flood status, drainage performance, water quality, utility service, or emergency telemetry.'
  },
  {
    name: 'USGS NWIS Instantaneous Values Service',
    url: 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=02197830,021973269,02201230&parameterCd=00060,00065&siteStatus=all',
    dataType: 'Current/provisional streamflow and gage-height observations for selected USGS stations',
    geography: 'Three Burke County stream stations near Waynesboro: Brier Creek, Savannah River, and Ogeechee River at Midville',
    accessMethod: 'Public USGS waterservices JSON endpoint; low-volume point observation snapshot cached in src/data/hydrologyObservationsSeed.js.',
    cadence: 'Instantaneous values update frequently; refresh and display retrieval timestamp before presentation use',
    difficulty: 'Low',
    status: 'Observation seed ready',
    notes: 'Low-volume IV query returned six provisional series for streamflow and gage height at three stations. Use as public works / resilience context only; not a flood alert, drainage-performance score, water-quality record, or official emergency feed.'
  },
  {
    name: 'FEMA NFHL + NOAA Storm Events hazard source stack',
    url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer',
    dataType: 'Flood hazard map service references, FEMA Flood Map Service Center verification path, and NOAA/NCEI historical storm-event CSV source routing',
    geography: 'Waynesboro / Burke County, Georgia; parcel-specific flood claims require exact geometry and official source QA',
    accessMethod: 'Public FEMA/NOAA surfaces; use low-volume metadata/annual extracts only, and manually verify map products before presenting flood-zone or loss facts.',
    cadence: 'NFHL updates as FEMA map products are revised; NOAA Storm Events annual CSV files are updated as NCEI releases corrections.',
    difficulty: 'Medium',
    status: 'Seed connector ready',
    notes: 'Added src/data/hazardResilienceSeed.js as a source-routing stub. Runtime TLS checks to hazards.fema.gov failed from this environment, so do not build an automated NFHL connector until service access is confirmed. On 2026-05-31, a low-volume NOAA/NCEI Storm Events CSV download for 2026 filtered STATE=GEORGIA / CZ_NAME=BURKE and returned one Burke County row; cached in src/data/stormEventsSeed.js as a connector-shape seed only.'
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
    name: 'EPA ECHO RCRA REST Services',
    url: 'https://echodata.epa.gov/echo/rcra_rest_services.get_facilities?output=JSON&p_st=GA&p_co=Burke&p_act=Y',
    dataType: 'Public Resource Conservation and Recovery Act handler identity rows, generator categories, summary violation/enforcement counts, and query pagination metadata',
    geography: 'Active Burke County, Georgia RCRA handlers; cached UI sample emphasizes Waynesboro-addressed rows returned by EPA ECHO',
    accessMethod: 'Public EPA ECHO REST endpoint; low-volume county query followed by get_qid pagination. Cache public identity fields only until each ECHO profile is manually reviewed.',
    cadence: 'EPA ECHO/RCRA refresh cadence varies by source table; refresh before presentation use and verify facility profiles before detailed claims.',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Low-volume query returned 11 active Burke County RCRA handler rows with summary counts and no current-violation rows in the query metadata; added src/data/hazardousWasteSeed.js and an Operations environmental source panel. This is not a complete business inventory, zoning finding, city inspection record, hazard finding, or standalone compliance conclusion.'
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
    name: 'USDA ERS Food Access Research Atlas',
    url: 'https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data/',
    dataType: 'Tract-level low-income / low-access food access indicators, downloadable national files, and state-level comparison pages',
    geography: 'Census tracts; filter to Burke County / Waynesboro-area tracts only after dataset vintage and tract-city crosswalk are documented',
    accessMethod: 'Public USDA ERS download page; manual or low-volume file download first, then cache only normalized aggregate tract rows with vintage/methodology labels.',
    cadence: 'Publication-based Atlas releases; public page currently advertises 2019 data plus archived 2015, 2010, and 2006 files.',
    difficulty: 'Medium',
    status: 'Source route indexed',
    notes: 'Low-volume page review found public XLSX and ZIP downloads for 2019 Food Access Research Atlas data. Added src/data/foodAccessSeed.js and an Operations food-access source panel; no food-desert or grocery-access claim is displayed until tract rows are extracted and geography is QA’d.'
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
    name: 'Georgia DOT GeoPI Project Information',
    url: 'https://www.dot.ga.gov/applications/geopi/Pages/Dashboard.aspx',
    dataType: 'State transportation project information, project search surface, and public project map route',
    geography: 'Georgia statewide; manually filter to Burke County / Waynesboro before local project claims',
    accessMethod: 'Public GDOT web application and public ArcGIS map surface; low-volume route check only, then manual filter/export review before row caching.',
    cadence: 'GDOT project data updates as the application is maintained; project-specific cadence not yet confirmed',
    difficulty: 'Medium',
    status: 'Source route verified',
    notes: 'Runtime reached GeoPI Dashboard and the public ArcGIS Project Search map with HTTP 200. Added src/data/transportationProjectSeed.js and an Operations source panel; this is not a confirmed Waynesboro project list until specific rows are filtered, timestamped, and manually verified.'
  },
  {
    name: 'FCC Broadband Data Collection / National Broadband Map',
    url: 'https://broadbandmap.fcc.gov/data-download',
    dataType: 'Broadband availability, provider, technology, speed-tier, location/fabric, and challenge-process source route after export terms and geography are verified',
    geography: 'Waynesboro / Burke County, Georgia; aggregate only until location-level display rules are reviewed',
    accessMethod: 'Public FCC National Broadband Map and data-download pages; use manual export review first, then cache only permitted aggregate availability records with vintage and FCC attribution.',
    cadence: 'Published by FCC Broadband Data Collection filing cycle; attach vintage/date to every future observation.',
    difficulty: 'Medium',
    status: 'Source surface verified',
    notes: 'Runtime reached FCC National Broadband Map data-download and nationwide-data pages with HTTP 200. Added src/data/broadbandAccessSeed.js and an Operations digital-infrastructure panel. No coverage, provider, subscription, affordability, or outage claim is displayed until export scope, vintage, geography, and aggregation method are confirmed.'
  },
  {
    name: 'Census Reporter ACS internet subscription table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B28002&geo_ids=16000US1380984',
    dataType: 'ACS household internet subscription and access estimates with margins of error',
    geography: 'Waynesboro city, Georgia (16000US1380984)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B28002 request cached in src/data/internetSubscriptionSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro household internet-subscription context, including with internet subscription, broadband of any type, cellular-only, cable/fiber/DSL, satellite, and no internet access estimates with MOE. Added a digital-access context grid inside the Operations broadband panel. Treat as ACS survey context only; not FCC availability, provider coverage, speed, affordability, outage, or municipal telemetry.'
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
  },
  {
    name: 'City of Waynesboro LIHTC submittal information',
    url: 'https://www.waynesboroga.com/DocumentCenter/View/914/2026-LIHTC-submittal-info',
    dataType: 'Official city-hosted Low Income Housing Tax Credit submittal PDF route and housing-affordability source path',
    geography: 'City of Waynesboro, Georgia; Georgia DCA state-program context before award or compliance claims',
    accessMethod: 'Public CivicPlus DocumentCenter PDF route; use low-volume manual PDF review and DCA cross-check before caching any unit, applicant, award, scoring, or project-status fields.',
    cadence: 'Annual or application-cycle based as city/DCA publish notices and housing-credit materials; exact cadence must be verified per document.',
    difficulty: 'Medium',
    status: 'Official local PDF route verified',
    notes: 'Added src/data/affordableHousingSeed.js and a Housing Affordability source panel in Operations. This is a source route only: do not present affordable-housing unit counts, LIHTC awards, eligibility, applicant status, or development-pipeline facts until the PDF and Georgia DCA records are manually reviewed and source-labeled.'
  },
  {
    name: 'U.S. Census LEHD LODES data downloads',
    url: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/',
    dataType: 'Public block-level workplace area, residence area, origin-destination commute-flow, and block-geography crosswalk CSV/GZIP files',
    geography: 'Georgia statewide block-level files; aggregate to Waynesboro place GEOID 1380984 and Burke County only after crosswalk QA',
    accessMethod: 'Public Census LEHD static file downloads; low-volume HEAD checks verified WAC, RAC, OD, crosswalk, and technical documentation routes.',
    cadence: 'Annual LODES vintage releases; file modified dates vary by table and should be stored with every cached snapshot.',
    difficulty: 'Medium',
    status: 'Source route verified',
    notes: 'HEAD checks returned HTTP 200 for Georgia WAC, RAC, OD main jobs, Georgia crosswalk, and LODES technical documentation. Added src/data/lehdCommutingSeed.js and a compact economic workforce/commuting source panel. Do not present city job counts, commuter inflow/outflow, employer lists, or block-level claims until place aggregation and disclosure-safe summarization are complete.'
  },
  {
    name: 'Census Reporter ACS journey-to-work tables',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08301,B08303&geo_ids=16000US1380984',
    dataType: 'ACS means-of-transportation and travel-time-to-work estimates with margins of error',
    geography: 'Waynesboro city, Georgia (16000US1380984)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B08301/B08303 request cached in src/data/commuteProfileSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro journey-to-work estimates: workers 16+, drove-alone, carpool, worked-from-home, and travel-time buckets. Added an Economic commute profile panel. Treat as survey context only; not live traffic volume, transit ridership, employer roster, road-safety, or downtown foot-traffic data.'
  },
  {
    name: 'Census Reporter ACS housing tenure and occupancy tables',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25003,B25002,B25077,B25064&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS housing tenure, occupancy status, median owner-occupied value, and median gross rent estimates with margins of error',
    geography: 'Waynesboro city, Georgia (16000US1380984), with Burke County and Georgia cross-check geographies in the request shape',
    accessMethod: 'Public no-key Census Reporter API; low-volume request with User-Agent cached in src/data/housingTenureSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned occupied, owner/renter, vacant housing, median home value, and median gross rent estimates for Waynesboro with MOE. Added an Operations housing source panel. Treat as ACS context only; not parcel-level vacancy, rent-roll, tax, code-enforcement, official housing-program, or downtown occupancy data.'
  },
  {
    name: 'Census Reporter ACS housing cost burden tables',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25070,B25091&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25070 renter gross-rent burden and B25091 owner monthly-cost burden estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/housingCostBurdenSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro housing burden context: 689 renter units / 44.3% at 30%+ of income and 125 owner units / 19.3% at 30%+ of income. Treat as ACS survey context only; not rent rolls, household eligibility, eviction records, utility hardship records, parcel condition, program enrollment, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS monthly housing cost tables',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25064,B25088&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25064 median gross rent and B25088 median selected monthly owner costs by mortgage status with margins of error',
    geography: 'Waynesboro city, Burke County, and Georgia comparison rows',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/housingMonthlyCostsSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024',
    difficulty: 'Low',
    status: 'Seed connector ready',
    notes: 'Runtime query returned Waynesboro median gross rent $746 ±73, owner costs $846 ±482 total, $1,379 ±99 with mortgage, and $507 ±133 without mortgage. Added an Operations monthly housing-cost panel and Housing Source Ladder; treat as survey planning context only, not rent rolls, lease records, mortgage servicing, property-tax bills, or utility hardship data.'
  },
  {
    name: 'Census Reporter ACS workforce and educational attainment tables',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B15003,B23025&geo_ids=16000US1380984',
    dataType: 'ACS educational attainment and employment-status estimates with margins of error',
    geography: 'Waynesboro city, Georgia (16000US1380984)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B15003/B23025 request cached in src/data/workforceEducationSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned city-level attainment and ACS employment-status context for Waynesboro. Added an Economic workforce education panel. Treat as survey context only; not employer payroll, job postings, school performance, business-license data, or monthly unemployment.'
  },
  {
    name: 'Census Reporter ACS age-sex table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001&geo_ids=16000US1380984',
    dataType: 'ACS age profile / population-by-age estimates with margins of error',
    geography: 'Waynesboro city, Georgia (16000US1380984)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B01001 request cached in src/data/ageProfileSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro age groups for under 18, 18–24, 25–44, 45–64, and 65+ with MOE. Added an executive service-demand age profile panel. Treat as ACS survey context only; not school enrollment, EMS demand, voter records, program participation, or department workload data.'
  },
  {
    name: 'Census Reporter ACS household vehicle availability table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B08201&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS household vehicle availability estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B08201 request cached in src/data/vehicleAccessSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned household vehicle-availability context for Waynesboro, Burke County, and Georgia, including zero-vehicle households. Added an Operations mobility-access panel. Treat as ACS survey context only; not live traffic, transit ridership, hardship, service demand, school transportation, emergency response, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS tenure by vehicles available table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25044&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25044 owner/renter household vehicle-availability estimates with city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/vehicleTenureSeed.js after retrying with a descriptive User-Agent.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro B25044 context: 353 zero-vehicle households / 16.0% overall and 22.7% of renter households. Added an Operations mobility evidence ladder and tenure split. Treat strictly as ACS survey context; not vehicle registration, transit ridership, traffic volume, school transportation records, emergency response, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS disability-by-age table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B18101&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B18101 disability-status estimates by sex and age with city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume request cached in src/data/disabilityAccessSeed.js after retrying with a descriptive User-Agent.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro disability-status context: 495 residents / 8.9% in the ACS universe, plus Burke County and Georgia comparison rows. Added an Operations accessibility/service-context panel. Treat as ACS survey context only; not clinical records, ADA compliance findings, benefits eligibility, EMS demand, school data, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS year structure built table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25034&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25034 housing-stock age estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B25034 request cached in src/data/housingAgeSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro year-structure-built context: 2,036 pre-1980 units / 76.2% of ACS housing units, plus Burke County and Georgia comparisons. Added an Operations housing-age panel. Treat as survey planning context only; not parcel condition, code-enforcement, rehabilitation-cost, lead-paint, vacancy, or downtown building-inventory evidence.'
  },
  {
    name: 'Census Reporter ACS units in structure table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25024&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25024 units-in-structure estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B25024 request cached in src/data/housingStructureSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro units-in-structure context: 2,673 housing units, 60.0% single-family, 28.2% in 2-4 unit structures, 9.1% in 5+ unit structures, and 2.7% mobile homes. Added an Operations housing-typology panel. Treat as ACS survey context only; not a parcel inventory, zoning determination, permit history, occupancy certificate, tax record, rent roll, or affordability-program evidence.'
  },
  {
    name: 'Census Reporter ACS occupants per room table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25014&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25014 occupants-per-room estimates by tenure with margins of error and city/county/state crowding context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B25014 request cached in src/data/housingCrowdingSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro occupied-units-by-occupants-per-room context: 2,204 occupied ACS units, 70.6% renter occupied, and 0.0% estimated >1.00 occupants per room with nonzero derived MOE ±49. Added an Operations housing-crowding panel. Treat as ACS survey planning context only; not a code-enforcement, inspection, rent-roll, occupancy-certificate, homelessness, household-level, or municipal service record.'
  },
  {
    name: 'Census Reporter ACS owner-occupied home value table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25075&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25075 owner-occupied housing-unit value estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B25075 request cached in src/data/homeValueDistributionSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro owner-occupied value distribution: 648 owner-occupied units, 36.3% under $100K, 23.0% $100K-$199K, 22.4% $200K-$299K, and 18.4% $300K+. Added an Operations home-value distribution panel. Treat as ACS survey context only; not an appraisal roll, parcel valuation export, tax assessment, sale record, rent roll, code-enforcement evidence, or affordability-program eligibility finding.'
  },
  {
    name: 'Census Reporter ACS house heating fuel table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25040&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B25040 house-heating-fuel estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B25040 request cached in src/data/utilityEnergySeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro house-heating-fuel context: 1,584 occupied units / 71.9% using electricity and 620 / 28.1% using utility gas, with MOE and Burke/Georgia comparisons. Added an Operations energy-resilience panel. Treat as ACS survey context only; not utility customer counts, service territory, outage exposure, rate affordability, energy-burden eligibility, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS population under 18 by age table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B09001,B01001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B09001 under-18 age-band estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B09001+B01001 request cached in src/data/youthProfileSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro under-18 context: 1,374 residents / 24.3% of population with MOE ±308, plus age bands from under 3 through 15–17 and county/state comparisons. Added an executive Youth / Family Service Context panel. Treat as ACS survey planning context only; not school enrollment, childcare slots, youth-program demand, juvenile justice data, household records, or department workload.'
  },
  {
    name: 'Census Reporter ACS food stamp / SNAP receipt table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B22001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B22001 household Food Stamps/SNAP receipt estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B22001 request cached in src/data/snapAssistanceSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro SNAP receipt context: 731 households / 33.2% receiving Food Stamps/SNAP in the past 12 months with MOE ±231, plus Burke County and Georgia comparisons. Added an Executive food-security panel. Treat as ACS survey planning context only; not benefits enrollment administration, eligibility, school-meal participation, pantry demand, agency caseload, household-level records, or municipal telemetry.'
  },
  {
    name: 'Census Reporter ACS school enrollment table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B14001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B14001 school-enrollment-by-level estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B14001 request cached in src/data/schoolEnrollmentSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro school-enrollment context: 5,427 residents age 3+ in the table universe and 1,260 / 23.2% enrolled in school with MOE ±269, plus level splits from preschool through college and Burke/Georgia comparisons. Added an Economic school-enrollment panel. Treat as ACS survey planning context only; not Burke County Public Schools enrollment, attendance, graduation, CTAE, student-level, childcare-slot, school-performance, or municipal workload data.'
  },
  {
    name: 'Census Reporter ACS veteran status table',
    url: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B21001&geo_ids=16000US1380984,05000US13033,04000US13',
    dataType: 'ACS B21001 civilian population 18+ veteran-status estimates with margins of error and city/county/state comparison context',
    geography: 'Waynesboro city, Georgia (16000US1380984), Burke County (05000US13033), and Georgia (04000US13)',
    accessMethod: 'Public no-key Census Reporter API; low-volume B21001 request cached in src/data/veteranStatusSeed.js.',
    cadence: 'Annual ACS 5-year release as Census Reporter refreshes; current seed uses ACS 2024 5-year / 2020-2024 release.',
    difficulty: 'Low',
    status: 'Public API seed ready',
    notes: 'Runtime query returned Waynesboro veteran-status context: 313 veterans / 7.3% of civilian population age 18+ with MOE ±158, plus Burke County and Georgia comparisons. Added an Executive veteran-service lens panel. Treat as ACS survey planning context only; not VA enrollment, benefits eligibility, service-connected disability, nonprofit caseload, household-level records, or municipal service demand.'
  },
  {
    name: 'City of Waynesboro Mental Health Resources page',
    url: 'https://www.waynesboroga.com/265/Mental-Health-Resources',
    dataType: 'Official city-hosted service-navigation page with local, state, and national mental-health / crisis-resource links',
    geography: 'Waynesboro, Georgia residents; local and regional services plus state/national resource routes',
    accessMethod: 'Public CivicPlus page; low-volume source-route review cached in src/data/mentalHealthResourcesSeed.js.',
    cadence: 'As posted by the City of Waynesboro; no update cadence stated on the page.',
    difficulty: 'Low',
    status: 'Official local resource route indexed',
    notes: 'Runtime page review returned HTTP 200 and found official city resource text plus links to Georgia DBHDD, GCAL, 988 Georgia, SAMHSA, NAMI, Veterans Crisis Line, and other resource routes. Added an Operations mental-health resource-navigation panel. Treat as public service-navigation context only: not clinical advice, provider endorsement, crisis-call data, utilization counts, eligibility, or local disease-burden evidence.'
  },
  {
    name: 'CDC/ATSDR Social Vulnerability Index 2022 Georgia CSV',
    url: 'https://svi.cdc.gov/Documents/Data/2022/csv/states/Georgia.csv',
    dataType: 'Tract-level Social Vulnerability Index percentiles and component fields for emergency planning, resilience, grant context, and service-access questions',
    geography: 'Burke County census tracts (STCNTY 13033); Waynesboro-specific overlap requires boundary/tract QA',
    accessMethod: 'Public no-key CSV download; low-volume Georgia file filtered locally to Burke County rows and cached in src/data/socialVulnerabilitySeed.js.',
    cadence: 'CDC/ATSDR SVI release-based; current seed uses 2022 release.',
    difficulty: 'Low',
    status: 'Public CSV seed ready',
    notes: 'Runtime download returned the Georgia SVI CSV and 7 Burke County tract rows. Added an Operations SVI resilience panel showing top tract context and strict caveats. Treat as county tract planning context only; not a Waynesboro city score, parcel risk finding, disaster-loss record, household-level data, or live emergency-management feed.'
  }
];

export const readinessStrip = [
  { lane: 'Demographics', status: 'Live snapshot + age + household + race/origin + youth + veteran mix', source: 'Data Commons API / Census Reporter B01001/B03002/B09001/B11001/B21001', tone: 'good' },
  { lane: 'Economic mobility', status: 'ACS poverty + SNAP seeds', source: 'Census Reporter B17001/B22001', tone: 'good' },
  { lane: 'Language access', status: 'ACS communication seed', source: 'Census Reporter C16001', tone: 'good' },
  { lane: 'City documents', status: 'Index-ready', source: 'Agenda Center / Archive Center', tone: 'good' },
  { lane: 'Parcels', status: 'Manual / permissioned', source: 'qPublic / Schneider GIS', tone: 'watch' },
  { lane: 'Map base', status: 'Boundary seed ready', source: 'OSM + TIGERweb + Census Reporter GeoJSON', tone: 'good' },
  { lane: 'Economy', status: 'Workforce + industry + occupation + income + commute', source: 'BLS LAUS + ACS B19001/B15003/B23025/C24030/C24010 + LEHD/LODES + CBP', tone: 'good' },
  { lane: 'Education', status: 'GaDOE routes + ACS enrollment seed', source: 'Georgia Insights + Burke County Public Schools + Census Reporter B14001', tone: 'good' },
  { lane: 'Finance', status: 'Budget PDFs + sales-tax + digest routes', source: 'UGA CVIOG / Georgia DOR Distributions / Digest Compliance', tone: 'good' },
  { lane: 'Permits', status: 'City route index', source: 'City Building Permits / Open Records', tone: 'watch' },
  { lane: 'Utilities', status: 'Water + energy context', source: 'City Water Rates / EPA SDWIS / Georgia EPD DWW / ACS B25040', tone: 'good' },
  { lane: 'Digital access', status: 'ACS context + FCC route', source: 'Census Reporter B28002 / FCC BDC', tone: 'good' },
  { lane: 'Mobility access', status: 'ACS vehicle + tenure + disability seeds', source: 'Census Reporter B08201 / B25044 / B18101', tone: 'good' },
  { lane: 'Housing', status: 'ACS tenure + burden + monthly costs + age + typology + crowding + values + LIHTC route', source: 'Census Reporter B25003/B25002/B25070/B25091/B25064/B25088/B25034/B25024/B25014/B25075 / City DocumentCenter / Georgia DCA', tone: 'good' },
  { lane: 'Environmental', status: 'CWA + RCRA seeds ready', source: 'EPA ECHO Clean Water Act / RCRA', tone: 'good' },
  { lane: 'Hydrology', status: 'USGS IV snapshot', source: 'USGS NWIS Site + Instantaneous Values', tone: 'good' },
  { lane: 'Resilience', status: 'Hazard source stack', source: 'FEMA NFHL / NOAA Storm Events', tone: 'watch' },
  { lane: 'Ordinances', status: 'Reference-ready', source: 'Municode Library', tone: 'good' },
  { lane: 'Public safety', status: 'Crime source routing', source: 'GBI Crime Statistics / FBI CDE / E-911', tone: 'watch' },
  { lane: 'Civic participation', status: 'Reference routes', source: 'Burke Elections / Georgia SOS MVP', tone: 'watch' },
  { lane: 'Policy / zoning', status: 'Route index', source: 'City Community Development / DocumentCenter', tone: 'watch' },
  { lane: 'Transportation', status: 'GeoPI route verified', source: 'GDOT GeoPI Project Information', tone: 'watch' },
  { lane: 'Health access', status: 'ACS insurance + city resource route', source: 'Census Reporter B27010 / City Mental Health Resources', tone: 'good' },
  { lane: 'Health equity', status: 'PLACES + SVI + food access', source: 'CDC PLACES / CDC-ATSDR SVI / USDA ERS Food Access Atlas', tone: 'watch' }
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
    lane: 'Local finance',
    target: 'Review Waynesboro budget and financial-report PDFs from the CVIOG portal',
    source: 'UGA CVIOG Local Government Financial Documents Online',
    value: 'Gives finance and Council modules a public, city-specific document spine before any budget, audit, fund-balance, or revenue claim is promoted.',
    nextStep: 'Open FY2026/FY2025/FY2024 budget reports and FY2024 financial report, extract only title/date/page-cited fields first, then reconcile against agendas and DOR rows.',
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
    lane: 'Talent / workforce',
    target: 'Cross-check ACS attainment and employment-status context against education/workforce sources',
    source: 'Census Reporter ACS B15003/B23025 + Georgia Insights + BLS LAUS',
    value: 'Adds city-level talent and labor-force survey context without inventing employer demand, school outcomes, or monthly unemployment.',
    nextStep: 'Propagate MOE for derived attainment percentages, compare ACS employment-status rates to BLS county LAUS, and pair with GaDOE/CTAE aggregate source routes before Council workforce recommendations.',
    difficulty: 'Low'
  },
  {
    lane: 'Jobs / commuting',
    target: 'Aggregate Census LEHD/LODES block files into city-safe workforce counts',
    source: 'U.S. Census LEHD LODES data downloads',
    value: 'Adds a public route for jobs located in Waynesboro, resident-worker context, and commute-flow questions without inventing employer or license data.',
    nextStep: 'Download the Georgia block crosswalk, filter blocks to place GEOID 1380984, then aggregate WAC/RAC/OD rows into disclosure-safe city and county summary cards.',
    difficulty: 'Medium'
  },
  {
    lane: 'Jobs / commuting',
    target: 'Reconcile ACS journey-to-work estimates with LEHD and GDOT corridor evidence',
    source: 'Census Reporter ACS B08301/B08303 journey-to-work tables',
    value: 'Gives the economic lane a city-level commute-mode and travel-time context without pretending to know live traffic, employers, or downtown foot traffic.',
    nextStep: 'Keep the ACS commute seed visible with MOE, then cross-check against LEHD place aggregation and permitted GDOT TADA station exports before producing corridor recommendations.',
    difficulty: 'Low'
  },
  {
    lane: 'Mobility access',
    target: 'Reconcile ACS vehicle availability with service-location and transportation evidence',
    source: 'Census Reporter ACS B08201 household vehicle availability table + B25044 tenure-by-vehicle table',
    value: 'Adds city/county/state zero-vehicle household context and owner/renter tenure splits without inventing transit ridership, hardship, or service-demand claims.',
    nextStep: 'Propagate derived MOE for combined zero-vehicle shares, pair with commute tables, LEHD/LODES, GDOT, nonprofit/transit routes, school transportation sources, and service-location maps before Council recommendations.',
    difficulty: 'Low'
  },
  {
    lane: 'Accessibility / service planning',
    target: 'Cross-check ACS disability context against ADA/public-facility and mobility sources',
    source: 'Census Reporter ACS B18101 disability-by-age table',
    value: 'Adds a source-labeled accessibility planning seed without turning survey estimates into ADA, health, benefits, school, or service-demand findings.',
    nextStep: 'Calculate derived MOE, then pair with ADA transition plans, sidewalk/facility inventories, age profile, vehicle access, CDC PLACES, and capital-project records before Council recommendations.',
    difficulty: 'Low'
  },
  {
    lane: 'Education / talent pipeline',
    target: 'Confirm Georgia Insights export paths for Burke County school/workforce indicators',
    source: 'Georgia Insights / GaDOE Education Dashboards',
    value: 'Adds a public education and CTAE/workforce context route without inventing school-performance, student-level, or city-government metrics.',
    nextStep: 'Manually test Georgia Insights district/school filters for Burke County, confirm downloadable data terms, and cache only aggregate school-year rows with source URLs.',
    difficulty: 'Medium'
  },
  {
    lane: 'Education / youth services',
    target: 'Cross-check ACS school-enrollment context against district/source exports',
    source: 'Census Reporter ACS B14001 + Georgia Insights / Burke County Public Schools',
    value: 'Adds a city-level enrollment-by-level planning lens while keeping school-performance, attendance, district enrollment, and student-level records gated behind official education sources.',
    nextStep: 'Compare B14001 estimates with Burke County Public Schools and Georgia Insights aggregate rows; propagate derived MOE before public grade-band comparisons.',
    difficulty: 'Low'
  },
  {
    lane: 'Digital inclusion',
    target: 'Cross-check ACS internet-subscription context against FCC BDC availability exports',
    source: 'Census Reporter ACS B28002 + FCC National Broadband Map / BDC',
    value: 'Separates household subscription survey context from provider availability and speed claims before broadband, remote-work, or grant-readiness briefs are promoted.',
    nextStep: 'Review FCC BDC export rules and vintage, cache permitted aggregate availability by geography/technology/speed tier, and keep ACS MOE visible beside subscription estimates.',
    difficulty: 'Medium'
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
    lane: 'Transportation projects',
    target: 'Filter GDOT GeoPI for Burke County / Waynesboro project rows',
    source: 'Georgia DOT GeoPI Project Information',
    value: 'Gives the project and operations lanes a real state transportation source route before synthetic road-project status or funding claims are promoted.',
    nextStep: 'Open GeoPI manually, test county/city filters, verify share/export permissions, and cache only source-labeled project identity rows with retrieval dates.',
    difficulty: 'Medium'
  },
  {
    lane: 'Digital infrastructure',
    target: 'Scope FCC Broadband Map exports for Burke / Waynesboro aggregate coverage context',
    source: 'FCC Broadband Data Collection / National Broadband Map',
    value: 'Adds a public federal route for broadband availability and digital-infrastructure planning without guessing provider coverage or outage status.',
    nextStep: 'Manually review FCC download/export rules and current filing vintage; cache only permitted aggregate availability counts by geography/technology/speed tier with source URL and vintage.',
    difficulty: 'Medium'
  },
  {
    lane: 'Housing / tenure',
    target: 'Cross-check ACS housing tenure and vacancy estimates before parcel claims',
    source: 'Census Reporter ACS housing tables B25003/B25002/B25077/B25064',
    value: 'Adds source-labeled housing context and margins of error while keeping parcel vacancy, downtown occupancy, and affordability findings gated behind stronger local records.',
    nextStep: 'Compare Census Reporter values to Data Commons and city/DCA housing documents, then request/obtain parcel-level vacancy or ownership exports before promoting downtown or neighborhood claims.',
    difficulty: 'Low'
  },
  {
    lane: 'Housing stock age',
    target: 'Cross-check ACS structure-age context before rehab or blight recommendations',
    source: 'Census Reporter ACS B25034 year structure built table',
    value: 'Adds a public city-level planning signal for older housing, weatherization, and parcel-export prioritization without making parcel condition or code-enforcement claims.',
    nextStep: 'Pair pre-1980 housing context with qPublic/parcel exports, code-enforcement aggregates, LIHTC/DCA records, and permit history before The Council recommends rehabilitation priorities.',
    difficulty: 'Low'
  },
  {
    lane: 'Housing affordability',
    target: 'Manually review city LIHTC submittal PDF and DCA housing-credit context',
    source: 'City DocumentCenter LIHTC PDF / Georgia DCA',
    value: 'Gives the synthetic housing-development heat map a legitimate policy/source route before affordable-housing, unit-count, or pipeline claims are shown.',
    nextStep: 'Open the city PDF, record title/date/required fields, cross-check DCA cycle materials and award lists, then cache only public, source-labeled observations.',
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
    lane: 'Utilities / energy resilience',
    target: 'Cross-check ACS heating-fuel context against utility and resilience sources',
    source: 'Census Reporter ACS B25040 house heating fuel table',
    value: 'Adds source-labeled household energy context for cold/heat resilience planning without inventing utility customer counts, outage exposure, service territory, or rate-burden claims.',
    nextStep: 'Calculate derived MOE for fuel shares, then pair with city utility-rate documents, electric/gas provider source routes, weatherization programs, and NWS weather-risk context before Council recommendations.',
    difficulty: 'Low'
  },
  {
    lane: 'Hydrology / stormwater',
    target: 'Promote USGS stream-site seed into timestamped current-observation cards',
    source: 'USGS NWIS Site Service / instantaneous values',
    value: 'Adds a real public water-source path for resilience and stormwater context without inventing flood, drainage, water-quality, or emergency claims.',
    nextStep: 'Query current/daily values for 02197830, 021973269, and 02201230, cache timestamps/units/availability flags, then label as county watershed context only.',
    difficulty: 'Low'
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
    lane: 'Food access / resilience',
    target: 'Extract USDA ERS Food Access Research Atlas rows for Burke / Waynesboro-area tracts',
    source: 'USDA ERS Food Access Research Atlas',
    value: 'Adds a defensible public route for grocery-access, nutrition-access, and grant-readiness context without guessing from anecdotes or map impressions.',
    nextStep: 'Download the smaller 2019 ZIP manually, inspect schema, filter Georgia/Burke tract rows, then crosswalk tracts to Waynesboro before any food-access card is promoted.',
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
