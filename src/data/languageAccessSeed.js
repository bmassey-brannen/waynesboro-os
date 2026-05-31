export const languageAccessSeed = {
  sourceName: 'Census Reporter ACS language spoken at home table',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=C16001&geo_ids=16000US1380984,05000US13033,04000US13',
  sourceTable: 'C16001 · Language Spoken at Home for the Population 5 Years and Over',
  release: 'ACS 2024 5-year',
  releaseYears: '2020-2024',
  retrievedAt: '2026-05-31',
  geography: {
    city: 'Waynesboro, GA · 16000US1380984',
    county: 'Burke County, GA · 05000US13033',
    state: 'Georgia · 04000US13'
  },
  posture: 'ACS survey planning context only: not school enrollment, translation-demand proof, immigration status, household-level language records, emergency communications performance, or live municipal service telemetry.',
  metrics: [
    {
      id: 'population-5-plus',
      label: 'Population age 5+ in table universe',
      estimate: 5227,
      moe: 153,
      displayValue: '5,227',
      displayMoe: '±153',
      note: 'ACS C16001 universe for Waynesboro city.'
    },
    {
      id: 'english-only',
      label: 'Speak only English at home',
      estimate: 4848,
      moe: 300,
      share: 0.9275,
      displayValue: '4,848',
      displayShare: '92.7%',
      displayMoe: '±300',
      note: 'ACS C16001002 estimate for Waynesboro city.'
    },
    {
      id: 'language-other-than-english',
      label: 'Speak a language other than English at home',
      estimate: 379,
      moe: null,
      share: 0.0725,
      displayValue: '379',
      displayShare: '7.3%',
      displayMoe: 'Derived MOE pending',
      note: 'Derived as total age 5+ minus English-only. Calculate covariance-aware MOE before public claim promotion.'
    },
    {
      id: 'spanish',
      label: 'Spanish spoken at home',
      estimate: 319,
      moe: 202,
      share: 0.0610,
      displayValue: '319',
      displayShare: '6.1%',
      displayMoe: '±202',
      note: 'ACS C16001003 estimate for Waynesboro city.'
    },
    {
      id: 'english-less-than-very-well',
      label: 'Speak English less than very well',
      estimate: 240,
      moe: null,
      share: 0.0459,
      displayValue: '240',
      displayShare: '4.6%',
      displayMoe: 'Derived MOE pending',
      note: 'Sum of less-than-very-well cells across language groups; derived MOE requires covariance/replicate review.'
    }
  ],
  comparison: [
    { geography: 'Waynesboro city', nonEnglishShare: '7.3%', lessThanVeryWellShare: '4.6%', nonEnglishEstimate: 379, lessThanVeryWellEstimate: 240, population5Plus: 5227 },
    { geography: 'Burke County', nonEnglishShare: '3.1%', lessThanVeryWellShare: '1.2%', nonEnglishEstimate: 702, lessThanVeryWellEstimate: 276, population5Plus: 23001 },
    { geography: 'Georgia', nonEnglishShare: '15.5%', lessThanVeryWellShare: '5.8%', nonEnglishEstimate: 1592544, lessThanVeryWellEstimate: 602706, population5Plus: 10304177 }
  ],
  caveat: 'Treat ACS C16001 as public-communication and service-planning context only. Do not present it as individual language need, school enrollment, immigration status, emergency alert performance, or proof of official translation demand.',
  nextActions: [
    'Calculate covariance-aware MOE for derived non-English and limited-English rollups before using in narrative claims.',
    'Pair with school district language-access resources, public meeting notices, emergency-alert channels, library/nonprofit services, and service-location maps before Council recommendations.',
    'Keep this context separate from public-safety, school, health, or case-management workloads unless those aggregate sources are explicitly cited.'
  ]
};
