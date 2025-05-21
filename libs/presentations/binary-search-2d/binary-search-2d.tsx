import React from 'react';
import { GameBoard } from './game-board';
import { Controls } from './controls';
import { Titles } from './titles';
import { Results } from './results';
import styles from './binary-search-2d.module.scss';

const BinarySearch2d = () => {
  return (
    <div className={styles['theme-container']}>
      <Titles />
      <Controls />
      <GameBoard />
      <Results />
    </div>
  );
};

export default BinarySearch2d;
