export const foodAccessSeed = {
  sourceName: 'USDA ERS Food Access Research Atlas',
  url: 'https://www.ers.usda.gov/data-products/food-access-research-atlas/',
  downloadPage: 'https://www.ers.usda.gov/data-products/food-access-research-atlas/download-the-data/',
  geography: 'Census tracts; filter to Burke County / Waynesboro-area tracts only after downloading and documenting the vintage',
  retrievedAt: '2026-05-31T15:24:57Z',
  status: 'Source route indexed; extract pending',
  cadence: 'Atlas dataset vintage is publication-based; current public download route advertises 2019 data plus archived 2015/2010/2006 files.',
  caveat: 'This is a food-access source route only. Do not display Waynesboro food-desert, grocery-access, nutrition, poverty, or grant-eligibility claims until tract rows are extracted from the USDA file, vintage is recorded, and tract-to-city geography is reviewed.',
  observedDownloads: [
    {
      label: '2019 Food Access Research Atlas data download',
      format: 'XLSX',
      size: '81.83 MB',
      url: 'https://www.ers.usda.gov/media/5626/food-access-research-atlas-data-download-2019.xlsx?v=60613',
      integrationUse: 'Primary tabular route for tract-level low-income / low-access indicators after low-volume manual download and schema review.'
    },
    {
      label: '2019 Food Access Research Atlas data download',
      format: 'ZIP',
      size: '8.65 MB',
      url: 'https://www.ers.usda.gov/media/5627/food-access-research-atlas-data-download-2019.zip?v=71003',
      integrationUse: 'Smaller packaged route to inspect data files before building a normalized Burke County extractor.'
    },
    {
      label: 'State-level estimates of low income and low access populations',
      format: 'USDA ERS page',
      size: 'Reference',
      url: 'https://www.ers.usda.gov/data-products/food-access-research-atlas/state-level-estimates-of-low-income-and-low-access-populations',
      integrationUse: 'Context route for statewide comparison language; not a substitute for tract-level local extraction.'
    }
  ],
  nextActions: [
    'Download the smaller 2019 ZIP manually/low-volume and inspect schema before automating any parser.',
    'Filter only Georgia / Burke County tract rows, then crosswalk tracts that intersect Waynesboro before city-facing cards appear.',
    'Show USDA vintage, tract geography, and methodology notes beside any future food-access or grant-readiness metric.'
  ]
};
