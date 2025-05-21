import React from 'react';
import { useGameStore } from './store';
import styles from './binary-search-2d.module.scss';

export const Controls = () => {
  const {
    isStarted,
    isPaused,
    startGame,
    activeArea,
    setActiveArea,
    pauseGame,
  } = useGameStore();
  const { startX, startY, endX, endY } = activeArea;

  const centerX = Math.floor((startX + endX) / 2);
  const centerY = Math.floor((startY + endY) / 2);

  const handleGroupClick = (group: string) => {
    if (isPaused) return;

    switch (group) {
      case 'northwest':
        setActiveArea({ startX, startY, endX: centerX, endY: centerY });
        break;
      case 'northeast':
        setActiveArea({ startX: centerX, startY, endX, endY: centerY });
        break;
      case 'southwest':
        setActiveArea({ startX, startY: centerY, endX: centerX, endY });
        break;
      case 'southeast':
        setActiveArea({ startX: centerX, startY: centerY, endX, endY });
        break;
      case 'center':
        pauseGame();
        break;
    }
  };

  const isGroupDisabled = (group: string): boolean => {
    const isSingleSquareInGroup = (
      groupStartX: number,
      groupStartY: number,
      groupEndX: number,
      groupEndY: number,
    ) => {
      return groupEndX - groupStartX === 1 && groupEndY - groupStartY === 1;
    };

    switch (group) {
      case 'northwest':
        return (
          isSingleSquareInGroup(startX, startY, centerX, centerY) &&
          startX === centerX &&
          startY === centerY
        );
      case 'northeast':
        return (
          isSingleSquareInGroup(centerX, startY, endX, centerY) &&
          centerX === centerX &&
          startY === centerY
        );
      case 'southwest':
        return (
          isSingleSquareInGroup(startX, centerY, centerX, endY) &&
          startX === centerX &&
          centerY === centerY
        );
      case 'southeast':
        return (
          isSingleSquareInGroup(centerX, centerY, endX, endY) &&
          centerX === centerX &&
          centerY === centerY
        );
      default:
        return false;
    }
  };

  return (
    <div className={styles.controls}>
      {!isStarted && <button onClick={startGame}>Zacznijmy!</button>}
      {isStarted && (
        <div className={styles['group-controls']}>
          <button
            className={styles['northwest']}
            onClick={() => handleGroupClick('northwest')}
            disabled={isPaused || isGroupDisabled('northwest')}
          >
            &nbsp;
          </button>
          <button
            className={styles['northeast']}
            onClick={() => handleGroupClick('northeast')}
            disabled={isPaused || isGroupDisabled('northeast')}
          >
            &nbsp;
          </button>
          <button
            className={styles['center']}
            onClick={() => handleGroupClick('center')}
            disabled={isPaused}
          >
            &nbsp;
          </button>
          <button
            className={styles['southwest']}
            onClick={() => handleGroupClick('southwest')}
            disabled={isPaused || isGroupDisabled('southwest')}
          >
            &nbsp;
          </button>
          <button
            className={styles['southeast']}
            onClick={() => handleGroupClick('southeast')}
            disabled={isPaused || isGroupDisabled('southeast')}
          >
            &nbsp;
          </button>
        </div>
      )}
    </div>
  );
};
