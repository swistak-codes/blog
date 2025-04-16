import { GetStaticProps } from 'next';
import { Post } from '../../components/post/post';
import { opensource } from '../../_offtopic/20250417-opensource';
import { PostDate } from '../../components/post-list/list/post-date';
import { getDatePathForDate } from '@swistak-codes/pagination';
import { prevNextOfftopSlugs } from '../../shared/logic/slugs';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { convertMetadata } from '@swistak-codes/render-helpers';
import { similarPosts } from '../../_posts/meta/similar-posts';
import { Versions } from '../../components/post/versions/versions';

type Props = {
  dateLink: string;
  modifiedMeta: RenderedPostMetadata;
};

export function Article({ dateLink, modifiedMeta }: Props) {
  return (
    <Post metadata={modifiedMeta} isOfftop>
      <PostDate>Tomasz Świstak, {modifiedMeta.localizedDate}</PostDate>
      <Versions english={modifiedMeta.english} youtube={modifiedMeta.youtube} />
      <p>{opensource.meta.firstParagraph}</p>
      <opensource.Component />
    </Post>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dateLink = getDatePathForDate(opensource.meta.publishTime);
  const modifiedMeta = convertMetadata(
    opensource.meta,
    prevNextOfftopSlugs,
    similarPosts,
  );

  return {
    props: {
      dateLink,
      modifiedMeta,
    },
  };
};

export default Article;
