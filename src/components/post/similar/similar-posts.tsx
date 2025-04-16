import { SimilarPost } from '@swistak-codes/types';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import styles from './similar-posts.module.scss';
import commonStyles from '../../common.module.scss';
import clsx from 'clsx';

type Props = {
  similar: SimilarPost[];
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

export const SimilarPosts = ({ similar, hidden, setHidden }: Props) => {
  return (
    <div
      className={clsx({
        [styles.floatingIfFullScreen]: true,
        [styles.hiddenFloat]: hidden,
      })}
    >
      <div
        onClick={() => setHidden((x) => !x)}
        className={clsx({
          [styles.hideButton]: true,
          [styles.collapsedButton]: hidden,
        })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </div>
      <div className={styles.similarPostsContainer}>
        <strong>Może Cię również zainteresować:</strong>
        <div className={styles.similarPostsWrapper}>
          {similar.map((x) => (
            <div className={styles.postBox} key={x.slug}>
              <Link
                href={`/${x.type === 'offtopic' ? 'offtopic' : 'post'}/${
                  x.slug
                }`}
                passHref
                scroll
                prefetch={false}
                legacyBehavior
              >
                <a className={commonStyles.pureLink}>
                  <div className={styles.postImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/_next/image//?url=${encodeURI(
                        x.image,
                      )}&w=3840&q=75`}
                      alt=""
                    />
                  </div>
                  {x.title}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
