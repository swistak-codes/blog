export type PostDocument = {
  title: string;
  id: string;
  type: 'blog' | 'offtopic';
  tags: string[];
  categories: string[];
  date: number;
  abstract: string;
  content: string;
  contentEmbedding: string;
  image: string;
  embedding: number[];
};

export type TokenResponse = {
  searchToken: string;
  suggestionsToken: string;
  expiresAt: number;
};
