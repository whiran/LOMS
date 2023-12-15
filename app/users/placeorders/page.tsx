import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getcreatedusersstrokes } from '@/app/actions/api/customers/getcreatedusersstrokes';
import Placeorder from '@/components/Placeorder';

type Props = {}

const Page = async(props: Props) => {

  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const strokes:string[] =  await getcreatedusersstrokes(userid);

  return (
    <div className='flex justify-center items-center h-full'>
    <Placeorder id={userid} strokes={strokes}/>
    </div>
  )
}

export default Page