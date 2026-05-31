export const stateDrinkingWaterSeed = {
  retrievedAt: '2026-05-31T10:43:53Z',
  sourceName: 'Georgia EPD Drinking Water Program',
  primaryUrl: 'https://epd.georgia.gov/watershed-protection-branch/drinking-water',
  drinkingWaterWatchUrl: 'http://gadrinkingwater.net/DWWPUB/',
  routes: [
    {
      label: 'Georgia EPD Drinking Water Program',
      url: 'https://epd.georgia.gov/watershed-protection-branch/drinking-water',
      type: 'State source hub',
      status: 'HTTP 200 verified',
      use: 'Reference page for public water-system rules, permitting, consumer confidence, lead/copper, water-loss, and compliance-report routes.'
    },
    {
      label: 'Drinking Water Watch',
      url: 'http://gadrinkingwater.net/DWWPUB/',
      type: 'Public lookup route',
      status: 'Linked by EPD',
      use: 'Manual/low-volume route for water-system detail lookup; do not scrape or present compliance facts until the exact PWS record is opened and verified.'
    },
    {
      label: 'Annual PWS Compliance Report',
      url: 'https://epd.georgia.gov/document/document/2021-georgia-epd-annual-pws-compliance-reportpdf/download',
      type: 'Public PDF report',
      status: 'PDF reachable',
      use: 'Statewide compliance-report evidence path; parse only with report year, page/table citation, and local PWSID cross-check.'
    },
    {
      label: 'PWS Violations Appendix',
      url: 'https://epd.georgia.gov/document/document/2021-georgia-epd-pws-violations-appendix-annual-compliance-reportpdf/download',
      type: 'Public PDF appendix',
      status: 'PDF reachable',
      use: 'Appendix route for manual QA before any violation-related text is allowed in the app.'
    }
  ],
  normalizedShape: [
    'pwsId',
    'systemName',
    'reportYear',
    'stateReportUrl',
    'drinkingWaterWatchUrl',
    'tableOrPageCitation',
    'retrievedAt',
    'verificationStatus'
  ],
  nextActions: [
    'Open Drinking Water Watch manually for GA0330004 / WAYNESBORO and confirm it matches EPA ECHO SDWIS identity before displaying state-level facts.',
    'Index the latest Georgia EPD annual compliance report and appendix; do not rely on the 2021 PDF for current compliance posture.',
    'If report rows are parsed, display only source-labeled identity/report metadata first; keep violation or water-quality interpretation out until each record is manually verified.'
  ],
  caveat: 'Georgia EPD routes add a state verification path for drinking-water context. They are not live utility telemetry, not a water-quality claim, and not proof of current compliance/noncompliance without exact PWSID, report year, page/table citation, and manual QA.'
};
