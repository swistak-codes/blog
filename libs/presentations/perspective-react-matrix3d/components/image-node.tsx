import { useStore } from '../hooks/use-store';
import { useShallow } from 'zustand/react/shallow';
import { memo } from 'react';

function ImageNodeComponent() {
  const image = useStore(useShallow((state) => state.base64Image!));

  return <img src={image} alt="" />;
}

export const ImageNode = memo(ImageNodeComponent);
