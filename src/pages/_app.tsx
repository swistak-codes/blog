import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useDarkMode } from '../hooks/use-dark-mode';
import { DefaultSeo } from 'next-seo';
import { seoConfig } from '../../config/seo.config';
import { Header } from '../components/header/header';
import { MoveToTop } from '../components/move-to-top/move-to-top';
import { Footer } from '../components/footer/footer';
import { init } from '@socialgouv/matomo-next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../variables.scss';
import '../global.scss';
import styles from '../components/common.module.scss';
import { ThemeContext } from '../components/theme-context';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [toggleTheme, isDark] = useDarkMode();

  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL,
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = () =>
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <DefaultSeo {...seoConfig} />
      <div>
        <Header handleToggleTheme={toggleTheme} isDark={isDark} />
        <div className={styles.fakeBody}>
          <main className={styles.pageContainer}>
            <ThemeContext.Provider value={isDark}>
              <Component {...pageProps} />
            </ThemeContext.Provider>
          </main>
        </div>
        <Footer />
        <MoveToTop />
      </div>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default CustomApp;
