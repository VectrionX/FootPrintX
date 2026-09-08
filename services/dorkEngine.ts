import { DorkCategory, Engine } from '../types';

const quoted = (value: string) => `"${value.trim()}"`;

export const generateInstaDorks = (username: string): DorkCategory[] => {
  const handle = username.replace('@', '').trim();
  if (!handle) return [];
  return [{
    id: 'instagram-public-references',
    title: 'Public Instagram references',
    explanation: 'Query previews for publicly indexed references; FootprintX does not retrieve any content.',
    dorks: [
      { id: 'instagram-profile', title: 'Profile reference', query: `site:instagram.com ${quoted(handle)}`, description: 'Preview a search for publicly indexed profile references.', engine: Engine.GOOGLE },
      { id: 'instagram-mentions', title: 'External handle mentions', query: `${quoted(`@${handle}`)} -site:instagram.com`, description: 'Preview a search for public mentions outside Instagram.', engine: Engine.BING },
    ],
  }];
};

export const generateXDorks = (username: string): DorkCategory[] => {
  const handle = username.replace('@', '').trim();
  if (!handle) return [];
  return [{
    id: 'x-public-references',
    title: 'Public X references',
    explanation: 'Query previews for indexed public references only.',
    dorks: [
      { id: 'x-profile', title: 'Profile reference', query: `site:x.com ${quoted(handle)}`, description: 'Preview a search for publicly indexed X profile references.', engine: Engine.GOOGLE },
      { id: 'x-mentions', title: 'External handle mentions', query: `${quoted(`@${handle}`)} -site:x.com`, description: 'Preview a search for public mentions outside X.', engine: Engine.BING },
    ],
  }];
};

export const generateLinkedInDorks = (name: string, company = ''): DorkCategory[] => {
  const fullName = name.trim();
  if (!fullName) return [];
  const companyTerm = company.trim() ? ` ${quoted(company)}` : '';
  return [{
    id: 'professional-public-references',
    title: 'Professional public references',
    explanation: 'Query previews for public professional references, optionally narrowed by an organization.',
    dorks: [
      { id: 'linkedin-profile', title: 'Public profile reference', query: `site:linkedin.com/in ${quoted(fullName)}${companyTerm}`, description: 'Preview a search for publicly indexed LinkedIn profile references.', engine: Engine.GOOGLE },
      { id: 'professional-mention', title: 'Public organization mention', query: `${quoted(fullName)}${companyTerm}`, description: 'Preview a broader public web search for the stated context.', engine: Engine.BING },
    ],
  }];
};

export const generateEmailDorks = (email: string): DorkCategory[] => {
  const address = email.trim();
  if (!address || !address.includes('@')) return [];
  const domain = address.split('@')[1] ?? '';
  return [{
    id: 'email-public-references',
    title: 'Public email references',
    explanation: 'Query previews for public references to an authorized address; no breach, credential, or private-source collection.',
    dorks: [
      { id: 'email-exact', title: 'Exact public reference', query: quoted(address), description: 'Preview an exact-match search of publicly indexed pages.', engine: Engine.GOOGLE },
      { id: 'email-domain-context', title: 'Organization context', query: `${quoted(address)} site:${domain}`, description: 'Preview a search for public references within the email domain.', engine: Engine.BING },
    ],
  }];
};

export const generatePersonDorks = (firstName: string, lastName: string, options: { variations: boolean }): DorkCategory[] => {
  const first = firstName.trim();
  const last = lastName.trim();
  if (!first || !last) return [];
  const fullName = `${first} ${last}`;
  const categories: DorkCategory[] = [{
    id: 'person-public-references',
    title: 'Public identity references',
    explanation: 'Query previews intended only for an authorized investigation scope.',
    dorks: [
      { id: 'person-exact', title: 'Exact name reference', query: quoted(fullName), description: 'Preview an exact-name search of publicly indexed pages.', engine: Engine.GOOGLE },
      { id: 'person-professional', title: 'Professional reference', query: `${quoted(fullName)} site:linkedin.com`, description: 'Preview a search for public professional references.', engine: Engine.BING },
    ],
  }];
  if (options.variations) {
    categories.push({
      id: 'person-variation',
      title: 'Name variation',
      explanation: 'A limited name-format preview, not identity resolution or profiling.',
      dorks: [{ id: 'person-initial', title: 'Initial variation', query: `"${first.charAt(0)}. ${last}"`, description: 'Preview a public search for a first-initial variation.', engine: Engine.GOOGLE }],
    });
  }
  return categories;
};
