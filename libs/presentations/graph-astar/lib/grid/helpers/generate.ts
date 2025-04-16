import { GridCellInfo } from '../types';

export const generate = (size: number, traps: number) => {
  const result: GridCellInfo[][] = [];

  for (let i = 0; i < size; i++) {
    const row: GridCellInfo[] = [];
    for (let j = 0; j < size; j++) {
      row.push({
        x: j,
        y: i,
        isBlocked: false,
      });
    }
    result.push(row);
  }

  let blocked = 0;
  while (blocked < traps) {
    const randomX = Math.floor(Math.random() * size);
    const randomY = Math.floor(Math.random() * size);
    if (!result[randomY][randomX].isBlocked) {
      result[randomY][randomX].isBlocked = true;
      blocked++;
    }
  }

  return result;
};
