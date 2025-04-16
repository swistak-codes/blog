import { useStore } from '../hooks/use-store';

export function BlockControls() {
  const {
    showGrid,
    showValues,
    showNormalized,
    toggleShowValues,
    toggleShowGrid,
    toggleShowNormalized,
  } = useStore();

  return (
    <>
      <label>
        <input type="checkbox" checked={showGrid} onChange={toggleShowGrid} />{' '}
        Pokaż siatkę
      </label>
      <label>
        <input
          type="checkbox"
          checked={showValues}
          onChange={toggleShowValues}
        />{' '}
        Pokaż wartości
      </label>
      <label>
        <input
          type="checkbox"
          checked={showNormalized}
          onChange={toggleShowNormalized}
        />{' '}
        Pokaż znormalizowane wartości
      </label>
    </>
  );
}
