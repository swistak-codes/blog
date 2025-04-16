import dynamic from 'next/dynamic';
import styles from '../../posts.module.scss';

type Props = {
  availableLayouts: Layouts[];
};

const GraphLayouts = dynamic(
  () => import('@swistak-codes/presentations/graph-layouts'),
  {
    ssr: false,
  }
);

export enum Layouts {
  Grid = 'grid',
  Circle = 'circle',
  Cose = 'cose',
  CoseBilkent = 'coseBilkent',
  Cola = 'cola',
  Avsdf = 'avsdf',
  Dagre = 'dagre',
  Klay = 'klay',
  Fcose = 'fcose',
  Euler = 'euler',
  Random = 'random',
  Breadthfirst = 'breadthfirst',
}

export const Presentation = ({ availableLayouts = [] }: Props) => {
  return (
    <GraphLayouts
      className={styles.borderedDiagram}
      availableLayouts={availableLayouts}
    />
  );
};
