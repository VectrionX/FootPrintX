FootPrintX release-candidate recertification

Base candidate: d72a8ff34ddc53ea188a1933e362fb007f871151
Worktree: clean detached recovery worktree for t_d0eac5ed

Remediation
- Removed tracked .task-evidence/t_12d27c86/axe-runtime.json.
- Browser runtime axe evidence now writes to a mkdtempSync directory below the OS temporary directory, never into the repository.
- Added .task-evidence/*/axe-runtime.json to .gitignore as a defense-in-depth guard against accidental reintroduction.
- Applied the only non-breaking npm audit fix available: source-map-js 1.2.1 -> 1.2.2 in package-lock.json. No product dependency or behavior change.

Verification
- npm run typecheck: PASS
- npm run build: PASS (Vite 6.4.3; 1,708 modules)
- npm test: PASS (Vitest 3.2.7; no test files, --passWithNoTests)
- npm run test:browser: PASS (gate, focus, named controls, reduced motion, axe-ready markup, six widths, 200% zoom, one-shot provider egress)
- npm run audit:prod: PASS (0 vulnerabilities)
- git diff --check: PASS
- Post-browser tracked-tree check: PASS; only intended remediation files remain modified/deleted.
- Secret scan: PASS; no private-key or common cloud/token patterns matched tracked source.

Development dependency audit disposition
npm audit reported 11 advisories initially (3 moderate, 6 high, 2 critical). The safe compatible fix reduced this to 10 by updating source-map-js. The remaining advisories require major tool upgrades and were not applied to avoid unverified build/test behavior changes:
- vitest 3.2.7 -> 5.0.3 is required for @vitest/mocker path-traversal and tinypool critical prototype-pollution/RCE advisories; this is a major upgrade.
- tailwindcss 3.4.19 -> 4.3.3 is required for the braces/chokidar/fast-glob/micromatch/postcss-nested/postcss-selector-parser chain; this is a major upgrade.
- Remaining transitive chains: tailwindcss -> chokidar -> braces; tailwindcss -> fast-glob -> micromatch -> braces; tailwindcss -> postcss-nested -> postcss-selector-parser; vitest -> @vitest/mocker and vitest -> tinypool.
- Production dependencies are unaffected by the remaining development-only advisories; production audit is clean.

No push, deployment, or external-system write was performed.
