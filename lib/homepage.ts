import 'server-only';
import { getPageData } from './graphql';

export async function getHomepageData() {
  // Fetch homepage data from database
  const data = await getPageData('homepage');
  return data;
}
