export const workforceEducationSeed = {
  sourceName: 'Census Reporter ACS workforce + educational attainment tables',
  retrievedAt: '2026-05-31T15:51:54+00:00',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: {
    geoid: '16000US1380984',
    name: 'Waynesboro, GA'
  },
  queryUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B15003,B23025&geo_ids=16000US1380984',
  tables: [
    {
      table: 'B15003',
      label: 'Educational Attainment for the Population 25 Years and Over',
      dataType: 'ACS estimates and margins of error for attainment categories',
      integrationUse: 'Talent-pipeline context for economic-development briefs; not a school-system performance claim.'
    },
    {
      table: 'B23025',
      label: 'Employment Status for the Population 16 Years and Over',
      dataType: 'ACS labor-force, employed, unemployed, and not-in-labor-force estimates',
      integrationUse: 'City-level survey context to compare against BLS county LAUS; not a replacement for official monthly unemployment.'
    }
  ],
  metrics: [
    {
      id: 'population-25-plus',
      label: 'Population 25+',
      table: 'B15003',
      value: 3468,
      displayValue: '3,468',
      moe: 312,
      note: 'Educational-attainment universe.'
    },
    {
      id: 'high-school-or-higher',
      label: 'High school or higher',
      table: 'B15003',
      value: 2890,
      displayValue: '2,890',
      percent: 83.3,
      moeNote: 'Derived from multiple ACS cells; component MOEs must be propagated before formal use.',
      note: 'Adults 25+ at high-school graduate/equivalency or above.'
    },
    {
      id: 'some-college-or-associate',
      label: 'Some college / associate',
      table: 'B15003',
      value: 1218,
      displayValue: '1,218',
      percent: 35.1,
      moeNote: 'Derived from multiple ACS cells; component MOEs must be propagated before formal use.',
      note: 'Some college no degree, associate degree, or related postsecondary categories.'
    },
    {
      id: 'bachelor-or-higher',
      label: 'Bachelor\'s or higher',
      table: 'B15003',
      value: 412,
      displayValue: '412',
      percent: 11.9,
      moeNote: 'Derived from multiple ACS cells; component MOEs must be propagated before formal use.',
      note: 'Bachelor, master, professional, or doctorate degree.'
    },
    {
      id: 'labor-force',
      label: 'Labor force',
      table: 'B23025',
      value: 2749,
      displayValue: '2,749',
      percent: 62.4,
      moe: 307,
      note: 'Share of ACS population 16+ in the labor force.'
    },
    {
      id: 'employed',
      label: 'Employed',
      table: 'B23025',
      value: 2580,
      displayValue: '2,580',
      percent: 58.6,
      moe: 342,
      note: 'Employment-to-population context for population 16+.'
    },
    {
      id: 'acs-unemployed',
      label: 'ACS unemployed',
      table: 'B23025',
      value: 169,
      displayValue: '169',
      percent: 6.1,
      moe: 161,
      note: 'Survey-based city context; compare to BLS LAUS county series before public unemployment claims.'
    }
  ],
  nextActions: [
    'Cross-check ACS labor-force ratios against BLS LAUS county monthly series and Data Commons before any unemployment card changes.',
    'Pair attainment context with Georgia Insights / CTAE source routes before making workforce-training or school-performance recommendations.',
    'Keep derived attainment percentages labeled as ACS estimates until component margins of error are calculated and shown.'
  ],
  caveat: 'ACS B15003/B23025 is survey context for Waynesboro city. It is not employer payroll, school-district performance, job postings, live unemployment, business-license data, or a municipal operating metric. Use it to frame workforce questions, not to claim program outcomes.'
};
