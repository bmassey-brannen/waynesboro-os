export const censusBuildingPermitsSeed = {
  sourceName: 'U.S. Census Bureau Building Permits Survey county ASCII files',
  retrievedAt: '2026-06-01T00:00:00Z',
  sourceUrl: 'https://www2.census.gov/econ/bps/County/co2604y.txt',
  monthlySourceUrl: 'https://www2.census.gov/econ/bps/County/co2604c.txt',
  directoryUrl: 'https://www2.census.gov/econ/bps/County/',
  programUrl: 'https://www.census.gov/construction/bps/',
  accessMethod: 'Public Census HTTPS directory and comma-delimited county files; low-volume read of April 2026 current-month and year-to-date county files.',
  geography: 'Burke County, Georgia (FIPS 13-033); county context only until city/county permit records are integrated.',
  period: '2026-04',
  status: 'No-key public seed ready',
  observedShape: {
    directory: 'County ASCII files expose monthly current-period (*c.txt) and year-to-date (*y.txt) rows by state/county FIPS.',
    headers: 'Survey Date, state FIPS, county FIPS, county name, building/unit/value columns by structure type and reported/revised units.',
    countyRow: 'State 13 / County 033 / Burke County row located in co2604c.txt and co2604y.txt.'
  },
  currentMonth: {
    date: '202604',
    oneUnitBuildings: 5,
    oneUnitUnits: 5,
    oneUnitValue: 1250682,
    fivePlusBuildings: 1,
    fivePlusUnits: 7,
    fivePlusValue: 1640547,
    totalBuildings: 6,
    totalUnits: 12,
    totalValue: 2891229
  },
  yearToDate: {
    date: '202604',
    oneUnitBuildings: 17,
    oneUnitUnits: 17,
    oneUnitValue: 4825231,
    fivePlusBuildings: 1,
    fivePlusUnits: 7,
    fivePlusValue: 1640547,
    totalBuildings: 18,
    totalUnits: 24,
    totalValue: 6465778
  },
  caveat: 'This is a federal county-level residential building-permit survey seed, not Waynesboro city permit history, not commercial permits, not a project approval list, and not parcel/development status. Use only as county housing-construction context until city permit/license aggregates are obtained from official local routes.',
  integrationUses: [
    'Replace generic development-permit placeholders with a source-labeled county residential construction context card.',
    'Cross-check city Building Permits / Open Records routes before promoting any Waynesboro-specific permit KPI.',
    'Create a lightweight parser for the latest Census BPS county files and cache only FIPS/date/structure-type totals with retrieval dates.'
  ],
  nextActions: [
    'Build a refresh script that selects the newest coYYMMc/coYYMMy pair from the public Census directory.',
    'Compare Burke County BPS county totals to city permit aggregates once a local records route or report is available.',
    'Keep the economic-development pipeline synthetic until permit rows are tied to local documents or official aggregate counts.'
  ]
};
