'use client'


import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"



const Signinform = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const { toast } = useToast()

  const handleSubmit = async () => {
    setMessage('Signing in...');
   
    
    try {
        const signInResponse = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        if(signInResponse?.ok == false) {
            setMessage("Invalid credentials");
            toast({
              variant: "destructive",
              title: "Uh oh! Something  wrong.",
              description: "Please Provide correct Credentials or check the connection!",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            
        } else {
            router.refresh();
        }

    } catch(err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something  wrong.",
        description: "Something wrong from server Please try later or try to use help!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }

    setMessage(message);
};

useEffect(() => {
  if (status === 'authenticated') {
      router.refresh();
      if (session.user.userType === 'admin') {
        console.log('Admin logged in');
        router.push('/protected/dashbord'); // Route for admin dashboard
      } else if(session.user.userType === 'user') {
        router.push('/users/dashbord'); // Route for other user types
      } else if(session.user.userType === 'subuser'){
        router.push('/subuser/dashbord');
      }
  }
}, [router, status, session]);



  return (
    <div className='flex flex-col gap-2 lg:gap-3 lg:p-6 bg-gray-100 p-4 md:w-64 lg:w-80 xl:w-3/12 rounded-md'>
      <input type='text' placeholder='Username' value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 lg:p-4 text-base lg:text-lg rounded border border-gray-300'/>
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded border border-gray-300 lg:p-4 text-base lg:text-lg'/>
      
      <button onClick={handleSubmit}  className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Sign in</button>

      <p className='text-red-600'>{message}</p>
    </div>
  )
}

export default Signinform
