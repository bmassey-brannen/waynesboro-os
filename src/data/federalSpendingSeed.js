export const federalSpendingSeed = {
  sourceName: 'USAspending.gov API · Spending Over Time',
  url: 'https://api.usaspending.gov/api/v2/search/spending_over_time/',
  geography: 'Place of performance: Burke County, Georgia (county FIPS 13033)',
  retrievedAt: '2026-05-31T08:59:02.000Z',
  fiscalYear: 2025,
  query: {
    endpoint: 'https://api.usaspending.gov/api/v2/search/spending_over_time/',
    method: 'POST',
    payloadShape: {
      filters: {
        time_period: [{ start_date: '2024-10-01', end_date: '2025-09-30' }],
        place_of_performance_locations: [{ country: 'USA', state: 'GA', county: '033' }]
      },
      subawards: false,
      group: 'quarter'
    }
  },
  totals: {
    totalObligations: 184870667.86,
    grantObligations: 9167990.15,
    contractObligations: 15554810.83,
    directObligations: 153346239.87,
    loanObligations: 3173428.93,
    otherObligations: 3628198.08
  },
  quarters: [
    {
      label: 'FY2025 Q1',
      total: 43150891.70,
      grants: 1988718.00,
      contracts: 3454746.94,
      direct: 36566300.93,
      loans: 699278.73,
      other: 441847.10
    },
    {
      label: 'FY2025 Q2',
      total: 40028786.14,
      grants: 1086109.00,
      contracts: 2404494.60,
      direct: 35640992.61,
      loans: 909316.13,
      other: -12126.20
    },
    {
      label: 'FY2025 Q3',
      total: 51057003.16,
      grants: 5489383.36,
      contracts: 4937818.27,
      direct: 38663707.28,
      loans: 490332.55,
      other: 1475761.70
    },
    {
      label: 'FY2025 Q4',
      total: 50633986.86,
      grants: 603779.79,
      contracts: 4757751.02,
      direct: 42475239.05,
      loans: 1074501.52,
      other: 1722715.48
    }
  ],
  nextActions: [
    'Separate direct payments from city/county grants before using this in a public finance KPI.',
    'Run award-level searches by award-type group to identify grant recipients, awarding agencies, and project descriptions.',
    'Cross-check any local-government award against city/county budgets, agenda packets, or grant documents before citation.'
  ],
  caveat: 'This is federal award obligation context by place of performance for Burke County, not City of Waynesboro budget revenue, local sales tax, or proof of municipal receipt. Use it as a grant/funding source route until award-level records are reviewed.'
};
