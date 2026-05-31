export const salesTaxDistributionSeed = {
  sourceName: 'Georgia Department of Revenue Distributions Section',
  retrievedAt: '2026-05-31T00:00:00.000Z',
  geography: 'Georgia counties and cities; future parser should filter Burke County and City of Waynesboro rows only where the report includes them.',
  status: 'Source pages verified; row extraction pending',
  caveat: 'This is a public finance source route only. Do not display Waynesboro sales-tax revenue, distributions, commodities, or local-option tax shares until the specific Georgia DOR report rows are parsed, timestamped, and reconciled to the correct jurisdiction and tax type.',
  sources: [
    {
      label: 'Sales Tax Distribution Rates for Counties and Cities',
      url: 'https://dor.georgia.gov/local-government-services/distributions-section/sales-tax-distribution-rates-counties-and-cities',
      observedDownload: 'https://dor.georgia.gov/document/document/lgs-2024-sep-20-distribution-rates/download',
      cadence: 'Annual / as updated by DOR; page sitemap lastmod observed 2025-07-11',
      integrationUse: 'Finance lane source for county/city distribution-rate structure before any local revenue card is promoted.'
    },
    {
      label: 'Sales Tax Commodity Report',
      url: 'https://dor.georgia.gov/local-government-services/distributions-section/sales-tax-commodity-report',
      observedDownload: 'https://dor.georgia.gov/document/document-document/calendar-year-2025/download',
      cadence: 'Monthly/annual report page; page sitemap lastmod observed 2026-04-14',
      integrationUse: 'Economic context source for taxable-sales categories after county/jurisdiction filters are confirmed.'
    },
    {
      label: 'County and City Sales Tax ID Codes',
      url: 'https://dor.georgia.gov/local-government-services/distributions-section/county-and-city-sales-tax-id-codes',
      observedDownload: 'https://dor.georgia.gov/document/distributions/lgscountyandcitysalestaxidcodes2014pdf/download',
      cadence: 'Reference document; update cadence not guaranteed',
      integrationUse: 'Jurisdiction-code crosswalk needed before joining sales-tax reports to Waynesboro/Burke rows.'
    }
  ],
  nextSteps: [
    'Download the latest DOR distribution-rate file and identify Burke County / Waynesboro rows with retrieval timestamp.',
    'Confirm whether commodity reports are county-only, jurisdiction-level, or statewide summaries before using them in KPI cards.',
    'Create a finance connector that keeps tax type, jurisdiction code, period, and source-report URL attached to every value.'
  ]
};
