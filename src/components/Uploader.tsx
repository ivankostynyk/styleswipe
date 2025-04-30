
'use client';
import React, { useState, ChangeEvent } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Uploader() {
  // Initialize Supabase client for client components
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `images/${fileName}`;

    // Upload to Supabase storage bucket 'images'
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
    } else {
      console.log('Upload success:', data);
      // Optional: insert record into 'images' table
    }

    setUploading(false);
  };

  return (
    <div className="uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
