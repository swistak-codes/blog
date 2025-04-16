/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MapGraph } from '../../algorithms/graph/map-graph';
import { MapNodeInfo } from '../types';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AlgorithmResult } from '../../algorithms/types';
import cytoscape from 'cytoscape';
import { createDiagram } from '../helpers/create-diagram';
import 'leaflet/dist/leaflet.css';
import { highlightColor } from '../../helpers/theme';
import { calculateHighlightValue } from '../../helpers/calculate-highlight-value';
import styles from '../../styles.module.scss';

type Props = {
  graph: MapGraph;
  selectedPoints: MapNodeInfo[];
  setSelectedPoints: Dispatch<SetStateAction<MapNodeInfo[]>>;
  algorithmResult: AlgorithmResult<MapNodeInfo> | null;
  colorDistance: boolean;
};

export const MapDisplay = ({
  graph,
  selectedPoints,
  setSelectedPoints,
  algorithmResult,
  colorDistance,
}: Props) => {
  const [cy, setCy] = useState<cytoscape.Core | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  // instantiate diagram
  useLayoutEffect(() => {
    const selectPoint = (point: MapNodeInfo) => {
      setSelectedPoints((points) => {
        return [
          ...new Set(
            points.length > 1 ? [points[1], point] : [...points, point]
          ),
        ];
      });
    };

    const { cy, destroy } = createDiagram(
      graphRef.current!,
      graph.getAllNodes(),
      graph.getAllEdges()
    );
    setCy(cy);

    cy.on('click', 'node', (e) => {
      const node = e.target;
      selectPoint(node.data());
    });

    return () => {
      destroy();
    };
  }, [setCy, setSelectedPoints, graphRef, graph]);

  // display selected points on diagram
  useEffect(() => {
    if (!cy) {
      return;
    }
    cy.$('.selected').removeClass('selected');
    for (const point of selectedPoints) {
      cy.getElementById(point.id).addClass('selected');
    }
  }, [cy, selectedPoints]);

  // display result on diagram
  useEffect(() => {
    if (!cy || !algorithmResult) {
      return;
    }
    // cleanup
    cy.$('.path').removeClass('path');
    cy.$('*').data('color', null);
    // color path
    for (let i = 0; i < algorithmResult.path.length; i++) {
      const current = algorithmResult.path[i];
      cy.getElementById(current.id).addClass('path');
      if (i > 0) {
        const previous = algorithmResult.path[i - 1];
        const key = MapGraph.getEdgeKey(previous, current);
        cy.getElementById(key).addClass('path');
      }
    }
    // add colors to the graph
    if (colorDistance && algorithmResult.distances) {
      const maxDistance = [...algorithmResult.distances!.values()].reduce(
        (prev, curr) =>
          curr > prev || prev === Number.POSITIVE_INFINITY ? curr : prev
      );
      const realDistance = algorithmResult.distance;
      for (const [node, distance] of algorithmResult.distances) {
        cy.getElementById(node.id).data(
          'color',
          highlightColor(
            calculateHighlightValue({
              distance: distance,
              realDistance,
              maxDistance,
            })
          )
        );
      }
    }
  }, [cy, algorithmResult, colorDistance]);

  // switch between showing colors on diagram
  useEffect(() => {
    if (!cy) {
      return;
    }
    cy.data('colorDistance', colorDistance);
  }, [cy, colorDistance]);

  return (
    <div className={styles.mapDisplayContainer}>
      <div ref={graphRef}></div>
    </div>
  );
};
