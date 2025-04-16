import { handleUpload } from '../logic/handle-upload';

export function Uploader() {
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
}
