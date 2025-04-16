import React, { forwardRef } from 'react';
import clsx from 'clsx';

import styles from '../presentations-ranking.module.scss';

export interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const List = forwardRef<HTMLUListElement, Props>(
  ({ children, style }: Props, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
          } as React.CSSProperties
        }
        className={clsx(styles['list'])}
      >
        {children}
      </ul>
    );
  }
);
