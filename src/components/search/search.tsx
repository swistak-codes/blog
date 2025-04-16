import { TokenResponse } from '@swistak-codes/types';
import ReactModal from 'react-modal';
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import styles from './search.module.scss';
import dynamic from 'next/dynamic';
import { SearchContext } from './search-context';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchContent = dynamic(() => import('./search-content'), {
  ssr: false,
});

const getToken = async () => {
  const response = await fetch('/api/search-token', {
    method: 'POST',
    mode: 'same-origin',
    cache: 'no-cache',
  });
  return (await response.json()) as TokenResponse;
};

export const Search = ({ isOpen, setIsOpen }: Props) => {
  const [searchToken, setSearchToken] = useState('');
  const [suggestionsToken, setSuggestionsToken] = useState('');
  const [tokenTimeout, setTokenTimeout] = useState<number | null>(null);
  const refresh = useRef(false);

  const close = useCallback(() => {
    setIsOpen(false);
    refresh.current = false;
  }, [setIsOpen]);
  const handleCloseButton: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      e.preventDefault();
      close();
    },
    [close]
  );
  const handleOpen = useCallback(async () => {
    refresh.current = true;
    const handler = async () => {
      if (refresh.current) {
        const tokenResponse = await getToken();
        setSearchToken(tokenResponse.searchToken);
        setSuggestionsToken(tokenResponse.suggestionsToken);
        const expiry = tokenResponse.expiresAt - Date.now();
        const timeout = window.setTimeout(handler, expiry);
        if (tokenTimeout != null) {
          clearTimeout(tokenTimeout);
        }
        setTokenTimeout(timeout);
      } else {
        setSearchToken('');
        setSuggestionsToken('');
        setTokenTimeout(null);
      }
    };
    if (!searchToken) {
      await handler();
    }
  }, [searchToken, tokenTimeout]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={close}
      onAfterOpen={handleOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc={false}
      closeTimeoutMS={500}
      className={styles.searchModal}
      overlayClassName={styles.searchOverlay}
    >
      <div className={styles.closeContainer}>
        <a href="#" onClick={handleCloseButton} title="Zamknij">
          <i className={'ph ph-x'}></i>
        </a>
      </div>
      <SearchContext.Provider value={{ setIsOpen }}>
        {searchToken ? (
          <SearchContent
            searchToken={searchToken}
            suggestionsToken={suggestionsToken}
          />
        ) : (
          <div className={styles.searchLoader}>
            <i className="ph ph-spinner-gap"></i>
          </div>
        )}
      </SearchContext.Provider>
    </ReactModal>
  );
};
