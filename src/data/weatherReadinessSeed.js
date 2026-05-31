export const weatherReadinessSeed = {
  sourceName: 'National Weather Service API',
  sourceUrl: 'https://api.weather.gov/points/33.0898731,-82.0156736',
  retrievedAt: '2026-05-31',
  geography: 'Waynesboro, Georgia OSM center point',
  accessMethod: 'Public api.weather.gov point metadata request with User-Agent header; cache low-volume metadata and forecast/alert URLs only.',
  caveat: 'This is source-routing metadata for readiness planning, not a live emergency feed. Alert status and forecasts must be fetched, timestamped, and displayed with NWS attribution before use in public claims.',
  point: {
    latitude: 33.0898731,
    longitude: -82.0156736,
    gridId: 'CAE',
    gridX: 32,
    gridY: 17,
    countyZone: 'GAC033',
    forecastZone: 'GAZ077',
    fireWeatherZone: 'GAZ077',
    radarStation: 'KCLX',
    relativeLocation: 'Waynesboro, GA'
  },
  endpoints: [
    {
      label: 'Point metadata',
      url: 'https://api.weather.gov/points/33.0898731,-82.0156736',
      use: 'Routes the city point to NWS grid, county, forecast, fire-weather zone, and radar station metadata.'
    },
    {
      label: 'Forecast',
      url: 'https://api.weather.gov/gridpoints/CAE/32,17/forecast',
      use: 'Public forecast periods for city-readiness context after timestamped fetch.'
    },
    {
      label: 'Hourly forecast',
      url: 'https://api.weather.gov/gridpoints/CAE/32,17/forecast/hourly',
      use: 'Hourly weather context for events, public works, and safety briefings after timestamped fetch.'
    },
    {
      label: 'County alerts path',
      url: 'https://api.weather.gov/alerts/active?zone=GAC033',
      use: 'Active NWS alerts for Burke County zone; fetch live at display time or cache with timestamp.'
    }
  ]
};
