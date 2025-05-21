import { create } from 'zustand';
import { GRID_SIZE } from './utils';

interface ActiveArea {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface GameState {
  isStarted: boolean;
  isPaused: boolean;
  guessCount: number;
  activeArea: ActiveArea;
  startGame: () => void;
  pauseGame: () => void;
  restartGame: () => void;
  setActiveArea: (area: ActiveArea) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isStarted: false,
  isPaused: false,
  guessCount: 0,
  activeArea: { startX: 0, startY: 0, endX: GRID_SIZE, endY: GRID_SIZE },
  startGame: () =>
    set({
      isStarted: true,
      isPaused: false,
      guessCount: 0,
      activeArea: { startX: 0, startY: 0, endX: GRID_SIZE, endY: GRID_SIZE },
    }),
  pauseGame: () => set({ isPaused: true }),
  restartGame: () =>
    set({
      isStarted: false,
      isPaused: false,
      guessCount: 0,
      activeArea: { startX: 0, startY: 0, endX: GRID_SIZE, endY: GRID_SIZE },
    }),
  setActiveArea: (area: ActiveArea) =>
    set((state) => {
      const isSingleSquare =
        area.endX - area.startX === 1 && area.endY - area.startY === 1;
      return {
        activeArea: area,
        isPaused: isSingleSquare ? true : state.isPaused,
        guessCount: state.guessCount + 1,
      };
    }),
}));
