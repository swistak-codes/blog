import { useSearchBox } from 'react-instantsearch';
import { useEffect } from 'react';

type Props = {
  query: string;
};

export const SearchQuerySync = ({ query }: Props) => {
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(query);
  }, [query, refine]);

  return null;
};
