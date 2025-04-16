import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

type StateContextType = {
  nodes: ReturnType<typeof useNodesState<{ order: number }>>[0];
  setNodes: ReturnType<typeof useNodesState<{ order: number }>>[1];
  onNodesChange: ReturnType<typeof useNodesState<{ order: number }>>[2];
  edges: ReturnType<typeof useEdgesState>[0];
  setEdges: ReturnType<typeof useEdgesState>[1];
  onEdgesChange: ReturnType<typeof useEdgesState>[2];
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  nodesInHull: Set<string>;
  setNodesInHull: Dispatch<SetStateAction<Set<string>>>;
};

const StateContext = createContext<StateContextType | null>(null);

export const StateContextProvider = StateContext.Provider;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAppState = () => useContext(StateContext)!;
