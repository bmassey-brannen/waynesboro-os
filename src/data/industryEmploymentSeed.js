export const industryEmploymentSeed = {
  sourceName: 'Census Reporter ACS industry employment table',
  retrievedAt: '2026-06-01T01:55:25+00:00',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: {
    geoid: '16000US1380984',
    name: 'Waynesboro, GA'
  },
  queryUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C24030&geo_ids=16000US1380984,05000US13033,04000US13',
  table: {
    id: 'C24030',
    title: 'Sex by Industry for the Civilian Employed Population 16 Years and Over',
    dataType: 'ACS industry estimates and margins of error for employed civilian workers by city/county/state geography',
    integrationUse: 'Workforce cluster context for economic-development targeting; not employer payroll, establishment counts, business-license records, or job postings.'
  },
  universe: {
    label: 'Civilian employed population 16+',
    estimate: 2580,
    displayValue: '2,580',
    moe: 342
  },
  sectors: [
    { id: 'education-health', label: 'Education / health care', estimate: 547, displayValue: '547', share: 21.2, moe: 216, comparison: { burkeCountyShare: 18.7, georgiaShare: 21.0 }, planningUse: 'Anchor workforce cluster; compare against school/health employers and service-demand context before recommendations.' },
    { id: 'retail', label: 'Retail trade', estimate: 499, displayValue: '499', share: 19.3, moe: 218, comparison: { burkeCountyShare: 9.0, georgiaShare: 11.3 }, planningUse: 'Downtown/main-street labor exposure context, not active business count or sales-tax evidence.' },
    { id: 'transport-utilities', label: 'Transportation / utilities', estimate: 341, displayValue: '341', share: 13.2, moe: 207, comparison: { burkeCountyShare: 11.3, georgiaShare: 7.3 }, planningUse: 'Corridor/logistics and utility workforce context; pair with LEHD and GDOT before corridor claims.' },
    { id: 'professional-admin', label: 'Professional / admin services', estimate: 327, displayValue: '327', share: 12.7, moe: 182, comparison: { burkeCountyShare: 11.9, georgiaShare: 13.6 }, planningUse: 'Service-sector capacity context; not a firm roster or wage dataset.' },
    { id: 'manufacturing', label: 'Manufacturing', estimate: 295, displayValue: '295', share: 11.4, moe: 189, comparison: { burkeCountyShare: 13.2, georgiaShare: 10.1 }, planningUse: 'Industrial workforce context; pair with CBP/LEHD before manufacturing-base claims.' },
    { id: 'arts-food', label: 'Arts / lodging / food', estimate: 219, displayValue: '219', share: 8.5, moe: 177, comparison: { burkeCountyShare: 8.9, georgiaShare: 8.6 }, planningUse: 'Hospitality/event-readiness context; not restaurant count, occupancy, or tourism revenue.' },
    { id: 'construction', label: 'Construction', estimate: 145, displayValue: '145', share: 5.6, moe: 106, comparison: { burkeCountyShare: 9.7, georgiaShare: 7.0 }, planningUse: 'Construction labor context; pair with permit/BPS records before development-capacity claims.' }
  ],
  comparisonRows: [
    { geography: 'Waynesboro city', totalEmployed: 2580, leadingSector: 'Education / health care', leadingSectorShare: 21.2, secondSector: 'Retail trade', secondSectorShare: 19.3 },
    { geography: 'Burke County', totalEmployed: 10688, leadingSector: 'Education / health care', leadingSectorShare: 18.7, secondSector: 'Manufacturing', secondSectorShare: 13.2 },
    { geography: 'Georgia', totalEmployed: 5213857, leadingSector: 'Education / health care', leadingSectorShare: 21.0, secondSector: 'Professional / admin services', secondSectorShare: 13.6 }
  ],
  nextActions: [
    'Cross-check ACS industry shares against Census CBP and LEHD WAC before promoting cluster claims.',
    'Request or locate official business-license / employer-roster aggregates before naming local employers or establishments.',
    'Calculate proper derived MOE for sector rollups before formal publication beyond demo context.'
  ],
  caveat: 'ACS C24030 is survey workforce context for where Waynesboro residents/workers are employed by broad industry. It is not employer payroll, establishment counts, business-license data, job postings, wage data, tax revenue, or live economic-development telemetry.'
};
