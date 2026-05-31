export const businessSurfaceSeed = {
  sourceName: 'City of Waynesboro Business / Resource Directory surface',
  sourceUrl: 'https://www.waynesboroga.com/35/Business',
  retrievedAt: '2026-05-31T12:00:00Z',
  geography: 'City of Waynesboro, Georgia',
  accessMethod: 'Public CivicPlus pages; index links and categories only unless the city publishes exportable records or grants permission.',
  cadence: 'As posted by the City of Waynesboro; job/RFP pages update when listings are posted.',
  difficulty: 'Medium',
  status: 'Source surface indexed',
  caveat: 'This is a public navigation/source surface, not a verified count of active business licenses, vacancies, procurements, or jobs. Use it to route future connectors and manual review before replacing synthetic economic KPIs.',
  surfaces: [
    {
      label: 'Business landing page',
      url: 'https://www.waynesboroga.com/35/Business',
      dataType: 'Official business navigation: available downtown properties, chamber, economic development, licenses/permits, local businesses, planning/zoning, starting a business',
      integrationUse: 'Economic-development source hub and public-facing drilldown launcher.'
    },
    {
      label: 'Resource Directory / Local Businesses',
      url: 'https://www.waynesboroga.com/BusinessDirectoryII.aspx',
      dataType: 'CivicPlus resource directory with alphabetized and category-filtered listings',
      integrationUse: 'Candidate normalized local-business index after manual export/low-volume indexing rules are confirmed.'
    },
    {
      label: 'Downtown Businesses category',
      url: 'https://www.waynesboroga.com/BusinessDirectoryII.aspx?lngBusinessCategoryID=29',
      dataType: 'Directory-filtered downtown business surface linked from Downtown Development/Main Street pages',
      integrationUse: 'Downtown occupancy/business-reference cross-check; not a vacancy or license register by itself.'
    },
    {
      label: 'Available Downtown Properties',
      url: 'https://www.waynesboroga.com/realestate.aspx',
      dataType: 'City-linked real estate/property opportunity surface for downtown development',
      integrationUse: 'Future redevelopment-opportunity pipeline source after listing fields and update cadence are reviewed.'
    },
    {
      label: 'Licenses & Permits',
      url: 'https://www.waynesboroga.com/128/Licenses-Permits',
      dataType: 'Official page for business licensing / permit instructions and contacts',
      integrationUse: 'Records-request and workflow anchor for replacing synthetic active-license counts.'
    },
    {
      label: 'Bid Postings',
      url: 'https://www.waynesboroga.com/Bids.aspx',
      dataType: 'CivicPlus bid/RFP posting module; observed open engineering-services RFQ and vendor-registration references during source check',
      integrationUse: 'Public procurement/project watch connector; index metadata only and verify bid pages before quoting.'
    },
    {
      label: 'Jobs / employment postings',
      url: 'https://www.waynesboroga.com/Jobs.aspx',
      dataType: 'CivicPlus jobs module with RSS/Notify Me paths and category filters',
      integrationUse: 'Municipal staffing/readiness context; not a labor-market statistic.'
    }
  ]
};
