export const incomeDistributionSeed = {
  name: 'Census Reporter ACS household income distribution',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B19001&geo_ids=16000US1380984,05000US13033,04000US13',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  table: 'B19001',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro city, Georgia (16000US1380984), with Burke County / Georgia comparison rows available from the same endpoint',
  retrievedAt: '2026-05-31T18:10:00.000Z',
  accessMethod: 'Public no-key Census Reporter API request with a Waynesboro OS User-Agent; cached as a small normalized seed.',
  totals: {
    households: 2204,
    householdMoe: 243
  },
  brackets: [
    {
      id: 'under-25k',
      label: 'Under $25K',
      estimate: 800,
      moe: 272,
      share: 0.363,
      displayShare: '36.3%',
      planningUse: 'Economic-mobility / grant-readiness context'
    },
    {
      id: '25k-49k',
      label: '$25K–$49K',
      estimate: 511,
      moe: 223,
      share: 0.232,
      displayShare: '23.2%',
      planningUse: 'Cost-burden and workforce-support context'
    },
    {
      id: '50k-99k',
      label: '$50K–$99K',
      estimate: 647,
      moe: 259,
      share: 0.294,
      displayShare: '29.4%',
      planningUse: 'Middle-income household base'
    },
    {
      id: '100k-149k',
      label: '$100K–$149K',
      estimate: 189,
      moe: 123,
      share: 0.086,
      displayShare: '8.6%',
      planningUse: 'Higher-income retention / housing demand context'
    },
    {
      id: '150k-plus',
      label: '$150K+',
      estimate: 57,
      moe: 67,
      share: 0.026,
      displayShare: '2.6%',
      planningUse: 'Small high-income sample; high MOE caution'
    }
  ],
  rollups: [
    {
      id: 'under-50k',
      label: 'Under $50K',
      estimate: 1311,
      moe: 352,
      share: 0.595,
      displayShare: '59.5%',
      caveat: 'Derived from ACS B19001 brackets; margin of error approximated by root-sum-square of component MOEs.'
    },
    {
      id: '100k-plus',
      label: '$100K+',
      estimate: 246,
      moe: 140,
      share: 0.112,
      displayShare: '11.2%',
      caveat: 'Derived from ACS B19001 brackets; use as broad survey context only.'
    }
  ],
  nextActions: [
    'Cross-check B19001 income brackets against Data Commons median-income baseline before presentation use.',
    'Pair income distribution with ACS housing-cost, vehicle-access, food-access, and workforce data before any Council affordability recommendation.',
    'Keep margins of error visible; do not treat bracket estimates as tax records, payroll data, or household-level data.'
  ],
  caveat: 'ACS B19001 is household survey context only: not tax records, individual income, payroll, poverty eligibility, benefit enrollment, local revenue, or municipal operating telemetry.'
};
