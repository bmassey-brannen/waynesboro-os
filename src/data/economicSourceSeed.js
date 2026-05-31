export const economicSourceSeed = {
  sourceName: 'U.S. Census County Business Patterns API',
  sourceUrl: 'https://api.census.gov/data/2022/cbp',
  docsUrl: 'https://www.census.gov/programs-surveys/cbp.html',
  geography: 'Burke County, Georgia (state 13 / county 033); city-level business license data still requires local source access',
  retrievedAt: '2026-05-31T02:10:23Z',
  accessMethod: 'Public Census API endpoint; this environment returned a Census Missing Key page, so scheduled ingestion should use a Census API key and cache normalized observations.',
  cadence: 'Annual County Business Patterns release',
  difficulty: 'Medium',
  status: 'Connector scoped',
  caveat: 'Use CBP for county establishment/payroll/employment context only. It does not replace City of Waynesboro business licenses, downtown occupancy, or active local permitting records.',
  queryTemplates: [
    {
      label: 'All industries baseline',
      naics: '00',
      url: 'https://api.census.gov/data/2022/cbp?get=NAME,ESTAB,EMP,PAYANN&for=county:033&in=state:13&NAICS2017=00',
      use: 'Countywide establishment, employment, and annual payroll baseline.'
    },
    {
      label: 'Retail trade',
      naics: '44-45',
      url: 'https://api.census.gov/data/2022/cbp?get=NAME,ESTAB,EMP,PAYANN&for=county:033&in=state:13&NAICS2017=44-45',
      use: 'Retail/downtown context once keyed API access is configured.'
    },
    {
      label: 'Accommodation + food services',
      naics: '72',
      url: 'https://api.census.gov/data/2022/cbp?get=NAME,ESTAB,EMP,PAYANN&for=county:033&in=state:13&NAICS2017=72',
      use: 'Restaurant/hospitality context for downtown and corridor reads.'
    },
    {
      label: 'Construction',
      naics: '23',
      url: 'https://api.census.gov/data/2022/cbp?get=NAME,ESTAB,EMP,PAYANN&for=county:033&in=state:13&NAICS2017=23',
      use: 'Construction-sector context to pair with permit and project lanes.'
    }
  ]
};
