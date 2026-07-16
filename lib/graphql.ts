/**
 * CMS data layer — fetches from SQLite database
 * Replaces the old WordPress GraphQL approach
 */
import { cmsContent } from './db';
import cmsDefaults from '@/data/cms-defaults.json';

type PageKey = keyof typeof cmsDefaults;

/**
 * Fetch page data from database. Returns typed data for the given page key.
 * Falls back to cms-defaults.json if not found in database.
 */
export async function getPageData<T = Record<string, unknown>>(page: PageKey): Promise<T> {
  try {
    const data = cmsContent.getByKey(page);
    if (data && data.content) {
      return data.content as T;
    }
  } catch (e) {
    console.error(`Database fetch failed for ${page}, using defaults`, e);
  }
  
  // Fallback to JSON defaults
  return cmsDefaults[page] as unknown as T;
}

/**
 * Get all CMS pages
 */
export async function getAllPages() {
  try {
    return cmsContent.getAll();
  } catch (e) {
    console.error('Failed to fetch all pages:', e);
    return [];
  }
}

/**
 * Update page data
 */
export async function updatePageData(page: PageKey, data: any, updatedBy?: string) {
  return cmsContent.upsert(page, data, updatedBy);
}
