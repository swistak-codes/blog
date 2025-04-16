import { HeaderLink } from './header-link';
import commonHeaderStyles from './common-header.module.scss';
import clsx from 'clsx';
import { MouseEventHandler, useCallback, useState } from 'react';
import { Search } from '../search/search';

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    setIsSearchOpen(true);
  }, []);

  return (
    <nav
      className={clsx(
        commonHeaderStyles.menuContainer,
        commonHeaderStyles.menuContainerMargin
      )}
    >
      <HeaderLink href="/" icon="ph-house">
        Główna
      </HeaderLink>
      <HeaderLink href="/offtopic" icon="ph-island">
        Offtopic
      </HeaderLink>
      <HeaderLink href="#" icon="ph-magnifying-glass" onClick={openSearch}>
        Szukaj
      </HeaderLink>
      <HeaderLink href="/o-mnie" icon="ph-user">
        O mnie
      </HeaderLink>
      <HeaderLink href="/publikacje" icon="ph-article-ny-times">
        Publikacje
      </HeaderLink>
      <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </nav>
  );
};
