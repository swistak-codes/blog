export function array2dToLatex(array: number[][]) {
  return `\\begin{bmatrix}${array
    .map((row) =>
      row.map((x) => (Math.trunc(x) === x ? x : x.toFixed(2))).join('&'),
    )
    .join('\\\\')}\\end{bmatrix}`;
}
