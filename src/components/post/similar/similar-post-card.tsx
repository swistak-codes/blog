import { SimilarPost } from '@swistak-codes/types';
import Link from 'next/link';
import styles from './similar-posts.module.scss';
import commonStyles from '../../common.module.scss';
import { getCdnUrl } from '../../../shared/logic/cdn-url';

type Props = {
  post: SimilarPost;
};

export const SimilarPostCard = ({ post }: Props) => (
  <div className={styles.postBox}>
    <Link
      href={`/${post.type === 'offtopic' ? 'offtopic' : 'post'}/${post.slug}`}
      passHref
      scroll
      prefetch={false}
      legacyBehavior
    >
      <a className={commonStyles.pureLink}>
        <div className={styles.postImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/_next/image/?url=${encodeURIComponent(getCdnUrl(post.image))}&w=3840&q=75`}
            alt=""
          />
        </div>
        {post.title}
      </a>
    </Link>
  </div>
);
