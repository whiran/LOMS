import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"
import Misforcustomer from '@/components/Misforcustomer';
import { getcountofordersthismonth, getcountofordersthismonthdatearray, getprocessingordercus, gettotalcompletedcusandsub, gettotalholdcusandsub, totcountcus, tototalpendingcusandsub } from '@/app/actions/api/customers/ordercountbycus';
import { getmonthtotdatacus } from '@/app/actions/api/customers/getmonth';
import { ArrowDownAZ } from 'lucide-react';


type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const processCountData = await getprocessingordercus(userid);
  const pendingCountData = await tototalpendingcusandsub(userid);
  const completeCountData = await gettotalcompletedcusandsub(userid);
  const totalCountData = await totcountcus(userid);
  const holdcountdata = await gettotalholdcusandsub(userid);
  const thismonthcounttotal = await getcountofordersthismonth(userid);
  
  const monthrecords = await getmonthtotdatacus(userid);
  const montharray = await getcountofordersthismonthdatearray(userid);
  
  

  
  
  return (
    <div>
      <Misforcustomer processing={processCountData} pending={pendingCountData} complete={completeCountData} total={totalCountData} hold={holdcountdata} thismonth={thismonthcounttotal} monthrecords={monthrecords} monthdatas={montharray}/>
    </div>
  )
}

export default page