// algorytm obliczania punktów na dowolnej krzywej Béziera
export function deCasteljau(
  t: number,
  points: (readonly [number, number, number])[]
) {
  let pts = points;
  while (pts.length > 1) {
    const midpoints: [number, number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [point1X, point1Y, point1Z] = pts[i];
      const [point2X, point2Y, point2Z] = pts[i + 1];
      const x = point1X + (point2X - point1X) * t;
      const y = point1Y + (point2Y - point1Y) * t;
      const z = point1Z + (point2Z - point1Z) * t;
      midpoints.push([x, y, z]);
    }
    pts = midpoints;
  }
  return pts[0];
}
