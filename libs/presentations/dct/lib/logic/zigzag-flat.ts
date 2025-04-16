export function zigzagFlat(matrix: number[][]) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result: number[] = [];
  const n = rows + cols - 1;
  for (let d = 0; d < n; d++) {
    if (d % 2 === 0) {
      let x = d < rows ? d : rows - 1;
      let y = d < rows ? 0 : d - (rows - 1);
      while (x >= 0 && y < cols) {
        result.push(matrix[x][y]);
        x--;
        y++;
      }
    } else {
      let x = d < cols ? 0 : d - (cols - 1);
      let y = d < cols ? d : cols - 1;
      while (x < rows && y >= 0) {
        result.push(matrix[x][y]);
        x++;
        y--;
      }
    }
  }
  return result;
}
