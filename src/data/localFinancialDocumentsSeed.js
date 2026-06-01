export const localFinancialDocumentsSeed = {
  name: 'UGA CVIOG Local Government Financial Documents Online',
  provider: 'Carl Vinson Institute of Government / GeorgiaData TED Center',
  sourceUrl: 'https://ted.cviog.uga.edu/financial-documents/budget_docs_view?og_group_ref_target_id%5B%5D=727&field_fiscal_year_value%5Bmin%5D%5Byear%5D=2024&field_fiscal_year_value%5Bmax%5D%5Byear%5D=2026',
  landingUrl: 'https://ted.cviog.uga.edu/financial-documents/',
  entity: 'City: Waynesboro',
  entityNode: 'https://ted.cviog.uga.edu/financial-documents/node/727',
  geography: 'City of Waynesboro, Georgia',
  retrievedAt: '2026-06-01T00:00:00Z',
  accessMethod: 'Public no-login document portal; low-volume filtered GET query by entity node 727 and fiscal-year range. Cache document links and metadata only until PDF contents are manually reviewed.',
  status: 'Public document index seed ready',
  observedShape: {
    filteredEntityId: 727,
    rowsObserved: 4,
    fiscalYears: ['2024', '2025', '2026'],
    documentTypes: ['Budget Report', 'Financial Report']
  },
  documents: [
    {
      fiscalYear: '2026',
      type: 'Budget Report',
      filename: 'city-waynesboro-fy2026-budget-report.pdf',
      url: 'https://ted.cviog.uga.edu/financial-documents/sites/default/files//budgetdoc/budget-report/city-waynesboro-fy2026-budget-report.pdf',
      posture: 'Index only · PDF review pending'
    },
    {
      fiscalYear: '2025',
      type: 'Budget Report',
      filename: 'city-waynesboro-fy2025-budget-report.pdf',
      url: 'https://ted.cviog.uga.edu/financial-documents/sites/default/files//budgetdoc/budget-report/city-waynesboro-fy2025-budget-report.pdf',
      posture: 'Index only · PDF review pending'
    },
    {
      fiscalYear: '2024',
      type: 'Budget Report',
      filename: 'city-waynesboro-fy2024-budget-report.pdf',
      url: 'https://ted.cviog.uga.edu/financial-documents/sites/default/files//budgetdoc/budget-report/city-waynesboro-fy2024-budget-report.pdf',
      posture: 'Index only · PDF review pending'
    },
    {
      fiscalYear: '2024',
      type: 'Financial Report',
      filename: 'city-waynesboro-fy2024-financial-report.pdf',
      url: 'https://ted.cviog.uga.edu/financial-documents/sites/default/files//budgetdoc/financial-report/city-waynesboro-fy2024-financial-report.pdf',
      posture: 'Index only · PDF review pending'
    }
  ],
  nextActions: [
    'Open each PDF manually and record title page, adoption/audit date, fund names, and page citations before any dollar figure is displayed.',
    'Cross-check budget/financial-report figures against City of Waynesboro agenda packets and adopted-rate documents before promoting finance KPIs.',
    'Keep portal uploads separate from official city claims until the exact document, fiscal year, page, and retrieval timestamp are visible.'
  ],
  caveat: 'This seed proves a public document access path for Waynesboro budgets and financial reports. It does not parse, summarize, or claim any municipal revenue, spending, fund balance, audit finding, tax rate, or adopted policy figure yet.'
};
