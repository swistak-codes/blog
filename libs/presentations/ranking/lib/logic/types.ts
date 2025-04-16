export interface IAlgorithm {
  getInitialRank(): string;
  getNextRank(last: string): string;
  getPreviousRank(first: string): string;
  getMiddleRank(first: string, second: string): string;
  hasFreeSpace(ranks: string[]): boolean;
  rebalance(ranks: SortableElement[]): SortableElement[];
  sortComparator(a: SortableElement, b: SortableElement): number;
}

export interface SortableElement {
  id: string;
  rank: string;
}
