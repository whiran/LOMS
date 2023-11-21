import { getuniquescontract } from '@/app/actions/api/getuniquecontract'
import React from 'react'
import Mainnavbar from './Mainnavbar'

type Props = {
  id: string
}

const Misdata = async(props: Props) => {
  const contract = await getuniquescontract(props.id);
  console.log(contract);
  return (
    <div className='h-screen'>
      <Mainnavbar />
      <main className='mx-20'>
        <p className='text-xl my-6'>View Item</p>
        <hr className='h-1'/>
        <div className='flex flex-row w-full justify-between'>
          <div className='flex flex-row'>
            <div className='flex flex-col mr-4'>
              <p className='font-semibold'>Contract No:</p>
              <p className='font-semibold'>Season:</p>
              <p className='font-semibold'>Stroke DESC:</p>
              <p className='font-semibold'>Pro DESC:</p>
            </div>
            <div className='flex flex-col'>
              <p>{contract?.constractno}</p>
              <p>{contract?.season}</p>
              <p>{contract?.stroke_desc}</p>
              <p>{contract?.prodesc}</p>
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='flex flex-col mr-4'>
              <p className='font-semibold'>Stroke ID:</p>
              <p className='font-semibold'>TDEPT:</p>
              <p className='font-semibold'>Created AT:</p>
              <p className='font-semibold'>Updated AT:</p>
            </div>
            <div className='flex flex-col'>
              <p>{contract?.stroke_id}</p>
              <p>{contract?.tdept}</p>
              <p>{contract?.createdAt.toUTCString()}</p>
              <p>{contract?.updatedAt.toUTCString()}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Misdata