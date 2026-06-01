export const qcewPayrollSeed = {
  sourceName: 'BLS Quarterly Census of Employment and Wages (QCEW) Area API',
  sourceUrl: 'https://data.bls.gov/cew/data/api/2024/a/area/13033.csv',
  documentationUrl: 'https://www.bls.gov/cew/about-data/downloadable-file-layouts/annual/naics-based-annual-layout.htm',
  retrievedAt: '2026-06-01T10:37:23Z',
  geography: 'Burke County, Georgia area FIPS 13033; county covered-employment/payroll context only, not City of Waynesboro employer records.',
  year: 2024,
  accessMethod: 'Public CSV API endpoint; low-volume annual area request cached as a normalized seed. Refresh annually or before presentation use.',
  status: 'Seed connector ready',
  totalCovered: {
    establishments: 476,
    employment: 7429,
    annualWages: 592170012,
    averageWeeklyWage: 1533,
    averageAnnualPay: 79708,
    employmentYoYChange: '-12.3%'
  },
  privateCovered: {
    establishments: 444,
    employment: 5865,
    annualWages: 511872393,
    averageWeeklyWage: 1678,
    averageAnnualPay: 87277,
    employmentYoYChange: '-15.5%'
  },
  disclosedPrivateSectors: [
    { code: '42', label: 'Wholesale trade', establishments: 28, employment: 491, averageWeeklyWage: 1180, averageAnnualPay: 61359, employmentYoYChange: '2.1%' },
    { code: '54', label: 'Professional / technical services', establishments: 32, employment: 225, averageWeeklyWage: 2653, averageAnnualPay: 137960, employmentYoYChange: '-31.4%' },
    { code: '23', label: 'Construction', establishments: 46, employment: 215, averageWeeklyWage: 1483, averageAnnualPay: 77092, employmentYoYChange: '-83.2%' },
    { code: '52', label: 'Finance and insurance', establishments: 24, employment: 122, averageWeeklyWage: 949, averageAnnualPay: 49324, employmentYoYChange: '0.0%' },
    { code: '81', label: 'Other services', establishments: 22, employment: 100, averageWeeklyWage: 478, averageAnnualPay: 24879, employmentYoYChange: '13.6%' }
  ],
  normalizedShape: [
    'area_fips',
    'own_code',
    'industry_code',
    'annual_avg_estabs',
    'annual_avg_emplvl',
    'total_annual_wages',
    'annual_avg_wkly_wage',
    'avg_annual_pay',
    'oty_annual_avg_emplvl_pct_chg'
  ],
  nextActions: [
    'Join BLS QCEW area rows to NAICS titles and disclosure flags before any full sector ranking is shown.',
    'Use QCEW as Burke County payroll context only; pair with city business licenses, DCA project records, and employer/source documents before Waynesboro-specific claims.',
    'Add prior-year annual pulls after the first parser so The Council can distinguish revisions, nondisclosure, and real local job changes.'
  ],
  caveat: 'QCEW is a covered-employment and wage source for Burke County. Some sector rows are suppressed or not displayed because of disclosure rules, and the seed does not identify individual employers, city jobs, business licenses, vacancies, or project impacts.'
};
