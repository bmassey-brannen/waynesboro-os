export const housingCostBurdenSeed = {
  sourceName: 'Census Reporter ACS housing cost burden tables',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25070,B25091&geo_ids=16000US1380984,05000US13033,04000US13',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  release: {
    id: 'latest',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  retrievedAt: '2026-05-31T19:40:00Z',
  geography: {
    city: 'Waynesboro, GA',
    county: 'Burke County, GA',
    state: 'Georgia'
  },
  tables: [
    {
      id: 'B25070',
      title: 'Gross Rent as a Percentage of Household Income in the Past 12 Months',
      universe: 'Renter-occupied housing units'
    },
    {
      id: 'B25091',
      title: 'Mortgage Status by Selected Monthly Owner Costs as a Percentage of Household Income in the Past 12 Months',
      universe: 'Owner-occupied housing units'
    }
  ],
  metrics: [
    {
      id: 'renter-cost-burden',
      label: 'Renter households ≥30%',
      universe: 'Renter-occupied housing units',
      estimate: 689,
      denominator: 1556,
      moe: 253,
      displayValue: '689',
      displayShare: '44.3%',
      comparison: {
        countyShare: '41.2%',
        stateShare: '48.4%'
      },
      sourceTable: 'B25070',
      notes: 'Sum of ACS B25070 rows 30.0-34.9%, 35.0-39.9%, 40.0-49.9%, and 50.0% or more.'
    },
    {
      id: 'owner-cost-burden',
      label: 'Owner households ≥30%',
      universe: 'Owner-occupied housing units',
      estimate: 125,
      denominator: 648,
      moe: 97,
      displayValue: '125',
      displayShare: '19.3%',
      comparison: {
        countyShare: '18.8%',
        stateShare: '20.7%'
      },
      sourceTable: 'B25091',
      notes: 'Sum of ACS B25091 owner monthly-cost rows at 30%+ across mortgage and no-mortgage owner-occupied units.'
    },
    {
      id: 'not-computed-renter',
      label: 'Rent not computed',
      universe: 'Renter-occupied housing units',
      estimate: 115,
      denominator: 1556,
      moe: 120,
      displayValue: '115',
      displayShare: '7.4%',
      comparison: {
        countyShare: '13.0%',
        stateShare: '7.7%'
      },
      sourceTable: 'B25070',
      notes: 'ACS rows where gross rent as a percentage of household income was not computed.'
    }
  ],
  comparisonRows: [
    {
      geography: 'Waynesboro city',
      renterCostBurdenShare: '44.3%',
      ownerCostBurdenShare: '19.3%',
      renterHouseholds: 1556,
      ownerHouseholds: 648
    },
    {
      geography: 'Burke County',
      renterCostBurdenShare: '41.2%',
      ownerCostBurdenShare: '18.8%',
      renterHouseholds: 2755,
      ownerHouseholds: 6429
    },
    {
      geography: 'Georgia',
      renterCostBurdenShare: '48.4%',
      ownerCostBurdenShare: '20.7%',
      renterHouseholds: 1398009,
      ownerHouseholds: 2676357
    }
  ],
  caveat: 'ACS housing-cost-burden estimates are survey context only. They are not rent-roll records, household eligibility findings, eviction filings, utility hardship records, parcel condition, official affordability program enrollment, or municipal telemetry.'
};
