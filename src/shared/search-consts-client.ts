export const clientSearchHost = process.env.NEXT_PUBLIC_SEARCH_HOST;
export const clientSearchPort = parseInt(process.env.NEXT_PUBLIC_SEARCH_PORT);
export const clientSearchProtocol = process.env.NEXT_PUBLIC_SEARCH_PROTOCOL;
const environment = process.env.NEXT_PUBLIC_BASE_URL.replace(
  /https?:\/\//,
  ''
).replace(/:\d+/, '');
export const clientPostsCollectionName = `posts_${environment}`;
