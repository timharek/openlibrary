import config from '../deno.json' with { type: 'json' };
import { Command } from '../deps.ts';
import { getBook } from './util.ts';
import { findBook } from './prompt.ts';
import { Book } from './schemas.ts';

function stringifyBook(book: Book) {
  return `Title: ${book.title}
Description: ${book.description}
Author(s): ${book.authors.map((author) => author.author.key)}`;
}

const app = new Command()
  .name(config.name)
  .version(`v${config.version}`)
  .description('Search books via Open Library.')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://git.sr.ht/~timharek/deno-books')
  .globalOption('--json', 'JSON output.');
export type GlobalOptions = typeof app extends
  Command<void, void, void, [], infer Options extends Record<string, unknown>>
  ? Options
  : never;

const searchCmd = new Command<GlobalOptions>()
  .description(
    'Search for a specific title. If you include the authors name it will help with the results.',
  )
  .arguments('<name:string>')
  .action(async ({ json }, name: string) => {
    const foundBook = await findBook(name);

    if (!foundBook) {
      console.log('No result');
      Deno.exit(0);
    }

    const book = await getBook(foundBook);
    if (json) {
      console.log(JSON.stringify(book, null, 2));
      Deno.exit(0);
    }
    console.log(stringifyBook(book));
  });

const getCmd = new Command<GlobalOptions>()
  .description('Get a specific book.')
  .arguments('<id:string>')
  .action(async ({ json }, id: string) => {
    const book = await getBook(id);
    if (json) {
      console.log(JSON.stringify(book, null, 2));
      Deno.exit(0);
    }

    console.log(stringifyBook(book));
  });

if (import.meta.main) {
  try {
    await app
      .command('search', searchCmd)
      .command('get', getCmd)
      .parse(Deno.args);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
      Deno.exit(1);
    }
  }
}
