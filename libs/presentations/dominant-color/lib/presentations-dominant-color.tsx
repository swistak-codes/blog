import styles from './presentations-dominant-color.module.scss';
import { Uploader } from './components/uploader';
import { Preview } from './components/preview';
import { ColorDisplay } from './components/color-display';
import { Variant } from './utils/types';
import { MethodConfigurator } from '@swistak-codes/presentations/dominant-color/lib/components/method-configurator';
import { createStore, Provider } from './utils/store';

interface Props {
  variant: Variant;
}

export function PresentationsDominantColor({ variant }: Props) {
  return (
    <Provider createStore={createStore}>
      <div className={styles['container']}>
        <Uploader />
        <Preview />
        <ColorDisplay />
        <MethodConfigurator variant={variant} />
      </div>
    </Provider>
  );
}
