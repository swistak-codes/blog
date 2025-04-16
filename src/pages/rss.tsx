import { GetStaticProps } from 'next';
import { generateRss } from '@swistak-codes/rss-generator';
import * as posts from '../_posts/content/all-posts';
import * as offtops from '../_offtopic/all-offtopics';
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
  const all = await generateRss('Wszystkie wpisy', 'all', [
    ...Object.values(posts),
    ...Object.values(offtops),
  ]);
  const main = await generateRss(
    'Wpisy ze strony głównej',
    'main',
    Object.values(posts)
  );
  const offtopics = await generateRss(
    'Wpisy offtopic',
    'offtopic',
    Object.values(offtops)
  );

  return {
    props: {
      rss: [
        { feedName: 'Wszystkie wpisy', paths: all },
        { feedName: 'Wpisy ze strony głównej', paths: main },
        { feedName: 'Wpisy offtopic', paths: offtopics },
      ],
    },
  };
};

export default Rss;
