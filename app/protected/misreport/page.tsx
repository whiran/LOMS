'use server'
import MISinterface from "@/components/MISinterface"
import Mainnavbar from "@/components/Mainnavbar"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';


import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"
import { getcarecount, getcontractcount, getothercount, getquntitycount } from "@/app/actions/api/countrecord"
import { groupbycontractmonth, groupbyothermonth, groupbyquantitymonth } from "@/app/actions/api/getmonth"
import { countstrokes } from "@/app/actions/api/countstrokes";



type Props = {}
type Counts = {
  contractCount: number;
    strokeCount: number;
    carelabelCount: number;
    otherlabelCount: number;
    contityCount: number;
}
type MonthlyData = { month: number; count: number }[]; 
const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const userresults:Counts = await countstrokes(userid)
 

  const processCountData = await getorderprocessing(userid);
  const pendingCountData = await getorderpending(userid);
  const completeCountData = await getordercomplete(userid);
  const totalCountData = await totalcount(userid) as number;
  
  const contractCount = userresults.contractCount
  const careCount = userresults.carelabelCount
  const otherCount = userresults.otherlabelCount
  const quantityCount = userresults.contityCount



  const contractmonths:MonthlyData = await  groupbycontractmonth(userid,'con');
  const caremonths:MonthlyData = await groupbycontractmonth(userid,'care');
  const othermonths:MonthlyData = await groupbycontractmonth(userid,'other');
  const quntitymonths:MonthlyData = await groupbycontractmonth(userid,'qun');

 

  
  
  //msi report view
  
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
      <div className="">
       <MISinterface processCount={processCountData} pendingCount={pendingCountData} completeCount={completeCountData} totalCount={totalCountData} contractCount={contractCount} careCount={careCount} otherCount={otherCount} quantityCount={quantityCount} contractmonths={contractmonths} caremonths={caremonths} othermonths={othermonths} quntitymonths={quntitymonths}/>
      </div>
    </div>
  )
}

export default page