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
    notes: 'City page links to Georgia DOR and Burke County Tax Assessors/qPublic; still need direct city agendas/budgets endpoints.'
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
