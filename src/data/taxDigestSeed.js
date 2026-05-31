export const taxDigestSeed = {
  sourceName: 'Georgia Department of Revenue Digest Compliance',
  sourceUrl: 'https://dor.georgia.gov/local-government-services/digest-compliance',
  retrievedAt: '2026-05-31T00:00:00Z',
  accessMethod: 'Public Georgia DOR pages and downloadable reports; low-volume source inventory only.',
  geography: 'Georgia counties and local governments; filter future extracts for Burke County / Waynesboro where report rows support it.',
  status: 'Source-index seed',
  caveat: 'This is a report-index and connector-shape seed. It does not yet extract Burke County millage, digest values, or city tax facts into KPI cards.',
  reportHubs: [
    {
      id: 'millage-rates',
      label: 'Property Tax Millage Rates',
      url: 'https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates',
      dataType: 'Annual Georgia county ad valorem tax digest millage-rate reports',
      latestObserved: '2025 Georgia County Ad Valorem Tax Digest Millage Rates',
      latestDownloadUrl: 'https://dor.georgia.gov/document/document/2025-georgia-county-ad-valorem-tax-digest-millage-ratespdf/download',
      integrationUse: 'County/city property-tax context, millage comparisons, and finance drilldowns after row-level verification.'
    },
    {
      id: 'digest-summaries',
      label: 'Digest Consolidated Summaries',
      url: 'https://dor.georgia.gov/local-government-services/digest-compliance/digest-consolidated-summaries',
      dataType: 'Annual digest summary workbook/downloads',
      latestObserved: '2025 Digest.xls',
      latestDownloadUrl: 'https://dor.georgia.gov/media/34621/download',
      integrationUse: 'Tax digest assessed-value baselines and county-level ad valorem trend context once Burke rows are parsed.'
    },
    {
      id: 'ad-valorem-summary',
      label: 'Summary of Ad Valorem Taxes Levied',
      url: 'https://dor.georgia.gov/local-government-services/digest-compliance/summary-ad-valorem-taxes-levied-georgia-counties',
      dataType: 'Annual statewide county ad valorem taxes levied reports',
      latestObserved: '2025 Summary of Ad Valorem Taxes Levied Report',
      latestDownloadUrl: 'https://dor.georgia.gov/document/document/2025-summary-ad-valorem-taxes-levied-reportpdf/download',
      integrationUse: 'Finance/source ledger bridge for tax levy context; not a replacement for city budgets or adopted millage documents.'
    }
  ]
};
