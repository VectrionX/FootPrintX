
import { Engine, Dork, DorkCategory } from '../types';

export const generateInstaDorks = (username: string): DorkCategory[] => {
  const clean = username.replace('@', '').trim();
  if (!clean) return [];

  return [
    {
      id: 'platform',
      title: 'Instagram Platform Dorks',
      explanation: 'Search specifically within the Instagram domain for profile remnants and direct mentions.',
      dorks: [
        { id: 'i1', title: 'Direct Profile Search', query: `site:instagram.com intext:"${clean}"`, description: 'Searches for the username specifically within Instagram text.', engine: Engine.GOOGLE },
        { id: 'i2', title: 'Handle Mention', query: `intext:"@${clean}" site:instagram.com`, description: 'Finds mentions of the handle in comments or captions.', engine: Engine.GOOGLE },
        { id: 'i3', title: 'URL Pattern', query: `"instagram.com/${clean}"`, description: 'Looks for direct profile URL links indexed.', engine: Engine.ALL },
        { id: 'i4', title: 'Tagged Content', query: `intext:"Tagged" site:instagram.com "${clean}"`, description: 'Finds photos or posts where the user was tagged.', engine: Engine.GOOGLE },
        { id: 'i5', title: 'Google Cache', query: `cache:instagram.com/${clean}`, description: 'Attempts to access a cached version of the profile.', engine: Engine.GOOGLE },
        { id: 'i6', title: 'Profile Mirrors', query: `site:imginn.com OR site:picuki.com OR site:dumpor.com "${clean}"`, description: 'Searches for the profile on common Instagram viewer/mirror sites.', engine: Engine.ALL },
        { id: 'i7', title: 'Cross-Engine Cache Discovery', query: `(site:google.com OR site:yandex.com OR site:bing.com) "instagram.com/${clean}" intext:"cache" OR intext:"snapshot"`, description: 'Searches for indexed cache snapshots and remnants across major search engine indexes.', engine: Engine.ALL },
        { id: 'i8', title: 'Yandex Cache Search', query: `cache:https://www.instagram.com/${clean}`, description: 'Directly attempts to query Yandex\'s cache for the profile snapshot.', engine: Engine.YANDEX },
        { id: 'i9', title: 'Bing Historical Remnants', query: `site:bing.com "instagram.com/${clean}" "cached"`, description: 'Searches Bing for results that explicitly contain the "cached" marker for the profile.', engine: Engine.BING }
      ]
    },
    {
      id: 'external',
      title: 'External Mentions & Cross-Platform',
      explanation: 'Discover where this username appears outside of Instagram (Twitter, Facebook, Reddit, etc).',
      dorks: [
        { id: 'e1', title: 'Global Mention', query: `"@${clean}" -site:instagram.com`, description: 'Mentions of the handle excluding Instagram itself.', engine: Engine.GOOGLE },
        { id: 'e2', title: 'Major Socials', query: `"@${clean}" (site:twitter.com OR site:facebook.com OR site:youtube.com OR site:reddit.com OR site:medium.com)`, description: 'Finds the handle on other major social platforms.', engine: Engine.ALL },
        { id: 'e3', title: 'Blogs & News', query: `"@${clean}" (site:news OR site:blog OR site:wordpress.com OR site:tumblr.com)`, description: 'Mentions in news articles or personal blogs.', engine: Engine.GOOGLE },
        { id: 'e4', title: 'Forum Search', query: `"@${clean}" (site:quora.com OR site:reddit.com OR site:stackoverflow.com)`, description: 'Finds the handle mentioned in community discussions.', engine: Engine.ALL }
      ]
    },
    {
      id: 'tagged',
      title: 'Tagged Content & Shares',
      explanation: 'Dorks focused on finding shared content, reposts, and third-party mentions.',
      dorks: [
        { id: 't1', title: 'Shared Posts', query: `intext:"instagram.com/${clean}" "shared"`, description: 'Finds instances where someone shared this profile link.', engine: Engine.GOOGLE },
        { id: 't2', title: 'Posted by user', query: `intext:"instagram.com/${clean}" "posted"`, description: 'Finds references to posts made by this profile.', engine: Engine.GOOGLE },
        { id: 't3', title: 'Image URL Exposure', query: `inurl:instagram.com "${clean}" -site:instagram.com`, description: 'Finds Instagram images indexed on other sites.', engine: Engine.BING }
      ]
    },
    {
      id: 'broad',
      title: 'Broad Discovery & Deep Search',
      explanation: 'Wide-net queries to catch archived content and obscure mentions.',
      dorks: [
        { id: 'b1', title: 'All Text Search', query: `allintext:"@${clean}" OR allintext:"instagram.com/${clean}"`, description: 'Aggressive text search for handle and URL.', engine: Engine.GOOGLE },
        { id: 'b2', title: 'Video Mentions', query: `("${clean}" OR "@${clean}") (site:youtube.com/watch OR site:vimeo.com OR site:dailymotion.com)`, description: 'Finds the handle mentioned in video descriptions/comments.', engine: Engine.ALL },
        { id: 'b3', title: 'Archive Search', query: `site:archive.org "${clean}"`, description: 'Searches the Wayback Machine indexes for this handle.', engine: Engine.GOOGLE }
      ]
    }
  ];
};

export const generatePersonDorks = (firstName: string, lastName: string, options: { variations: boolean; transliterate: boolean }): DorkCategory[] => {
  const f = firstName.trim();
  const l = lastName.trim();
  if (!f || !l) return [];

  const fullName = `${f} ${l}`;
  const reverseName = `${l} ${f}`;
  const initialed = `${f.charAt(0)} ${l}`;
  
  const dorks: DorkCategory[] = [
    {
      id: 'identity',
      title: 'Name query patterns',
      explanation: 'Basic name-based queries to locate primary digital footprints.',
      dorks: [
        { id: 'p1', title: 'Standard Full Name', query: `"${fullName}"`, description: 'Exact match search for the full name.', engine: Engine.ALL },
        { id: 'p2', title: 'Reversed Name', query: `"${reverseName}"`, description: 'Common in official documents or directory listings.', engine: Engine.ALL },
        { id: 'p3', title: 'Middle Initial Variant', query: `"${f} * ${l}"`, description: 'Wildcard search to find matches with middle names or initials.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'social',
      title: 'Social Media Presence',
      explanation: 'Targeting specific platforms for personal profiles.',
      dorks: [
        { id: 's1', title: 'Main Social Platforms', query: `"${fullName}" (site:facebook.com OR site:twitter.com OR site:instagram.com OR site:linkedin.com)`, description: 'Checks major social media sites for the name.', engine: Engine.GOOGLE },
        { id: 's2', title: 'Professional Footprint', query: `"${fullName}" (site:linkedin.com OR site:xing.com OR site:crunchbase.com)`, description: 'Focused on professional and career networking.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'handles',
      title: 'Potential Usernames & Handles',
      explanation: 'Queries designed to find common username patterns based on the name.',
      dorks: [
        { id: 'h1', title: 'Concatenated Name', query: `"${f}${l}" OR "${l}${f}"`, description: 'Simple name combination handles.', engine: Engine.ALL },
        { id: 'h2', title: 'Snake Case Name', query: `"${f}_${l}"`, description: 'Underscore separated name patterns.', engine: Engine.ALL },
        { id: 'h3', title: 'Professional Handle', query: `"${f.charAt(0)}${l}"`, description: 'Initial plus last name pattern.', engine: Engine.ALL }
      ]
    },
    {
      id: 'academic',
      title: 'Academic & Technical Activity',
      explanation: 'Search for research papers, code repositories, and technical contributions.',
      dorks: [
        { id: 'a1', title: 'Research & Science', query: `"${fullName}" (site:researchgate.net OR site:academia.edu OR site:scholar.google.com)`, description: 'Searches for academic publications.', engine: Engine.GOOGLE },
        { id: 'a2', title: 'Developer Activity', query: `"${fullName}" (site:github.com OR site:gitlab.com OR site:bitbucket.org)`, description: 'Finds public code contributions.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'files',
      title: 'Documents & File Exposure',
      explanation: 'Finding the person mentioned in publicly available files (CVs, reports, PDFs).',
      dorks: [
        { id: 'f1', title: 'PDF Documents', query: `"${fullName}" filetype:pdf`, description: 'Searches specifically for PDF files containing the name.', engine: Engine.GOOGLE },
        { id: 'f2', title: 'Office Documents', query: `"${fullName}" (filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx)`, description: 'Searches for Word or Excel files.', engine: Engine.GOOGLE },
        { id: 'f3', title: 'Contact Lists', query: `"${fullName}" "email" OR "phone" "contact"`, description: 'Searches for public contact information lists.', engine: Engine.ALL }
      ]
    }
  ];

  if (options.variations) {
    dorks.push({
      id: 'variations',
      title: 'Common Variations',
      explanation: 'Queries for nicknames or common formal/informal variations.',
      dorks: [
        { id: 'v1', title: 'Initial-based Search', query: `"${initialed}"`, description: 'Commonly used in directory listings.', engine: Engine.GOOGLE }
      ]
    });
  }

  return dorks;
};

export const generateXDorks = (username: string): DorkCategory[] => {
  const clean = username.replace('@', '').trim();
  if (!clean) return [];

  return [
    {
      id: 'x_platform',
      title: 'X Platform Presence',
      explanation: 'Direct platform checks for indexed profile content.',
      dorks: [
        { id: 'x1', title: 'Indexed Username', query: `site:twitter.com "${clean}"`, description: 'General mention of username on X.', engine: Engine.GOOGLE },
        { id: 'x2', title: 'Handle Search', query: `site:twitter.com "@${clean}"`, description: 'Specific handle mention on X.', engine: Engine.GOOGLE },
        { id: 'x3', title: 'Profile URL', query: `"twitter.com/${clean}"`, description: 'Finds direct links to the profile.', engine: Engine.ALL },
        { id: 'x4', title: 'Google Cache', query: `cache:twitter.com/${clean}`, description: 'Access archived or cached profile state.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'x_content',
      title: 'Tweets, Replies & Mentions',
      explanation: 'Find interaction history and specific conversational footprints.',
      dorks: [
        { id: 'xc1', title: 'User Mentions', query: `site:twitter.com intext:"@${clean}"`, description: 'Finds tweets mentioning this handle.', engine: Engine.GOOGLE },
        { id: 'xc2', title: 'Retweet History', query: `site:twitter.com "RT @${clean}"`, description: 'Finds accounts that have retweeted this user.', engine: Engine.ALL },
        { id: 'xc3', title: 'Reply Threads', query: `site:twitter.com "replying to @${clean}"`, description: 'Uncovers conversational threads involving the user.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'x_external',
      title: 'External Mentions of X Account',
      explanation: 'Discover where the handle is discussed outside of X.',
      dorks: [
        { id: 'xe1', title: 'External Handles', query: `"@${clean}" -site:twitter.com`, description: 'Mentions of the handle on the wider web.', engine: Engine.GOOGLE },
        { id: 'xe2', title: 'Cross Platform', query: `"@${clean}" (site:facebook.com OR site:reddit.com OR site:medium.com OR site:github.com)`, description: 'Checks other social and tech platforms.', engine: Engine.ALL }
      ]
    }
  ];
};

export const generateLinkedInDorks = (name: string, company?: string, country?: string): DorkCategory[] => {
  const cleanName = name.trim();
  if (!cleanName) return [];

  const companyQuery = company ? ` "${company}"` : '';

  return [
    {
      id: 'li_profile',
      title: 'Profile Discovery',
      explanation: 'Locate LinkedIn profiles through various URL patterns.',
      dorks: [
        { id: 'li1', title: 'Standard Profile', query: `site:linkedin.com/in "${cleanName}"${companyQuery}`, description: 'Primary profile search.', engine: Engine.GOOGLE },
        { id: 'li2', title: 'Public Directory', query: `site:linkedin.com/pub "${cleanName}"`, description: 'Search old or public directory formats.', engine: Engine.GOOGLE },
        { id: 'li3', title: 'Cached Profile', query: `cache:linkedin.com/in/${cleanName.replace(/\s+/g, '-')}`, description: 'Attempt to view cached version.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'li_employment',
      title: 'Company & Employment Intelligence',
      explanation: 'Targeted searches for professional mentions and team association.',
      dorks: [
        { id: 'lie1', title: 'Company Context', query: `"${cleanName}" site:linkedin.com${company ? ` "${company}"` : ''}`, description: 'Find the person within a specific company context on LinkedIn.', engine: Engine.GOOGLE },
        { id: 'lie2', title: 'External Professional', query: `"linkedin.com/in" "${cleanName}" -site:linkedin.com`, description: 'Mentions of their LinkedIn profile on third-party sites.', engine: Engine.ALL }
      ]
    },
    {
      id: 'li_docs',
      title: 'Documents & CVs',
      explanation: 'Finding professional documents and resumes containing the name.',
      dorks: [
        { id: 'lid1', title: 'Resumes & CVs', query: `"${cleanName}" filetype:pdf "CV" OR "resume"`, description: 'Finds publicly indexed resumes.', engine: Engine.GOOGLE },
        { id: 'lid2', title: 'Presentations', query: `"${cleanName}" site:slideshare.net OR site:speakerdeck.com`, description: 'Professional presentation mentions.', engine: Engine.ALL }
      ]
    }
  ];
};

export const generateEmailDorks = (email: string): DorkCategory[] => {
  const cleanEmail = email.trim();
  if (!cleanEmail || !cleanEmail.includes('@')) return [];
  
  const [username, domain] = cleanEmail.split('@');

  return [
    {
      id: 'em_direct',
      title: 'Direct Email Exposure',
      explanation: 'Search for literal mentions of the email address across the web.',
      dorks: [
        { id: 'em1', title: 'Literal Match', query: `"${cleanEmail}"`, description: 'Exact match search for the full email.', engine: Engine.ALL },
        { id: 'em2', title: 'External Domain', query: `"${cleanEmail}" -site:${domain}`, description: 'Finds email usage outside of its own organization.', engine: Engine.GOOGLE },
        { id: 'em3', title: 'Paste Sites', query: `"${cleanEmail}" (site:pastebin.com OR site:ghostbin.co OR site:controlc.com)`, description: 'Checks for email in common snippet storage sites.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'em_leaks',
      title: 'Exposure-related queries',
      explanation: 'Passive search for email presence in public breach mentions.',
      dorks: [
        { id: 'eml1', title: 'Public Leaks', query: `"${cleanEmail}" "leak" OR "dump" OR "breach"`, description: 'Passive indicator search for leaks.', engine: Engine.GOOGLE },
        { id: 'eml2', title: 'Log Exposure', query: `"${cleanEmail}" filetype:log`, description: 'Searches for server log files containing the email.', engine: Engine.GOOGLE }
      ]
    },
    {
      id: 'em_social',
      title: 'Pivoting & Associations',
      explanation: 'Connect the email to usernames or profiles.',
      dorks: [
        { id: 'ems1', title: 'Username Pivot', query: `"${username}" "${domain.split('.')[0]}"`, description: 'Attempts to find associations between the email username and company.', engine: Engine.ALL },
        { id: 'ems2', title: 'Developer Forums', query: `"${cleanEmail}" (site:stackoverflow.com OR site:github.com OR site:reddit.com)`, description: 'Finds account associations on technical sites.', engine: Engine.ALL }
      ]
    }
  ];
};
