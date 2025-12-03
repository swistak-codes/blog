import { useStore } from '../utils/store';
import { useShallow } from 'zustand/react/shallow';

export function ColorDisplay() {
  const { r, g, b } = useStore(useShallow((state) => state.background));
  const hasImage = useStore(useShallow((state) => state.image.length > 0));

  const hex = ((r << 16) | (g << 8) | b)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();

  return hasImage ? (
    <div>
      Znaleziony kolor:{' '}
      <strong>
        rgb({r}, {g}, {b})
      </strong>{' '}
      / <strong>#{hex}</strong>
    </div>
  ) : (
    <div>Skorzystaj z przycisku powyżej, aby wybrać obrazek</div>
  );
}
