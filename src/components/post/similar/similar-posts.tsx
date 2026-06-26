import { SimilarPost } from '@swistak-codes/types';
import Link from 'next/link';
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import styles from './similar-posts.module.scss';
import commonStyles from '../../common.module.scss';
import clsx from 'clsx';

type Props = {
  contentKey: string;
  similar: SimilarPost[];
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const SimilarPosts = ({
  contentKey,
  similar,
  hidden,
  setHidden,
}: Props) => {
  const [desktopTrackTop, setDesktopTrackTop] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const contentContainerElement = document.querySelector<HTMLElement>(
      '[data-post-content-container]',
    );

    if (!contentContainerElement) {
      return;
    }

    const updateDesktopTrackTop = () => {
      const headerElement = document.querySelector<HTMLElement>('header');
      const headerBottom = headerElement?.getBoundingClientRect().bottom ?? 0;
      const containerTop = contentContainerElement.getBoundingClientRect().top;

      setDesktopTrackTop(Math.round(headerBottom - containerTop));
    };

    updateDesktopTrackTop();
    window.addEventListener('resize', updateDesktopTrackTop);

    return () => {
      window.removeEventListener('resize', updateDesktopTrackTop);
    };
  }, [contentKey]);

  return (
    <div
      className={clsx({
        [styles.wrapper]: true,
        [styles.hiddenFloat]: hidden,
      })}
      style={
        {
          '--similar-desktop-track-top': `${desktopTrackTop}px`,
        } as CSSProperties
      }
    >
      <div className={styles.stickyRail}>
        <button
          type="button"
          onClick={() => setHidden((x) => !x)}
          className={styles.hideButton}
          aria-label={hidden ? 'Pokaż podobne wpisy' : 'Ukryj podobne wpisy'}
        >
          <span className={commonStyles.hideVisually}>
            {hidden ? 'Pokaż podobne wpisy' : 'Ukryj podobne wpisy'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
        <div className={styles.similarPostsContainer}>
          <div className={styles.panelHeader}>
            <strong>Może Cię również zainteresować:</strong>
          </div>
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
    </div>
  );
};
