import { GetStaticProps } from 'next';
import { Post } from '../../components/post/post';
import { dzielIZwyciezajMnozenie } from '../../_posts/content/20230405-dziel-i-zwyciezaj-a-mnozenie';
import { PostDate } from '../../components/post-list/list/post-date';
import Link from 'next/link';
import { getDatePathForDate } from '@swistak-codes/pagination';
import { categoryNamesToPaths } from '../../shared/logic/paths';
import { prevNextSlugs, tagNamesToSlugs } from '../../shared/logic/slugs';
import { RenderedPostMetadata } from '@swistak-codes/types';
import { convertMetadata } from '@swistak-codes/render-helpers';
import { similarPosts } from '../../_posts/meta/similar-posts';
import { Versions } from '../../components/post/versions/versions';

type Props = {
  dateLink: string;
  categoryMap: Record<string, string>;
  tagsMap: Record<string, string>;
  modifiedMeta: RenderedPostMetadata;
};

export function Article({
  dateLink,
  categoryMap,
  tagsMap,
  modifiedMeta,
}: Props) {
  return (
    <Post metadata={modifiedMeta} categoryMap={categoryMap} tagsMap={tagsMap}>
      <PostDate>
        <Link href="/author/tomasz-swistak" scroll prefetch={false}>
          Tomasz Świstak
        </Link>
        ,{' '}
        <Link href={dateLink} scroll prefetch={false}>
          {modifiedMeta.localizedDate}
        </Link>
      </PostDate>
      <Versions english={modifiedMeta.english} youtube={modifiedMeta.youtube} />
      <p>{dzielIZwyciezajMnozenie.meta.firstParagraph}</p>
      <dzielIZwyciezajMnozenie.Component />
    </Post>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dateLink = getDatePathForDate(dzielIZwyciezajMnozenie.meta.publishTime);
  const modifiedMeta = convertMetadata(
    dzielIZwyciezajMnozenie.meta,
    prevNextSlugs,
    similarPosts,
  );

  return {
    props: {
      dateLink,
      categoryMap: categoryNamesToPaths,
      tagsMap: Object.fromEntries(tagNamesToSlugs.entries()),
      modifiedMeta,
    },
  };
};

export default Article;
