import NextImage from 'next/legacy/image';
import Link from 'next/link';
import { ImageData } from '@swistak-codes/types';
import clsx from 'clsx';
import styles from './post-header.module.scss';
import commonStyles from '../common.module.scss';
import {
  createElement,
  memo,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

type Props = {
  image: ImageData | string;
  title: string;
  link?: string | null;
  aspectRatio?: string;
  moveToTop?: boolean;
  moveToBottom?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const PostHeaderComponent = ({
  image,
  title,
  link,
  aspectRatio = '16/9',
  moveToTop = false,
  moveToBottom = false,
  onClick,
}: Props) => {
  const shouldBeLink = link != null;
  const Wrapper = shouldBeLink
    ? ({ children }: PropsWithChildren) => (
        <Link href={link} passHref scroll prefetch={false} legacyBehavior>
          <a className={commonStyles.pureLink} onClick={onClick}>
            {children}
          </a>
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
          placeholder={typeof image === 'string' ? 'empty' : 'blur'}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition={
            moveToTop ? 'top' : moveToBottom ? 'bottom' : 'center'
          }
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
