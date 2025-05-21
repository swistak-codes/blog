import React from 'react';
import { useGameStore } from './store';
import styles from './binary-search-2d.module.scss';
import clsx from 'clsx';

export const Results = () => {
  const { isPaused, guessCount, restartGame } = useGameStore();

  return (
    <div
      className={clsx({ [styles.controls]: true, [styles.hidden]: !isPaused })}
    >
      <p>Zgadłem za {guessCount + 1} razem!</p>
      <button onClick={restartGame} disabled={!isPaused}>
        Próbujemy jeszcze raz?
      </button>
    </div>
  );
};
