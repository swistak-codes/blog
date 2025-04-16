import { default as Page, meta } from '../_pages/o-mnie.mdx';
import { Post } from '../components/post/post';
import styles from '../components/common.module.scss';

export function OMnie() {
  return (
    <Post metadata={meta} isPage>
      <div className={styles.hideToc}>
        <Page />
      </div>
    </Post>
  );
}

export default OMnie;
