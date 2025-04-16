/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { createElement, Fragment, useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { usePagination, useSearchBox } from 'react-instantsearch';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import { BaseItem } from '@algolia/autocomplete-core';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import Typesense from 'typesense';
import '@algolia/autocomplete-theme-classic';
import {
  clientPostsCollectionName,
  clientSearchHost,
  clientSearchPort,
  clientSearchProtocol,
} from '../../shared/search-consts-client';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
  token: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
};

export function Autocomplete({
  className,
  token,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instantsearch',
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label });
          },
        };
      },
    });

    return [recentSearches];
  }, []);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }
    const typesenseClient = new Typesense.Client({
      apiKey: token,
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
    });

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      placeholder: 'Wpisz, co Cię interesuje...',
      openOnFocus: true,
      onReset() {
        setInstantSearchUiState({ query: '' });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },
      translations: {
        clearButtonTitle: 'Wyczyść',
        detachedCancelButtonText: 'Anuluj',
        detachedSearchButtonTitle: 'Szukaj',
        submitButtonTitle: 'Wyślij',
      },
      debug: process.env.NODE_ENV === 'development',
      getSources: async ({ query }) => {
        // TODO zdecydować czy potrzebne
        // const results = await typesenseClient
        //   .collections(clientPostsCollectionName)
        //   .documents()
        //   .search({
        //     q: query,
        //     highlight_full_fields: 'title,tags,categories',
        //   });

        return [
          {
            sourceId: 'predictions',
            getItems() {
              // const alreadyAdded = new Set();
              // const items: { inputValue: string; highlight: string }[] = [];
              // for (const hit of results.hits) {
              //   for (const highlight of hit.highlights) {
              //     if (highlight.field === 'title') {
              //       const rawVal = (hit.document as any).title;
              //       if (!alreadyAdded.has(rawVal) && highlight.value) {
              //         items.push({
              //           inputValue: rawVal,
              //           highlight: highlight.value,
              //         });
              //         alreadyAdded.add(rawVal);
              //       }
              //     } else {
              //       for (let i = 0; i < highlight.indices.length; i++) {
              //         const index = highlight.indices[i];
              //         const rawVal = (hit.document as any)[highlight.field][
              //           index
              //         ];
              //         const val = (highlight as any).values[i];
              //         if (val && !alreadyAdded.has(rawVal)) {
              //           items.push({
              //             inputValue: rawVal,
              //             highlight: val,
              //           });
              //           alreadyAdded.add(rawVal);
              //         }
              //       }
              //     }
              //   }
              // }
              // return items;
              return [];
            },
            getItemInputValue({ item }) {
              return item.inputValue as string;
            },
            templates: {
              item({ item, html }) {
                return html`<div
                  dangerouslySetInnerHTML=${{ __html: item.highlight }}
                ></div>`;
              },
            },
          },
        ];
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      plugins,
    });

    return () => autocompleteInstance.destroy();
  }, [token]);

  return <div className={className} ref={autocompleteContainer} />;
}
