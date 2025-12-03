import { useEffect } from 'react';
import type { ConfiguratorProps } from '../../utils/types';
import { scale } from '@swistak-codes/presentations/dominant-color/lib/logic/scale';

export function ScaleDownConfigurator({
  image,
  setBackground,
}: ConfiguratorProps) {
  useEffect(() => {
    (async () => {
      const mean = await scale(image);
      setBackground(mean);
    })();
  }, [image, setBackground]);

  return null;
}
