import assert from 'node:assert/strict';
import { rankCivicSources, classifyCivicSource, canPromoteClaim } from './civicSourceRanking.js';

const ranked = rankCivicSources('budget audit city council minutes', [
  {
    url: 'https://www.facebook.com/cityofwaynesboro/posts/123',
    title: 'City budget discussion',
    snippet: 'Some comments about the audit.',
    date: '2024-06-01',
    geography: 'Waynesboro, GA'
  },
  {
    url: 'https://www.cityofwaynesboro.org/AgendaCenter/ViewFile/Agenda/_06012024-123',
    title: 'City Council Agenda Packet and Budget Audit',
    snippet: 'Official agenda packet with budget audit attachment.',
    date: '2024-06-01',
    geography: 'Waynesboro, GA'
  },
  {
    url: 'https://random-local-directory.example/waynesboro-budget',
    title: 'Waynesboro budget info',
    snippet: 'Directory page copied from somewhere.',
    date: '2024-06-01',
    geography: 'Waynesboro, GA'
  }
]);

assert.equal(ranked[0].url, 'https://www.cityofwaynesboro.org/AgendaCenter/ViewFile/Agenda/_06012024-123');
assert.equal(ranked[0].sourceType, 'official-local');
assert.ok(ranked[0].score > ranked[1].score);
assert.ok(ranked[0].reasons.includes('official-domain'));
assert.ok(ranked[0].reasons.includes('public-record-keyword'));

const stateSource = classifyCivicSource('https://sos.ga.gov/search/business');
assert.equal(stateSource.sourceType, 'official-state');
assert.ok(stateSource.reasons.includes('official-domain'));

const rootStateSource = classifyCivicSource('https://ga.gov/agency-directory');
assert.equal(rootStateSource.sourceType, 'official-state');

const duplicated = rankCivicSources('audit report', [
  { url: 'https://cityofwaynesboro.org/audit-a.pdf', title: 'Audit report', snippet: 'Same audit text', date: '2024', geography: 'Waynesboro, GA' },
  { url: 'https://cityofwaynesboro.org/audit-b.pdf', title: 'Audit report', snippet: 'Same audit text', date: '2024', geography: 'Waynesboro, GA' }
]);
assert.ok(duplicated[1].reasons.includes('duplicate-content-penalty'));
assert.ok(duplicated[0].score > duplicated[1].score);

assert.equal(canPromoteClaim({ sourceUrl: 'https://cityofwaynesboro.org/audit.pdf', date: '2024', geography: 'Waynesboro, GA' }), true);
assert.equal(canPromoteClaim({ sourceUrl: 'https://cityofwaynesboro.org/audit.pdf', date: '', geography: 'Waynesboro, GA' }), false);
assert.equal(canPromoteClaim({ sourceUrl: '', date: '2024', geography: 'Waynesboro, GA' }), false);

console.log('civicSourceRanking tests passed');
