import { IAlgorithm, SortableElement } from './types';

export class Simple implements IAlgorithm {
  readonly step = 1000;

  getInitialRank(): string {
    return this.step.toString();
  }

  getNextRank(last: string): string {
    return (parseInt(last) + this.step).toString();
  }

  getPreviousRank(first: string): string {
    return Math.trunc(parseInt(first) / 2).toString();
  }

  getMiddleRank(first: string, second: string): string {
    return Math.trunc((parseInt(first) + parseInt(second)) / 2).toString();
  }

  hasFreeSpace(ranks: string[]): boolean {
    if (ranks.length === 0) {
      return true;
    }
    const numRanks = ranks.map(Number).sort((a, b) => a - b);
    let distance = Infinity;
    for (let i = 0; i < numRanks.length; i++) {
      const prevRank = i > 0 ? numRanks[i - 1] : 0;
      const currentRank = numRanks[i];
      const currentDistance = currentRank - prevRank;
      distance = Math.min(distance, currentDistance);
    }
    return Math.ceil(Math.log2(distance)) > 0;
  }

  rebalance(ranks: SortableElement[]): SortableElement[] {
    const numRanks = ranks.sort(this.sortComparator);
    return numRanks.map((x, index) => ({
      ...x,
      rank: ((index + 1) * this.step).toString(),
    }));
  }

  sortComparator = (a: SortableElement, b: SortableElement): number => {
    return parseInt(a.rank) - parseInt(b.rank);
  };
}
