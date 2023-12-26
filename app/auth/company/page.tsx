import ComReg from '@/components/ComReg'
import Orderqty from '@/components/Orderqty'
import Placeorder from '@/components/Placeorder'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col bg-zinc-600 h-screen p-4 overflow-auto justify-center items-center'>
      
       <ComReg />
   
    </div>
  )
}

export default page