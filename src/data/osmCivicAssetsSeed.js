export const osmCivicAssetsSeed = {
  sourceName: 'OpenStreetMap Overpass API',
  queryUrl: 'https://overpass-api.de/api/interpreter',
  queryShape: 'amenity=townhall|police|fire_station|library|school|hospital around 7km of OSM Waynesboro center',
  retrievedAt: '2026-05-30T23:56:40Z',
  geography: '7km radius around Waynesboro, Georgia center point from OSM/Nominatim seed',
  license: 'Data © OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright',
  caveat: 'Community-maintained map seed for civic-asset orientation only; verify against official city/county department pages before using as an authoritative facility inventory.',
  assets: [
    {
      id: 'osm-way-490995355',
      name: 'Burke Health',
      type: 'hospital',
      osmElement: 'way/490995355',
      lat: 33.0832532,
      lon: -82.0129012,
      integrationUse: 'Public health/civic-anchor map layer seed; not a live capacity or service-status feed.'
    },
    {
      id: 'osm-way-1160548682',
      name: 'Burke County Library',
      type: 'library',
      osmElement: 'way/1160548682',
      lat: 33.0747555,
      lon: -82.0000876,
      integrationUse: 'Civic asset and downtown/community-service context seed.'
    },
    {
      id: 'osm-node-10109335600',
      name: 'Burke County Sheriff',
      type: 'police',
      osmElement: 'node/10109335600',
      lat: 33.075082,
      lon: -81.9959647,
      integrationUse: 'Public-safety facility orientation only; incident/response KPIs still require official aggregate records.'
    },
    {
      id: 'osm-node-358756901',
      name: 'Waynesboro Elementary School',
      type: 'school',
      osmElement: 'node/358756901',
      lat: 33.0943174,
      lon: -82.0206737,
      integrationUse: 'Education/civic anchor map seed; verify against school district sources before official inventory use.'
    },
    {
      id: 'osm-node-4150273442',
      name: 'Burke County Middle School',
      type: 'school',
      osmElement: 'node/4150273442',
      lat: 33.0839993,
      lon: -81.9942754,
      integrationUse: 'Education/civic anchor map seed; verify against school district sources before official inventory use.'
    }
  ]
};
