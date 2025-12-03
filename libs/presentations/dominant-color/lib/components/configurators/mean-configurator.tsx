import { useEffect, useState } from 'react';
import { Color, ConfiguratorProps } from '../../utils/types';
import { arithmeticMean, quadraticMean } from '../../logic/means';

type Mean = 'arithmetic' | 'quadratic';

export function MeanConfigurator({ image, setBackground }: ConfiguratorProps) {
  const [option, setOption] = useState<Mean>('arithmetic');

  useEffect(() => {
    (async () => {
      let mean: Color;
      switch (option) {
        case 'arithmetic':
          mean = await arithmeticMean(image);
          break;
        case 'quadratic':
          mean = await quadraticMean(image);
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
          checked={option === 'arithmetic'}
          onChange={() => setOption('arithmetic')}
        />{' '}
        Arytmetyczna
      </label>
      <label>
        <input
          type="radio"
          radioGroup="mean"
          checked={option === 'quadratic'}
          onChange={() => setOption('quadratic')}
        />{' '}
        Kwadratowa
      </label>
    </>
  );
}
