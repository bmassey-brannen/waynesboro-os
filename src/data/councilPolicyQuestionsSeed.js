export const councilPolicyQuestionsSeed = {
  source: {
    name: 'City of Waynesboro Code of Ordinances / Municode Library',
    url: 'https://library.municode.com/ga/waynesboro/codes/code_of_ordinances',
    checkedAt: '2026-06-01',
    accessMethod: 'Public web library; citation-only manual review path. Do not scrape aggressively or present legal advice.',
    status: 'HTTP 200 route verified'
  },
  posture: 'Policy queue only: these are questions The Council should ask against official code, agendas, maps, permits, and staff records before making recommendations.',
  questions: [
    {
      lane: 'Vacancy / nuisance',
      question: 'Which ordinance sections define nuisance, unsafe structure, weeds, or vacant-property triggers, and which department owns the enforcement workflow?',
      evidenceNeeded: 'Municode section citation plus city code-enforcement or public-works record route',
      gate: 'No blight score or property claim until parcel/export and enforcement aggregates are sourced.'
    },
    {
      lane: 'Downtown signs / facades',
      question: 'Which sign, facade, historic-district, or downtown design rules affect storefront rehabilitation and business visibility?',
      evidenceNeeded: 'Municode citation cross-checked against City Maps, DDA records, and Community Development PDFs',
      gate: 'No compliance claim until section title, effective date, geography, and map layer are verified.'
    },
    {
      lane: 'Permits / redevelopment',
      question: 'Where do building permits, planning approvals, zoning appeals, and licenses move from intake to public record?',
      evidenceNeeded: 'City permit/planning pages, Agenda Center packets, open-records route, and any published aggregate reports',
      gate: 'Use as workflow routing only until counts and approval status come from official records.'
    },
    {
      lane: 'Council brief discipline',
      question: 'What should be framed as a policy question rather than an AI recommendation?',
      evidenceNeeded: 'Verified source label, geography, date, and manual review note for each cited law/document',
      gate: 'The Council may prioritize research questions, not issue legal or enforcement conclusions.'
    }
  ]
};
