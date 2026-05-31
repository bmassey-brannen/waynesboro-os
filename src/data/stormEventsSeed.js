export const stormEventsSeed = {
  sourceName: 'NOAA/NCEI Storm Events Database',
  sourceUrl: 'https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/',
  sourceFile: 'StormEvents_details-ftp_v1.0_d2026_c20260519.csv.gz',
  retrievedAt: '2026-05-31T11:16:19Z',
  geography: 'Burke County, Georgia county-zone rows; not parcel-level, citywide damage, or live emergency telemetry',
  accessMethod: 'Public NOAA/NCEI bulk CSV/GZIP download filtered locally to STATE=GEORGIA and CZ_NAME=BURKE.',
  caveat: 'This seed proves the historical storm-event connector shape only. Do not present it as a complete hazard profile, disaster-loss ledger, flood-zone finding, or active emergency feed. Annual CSVs are revised; refresh and QA multiple years before briefing trends.',
  observedShape: {
    year: 2026,
    rowsMatched: 1,
    filter: 'STATE=GEORGIA; CZ_NAME=BURKE',
    fieldsKept: ['BEGIN_DATE_TIME', 'EVENT_TYPE', 'CZ_NAME', 'STATE', 'MAGNITUDE', 'TOR_F_SCALE', 'DEATHS_DIRECT', 'INJURIES_DIRECT', 'DAMAGE_PROPERTY', 'DAMAGE_CROPS']
  },
  sampleEvents: [
    {
      beginDateTime: '31-JAN-26 08:00:00',
      eventType: 'Heavy Snow',
      countyZone: 'BURKE',
      state: 'GEORGIA',
      magnitude: null,
      tornadoScale: null,
      deathsDirect: 0,
      injuriesDirect: 0,
      propertyDamage: null,
      cropDamage: null,
      note: 'Single public 2026 county-zone row observed in the current NOAA details file; trends require multi-year extraction.'
    }
  ],
  nextConnectorSteps: [
    'Download details files for the last 10 years and filter Georgia / Burke County rows with retrieval timestamps.',
    'Separate event counts, event types, injuries/deaths, and damage fields; keep narratives hidden until manually QA’d.',
    'Pair with FEMA declarations and NWS alert/forecast context before Council resilience recommendations.'
  ]
};
