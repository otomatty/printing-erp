import type React from 'react';
import { useState } from 'react';

interface ImageUploaderProps {
  /** 初期プレビュー用の画像URL */
  initialImageUrl?: string;
  /** ファイル選択時に呼ばれるコールバック */
  onFileChange: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImageUrl,
  onFileChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    initialImageUrl
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileChange(file);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Thumbnail preview"
          className="w-32 h-32 object-cover rounded-md"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border rounded-md p-1"
      />
    </div>
  );
};
