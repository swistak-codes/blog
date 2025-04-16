import { AlgorithmGenerator } from '../types';

export const executeWhole = async (
  iterator: AlgorithmGenerator,
  callback: (data: string[]) => void
) => {
  let result: IteratorResult<string[]>;
  let lastValue: string[] = [];

  do {
    result = iterator.next();
    if (result.value) {
      lastValue = result.value;
    }
  } while (!result.done);

  callback(lastValue);
};
