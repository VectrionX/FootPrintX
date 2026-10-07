import { DorkCategory, Engine, InvestigationContext } from '../types';

export interface Provider {
  name: 'Google' | 'Bing' | 'Yandex';
  host: string;
}

export interface InvestigationExport {
  format: 'footprintx-investigation-v1';
  exportedAt: string;
  case: InvestigationContext;
  queryCategories: Array<{
    title: string;
    queries: Array<{ title: string; query: string; provider: Provider['name']; purpose: string; inputProvenance: string; limitation: string }>;
  }>;
  notice: string;
}

const providers: Record<Engine, Provider> = {
  [Engine.GOOGLE]: { name: 'Google', host: 'www.google.com' },
  [Engine.BING]: { name: 'Bing', host: 'www.bing.com' },
  [Engine.YANDEX]: { name: 'Yandex', host: 'yandex.com' },
  [Engine.ALL]: { name: 'Google', host: 'www.google.com' },
};

export const getProvider = (engine: Engine): Provider => providers[engine];

export const buildProviderUrl = (query: string, engine: Engine): string => {
  const provider = getProvider(engine);
  const parameter = provider.name === 'Yandex' ? 'text' : 'q';
  return `https://${provider.host}/search?${parameter}=${encodeURIComponent(query)}`;
};

export const isInvestigationReady = (context: InvestigationContext): boolean => (
  Boolean(context.caseName.trim())
  && Boolean(context.authorization.trim())
  && Boolean(context.scope.trim())
  && context.authorizedUseConfirmed
);

export const buildInvestigationExport = (
  context: InvestigationContext,
  categories: DorkCategory[],
  exportedAt = new Date().toISOString(),
): InvestigationExport => ({
  format: 'footprintx-investigation-v1',
  exportedAt,
  case: context,
  queryCategories: categories.map((category) => ({
    title: category.title,
    queries: category.dorks.map((dork) => ({
      title: dork.title,
      query: dork.query,
      provider: getProvider(dork.engine).name,
      purpose: dork.purpose,
      inputProvenance: dork.inputProvenance,
      limitation: dork.limitation,
    })),
  })),
  notice: 'This export contains locally prepared search query previews. FootprintX did not run searches or collect results.',
});

export const safeExportFilename = (caseName: string): string => {
  const slug = caseName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'investigation';
  return `footprintx-${slug}.json`;
};
