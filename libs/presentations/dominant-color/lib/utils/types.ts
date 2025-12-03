export interface Color {
  r: number;
  g: number;
  b: number;
}

export type Algorithm<T = never> = (
  image: number[][],
  additionalConfig?: T,
) => Promise<Color>;

export type Variant = 'mean' | 'scale' | 'median' | 'mode';

export interface ConfiguratorProps {
  image: number[][];
  setBackground: (color: Color) => void;
}
