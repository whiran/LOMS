import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"
import Misforcustomer from '@/components/Misforcustomer';


type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const processCountData = await getorderprocessing(userid);
  const pendingCountData = await getorderpending(userid);
  const completeCountData = await getordercomplete(userid);
  const totalCountData = await totalcount(userid) as number;
  
  return (
    <div>
      <Misforcustomer />
    </div>
  )
}

export default page