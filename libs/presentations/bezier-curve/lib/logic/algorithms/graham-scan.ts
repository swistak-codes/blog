import { Node } from 'reactflow';
import { orderBy } from 'lodash';

const findMinPoint = (points: Node[]) => {
  let currentMin = Number.MAX_SAFE_INTEGER;
  let currentMinPoint: Node | null = null;
  for (const point of points) {
    if (point.position.y < currentMin) {
      currentMin = point.position.y;
      currentMinPoint = point;
    } else if (point.position.y === currentMin) {
      const currentX = currentMinPoint?.position.x || 0;
      const pointX = point.position.x;
      if (pointX < currentX) {
        currentMin = point.position.y;
        currentMinPoint = point;
      }
    }
  }

  if (!currentMinPoint) {
    currentMinPoint = points[0];
  }

  return currentMinPoint;
};

const ccw = (p0: Node, p1: Node, p2: Node) => {
  const dx1 = p1.position.x - p0.position.x;
  const dy1 = p1.position.y - p0.position.y;
  const dx2 = p2.position.x - p0.position.x;
  const dy2 = p2.position.y - p0.position.y;

  if (dx1 * dy2 > dy1 * dx2) return 1;
  if (dx1 * dy2 < dy1 * dx2) return -1;
  if (dx1 * dx2 < 0 || dy1 * dy2 < 0) return -1;
  if (dx1 * dx1 + dy1 * dy1 < dx2 * dx2 + dy2 * dy2) return 1;

  return 0;
};

const nextToTop = (stack: Node[]) => stack[stack.length - 2];

const top = (stack: Node[]) => stack[stack.length - 1];

export const grahamScan = (points: Node[]) => {
  if (points.length < 2) {
    return [];
  }
  const p0 = findMinPoint(points);
  const otherP = orderBy(
    points.filter((x) => x !== p0),
    (p) =>
      Math.atan2(p.position.y - p0.position.y, p.position.x - p0.position.x)
  );
  const stack: Node[] = [p0];
  for (const point of otherP) {
    while (stack.length > 1 && ccw(nextToTop(stack), top(stack), point) <= 0) {
      stack.pop();
    }
    stack.push(point);
  }
  return stack;
};
