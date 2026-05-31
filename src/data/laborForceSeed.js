export const laborForceSeed = {
  sourceName: 'U.S. Bureau of Labor Statistics LAUS Public API',
  sourceUrl: 'https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN130330000000003?startyear=2025&endyear=2025',
  accessMethod: 'Public BLS API, no key required for low-volume single-series requests; use an API key for higher-volume scheduled pulls.',
  geography: 'Burke County, Georgia (LAUS county area CN13033), not a Waynesboro city labor-force series.',
  retrievedAt: '2026-05-31T07:25:34Z',
  latestPeriod: 'December 2025',
  revisionNote: 'Latest returned rows were marked by BLS as subject to revision on May 19, 2026.',
  caveat: 'Use this as county workforce context for economic-development briefs. Do not present it as a City of Waynesboro unemployment rate or as live local payroll data.',
  series: [
    {
      id: 'LAUCN130330000000003',
      label: 'Unemployment rate',
      value: 4.2,
      displayValue: '4.2%',
      unit: 'percent',
      latestPeriod: 'December 2025'
    },
    {
      id: 'LAUCN130330000000006',
      label: 'Civilian labor force',
      value: 10600,
      displayValue: '10,600',
      unit: 'persons',
      latestPeriod: 'December 2025'
    },
    {
      id: 'LAUCN130330000000005',
      label: 'Employed persons',
      value: 10156,
      displayValue: '10,156',
      unit: 'persons',
      latestPeriod: 'December 2025'
    },
    {
      id: 'LAUCN130330000000004',
      label: 'Unemployed persons',
      value: 444,
      displayValue: '444',
      unit: 'persons',
      latestPeriod: 'December 2025'
    }
  ],
  queryTemplates: [
    {
      label: 'Unemployment rate series',
      url: 'https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN130330000000003?startyear=2025&endyear=2025'
    },
    {
      label: 'Labor force series',
      url: 'https://api.bls.gov/publicAPI/v2/timeseries/data/LAUCN130330000000006?startyear=2025&endyear=2025'
    }
  ]
};
