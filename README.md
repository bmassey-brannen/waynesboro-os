# Waynesboro OS

Waynesboro OS is a public-facing civic evidence dashboard for Waynesboro, Georgia. It is designed to help residents and local observers start from official meeting routes, source links, and clearly labeled public baselines instead of rumors, unsupported scores, or private records.

## Public posture

- Static Astro site with React components.
- No public backend, chat box, visitor prompt input, or client-side LLM call.
- No secrets or credentials are required in the browser.
- Data shown as fact should be source-labeled public information.
- Source pending lanes are presented as verification queues, not claims.
- Project, safety, infrastructure, vacancy, owner-specific, and operational-score claims stay withheld unless tied to official records or approved public exports.

## Main routes

- `/` — executive overview, meeting calendar, source-backed KPI baselines, and public-use guide.
- `/sources` — official source registry and refresh posture.
- `/economic` — public economic source routes and ACS/Data Commons context.
- `/downtown` — downtown source checks and parcel/map caveats.
- `/operations` — public works, safety, utilities, and housing source gates.
- `/council` — meeting/source route context.
- `/briefing` — public briefing-style summary of source-backed lanes.

## Data refresh posture

Recurring updates should be low-volume and source respectful:

- Agenda Center + public documents: daily rebuild at 6:30 AM Eastern via GitHub Actions, with manual/day-of-meeting checks when needed.
- Data Commons / Census Reporter baselines: monthly or before a major public refresh.
- NWS forecast/alerts: hourly only if weather remains visible; otherwise on page build/manual snapshot.
- Parcels/downtown evidence: manual refresh after permitted qPublic/export updates; never infer vacancy or occupancy from parcel rows alone.
- Operational scores/project claims: not published until attached to official reports, budgets, minutes, contracts, grants, or verified aggregate records.

## Development

```bash
npm install
npm run build
npm run audit:public
npm run test:civic-ranking
```

Optional source refresh commands:

```bash
npm run fetch:docs
npm run refresh:public-data
```

`npm run refresh:public-data` may require local API credentials for specific connectors. Keep `.env` and `.env.*` files out of git.

## Public release checks

Before pushing a public release:

```bash
npm run build
npm run audit:public
git status --short
```

See `PUBLICATION_REVIEW.md` for the public-release checklist and prompt-injection posture.
