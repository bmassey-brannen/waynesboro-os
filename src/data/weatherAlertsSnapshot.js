export const weatherAlertsSnapshot = {
  provider: 'National Weather Service API / api.weather.gov',
  sourceName: 'NWS active alerts endpoint for Burke County zone GAC033',
  sourceUrl: 'https://api.weather.gov/alerts/active?zone=GAC033',
  geography: 'Burke County, Georgia alert zone GAC033',
  accessMethod: 'Public NWS API with required User-Agent header; low-volume cached snapshot only.',
  fetchedAt: '2026-05-31T01:18:07+00:00',
  status: 'verified_public_snapshot',
  featureCount: 0,
  title: 'Current watches, warnings, and advisories for Burke County (GAC033) GA',
  activeAlerts: [],
  summary: 'No active NWS watches, warnings, or advisories were returned for Burke County zone GAC033 at snapshot time.',
  caveat: 'This is a cached public alert snapshot for source-routing proof. It is not dispatch telemetry and should be refreshed before any live emergency briefing.'
};
