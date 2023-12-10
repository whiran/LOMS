import ComReg from '@/components/ComReg'
import Orderqty from '@/components/Orderqty'
import Placeorder from '@/components/Placeorder'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col bg-zinc-600 h-screen justify-center items-center'>
      <div className='w-3/6'>
       <ComReg />
      </div>
    </div>
  )
}

export default page