import { Author } from './schemas.ts';
import { API_URL, getRequest } from './utils.ts';

/**
 * Get author based on its Open Library's ID, `id`, from Open Library's API.
 *
 * @returns Author
 *
 * @example
 * ```typescript
 * import { author } from "jsr:@timharek/openlibrary";
 *
 * const result = await author.get("OL221294A");
 * // Result should be Martha Wells
 * ```
 */
async function get(id: string): Promise<Author> {
  const url = new URL(`/authors/${id}.json`, API_URL);

  const result = await getRequest(url);
  return Author.passthrough().parse(result);
}

/**
 * Query author specifics
 */
export const author = {
  get,
};
