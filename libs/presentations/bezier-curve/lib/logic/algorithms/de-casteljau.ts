export const deCasteljau = (t: number, points: [number, number][]) => {
  let pts = points;
  while (pts.length > 1) {
    const midpoints: [number, number][] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [point1X, point1Y] = pts[i];
      const [point2X, point2Y] = pts[i + 1];
      const x = point1X + (point2X - point1X) * t;
      const y = point1Y + (point2Y - point1Y) * t;
      midpoints.push([x, y]);
    }
    pts = midpoints;
  }
  return pts[0];
};
