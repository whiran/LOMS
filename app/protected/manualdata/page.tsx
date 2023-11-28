import React from 'react'
import Placeorder from '@/components/Placeorder'


type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Placeorder />
    </div>
  )
}

export default page