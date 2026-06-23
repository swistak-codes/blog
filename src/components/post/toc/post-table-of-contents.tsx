import { CSSProperties } from 'react';
import clsx from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import commonStyles from '../../common.module.scss';
import styles from './post-table-of-contents.module.scss';

type Props = {
  contentKey: string;
};

const DESKTOP_MEDIA_QUERY = '(min-width: 1222px)';
const ACTIVE_HEADING_OFFSET = 160;

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const getHeadingId = (href: string) => {
  if (!href.startsWith('#')) {
    return null;
  }
  return decodeURIComponent(href.slice(1));
};

const getHeadingLevel = (link: HTMLAnchorElement) => {
  const match = link.className.match(/\btoc-link-h([1-6])\b/);
  return match ? Number(match[1]) : null;
};

const getTopLevelItem = (link: HTMLAnchorElement) => {
  let item = link.closest('li');

  while (item) {
    const parentList = item.parentElement;

    if (parentList?.classList.contains('toc-level-1')) {
      return item;
    }

    item = parentList?.closest('li') ?? null;
  }

  return null;
};

const getOffsetTopWithin = (container: HTMLElement, element: HTMLElement) => {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return elementRect.top - containerRect.top + container.scrollTop;
};

const ensureRangeVisible = (
  container: HTMLElement,
  start: number,
  end: number,
  padding = 16,
) => {
  const currentTop = container.scrollTop;
  const currentBottom = currentTop + container.clientHeight;
  const paddedTop = currentTop + padding;
  const paddedBottom = currentBottom - padding;
  const maxScrollTop = Math.max(
    container.scrollHeight - container.clientHeight,
    0,
  );
  const rangeHeight = end - start;

  if (start >= paddedTop && end <= paddedBottom) {
    return;
  }

  let nextTop = currentTop;

  if (rangeHeight + padding * 2 <= container.clientHeight) {
    nextTop = Math.min(Math.max(start - padding, 0), maxScrollTop);
  } else if (start < paddedTop) {
    nextTop = Math.min(Math.max(start - padding, 0), maxScrollTop);
  } else if (end > paddedBottom) {
    nextTop = Math.min(
      Math.max(end - container.clientHeight + padding, 0),
      maxScrollTop,
    );
  }

  if (Math.abs(nextTop - currentTop) > 1) {
    container.scrollTo({ top: nextTop });
  }
};

const revealActiveContext = (
  container: HTMLElement,
  activeLink: HTMLAnchorElement,
) => {
  const activeLevel = getHeadingLevel(activeLink);
  const topLevelItem = getTopLevelItem(activeLink);

  if (activeLevel !== null && activeLevel > 2 && topLevelItem) {
    const groupStart = getOffsetTopWithin(container, topLevelItem);
    const groupEnd = groupStart + topLevelItem.getBoundingClientRect().height;

    if (groupEnd - groupStart + 32 <= container.clientHeight) {
      ensureRangeVisible(container, groupStart, groupEnd);
      return;
    }
  }

  const linkStart = getOffsetTopWithin(container, activeLink);
  const linkEnd = linkStart + activeLink.getBoundingClientRect().height;

  ensureRangeVisible(container, linkStart, linkEnd);
};

const setActiveLink = (links: HTMLAnchorElement[], activeId: string | null) => {
  for (const link of links) {
    const isActive = getHeadingId(link.getAttribute('href') || '') === activeId;
    link.dataset.active = String(isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
};

export const PostTableOfContents = ({ contentKey }: Props) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const isDesktopRef = useRef(false);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const suppressAutoScrollUntilRef = useRef(0);
  const [hasToc, setHasToc] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [desktopTrackTop, setDesktopTrackTop] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const syncDesktopState = () => {
      const nextValue = mediaQuery.matches;
      setIsDesktop(nextValue);
      isDesktopRef.current = nextValue;
      if (nextValue) {
        setIsMobileOpen(false);
      }
    };

    syncDesktopState();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncDesktopState);
      return () => mediaQuery.removeEventListener('change', syncDesktopState);
    }

    mediaQuery.addListener(syncDesktopState);
    return () => mediaQuery.removeListener(syncDesktopState);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const contentElement = document.querySelector<HTMLElement>(
      '[data-testid="post-content"]',
    );
    const contentContainerElement = document.querySelector<HTMLElement>(
      '[data-post-content-container]',
    );
    const targetElement = targetRef.current;

    if (!contentElement || !contentContainerElement || !targetElement) {
      return;
    }

    let sourceTocElement: HTMLElement | null = null;
    let renderedTocElement: HTMLElement | null = null;

    const handleTocClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]') ?? null;

      if (!link) {
        return;
      }

      suppressAutoScrollUntilRef.current = window.performance.now() + 1200;
      activeLinkRef.current = link;

      if (!isDesktopRef.current) {
        setIsMobileOpen(false);
      }
    };

    const cleanupRenderedToc = () => {
      renderedTocElement?.removeEventListener('click', handleTocClick);
      renderedTocElement = null;
      activeLinkRef.current = null;
      if (sourceTocElement) {
        delete sourceTocElement.dataset.enhancedTocSource;
        sourceTocElement = null;
      }
      targetElement.innerHTML = '';
    };

    const updateDesktopTrackTop = () => {
      const headerElement = document.querySelector<HTMLElement>('header');
      const headerBottom = headerElement?.getBoundingClientRect().bottom ?? 0;
      const containerTop = contentContainerElement.getBoundingClientRect().top;

      setDesktopTrackTop(Math.round(headerBottom - containerTop));
    };

    const syncToc = () => {
      const nextSourceTocElement =
        contentElement.querySelector<HTMLElement>('nav.toc');

      if (!nextSourceTocElement) {
        setHasToc(false);
        cleanupRenderedToc();
        return false;
      }

      if (nextSourceTocElement === sourceTocElement && renderedTocElement) {
        updateDesktopTrackTop();
        return true;
      }

      cleanupRenderedToc();
      sourceTocElement = nextSourceTocElement;
      updateDesktopTrackTop();
      sourceTocElement.dataset.enhancedTocSource = 'true';
      targetElement.innerHTML = sourceTocElement.outerHTML;
      renderedTocElement = targetElement.querySelector<HTMLElement>('nav.toc');

      if (!renderedTocElement) {
        setHasToc(false);
        return false;
      }

      renderedTocElement.addEventListener('click', handleTocClick);
      setHasToc(true);
      return true;
    };

    const observer = new MutationObserver(() => {
      syncToc();
    });

    syncToc();
    observer.observe(contentElement, {
      childList: true,
      subtree: true,
    });
    window.addEventListener('resize', syncToc);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncToc);
      cleanupRenderedToc();
    };
  }, [contentKey]);

  useEffect(() => {
    const tocElement = targetRef.current?.querySelector<HTMLElement>('nav.toc');
    if (!tocElement || typeof window === 'undefined') {
      return;
    }

    const links = Array.from(
      tocElement.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const headings = links
      .map((link) => {
        const headingId = getHeadingId(link.getAttribute('href') || '');
        if (!headingId) {
          return null;
        }
        return document.getElementById(headingId);
      })
      .filter((heading): heading is HTMLElement => heading !== null);

    if (links.length === 0 || headings.length === 0) {
      return;
    }

    let frameId = 0;

    const syncActiveHeading = () => {
      frameId = 0;
      let activeHeading: HTMLElement | null = headings[0];

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= ACTIVE_HEADING_OFFSET) {
          activeHeading = heading;
        } else {
          break;
        }
      }

      const activeId = activeHeading?.id || null;
      setActiveLink(links, activeId);

      const nextActiveLink =
        links.find(
          (link) => getHeadingId(link.getAttribute('href') || '') === activeId,
        ) || null;

      if (nextActiveLink && activeLinkRef.current !== nextActiveLink) {
        activeLinkRef.current = nextActiveLink;

        if (window.performance.now() >= suppressAutoScrollUntilRef.current) {
          revealActiveContext(targetRef.current, nextActiveLink);
        }
      }
    };

    const requestSync = () => {
      if (frameId !== 0) {
        return;
      }
      frameId = window.requestAnimationFrame(syncActiveHeading);
    };

    requestSync();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);
    window.addEventListener('hashchange', requestSync);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      window.removeEventListener('hashchange', requestSync);
      setActiveLink(links, null);
    };
  }, [contentKey, hasToc]);

  const toggleToc = () => {
    if (isDesktop) {
      setIsDesktopCollapsed((value) => !value);
      return;
    }
    setIsMobileOpen((value) => !value);
  };

  return (
    <>
      {hasToc ? (
        <>
          <button
            type="button"
            className={styles.mobileToggleButton}
            onClick={toggleToc}
          >
            Spis treści
          </button>
          <button
            type="button"
            aria-label="Zamknij spis tresci"
            className={clsx(styles.mobileBackdrop, {
              [styles.mobileBackdropVisible]: isMobileOpen,
            })}
            onClick={() => setIsMobileOpen(false)}
          />
        </>
      ) : null}
      <aside
        aria-label="Spis tresci"
        className={clsx(styles.wrapper, {
          [styles.hidden]: !hasToc,
          [styles.desktopCollapsed]: isDesktopCollapsed,
          [styles.mobileOpen]: isMobileOpen,
        })}
        ref={wrapperRef}
        style={
          {
            '--toc-desktop-track-top': `${desktopTrackTop}px`,
          } as CSSProperties
        }
      >
        <div className={styles.stickyRail}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <strong>Spis treści</strong>
              <button
                type="button"
                className={styles.mobileCloseButton}
                onClick={() => setIsMobileOpen(false)}
              >
                Zamknij
              </button>
            </div>
            <div className={styles.panelContent} ref={targetRef} />
          </div>
          <button
            type="button"
            className={styles.desktopToggleButton}
            onClick={toggleToc}
          >
            <span className={commonStyles.hideVisually}>
              {isDesktopCollapsed ? 'Pokaz spis treści' : 'Ukryj spis treści'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
};
