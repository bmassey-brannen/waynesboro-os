export const schoolEnrollmentSeed = {
  sourceName: 'Census Reporter ACS B14001 school enrollment table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B14001&geo_ids=16000US1380984,05000US13033,04000US13',
  geography: 'Waynesboro city, Georgia (16000US1380984), with Burke County and Georgia comparison rows',
  retrievedAt: '2026-06-01T00:00:00Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  status: 'Public API seed ready',
  table: 'B14001',
  universe: 'Population 3 years and over',
  totalPopulation3Plus: {
    value: 5427,
    displayValue: '5,427',
    moe: 144,
    displayMoe: '±144'
  },
  enrolled: {
    value: 1260,
    displayValue: '1,260',
    moe: 269,
    displayMoe: '±269',
    share: 0.2322,
    displayShare: '23.2%'
  },
  levels: [
    {
      id: 'preschool',
      label: 'Nursery / preschool',
      estimate: 186,
      displayValue: '186',
      moe: 114,
      displayMoe: '±114',
      enrolledShare: 0.1476,
      displayShare: '14.8%',
      planningUse: 'Early-childhood, childcare, family outreach, and grant-readiness context.'
    },
    {
      id: 'kindergarten',
      label: 'Kindergarten',
      estimate: 157,
      displayValue: '157',
      moe: 162,
      displayMoe: '±162',
      enrolledShare: 0.1246,
      displayShare: '12.5%',
      planningUse: 'School-readiness, library/recreation programming, and safe-route questions.'
    },
    {
      id: 'grades-1-4',
      label: 'Grades 1–4',
      estimate: 152,
      displayValue: '152',
      moe: 96,
      displayMoe: '±96',
      enrolledShare: 0.1206,
      displayShare: '12.1%',
      planningUse: 'Elementary-age service and family mobility context.'
    },
    {
      id: 'grades-5-8',
      label: 'Grades 5–8',
      estimate: 334,
      displayValue: '334',
      moe: 205,
      displayMoe: '±205',
      enrolledShare: 0.2651,
      displayShare: '26.5%',
      planningUse: 'Middle-school recreation, mentoring, safety, and after-school context.'
    },
    {
      id: 'grades-9-12',
      label: 'Grades 9–12',
      estimate: 299,
      displayValue: '299',
      moe: 188,
      displayMoe: '±188',
      enrolledShare: 0.2373,
      displayShare: '23.7%',
      planningUse: 'CTAE, youth employment, internships, transit, and civic-participation questions.'
    },
    {
      id: 'college-undergrad',
      label: 'College undergraduate',
      estimate: 132,
      displayValue: '132',
      moe: 80,
      displayMoe: '±80',
      enrolledShare: 0.1048,
      displayShare: '10.5%',
      planningUse: 'Talent-retention and workforce-pipeline context only after school/workforce sources are paired.'
    },
    {
      id: 'graduate-professional',
      label: 'Graduate / professional',
      estimate: 0,
      displayValue: '0',
      moe: 20,
      displayMoe: '±20',
      enrolledShare: 0,
      displayShare: '0.0%',
      planningUse: 'Small-estimate caveat: a zero ACS estimate with nonzero MOE is not proof no residents are enrolled.'
    }
  ],
  comparison: [
    {
      geography: 'Waynesboro city',
      universe: 5427,
      enrolled: 1260,
      enrolledMoe: 269,
      enrolledShare: '23.2%'
    },
    {
      geography: 'Burke County',
      universe: 23702,
      enrolled: 6190,
      enrolledMoe: 446,
      enrolledShare: '26.1%'
    },
    {
      geography: 'Georgia',
      universe: 10569876,
      enrolled: 2760030,
      enrolledMoe: 7878,
      enrolledShare: '26.1%'
    }
  ],
  caveat: 'ACS B14001 is survey planning context only. Do not present it as Burke County Public Schools enrollment, student-level records, attendance, graduation, CTAE participation, childcare slots, school-performance data, or municipal department workload.',
  nextActions: [
    'Pair B14001 with Georgia Insights / GaDOE aggregate downloads and Burke County Public Schools public reports before any school or workforce-pipeline recommendation.',
    'Propagate derived MOE before comparing small grade bands publicly.',
    'Keep school-district responsibilities, city services, and economic-development workforce questions explicitly separated in Council briefs.'
  ]
};
