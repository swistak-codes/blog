import styles from '../components/common.module.scss';
import { NextSeo } from 'next-seo';
import TarpitContactForm from '../components/tarpit-contact-form';

export function Contact() {
  return (
    <div className={styles.centered}>
      <NextSeo
        nofollow
        noindex
        robotsProps={{ noarchive: true, nosnippet: true, noimageindex: true }}
      />
      <TarpitContactForm />
    </div>
  );
}

export default Contact;
