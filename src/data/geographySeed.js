export const waynesboroGeographySeed = {
  name: 'Waynesboro city, Georgia',
  geoid: '1380984',
  placeCode: '80984',
  stateFips: '13',
  sourceName: 'U.S. Census TIGERweb Incorporated Places',
  sourceUrl: 'https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/4/query?where=GEOID%20%3D%20%271380984%27&outFields=NAME,BASENAME,PLACE,STATE,GEOID,AREALAND,AREAWATER,CENTLAT,CENTLON,INTPTLAT,INTPTLON&returnGeometry=false&f=json',
  accessMethod: 'Public ArcGIS REST query; low-volume cached seed, no credentials required.',
  retrievedAt: '2026-05-30T00:00:00Z',
  attributes: {
    name: 'Waynesboro city',
    basename: 'Waynesboro',
    geoid: '1380984',
    placeCode: '80984',
    stateFips: '13',
    centerLat: '+33.0908907',
    centerLon: '-082.0145919',
    interiorPointLat: '+33.0912794',
    interiorPointLon: '-082.0142901',
    landSquareMeters: 14173192,
    waterSquareMeters: 136228,
    mtfcc: 'G4110'
  },
  notes: 'Boundary geometry was not stored in this seed; this is a lightweight source-labeled place metadata stub for map credibility and future GIS connector work.'
};
