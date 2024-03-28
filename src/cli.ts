import { Command } from '../deps.ts';
import { getBook } from './util.ts';
import { findBook } from './prompt.ts';

const app = new Command()
  .name('books')
  .version('v1.0.2')
  .description('Search books')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://git.sr.ht/~timharek/deno-books')
  .globalOption(
    '-v, --verbose',
    "A more verbose output. (doesn't do anything atm)",
    {
      collect: true,
      value: (
        value: boolean,
        previous = 0,
      ) => (value ? previous + 1 : 0),
    },
  );
export type GlobalOptions = typeof app extends
  Command<void, void, void, [], infer Options extends Record<string, unknown>>
  ? Options
  : never;

const searchCmd = new Command<GlobalOptions>()
  .description(
    'Search for a specific title. If you include the authors name it will help with the results.',
  )
  .arguments('<name:string>')
  .action(async (_options, name: string) => {
    console.log(await findBook(name));
  });

const getCmd = new Command<GlobalOptions>()
  .description('Get a specific book.')
  .arguments('<id:string>')
  .action(async (_options, id: string) => {
    const book = await getBook(id);

    console.log(book);
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
