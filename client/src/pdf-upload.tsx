// components/PdfUploader.tsx
import { useState } from 'react';

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/api/upload-sources', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Upload successful!');
    } else {
      alert('Upload failed.');
    }
  };

  return (
    <div className="p-4 border rounded-md w-full max-w-md mx-auto">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload PDF
      </button>
    </div>
  );
}
