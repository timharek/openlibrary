import { SubjectResult } from './schemas.ts';
import { Author, ISBNResult } from './schemas.ts';
import { Book, Search } from './schemas.ts';

const API_URL = new URL('https://openlibrary.org');

async function _fetch(url: string | URL): Promise<unknown> {
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return result;
}

/**
 * Search for book based on `query` from Open Library's API.
 *
 * @returns Search results
 */
export async function searchBook(query: string): Promise<Search> {
  const url = API_URL;
  url.pathname = '/search.json';
  url.searchParams.set('q', query);

  const result = await _fetch(url);
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

  const result = await _fetch(url);
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

  const result = await _fetch(url);
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

  const result = await _fetch(url);
  const isbnResult = ISBNResult.parse(result);
  const id = isbnResult.works[0].key.split('/').at(-1);
  if (!id) {
    throw new Error('Missing works id');
  }
  const bookResult = await getBook(id);

  return Book.parse(bookResult);
}

/**
 * Get a book subject based on its key (snake-cased of actual title), `key`, from Open Library's API.
 *
 * @returns Subject
 */
export async function getSubject(key: string): Promise<SubjectResult> {
  const url = API_URL;
  url.pathname = `/subjects/${key}.json`;

  const result = await _fetch(url);
  return SubjectResult.parse(result);
}
