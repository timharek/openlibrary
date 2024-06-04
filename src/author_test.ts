import { assertEquals, assertExists } from '@std/assert';
import { author } from './author.ts';

Deno.test('Get author by id, Yuval Noah Harari id: OL3778242A', async () => {
  const result = await author.get('OL3778242A');

  assertExists(result);
  assertEquals(result.name, 'Yuval Noah Harari', 'name');
  assertEquals(result.key, 'OL3778242A', 'key/id');
});

Deno.test('Get author by id, Greg McKeown id: OL7224934A', async () => {
  const result = await author.get('OL7224934A');

  assertExists(result);
  assertEquals(result.name, 'Greg McKeown', 'name');
  assertEquals(result.key, 'OL7224934A', 'key/id');
});

Deno.test('Get author by id, Carmine Gallo id: OL1391861A', async () => {
  const result = await author.get('OL1391861A');

  assertExists(result);
  assertEquals(result.name, 'Carmine Gallo', 'name');
  assertEquals(result.key, 'OL1391861A', 'key/id');
});
