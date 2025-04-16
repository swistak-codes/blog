// most of this presentation is a copy of https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/1-Vertical.story.tsx
import styles from './presentations-ranking.module.scss';
import { useRanking } from './logic/use-ranking';
import { Sortable } from './components/sortable';

interface PresentationsRankingProps {
  algorithm: 'simple' | 'lexorank';
}

// https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/1-Vertical.story.tsx
// https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/Sortable.tsx#L278

export function PresentationsRanking(props: PresentationsRankingProps) {
  const { items, disabled, addItem, moveItem, removeItem, rebalance } =
    useRanking(props.algorithm);

  return (
    <div className={styles['container']}>
      <div className={styles['sortable-wrapper']}>
        <Sortable
          isDisabled={disabled}
          items={items}
          removeItem={removeItem}
          moveItem={moveItem}
        />
      </div>
      <div className={styles['sortable-controls']}>
        <button onClick={addItem}>Dodaj element</button>
        <button onClick={rebalance} disabled={items.length <= 1}>
          Wykonaj rebalans
        </button>
        {disabled && items.length > 0 && (
          <p>Brak wolnego miejsca, wykonaj rebalans!</p>
        )}
      </div>
    </div>
  );
}

export default PresentationsRanking;
