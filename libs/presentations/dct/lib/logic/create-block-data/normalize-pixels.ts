export function normalizePixels(originalBlock: number[][]) {
  return originalBlock.map((row) => row.map((px) => px - 128));
}
