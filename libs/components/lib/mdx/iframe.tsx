import styles from './iframe.module.scss';

const CDN_ADDRESS = 'https://lightbulb-sun.swistak.codes/shared';

type Props = {
  src: string;
  minHeight: number;
};

export const Iframe = ({ src, minHeight }: Props) => (
  <iframe
    src={`${CDN_ADDRESS}${src}`}
    title={src}
    className={styles.iframe}
    style={{ height: `${minHeight}px` }}
  />
);
