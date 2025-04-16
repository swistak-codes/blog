import { IAlgorithm, SortableElement } from './types';
import { LexoRank as LR } from 'lexorank';

export class Lexorank implements IAlgorithm {
  getInitialRank(): string {
    return LR.middle().toString();
  }

  getNextRank(last: string): string {
    return LR.parse(last).genNext().toString();
  }

  getPreviousRank(first: string): string {
    return LR.parse(first).genPrev().toString();
  }

  getMiddleRank(first: string, second: string): string {
    return LR.parse(first).between(LR.parse(second)).toString();
  }

  hasFreeSpace(ranks: string[]): boolean {
    return ranks.every((rank) => rank.length < 254);
  }

  rebalance(ranks: SortableElement[]): SortableElement[] {
    const sortedRanks = structuredClone(ranks).sort(this.sortComparator);
    const first = LR.parse(sortedRanks[0].rank);
    const bucket = first.getBucket();
    const fromBottom = bucket.format() !== '2';
    if (fromBottom) {
      sortedRanks.reverse();
    }
    sortedRanks[0].rank = new LR(
      bucket.next(),
      LR.middle().getDecimal()
    ).toString();
    for (let i = 1; i < sortedRanks.length; i++) {
      const parsedPrev = LR.parse(sortedRanks[i - 1].rank);
      sortedRanks[i].rank = fromBottom
        ? parsedPrev.genPrev().toString()
        : parsedPrev.genNext().toString();
    }
    if (fromBottom) {
      sortedRanks.reverse();
    }
    return sortedRanks;
  }

  sortComparator = (a: SortableElement, b: SortableElement): number => {
    return a.rank.localeCompare(b.rank);
  };
}
