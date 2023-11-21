'use client'

import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Progress } from '@/components/ui/progress'

export function UploadForm() {
  const [file, setFile] = useState<File>()
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessage("Uploading...");
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.append('file', file)

      const response: AxiosResponse = await axios.post('/api/upload', data, {
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded / (progressEvent.total || 100)) * 100);
          setProgress(progressPercentage);
        }
      })

      // Handle response here if needed

      setMessage("Uploaded");
    } catch (error: any) {
      console.error(error);
      // Handle errors here
    }
  }

  return  (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload a XML File</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="fileInput" className={`block mb-4 cursor-pointer border-dashed border-2 ${file ? 'border-green-500' : 'border-gray-400'} rounded-lg p-4 text-center`}>
          {file ? 'File selected!' : 'Choose a file...'}
          <input
            id="fileInput"
            type="file"
            accept=".xml"
            name="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Upload
        </button>
      </form>
      <Progress value={progress} className="w-[100%] my-2" />
      <p>{message}</p>
    </div>
  );
}
