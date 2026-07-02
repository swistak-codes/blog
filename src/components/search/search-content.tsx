import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { InfiniteHits, InstantSearch } from 'react-instantsearch';
import styles from './search.module.scss';
import { useMemo } from 'react';
import {
  clientPostsCollectionName,
  clientSearchHost,
  clientSearchPort,
  clientSearchProtocol,
} from '../../shared/search-consts-client';
import { MatomoMiddleware } from './matomo-middleware';
import { Hit } from './hit';
import { SearchQuerySync } from './search-query-sync';
import { ResultsBoundary } from './results-boundary';

type Props = {
  searchToken: string;
  query?: string;
  showSearchBox?: boolean;
  autoFocus?: boolean;
  categoryMap?: Record<string, string>;
};

const SearchContent = ({ searchToken, query, categoryMap }: Props) => {
  const searchClient = useMemo(() => {
    const adapter = new TypesenseInstantSearchAdapter({
      server: {
        apiKey: searchToken,
        nodes: [
          {
            host: clientSearchHost,
            port: clientSearchPort,
            protocol: clientSearchProtocol,
          },
        ],
        connectionTimeoutSeconds: 2,
        cacheSearchResultsForSeconds: 2 * 60,
        sendApiKeyAsQueryParam: false,
      },
      additionalSearchParameters: {
        query_by: 'title,abstract,content',
        highlight_full_fields: 'none',
      },
    });
    return adapter.searchClient;
  }, [searchToken]);

  if (!searchClient) {
    return null;
  }

  return (
    <div className={styles.searchContent}>
      <InstantSearch
        searchClient={searchClient}
        indexName={clientPostsCollectionName}
        initialUiState={
          query
            ? {
                [clientPostsCollectionName]: {
                  query,
                },
              }
            : undefined
        }
      >
        {query ? <SearchQuerySync query={query} /> : null}
        <ResultsBoundary>
          <InfiniteHits
            hitComponent={(props) => (
              <Hit {...props} categoryMap={categoryMap} />
            )}
            className={styles.searchHits}
            translations={{
              showMoreButtonText: 'Pokaż więcej',
              showPreviousButtonText: 'Pokaż poprzednie',
            }}
          />
        </ResultsBoundary>
        <MatomoMiddleware />
      </InstantSearch>
    </div>
  );
};

export default SearchContent;
