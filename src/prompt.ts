import { Select } from '../deps.ts';
import { searchBook } from './util.ts';

export async function findBook(bookQuery: string) {
  const searchResult = await searchBook(bookQuery);
  const selectOptions = searchResult.docs.map((book) => {
    return {
      name: `${book.title} (${book.first_publish_year}) by ${
        book.author_name ? book.author_name.join(', ') : ''
      }`,
      value: book.key.split('/').at(-1),
    };
  });
  const selectedResult: string = await Select.prompt({
    message: 'Which book is correct?',
    options: selectOptions,
    ...(selectOptions.length > 10 && { search: true }),
  });

  return selectedResult;
}
