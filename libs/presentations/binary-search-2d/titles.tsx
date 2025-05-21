import React from 'react';
import styles from './binary-search-2d.module.scss';

export const Titles = () => {
  return (
    <div className={styles.header}>
      <p className={styles['header-title']}>Zgadnę, które pole wybierzesz!</p>
      <p className={styles['header-subtitle']}>
        Pomyśl o polu w poniższej siatce i pozwól mi zgadnąć, które
        wybrałeś(&#8209;aś).
      </p>
    </div>
  );
};
