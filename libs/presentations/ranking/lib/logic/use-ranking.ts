import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IAlgorithm, SortableElement } from './types';
import { Simple } from './simple';
import { Lexorank } from './lexorank';
import { nanoid } from 'nanoid';

export const useRanking = (algorithm: 'simple' | 'lexorank') => {
  const algorithmImplementation = useRef<IAlgorithm>();
  useEffect(() => {
    if (algorithm === 'simple') {
      algorithmImplementation.current = new Simple();
    } else {
      algorithmImplementation.current = new Lexorank();
    }
  }, [algorithm]);

  const [items, setItems] = useState<SortableElement[]>([]);

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        algorithmImplementation.current?.sortComparator ?? undefined
      ),
    [items]
  );

  const removeItem = useCallback((item: SortableElement) => {
    setItems((items) => items.filter((x) => x.id !== item.id));
  }, []);

  const moveItem = useCallback(
    (
      before: SortableElement | undefined,
      after: SortableElement | undefined,
      current: SortableElement
    ) => {
      if ((!before && !after) || !algorithmImplementation.current) {
        return;
      }
      let newRank = '';
      if (!before && after) {
        newRank = algorithmImplementation.current.getPreviousRank(after.rank);
      } else if (!after && before) {
        newRank = algorithmImplementation.current.getNextRank(before.rank);
      } else if (before && after) {
        newRank = algorithmImplementation.current.getMiddleRank(
          before.rank,
          after.rank
        );
      }
      if (newRank !== '') {
        setItems((items) =>
          items.map((x) => {
            if (x.id === current.id) {
              return { ...x, rank: newRank };
            }
            return x;
          })
        );
      }
    },
    []
  );

  const addItem = useCallback(() => {
    if (!algorithmImplementation.current) {
      return;
    }
    const item: SortableElement = {
      id: nanoid(6),
      rank:
        items.length === 0
          ? algorithmImplementation.current.getInitialRank()
          : algorithmImplementation.current.getNextRank(
              sortedItems[items.length - 1].rank
            ),
    };
    setItems((items) => [...items, item]);
  }, [items.length, sortedItems]);

  const disabled = useMemo(() => {
    if (!algorithmImplementation.current) {
      return true;
    }
    return !algorithmImplementation.current.hasFreeSpace(
      items.map((x) => x.rank)
    );
  }, [items]);

  const rebalance = useCallback(() => {
    if (!algorithmImplementation.current) {
      return;
    }
    setItems(
      (items) => algorithmImplementation.current?.rebalance(items) ?? []
    );
  }, []);

  return {
    items: sortedItems,
    removeItem,
    moveItem,
    addItem,
    disabled,
    rebalance,
  };
};
