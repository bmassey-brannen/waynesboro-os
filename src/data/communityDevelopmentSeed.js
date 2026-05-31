export const communityDevelopmentSeed = {
  sourceName: 'City of Waynesboro Community Development source stack',
  retrievedAt: '2026-05-31T09:50:26Z',
  primaryUrl: 'https://www.waynesboroga.com/118/Community-Development',
  geography: 'City of Waynesboro, Georgia',
  status: 'Source routes indexed',
  caveat: 'This is a public source-routing layer for planning, zoning, redevelopment, housing, and application forms. It is not a zoning determination, project approval list, code-enforcement record, or legal interpretation. Parse and manually verify documents before extracting policy facts.',
  routes: [
    {
      label: 'Community Development',
      url: 'https://www.waynesboroga.com/118/Community-Development',
      type: 'Official city hub',
      status: 'HTTP 200 source page',
      dataType: 'Planning, zoning, redevelopment, housing initiatives, forms, and DocumentCenter links',
      integrationUse: 'Anchor a policy/planning evidence lane before Council recommendations cite development rules or housing programs.'
    },
    {
      label: 'Sign Ordinance PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/96',
      type: 'DocumentCenter PDF',
      status: 'Manual QA required',
      dataType: 'Sign ordinance reference document',
      integrationUse: 'Candidate citation for storefront/signage questions after manual document review.'
    },
    {
      label: 'Zoning Ordinance Part 1 PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/53',
      type: 'DocumentCenter PDF',
      status: 'Manual QA required',
      dataType: 'Zoning ordinance reference document',
      integrationUse: 'Policy baseline for parcel, land-use, and development drilldowns after verified section indexing.'
    },
    {
      label: 'Zoning Ordinance Part 2 PDF',
      url: 'https://www.waynesboroga.com/DocumentCenter/View/54',
      type: 'DocumentCenter PDF',
      status: 'Manual QA required',
      dataType: 'Zoning ordinance continuation reference document',
      integrationUse: 'Pair with Part 1 and Municode before exposing zoning summaries or Council recommendations.'
    },
    {
      label: 'Housing Development / Initiatives',
      url: 'https://www.waynesboroga.com/278/Housing-DevelopmentInitiatives',
      type: 'Official city page',
      status: 'Source route identified',
      dataType: 'Housing-development initiative route',
      integrationUse: 'Route for replacing generic housing placeholders with official program/source context if content or documents are published.'
    },
    {
      label: 'Redevelopment Powers',
      url: 'https://www.waynesboroga.com/276/Redevelopment-Powers',
      type: 'Official city page',
      status: 'Source route identified',
      dataType: 'Redevelopment-power route and public policy context',
      integrationUse: 'Future Council brief source for redevelopment authority questions after manual page/document review.'
    }
  ],
  forms: [
    'Conditional Use Permit Application',
    'Zoning Application',
    'Variance Application',
    'Major and Minor Subdivision Application and Checklist',
    'Petition of Zoning Map Amendment',
    'Special Event Application'
  ],
  nextActions: [
    'Manually open the zoning/sign ordinance PDFs and index only section titles, effective dates, and page links before any summary text is displayed.',
    'Compare Community Development routes with Municode and the City Maps zoning PDF so the app can separate official law, map references, and application workflows.',
    'Use the Housing Development / Initiatives route as a source path, not as proof of active housing projects, until page content or records are reviewed.'
  ]
};
