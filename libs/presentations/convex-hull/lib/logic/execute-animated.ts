import { computeConvexHull } from './compute-convex-hull';
import { Edge } from 'reactflow';

let forceStop = false;

export const executeAnimated = async (
  iterator: ReturnType<typeof computeConvexHull>,
  delay: number,
  callback: (data: Edge[]) => void
) => {
  forceStop = false;
  for (const result of iterator) {
    if (forceStop) {
      break;
    }
    if (result) {
      callback(result);
    }
    if (forceStop) {
      break;
    }
    await new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
  }
};

export const stopAnimation = () => {
  forceStop = true;
};
