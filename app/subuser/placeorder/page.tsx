import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Placeorder from '@/components/Placeorder';
import { getcreatedcustomersstroke } from '@/app/actions/api/subuser/getcreatedcustomer';
import Placeorderforsub from '@/components/Placeorderforsub';

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const result:string[] = await getcreatedcustomersstroke(userid)
  return (
    <Placeorderforsub id={userid} strokes={result}/>
  )
}

export default page