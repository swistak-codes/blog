import { create } from 'zustand';
import { ControlState } from '../types';

export interface RayCastingStore {
  isGameStarted: boolean;
  planeWidth: number;
  rayCount: number;
  dirLength: number;
  fishEyeCorrection: boolean;
  showPerpDistances: boolean;
  resetKey: number;
  controlState: ControlState;

  startGame: () => void;
  setPlaneWidth: (value: number) => void;
  setRayCount: (value: number) => void;
  setDirLength: (value: number) => void;
  setFishEyeCorrection: (value: boolean) => void;
  setShowPerpDistances: (value: boolean) => void;
  setControl: (key: keyof ControlState, value: boolean) => void;
  reset: () => void;
}

const initialState = {
  isGameStarted: false,
  planeWidth: 0.66,
  rayCount: 32,
  dirLength: 1,
  fishEyeCorrection: true,
  showPerpDistances: true,
  resetKey: 0,
  controlState: {
    forward: false,
    back: false,
    left: false,
    right: false,
  } as ControlState,
};

export const useRayCastingStore = create<RayCastingStore>((set) => ({
  ...initialState,

  startGame: () => set({ isGameStarted: true }),

  setPlaneWidth: (value: number) => set({
    planeWidth: value,
  }),

  setRayCount: (value: number) => set({
    rayCount: value,
  }),

  setDirLength: (value: number) => set({
    dirLength: value,
  }),

  setFishEyeCorrection: (value: boolean) => set((state) => ({
    fishEyeCorrection: value,
    showPerpDistances: state.showPerpDistances && value,
  })),

  setShowPerpDistances: (value: boolean) => set((state) => ({
    showPerpDistances: value && state.fishEyeCorrection,
  })),

  setControl: (key: keyof ControlState, value: boolean) => set((state) => ({
    controlState: { ...state.controlState, [key]: value },
  })),

  reset: () => set((state) => ({
    ...initialState,
    resetKey: state.resetKey + 1,
    isGameStarted: true,
    controlState: {
      ...initialState.controlState,
    },
  })),
}));
