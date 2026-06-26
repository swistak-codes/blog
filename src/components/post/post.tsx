import React, { useContext, useEffect, useState } from 'react';
import { Metadata } from '../metadata';
import { PostHeader } from './post-header';
import {
  PostMetadata,
  RenderedPostMetadata,
  SimilarPost,
} from '@swistak-codes/types';
import { Categories } from '../tags-categories/categories';
import { PostFooter } from './post-footer/post-footer';
import { SimilarPosts } from './similar/similar-posts';
import styles from './post.module.scss';
import commonStyles from '../common.module.scss';
import clsx from 'clsx';
import Giscus from '@giscus/react';
import { ThemeContext } from '../theme-context';
import { PostTableOfContents } from './toc/post-table-of-contents';

type Props = {
  metadata: RenderedPostMetadata | PostMetadata;
  isOnList?: boolean;
  categoryMap?: Record<string, string>;
  tagsMap?: Record<string, string>;
  isOfftop?: boolean;
  children: React.ReactNode;
  isPage?: boolean;
  showFooter?: boolean;
};

const getSimilar = async (slug: string) => {
  const response = await fetch('/api/similar', {
    method: 'POST',
    body: JSON.stringify({ slug }),
    mode: 'same-origin',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await response.json()) as SimilarPost[];
};

const getRandomElements = <T,>(arr: T[], num: number) => {
  const copy = [...arr];
  const result: T[] = [];
  num = Math.min(num, copy.length);
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.trunc(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return result;
};

export const Post = ({
  metadata,
  isOnList = false,
  isOfftop = false,
  isPage = false,
  showFooter = true,
  categoryMap,
  tagsMap,
  children,
}: Props) => {
  const isDark = useContext(ThemeContext);
  const shouldShowToc = !isOnList && !isPage;
  const fallbackSimilar = metadata['similar'] || [];
  const [similar, setSimilar] = useState<SimilarPost[]>(fallbackSimilar);
  const [similarHidden, setSimilarHidden] = useState(true);

  useEffect(() => {
    if (!isOnList) {
      let timeoutId: number | null = null;
      let cancelled = false;

      getSimilar(metadata.slug)
        .then((x) => {
          if (cancelled) {
            return;
          }

          const nextSimilar =
            x.length > 0 ? getRandomElements(x, 3) : fallbackSimilar;

          setSimilar(nextSimilar);

          if (nextSimilar.length > 0) {
            timeoutId = window.setTimeout(() => setSimilarHidden(false), 5000);
          }
        })
        .catch(() => {
          if (cancelled) {
            return;
          }

          setSimilar(fallbackSimilar);

          if (fallbackSimilar.length > 0) {
            timeoutId = window.setTimeout(() => setSimilarHidden(false), 5000);
          }
        });

      return () => {
        cancelled = true;
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
        }
      };
    }
  }, [fallbackSimilar, isOnList, isOfftop, metadata]);

  return (
    <article className={commonStyles.article}>
      {!isOnList && (
        <Metadata {...metadata} isOfftopic={isOfftop} isPage={isPage} />
      )}
      {metadata.cover && (
        <PostHeader
          image={metadata.cover}
          title={metadata.title}
          link={
            isOnList
              ? (isOfftop ? '/offtopic/' : isPage ? '' : '/post/') +
                metadata.slug
              : null
          }
          aspectRatio={isOnList ? '16/6' : undefined}
          moveToTop={isOnList ? !!metadata.moveCoverToTop : false}
          moveToBottom={isOnList ? !!metadata.moveCoverToBottom : false}
        />
      )}
      <div
        className={clsx(commonStyles.contentContainer, styles.contentContainer)}
        data-post-content-container
      >
        {shouldShowToc ? (
          <PostTableOfContents contentKey={metadata.slug} />
        ) : null}
        {metadata.categories && metadata.categories.length > 0 ? (
          <div className={commonStyles.unitMargin}>
            <Categories
              categories={metadata.categories}
              nameToPathsMap={categoryMap}
            />
          </div>
        ) : null}
        <div className={commonStyles.contentWrapper}>
          <div
            className={clsx({ [styles.wrapper]: !isOnList })}
            {...(isOnList
              ? { id: 'post-content' }
              : { 'data-testid': 'post-content' })}
          >
            {children}
          </div>
        </div>
        {!isOnList && !isPage && similar.length > 0 ? (
          <SimilarPosts
            contentKey={metadata.slug}
            similar={similar}
            hidden={similarHidden}
            setHidden={setSimilarHidden}
          />
        ) : null}
        {!isOnList && showFooter && (
          <PostFooter
            metadata={metadata}
            tagsMap={tagsMap}
            categoryMap={categoryMap}
            toShow={isPage ? 'all' : 'top'}
          />
        )}
        {!isPage && !isOnList ? (
          <>
            <div className={styles.comments}>
              <Giscus
                repo="swistak-codes/.github"
                repoId="R_kgDOK_E_OQ"
                mapping="og:title"
                category="Komentarze"
                categoryId="DIC_kwDOK_E_Oc4CcHcs"
                strict="1"
                reactionsEnabled="0"
                emitMetadata="0"
                inputPosition="top"
                theme={isDark ? 'dark_dimmed' : 'light'}
                lang="pl"
                host="https://synesthesia.swistak.codes"
              />
            </div>
            <PostFooter
              metadata={metadata}
              tagsMap={tagsMap}
              categoryMap={categoryMap}
              toShow="bottom"
            />
          </>
        ) : null}
      </div>
    </article>
  );
};
