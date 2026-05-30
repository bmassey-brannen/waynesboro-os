# Waynesboro OS public data source registry

Purpose: replace synthetic demo data with legitimate public or semi-public sources for Waynesboro, Georgia and Burke County. Do not imply official municipal claims until a metric is connected, timestamped, and source-labeled.

## Access rules

- Use public APIs, public web pages, official downloads, or permissioned exports only.
- Do not bypass authentication, bot protection, rate limits, or private portals.
- Prefer scheduled low-volume pulls, cached snapshots, and source attribution.
- Keep mock/demo metrics labeled until connected to source records.

## Sources identified this run

| Source | URL | Data type | Access method | Cadence | Difficulty | Notes / questions |
| --- | --- | --- | --- | --- | --- | --- |
| U.S. Census Bureau ACS Profile API | https://api.census.gov/data/2023/acs/acs5/profile | Population, income, employment, housing profile metrics | Public API; this environment returned a Census "Missing Key" page, so scheduled ingestion should use a Census API key | Annual ACS 5-year release | Medium | Candidate query shape: `get=NAME,DP05_0001E,DP03_0062E,DP03_0005PE&for=place:*&in=state:13`. Confirm Waynesboro place code before production. |
| Census QuickFacts | https://www.census.gov/quickfacts/fact/table/waynesborocitygeorgia,burkecountygeorgia/PST045223 | Public demographic/economic facts for city and county context | Public web page; cite directly, avoid aggressive scraping | Periodic Census updates | Low | Good public-facing citation while the structured ACS connector is built. |
| City of Waynesboro official website | https://www.waynesboroga.com/ | City departments, official notices, local links | Public web pages | As posted by city | Medium | City page links to Georgia DOR and Burke County Tax Assessors/qPublic. Need direct city agendas, budgets, and ordinances endpoints. |
| Burke County qPublic / Schneider GIS | http://qpublic.net/ga/burke/ | Parcel maps, property assessment records, ownership, parcel attributes | Public assessor/GIS portal linked by City and County; manual review first | Assessor updates; cadence not confirmed | High | Schneider-hosted pages may show bot protection. Use official exports/API only if offered or request permission. |
| Burke County Planning: Permits and Inspections | https://www.burkecounty-ga.gov/departments/planning_department/permits_and_inspections.php | Building permits, inspections process, planning contacts | Public county page plus linked iWorQ request portal | Operational; publication cadence not stated | Medium | Determine whether historical permit reports are published or require records request. |
| Burke County iWorQ Building Permit Request | https://burke.portal.iworq.net/BURKE/new-request/700/3610 | Permit intake workflow; potential lead for permit status/reporting system | Public request portal; no scraping of private submissions | Live operational portal | High | Treat as an intake endpoint, not a public records database unless public reports are exposed. |
| Burke County Board of Commissioners Agendas and Minutes | https://www.burkecounty-ga.gov/departments/board_of_commissioners/meetings_agendas_minutes.php | Meetings, agendas, minutes, decisions | Public county pages | Meeting-cycle updates | Low | Good for project tracker events and Council brief citations. |
| Burke County Budgets and Financial Reports | https://www.burkecounty-ga.gov/departments/administration/budgets___financial_reports.php | Budgets, financial reports, check registers | Public county pages / PDF downloads where available | Annual budgets; periodic reports/check registers | Medium | Useful for capital projects, public spending, and county context. |
| Georgia Department of Revenue Digest Compliance | https://dor.georgia.gov/local-government-services/digest-compliance | Tax digest summaries, millage rates, ad valorem tax reports | Public state pages/downloadable reports | Annual / periodic state reporting | Medium | Follow child pages for Tax Digest Consolidated Summaries and Property Tax Millage Rates. |
| Georgia Department of Labor Workforce Statistics & Economic Research | https://dol.georgia.gov/workforce-statistics-economic-research | Labor force, unemployment, workforce and industry statistics | Public state workforce pages; exact downloadable endpoint still to confirm | Monthly for labor force series where published | Medium | Legacy DOL endpoint timed out from this environment. Keep as research target before coding ingestion. |
| OpenStreetMap / Nominatim | https://nominatim.openstreetmap.org/search?format=json&q=Waynesboro%2C%20Georgia&limit=1 | Boundary lookup, place coordinates, basemap context | Public endpoint with usage-policy-compliant low-volume queries and OSM attribution | Community updated | Low | Test call returned Waynesboro relation data; a normalized seed shape is in `src/data/sourceRegistry.js`. |

## Immediate connector candidates

1. **OSM seed connector**: use normalized Waynesboro lat/lon and attribution now for map credibility.
2. **County meetings document index**: crawl/index public agenda/minutes pages conservatively and cache document links with dates.
3. **Census ACS profile connector**: use API key in environment or a cached manual export; map fields to KPI cards with timestamps.
4. **DOR digest report index**: collect state report links first, then parse only stable CSV/XLS/PDF downloads if available.

## Open questions

- Does the City of Waynesboro publish city council agendas/minutes/budgets on a stable endpoint separate from the county site?
- Are Burke County permits available as public historical reports, or only through request/intake forms?
- Does qPublic offer a permitted export/API for parcel data, or should the app link out and use manually exported parcel snapshots?
- Which public safety data, if any, is published in machine-readable form for Waynesboro/Burke County?
