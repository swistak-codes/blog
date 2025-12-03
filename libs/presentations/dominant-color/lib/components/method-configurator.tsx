import styles from './method-configurator.module.scss';
import { Variant } from '../utils/types';
import { useStore } from '../utils/store';
import { useShallow } from 'zustand/react/shallow';
import { MeanConfigurator } from './configurators/mean-configurator';
import { ScaleDownConfigurator } from './configurators/scale-down-configurator';
import { MedianConfigurator } from './configurators/median-configurator';
import { ModeConfigurator } from './configurators/mode-configurator';

interface Props {
  variant: Variant;
}

export function MethodConfigurator({ variant }: Props) {
  const image = useStore(useShallow((state) => state.image));
  const setBackground = useStore(useShallow((state) => state.setBackground));

  const props = { image, setBackground };

  if (image.length === 0) {
    return null;
  }

  return (
    <div className={styles['method-configurator']}>
      {variant === 'mean' && <MeanConfigurator {...props} />}
      {variant === 'scale' && <ScaleDownConfigurator {...props} />}
      {variant === 'median' && <MedianConfigurator {...props} />}
      {variant === 'mode' && <ModeConfigurator {...props} />}
    </div>
  );
}
