import 'react-toggle/style.css';
import styles from './theme-change-button.module.scss';
import Toggle from 'react-toggle';

type Props = {
  handleThemeChange: () => void;
  isDark: boolean;
};

export const ThemeChangeButton = ({ handleThemeChange, isDark }: Props) => (
  <div className={styles.container}>
    <div>
      <Toggle
        checked={!isDark}
        aria-label="Zmień motyw kolorystyczny"
        onChange={handleThemeChange}
        icons={{
          checked: <i className="ph ph-sun" />,
          unchecked: <i className="ph ph-moon" />,
        }}
        className={styles.toggle}
      />
    </div>
  </div>
);
