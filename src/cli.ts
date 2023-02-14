import { Command } from '../deps.ts';
import { getBook } from './util.ts';
import { findBook } from './prompt.ts';

const searchCmd = new Command()
  .description(
    'Search for a specific title. If you include the authors name it will help with the results.',
  )
  .action(async (_options: unknown, name: string) => {
    console.log(await findBook(name));
  });

const getCmd = new Command()
  .description('Get a specific book.')
  .action(async (_options: unknown, id: string) => {
    const book: OpenLibrary.IBook = await getBook(id);

    console.log(book);
  });

await new Command()
  .name('books')
  .version('v1.0.2')
  .description('Search books')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://git.sr.ht/~timharek/deno-books')
  .globalOption(
    '-v, --verbose',
    'A more verbose output. (doesn\'t do anything atm)',
    {
      collect: true,
      value: (
        value: boolean,
        previous = 0,
      ) => (value ? previous + 1 : 0),
    },
  )
  .command('search <name:string>', searchCmd)
  .command(
    'get <id:string>',
    getCmd,
  )
  .parse(Deno.args);
