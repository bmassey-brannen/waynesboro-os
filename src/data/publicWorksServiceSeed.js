export const publicWorksServiceSeed = {
  name: 'City of Waynesboro official operations service-route index',
  retrievedAt: '2026-06-01T06:27:45+00:00',
  source: 'City of Waynesboro official website / CivicEngage sitemap and department pages',
  sourceUrl: 'https://www.waynesboroga.com/sitemap.xml',
  accessMethod: 'Low-volume public page review; HTTP 200 confirmed for each listed official route. No forms submitted and no private systems accessed.',
  geography: 'City of Waynesboro, Georgia public service-navigation pages',
  status: 'Official city route index',
  posture: 'These routes are public service references only. They do not prove work-order counts, complaint volume, staffing levels, asset condition, outage status, response time, or operating performance until official aggregate records are obtained and cited.',
  routes: [
    {
      lane: 'Public works hub',
      title: 'Public Works',
      url: 'https://www.waynesboroga.com/200/Public-Works',
      dataType: 'Official department/service page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Anchor public works source routing before streets, solid waste, storm-drainage, and beautification widgets make operational claims.'
    },
    {
      lane: 'Solid waste',
      title: 'Solid Waste',
      url: 'https://www.waynesboroga.com/205/Solid-Waste',
      dataType: 'Official solid-waste service page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Reference service scope and customer-facing rules before any collection performance or route-efficiency metric is displayed.'
    },
    {
      lane: 'Trash collection',
      title: 'Trash Collection Services',
      url: 'https://www.waynesboroga.com/208/Trash-Collection-Services',
      dataType: 'Official customer service page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Future intake source for collection schedules/rules after manual review; not a live missed-pickup or tonnage feed.'
    },
    {
      lane: 'Yard waste',
      title: 'Yard Waste Collections',
      url: 'https://www.waynesboroga.com/210/Yard-Waste-Collections',
      dataType: 'Official customer service page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Adds a source route for seasonal debris and right-of-way cleanup questions without claiming service volumes.'
    },
    {
      lane: 'Streets',
      title: 'Streets',
      url: 'https://www.waynesboroga.com/211/Streets',
      dataType: 'Official streets service page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Reference route for road-maintenance responsibilities before linking GDOT, work orders, or capital-project records.'
    },
    {
      lane: 'Storm drainage',
      title: 'Storm Drainage Information',
      url: 'https://www.waynesboroga.com/213/Storm-Drainage-Information',
      dataType: 'Official drainage information page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Source route for drainage-issue context; keep separate from flood telemetry, hydrology observations, or parcel-risk claims.'
    },
    {
      lane: 'Natural gas',
      title: 'Natural Gas',
      url: 'https://www.waynesboroga.com/121/Natural-Gas',
      dataType: 'Official municipal utility page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Complements ACS heating-fuel context and utility-rate references before any account, service-territory, or outage metric is promoted.'
    },
    {
      lane: 'Gas safety',
      title: 'Gas Leak',
      url: 'https://www.waynesboroga.com/185/Gas-Leak',
      dataType: 'Official gas safety information page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Public safety reference route only; not incident volume, response performance, or emergency dispatch data.'
    },
    {
      lane: 'Fire department',
      title: 'Fire',
      url: 'https://www.waynesboroga.com/120/Fire',
      dataType: 'Official department page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Source-routing baseline before fire incident, staffing, ISO, or response-time cards can be promoted.'
    },
    {
      lane: 'Police department',
      title: 'Police',
      url: 'https://www.waynesboroga.com/122/Police',
      dataType: 'Official department page',
      status: 'HTTP 200 confirmed',
      integrationUse: 'Source-routing baseline before police incident, crime, staffing, or response-time claims can be promoted.'
    }
  ],
  normalizedShape: [
    { field: 'lane', meaning: 'Operating lane or service category used by the dashboard.' },
    { field: 'url', meaning: 'Official public route to cite before promoting a widget or source request.' },
    { field: 'status', meaning: 'Route availability observed during low-volume public review.' },
    { field: 'integrationUse', meaning: 'What the source can safely support today and what it cannot prove yet.' },
    { field: 'recordsNeeded', meaning: 'Future official aggregates such as work orders, schedules, budgets, service requests, and response-time exports.' }
  ],
  nextActions: [
    'Manually review each service page for adopted schedules, fees, contacts, forms, and document links before quoting operational rules.',
    'Request or obtain aggregate service records only: monthly work orders, missed pickups, street maintenance requests, drainage complaints, and response-time summaries if public.',
    'Pair public works route metadata with budgets, capital projects, weather/hydrology context, and GDOT road data before the public dashboard supports operations priorities.'
  ]
};
