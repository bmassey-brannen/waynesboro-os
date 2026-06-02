# Public release review — Waynesboro OS

Waynesboro OS is intended to be a public-presentable civic intelligence demo. Before publishing to GitHub Pages or any public host, use this checklist.

## Hard no-go items

- Do not commit `.env`, `.env.local`, API keys, tokens, credentials, private keys, or service account files.
- Do not publish private local notes, scraped private data, voter-level data, confidential records, non-public exports, or private operational telemetry.
- Do not display synthetic/mock placeholders as verified public facts.
- Do not expose any AI/system prompt, private agent instructions, or hidden internal workflow notes.

## Current public posture

- Static Astro site: no public backend and no server-side secrets served to the browser.
- Public pages are route-level views: Executive, Sources, Economic, Downtown + Projects, Operations, Council.
- Data Commons keys are used only by server-side fetch scripts to generate public snapshot data; the keys stay in `.env.local` and are ignored by git.
- The UI labels verified baselines, source routes, synthetic placeholders, source pending lanes, and no-scraping guardrails.

## Prompt-injection posture

The public site should be treated as a static document/interface, not a live agent.

Current safe posture:

- No public prompt input form.
- No chat box.
- No client-side LLM call.
- No `dangerouslySetInnerHTML` rendering path.
- No browser-exposed API key.
- No automatic execution of instructions from source documents or external links.

If a future AI brief/chat is added:

1. Keep all LLM calls server-side only.
2. Treat source documents, URLs, PDFs, agendas, minutes, comments, and user text as untrusted data.
3. Wrap retrieved text as quoted evidence, never executable instructions.
4. Use a source-gated schema: `claim`, `source_url`, `source_date`, `confidence`, `caveat`, `open_question`.
5. Refuse requests to reveal prompts, keys, private notes, hidden system messages, or deployment config.
6. Do not allow tool execution, file access, repo access, or outbound posting from a public visitor session.
7. Log source IDs and generated claims separately for auditability.

## Pre-publication command checklist

```bash
# Build the static site
npm run build

# Check what git would publish
git status --short
git ls-files | grep -Ei '(^|/)(\.env|secret|token|credential|private|id_rsa|id_ed25519|\.pem|\.p12)'

# Scan source/dist for obvious secret patterns before push
python3 scripts/publication-audit.py
```

## GitHub Pages notes

This repo includes `.github/workflows/deploy-github-pages.yml`.

For a normal project Pages repo such as `waynesboro-os`, the workflow builds with:

```text
ASTRO_BASE: /waynesboro-os
```

If this becomes a user/org Pages repo or gets a custom domain, set `ASTRO_BASE=/` in repository variables/environment and update the workflow accordingly.
