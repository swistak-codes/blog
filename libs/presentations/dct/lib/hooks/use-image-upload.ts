import { useStore } from './use-store';
import { ChangeEvent, useCallback } from 'react';
import { addImageToStore } from '../logic/add-image-to-store';

export function useImageUpload() {
  const { setImage } = useStore();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
        return;
      }
      const file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = addImageToStore(image, setImage);
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    },
    [setImage]
  );

  return { onChange };
}
