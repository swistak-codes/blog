import React, { useMemo } from 'react';
import clsx from 'clsx';
import styles from './primorial-sieve.module.scss';

function isPrime(n: number) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

const primorial = 30;
const struts = [1, 7, 11, 13, 17, 19, 23, 29];
const rows = 15;

export const PrimorialSieve: React.FC = () => {
  const cells = useMemo(() => {
    const allCells = [];
    for (let row = 0; row < rows; row++) {
      const base = row * primorial;
      for (let col = 0; col < primorial; col++) {
        const number = base + col + 1;
        const isStrut = struts.includes(col + 1);

        const cellClass = clsx(styles.cell, {
          [styles.cellStrutPrime]: isStrut && number > 1 && isPrime(number),
          [styles.cellStrut]: isStrut && !(number > 1 && isPrime(number)),
          [styles.cellNonStrut]: !isStrut,
        });

        allCells.push(
          <div key={`${row}-${col}`} className={cellClass}>
            {number}
          </div>,
        );
      }
    }
    for (let col = 0; col < primorial; col++) {
      const idx = struts.indexOf(col + 1);
      if (idx !== -1) {
        allCells.push(
          <div key={`label-${col}`} className={styles.strutLabel}>
            {`S${idx + 1}`}
          </div>,
        );
      } else {
        allCells.push(<div key={`label-${col}`} className={styles.cell}></div>);
      }
    }
    return allCells;
  }, []);

  return (
    <div className={clsx(styles.container, 'ignore-styles')}>
      <div className={styles.grid}>{cells}</div>
    </div>
  );
};
