const API_URL = new URL('https://openlibrary.org');

async function _fetch(url: string | URL) {
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });

  return result;
}

export async function searchBook(query: string) {
  const url = API_URL;
  url.pathname = '/search.json';
  url.searchParams.set('q', query);

  const result = await _fetch(url);
  return result;
}

export async function getBook(id: string) {
  const url = API_URL;
  url.pathname = `/works/${id}`;

  const result = await _fetch(url);
  return result;
}

// const response = await searchBook('essentialism greg mckeown');

// console.log(JSON.stringify(response, null, 2));

// // const book = await getBook('OL17043626W');
// const book = await getBook('OL17075811W');

// console.log(JSON.stringify(book, null, 2));
