export const healthEquitySeed = {
  sourceName: 'CDC PLACES: Local Data for Better Health, Census Tract Data, 2025 release',
  sourceUrl: 'https://data.cdc.gov/resource/cwsq-ngmh.json',
  metadataUrl: 'https://data.cdc.gov/api/views/cwsq-ngmh',
  referenceUrl: 'https://www.cdc.gov/places/measure-definitions/index.html',
  geography: 'Burke County census tracts including Waynesboro-area tracts; not a citywide Waynesboro aggregate',
  retrievedAt: '2026-05-31T00:00:00Z',
  accessMethod: 'Public Socrata JSON API; low-volume filtered queries with attribution. Cache only aggregate tract/county rows, never individual health records.',
  observedShape: {
    datasetName: 'PLACES: Local Data for Better Health, Census Tract Data, 2025 release',
    rowsForBurkeCountyObserved: 280,
    sampleQuery: 'https://data.cdc.gov/resource/cwsq-ngmh.json?$limit=5&stateabbr=GA&countyname=Burke',
    countQuery: 'https://data.cdc.gov/resource/cwsq-ngmh.json?$select=count(*)&stateabbr=GA&countyname=Burke'
  },
  sampleRows: [
    {
      year: '2023',
      county: 'Burke',
      tract: '13033950500',
      category: 'Disability',
      measure: 'Cognitive disability among adults',
      value: '18.0%',
      populationContext: 'Total population 5,697; adult population 4,355',
      confidenceInterval: '15.7–20.1',
      note: 'Sample row from public API response; use as data-shape evidence only until a tract map and methodology note are added.'
    },
    {
      year: '2022',
      county: 'Burke',
      tract: '13033950200',
      category: 'Prevention',
      measure: 'Colorectal cancer screening among adults aged 45–75 years',
      value: '63.3%',
      populationContext: 'Census tract modeled estimate',
      confidenceInterval: '58.0–68.3 observed in API response prefix',
      note: 'Partial sample from API probe; refresh exact fields before display as an indicator card.'
    }
  ],
  integrationUses: [
    'Quality-of-life and resilience context for Council briefs',
    'Census-tract drilldowns when paired with official boundary geometry',
    'Grant-writing and public-health partnership evidence after methodology review'
  ],
  caveat: 'CDC PLACES values are model-based public-health estimates. Do not present them as municipal operations telemetry, clinical records, or citywide Waynesboro claims until geography, tract coverage, year, confidence intervals, and methodology are visible.'
};
