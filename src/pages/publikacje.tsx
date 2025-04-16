import { default as Page, meta } from '../_pages/publikacje.mdx';
import { Post } from '../components/post/post';
import styles from '../components/common.module.scss';

export function Publikacje() {
  return (
    <Post metadata={meta} isPage>
      <div className={styles.hideToc}>
        <Page />
      </div>
    </Post>
  );
}

export default Publikacje;
