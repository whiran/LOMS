import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"
import Misforcustomer from '@/components/Misforcustomer';
import { getprocessingordercus, gettotalcompletedcusandsub, totcountcus, tototalpendingcusandsub } from '@/app/actions/api/customers/ordercountbycus';


type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const processCountData = await getprocessingordercus(userid);
  const pendingCountData = await tototalpendingcusandsub(userid);
  const completeCountData = await gettotalcompletedcusandsub(userid);
  const totalCountData = await totcountcus(userid);

  console.log('count:',processCountData,pendingCountData,completeCountData,totalCountData)
  
  return (
    <div>
      <Misforcustomer />
    </div>
  )
}

export default page