import { useEffect, useState } from 'react';

const enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const LOCAL_STORAGE_KEY = 'theme';

const getInitialValue = () => {
  if (typeof window !== 'undefined') {
    const localTheme = window.localStorage.getItem('theme') as Theme;
    if (localTheme) {
      return localTheme;
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return Theme.Dark;
    }
  }
  return Theme.Light;
};

export const useDarkMode = (): [() => void, boolean] => {
  const [themeMode, setThemeMode] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const initialTheme = getInitialValue();
    setThemeMode(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const setMode = (mode: Theme) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    setMode(themeMode === Theme.Light ? Theme.Dark : Theme.Light);
  };

  return [toggleTheme, themeMode === Theme.Dark];
};
