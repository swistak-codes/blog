import { BaseEdge, EdgeProps, getStraightPath } from 'reactflow';

export const BezierEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  ...props
}: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} {...props} />;
};
