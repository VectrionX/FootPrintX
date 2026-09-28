# FootPrintX

FootPrintX is a browser-local query preparation tool for authorized, passive OSINT research. It formats search-engine queries from supplied inputs; it does not crawl target infrastructure, call target APIs, collect provider results, correlate identities, or establish attribution.

## Boundaries

- Processing is kept in browser memory during the session.
- No target request is made while entering data, generating queries, or copying a query.
- A provider navigation is a separate, visible user-confirmed action. The selected provider receives the query when that navigation occurs.
- Use only for lawful research with authorization or another valid legal basis. Users remain responsible for provider terms and applicable law.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. The application requires the acknowledgement gate before its controls become available.

## Modules

The current interface prepares query templates for Instagram, X, LinkedIn, email, and person-name research. Generated text is a starting point for analyst review, not evidence of identity, compromise, exposure, or completeness.

## Verification

```bash
npm run build
npm run test:browser
```

The browser checks cover the acknowledgement gate, keyboard focus containment/restoration, reduced-motion CSS, responsive widths, 200% zoom, axe-core checks, provider egress, and the absence of target requests during generation/copy.

## License

MIT License. Copyright (c) 2025 Mohammad Ghanem.
