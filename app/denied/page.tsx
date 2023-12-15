import Mainnavbar from '@/components/Mainnavbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="h-screen  flex flex-col bg-blue-100">
         <div className="h-[9vh]">
           <Mainnavbar />
         </div>
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500 text-3xl">You don&apos;t have access to this page! Please sign in.</p>
          </div>
      </div>
  )
}

export default page