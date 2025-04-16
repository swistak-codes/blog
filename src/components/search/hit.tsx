import { HitsProps } from 'react-instantsearch';
import { PostDocument } from '@swistak-codes/types';
import React, { useCallback, useContext } from 'react';
import { SearchContext } from './search-context';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './search.module.scss';
import commonStyles from '../common.module.scss';

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

export const Hit: HitsProps<PostDocument>['hitComponent'] = ({
  hit,
  sendEvent,
}) => {
  const { setIsOpen } = useContext(SearchContext);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
    sendEvent('click', hit, 'Opened search result');
  }, [hit, sendEvent, setIsOpen]);

  return (
    <Link
      href={`/${hit.type === 'offtopic' ? 'offtopic' : 'post'}/${hit.id}`}
      passHref
      scroll
      prefetch={false}
      legacyBehavior
    >
      <a
        className={clsx(styles.searchPreviewLink, commonStyles.pureLink)}
        onClick={handleLinkClick}
      >
        <div className={styles.searchPreview}>
          <div className={styles.searchPreviewImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/_next/image//?url=${encodeURI(hit.image)}&w=3840&q=75`}
              alt=""
            />
          </div>
          <div className={styles.searchPreviewText}>
            <div
              dangerouslySetInnerHTML={{
                __html: hit._snippetResult['title']['value'],
              }}
              className={styles.searchTitle}
            />
            <div className={styles.searchTags}>
              {hit._snippetResult['categories'].map((x) => (
                <div
                  key={x.value}
                  className={clsx(styles.badge, styles.categoryBadge)}
                >
                  <i className="ph ph-tag" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: x.value,
                    }}
                  />
                </div>
              ))}
              {hit._snippetResult['tags']
                .filter((x) => x.matchLevel !== 'none')
                .map((x) => (
                  <div
                    key={x.value}
                    className={clsx(styles.badge, styles.tagBadge)}
                  >
                    <i className="ph ph-hash" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: x.value,
                      }}
                    />
                  </div>
                ))}
              {hit.type === 'offtopic' && (
                <div className={clsx(styles.badge, styles.offtopicBadge)}>
                  <i className="ph ph-island" />
                  Offtopic
                </div>
              )}
            </div>
            <div className={styles.searchTextContent}>
              {hit._snippetResult['content'].matchLevel !== 'none' ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `(...)&nbsp;${hit._snippetResult['content']['value']}&nbsp;(...)`,
                  }}
                />
              ) : hit._snippetResult['abstract'].matchLevel !== 'none' ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: hit._snippetResult['abstract']['value'],
                  }}
                />
              ) : (
                <>{truncateStringToWords(hit.content, 256)}&nbsp;(...)</>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
