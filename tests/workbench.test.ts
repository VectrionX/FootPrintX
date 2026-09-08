import { describe, expect, it } from 'vitest';
import { Engine, type DorkCategory } from '../types';
import {
  buildInvestigationExport,
  buildProviderUrl,
  getProvider,
  isInvestigationReady,
  safeExportFilename,
} from '../services/workbench';

const categories: DorkCategory[] = [{
  id: 'public-mentions',
  title: 'Public mentions',
  explanation: 'Review publicly indexed references.',
  dorks: [{
    id: 'mention',
    title: 'Exact mention',
    description: 'A query preview.',
    query: '"example"',
    engine: Engine.GOOGLE,
  }],
}];

describe('investigation readiness', () => {
  it('requires a case, authorization basis, scope, and acknowledgement', () => {
    expect(isInvestigationReady({ caseName: 'Vendor review', authorization: '', scope: 'example.com', notes: '', authorizedUseConfirmed: true })).toBe(false);
    expect(isInvestigationReady({ caseName: 'Vendor review', authorization: 'Written authorization', scope: 'example.com', notes: '', authorizedUseConfirmed: false })).toBe(false);
    expect(isInvestigationReady({ caseName: 'Vendor review', authorization: 'Written authorization', scope: 'example.com', notes: '', authorizedUseConfirmed: true })).toBe(true);
  });
});

describe('provider navigation', () => {
  it('maps a query to its disclosed provider URL without opening it', () => {
    expect(getProvider(Engine.BING)).toEqual({ name: 'Bing', host: 'www.bing.com' });
    expect(buildProviderUrl('site:example.com "report"', Engine.BING)).toBe('https://www.bing.com/search?q=site%3Aexample.com%20%22report%22');
  });
});

describe('local export', () => {
  it('creates a structured local case export with query previews', () => {
    const exported = buildInvestigationExport(
      { caseName: 'Vendor review', authorization: 'Written authorization', scope: 'example.com', notes: 'Contact through counsel.', authorizedUseConfirmed: true },
      categories,
      '2026-09-06T12:00:00.000Z',
    );

    expect(exported).toMatchObject({
      format: 'footprintx-investigation-v1',
      exportedAt: '2026-09-06T12:00:00.000Z',
      case: { caseName: 'Vendor review', scope: 'example.com' },
    });
    expect(exported.queryCategories[0].queries[0]).toEqual({ title: 'Exact mention', query: '"example"', provider: 'Google' });
  });

  it('uses a safe filename when a case contains punctuation', () => {
    expect(safeExportFilename('ACME / EU: review')).toBe('footprintx-acme-eu-review.json');
  });
});
