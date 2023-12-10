'use client'


import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Signinform = () => {
  const router = useRouter();

  const { status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('Signing in...');
    
    try {
        const signInResponse = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })

        if(!signInResponse || signInResponse.ok !== true) {
            setMessage("Invalid credentials");
        } else {
            router.refresh();
        }

    } catch(err) {
        console.log(err);
    }

    setMessage(message);
};

useEffect(() => {
  if (status === 'authenticated') {
      router.refresh();
      router.push('/protected/dashbord');
  }
}, [router, status]);



  return (
    <div className='flex flex-col gap-2 bg-gray-100 p-4 md:w-64 rounded-md'>
      <input type='text' placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded border border-gray-300'/>
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded border border-gray-300'/>
      
      <button onClick={handleSubmit}  className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Sign in</button>

      <p className='text-red-600'>{message}</p>
    </div>
  )
}

export default Signinform
