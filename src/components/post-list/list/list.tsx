import { RenderedPostMetadata } from '@swistak-codes/types';
import NextLink from 'next/link';
import { PostDate } from './post-date';
import { Post } from '../../post/post';
import styles from './list.module.scss';
import common from '../../common.module.scss';

type Props = {
  posts: RenderedPostMetadata[];
  categoryMap?: Record<string, string>;
};

export const List = ({ posts, categoryMap }: Props) => {
  return (
    <>
      {posts.map((meta) => (
        <section className={common.section} key={meta.slug}>
          <Post metadata={meta} isOnList categoryMap={categoryMap}>
            <PostDate>{meta.localizedDate}</PostDate>
            <p
              className={styles.abstract}
              dangerouslySetInnerHTML={{ __html: meta.firstParagraph }}
            />
            <NextLink href={'/post/' + meta.slug} passHref legacyBehavior>
              <a className={styles.readMore}>Czytaj więcej</a>
            </NextLink>
          </Post>
        </section>
      ))}
    </>
  );
};
