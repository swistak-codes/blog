import { PreviousPage } from './previous-page';
import { NextPage } from './next-page';
import { Props } from './types';
import { PageLinks } from './page-links';
import styles from './pagination.module.scss';
import commonStyles from '../../common.module.scss';

export const Pagination = ({ currentPage, allPages, basePath }: Props) => {
  return (
    <>
      {allPages > 1 && (
        <section className={commonStyles.section}>
          <nav className={styles.wrapper}>
            <PreviousPage currentPage={currentPage} basePath={basePath} />
            <PageLinks
              currentPage={currentPage}
              allPages={allPages}
              basePath={basePath}
            />
            <NextPage
              currentPage={currentPage}
              allPages={allPages}
              basePath={basePath}
            />
          </nav>
        </section>
      )}
    </>
  );
};
