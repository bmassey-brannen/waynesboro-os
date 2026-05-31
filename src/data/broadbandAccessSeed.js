export const broadbandAccessSeed = {
  sourceName: 'FCC Broadband Data Collection / National Broadband Map',
  sourceUrl: 'https://broadbandmap.fcc.gov/data-download',
  nationwideDataUrl: 'https://broadbandmap.fcc.gov/data-download/nationwide-data',
  fccProgramUrl: 'https://www.fcc.gov/BroadbandData',
  geography: 'Waynesboro / Burke County, Georgia; source supports location, census-block, county, and provider availability workflows after filters/exports are confirmed',
  accessMethod: 'Public FCC National Broadband Map and BDC data-download surfaces; use low-volume manual export/API review first, then cache only permitted aggregate broadband availability or fabric metadata.',
  cadence: 'FCC Broadband Data Collection availability data is published by filing cycle; exact local refresh cadence must be recorded with each exported vintage.',
  status: 'Source surface verified; export scope pending',
  retrievedAt: '2026-05-31T00:00:00Z',
  verification: 'Runtime reached FCC National Broadband Map data-download pages with HTTP 200. Help article was Cloudflare-protected from this environment, so documentation review remains manual.',
  caveat: 'This seed is a digital-infrastructure source route only. It does not claim current Waynesboro broadband coverage, provider service, subscription rates, affordability, outages, or digital-equity status.',
  sourceRoutes: [
    {
      label: 'Data Download Hub',
      url: 'https://broadbandmap.fcc.gov/data-download',
      dataType: 'National Broadband Map public download navigation and availability-data entry point',
      integrationUse: 'Find the current filing-cycle data and permitted download workflow before building county/city coverage cards.'
    },
    {
      label: 'Nationwide Data',
      url: 'https://broadbandmap.fcc.gov/data-download/nationwide-data',
      dataType: 'Nationwide availability / location-fabric download surface as exposed by the FCC map app',
      integrationUse: 'Scope whether county-level extracts or state-level files can be filtered to Burke County without scraping the map UI.'
    },
    {
      label: 'FCC BDC Program',
      url: 'https://www.fcc.gov/BroadbandData',
      dataType: 'Program documentation, challenge process, and official BDC context',
      integrationUse: 'Keep Council and operations copy aligned with FCC terminology before presenting broadband-access context.'
    }
  ],
  normalizedShape: [
    { field: 'vintage', meaning: 'FCC filing/data vintage used for any exported availability records', requiredBeforeClaim: true },
    { field: 'geography', meaning: 'County, census block, location fabric ID, or city-boundary method used for aggregation', requiredBeforeClaim: true },
    { field: 'technology', meaning: 'Fixed/wireless technology category where published', requiredBeforeClaim: true },
    { field: 'provider', meaning: 'Provider name only if public export terms permit display', requiredBeforeClaim: true },
    { field: 'availabilityMetric', meaning: 'Served/unserved/underserved/maximum advertised speed field with FCC definition attached', requiredBeforeClaim: true }
  ],
  nextSteps: [
    'Manual review of FCC data-download terms and current availability-data vintage.',
    'Identify the smallest permitted extract path for Burke County / Waynesboro without scraping the interactive map.',
    'If export is permitted, cache aggregate counts by technology/speed tier with vintage, geography, and FCC attribution before replacing any synthetic connectivity assumptions.'
  ]
};
