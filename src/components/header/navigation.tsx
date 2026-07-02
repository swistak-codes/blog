import { HeaderLink } from './header-link';
import commonHeaderStyles from './common-header.module.scss';
import clsx from 'clsx';

export const Navigation = () => {
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
      <HeaderLink href="/o-mnie" icon="ph-user">
        O mnie
      </HeaderLink>
      <HeaderLink href="/publikacje" icon="ph-article-ny-times">
        Publikacje
      </HeaderLink>
    </nav>
  );
};
