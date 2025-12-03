import { useEffect, useState } from 'react';
import { ConfiguratorProps, Color } from '../../utils/types';
import { mode, optimizedMode } from '../../logic/modes';

type Mode = 'distance' | 'optimized';

const INPUT_CONFIGURATION = {
  min: 10,
  max: 100,
  step: 1,
};

export function ModeConfigurator({ image, setBackground }: ConfiguratorProps) {
  const [tolerance, setTolerance] = useState<number>(20);
  const [option, setOption] = useState<Mode>('optimized');

  useEffect(() => {
    (async () => {
      let modeColor: Color;
      switch (option) {
        case 'distance':
          modeColor = await mode(image, { tolerance });
          break;
        case 'optimized':
          modeColor = await optimizedMode(image, { tolerance });
          break;
        default:
          throw new Error('Unknown mode option');
      }
      setBackground(modeColor);
    })();
  }, [image, tolerance, option, setBackground]);

  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            radioGroup="mode"
            checked={option === 'distance'}
            onChange={() => setOption('distance')}
          />{' '}
          Metoda odległościowa
        </label>
        <label>
          <input
            type="radio"
            radioGroup="mode"
            checked={option === 'optimized'}
            onChange={() => setOption('optimized')}
          />{' '}
          Metoda zoptymalizowana
        </label>
      </div>
      <div>
        <label>
          Tolerancja
          <input
            type="range"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.valueAsNumber)}
            {...INPUT_CONFIGURATION}
          />
          <input
            type="number"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.valueAsNumber)}
            {...INPUT_CONFIGURATION}
          />
        </label>
      </div>
    </>
  );
}
