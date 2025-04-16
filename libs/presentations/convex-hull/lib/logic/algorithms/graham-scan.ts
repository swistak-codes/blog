import { Node } from 'reactflow';

function findStartingPoint(points: Node[]) {
  let currentMinPoint = points[0];
  for (const point of points) {
    if (point.position.y < currentMinPoint.position.y) {
      currentMinPoint = point;
    } else if (point.position.y === currentMinPoint.position.y) {
      if (point.position.x < currentMinPoint.position.x) {
        currentMinPoint = point;
      }
    }
  }
  return currentMinPoint;
}

function sortPoints(points: Node[], p0: Node) {
  const angles = new Map<Node, number>();
  const distances = new Map<Node, number>();
  const sortedPoints = [...points].sort((a, b) => {
    const angleA =
      angles.get(a) ||
      Math.atan2(a.position.y - p0.position.y, a.position.x - p0.position.x);
    angles.set(a, angleA);
    const angleB =
      angles.get(b) ||
      Math.atan2(b.position.y - p0.position.y, b.position.x - p0.position.x);
    angles.set(b, angleB);
    return angleA - angleB;
  });
  const result: Node[] = [];
  for (const point of sortedPoints) {
    if (result.length < 2) {
      result.push(point);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const lastPoint = result.at(-1)!;
      const lastAngle =
        angles.get(lastPoint) ||
        Math.atan2(
          lastPoint.position.y - p0.position.y,
          lastPoint.position.x - p0.position.x
        );
      const currentAngle =
        angles.get(point) ||
        Math.atan2(
          point.position.y - p0.position.y,
          point.position.x - p0.position.x
        );

      if (Math.abs(lastAngle - currentAngle) < Number.EPSILON) {
        const lastDistance =
          distances.get(lastPoint) ||
          Math.abs(lastPoint.position.x - p0.position.x) +
            Math.abs(lastPoint.position.y - p0.position.y);
        distances.set(lastPoint, lastDistance);
        const currentDistance =
          distances.get(point) ||
          Math.abs(point.position.x - p0.position.x) +
            Math.abs(point.position.y - p0.position.y);
        distances.set(point, currentDistance);
        if (currentDistance > lastDistance) {
          result[result.length - 1] = point;
        }
      } else {
        result.push(point);
      }
    }
  }
  return result;
}

function ccw(a: Node, b: Node, c: Node) {
  return (
    (b.position.x - a.position.x) * (c.position.y - a.position.y) -
    (c.position.x - a.position.x) * (b.position.y - a.position.y)
  );
}

function nextToTop(stack: Node[]) {
  return stack.at(-2);
}

function top(stack: Node[]) {
  return stack.at(-1);
}

function reverseY(points: Node[]) {
  for (let i = 0; i < points.length; i++) {
    points[i].position.y = -points[i].position.y;
  }
}

export function* grahamScan(points: Node[]) {
  if (points.length < 2) {
    return [];
  }
  reverseY(points);
  const p0 = findStartingPoint(points);
  const sortedPoints = sortPoints(points, p0);
  const stack: Node[] = [];
  for (const point of sortedPoints) {
    while (
      stack.length > 1 &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ccw(nextToTop(stack)!, top(stack)!, point) <= 0
    ) {
      stack.pop();
      reverseY(points);
      yield stack;
      reverseY(points);
    }
    stack.push(point);
    reverseY(points);
    yield stack;
    reverseY(points);
  }
  reverseY(points);
  yield stack;
  return stack;
}
