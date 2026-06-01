export const housingMonthlyCostsSeed = {
  sourceName: 'Census Reporter ACS monthly housing-cost tables',
  sourceUrl: 'https://api.censusreporter.org/1.0/data/show/latest?table_ids=B25064,B25088&geo_ids=16000US1380984,05000US13033,04000US13',
  profileUrl: 'https://censusreporter.org/profiles/16000US1380984-waynesboro-ga/',
  release: {
    id: 'acs2024_5yr',
    name: 'ACS 2024 5-year',
    years: '2020-2024'
  },
  retrievedAt: '2026-06-01T04:58:08Z',
  geography: {
    city: 'Waynesboro, GA',
    county: 'Burke County, GA',
    state: 'Georgia'
  },
  tables: [
    {
      id: 'B25064',
      title: 'Median Gross Rent (Dollars)',
      universe: 'Renter-occupied housing units paying cash rent'
    },
    {
      id: 'B25088',
      title: 'Median Selected Monthly Owner Costs (Dollars) by Mortgage Status',
      universe: 'Owner-occupied housing units'
    }
  ],
  metrics: [
    {
      id: 'median-gross-rent',
      label: 'Median gross rent',
      table: 'B25064',
      universe: 'Renter-occupied housing units paying cash rent',
      estimate: 746,
      moe: 73,
      displayValue: '$746',
      comparison: {
        county: '$758',
        state: '$1,393'
      },
      notes: 'ACS B25064 median gross rent; survey estimate, not lease records, rent-roll data, or advertised-rent inventory.'
    },
    {
      id: 'median-owner-costs-total',
      label: 'Median owner costs',
      table: 'B25088',
      universe: 'Owner-occupied housing units',
      estimate: 846,
      moe: 482,
      displayValue: '$846',
      comparison: {
        county: '$661',
        state: '$1,293'
      },
      notes: 'ACS B25088 total owner monthly costs; Waynesboro MOE is large, so use as planning context only.'
    },
    {
      id: 'median-owner-costs-mortgage',
      label: 'Owner costs with mortgage',
      table: 'B25088',
      universe: 'Owner-occupied housing units with a mortgage',
      estimate: 1379,
      moe: 99,
      displayValue: '$1,379',
      comparison: {
        county: '$1,394',
        state: '$1,783'
      },
      notes: 'ACS B25088 mortgage-owner selected monthly costs; not mortgage servicing records or tax escrow records.'
    },
    {
      id: 'median-owner-costs-no-mortgage',
      label: 'Owner costs without mortgage',
      table: 'B25088',
      universe: 'Owner-occupied housing units without a mortgage',
      estimate: 507,
      moe: 133,
      displayValue: '$507',
      comparison: {
        county: '$435',
        state: '$541'
      },
      notes: 'ACS B25088 no-mortgage-owner selected monthly costs; not a utility bill, tax bill, insurance-premium, or household-level record.'
    }
  ],
  comparisonRows: [
    {
      geography: 'Waynesboro city',
      medianGrossRent: '$746',
      ownerCostsTotal: '$846',
      ownerCostsWithMortgage: '$1,379',
      ownerCostsNoMortgage: '$507'
    },
    {
      geography: 'Burke County',
      medianGrossRent: '$758',
      ownerCostsTotal: '$661',
      ownerCostsWithMortgage: '$1,394',
      ownerCostsNoMortgage: '$435'
    },
    {
      geography: 'Georgia',
      medianGrossRent: '$1,393',
      ownerCostsTotal: '$1,293',
      ownerCostsWithMortgage: '$1,783',
      ownerCostsNoMortgage: '$541'
    }
  ],
  caveat: 'ACS B25064/B25088 monthly housing-cost estimates are survey planning context only. They are not rent rolls, lease records, mortgage-servicing records, property-tax bills, utility hardship records, household eligibility data, or municipal housing telemetry.',
  posture: 'Useful beside cost burden, tenure, home values, utility rates, LIHTC/DCA, and parcel/tax records to frame affordability questions before The Council makes any recommendation.',
  nextActions: [
    'Pair monthly cost medians with ACS cost-burden and income-distribution context before describing affordability pressure.',
    'Cross-check rent and owner-cost context against qPublic parcels, tax digest, local utility/rate documents, DCA/LIHTC records, and any official housing-program aggregates.',
    'Treat the large Waynesboro owner-cost total MOE as a warning against precise public narrative claims.'
  ]
};
