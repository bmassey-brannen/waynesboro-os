export const kpis = [
  { label: 'Population', value: 'No verified value', mom: 'n/a', yoy: 'source pending', trend: [0, 0, 0, 0, 0, 0, 0, 0], sourceStatus: 'unavailable' },
  { label: 'Population Growth', value: 'Source pending', mom: 'n/a', yoy: 'source pending', trend: [0, 0, 0, 0, 0, 0, 0, 0], sourceStatus: 'unavailable' },
  { label: 'Median Income', value: 'No verified value', mom: 'n/a', yoy: 'source pending', trend: [0, 0, 0, 0, 0, 0, 0, 0], sourceStatus: 'unavailable' },
  { label: 'Unemployment', value: 'No verified value', mom: 'n/a', yoy: 'source pending', trend: [0, 0, 0, 0, 0, 0, 0, 0], inverse: true, sourceStatus: 'unavailable' }
];

export const economicPipeline = [
  { prospect: 'Official development-project index', industry: 'Public records', jobs: 'Withheld', investment: 'Withheld', status: 'Awaiting agenda/budget source', probability: null },
  { prospect: 'Business-license/opening signal', industry: 'Public records', jobs: 'Withheld', investment: 'Withheld', status: 'Awaiting official source', probability: null },
  { prospect: 'County/state DRI cross-check', industry: 'Public records', jobs: 'Withheld', investment: 'Withheld', status: 'Source-route only', probability: null }
];

export const downtownProperties = [
  { name: 'Official property locator route', type: 'Commercial property source', occupancy: 'Not inferred', owner: 'Not displayed', footTraffic: null, status: 'Route indexed' },
  { name: 'Downtown business directory route', type: 'Business listing source', occupancy: 'Not inferred', owner: 'Not displayed', footTraffic: null, status: 'Normalization pending' },
  { name: 'qPublic parcel export route', type: 'Parcel evidence source', occupancy: 'Not inferred', owner: 'Masked for public preview', footTraffic: null, status: 'Manual terms review' }
];

export const beautificationFactors = [
  { factor: 'Code-enforcement records', score: null, signal: 'Public aggregate source needed before showing scores or trends.' },
  { factor: 'Vacancy context', score: null, signal: 'Use ACS/HUD aggregate context only; do not infer parcel vacancy from map rows.' },
  { factor: 'Official project records', score: null, signal: 'Agenda, budget, contract, grant, and minutes links gate any project claim.' },
  { factor: 'Field observations', score: null, signal: 'Requires dated source notes/photos before becoming a public finding.' }
];

export const projects = [
  { name: 'Public project source gate', owner: 'Official records needed', budget: 'Not shown', status: 'Withheld', completion: null, impact: 'Unknown', priority: 'Source first' },
  { name: 'Budget / contract cross-check', owner: 'Official records needed', budget: 'Not shown', status: 'Withheld', completion: null, impact: 'Unknown', priority: 'Source first' },
  { name: 'Agenda / minutes cross-check', owner: 'Official records needed', budget: 'Not shown', status: 'Withheld', completion: null, impact: 'Unknown', priority: 'Source first' }
];

export const infrastructure = [
  { system: 'Roads', health: null, risk: 'No public health score shown until official records are attached.', next: 'Index public works / GDOT source routes' },
  { system: 'Water', health: null, risk: 'No public health score shown until official records are attached.', next: 'Cross-check EPD, water system, and city notices' },
  { system: 'Drainage / sewer', health: null, risk: 'No public health score shown until official records are attached.', next: 'Use official reports and public meeting packets only' },
  { system: 'Capital projects', health: null, risk: 'No public health score shown until official records are attached.', next: 'Tie each item to budget, contract, grant, or minutes evidence' }
];

export const safety = [
  { metric: 'Police incidents', value: 'Withheld', trend: 'official aggregate needed', severity: 'neutral' },
  { metric: 'Fire incidents', value: 'Withheld', trend: 'official aggregate needed', severity: 'neutral' },
  { metric: 'EMS calls', value: 'Withheld', trend: 'official aggregate needed', severity: 'neutral' },
  { metric: 'Response time', value: 'Withheld', trend: 'official aggregate needed', severity: 'neutral' }
];

export const housing = [
  { zone: 'Citywide ACS housing context', heat: null, note: 'Survey estimates only; not parcel condition, vacancy, or eligibility records.' },
  { zone: 'Downtown parcel evidence', heat: null, note: 'Use only with permitted exports and official source-route review.' },
  { zone: 'Affordability / DCA source route', heat: null, note: 'Cite state/local program sources before project-level claims.' }
];

export const mapLayers = [
  'Official source routes', 'ACS context', 'Public documents', 'Parcels with caveats', 'Agenda links', 'Budgets/finance', 'OpenStreetMap context'
];

export const councilBrief = [
  'Use posted agendas, minutes, packets, budget documents, and official source links before quoting or acting on a dashboard item.',
  'ACS/Data Commons values are planning baselines with dates and caveats, not live city telemetry or household-level records.',
  'Vacancy, project, infrastructure, safety, and owner-specific claims stay withheld until attached to official aggregate records or approved public exports.',
  'The public dashboard should help residents ask better source-backed questions, not publish unsupported scores or accusations.'
];

export const integrationRoadmap = ['Census / ACS', 'Data Commons', 'City Agenda Center', 'County public documents', 'Georgia DCA', 'GDOT', 'NWS', 'OpenStreetMap', 'qPublic terms-reviewed exports'];
