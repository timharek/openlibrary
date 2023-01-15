import { Command } from 'https://deno.land/x/cliffy@v0.25.7/command/mod.ts';
import { Select } from 'https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts';
import { getBook, searchBook } from './mod.ts';

const searchCmd = new Command()
  .description(
    'Search for a specific title. If you include the authors name it will help with the results.',
  )
  .action(async (options: unknown, name: string) => {
    const searchResult: OpenLibrary.ISearch = await searchBook(name);
    const selectOptions = searchResult.docs.map((book) => {
      return {
        name: `${book.title} (${book.first_publish_year}) by ${
          book.author_name ? book.author_name.join(', ') : ''
        }`,
        value: book.key,
      };
    });
    const selectedResult: string = await Select.prompt({
      message: 'Which book is correct?',
      options: selectOptions,
    });

    console.log(selectedResult);
  });

const getCmd = new Command()
  .description('Get a specific book.')
  .action(async (options: unknown, id: string) => {
    const book: OpenLibrary.IBook = await getBook(id);

    console.log(book);
  });

await new Command()
  .name('books')
  .version('v1.0.0')
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
        previous: number = 0,
      ) => (value ? previous + 1 : 0),
    },
  )
  .command('search <name:string>', searchCmd)
  .command(
    'get <id:string>',
    getCmd,
  )
  .parse(Deno.args);
