import { Post } from '../components/post/post';
import { GetStaticProps } from 'next';
import cover from '../_pages/images/lista-cover.jpg';
import Link from 'next/link';
import * as posts from '../_posts/content/all-posts';
import * as offtops from '../_offtopic/all-offtopics';
import { compareAsc, format } from 'date-fns';
import { pl } from 'date-fns/locale';
import styles from '../components/common.module.scss';

type Article = {
  date: string;
  title: string;
  url: string;
};

type Props = {
  articles: Article[];
};

export function SpisArtykulow({ articles }: Props) {
  return (
    <Post
      metadata={{
        title: 'Spis artykułów',
        updateTime: '2023-05-12T18:04:35+00:00',
        publishTime: '2023-05-12T10:35:47+00:00',
        abstract: 'Spis wszystkich artykułów dostępnych na świstak.codes',
        categories: [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cover: cover,
        firstParagraph: '',
        keyword: '',
        slug: 'spis-artykulow',
      }}
      isPage
      showFooter={false}
    >
      <div className={styles.hideToc}>
        <ul>
          {articles.map((x) => (
            <li key={x.url}>
              <Link href={x.url}>{x.title}</Link> ({x.date})
            </li>
          ))}
        </ul>
      </div>
    </Post>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // TODO move this logic outside to make it unit-testable
  const allPosts = [...Object.values(posts), ...Object.values(offtops)];
  const sortedPosts = allPosts.sort((a, b) =>
    compareAsc(new Date(a.meta.publishTime), new Date(b.meta.publishTime))
  );

  const articles: Article[] = sortedPosts.map((post) => ({
    url: `/${post.meta.isOfftopic ? 'offtopic' : 'post'}/${post.meta.slug}`,
    title: post.meta.title,
    date: format(new Date(post.meta.publishTime), 'do MMMM yyyy', {
      locale: pl,
    }),
  }));

  return {
    props: {
      articles,
    },
  };
};

export default SpisArtykulow;
