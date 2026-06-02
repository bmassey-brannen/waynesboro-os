export const publicationBaselineSeed = {
  generatedAt: '2026-06-01T22:44:40Z',
  publicPosture: 'public-snapshot',
  claimPolicy: 'Only source-labeled public observations are presented as facts. Verification-queue lanes may describe the source needed, but should not show mock counts, demo scores, accusations, or unsupported project rows.',
  snapshotFile: '/baselines/waynesboro-baseline-2026-06-01.json',
  baselines: [
    {
      lane: 'Population / income / housing',
      source: 'Data Commons cached public observations',
      cadence: 'Refresh monthly after ACS/Data Commons updates; manual spot-check before public release.',
      status: 'baseline snapshot attached'
    },
    {
      lane: 'Official agendas / minutes / finance links',
      source: 'City Agenda Center and Burke County public document pages',
      cadence: 'Refresh daily during publication prep, then weekly plus day-of-meeting checks.',
      status: 'metadata snapshot attached'
    },
    {
      lane: 'Weather / active alerts',
      source: 'National Weather Service public API',
      cadence: 'Refresh hourly only if the public dashboard keeps weather visible; otherwise refresh on page build.',
      status: 'cached public API snapshot'
    },
    {
      lane: 'Parcels / downtown map',
      source: 'qPublic CSV sample and official city map routes',
      cadence: 'Manual refresh after new qPublic export or source-route verification; never infer vacancy/occupancy from parcel rows alone.',
      status: 'partial evidence layer'
    }
  ],
  withheldPublicLanes: [
    'Unsupported project pipeline rows',
    'Demo business/license counts',
    'Unverified public-safety incident counts',
    'Unverified infrastructure health scores',
    'Unverified housing heat scores',
    'Campaign language',
    'Personal or internal branding'
  ],
  refreshSchedule: [
    { lane: 'Agenda Center + public documents', cadence: 'Daily at 6:30 AM ET; extra check 4 hours before listed meetings', owner: 'public connector job', publicUse: 'meeting calendar, packets, decision log' },
    { lane: 'Data Commons / Census Reporter baselines', cadence: 'Monthly on first Monday', owner: 'baseline connector job', publicUse: 'executive KPI baseline cards' },
    { lane: 'NWS forecast and active alerts', cadence: 'Hourly when weather module is published', owner: 'weather connector job', publicUse: 'event and public-works readiness context' },
    { lane: 'Downtown parcel/map evidence', cadence: 'Manual snapshot after approved qPublic/export update', owner: 'source review', publicUse: 'parcel evidence map only' },
    { lane: 'Operational scores and project claims', cadence: 'Do not publish until attached to official reports or verified records', owner: 'source gate', publicUse: 'withheld from public facts' }
  ]
};
