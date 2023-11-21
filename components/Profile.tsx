'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Profile = (props: Props) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  return (
    <div className='relative '>
      <Image src='/user.png' alt='user' width={30} height={30}  className='cursor-pointer'
      onClick={() => {
        setOpen(!open);
      }}/>
      {open && (<div className='absolute shadow-lg p-4 bg-white right-2 top-10 text-black'>
        <ul>
          <li className='p-2 text-sm cursor-pointer rounded hover:bg-blue-100' onClick={() => {
            setOpen(false);
          }}>settings</li>
          <li className='p-2 text-sm cursor-pointer rounded hover:bg-blue-100' onClick={() => {
            setOpen(false);
          }}><Link href='/auth/signout'>Logout</Link></li>
        </ul>
      </div>)}
    </div>
  )
}

export default Profile