import { Post, PrevNext, RenderedPostMetadata } from '@swistak-codes/types';
import { convertMetadata } from './convert-metadata';

export const getMetadataFromPostList = (
  posts: Post[],
  prevNextSlugs: Map<string, PrevNext>
): RenderedPostMetadata[] =>
  posts.map((x) => convertMetadata(x.meta, prevNextSlugs, new Map()));
