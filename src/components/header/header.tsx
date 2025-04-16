import { PageTitle } from './page-title';
import { Navigation } from './navigation';
import { Socials } from './socials';
import { ThemeChangeButton } from './theme-change-button';
import { SupportContainer } from './support-container';
import styles from './header.module.scss';

type Props = {
  handleToggleTheme: () => void;
  isDark: boolean;
};

export const Header = ({ handleToggleTheme, isDark }: Props) => {
  return (
    <header className={styles.container}>
      <ThemeChangeButton
        handleThemeChange={handleToggleTheme}
        isDark={isDark}
      />
      <PageTitle />
      <Socials />
      <Navigation />
      <SupportContainer />
    </header>
  );
};
