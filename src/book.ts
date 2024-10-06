import { Book, ISBNResult, Search } from './schemas.ts';
import { API_URL, getRequest } from './utils.ts';

/**
 * Search for book based on `query` from Open Library's API.
 *
 * @returns Search results
 *
 * @example
 * ```typescript
 * import { book } from "jsr:@timharek/openlibrary";
 *
 * const result = await book.search("Sapiens");
 * ```
 */
async function search(query: string): Promise<Search> {
  const url = new URL('/search.json', API_URL);
  url.searchParams.set('q', query);

  const result = await getRequest(url);
  return Search.parse(result);
}

/**
 * Get book based on its Open Library's ID, `id`, from Open Library's API.
 *
 * @returns Book
 *
 * @example
 * ```typescript
 * import { book } from "jsr:@timharek/openlibrary";
 *
 * const result = await book.get("OL17075811W");
 * // Result should be Sapiens by Yuval Noah Harari
 * ```
 */
async function get(id: string): Promise<Book> {
  const url = new URL(`/works/${id}.json`, API_URL);

  const result = await getRequest(url);
  const book = Book.parse(result);

  // If the book has been moved to a different ID
  if (book.type.key === '/type/redirect' && book.location) {
    const id = book.location.split('/').at(-1);
    if (!id) {
      throw new Error('Bad redirect id');
    }
    return await get(id);
  }

  return book;
}

/**
 * Get book based on one of its ISBNs, `isbn`, from Open Library's API.
 *
 * @returns Book
 *
 * @example
 * ```typescript
 * import { book } from "jsr:@timharek/openlibrary";
 *
 * const result = await book.getByISBN("9780099590088");
 * // Result should be Sapiens by Yuval Noah Harari
 * ```
 */
async function getByISBN(isbn: string): Promise<Book> {
  const url = new URL(`isbn/${isbn}.json`, API_URL);

  const result = await getRequest(url);
  const isbnResult = ISBNResult.parse(result);
  const id = isbnResult.works[0].key.split('/').at(-1);
  if (!id) {
    throw new Error('Missing works id');
  }
  const bookResult = await book.get(id);

  return Book.parse(bookResult);
}

/**
 * Query book specifics
 */
export const book = {
  search,
  get,
  getByISBN,
};
