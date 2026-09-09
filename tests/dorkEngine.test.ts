import { describe, expect, it } from 'vitest';
import { Engine } from '../types';
import { generateEmailDorks, generateInstaDorks, generateLinkedInDorks, generatePersonDorks, generateXDorks } from '../services/dorkEngine';

const queries = (categories: ReturnType<typeof generateInstaDorks>) => categories.flatMap((category) => category.dorks);
const supportedProviders = [Engine.GOOGLE, Engine.BING, Engine.YANDEX];
const unsafeQueryLanguage = /breach|credential|password|exploit|login|private(?:[-_ ]access)?|scrap(?:e|ing|ed)?|dump|leak|unauthori[sz](?:ed|ation)|collect(?:ion|ed|ing)?|harvest|crawl/i;

describe('advanced local query preparation', () => {
  it('prepares distinct, platform-specific Instagram queries across supported providers', () => {
    const prepared = queries(generateInstaDorks('@northwind'));
    expect(prepared.map((dork) => dork.engine)).toEqual(expect.arrayContaining([Engine.GOOGLE, Engine.BING, Engine.YANDEX]));
    expect(prepared.some((dork) => dork.query.includes('site:instagram.com/northwind'))).toBe(true);
    expect(prepared.some((dork) => dork.query.includes('"northwind"') && dork.query.includes('-site:instagram.com'))).toBe(true);
    expect(prepared.length).toBeGreaterThan(4);
    expect(prepared.every((dork) => dork.purpose && dork.inputProvenance && dork.limitation)).toBe(true);
  });
  it('keeps every supported query family safe across every provider', () => {
    const families = [
      queries(generateInstaDorks('northwind')),
      queries(generateXDorks('northwind')),
      queries(generateLinkedInDorks('Ada Lovelace', 'Northwind Labs')),
      queries(generateEmailDorks('ada@northwind.example')),
      queries(generatePersonDorks('Ada', 'Lovelace', { variations: true })),
    ];

    for (const prepared of families) {
      expect(prepared.length).toBeGreaterThan(0);
      expect(new Set(prepared.map((dork) => dork.engine))).toEqual(new Set(supportedProviders));
      expect(prepared.every((dork) => !unsafeQueryLanguage.test(dork.query))).toBe(true);
    }
  });

  it('uses supplied organization context to prepare useful professional-reference pivots', () => {
    const prepared = queries(generateLinkedInDorks('Ada Lovelace', 'Northwind Labs'));
    expect(prepared.map((dork) => dork.engine)).toEqual(expect.arrayContaining([Engine.GOOGLE, Engine.BING, Engine.YANDEX]));
    expect(prepared.some((dork) => dork.query.includes('site:linkedin.com/in'))).toBe(true);
    expect(prepared.some((dork) => dork.query.includes('site:northwind'))).toBe(false);
    expect(prepared.some((dork) => dork.query.includes('"Northwind Labs"'))).toBe(true);
  });

  it('keeps email and person investigations limited to public references without credential or breach queries', () => {
    const prepared = [
      ...queries(generateEmailDorks('ada@northwind.example')),
      ...queries(generatePersonDorks('Ada', 'Lovelace', { variations: true })),
    ];
    expect(prepared.length).toBeGreaterThan(5);
    expect(prepared.some((dork) => /password|credential|breach|leak/i.test(dork.query))).toBe(false);
    expect(prepared.some((dork) => dork.engine === Engine.YANDEX)).toBe(true);
  });
  it('prepares differentiated X handle and external-reference pivots', () => {
    const prepared = queries(generateXDorks('@northwind'));
    expect(prepared.length).toBeGreaterThan(3);
    expect(prepared.some((dork) => dork.query.includes('site:x.com/northwind'))).toBe(true);
    expect(prepared.some((dork) => dork.query.includes('-site:x.com'))).toBe(true);
  });
});
