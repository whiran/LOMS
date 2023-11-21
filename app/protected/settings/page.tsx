import Mainnavbar from '@/components/Mainnavbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <div className='h-screen flex flex-col'>
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
        <div className='flex justify-center items-center h-full'>
         <p>setting page</p>
        </div>
      </div>
      
    </div>
  )
}

export default page