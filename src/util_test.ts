import {
  assertEquals,
  assertExists,
} from 'https://deno.land/std@0.222.1/assert/mod.ts';
import {
  getAuthor,
  getBook,
  getBookByISBN,
  getSubject,
  searchBook,
} from './util.ts';

Deno.test('Get book by `id`, Sapiens id: OL17075811W', async () => {
  const book = await getBook('OL17075811W');

  assertExists(book);
  assertEquals(book.title.includes('Sapiens'), true, 'title');
  assertEquals(book.key, '/works/OL17075811W', 'key/id');
  assertEquals(book.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Sapiens id: OL17075811W', async () => {
  const book = await getBookByISBN('9780099590088');

  assertExists(book);
  assertEquals(book.title.includes('Sapiens'), true, 'title');
  assertEquals(book.key, '/works/OL17075811W', 'key/id');
  assertEquals(book.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Sapiens id: OL17075811W', async () => {
  const book = await getBookByISBN('9780099590088');

  assertExists(book);
  assertEquals(book.title.includes('Sapiens'), true, 'title');
  assertEquals(book.key, '/works/OL17075811W', 'key/id');
  assertEquals(book.authors.length === 1, true, 'authors length');
});

Deno.test('Search for book by title, Sapiens', async () => {
  const searchResult = await searchBook('Sapiens');

  assertExists(searchResult);
  assertEquals(searchResult.num_found > 0, true, 'count');
  assertExists(
    searchResult.docs.find((value) => value.title.includes('Sapiens')),
    'title',
  );
  assertExists(
    searchResult.docs.find((value) => value.key.includes('OL17075811W')),
    'id',
  );
});

Deno.test('Get author by id, Yuval Noah Harari id: OL3778242A', async () => {
  const author = await getAuthor('OL3778242A');

  assertExists(author);
  assertEquals(author.name, 'Yuval Noah Harari', 'name');
  assertEquals(author.key, '/authors/OL3778242A', 'key/id');
});

Deno.test('Get subject by key, Love id: love', async () => {
  const subject = await getSubject('love');

  assertExists(subject);
  assertEquals(subject.name, 'love', 'name');
  assertEquals(subject.key, '/subjects/love', 'key/id');
});

Deno.test('Get subject by name, Technology and civilization id: technology_and_civilization', async () => {
  const subject = await getSubject('Technology and civilization');

  assertExists(subject);
  assertEquals(subject.name, 'technology and civilization', 'name');
  assertEquals(subject.key, '/subjects/technology_and_civilization', 'key/id');
});

Deno.test('Get subject by name, Technology and civilization id: technology_and_civilization', async () => {
  const subject = await getSubject('technology_and_civilization');

  assertExists(subject);
  assertEquals(subject.name, 'technology and civilization', 'name');
  assertEquals(subject.key, '/subjects/technology_and_civilization', 'key/id');
});
