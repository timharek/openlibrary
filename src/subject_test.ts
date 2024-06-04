import { assertEquals, assertExists } from '@std/assert';
import { subject } from './subject.ts';

Deno.test('Get subject by key, Love id: love', async () => {
  const result = await subject.get('love');

  assertExists(result);
  assertEquals(result.name, 'love', 'name');
  assertEquals(result.key, 'love', 'key/id');
});

Deno.test('Get subject by name, Technology and civilization id: technology_and_civilization', async () => {
  const result = await subject.get('Technology and civilization');

  assertExists(result);
  assertEquals(result.name, 'technology and civilization', 'name');
  assertEquals(result.key, 'technology_and_civilization', 'key/id');
});

Deno.test('Get subject by name, Technology and civilization id: technology_and_civilization', async () => {
  const result = await subject.get('technology_and_civilization');

  assertExists(result);
  assertEquals(result.name, 'technology and civilization', 'name');
  assertEquals(result.key, 'technology_and_civilization', 'key/id');
});
