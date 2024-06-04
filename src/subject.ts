import { toSnakeCase } from 'jsr:@std/text@0.224.0/case';
import { SubjectResult } from './schemas.ts';
import { API_URL, getRequest } from './utils.ts';

/**
 * Get a book subject based on its key or name, `key`, from Open Library's API.
 *
 * @returns Subject
 */
async function get(keyOrName: string): Promise<SubjectResult> {
  const url = API_URL;
  url.pathname = `/subjects/${toSnakeCase(keyOrName)}.json`;

  const result = await getRequest(url);
  return SubjectResult.parse(result);
}

/**
 * Query subject specifics
 */
export const subject = {
  get,
};
