import { SubjectResult } from './schemas.ts';
import { Author, ISBNResult } from './schemas.ts';
import { Book, Search } from './schemas.ts';
import { toSnakeCase } from 'jsr:@std/text@0.224.0';
import { getRequest } from './utils.ts';

const API_URL = new URL('https://openlibrary.org');

/**
 * Search for book based on `query` from Open Library's API.
 *
 * @returns Search results
 */
export async function searchBook(query: string): Promise<Search> {
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
export async function getBook(id: string): Promise<Book> {
  const url = API_URL;
  url.pathname = `/works/${id}.json`;

  const result = await getRequest(url);
  return Book.parse(result);
}

/**
 * Get author based on its Open Library's ID, `id`, from Open Library's API.
 *
 * @returns Author
 */
export async function getAuthor(id: string): Promise<Author> {
  const url = API_URL;
  url.pathname = `/authors/${id}.json`;

  const result = await getRequest(url);
  return Author.parse(result);
}

/**
 * Get book based on one of its ISBNs, `isbn`, from Open Library's API.
 *
 * @returns Book
 */
export async function getBookByISBN(isbn: string): Promise<Book> {
  const url = API_URL;
  url.pathname = `isbn/${isbn}.json`;

  const result = await getRequest(url);
  const isbnResult = ISBNResult.parse(result);
  const id = isbnResult.works[0].key.split('/').at(-1);
  if (!id) {
    throw new Error('Missing works id');
  }
  const bookResult = await getBook(id);

  return Book.parse(bookResult);
}

/**
 * Get a book subject based on its key or name, `key`, from Open Library's API.
 *
 * @returns Subject
 */
export async function getSubject(keyOrName: string): Promise<SubjectResult> {
  const url = API_URL;
  url.pathname = `/subjects/${toSnakeCase(keyOrName)}.json`;

  const result = await getRequest(url);
  return SubjectResult.parse(result);
}
