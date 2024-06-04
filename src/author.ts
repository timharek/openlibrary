import { Author } from './schemas.ts';
import { API_URL, getRequest } from './utils.ts';

/**
 * Get author based on its Open Library's ID, `id`, from Open Library's API.
 *
 * @returns Author
 */
async function get(id: string): Promise<Author> {
  const url = API_URL;
  url.pathname = `/authors/${id}.json`;

  const result = await getRequest(url);
  return Author.parse(result);
}

/**
 * Query author specifics
 */
export const author = {
  get,
};
