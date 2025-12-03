import { create, StoreApi } from 'zustand';
import type { Color } from './types';
import { createContext } from 'zustand-utils';

export interface State {
  image: number[][];
  width: number;
  height: number;
  background: Color;

  setImage: (image: number[][], width: number, height: number) => void;
  setBackground: (color: Color) => void;
}

export const createStore = () =>
  create<State>((set) => ({
    image: [],
    width: 0,
    height: 0,
    background: { r: 255, g: 255, b: 255 },

    setImage: (image, width, height) => {
      set({
        image,
        width,
        height,
      });
    },
    setBackground: (color) => {
      set({
        background: color,
      });
    },
  }));

export const { Provider, useStore } = createContext<StoreApi<State>>();
