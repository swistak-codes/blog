import React, { useEffect, useState } from 'react';
import { PostMetadata, RenderedPostMetadata } from '@swistak-codes/types';
import commonPostFooterStyles from './common-post-footer.module.scss';
import commonStyles from '../../common.module.scss';
import styles from './share.module.scss';
import clsx from 'clsx';

type Props = {
  metadata: RenderedPostMetadata | PostMetadata;
};

export const Share = ({ metadata }: Props) => {
  const [link, setLink] = useState('');
  const [isNativeShareAvailable, setIsNativeShareAvailable] = useState(false);
  const title = encodeURIComponent(metadata.title);
  const description = encodeURIComponent(metadata.abstract);

  useEffect(() => {
    setLink(encodeURIComponent(window.location.href));
  }, [setLink]);

  useEffect(() => {
    setIsNativeShareAvailable('share' in navigator);
  }, [setIsNativeShareAvailable]);

  const share = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator
      .share({
        title,
        url: link,
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  };

  return (
    <div className={styles.shareContainer}>
      <strong className={commonPostFooterStyles.strongText}>
        Spodobał Ci się ten artykuł? Udostępnij go znajomym!
      </strong>
      <div>
        {isNativeShareAvailable && (
          <a
            className={clsx(commonStyles.pureLink, styles.shareLink)}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label=""
            onClick={share}
          >
            <div className={clsx(styles.shareButton, styles.nativeShare)}>
              <i className="ph-fill ph-share-fat" />
            </div>
          </a>
        )}
        <a
          className={clsx(commonStyles.pureLink, styles.shareLink)}
          href={`https://facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          <div className={clsx(styles.shareButton, styles.facebook)}>
            <i className="ph-fill ph-facebook-logo" />
          </div>
        </a>
        <a
          className={clsx(commonStyles.pureLink, styles.shareLink)}
          href={`https://twitter.com/intent/tweet/?url=${link}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          <div className={clsx(styles.shareButton, styles.twitter)}>
            <i className="ph-fill ph-x-logo" />
          </div>
        </a>
        <a
          className={clsx(commonStyles.pureLink, styles.shareLink)}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}&summary=${description}&source=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          <div className={clsx(styles.shareButton, styles.linkedin)}>
            <i className="ph-fill ph-linkedin-logo" />
          </div>
        </a>
        <a
          className={clsx(commonStyles.pureLink, styles.shareLink)}
          href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
            `${title} — ${link}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label=""
        >
          <div className={clsx(styles.shareButton, styles.bluesky)}>
            <i className="ph-fill ph-butterfly" />
          </div>
        </a>
        <a
          className={clsx(commonStyles.pureLink, styles.shareLink)}
          href={`mailto:?subject=${title}&body=${link}`}
          target="_self"
          rel="noopener"
          aria-label=""
        >
          <div className={clsx(styles.shareButton, styles.mail)}>
            <i className="ph-fill ph-envelope-open" />
          </div>
        </a>
      </div>
    </div>
  );
};
