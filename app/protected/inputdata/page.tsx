
import Mainnavbar from '@/components/Mainnavbar'
import { UploadForm } from '@/components/Uploadform'
import React from 'react'

type Props = {}

const page = (props: Props) => {

  //upload the xml file to server 
  
  return (
    <div>
      <div className='h-screen flex flex-col'>
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
        <div className='flex justify-center items-center h-full'>
        <UploadForm />
        </div>
      </div>
      
    </div>
  )
}

export default page