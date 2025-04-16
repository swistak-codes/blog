import { DiagramContextProvider } from './components/diagram-context';
import { Diagram } from './components/diagram';
import { Actions } from './components/actions';
import { Representation } from './components/representation';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  className?: string;
};

export const GraphRepresentations = ({ className = '' }: Props) => {
  return (
    <DiagramContextProvider>
      <div className={clsx(className, styles.container)}>
        <Actions />
        <Diagram />
        <Representation />
      </div>
    </DiagramContextProvider>
  );
};
