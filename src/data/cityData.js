export const kpis = [
  { label: 'Population', value: '5,813', mom: '+0.2%', yoy: '+1.1%', trend: [38, 42, 41, 44, 46, 45, 48, 51] },
  { label: 'Population Growth', value: '+1.1%', mom: '+0.1%', yoy: '+0.4%', trend: [22, 24, 25, 29, 31, 34, 36, 39] },
  { label: 'Median Income', value: '$43.8K', mom: '+0.5%', yoy: '+3.4%', trend: [31, 32, 33, 35, 38, 37, 40, 43] },
  { label: 'Unemployment', value: '4.6%', mom: '-0.3%', yoy: '-0.8%', trend: [60, 58, 56, 55, 52, 50, 49, 46], inverse: true },
  { label: 'New Businesses', value: '14', mom: '+3', yoy: '+8', trend: [18, 20, 22, 19, 24, 28, 31, 34] },
  { label: 'Sales Tax Revenue', value: '$418K', mom: '+2.7%', yoy: '+11.0%', trend: [30, 35, 37, 36, 42, 46, 50, 58] },
  { label: 'Property Tax Revenue', value: '$2.9M', mom: '+0.0%', yoy: '+4.2%', trend: [42, 43, 44, 46, 47, 48, 50, 51] },
  { label: 'Building Permits', value: '21', mom: '-4', yoy: '-12%', trend: [62, 58, 55, 50, 43, 39, 34, 30] },
  { label: 'Crime Trend', value: '-6.4%', mom: '-1.1%', yoy: '-6.4%', trend: [55, 54, 50, 51, 47, 43, 42, 39], inverse: true },
  { label: 'Housing Starts', value: '9', mom: '+2', yoy: '+5', trend: [14, 18, 17, 20, 21, 25, 29, 32] },
  { label: 'Downtown Occupancy', value: '87%', mom: '+1.0%', yoy: '+5.0%', trend: [63, 65, 68, 70, 72, 78, 84, 87] },
  { label: 'Beautification Score', value: '72', mom: '+2', yoy: '+9', trend: [48, 51, 54, 58, 61, 66, 70, 72] }
];

export const economicPipeline = [
  { prospect: 'Advanced Ag Components', industry: 'Light Manufacturing', jobs: 86, investment: '$18.5M', status: 'Site visit', probability: 68 },
  { prospect: 'Savannah River Logistics', industry: 'Distribution', jobs: 42, investment: '$7.2M', status: 'Incentive review', probability: 57 },
  { prospect: 'Downtown Food Hall', industry: 'Hospitality', jobs: 24, investment: '$2.1M', status: 'Property control', probability: 49 },
  { prospect: 'Battery Service Annex', industry: 'Industrial Services', jobs: 33, investment: '$4.8M', status: 'Utility due diligence', probability: 41 },
  { prospect: 'Health Clinic Expansion', industry: 'Healthcare', jobs: 18, investment: '$3.4M', status: 'Financing', probability: 62 }
];

export const downtownProperties = [
  { name: 'Liberty Street Block A', type: 'Storefront', occupancy: 'Occupied', owner: 'Local LLC', footTraffic: 73, status: 'Stable' },
  { name: 'Sixth Street Corner', type: 'Retail', occupancy: 'Vacant', owner: 'Out-of-town', footTraffic: 61, status: 'Redevelopment target' },
  { name: 'Old Theater Parcel', type: 'Civic / Mixed-use', occupancy: 'Vacant', owner: 'Private', footTraffic: 84, status: 'Catalyst asset' },
  { name: 'Warehouse Row', type: 'Industrial flex', occupancy: 'Partial', owner: 'Regional', footTraffic: 36, status: 'Adaptive reuse' }
];

export const beautificationFactors = [
  { factor: 'Code violations', score: 58, signal: 'Improving, still concentrated around vacant parcels' },
  { factor: 'Vacant properties', score: 61, signal: 'Vacancy falling downtown, persistent residential drag' },
  { factor: 'Abandoned buildings', score: 47, signal: 'Top visible blight risk' },
  { factor: 'Downtown occupancy', score: 87, signal: 'Strongest positive trend' },
  { factor: 'Landscaping projects', score: 74, signal: 'Main corridors improving' },
  { factor: 'Public art', score: 69, signal: 'Low-cost placemaking opportunity' },
  { factor: 'Streetscape improvements', score: 72, signal: 'Momentum, but inconsistent block to block' }
];

export const projects = [
  { name: 'Downtown Facade Sprint', owner: 'Economic Dev', budget: '$420K', status: 'Active', completion: 42, impact: 'High', priority: 'A' },
  { name: 'Liberty Street Road Diet', owner: 'Public Works', budget: '$1.2M', status: 'Planning', completion: 18, impact: 'Medium', priority: 'B' },
  { name: 'Water Main Renewal Phase II', owner: 'Utilities', budget: '$2.8M', status: 'Procurement', completion: 25, impact: 'High', priority: 'A' },
  { name: 'Vacant Parcel Inventory', owner: 'Planning', budget: '$65K', status: 'Active', completion: 61, impact: 'High', priority: 'A' },
  { name: 'Event Calendar Relaunch', owner: 'Main Street', budget: '$35K', status: 'Blocked', completion: 33, impact: 'Medium', priority: 'C' }
];

export const infrastructure = [
  { system: 'Roads', health: 69, risk: 'Pothole concentration on feeder corridors', next: 'Prioritize resurfacing map' },
  { system: 'Water', health: 74, risk: 'Aging mains in legacy grid', next: 'Phase II bid package' },
  { system: 'Sewer', health: 66, risk: 'Inflow during storms', next: 'Smoke testing' },
  { system: 'Utilities', health: 71, risk: 'Peak summer load', next: 'Usage anomaly report' },
  { system: 'Capital Projects', health: 63, risk: 'Schedule slippage', next: 'Weekly owner dashboard' }
];

export const safety = [
  { metric: 'Police incidents', value: '128', trend: '-4%', severity: 'watch' },
  { metric: 'Fire incidents', value: '17', trend: '+2', severity: 'neutral' },
  { metric: 'EMS calls', value: '91', trend: '+6%', severity: 'watch' },
  { metric: 'Avg response time', value: '6.8m', trend: '-0.4m', severity: 'good' },
  { metric: 'Downtown calls', value: '24', trend: '-9%', severity: 'good' }
];

export const housing = [
  { zone: 'Downtown Edge', heat: 82, note: 'Infill + mixed-use opportunity' },
  { zone: 'North Corridor', heat: 67, note: 'Starter-home demand' },
  { zone: 'Industrial Fringe', heat: 58, note: 'Workforce housing potential' },
  { zone: 'Historic Core', heat: 74, note: 'Renovation-sensitive' }
];

export const mapLayers = [
  'Businesses', 'Vacancies', 'Utilities', 'Projects', 'Crime', 'Zoning', 'Parcels', 'Redevelopment'
];

export const councilBrief = [
  'Sales tax revenue increased 11.0% year-over-year while downtown occupancy improved from 82% to 87%. The city is showing demand-side momentum.',
  'Building permits declined for the third consecutive read and should be investigated before it turns into a housing supply bottleneck.',
  'Beautification score rose to 72, but abandoned buildings remain the highest-drag factor. The first mayoral meeting should ask for the top 20 visible blight assets by owner, tax status, and redevelopment path.',
  'Project risk is not lack of ideas; it is execution visibility. Require every department to update owner, budget, next milestone, and blocker weekly.'
];

export const integrationRoadmap = ['Census', 'Georgia DCA', 'Burke County GIS', 'Tax records', 'Utility systems', 'Permit systems', 'Police data', 'OpenStreetMap'];
