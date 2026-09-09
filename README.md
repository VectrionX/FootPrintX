# FootprintX

FootprintX is a **client-side OSINT search-query workbench** for authorized, scoped investigations. It prepares query previews locally; it is **not** EASM, a scanner, a crawler, a monitoring service, or a live-data collection product.

## What it does

- Records a local case name, authorization basis, approved scope, and investigator notes.
- Requires an authorized-use acknowledgement before query previews are prepared.
- Produces advanced but bounded, public-reference search-query previews for each supported input across Google, Bing, and Yandex. Each query states its purpose; no credential, breach, private-source, exploit, or automated-collection query is generated.
- Lets the investigator copy a query, export the current local record as JSON, or deliberately open a named provider after a confirmation screen.

## What it does not do

- Run a query automatically.
- Scan, crawl, enumerate, log in to, or contact target systems.
- Retrieve, store, monitor, correlate, or assess provider search results.
- Send case data to a FootprintX server. There is no server component.
- Include breach, credential, private-source, or exploit collection workflows.

## Data and external-provider notice

Case fields and query previews remain in the current browser tab unless you choose to export them. **Export** creates a local JSON download. **Copy** places a query on your local clipboard. **Review & open** first displays the exact query and destination; only after a second deliberate click is the query sent to Google, Bing, or Yandex in a new tab. Those providers' terms, tracking, cookies, and privacy policies apply.

Use only with documented authority and within the defined scope. Public search results are not verification of identity, ownership, or risk.

## Local development

```bash
npm install
npm run dev
```

The local Vite server defaults to port `3000`.

## Quality checks

The CI/release gate uses the committed lockfile and runs a production-dependency audit:

```bash
npm ci
npm run verify
```

`verify` runs tests, TypeScript checking, the production build, and `npm audit --omit=dev --audit-level=high`. The test suite covers the safety-critical local workbench helpers: authorization readiness, provider URL construction, and export structure/filenames.
