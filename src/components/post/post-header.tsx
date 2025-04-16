import NextImage from 'next/legacy/image';
import Link from 'next/link';
import { ImageData } from '@swistak-codes/types';
import clsx from 'clsx';
import styles from './post-header.module.scss';
import commonStyles from '../common.module.scss';
import { createElement, memo, PropsWithChildren } from 'react';

type Props = {
  image: ImageData;
  title: string;
  link?: string | null;
  aspectRatio?: string;
  moveToTop?: boolean;
};

const PostHeaderComponent = ({
  image,
  title,
  link,
  aspectRatio = '16/9',
  moveToTop = false,
}: Props) => {
  const shouldBeLink = link != null;
  const Wrapper = shouldBeLink
    ? ({ children }: PropsWithChildren) => (
        <Link href={link} passHref scroll prefetch={false} legacyBehavior>
          <a className={commonStyles.pureLink}>{children}</a>
        </Link>
      )
    : ({ children }: PropsWithChildren) => <>{children}</>;

  return (
    <Wrapper>
      <div
        style={{ aspectRatio }}
        className={clsx({
          [styles.styleWrapper]: true,
          [styles.useHoverEffect]: shouldBeLink,
        })}
      >
        <NextImage
          src={image}
          placeholder="blur"
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition={moveToTop ? 'top' : 'center'}
        />
        <div className={styles.title}>
          {createElement(
            shouldBeLink ? 'span' : 'h1',
            { className: styles.titleWrapper },
            title,
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export const PostHeader = memo(PostHeaderComponent);
