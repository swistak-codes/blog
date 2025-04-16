export function unquantize(
  quantized: number[][],
  quantizationMatrix: number[][]
) {
  return quantized.map((row, v) =>
    row.map((g, u) => g * quantizationMatrix[v][u])
  );
}
