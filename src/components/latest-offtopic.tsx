import Link from 'next/link';
import styles from './common.module.scss';

type Props = {
  date: string;
  url: string;
  name: string;
};

export const LatestOfftopic = ({ date, name, url }: Props) => (
  <section className={styles.section}>
    <article className={styles.contentContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.unitPadding}>
          Najnowszy post offtopicowy ({date}):{' '}
          <Link href={url} scroll prefetch={false}>
            {name}
          </Link>
        </div>
      </div>
    </article>
  </section>
);
