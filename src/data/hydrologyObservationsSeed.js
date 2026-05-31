export const hydrologyObservationsSeed = {
  sourceName: 'USGS NWIS Instantaneous Values Service',
  url: 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=02197830,021973269,02201230&parameterCd=00060,00065&siteStatus=all',
  retrievedAt: '2026-05-31T13:38:00.000Z',
  geography: 'Burke County active stream sites near Waynesboro; station observations are point measurements, not citywide flood status.',
  status: 'Low-volume public observation seed',
  observedShape: {
    requestedSites: 3,
    returnedSeries: 6,
    parameters: ['00060 streamflow', '00065 gage height'],
    qualifierNote: 'USGS qualifier P means provisional unless changed by USGS quality review.'
  },
  latestObservations: [
    {
      siteNo: '021973269',
      stationName: 'SAVANNAH RIVER NEAR WAYNESBORO, GA',
      parameterCd: '00060',
      parameterName: 'Streamflow',
      unit: 'ft³/s',
      value: '7,480',
      rawValue: 7480,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:15:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/021973269/'
    },
    {
      siteNo: '021973269',
      stationName: 'SAVANNAH RIVER NEAR WAYNESBORO, GA',
      parameterCd: '00065',
      parameterName: 'Gage height',
      unit: 'ft',
      value: '9.49',
      rawValue: 9.49,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:15:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/021973269/'
    },
    {
      siteNo: '02197830',
      stationName: 'BRIER CREEK NEAR WAYNESBORO, GA',
      parameterCd: '00060',
      parameterName: 'Streamflow',
      unit: 'ft³/s',
      value: '825',
      rawValue: 825,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:30:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/02197830/'
    },
    {
      siteNo: '02197830',
      stationName: 'BRIER CREEK NEAR WAYNESBORO, GA',
      parameterCd: '00065',
      parameterName: 'Gage height',
      unit: 'ft',
      value: '8.47',
      rawValue: 8.47,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:30:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/02197830/'
    },
    {
      siteNo: '02201230',
      stationName: 'OGEECHEE RIVER AT MIDVILLE, GA',
      parameterCd: '00060',
      parameterName: 'Streamflow',
      unit: 'ft³/s',
      value: '1,490',
      rawValue: 1490,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:00:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/02201230/'
    },
    {
      siteNo: '02201230',
      stationName: 'OGEECHEE RIVER AT MIDVILLE, GA',
      parameterCd: '00065',
      parameterName: 'Gage height',
      unit: 'ft',
      value: '4.87',
      rawValue: 4.87,
      qualifiers: ['P'],
      dateTime: '2026-05-31T09:00:00.000-04:00',
      siteUrl: 'https://waterdata.usgs.gov/monitoring-location/02201230/'
    }
  ],
  nextActions: [
    'Refresh immediately before presentations and show retrieval time because IV data changes throughout the day.',
    'Add flood-stage/action-stage metadata only after station-specific thresholds are confirmed from USGS/NWS pages.',
    'Keep observations separated from city drainage-performance, emergency-response, and water-quality claims.'
  ],
  caveat: 'USGS instantaneous values are public provisional point observations. They are not flood alerts, emergency-management instructions, stormwater capacity metrics, or live municipal utility telemetry.'
};
