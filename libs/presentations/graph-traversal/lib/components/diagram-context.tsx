import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Core } from 'cytoscape';
import { getInitialGraph } from '../logic/get-initial-graph';
import cytoscapeEdgehandles from 'cytoscape-edgehandles';

type Context = {
  diagram: Core | null;
  setDiagram: Dispatch<SetStateAction<Core | null>>;
  edgeHandles: cytoscapeEdgehandles.EdgeHandlesInstance | null;
  setEdgeHandles: Dispatch<
    SetStateAction<cytoscapeEdgehandles.EdgeHandlesInstance | null>
  >;
  nodes: string[];
  edges: [string, string][];
  selectedNode: string | null;
};

type ContextProviderProps = {
  children: ReactNode;
};

export const DiagramContext = createContext<Context>({
  diagram: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDiagram: () => {},
  edgeHandles: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEdgeHandles: () => {},
  nodes: [],
  edges: [],
  selectedNode: null,
});

export const DiagramContextProvider = ({ children }: ContextProviderProps) => {
  const [diagram, setDiagram] = useState<Core | null>(null);
  const [edgeHandles, setEdgeHandles] =
    useState<cytoscapeEdgehandles.EdgeHandlesInstance | null>(null);
  const [nodes, setNodes] = useState<string[]>([]);
  const [edges, setEdges] = useState<[string, string][]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    if (diagram) {
      diagram.on('add remove', (e) => {
        setNodes(e.cy.nodes().map((x) => x.id()));
        setEdges(e.cy.edges().map((x) => [x.source().id(), x.target().id()]));
      });

      diagram.on('select', 'node', (e) => {
        setSelectedNode(e.target.id());
      });

      diagram.on('unselect', 'node', (e) => {
        setSelectedNode(null);
      });

      diagram.add(getInitialGraph());
    }
  }, [diagram]);

  return (
    <DiagramContext.Provider
      value={{
        diagram,
        setDiagram,
        edgeHandles,
        setEdgeHandles,
        nodes,
        edges,
        selectedNode,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
