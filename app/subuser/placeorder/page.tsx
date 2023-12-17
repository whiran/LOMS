import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Placeorder from '@/components/Placeorder';

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  
  return (
    <div>page</div>
  )
}

export default page