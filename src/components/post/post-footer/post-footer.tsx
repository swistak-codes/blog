import { PostMetadata, RenderedPostMetadata } from '@swistak-codes/types';
import React from 'react';
import { SocialsAdvert } from './socials-advert';
import { TagsCategories } from './tags-categories';
import { PrevNext } from './prev-next';
import { Share } from './share';
import styles from './post-footer.module.scss';
import clsx from 'clsx';

type Props = {
  metadata: RenderedPostMetadata | PostMetadata;
  categoryMap?: Record<string, string>;
  tagsMap: Record<string, string>;
  toShow: 'top' | 'bottom' | 'all';
};

export const PostFooter = ({
  metadata,
  categoryMap,
  tagsMap,
  toShow,
}: Props) => {
  return (
    <div
      className={clsx({
        [styles.postFooterContainer]: true,
        [styles.top]: toShow === 'top',
      })}
    >
      {(toShow === 'all' || toShow === 'top') && <Share metadata={metadata} />}
      {toShow === 'all' && <hr className={styles.divider} />}
      {(toShow === 'all' || toShow === 'bottom') && (
        <>
          <SocialsAdvert />
          {categoryMap &&
            tagsMap &&
            metadata.categories.length > 0 &&
            metadata.tags.length > 0 && (
              <TagsCategories
                categories={metadata.categories}
                nameToPathsMap={categoryMap}
                nameToSlugsMap={tagsMap}
                tags={metadata.tags}
              />
            )}
          <PrevNext metadata={metadata} />
        </>
      )}
    </div>
  );
};
