/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import cytoscape, { Core, Layouts } from 'cytoscape';

type ChangeLayoutFunc = (
  layout: string,
  configuration: Record<string, unknown>
) => Promise<void>;

type Context = {
  diagram: Core | null;
  setDiagram: Dispatch<SetStateAction<Core | null>>;
  nodes: string[];
  edges: [string, string][];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  changeLayout: ChangeLayoutFunc;
};

type ContextProviderProps = {
  children: ReactNode;
};

const externalLayouts = new Map([
  // @ts-ignore
  ['coseBilkent', () => import('cytoscape-cose-bilkent')],
  // @ts-ignore
  ['cola', () => import('cytoscape-cola')],
  // @ts-ignore
  ['avsdf', () => import('cytoscape-avsdf')],
  // @ts-ignore
  ['dagre', () => import('cytoscape-dagre')],
  // @ts-ignore
  ['klay', () => import('cytoscape-klay')],
  // @ts-ignore
  ['spread', () => import('cytoscape-spread')],
  // @ts-ignore
  ['fcose', () => import('cytoscape-fcose')],
  // @ts-ignore
  ['euler', () => import('cytoscape-euler')],
  // @ts-ignore
  ['springy', () => import('cytoscape-springy')],
]);

export const DiagramContext = createContext<Context>({
  diagram: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDiagram: () => {},
  nodes: [],
  edges: [],
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeLayout: async () => {},
});

export const DiagramContextProvider = ({ children }: ContextProviderProps) => {
  const [diagram, setDiagram] = useState<Core | null>(null);
  const [nodes, setNodes] = useState<string[]>([]);
  const [edges, setEdges] = useState<[string, string][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentLayout = useRef('grid');
  const currentLayoutRef = useRef<Layouts | null>(null);
  const currentConfiguration = useRef<Record<string, unknown>>({
    animate: true,
    fit: true,
  });

  const layoutDiagram = () => {
    currentLayoutRef.current?.stop();
    currentLayoutRef.current =
      diagram?.layout({
        name: currentLayout.current,
        ...currentConfiguration.current,
      }) || null;
    currentLayoutRef.current?.run();
  };

  const changeLayout: ChangeLayoutFunc = async (layout, configuration) => {
    currentLayout.current = layout === 'coseBilkent' ? 'cose-bilkent' : layout;
    currentConfiguration.current = configuration;
    if (externalLayouts.has(layout)) {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const layoutFactory = externalLayouts.get(layout)!;
      const layoutFunc = await layoutFactory();
      setIsLoading(false);
      cytoscape.use(layoutFunc.default);
    }
    layoutDiagram();
  };

  useEffect(() => {
    if (diagram) {
      diagram.on('add remove', (e) => {
        setNodes(e.cy.nodes().map((x) => x.id()));
        setEdges(e.cy.edges().map((x) => [x.source().id(), x.target().id()]));
      });
      diagram.on('add', 'node', layoutDiagram);
      diagram.on('ehcomplete', layoutDiagram);
    }
  }, [diagram]);

  return (
    <DiagramContext.Provider
      value={{
        diagram,
        setDiagram,
        nodes,
        edges,
        isLoading,
        setIsLoading,
        changeLayout,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
