import { useCallback, useContext, useState } from 'react';
import { components } from './generator-config';
import { generateGraph } from '../logic/generate-graph';
import { DiagramContext } from './diagram-context';
import styles from '../styles.module.scss';

const generators = [
  { value: 'Empty', name: 'Tylko wierzchołki' },
  { value: 'Complete', name: 'Graf pełny' },
  { value: 'Ladder', name: 'Drabinka' },
  { value: 'Path', name: 'Ścieżka' },
  { value: 'Caveman', name: 'Caveman' },
  { value: 'Zachary', name: 'Klub karate Zacharego' },
];

export const Generators = () => {
  const [generator, setGenerator] = useState(generators[0].value);
  const [configuration, setConfiguration] = useState<unknown[]>([10]);
  const { diagram, setIsLoading } = useContext(DiagramContext);

  const valueCallback = useCallback(
    (value: unknown[]) => setConfiguration(value),
    [setConfiguration]
  );

  const handleGenerate = () => {
    if (!diagram) {
      return;
    }
    generateGraph(generator, configuration, diagram, setIsLoading);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Component = components[generator];

  return (
    <div className={styles.controlsContainer}>
      <select value={generator} onChange={(e) => setGenerator(e.target.value)}>
        {generators.map((x) => (
          <option value={x.value} key={x.value}>
            {x.name}
          </option>
        ))}
      </select>
      <Component valueCallback={valueCallback} />
      <button onClick={handleGenerate}>Generuj dane</button>
    </div>
  );
};
