import generateMaze from 'generate-maze';

export const generate = (size: number) =>
  generateMaze(size, size, true, Math.random() * Number.MAX_SAFE_INTEGER);
