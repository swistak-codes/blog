export const SELECTION_COLOR = 'dodgerblue';
export const PATH_COLOR = 'lightskyblue';
export const TRAP_COLOR = 'black';

export const highlightColor = (value: number) => `hsl(0, 100%, ${value}%)`;

document.documentElement.style.setProperty(
  '--sc__astar--selection',
  SELECTION_COLOR
);
document.documentElement.style.setProperty('--sc__astar--path', PATH_COLOR);
document.documentElement.style.setProperty('--sc__astar--trap', TRAP_COLOR);
