import { useImageUpload } from '../hooks/use-image-upload';

export function Uploader() {
  const { onChange } = useImageUpload();

  return (
    <div>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  );
}
