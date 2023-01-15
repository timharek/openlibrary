import { Command } from 'https://deno.land/x/cliffy@v0.25.7/command/mod.ts';
import {
  Input,
  Number,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';
import { getBook, searchBook } from './mod.ts';

const searchCmd = await new Command()
  .description('tbd')
  .action(async (options: unknown, name: string) => {
    const searchResult: OpenLibrary.ISearch = await searchBook(name);
    const selectOptions = searchResult.docs.map((book) => {
      return {
        name: `${book.title} by ${book.author_name.join(', ')}`,
        value: book.key,
      };
    });
    const selectedResult: string = await Select.prompt({
      message: 'Which book is correct?',
      options: selectOptions,
    });

    console.log(selectedResult);
  });

const getCmd = await new Command()
  .description('tbd')
  .action(async (options: unknown, id: string) => {
    console.log('Not implemented yet, sorry!');
  });

await new Command()
  .name('books')
  .version('v1.0.0')
  .description('Search books')
  .meta('Author', 'Tim Hårek Andreassen <tim@harek.no>')
  .meta('Source', 'https://github.com/timharek/***')
  .example('', ``)
  .globalOption('-v, --verbose', 'A more verbose output.', {
    collect: true,
    value: (value: boolean, previous: number = 0) => (value ? previous + 1 : 0),
  })
  .command('search <name:string>', searchCmd)
  .command(
    'get <id:string>',
    getCmd,
  )
  .parse(Deno.args);
