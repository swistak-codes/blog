import { useState } from 'react';
import { EdgeList } from './edge-list';
import { AdjacencyList } from './adjacency-list';
import { AdjacencyMatrix } from './adjacency-matrix';
import { IncidenceMatrix } from './incidence-matrix';
import styles from '../styles.module.scss';

const enum RepresentationType {
  EdgeList,
  AdjacencyList,
  AdjacencyMatrix,
  IncidenceMatrix,
}

const typeToComponent = {
  [RepresentationType.EdgeList]: EdgeList,
  [RepresentationType.AdjacencyList]: AdjacencyList,
  [RepresentationType.AdjacencyMatrix]: AdjacencyMatrix,
  [RepresentationType.IncidenceMatrix]: IncidenceMatrix,
};

const types = [
  { type: RepresentationType.EdgeList, name: 'Lista krawędzi' },
  { type: RepresentationType.AdjacencyList, name: 'Lista sąsiedztwa' },
  { type: RepresentationType.AdjacencyMatrix, name: 'Macierz sąsiedztwa' },
  { type: RepresentationType.IncidenceMatrix, name: 'Macierz incydencji' },
];

export const Representation = () => {
  const [currentRepresentation, setCurrentRepresentation] = useState(
    RepresentationType.EdgeList
  );

  const CurrentComponent = typeToComponent[currentRepresentation];

  return (
    <div className={styles.representationContainer}>
      <div className={styles.selectorContainer}>
        {types.map(({ type, name }) => (
          <button
            key={type}
            onClick={() => setCurrentRepresentation(type)}
            disabled={currentRepresentation === type}
          >
            {name}
          </button>
        ))}
      </div>
      <CurrentComponent />
    </div>
  );
};
