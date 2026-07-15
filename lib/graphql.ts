/**
 * CMS data layer — fetches from WordPress GraphQL when configured,
 * otherwise reads from data/cms-defaults.json (the single source of truth).
 */
import cmsDefaults from '@/data/cms-defaults.json';

const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || '';

type PageKey = keyof typeof cmsDefaults;

const PAGE_MAP: Record<PageKey, string> = {
  homepage: 'digibitHomepage',
  about: 'digibitAbout',
  contact: 'digibitContact',
  pricing: 'digibitPricing',
  careers: 'digibitCareers',
  insights: 'digibitInsights',
  work: 'digibitWork',
  services_index: 'digibitServicesIndex',
  navigation: 'digibitNavigation',
  footer: 'digibitFooter',
};

async function gqlFetch(fieldName: string): Promise<string> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ ${fieldName} }` }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const json = await res.json();
  return json.data?.[fieldName] || '{}';
}

/**
 * Fetch page data. Returns typed data for the given page key.
 * When WP is configured, fetches from GraphQL.
 * When WP is not configured, returns defaults from cms-defaults.json.
 */
export async function getPageData<T = Record<string, unknown>>(page: PageKey): Promise<T> {
  if (WP_GRAPHQL_URL) {
    try {
      const raw = await gqlFetch(PAGE_MAP[page]);
      return JSON.parse(raw) as T;
    } catch (e) {
      console.error(`WP fetch failed for ${page}, using defaults`, e);
    }
  }
  return cmsDefaults[page] as unknown as T;
}

export function isWpConfigured(): boolean {
  return !!WP_GRAPHQL_URL;
}
