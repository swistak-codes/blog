import { debounce } from 'lodash';
import { push } from '@socialgouv/matomo-next';
import { clientPostsCollectionName } from '../../shared/search-consts-client';
import { useInstantSearch } from 'react-instantsearch';
import { useLayoutEffect } from 'react';

type Middleware = Parameters<
  ReturnType<typeof useInstantSearch>['addMiddlewares']
>[0];

const matomoMiddleware: Middleware = () => {
  const sendEventDebounced = debounce((query: string, hits: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push(['trackSiteSearch', query, false as any, hits]);
  }, 3000);

  return {
    onStateChange({ uiState }) {
      const {
        query,
        page = 0,
        hitsPerPage = 0,
      } = uiState[clientPostsCollectionName];
      if (query) {
        sendEventDebounced(query, page * hitsPerPage);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    subscribe() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unsubscribe() {},
  };
};

export const MatomoMiddleware = () => {
  const { addMiddlewares } = useInstantSearch();

  useLayoutEffect(() => {
    return addMiddlewares(matomoMiddleware);
  }, [addMiddlewares]);

  return null;
};
