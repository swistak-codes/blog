import { create } from 'zustand';
import { Block } from '../utils/types';
import { DEFAULT_QUANTIZATION_MATRIX } from '../utils/consts';

type State = {
  originalImage: number[];
  width: number;
  height: number;
  blocks: Block[];
  encodedImage: number[];
  quantizationMatrix: number[][];
  quality: number;
  displayedBlock: number | null;
  showValues: boolean;
  showGrid: boolean;
  showNormalized: boolean;
  estimatedBlockSizes: number[];

  setImage: (image: number[], width: number, height: number) => void;
  setBlocks: (blocks: Block[]) => void;
  setEncodedImage: (encodedImage: number[]) => void;
  setQuantizationMatrix: (quantizationMatrix: number[][]) => void;
  setQuality: (quality: number) => void;
  setDisplayedBlock: (displayedBlock: number | null) => void;
  toggleShowValues: () => void;
  toggleShowGrid: () => void;
  toggleShowNormalized: () => void;
  setEstimatedBlockSizes: (estimatedBlockSizes: number[]) => void;
};

export const useStore = create<State>((set) => ({
  originalImage: [],
  width: 0,
  height: 0,
  blocks: [],
  encodedImage: [],
  quantizationMatrix: structuredClone(DEFAULT_QUANTIZATION_MATRIX),
  quality: 50,
  displayedBlock: null,
  showValues: true,
  showGrid: true,
  showNormalized: false,
  estimatedBlockSizes: [],

  setImage: (image, width, height) => {
    set({
      originalImage: image,
      width,
      height,
      displayedBlock: null,
    });
  },
  setBlocks: (blocks) => {
    set({ blocks });
  },
  setEncodedImage: (encodedImage) => {
    set({ encodedImage });
  },
  setQuantizationMatrix: (quantizationMatrix) => {
    set({ quantizationMatrix });
  },
  setQuality: (quality) => {
    set({ quality });
  },
  setDisplayedBlock: (displayedBlock) => {
    set({ displayedBlock });
  },
  toggleShowValues: () => {
    set((x) => ({
      showValues: !x.showValues,
    }));
  },
  toggleShowGrid: () => {
    set((x) => ({
      showGrid: !x.showGrid,
    }));
  },
  toggleShowNormalized: () => {
    set((x) =>
      x.showNormalized
        ? {
            showNormalized: false,
          }
        : {
            showNormalized: true,
            showValues: true,
          }
    );
  },
  setEstimatedBlockSizes: (estimatedBlockSizes) => {
    set({ estimatedBlockSizes });
  },
}));
