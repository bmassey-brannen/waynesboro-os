export const toxicReleaseInventorySeed = {
  sourceName: 'EPA Envirofacts Toxics Release Inventory Facility API',
  sourceUrl: 'https://data.epa.gov/efservice/TRI_FACILITY/STATE_ABBR/GA/COUNTY_NAME/BURKE/ROWS/0:20/JSON',
  documentationUrl: 'https://www.epa.gov/enviro/envirofacts-data-service-api',
  geography: 'Burke County, Georgia TRI_FACILITY rows with Waynesboro-addressed facilities in the returned sample',
  retrievedAt: '2026-06-01T06:56:59Z',
  accessMethod: 'Public EPA Envirofacts API; low-volume county-filtered TRI_FACILITY table request; cache public facility identity rows only.',
  query: {
    endpoint: 'TRI_FACILITY',
    filters: ['STATE_ABBR/GA', 'COUNTY_NAME/BURKE'],
    rowsRequested: '0:20',
    rowsReturned: 5,
    waynesboroAddressRows: 5,
    closedIndicatorRows: 1
  },
  facilities: [
    {
      sourceId: '30830FMMTC1FIAM',
      name: 'FIAMM ENERGY LLC',
      city: 'WAYNESBORO',
      address: '1 FIAMM WAY, WAYNESBORO, GA 30830',
      county: 'BURKE',
      fips: '13033',
      facilityClosedIndicator: '1',
      displayStatus: 'Closed indicator in facility table',
      note: 'Identity row only; release/chemical/report-year tables require separate source-labeled extraction.'
    },
    {
      sourceId: '30830GLBBS1201G',
      name: 'GLOBE BUSINESS FURNITURE',
      city: 'WAYNESBORO',
      address: '1201 GRIFFIN LANDING RD, WAYNESBORO, GA 30830',
      county: 'BURKE',
      fips: '13033',
      facilityClosedIndicator: '0',
      displayStatus: 'Facility identity row',
      note: 'Identity row only; no release quantity or compliance claim is displayed.'
    },
    {
      sourceId: '30830KWKST770MI',
      name: 'SAM DONG GA INC',
      city: 'WAYNESBORO',
      address: '770 MILLS RD, WAYNESBORO, GA 30830',
      county: 'BURKE',
      fips: '13033',
      facilityClosedIndicator: '0',
      displayStatus: 'Facility identity row',
      note: 'Identity row only; confirm current profile and reporting years before public use.'
    },
    {
      sourceId: '30830STHRN8803R',
      name: 'SOUTHERN NUCLEAR - PLANT WILSON/VOGTLE',
      city: 'WAYNESBORO',
      address: '8803 RIVER RD, WAYNESBORO, GA 30830',
      county: 'BURKE',
      fips: '13033',
      facilityClosedIndicator: '0',
      displayStatus: 'Facility identity row',
      note: 'Identity row only; do not infer emissions, safety, compliance, or operating status from this card.'
    },
    {
      sourceId: '3083WLSTMG1RITZ',
      name: 'GE GRID SOLUTIONS',
      city: 'WAYNESBORO',
      address: '1 RITZ INSTRUMENT WAY, WAYNESBORO, GA 30830',
      county: 'BURKE',
      fips: '13033',
      facilityClosedIndicator: '0',
      displayStatus: 'Facility identity row',
      note: 'Identity row only; pair with TRI release tables and ECHO profiles before claims.'
    }
  ],
  nextActions: [
    'Open EPA TRI Facility Report or Envirofacts release tables for each TRI ID before displaying chemical/release values.',
    'Record reporting year, chemical, medium, units, data-quality notes, and EPA profile URL before any public environmental claim.',
    'Keep TRI identity separate from city permits, zoning, inspections, code enforcement, and live environmental telemetry.'
  ],
  caveat: 'TRI_FACILITY rows are public environmental source-routing context only. This seed is not a complete environmental inventory, emissions finding, violation finding, health-risk claim, zoning determination, city inspection record, or live telemetry feed.'
};
