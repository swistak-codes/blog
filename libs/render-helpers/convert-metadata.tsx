import {
  PostMetadata,
  PrevNext,
  RenderedPostMetadata,
  SimilarPost,
} from '@swistak-codes/types';
import { renderToStaticMarkup } from 'react-dom/server';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

const getSimilarPosts = (
  post: PostMetadata,
  similarPosts: Map<PostMetadata, PostMetadata[]>
): SimilarPost[] => {
  const similarMetas = similarPosts.get(post);
  if (!similarMetas) {
    return [];
  }
  return similarMetas.map((x) => ({
    title: x.title,
    slug: x.slug,
    image: x.cover.src,
  }));
};

export const convertMetadata = (
  metadata: PostMetadata,
  prevNextSlugs: Map<string, PrevNext>,
  similarPosts: Map<PostMetadata, PostMetadata[]>
): RenderedPostMetadata => {
  return {
    ...metadata,
    firstParagraph: renderToStaticMarkup(metadata.firstParagraph),
    localizedDate: format(new Date(metadata.publishTime), 'do MMMM yyyy', {
      locale: pl,
    }),
    prevNext: prevNextSlugs.get(metadata.slug) || null,
    similar: getSimilarPosts(metadata, similarPosts),
  };
};
