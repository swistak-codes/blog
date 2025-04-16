export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { populateSearch } = await import('../config/populate-search.mjs');
    populateSearch();
  }
}
