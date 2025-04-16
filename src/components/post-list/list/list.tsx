import { RenderedPostMetadata } from '@swistak-codes/types';
import NextLink from 'next/link';
import { PostDate } from './post-date';
import { Post } from '../../post/post';
import styles from './list.module.scss';
import common from '../../common.module.scss';

type Props = {
  posts: RenderedPostMetadata[];
  categoryMap?: Record<string, string>;
  isOfftopic?: boolean;
};

export const List = ({ posts, categoryMap, isOfftopic }: Props) => {
  return (
    <>
      {posts.map((meta) => (
        <section className={common.section} key={meta.slug}>
          <Post
            metadata={meta}
            isOnList
            isOfftop={isOfftopic}
            categoryMap={categoryMap}
          >
            <PostDate>{meta.localizedDate}</PostDate>
            <p
              className={styles.abstract}
              dangerouslySetInnerHTML={{ __html: meta.firstParagraph }}
            />
            <NextLink
              href={(isOfftopic ? '/offtopic/' : '/post/') + meta.slug}
              passHref
              legacyBehavior
            >
              <a className={styles.readMore}>Czytaj więcej</a>
            </NextLink>
          </Post>
        </section>
      ))}
    </>
  );
};
