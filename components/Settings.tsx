import React from 'react'

import { UserCogIcon } from 'lucide-react'

type Props = {}

const Settings = (props: Props) => {
  return (
    <div className='h-screen w-full flex flex-col gap-4'>
      <div className='text-2xl font-bold flex gap-1 p-8'>< UserCogIcon/><p>Account settings</p></div>
      <div className='w-10/12 border-2 border-black mx-auto '>
        <p className='ml-2 text-base'>User Information</p>
        <hr/>
        <div className='flex flex-row my-4 mx-2'>
          <div className='flex flex-col w-1/3 gap-2 m-2'><label>Name</label><div className='border w-full h-8'></div></div>
          <div className='flex flex-col w-1/3 gap-2 m-2'><label>Email</label><div className='border w-full h-8'></div></div>
          <div className='flex flex-col w-1/3 gap-2 m-2'><label>UserType</label><div className='border w-full h-8'></div></div>
        </div>
      </div>
      <div className='h-full bg-slate-400 w-full flex justify-center items-center'>
        <div className=' w-10/12 border h-5/6 flex flex-col'>
          <p  className='ml-2 text-base'>Update user information</p>
          <hr/>
          <div className='h-full w-full flex md:flex-row sm:flex-col'>
            <div className='sm:w-full md:w-1/2 h-full bg-slate-300 flex flex-col justify-around px-2'>
              <div className='flex flex-row w-full '><label className='w-1/2'>First Name</label><input type='text' className='w-1/2' /></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Last Name</label><input type='text' className='w-1/2' /></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Phone No</label><input type='text'className='w-1/2' /></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Streeat address</label><input type='text'className='w-1/2' /></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Street address line two</label><input type='text' className='w-1/2'/></div>
            </div>
            <div className='sm:w-full md:w-1/2 h-full flex flex-col justify-around px-2'>
              <div className='flex flex-row w-full '><label className='w-1/2'>City</label><input type='text' className='w-1/2'/></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Post code</label><input type='text' className='w-1/2'/></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Country</label><input type='text' className='w-1/2'/></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Email</label><input type='text' className='w-1/2'/></div>
              <div className='flex flex-row w-full '><label className='w-1/2'>Password</label><input type='text' className='w-1/2'/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings