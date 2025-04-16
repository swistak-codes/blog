import { ImageData } from './image-data';
import { ReactElement } from 'react';

export type SimilarPost = {
  slug: string;
  title: string;
  image: string;
  type?: 'blog' | 'offtopic';
};

export type BaseMetadata = {
  title?: string;
  abstract: string;
  keyword: string;
  slug?: string;
  publishTime?: string;
  updateTime?: string;
  cover?: ImageData;
  moveCoverToTop?: boolean;
  ignore?: boolean;
};

export interface PostMetadata extends Required<BaseMetadata> {
  firstParagraph: ReactElement;
  categories: string[];
  tags: string[];
  isOfftopic?: boolean;
  youtube?: string;
  english?: string;
}

export interface RenderedPostMetadata
  extends Omit<PostMetadata, 'firstParagraph' | 'similar'> {
  firstParagraph: string;
  localizedDate: string;
  prevNext: PrevNext | null;
  similar: SimilarPost[];
}

export type AdditionalProps = {
  isPage?: boolean;
  isOfftopic?: boolean;
  customPrevNext?: { previous?: string; next?: string };
};

export type PrevNext = {
  previous: string | null;
  previousName: string | null;
  next: string | null;
  nextName: string | null;
};

export const isPostMetadata = (
  metadata: BaseMetadata | PostMetadata | RenderedPostMetadata,
): metadata is PostMetadata | RenderedPostMetadata =>
  'categories' in metadata && 'tags' in metadata;

export const isRenderedPostMetadata = (
  metadata: BaseMetadata | PostMetadata | RenderedPostMetadata,
): metadata is RenderedPostMetadata => 'prevNext' in metadata;

export const emptyPrevNext: PrevNext = {
  next: null,
  nextName: null,
  previous: null,
  previousName: null,
};
