import { createContext } from 'react';

type ContextType = {
  setIsOpen: (isOpen: boolean) => void;
};

export const SearchContext = createContext<ContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
});
