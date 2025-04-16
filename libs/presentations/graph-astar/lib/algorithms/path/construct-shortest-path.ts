export const constructShortestPath = <TNode>(
  previous: Map<TNode, TNode | null>,
  startNode: TNode,
  endNode: TNode,
  result: TNode[] = []
) => {
  if (startNode === endNode) {
    result.push(startNode);
  } else if (previous.get(endNode) == null) {
    return result;
  } else {
    constructShortestPath(previous, startNode, previous.get(endNode), result);
    result.push(endNode);
    return result;
  }
  return result;
};
