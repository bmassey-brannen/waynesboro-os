export const usgsHydrologySeed = {
  sourceName: 'USGS National Water Information System Site Service',
  sourceUrl: 'https://waterservices.usgs.gov/nwis/site/?format=rdb&countyCd=13033&siteType=ST&siteStatus=active&siteOutput=expanded',
  retrievedAt: '2026-05-31T13:04:28.000Z',
  geography: 'Burke County, Georgia; active stream-gage site inventory, not a City of Waynesboro utility or flood-risk finding',
  query: {
    countyCd: '13033',
    siteType: 'ST',
    siteStatus: 'active',
    returnedRows: 3,
    format: 'RDB tab-delimited site-service response'
  },
  activeStreamSites: [
    {
      siteNo: '021973269',
      stationName: 'SAVANNAH RIVER NEAR WAYNESBORO, GA',
      siteType: 'Stream',
      latitude: 33.1503611,
      longitude: -81.7540833,
      hydrologicUnit: '03060106',
      drainageAreaSqMi: 8300,
      mapName: 'SHELL BLUFF LANDING',
      note: 'Regional river-condition source anchor; verify current observations separately before any status claim.'
    },
    {
      siteNo: '02197830',
      stationName: 'BRIER CREEK NEAR WAYNESBORO, GA',
      siteType: 'Stream',
      latitude: 33.11830556,
      longitude: -81.9636111,
      hydrologicUnit: '03060108',
      drainageAreaSqMi: 473,
      mapName: 'IDLEWOOD',
      note: 'Closest named local stream-gage route for resilience / stormwater context; not a flood warning by itself.'
    },
    {
      siteNo: '02201230',
      stationName: 'OGEECHEE RIVER AT MIDVILLE, GA',
      siteType: 'Stream',
      latitude: 32.81469444,
      longitude: -82.235,
      hydrologicUnit: '03060201',
      drainageAreaSqMi: 1340,
      mapName: 'MIDVILLE',
      note: 'County river-condition source anchor; use only with source labels and current-value endpoint checks.'
    }
  ],
  normalizedShape: [
    { field: 'siteNo', meaning: 'USGS station identifier for linking observations and daily/current values' },
    { field: 'stationName', meaning: 'Public site name from NWIS Site File' },
    { field: 'lat/lon', meaning: 'NAD83 coordinates for map orientation, not parcel geometry' },
    { field: 'hydrologicUnit', meaning: 'HUC watershed code for resilience/source routing' },
    { field: 'drainageAreaSqMi', meaning: 'Site drainage area from USGS when available' }
  ],
  nextActions: [
    'Test USGS instantaneous-values endpoint for the Brier Creek and Savannah River site numbers before showing any current-stage or flow cards.',
    'Cross-check gauges against city/county storm-drainage and emergency-management source routes before the public dashboard cites drainage or flood context.',
    'Keep the panel as a source inventory until observation timestamps, units, and station availability flags are cached.'
  ],
  caveat: 'USGS NWIS site inventory is a public hydrology source route only. It does not prove flooding, drainage performance, water quality, utility service, or emergency conditions for Waynesboro.'
};
