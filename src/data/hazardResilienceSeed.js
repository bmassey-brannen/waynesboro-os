export const hazardResilienceSeed = {
  retrievedAt: '2026-05-31T00:00:00.000Z',
  lane: 'Hazard / resilience',
  caveat: 'This is a source-routing stub only. Do not present flood-zone, storm-loss, insurance, or parcel-specific hazard findings until FEMA/NOAA records are fetched, cached, timestamped, and manually QA’d against the official source views.',
  sources: [
    {
      label: 'FEMA National Flood Hazard Layer',
      shortLabel: 'FEMA NFHL',
      url: 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer',
      dataType: 'Public flood hazard map service: flood zones, FIRM panels, LOMR/LOMA context, and National Flood Hazard Layer geometry where published',
      accessMethod: 'Public ArcGIS REST map service; low-volume metadata and geometry queries only after service access is confirmed from the runtime environment.',
      integrationUse: 'Anchor future parcel/downtown/infrastructure resilience overlays without inventing flood-zone claims.',
      difficulty: 'Medium',
      status: 'Source identified; runtime TLS check failed in this environment'
    },
    {
      label: 'NOAA/NCEI Storm Events Database',
      shortLabel: 'NOAA Storm Events',
      url: 'https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/',
      dataType: 'County-level historical severe-weather event CSV files including event type, date, location narrative, injuries, deaths, and property/crop damage fields',
      accessMethod: 'Public NOAA/NCEI bulk CSV/GZIP downloads; use low-volume annual file pulls or manually downloaded extracts filtered to Georgia / Burke County. A 2026 details-file filter now has a cached connector-shape seed in stormEventsSeed.js.',
      integrationUse: 'Create a source-labeled historical hazard context panel for The Council and public works planning.',
      difficulty: 'Medium',
      status: 'Seed connector ready'
    },
    {
      label: 'FEMA Flood Map Service Center',
      shortLabel: 'FEMA MSC',
      url: 'https://msc.fema.gov/portal/home',
      dataType: 'Official public flood-map search portal, FIRM panels, and map-product downloads',
      accessMethod: 'Public web portal; manual confirmation first, no scraping private/session workflows.',
      integrationUse: 'Human-verification path before any NFHL flood layer is presented in public demos.',
      difficulty: 'Medium',
      status: 'Manual verification path identified'
    }
  ]
};
