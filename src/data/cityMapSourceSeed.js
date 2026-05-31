export const cityMapSourceSeed = {
  retrievedAt: '2026-05-31T00:00:00-04:00',
  sourcePage: {
    name: 'City of Waynesboro City Maps',
    url: 'https://www.waynesboroga.com/94/City-Maps',
    accessMethod: 'Public city web page; low-volume link index only, no private GIS access.',
    status: 'Official map source hub identified'
  },
  links: [
    {
      label: 'Interactive city map',
      type: 'ArcGIS web map',
      url: 'http://smallmaps.maps.arcgis.com/apps/Solutions/s2.html?appid=f0a1278c87db4e869da96b1318ad1074',
      integrationUse: 'Reference candidate for public basemap orientation and city-maintained map layers; verify app metadata/export permissions before caching geometry.'
    },
    {
      label: 'Road centerline map',
      type: 'ArcGIS web map',
      url: 'http://smallmaps.maps.arcgis.com/apps/Solutions/s2.html?appid=fc7ffc3132c54bacb0f759de0cd02f7c',
      integrationUse: 'Road network orientation for corridor and infrastructure screens; treat as reference until a permitted feature service/export path is confirmed.'
    },
    {
      label: 'Downtown Development Area map',
      type: 'PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/4',
      integrationUse: 'Official downtown geography reference for DDA/downtown command center boundaries after manual PDF review.'
    },
    {
      label: 'Ward Boundaries map',
      type: 'PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/81',
      integrationUse: 'Council/ward context; cite as a document reference, not a parcel layer.'
    },
    {
      label: 'Unofficial Zoning map',
      type: 'PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/107',
      integrationUse: 'Planning/zoning context only; keep the “unofficial” label visible and verify against ordinance/official zoning staff before claims.'
    },
    {
      label: 'Corporate Limits map',
      type: 'PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/166',
      integrationUse: 'Official city-limit reference for map credibility and annexation/boundary questions after manual review.'
    },
    {
      label: 'Historic District map',
      type: 'PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/11',
      integrationUse: 'Historic district context for downtown and preservation overlays after manual review.'
    }
  ],
  caveat: 'City map links are official public references, but this seed does not make the schematic dashboard map a live GIS or parcel system. Confirm ArcGIS service permissions and manually review PDFs before extracting boundaries or claims.'
};
