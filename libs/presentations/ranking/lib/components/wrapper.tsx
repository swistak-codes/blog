import React from 'react';
import clsx from 'clsx';

import styles from '../presentations-ranking.module.scss';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Wrapper({ children, style }: Props) {
  return (
    <div className={clsx(styles['wrapper'], styles['center'])} style={style}>
      {children}
    </div>
  );
}
