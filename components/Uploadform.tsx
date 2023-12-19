'use client'

import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type Props = {
  id: string;
  xml: xmldata[];
}

type xmldata = {
  
    id: string;
    createdAt: Date;

}
export function UploadForm(props:Props) {
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
      setMessage("Error occure please try agin later")
      // Handle errors here
    }
  }

  return  (
    <div className='flex flex-row w-[40%] h-[40%] gap-1'>
    
    <div className="max-w-md p-4 bg-white shadow-lg rounded-lg w-full h-full">
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
    <div className='max-w-md p-4 bg-white shadow-lg rounded-lg  w-full h-full'>
      <h2 className="text-xl font-semibold mb-4">XML upload history</h2>
      <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Day</h4>
        {props.xml.map((tag) => (
          <>
            <div key={tag.id} className="text-sm">
              {tag.createdAt.getDate()-tag.createdAt.getMonth()+1-tag.createdAt.getFullYear()}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
    </div>
    </div>
  );
}
