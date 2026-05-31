export const lehdCommutingSeed = {
  sourceName: 'U.S. Census LEHD LODES data downloads',
  sourceUrl: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/',
  documentationUrl: 'https://lehd.ces.census.gov/data/lodes/LODES8/LODESTechDoc8.1.pdf',
  geography: 'Georgia statewide block-level files; filter to Waynesboro place / Burke County only after block-to-place crosswalk QA',
  retrievedAt: '2026-05-31T13:33:20Z',
  accessMethod: 'Public Census LEHD static CSV/GZIP downloads; low-volume HEAD checks only this run.',
  cadence: 'Annual LODES releases by vintage; file modified dates vary by table.',
  sourceRoutes: [
    {
      label: 'Workplace Area Characteristics',
      table: 'WAC',
      url: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/wac/ga_wac_S000_JT00_2022.csv.gz',
      observedStatus: 'HTTP 200',
      observedSize: '1.5 MB',
      lastModified: 'Thu, 03 Oct 2024 13:16:52 GMT',
      use: 'Jobs located in each block by worker age, earnings, industry, race, ethnicity, education, and sex.'
    },
    {
      label: 'Residence Area Characteristics',
      table: 'RAC',
      url: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/rac/ga_rac_S000_JT00_2022.csv.gz',
      observedStatus: 'HTTP 200',
      observedSize: '4.0 MB',
      lastModified: 'Tue, 02 Dec 2025 20:42:16 GMT',
      use: 'Workers living in each block by demographic and job attributes.'
    },
    {
      label: 'Origin-Destination main jobs',
      table: 'OD',
      url: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/od/ga_od_main_JT00_2022.csv.gz',
      observedStatus: 'HTTP 200',
      observedSize: '23.4 MB',
      lastModified: 'Thu, 03 Oct 2024 13:15:54 GMT',
      use: 'Home-work block pairs for commute-flow context after aggregation rules are defined.'
    },
    {
      label: 'Georgia block crosswalk',
      table: 'XWALK',
      url: 'https://lehd.ces.census.gov/data/lodes/LODES8/ga/ga_xwalk.csv.gz',
      observedStatus: 'HTTP 200',
      observedSize: '4.1 MB',
      lastModified: 'Wed, 03 Dec 2025 12:22:50 GMT',
      use: 'Bridge Census blocks to county/place/tract geography before aggregating Waynesboro or Burke metrics.'
    }
  ],
  normalizedShape: [
    'vintage_year',
    'source_table',
    'geography_level',
    'block_geoid',
    'place_geoid',
    'county_geoid',
    'jobs_total',
    'home_workers_total',
    'inflow_jobs',
    'outflow_jobs',
    'sector_bucket',
    'retrieved_at',
    'source_url'
  ],
  nextActions: [
    'Download the Georgia crosswalk first and verify block-to-place coverage for GEOID 1380984 before any city job count appears in KPI cards.',
    'Aggregate WAC/RAC/OD only into public, non-identifying counts; keep block-level rows out of presentation panels unless explicitly needed for maps.',
    'Compare LEHD job counts against Census CBP county context and local business-license records before The Council cites workforce or commuter-flow conclusions.'
  ],
  caveat: 'LEHD/LODES is a public workforce/commuting source route, not a live employer list, payroll record, business license file, or official City of Waynesboro economic-development claim.'
};
