export const operationsSourceSeed = [
  {
    lane: 'Utilities',
    title: 'Utility Information',
    url: 'https://www.waynesboroga.com/150/Utility-Information',
    dataType: 'Official city utility service information and account workflow context',
    status: 'Source hub identified',
    integrationUse: 'Anchor utility module labels, customer-service workflow links, and future records-request questions.'
  },
  {
    lane: 'Water',
    title: 'Water Department / About Our Water',
    url: 'https://www.waynesboroga.com/124/Water',
    secondaryUrl: 'https://www.waynesboroga.com/216/About-Our-Water',
    dataType: 'Official city water department pages, service context, water quality/public information surface',
    status: 'Reference ready',
    integrationUse: 'Source-label water system context while separate public reports or operational exports are requested.'
  },
  {
    lane: 'Sewer',
    title: 'Sewer & Wastewater',
    url: 'https://www.waynesboroga.com/123/Sewer-Wastewater',
    dataType: 'Official city sewer/wastewater department page',
    status: 'Reference ready',
    integrationUse: 'Source-label wastewater responsibility and future capital-project / compliance document questions.'
  },
  {
    lane: 'Public Works',
    title: 'Public Works',
    url: 'https://www.waynesboroga.com/200/Public-Works',
    dataType: 'Official public works department surface, local operations context',
    status: 'Source hub identified',
    integrationUse: 'Tie road, drainage, solid waste, and maintenance placeholders to an official department source hub.'
  },
  {
    lane: 'Solid Waste',
    title: 'Solid Waste',
    url: 'https://www.waynesboroga.com/205/Solid-Waste',
    dataType: 'Official city solid waste information page',
    status: 'Reference ready',
    integrationUse: 'Add public-facing service context before any route, tonnage, or complaint data exists.'
  },
  {
    lane: 'Storm drainage',
    title: 'Storm Drainage Information',
    url: 'https://www.waynesboroga.com/213/Storm-Drainage-Information',
    dataType: 'Official city drainage information and public guidance page',
    status: 'Reference ready',
    integrationUse: 'Support infrastructure risk questions without pretending there is live drainage telemetry.'
  },
  {
    lane: 'Public safety',
    title: 'Police and Fire department pages',
    url: 'https://www.waynesboroga.com/122/Police',
    secondaryUrl: 'https://www.waynesboroga.com/120/Fire',
    dataType: 'Official department pages and contact/service context',
    status: 'Reference only',
    integrationUse: 'Keep public-safety KPIs synthetic until aggregate incident/response records are officially released or requested.'
  }
];
