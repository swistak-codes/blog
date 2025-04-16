import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import styles from '../components/common.module.scss';

export function XmlRpcPhp() {
  return (
    <div className={styles.centered}>
      <NextSeo
        nofollow
        noindex
        robotsProps={{ noarchive: true, nosnippet: true, noimageindex: true }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://anesthetize.swistak.codes/gifs/xmlrpc.webp" alt="" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.statusCode = 418;

  return {
    props: {},
  };
};

export default XmlRpcPhp;
