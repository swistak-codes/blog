import { GetStaticProps } from 'next';
import { generateRss } from '@swistak-codes/rss-generator';
import * as posts from '../_posts/content/all-posts';
import styles from '../components/common.module.scss';

type Props = {
  rss: {
    feedName: string;
    paths: { rss2: string; json: string; atom: string };
  }[];
};

export function Rss({ rss }: Props) {
  return (
    <main>
      <h1>
        <i className="ph ph-rss"></i> RSS
      </h1>
      <article className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <p style={{ padding: '1rem 0 0 1rem' }}>
            Zasubskrybuj treści, które Cię interesują w najwygodniejszym dla
            Ciebie formacie!
          </p>
          <ul style={{ paddingBottom: '1rem' }}>
            {rss.map((x) => (
              <li key={x.feedName}>
                {x.feedName}
                <ul>
                  <li>
                    <a href={x.paths.rss2} target="_blank" rel="noreferrer">
                      RSS 2.0
                    </a>
                  </li>
                  <li>
                    <a href={x.paths.atom} target="_blank" rel="noreferrer">
                      Atom 1.0
                    </a>
                  </li>
                  <li>
                    <a href={x.paths.json} target="_blank" rel="noreferrer">
                      JSON Feed 1.0
                    </a>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const all = await generateRss('Wszystkie wpisy', 'all', Object.values(posts));

  return {
    props: {
      rss: [{ feedName: 'Wszystkie wpisy', paths: all }],
    },
  };
};

export default Rss;
