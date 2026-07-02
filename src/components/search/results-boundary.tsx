import { PropsWithChildren } from 'react';
import { useInstantSearch } from 'react-instantsearch';
import { EmptyResults } from './empty-results';

export const ResultsBoundary = ({ children }: PropsWithChildren) => {
  const { results, status } = useInstantSearch();

  if (status === 'idle' && results != null && results.nbHits === 0) {
    return <EmptyResults />;
  }

  return <>{children}</>;
};
