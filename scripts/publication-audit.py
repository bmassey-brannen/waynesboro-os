#!/usr/bin/env python3
"""Public-release audit for Waynesboro OS.

Checks tracked source files and built dist/ output for obvious secrets and public-hosting hazards.
This is a heuristic gate, not a substitute for human review.
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BINARY_SUFFIXES = {
    '.png', '.ico', '.jpg', '.jpeg', '.webp', '.gif', '.pdf', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.zip', '.gz'
}
SECRET_PATTERNS = [
    ('hardcoded secret assignment', re.compile(r'(?i)(api[_-]?key|secret|token|password|passwd|credential|private[_-]?key)\s*[:=]\s*["\']?([A-Za-z0-9_\-./+=]{16,})')),
    ('bearer token', re.compile(r'(?i)bearer\s+[A-Za-z0-9._\-]{24,}')),
    ('github token', re.compile(r'gh[pousr]_[A-Za-z0-9_]{20,}')),
    ('aws access key', re.compile(r'AKIA[0-9A-Z]{16}')),
    ('private key block', re.compile(r'-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----')),
]
DANGEROUS_CLIENT_PATTERNS = [
    ('dangerouslySetInnerHTML', re.compile(r'dangerouslySetInnerHTML')),
    ('raw innerHTML assignment', re.compile(r'\.innerHTML\s*=')),
    ('eval/new Function', re.compile(r'\beval\s*\(|new\s+Function\s*\(')),
]


def run(cmd: list[str]) -> str:
    return subprocess.check_output(cmd, cwd=ROOT, text=True, stderr=subprocess.DEVNULL)


def tracked_files() -> list[Path]:
    return [ROOT / line for line in run(['git', 'ls-files']).splitlines() if line.strip()]


def dist_files() -> list[Path]:
    dist = ROOT / 'dist'
    if not dist.exists():
        return []
    return [p for p in dist.rglob('*') if p.is_file()]


def is_text_candidate(path: Path) -> bool:
    return path.suffix.lower() not in BINARY_SUFFIXES


def read_text(path: Path) -> str | None:
    if not is_text_candidate(path):
        return None
    try:
        return path.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return None


def scan_patterns(paths: list[Path], patterns: list[tuple[str, re.Pattern[str]]]) -> list[str]:
    findings: list[str] = []
    for path in paths:
        text = read_text(path)
        if text is None:
            continue
        rel = path.relative_to(ROOT)
        for label, pattern in patterns:
            for match in pattern.finditer(text):
                sample = match.group(0).replace('\n', ' ')[:100]
                # Allow empty/placeholder env example keys.
                if str(rel) == '.env.example' and sample.rstrip().endswith('='):
                    continue
                # Allow environment variable reads, not literal secrets.
                if 'process.env.' in sample or 'import.meta.env' in sample:
                    continue
                line = text.count('\n', 0, match.start()) + 1
                findings.append(f'{rel}:{line}: {label}: {sample}')
    return findings


def main() -> int:
    tracked = tracked_files()
    env_tracked = [str(p.relative_to(ROOT)) for p in tracked if p.name.startswith('.env') and p.name != '.env.example']
    secret_findings = scan_patterns(tracked + dist_files(), SECRET_PATTERNS)
    client_findings = scan_patterns([p for p in tracked if str(p.relative_to(ROOT)).startswith('src/')], DANGEROUS_CLIENT_PATTERNS)

    print('Waynesboro OS public-release audit')
    print(f'- tracked files checked: {len(tracked)}')
    print(f'- dist files checked: {len(dist_files())}')

    failed = False
    if env_tracked:
        failed = True
        print('\nFAIL: tracked env files:')
        for item in env_tracked:
            print(f'  - {item}')

    if secret_findings:
        failed = True
        print('\nFAIL: possible secrets in tracked/dist files:')
        for item in secret_findings[:50]:
            print(f'  - {item}')

    if client_findings:
        failed = True
        print('\nFAIL: risky client rendering/execution patterns:')
        for item in client_findings[:50]:
            print(f'  - {item}')

    if failed:
        print('\nAudit failed. Fix findings before public push.')
        return 1

    print('\nPASS: no tracked env files, obvious secrets, or risky client rendering patterns found.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
