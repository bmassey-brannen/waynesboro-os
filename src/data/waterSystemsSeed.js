export const waterSystemsSeed = {
  sourceName: 'EPA ECHO SDWIS REST Services',
  sourceUrl: 'https://echodata.epa.gov/echo/sdw_rest_services.get_systems?output=JSON&p_co=Burke&p_st=GA&p_act=Y',
  resultsUrlPattern: 'https://echodata.epa.gov/echo/sdw_rest_services.get_qid?output=JSON&qid={QueryID}&pageno=1',
  documentationUrl: 'https://echo.epa.gov/tools/web-services/facility-search-drinking-water#!/Safe_Drinking_Water/get_sdw_rest_services_get_systems',
  retrievedAt: '2026-05-31T01:44:47Z',
  geography: 'Active public water systems in Burke County, Georgia; filtered display for systems listing Waynesboro as a served city',
  query: {
    state: 'GA',
    county: 'Burke',
    activeOnly: true,
    returnedRows: 23,
    queryIdObserved: '147'
  },
  caveat: 'Low-volume public EPA ECHO/SDWIS seed. Use for water-system identity and public reporting context only; do not present as live utility telemetry, water quality assurance, or a complete local operations feed.',
  systemsServingWaynesboro: [
    {
      pwsName: 'WAYNESBORO',
      pwsId: 'GA0330004',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Community water system',
      primarySource: 'Ground water',
      populationServed: 5900,
      activityCode: 'A'
    },
    {
      pwsName: 'CROSS ROADS RV PARK WATER SYSTEM',
      pwsId: 'GA0330068',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Transient non-community system',
      primarySource: 'Ground water',
      populationServed: 30,
      activityCode: 'A'
    },
    {
      pwsName: 'DOGWOOD RV PARK',
      pwsId: 'GA0330060',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Transient non-community system',
      primarySource: 'Ground water',
      populationServed: 110,
      activityCode: 'A'
    },
    {
      pwsName: 'DOLLAR GENERAL #21167',
      pwsId: 'GA0330071',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Transient non-community system',
      primarySource: 'Ground water',
      populationServed: 35,
      activityCode: 'A'
    },
    {
      pwsName: 'DOLLAR GENERAL STORE #18659',
      pwsId: 'GA0330069',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Transient non-community system',
      primarySource: 'Ground water',
      populationServed: 26,
      activityCode: 'A'
    },
    {
      pwsName: 'URBAN KITCHEN',
      pwsId: 'GA0330065',
      citiesServed: 'WAYNESBORO',
      county: 'Burke',
      pwsType: 'Transient non-community system',
      primarySource: 'Ground water',
      populationServed: 23,
      activityCode: 'A'
    }
  ]
};
