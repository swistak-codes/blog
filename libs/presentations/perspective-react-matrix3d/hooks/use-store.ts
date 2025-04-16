import { create } from 'zustand';
import { Point, TransformationMatrix } from '../types';

interface State {
  base64Image: string | null;
  width: number;
  height: number;
  points: {
    '1': Point;
    '2': Point;
    '3': Point;
    '4': Point;
  };
  transformationMatrix: TransformationMatrix;

  setImage: (image: File) => Promise<void>;
  setPoint: (id: string, point: Point) => void;
  setTransformationMatrix: (matrix: TransformationMatrix) => void;
}

const MAX_WIDTH =
  document.getElementById('post-content')?.getBoundingClientRect().width ??
  1280;
const MAX_HEIGHT = 720;

export const useStore = create<State>((set) => ({
  base64Image: null,
  width: 0,
  height: 0,
  points: {
    '1': [0, 0],
    '2': [0, 0],
    '3': [0, 0],
    '4': [0, 0],
  },
  transformationMatrix: [1, 0, 0, 0, 1, 0, 0, 0],

  setImage: async (image: File) => {
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(image);
    });

    const img = new Image();
    img.src = base64Image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    let { width, height } = img;

    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      const widthRatio = MAX_WIDTH / width;
      const heightRatio = MAX_HEIGHT / height;
      const ratio = Math.min(widthRatio, heightRatio);
      width = width * ratio;
      height = height * ratio;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);
    const scaledBase64Image = canvas.toDataURL();

    set({
      base64Image: scaledBase64Image,
      width,
      height,
      points: {
        '1': [0, 0],
        '2': [width, 0],
        '3': [0, height],
        '4': [width, height],
      },
    });
  },
  setPoint: (id: string, point: Point) => {
    set((state) => {
      const points = { ...state.points, [id]: point };
      return { points };
    });
  },
  setTransformationMatrix: (matrix: TransformationMatrix) => {
    set({ transformationMatrix: matrix });
  },
}));
