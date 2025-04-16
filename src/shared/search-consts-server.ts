export const environment = process.env.NEXT_PUBLIC_BASE_URL.replace(
  /https?:\/\//,
  ''
).replace(/:\d+/, '');
export const searchApiKey = process.env.SEARCH_ADMIN_API_KEY;
export const searchHost = process.env.SEARCH_HOST;
export const searchPort = parseInt(process.env.SEARCH_PORT);
export const searchProtocol = process.env.SEARCH_PROTOCOL;
export const postsCollectionName = `posts_${environment}`;
