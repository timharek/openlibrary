/**
 * Helper-function for a unified way of fetching JSON-data.
 */
export async function getRequest(url: string | URL): Promise<unknown> {
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
