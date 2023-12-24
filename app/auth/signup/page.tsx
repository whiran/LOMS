import React from 'react'
import Signupfrom from '@/components/Signupfrom'
import Link from 'next/link'

const SignUpPage = () => {
  return (
    <div className='flex flex-col bg-zinc-600 w-full ' style={{ 
      height: '100vh', overflowY: 'auto', }}>
      <div className="h-[9vh] w-full flex justify-end items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link className='mx-1 hover:bg-sky-700 p-2 rounded-md' href='/auth/signin'>Signin</Link>
      </div>
   
    <div className="flex justify-center items-center h-full mt-4 mb-4">
        <Signupfrom />
    </div>
    </div>
  )
}

export default SignUpPage
