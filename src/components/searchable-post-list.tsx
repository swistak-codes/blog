import { TokenResponse, RenderedPostMetadata } from '@swistak-codes/types';
import dynamic from 'next/dynamic';
import {
  ChangeEventHandler,
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { PostList } from './post-list/post-list';
import commonStyles from './common.module.scss';
import searchStyles from './search/search.module.scss';

type Props = {
  posts: RenderedPostMetadata[];
  currentPage: number;
  allPages: number;
  basePath: string;
  categoryMap?: Record<string, string>;
  isOfftopic?: boolean;
};

type SearchContentProps = {
  searchToken: string;
  query?: string;
  showSearchBox?: boolean;
  autoFocus?: boolean;
  categoryMap?: Record<string, string>;
};

const SearchContent = dynamic<SearchContentProps>(
  () => import('./search/search-content'),
  { ssr: false },
);

const getToken = async () => {
  const response = await fetch('/api/search-token', {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
  });
  return (await response.json()) as TokenResponse;
};

export const SearchablePostList = ({
  posts,
  currentPage,
  allPages,
  basePath,
  categoryMap,
  isOfftopic,
}: Props) => {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim());
  const [searchToken, setSearchToken] = useState('');
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);
  const hasActiveTokenRequest = useRef(false);
  const isSearchActive = query.trim().length > 0;
  const hasValidToken =
    searchToken.length > 0 &&
    tokenExpiresAt != null &&
    tokenExpiresAt > Date.now();

  useEffect(() => {
    if (!isSearchActive) {
      hasActiveTokenRequest.current = false;
      setSearchToken('');
      setTokenExpiresAt(null);
      return;
    }

    if (hasValidToken || hasActiveTokenRequest.current) {
      return;
    }

    let cancelled = false;
    hasActiveTokenRequest.current = true;

    getToken()
      .then((tokenResponse) => {
        if (cancelled) {
          return;
        }

        setSearchToken(tokenResponse.searchToken);
        setTokenExpiresAt(tokenResponse.expiresAt);
        hasActiveTokenRequest.current = false;
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
      });

    return () => {
      cancelled = true;
    };
  }, [hasValidToken, isSearchActive]);

  useEffect(() => {
    if (!isSearchActive || tokenExpiresAt == null) {
      return;
    }

    const refreshIn = tokenExpiresAt - Date.now() - 1000;

    if (refreshIn <= 0) {
      hasActiveTokenRequest.current = false;
      setSearchToken('');
      setTokenExpiresAt(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      hasActiveTokenRequest.current = false;
      setSearchToken('');
      setTokenExpiresAt(null);
    }, refreshIn);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSearchActive, tokenExpiresAt]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const nextQuery = event.currentTarget.value;

      startTransition(() => {
        setQuery(nextQuery);
      });
    },
    [],
  );

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <>
      <section className={commonStyles.section}>
        <article className={commonStyles.contentContainer}>
          <div className={commonStyles.contentWrapper}>
            <div className={searchStyles.inlineSearch}>
              <label htmlFor={inputId} className={commonStyles.hideVisually}>
                Szukaj wpisów
              </label>
              <div className={searchStyles.inlineSearchField}>
                <i className="ph ph-magnifying-glass" aria-hidden="true" />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Szukasz coś konkretnego? Wpisz, co Cię interesuje"
                  autoComplete="off"
                />
                {query.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearQuery}
                    title="Wyczyść"
                    aria-label="Wyczyść pasek wyszukiwania"
                  >
                    <i className="ph ph-x" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </section>
      {isSearchActive ? (
        hasValidToken && deferredQuery.length > 0 ? (
          <SearchContent
            searchToken={searchToken}
            query={deferredQuery}
            showSearchBox={false}
            autoFocus={false}
            categoryMap={categoryMap}
          />
        ) : (
          <section className={commonStyles.section}>
            <article className={commonStyles.contentContainer}>
              <div className={commonStyles.contentWrapper}>
                <div className={searchStyles.inlineSearchLoader}>
                  <i className="ph ph-spinner-gap" aria-hidden="true"></i>
                </div>
              </div>
            </article>
          </section>
        )
      ) : (
        <PostList
          posts={posts}
          currentPage={currentPage}
          allPages={allPages}
          basePath={basePath}
          categoryMap={categoryMap}
          isOfftopic={isOfftopic}
        />
      )}
    </>
  );
};
