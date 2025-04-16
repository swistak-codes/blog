import {
  emptyPrevNext,
  PostMetadata,
  RenderedPostMetadata,
} from '@swistak-codes/types';
import Link from 'next/link';
import React from 'react';
import styles from './prev-next.module.scss';
import commonStyles from '../../common.module.scss';

type Props = {
  metadata: RenderedPostMetadata | PostMetadata;
};

export const PrevNext = ({ metadata }: Props) => {
  const { previous, previousName, next, nextName } =
    'prevNext' in metadata && !!metadata.prevNext
      ? metadata.prevNext
      : emptyPrevNext;

  return (
    <nav className={styles.prevNextContainer}>
      <div className={styles.prevNextWrapper}>
        {previous && (
          <>
            <div>Poprzedni wpis</div>
            <div>
              <Link href={previous} prefetch={false} scroll>
                {previousName}
              </Link>
            </div>
          </>
        )}
      </div>
      <div className={styles.prevNextWrapper}>
        {next && (
          <>
            <div>Następny wpis</div>
            <div>
              <Link href={next} prefetch={false} scroll>
                {nextName}
              </Link>
            </div>
          </>
        )}
      </div>
      <div className={commonStyles.clearfix} />
    </nav>
  );
};
