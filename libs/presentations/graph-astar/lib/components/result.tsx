import { AlgorithmResult } from '../algorithms/types';
import styles from '../styles.module.scss';

type Props<TNode> = {
  algorithmResult: AlgorithmResult<TNode>;
  isMap?: boolean;
};

export const Result = <TNode,>({ algorithmResult, isMap }: Props<TNode>) => {
  const divide = (val: number) => (isMap ? val / 1000 : val);

  return (
    <div className={styles.controlsContainer}>
      <div>Liczba iteracji: {algorithmResult.iterations},</div>
      <div>
        przebyta odległość: {divide(algorithmResult.distance).toFixed(2)}
        {isMap && ' km'}
        {algorithmResult.heuristicDistance && ','}
      </div>
      {algorithmResult.heuristicDistance && (
        <>
          <div>
            przewidywana odległość:{' '}
            {divide(algorithmResult.heuristicDistance).toFixed(2)}
            {isMap && ' km'},
          </div>
          <div>
            błąd względny:{' '}
            {(
              ((algorithmResult.distance -
                1 -
                algorithmResult.heuristicDistance) /
                algorithmResult.heuristicDistance) *
              100
            ).toFixed(2)}
            %
          </div>
        </>
      )}
    </div>
  );
};
