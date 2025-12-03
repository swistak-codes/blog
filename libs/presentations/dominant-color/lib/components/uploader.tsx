import { useImageUpload } from '../logic/use-image-upload';

export function Uploader() {
  const handleImageUpload = useImageUpload();

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}
