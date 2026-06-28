import { SimilarPost } from '@swistak-codes/types';
import {
  CSSProperties,
  Dispatch,
  type MouseEventHandler,
  useEffect,
  useLayoutEffect,
  SetStateAction,
  useState,
} from 'react';
import styles from './similar-posts.module.scss';
import commonStyles from '../../common.module.scss';
import clsx from 'clsx';
import { SimilarPostCard } from './similar-post-card';

type Props = {
  contentKey: string;
  similar: SimilarPost[];
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const PAGE_SIZE = 3;

export const SimilarPosts = ({
  contentKey,
  similar,
  hidden,
  setHidden,
}: Props) => {
  const [desktopTrackTop, setDesktopTrackTop] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);
  const similarPages = Array.from(
    { length: Math.ceil(similar.length / PAGE_SIZE) },
    (_, index) => similar.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE),
  );
  const canScrollPrev = mobilePage > 0;
  const canScrollNext = mobilePage < similarPages.length - 1;

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

  useEffect(() => {
    setMobilePage(0);
  }, [similar]);

  const scrollByPage = (direction: -1 | 1) => {
    setMobilePage((currentPage) =>
      Math.max(0, Math.min(currentPage + direction, similarPages.length - 1)),
    );
  };

  const handlePrevClick: MouseEventHandler<HTMLButtonElement> = () => {
    scrollByPage(-1);
  };

  const handleNextClick: MouseEventHandler<HTMLButtonElement> = () => {
    scrollByPage(1);
  };

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
          <div className={styles.mobilePostsViewport}>
            {similarPages.length > 1 ? (
              <>
                <button
                  type="button"
                  className={styles.mobilePagerButton}
                  onClick={handlePrevClick}
                  disabled={!canScrollPrev}
                  aria-label="Pokaż poprzednie podobne wpisy"
                >
                  <i className="ph ph-caret-left" aria-hidden />
                </button>
                <button
                  type="button"
                  className={styles.mobilePagerButton}
                  onClick={handleNextClick}
                  disabled={!canScrollNext}
                  aria-label="Pokaż kolejne podobne wpisy"
                >
                  <i className="ph ph-caret-right" aria-hidden />
                </button>
              </>
            ) : null}
            <div className={styles.mobilePostsWindow}>
              <div
                className={styles.mobilePostsTrack}
                style={{ transform: `translateX(-${mobilePage * 100}%)` }}
              >
                {similarPages.map((page, index) => (
                  <div className={styles.mobilePostsPage} key={index}>
                    {page.map((post) => (
                      <SimilarPostCard key={post.slug} post={post} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.similarPostsWrapper}>
            {similar.map((post) => (
              <SimilarPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
