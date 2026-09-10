import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const meta = (property: string) => html.match(new RegExp(`<meta\\s+property="${property}"\\s+content="([^"]+)"`, 'i'))?.[1];

describe('FootprintX static indexability metadata', () => {
  it('publishes truthful canonical and social metadata', () => {
    expect(html).toContain('<title>FootprintX | Local OSINT Query Workbench</title>');
    expect(html).toContain('name="description" content="FootprintX is a local OSINT search-query workbench for authorized investigations."');
    expect(html).toContain('<link rel="canonical" href="https://footprintx.vectrionx.com/">');
    expect(meta('og:title')).toBe('FootprintX | Local OSINT Query Workbench');
    expect(meta('og:url')).toBe('https://footprintx.vectrionx.com/');
  });

  it('publishes a minimal accurate application schema', () => {
    expect(html).toContain('"@type":["WebApplication","Product"]');
    expect(html).toContain('"url":"https://footprintx.vectrionx.com/"');
  });

  it('provides an allowed-root sitemap', () => {
    expect(readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8')).toContain('<loc>https://footprintx.vectrionx.com/</loc>');
    expect(readFileSync(resolve(root, 'public/robots.txt'), 'utf8')).toContain('Allow: /');
  });
});
