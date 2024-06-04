import { assertEquals, assertExists } from '@std/assert';
import { book } from './book.ts';

Deno.test('Get book by `id`, Sapiens id: OL17075811W', async () => {
  const result = await book.get('OL17075811W');

  assertExists(result);
  assertEquals(result.title.includes('Sapiens'), true, 'title');
  assertEquals(result.key, 'OL17075811W', 'key/id');
  assertEquals(result.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Sapiens id: OL17075811W', async () => {
  const result = await book.getByISBN('9780099590088');

  assertExists(result);
  assertEquals(result.title.includes('Sapiens'), true, 'title');
  assertEquals(result.key, 'OL17075811W', 'key/id');
  assertEquals(result.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Sapiens id: OL17075811W', async () => {
  const result = await book.getByISBN('9780099590088');

  assertExists(result);
  assertEquals(result.title.includes('Sapiens'), true, 'title');
  assertEquals(result.key, 'OL17075811W', 'key/id');
  assertEquals(result.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Essentialism 0753558696', async () => {
  const result = await book.getByISBN('0753558696');

  assertExists(result);
  assertEquals(result.title.includes('Essentialism'), true, 'title');
  assertEquals(result.key, 'OL17043626W', 'key/id');
  assertEquals(result.authors.length === 1, true, 'authors length');
});

Deno.test('Get book by `isbn`, Talk Like TED: 9781250061539', async () => {
  const result = await book.getByISBN('9781250061539');

  assertExists(result);
  assertEquals(result.title, 'Talk like TED', 'title');
  assertEquals(result.key, 'OL17076301W', 'key/id');
  assertEquals(result.authors.length === 1, true, 'authors length');
});

Deno.test('Search for book by title, Sapiens', async () => {
  const searchResult = await book.search('Sapiens');

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
