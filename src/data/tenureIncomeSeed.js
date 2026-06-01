export const tenureIncomeSeed = {
  sourceName: 'Census Reporter ACS median household income by tenure table',
  table: 'B25119',
  title: 'Median Household Income in the Past 12 Months (In 2024 Inflation-adjusted Dollars) by Tenure',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25119&geo_ids=16000US1380984,05000US13033,04000US13',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  retrievedAt: '2026-06-01T00:00:00Z',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  geography: 'Waynesboro city, Burke County, Georgia comparison rows',
  universe: 'Occupied housing units by tenure; median household income in 2024 inflation-adjusted dollars',
  metrics: [
    {
      id: 'total-median-income',
      label: 'All occupied households',
      estimate: 41620,
      moe: 9969,
      displayValue: '$41.6K',
      field: 'B25119001',
      planningUse: 'Affordability baseline before mixing income, rent, ownership, utility-rate, and tax records.'
    },
    {
      id: 'owner-median-income',
      label: 'Owner-occupied households',
      estimate: 62530,
      moe: 17639,
      displayValue: '$62.5K',
      field: 'B25119002',
      planningUse: 'Owner affordability / rehab planning context; not mortgage-servicing or tax-record evidence.'
    },
    {
      id: 'renter-median-income',
      label: 'Renter-occupied households',
      estimate: 35038,
      moe: 27352,
      displayValue: '$35.0K',
      field: 'B25119003',
      planningUse: 'Renter affordability context to pair with rent, cost-burden, LIHTC, utility-rate, and service-location sources.'
    }
  ],
  derived: {
    ownerRenterGap: 27492,
    displayOwnerRenterGap: '$27.5K',
    renterIncomeAsOwnerShare: 56.0,
    displayRenterIncomeAsOwnerShare: '56.0%'
  },
  comparison: [
    {
      geography: 'Waynesboro city',
      totalMedian: '$41.6K',
      ownerMedian: '$62.5K',
      renterMedian: '$35.0K',
      ownerRenterGap: '$27.5K'
    },
    {
      geography: 'Burke County',
      totalMedian: '$53.0K',
      ownerMedian: '$65.1K',
      renterMedian: '$30.8K',
      ownerRenterGap: '$34.4K'
    },
    {
      geography: 'Georgia',
      totalMedian: '$77.4K',
      ownerMedian: '$96.4K',
      renterMedian: '$49.8K',
      ownerRenterGap: '$46.5K'
    }
  ],
  caveat: 'ACS B25119 is survey planning context only. It is not payroll, tax-return data, rent-roll data, mortgage-servicing records, household eligibility data, local revenue, utility hardship records, or municipal telemetry.',
  nextSourceNeeds: [
    'Pair with B25064 median rent, B25070 renter cost burden, B25091 owner cost burden, B25088 owner costs, utility-rate schedules, qPublic/tax digest, LIHTC/DCA records, and local program data before affordability recommendations.',
    'Keep margins of error visible; the renter median-income MOE is large enough that public narrative should stay cautious.',
    'Do not use tenure-income gaps as proof of displacement, eligibility, hardship, or housing-quality conditions without source-labeled local records.'
  ]
};
