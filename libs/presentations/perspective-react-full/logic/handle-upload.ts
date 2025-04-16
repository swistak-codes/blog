import { ChangeEvent } from 'react';
import { useStore } from '../hooks/use-store';

export function handleUpload(e: ChangeEvent<HTMLInputElement>) {
  if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
    return;
  }
  const file = e.currentTarget.files[0];
  useStore.getState().setImage(file);
}
