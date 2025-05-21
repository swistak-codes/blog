import React from 'react';
import { Grid } from './grid';
import { SquareConfigs, GRID_SIZE } from './utils';
import { useGameStore } from './store';

export const GameBoard = () => {
  const { isStarted, isPaused, activeArea } = useGameStore();

  const generateSquareConfigs = (): SquareConfigs => {
    const configs: SquareConfigs = {};
    const { startX, startY, endX, endY } = activeArea;
    const centerX = Math.floor((startX + endX) / 2);
    const centerY = Math.floor((startY + endY) / 2);

    if (!isStarted) return configs;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const key = `${x},${y}`;

        if (x === centerX && y === centerY) {
          configs[key] = { background: 'var(--color-center)' };
        } else if (!isPaused) {
          if (x < centerX && y < centerY) {
            configs[key] = { background: 'var(--color-northwest)' };
          } else if (x >= centerX && y < centerY) {
            configs[key] = { background: 'var(--color-northeast)' };
          } else if (x < centerX && y >= centerY) {
            configs[key] = { background: 'var(--color-southwest)' };
          } else if (x >= centerX && y >= centerY) {
            configs[key] = { background: 'var(--color-southeast)' };
          }
        }
      }
    }

    return configs;
  };

  const squareConfigs = generateSquareConfigs();

  return <Grid width={GRID_SIZE} squareConfigs={squareConfigs} />;
};
