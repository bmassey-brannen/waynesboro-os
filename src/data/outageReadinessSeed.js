export const outageReadinessSeed = {
  sourceName: 'Georgia Power Outage Map and Storm Center',
  sourceUrl: 'https://outagemap.georgiapower.com/',
  stormCenterUrl: 'https://www.georgiapower.com/about/safety/outages-storm-center.html',
  retrievedAt: '2026-06-01T13:38:41.000Z',
  geography: 'Georgia Power service territory; Waynesboro/Burke County relevance must be verified against service-territory and city utility records before use',
  accessMethod: 'Public web map and public outage/storm information pages; reference manually or use only documented/approved feeds if offered. Do not scrape live outage tiles or customer systems.',
  cadence: 'Live/operational map; refresh cadence is controlled by Georgia Power and not documented in the app seed.',
  difficulty: 'Medium',
  status: 'Source route verified',
  observedShape: {
    outageMapHttpStatus: 200,
    stormCenterHttpStatus: 200,
    mapContentType: 'text/html;charset=UTF-8',
    stormCenterContentType: 'text/html;charset=utf-8'
  },
  notes: [
    'Useful as an external resilience/source route for electric-outage awareness, storm communications, and operations drilldowns.',
    'Not a municipal outage feed, utility account dataset, service-territory proof, response-time source, or historical reliability record.',
    'Keep off the executive home until a permitted data path and geography filter produce a clear public takeaway.'
  ]
};
