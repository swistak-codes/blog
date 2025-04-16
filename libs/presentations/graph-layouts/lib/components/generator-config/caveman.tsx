import { useEffect, useState } from 'react';
import { CommonProps } from './types';

export const Caveman = ({ valueCallback }: CommonProps) => {
  const [components, setComponents] = useState(6);
  const [nodes, setNodes] = useState(8);

  useEffect(
    () => valueCallback([components, nodes]),
    [components, nodes, valueCallback]
  );

  return (
    <>
      <label>
        Liczba komponentów:&nbsp;
        <input
          value={components}
          type="number"
          onChange={(e) => setComponents(e.target.valueAsNumber)}
        />
      </label>
      <label>
        Wierzchołków w komponencie:&nbsp;
        <input
          value={nodes}
          type="number"
          onChange={(e) => setNodes(e.target.valueAsNumber)}
        />
      </label>
    </>
  );
};
