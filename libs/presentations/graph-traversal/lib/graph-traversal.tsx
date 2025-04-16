import { DiagramContextProvider } from './components/diagram-context';
import { Diagram } from './components/diagram';
import { Actions } from './components/actions';
import { Traversal } from './components/traversal';
import { TraversalType } from './types';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  type: TraversalType;
  className?: string;
};

export const GraphTraversal = ({ type, className = '' }: Props) => {
  return (
    <DiagramContextProvider>
      <div className={clsx(className, styles.container)}>
        <Actions />
        <Diagram />
        <Traversal type={type} />
      </div>
    </DiagramContextProvider>
  );
};
