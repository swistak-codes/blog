export type Vector2 = [number, number];
export type MapArray = number[][];

export type Textures = {
  [key: number]: {
    light: string;
    shadow: string;
  };
};

export interface RaycasterState {
  pos: Vector2;
  dir: Vector2;
  plane: Vector2;
  map: MapArray;
  textures: Textures;
}

export interface RaycasterConfig {
  moveSpeed: number;
  rotationSpeed: number;
}

export interface ControlState {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
}
