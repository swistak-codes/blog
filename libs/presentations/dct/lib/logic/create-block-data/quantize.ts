export function quantize(
  transformed: number[][],
  quantizationMatrix: number[][]
) {
  return transformed.map((row, v) =>
    row.map((g, u) => Math.round(g / quantizationMatrix[v][u]))
  );
}
