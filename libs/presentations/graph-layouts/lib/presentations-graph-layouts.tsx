import { DiagramContextProvider } from './components/diagram-context';
import { Actions } from './components/actions';
import { Diagram } from './components/diagram';
import { Layout } from './components/layout';
import { Generators } from './components/generators';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  availableLayouts: string[];
  className?: string;
};

export const PresentationsGraphLayouts = ({
  availableLayouts,
  className = '',
}: Props) => (
  <DiagramContextProvider>
    <div className={clsx(className, styles.container)}>
      <Actions />
      <Generators />
      <Diagram />
      <Layout visibleLayouts={availableLayouts} />
    </div>
  </DiagramContextProvider>
);

export default PresentationsGraphLayouts;
