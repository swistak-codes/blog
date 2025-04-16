/* eslint-disable react/jsx-no-useless-fragment */
import { CommonProps } from './types';
import { NumberInput } from './number-input';

import { Caveman } from './caveman';

const Empty = (props: CommonProps) => (
  <NumberInput label="Liczba wierzchołków" {...props} />
);

const Complete = (props: CommonProps) => (
  <NumberInput label="Liczba wierzchołków" {...props} />
);

const Ladder = (props: CommonProps) => (
  <NumberInput label="Długość" {...props} />
);

const Path = (props: CommonProps) => (
  <NumberInput label="Liczba wierzchołków" {...props} />
);

const Zachary = () => <></>;

export const components = {
  Caveman,
  Empty,
  Complete,
  Ladder,
  Path,
  Zachary,
};
