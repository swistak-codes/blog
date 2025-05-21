import React from 'react';
import styles from './binary-search-2d.module.scss';
import { SquareConfig } from './utils';

interface GridProps {
  width: number;
  squareConfigs?: { [key: string]: SquareConfig };
}

export const Grid = ({ width, squareConfigs = {} }: GridProps) => {
  const totalSquares = width * width;

  const getSquareConfig = (x: number, y: number): SquareConfig => {
    const key = `${x},${y}`;
    return squareConfigs[key] || {};
  };

  return (
    <div
      className={styles.grid}
      style={{ '--grid-size': width } as React.CSSProperties}
    >
      {Array.from({ length: totalSquares }).map((_, index) => {
        const x = index % width;
        const y = Math.floor(index / width);
        const { background } = getSquareConfig(x, y);

        return (
          <div
            key={index}
            className={styles.square}
            style={{ backgroundColor: background || 'var(--sc--background)' }}
          ></div>
        );
      })}
    </div>
  );
};
