import { useEffect, useState } from 'react';
import { Color, ConfiguratorProps } from '../../utils/types';
import { componentWiseMedian, geometricMedian } from '../../logic/median';

type Median = 'component-wise' | 'geometric';

export function MedianConfigurator({
  image,
  setBackground,
}: ConfiguratorProps) {
  const [option, setOption] = useState<Median>('geometric');

  useEffect(() => {
    (async () => {
      let mean: Color;
      switch (option) {
        case 'component-wise':
          mean = await componentWiseMedian(image);
          break;
        case 'geometric':
          mean = await geometricMedian(image);
          break;
        default:
          throw new Error('Unknown mean option');
      }
      setBackground(mean);
    })();
  }, [image, option, setBackground]);

  return (
    <>
      <label>
        <input
          type="radio"
          radioGroup="mean"
          checked={option === 'component-wise'}
          onChange={() => setOption('component-wise')}
        />{' '}
        Według składowych
      </label>
      <label>
        <input
          type="radio"
          radioGroup="mean"
          checked={option === 'geometric'}
          onChange={() => setOption('geometric')}
        />{' '}
        Geometryczna
      </label>
    </>
  );
}
