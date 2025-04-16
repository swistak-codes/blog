import { LinearRgb } from './components/linear-rgb';
import { LinearHsl } from './components/linear-hsl';
import { Polynomial } from './components/polynomial';
import { Bezier } from './components/bezier';

type Props = {
  type: 'linearRgb' | 'linearHsl' | 'polynomial' | 'bezier3d';
};

export const PresentationsGradient = ({ type }: Props) => {
  switch (type) {
    case 'linearRgb':
      return <LinearRgb />;
    case 'linearHsl':
      return <LinearHsl />;
    case 'polynomial':
      return <Polynomial />;
    case 'bezier3d':
      return <Bezier />;
  }

  const _exhaustiveCheck: never = type;
  return _exhaustiveCheck;
};
