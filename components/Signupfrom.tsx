
'use client'

import { sign } from "crypto";
import { useState } from "react"
import { signup } from "../app/actions/users/signUp";

const Signupfrom = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState('');

  const handleSubmit = async () => {
    setMessage('creating');
    const messageu = await signup(email,password);
    setMessage(messageu)
  }

  return (
    <div className='flex flex-col gap-8 bg-gray-100 p-4 max-w-md mx-auto m-10 rounded-md'>
        <input type='text' placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded border border-gray-300'/>
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded border border-gray-300'/>
        
        <button onClick={handleSubmit}  className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Sign up</button>

        <p className='text-red-600'>{message}</p>
    </div>
  )
}

export default Signupfrom
