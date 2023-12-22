import React from 'react'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getcountofordersthismonthdatearraysub, getcountofordersthismonthsub, getmonthtotdatasub, getprocessingordersub, gettotalcompletedsub, gettotalholdsub, totcountsub, tototalpendingsub } from '@/app/actions/api/subuser/orderbysub';
import Misforsub from '@/components/Misforsub';

type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  
  const processCountData = await getprocessingordersub(userid);
  const pendingCountData = await tototalpendingsub(userid);
  const completeCountData = await gettotalcompletedsub(userid);
  const totalCountData = await totcountsub(userid);
  const holdcountdata = await gettotalholdsub(userid);
  const thismonthcounttotal = await getcountofordersthismonthsub(userid);
  
  const monthrecords = await getmonthtotdatasub(userid);
  const montharray = await getcountofordersthismonthdatearraysub(userid);





  return (
    <div>
      <Misforsub processing={processCountData} pending={pendingCountData} complete={completeCountData} total={totalCountData} hold={holdcountdata} thismonth={thismonthcounttotal} monthrecords={monthrecords} monthdatas={montharray}/>
    </div>
  )
}

export default page