import styles from '../components/common.module.scss';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

export function Jp2() {
  return (
    <div className={styles.centered}>
      <NextSeo
        nofollow
        noindex
        robotsProps={{ noarchive: true, nosnippet: true, noimageindex: true }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.statusCode = 418;

  return {
    props: {},
  };
};

export default Jp2;
