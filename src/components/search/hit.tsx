import { HitsProps } from 'react-instantsearch';
import { PostDocument } from '@swistak-codes/types';
import { useCallback } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import commonStyles from '../common.module.scss';
import listStyles from '../post-list/list/list.module.scss';
import postStyles from '../post/post.module.scss';
import { PostHeader } from '../post/post-header';
import { Categories } from '../tags-categories/categories';
import { PostDate } from '../post-list/list/post-date';

type HitProps = Parameters<HitsProps<PostDocument>['hitComponent']>[0] & {
  categoryMap?: Record<string, string>;
};

function truncateStringToWords(str: string, limit: number) {
  if (str.length <= limit) {
    return str;
  }
  const truncatedString = str.slice(0, limit);
  const lastSpaceIndex = truncatedString.lastIndexOf(' ');
  if (lastSpaceIndex === -1) {
    return truncatedString;
  }
  return truncatedString.slice(0, lastSpaceIndex);
}

export const Hit = ({
  hit,
  sendEvent,
  categoryMap,
}: HitProps) => {
  const handleLinkClick = useCallback(() => {
    sendEvent('click', hit, 'Opened search result');
  }, [hit, sendEvent]);

  const resultUrl = `/${hit.type === 'offtopic' ? 'offtopic' : 'post'}/${hit.id}`;
  const snippet =
    hit._snippetResult['content'].matchLevel !== 'none'
      ? `(...)&nbsp;${hit._snippetResult['content']['value']}&nbsp;(...)`
      : hit._snippetResult['abstract'].matchLevel !== 'none'
        ? hit._snippetResult['abstract']['value']
        : `${truncateStringToWords(hit.content, 256)}&nbsp;(...)`;
  const localizedDate = format(new Date(hit.date), 'PPP', {
    locale: pl,
  });

  return (
    <section className={commonStyles.section}>
      <article className={commonStyles.article}>
        <PostHeader
          image={hit.image}
          title={hit.title}
          link={resultUrl}
          aspectRatio="16/6"
          onClick={handleLinkClick}
        />
        <div
          className={commonStyles.contentContainer + ' ' + postStyles.contentContainer}
        >
          {categoryMap && hit.categories.length > 0 ? (
            <div className={commonStyles.unitMargin}>
              <Categories
                categories={hit.categories}
                nameToPathsMap={categoryMap}
              />
            </div>
          ) : null}
          <div className={commonStyles.contentWrapper}>
            <div id="post-content">
              <PostDate>{localizedDate}</PostDate>
              <p
                className={listStyles.abstract}
                dangerouslySetInnerHTML={{ __html: snippet }}
              />
              <Link
                href={resultUrl}
                passHref
                scroll
                prefetch={false}
                legacyBehavior
              >
                <a className={listStyles.readMore} onClick={handleLinkClick}>
                  Czytaj więcej
                </a>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
