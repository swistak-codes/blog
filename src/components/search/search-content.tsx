import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import { InfiniteHits, InstantSearch, SearchBox } from 'react-instantsearch';
import styles from './search.module.scss';
import React, { useMemo } from 'react';
import {
  clientPostsCollectionName,
  clientSearchHost,
  clientSearchPort,
  clientSearchProtocol,
} from '../../shared/search-consts-client';
import { MatomoMiddleware } from './matomo-middleware';
import { Hit } from './hit';
import 'instantsearch.css/themes/algolia.css';

type Props = {
  searchToken: string;
  suggestionsToken: string;
};

const SearchContent = ({ searchToken, suggestionsToken }: Props) => {
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
      >
        {/*<Autocomplete*/}
        {/*  token={suggestionsToken}*/}
        {/*  className={styles.autocomplete}*/}
        {/*/>*/}
        <SearchBox
          className={styles.autocomplete}
          translations={{
            resetButtonTitle: 'Wyczyść',
            submitButtonTitle: 'Szukaj',
          }}
          placeholder="Wpisz, co Cię interesuje"
          autoFocus
          loadingIconComponent={() => <i className="ph ph-spinner-gap"></i>}
          resetIconComponent={() => <i className="ph ph-x"></i>}
          submitIconComponent={() => <i className="ph ph-magnifying-glass"></i>}
        />
        <InfiniteHits
          hitComponent={Hit}
          className={styles.searchHits}
          translations={{
            showMoreButtonText: 'Pokaż więcej',
            showPreviousButtonText: 'Pokaż poprzednie',
          }}
        />
        {/*<Pagination className={styles.pagination} />*/}
        <MatomoMiddleware />
      </InstantSearch>
    </div>
  );
};

export default SearchContent;
