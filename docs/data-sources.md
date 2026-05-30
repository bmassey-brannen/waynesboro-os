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
| Data Commons API | https://docs.datacommons.org/api/rest/v2/ | Public demographic, housing, income, labor, and place-identifier observations with upstream provenance facets | Server-side API connector using `.env.local`; keys never exposed to browser/client code | Depends on upstream dataset/facet | Low | Live connector active. Resolved Waynesboro, Georgia as `geoId/1380984`; normalized snapshot is generated at `src/data/dataCommonsSnapshot.js`. |
| U.S. Census Bureau ACS Profile API | https://api.census.gov/data/2023/acs/acs5/profile | Population, income, employment, housing profile metrics | Public API; this environment returned a Census "Missing Key" page, so scheduled ingestion should use a Census API key | Annual ACS 5-year release | Medium | Candidate query shape: `get=NAME,DP05_0001E,DP03_0062E,DP03_0005PE&for=place:*&in=state:13`. Confirm Waynesboro place code before production. |
| Census QuickFacts | https://www.census.gov/quickfacts/fact/table/waynesborocitygeorgia,burkecountygeorgia/PST045223 | Public demographic/economic facts for city and county context | Public web page; cite directly, avoid aggressive scraping | Periodic Census updates | Low | Good public-facing citation while the structured ACS connector is built. |
| City of Waynesboro official website | https://www.waynesboroga.com/ | City departments, official notices, local links | Public web pages | As posted by city | Medium | City page links to Georgia DOR, Burke County Tax Assessors/qPublic, Agenda Center, Archive Center, Calendar, City Council page, and WIPP payment portal. |
| City of Waynesboro Agenda Center | https://www.waynesboroga.com/AgendaCenter | City council agendas, agenda packets, meeting notices, RSS/list views | Public CivicPlus Agenda Center page with RSS/list links; low-volume document index only | Meeting-cycle updates | Low | Official city page exposes `/rss.aspx#agendaCenter` and `/list.aspx#agendaCenter`; strong first city document connector. |
| City of Waynesboro Archive Center | https://www.waynesboroga.com/Archive.aspx | Archived city documents and public records published through CivicPlus | Public archive page; index document links and dates conservatively | As posted by city | Medium | Discovery surface for budgets, minutes, ordinances, and plans if exposed; do not infer completeness without manual review. |
| Waynesboro WIPP / Edmunds Associates tax portal | https://wipp.edmundsassoc.com/Wipp?wippid=WYNS | Online municipal tax/payment portal and account lookup workflow | Public payment portal; link/reference only unless city/vendor publishes permitted exports | Operational live portal | High | Official city homepage redirects from `https://wippii.edmundsassoc.com/WippWYNS/`. Treat as citizen service/payment system, not a scrape target. |
| Burke County qPublic / Schneider GIS | http://qpublic.net/ga/burke/ | Parcel maps, property assessment records, ownership, parcel attributes | Public assessor/GIS portal linked by City and County; manual review first | Assessor updates; cadence not confirmed | High | Schneider-hosted pages may show bot protection. Use official exports/API only if offered or request permission. |
| Burke County Planning: Permits and Inspections | https://www.burkecounty-ga.gov/departments/planning_department/permits_and_inspections.php | Building permits, inspections process, planning contacts | Public county page plus linked iWorQ request portal | Operational; publication cadence not stated | Medium | Determine whether historical permit reports are published or require records request. |
| Burke County iWorQ Building Permit Request | https://burke.portal.iworq.net/BURKE/new-request/700/3610 | Permit intake workflow; potential lead for permit status/reporting system | Public request portal; no scraping of private submissions | Live operational portal | High | Treat as an intake endpoint, not a public records database unless public reports are exposed. |
| Burke County Board of Commissioners Agendas and Minutes | https://www.burkecounty-ga.gov/departments/board_of_commissioners/meetings_agendas_minutes.php | Meetings, agendas, minutes, decisions | Public county pages | Meeting-cycle updates | Low | Good for project tracker events and Council brief citations. |
| Burke County Budgets and Financial Reports | https://www.burkecounty-ga.gov/departments/administration/budgets___financial_reports.php | Budgets, financial reports, check registers | Public county pages / PDF downloads where available | Annual budgets; periodic reports/check registers | Medium | Useful for capital projects, public spending, and county context. |
| Burke County Check Registers | https://www.burkecounty-ga.gov/departments/administration/check_registers.php | County expenditure check registers and public finance documents | Public Revize document-center page / downloads where posted | Periodic as published | Medium | Spending context and vendor/project trail; normalize posted document metadata before parsing. |
| Burke County Code Enforcement page | https://www.burkecounty-ga.gov/departments/planning_department/code_enforcement.php | Code enforcement program information, contacts, records request path | Public county information page; records data likely requires request or official export | As posted by county | High | Potential future source for Beautification Index once violation records are legally obtained and source-labeled. |
| Burke County E-911 department page | https://www.burkecounty-ga.gov/departments/e911.php | Emergency communications department context and public contacts | Public information page; no access to dispatch/private systems | As posted by county | High | Public safety dashboard needs aggregated, officially released incident/response data or records request results. |
| City of Waynesboro Code of Ordinances / Municode Library | https://library.municode.com/ga/waynesboro/codes/code_of_ordinances | Municipal code, ordinances, zoning/code context, regulatory baseline | Public Municode library page; cite/link and manually verify before extracting legal text | Updated as ordinances are codified; exact lag varies | Medium | Useful for Council/legal context, zoning/code-enforcement definitions, and source-labeled policy drilldowns. Do not present as legal advice. |
| City of Waynesboro Downtown Development Authority page | https://www.waynesboroga.com/152/Downtown-Development-Authority | Official downtown/economic-development board context, contacts, program surface | Public city web page; source hub and manual verification path for linked materials | As posted by city | Low | Connects downtown command-center concepts to official redevelopment/DDA context before parcel-level data is available. |
| Georgia Department of Revenue Digest Compliance | https://dor.georgia.gov/local-government-services/digest-compliance | Tax digest summaries, millage rates, ad valorem tax reports | Public state pages/downloadable reports | Annual / periodic state reporting | Medium | Follow child pages for Tax Digest Consolidated Summaries and Property Tax Millage Rates. |
| Georgia Department of Labor Workforce Statistics & Economic Research | https://dol.georgia.gov/workforce-statistics-economic-research | Labor force, unemployment, workforce and industry statistics | Public state workforce pages; exact downloadable endpoint still to confirm | Monthly for labor force series where published | Medium | Legacy DOL endpoint timed out from this environment. Keep as research target before coding ingestion. |
| OpenStreetMap / Nominatim | https://nominatim.openstreetmap.org/search?format=json&q=Waynesboro%2C%20Georgia&limit=1 | Boundary lookup, place coordinates, basemap context | Public endpoint with usage-policy-compliant low-volume queries and OSM attribution | Community updated | Low | Test call returned Waynesboro relation data; a normalized seed shape is in `src/data/sourceRegistry.js`. |

## Immediate connector candidates

1. **Data Commons baseline snapshot**: run `npm run fetch:datacommons` to refresh public demographic/housing/income/labor observations for Waynesboro (`geoId/1380984`), Burke County, and Georgia; bind only source-labeled metrics into the UI.
2. **City document index**: cache Waynesboro Agenda Center + Archive Center links first; fields should include title, category/board, date, URL, retrieval timestamp, and source page.
3. **OSM seed connector**: use normalized Waynesboro lat/lon and attribution now for map credibility.
4. **County meetings document index**: crawl/index public agenda/minutes pages conservatively and cache document links with dates.
5. **Census ACS profile connector**: use API key in environment or a cached manual export; map fields to KPI cards with timestamps.
6. **DOR digest report index**: collect state report links first, then parse only stable CSV/XLS/PDF downloads if available.
7. **Ordinance reference layer**: curate a citation-only index from Municode for zoning, code-enforcement, signs, nuisances, and downtown policy contexts; manually verify sections before using them in Council text.
8. **Downtown/DDA source hub**: review the official Downtown Development Authority page for board/program links that can anchor the downtown command center before parcel exports are available.

## Open questions

- Does the City of Waynesboro publish city budgets, adopted ordinances, and signed minutes through Archive Center categories, Agenda Center attachments, or another CivicPlus module?
- Are Burke County permits available as public historical reports, or only through request/intake forms?
- Does qPublic offer a permitted export/API for parcel data, or should the app link out and use manually exported parcel snapshots?
- Which public safety data, if any, is published in machine-readable form for Waynesboro/Burke County?
- Which Municode sections are most relevant to vacancies, nuisances, signs, zoning, and downtown redevelopment, and how should they be cited without turning the product into legal advice?
- Does the Downtown Development Authority page link to meeting records, incentive programs, or district maps that can become an official downtown data layer?
