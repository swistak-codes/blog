import { ChangeEvent, useCallback } from 'react';
import { addImageToStore } from './add-image-to-store';
import { useStore } from '../utils/store';
import { useShallow } from 'zustand/react/shallow';

export const useImageUpload = () => {
  const setImage = useStore(useShallow((state) => state.setImage));

  const handleImageUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
        return;
      }
      const file = e.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => addImageToStore(image, setImage);
        image.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    },
    [setImage],
  );

  return handleImageUpload;
};
