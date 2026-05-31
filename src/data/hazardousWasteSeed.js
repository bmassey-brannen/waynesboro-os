export const hazardousWasteSeed = {
  name: 'EPA ECHO RCRA REST Services',
  sourceUrl: 'https://echodata.epa.gov/echo/rcra_rest_services.get_facilities?output=JSON&p_st=GA&p_co=Burke&p_act=Y',
  retrievalUrl: 'https://echodata.epa.gov/echo/rcra_rest_services.get_qid?output=JSON&qid=304&pageno=1&responseset=20',
  retrievedAt: '2026-05-31T17:38:32Z',
  geography: 'Burke County, Georgia; cached sample includes Waynesboro-addressed RCRA handler identity rows where returned by EPA ECHO.',
  query: {
    state: 'GA',
    county: 'Burke',
    activeOnly: true,
    queryRows: 11,
    significantViolationRows: 0,
    currentViolationRows: 0,
    threeYearViolationRows: 0,
    formalEnforcementActionRows: 0,
    informalEnforcementActionRows: 1,
    inspectionRows: 0,
    totalPenalties: '$0',
    queryIdAtRetrieval: '304'
  },
  facilities: [
    {
      name: 'BURKE TRUCK & TRACTOR',
      sourceId: 'GAR000079392',
      address: '706 W. Sixth Street, Waynesboro, GA 30830',
      universe: 'VSQG',
      naics: '44422',
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: 33.08669,
      longitude: -82.02519,
      watershed: 'McIntosh Creek-Brier Creek'
    },
    {
      name: 'CVS PHARMACY #3778',
      sourceId: 'GAR000065672',
      address: '317 South Liberty Street, Waynesboro, GA 30830',
      universe: 'VSQG',
      naics: '446110',
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: 33.08257,
      longitude: -82.01103,
      watershed: 'McIntosh Creek-Brier Creek'
    },
    {
      name: 'LEGION INDUSTRIES INC',
      sourceId: 'GAD054223987',
      address: 'Waynesboro, GA 30830',
      universe: 'SQG',
      naics: null,
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: null,
      longitude: null,
      watershed: null
    },
    {
      name: 'MR GOLF CARTS',
      sourceId: 'GAR000049403',
      address: 'Waynesboro, GA 30830',
      universe: 'SQG',
      naics: null,
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: null,
      longitude: null,
      watershed: null
    },
    {
      name: 'SOUTHERN NUCLEAR - PLANT VOGTLE',
      sourceId: 'GAD094066321',
      address: 'Waynesboro, GA 30830',
      universe: 'SQG',
      naics: null,
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: null,
      longitude: null,
      watershed: null
    },
    {
      name: 'TRACTOR SUPPLY COMPANY #1841',
      sourceId: 'GAR000073668',
      address: 'Waynesboro, GA 30830',
      universe: 'VSQG',
      naics: null,
      complianceStatus: 'No Violation Identified',
      significantNoncomplier: 'No',
      latitude: null,
      longitude: null,
      watershed: null
    }
  ],
  legend: [
    { code: 'VSQG', label: 'Very Small Quantity Generator', note: 'Generator category reported by RCRA/ECHO; verify on source profile before public interpretation.' },
    { code: 'SQG', label: 'Small Quantity Generator', note: 'Generator category reported by RCRA/ECHO; not a city permit, zoning finding, or violation claim.' }
  ],
  nextActions: [
    'Open each ECHO facility profile before exposing compliance-detail drilldowns.',
    'Cross-check RCRA handler addresses against zoning, parcel, and business-source routes before map promotion.',
    'Keep summary row counts as source metadata until violation/enforcement rows are individually reviewed.'
  ],
  caveat: 'EPA ECHO RCRA rows are public environmental-regulatory source-routing context only. This seed is not a complete local business inventory, a municipal inspection record, a zoning determination, a hazard finding, live environmental telemetry, or a standalone violation/compliance conclusion.'
};
