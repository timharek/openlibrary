import { Book, ISBNResult, Search } from './schemas.ts';
import { API_URL, getRequest } from './utils.ts';

/**
 * Search for book based on `query` from Open Library's API.
 *
 * @returns Search results
 */
async function search(query: string): Promise<Search> {
  const url = API_URL;
  url.pathname = '/search.json';
  url.searchParams.set('q', query);

  const result = await getRequest(url);
  return Search.parse(result);
}

/**
 * Get book based on its Open Library's ID, `id`, from Open Library's API.
 *
 * @returns Book
 */
async function get(id: string): Promise<Book> {
  const url = API_URL;
  url.pathname = `/works/${id}.json`;

  const result = await getRequest(url);
  return Book.parse(result);
}

/**
 * Get book based on one of its ISBNs, `isbn`, from Open Library's API.
 *
 * @returns Book
 */
async function getByISBN(isbn: string): Promise<Book> {
  const url = API_URL;
  url.pathname = `isbn/${isbn}.json`;

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
