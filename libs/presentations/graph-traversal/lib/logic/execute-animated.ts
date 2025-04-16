import { AlgorithmGenerator } from '../types';

let forceStop = false;

export const executeAnimated = async (
  iterator: AlgorithmGenerator,
  delay: number,
  callback: (data: string[]) => void
) => {
  let result: IteratorResult<string[]>;
  forceStop = false;

  do {
    result = iterator.next();
    if (result.value) {
      callback(result.value);
    }
    await new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
  } while (!result.done && !forceStop);
};

export const stopAnimation = () => {
  forceStop = true;
};
