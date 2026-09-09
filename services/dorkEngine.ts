import { DorkCategory, Engine } from '../types';

const quoted = (value: string) => `"${value.trim()}"`;
const withoutAt = (value: string) => value.replace('@', '').trim();

/**
 * Produces public-search query previews only. Queries intentionally exclude
 * credentials, breach sources, private systems, exploit discovery, and automated collection.
 */
export const generateInstaDorks = (username: string): DorkCategory[] => {
  const handle = withoutAt(username);
  if (!handle) return [];
  return [{
    id: 'instagram-public-references', title: 'Instagram: profile and public references',
    explanation: 'Use these pivots to review public, indexed profile references and third-party mentions. They do not retrieve Instagram content.',
    dorks: [
      { id: 'instagram-profile-google', title: 'Profile and indexed posts', query: `site:instagram.com/${handle}`, description: 'Google preview for the supplied public profile path and indexed posts.', engine: Engine.GOOGLE },
      { id: 'instagram-profile-bing', title: 'Profile reference (Bing)', query: `site:instagram.com/${handle}`, description: 'Bing preview for independently indexed public profile references.', engine: Engine.BING },
      { id: 'instagram-profile-yandex', title: 'Profile reference (Yandex)', query: `site:instagram.com/${handle}`, description: 'Yandex preview for independently indexed public profile references.', engine: Engine.YANDEX },
      { id: 'instagram-external-mentions', title: 'External handle mentions', query: `${quoted(`@${handle}`)} -site:instagram.com`, description: 'Public pages that mention the handle outside Instagram.', engine: Engine.BING },
      { id: 'instagram-name-reuse', title: 'Public username reuse', query: `${quoted(handle)} -site:instagram.com -site:x.com`, description: 'Broad public-reference pivot for possible username reuse; verify identity independently.', engine: Engine.GOOGLE },
    ],
  }];
};

export const generateXDorks = (username: string): DorkCategory[] => {
  const handle = withoutAt(username);
  if (!handle) return [];
  return [{
    id: 'x-public-references', title: 'X: profile and public references',
    explanation: 'Use these pivots to review public, indexed X references and third-party mentions. They do not access an account or collect posts.',
    dorks: [
      { id: 'x-profile-google', title: 'Profile and indexed posts', query: `site:x.com/${handle}`, description: 'Google preview for the public X profile path and indexed references.', engine: Engine.GOOGLE },
      { id: 'x-profile-bing', title: 'Profile reference (Bing)', query: `site:x.com/${handle}`, description: 'Bing preview for independently indexed public X references.', engine: Engine.BING },
      { id: 'x-profile-yandex', title: 'Profile reference (Yandex)', query: `site:x.com/${handle}`, description: 'Yandex preview for independently indexed public X references.', engine: Engine.YANDEX },
      { id: 'x-external-mentions', title: 'External handle mentions', query: `${quoted(`@${handle}`)} -site:x.com`, description: 'Public pages that mention the handle outside X.', engine: Engine.BING },
      { id: 'x-username-reuse', title: 'Public username reuse', query: `${quoted(handle)} -site:x.com -site:twitter.com`, description: 'Broad public-reference pivot for possible username reuse; verify identity independently.', engine: Engine.GOOGLE },
    ],
  }];
};

export const generateLinkedInDorks = (name: string, company = ''): DorkCategory[] => {
  const fullName = name.trim();
  if (!fullName) return [];
  const companyTerm = company.trim() ? ` ${quoted(company)}` : '';
  return [{
    id: 'professional-public-references', title: 'Professional identity and organization context',
    explanation: 'Use these public-reference pivots to corroborate an authorized professional context; search results are not identity proof.',
    dorks: [
      { id: 'linkedin-profile-google', title: 'Public profile reference', query: `site:linkedin.com/in ${quoted(fullName)}${companyTerm}`, description: 'Google preview for public LinkedIn profile references.', engine: Engine.GOOGLE },
      { id: 'linkedin-profile-bing', title: 'Public profile reference (Bing)', query: `site:linkedin.com/in ${quoted(fullName)}${companyTerm}`, description: 'Bing preview for public LinkedIn profile references.', engine: Engine.BING },
      { id: 'linkedin-profile-yandex', title: 'Public profile reference (Yandex)', query: `site:linkedin.com/in ${quoted(fullName)}${companyTerm}`, description: 'Yandex preview for public LinkedIn profile references.', engine: Engine.YANDEX },
      { id: 'professional-mentions', title: 'Professional web mentions', query: `${quoted(fullName)}${companyTerm} (speaker OR author OR interview OR conference)`, description: 'Public web references relevant to professional activity.', engine: Engine.GOOGLE },
      { id: 'organization-mentions', title: 'Organization-context mentions', query: `${quoted(fullName)}${companyTerm} -site:linkedin.com`, description: 'Public references outside LinkedIn that use the supplied context.', engine: Engine.BING },
    ],
  }];
};

export const generateEmailDorks = (email: string): DorkCategory[] => {
  const address = email.trim();
  if (!address || !address.includes('@')) return [];
  const domain = address.split('@')[1] ?? '';
  return [{
    id: 'email-public-references', title: 'Email: public references and domain context',
    explanation: 'Use these pivots only for authorized public-reference review. They deliberately exclude credential, breach, and private-source queries.',
    dorks: [
      { id: 'email-exact-google', title: 'Exact public reference', query: quoted(address), description: 'Google exact-match preview for publicly indexed references.', engine: Engine.GOOGLE },
      { id: 'email-exact-bing', title: 'Exact public reference (Bing)', query: quoted(address), description: 'Bing exact-match preview for publicly indexed references.', engine: Engine.BING },
      { id: 'email-exact-yandex', title: 'Exact public reference (Yandex)', query: quoted(address), description: 'Yandex exact-match preview for publicly indexed references.', engine: Engine.YANDEX },
      { id: 'email-domain-context', title: 'Organization-domain reference', query: `${quoted(address)} site:${domain}`, description: 'Public references to the authorized address within its stated domain.', engine: Engine.BING },
      { id: 'email-local-part-context', title: 'Address local-part context', query: `${quoted(address.split('@')[0])} site:${domain}`, description: 'Public domain references using the local-part; validate any match independently.', engine: Engine.GOOGLE },
    ],
  }];
};

export const generatePersonDorks = (firstName: string, lastName: string, options: { variations: boolean }): DorkCategory[] => {
  const first = firstName.trim(); const last = lastName.trim();
  if (!first || !last) return [];
  const fullName = `${first} ${last}`;
  const categories: DorkCategory[] = [{
    id: 'person-public-references', title: 'Person: public identity references',
    explanation: 'Use bounded public-reference pivots within the authorized scope. Corroborate results; names are not unique identifiers.',
    dorks: [
      { id: 'person-exact-google', title: 'Exact-name reference', query: quoted(fullName), description: 'Google exact-name preview across public indexed pages.', engine: Engine.GOOGLE },
      { id: 'person-exact-bing', title: 'Exact-name reference (Bing)', query: quoted(fullName), description: 'Bing exact-name preview across public indexed pages.', engine: Engine.BING },
      { id: 'person-exact-yandex', title: 'Exact-name reference (Yandex)', query: quoted(fullName), description: 'Yandex exact-name preview across public indexed pages.', engine: Engine.YANDEX },
      { id: 'person-professional', title: 'Professional references', query: `${quoted(fullName)} (speaker OR author OR conference OR profile)`, description: 'Public professional-reference pivot, not identity resolution.', engine: Engine.GOOGLE },
      { id: 'person-social-context', title: 'Public social-profile references', query: `${quoted(fullName)} (site:linkedin.com/in OR site:x.com OR site:instagram.com)`, description: 'Public social-profile reference pivot; review against authorized context.', engine: Engine.BING },
    ],
  }];
  if (options.variations) categories.push({ id: 'person-variation', title: 'Limited name-format variation', explanation: 'One first-initial variation for public-reference review; it is not identity resolution.', dorks: [
    { id: 'person-initial-google', title: 'First-initial variation', query: `"${first.charAt(0)}. ${last}"`, description: 'Google preview for the first-initial name format.', engine: Engine.GOOGLE },
    { id: 'person-initial-yandex', title: 'First-initial variation (Yandex)', query: `"${first.charAt(0)}. ${last}"`, description: 'Yandex preview for the first-initial name format.', engine: Engine.YANDEX },
  ] });
  return categories;
};
