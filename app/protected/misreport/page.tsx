'use server'
import MISinterface from "@/components/MISinterface"
import Mainnavbar from "@/components/Mainnavbar"

import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"
import { getcarecount, getcontractcount, getothercount, getquntitycount } from "@/app/actions/api/countrecord"
import { groupbycontractmonth, groupbyothermonth, groupbyquantitymonth } from "@/app/actions/api/getmonth"



type Props = {}

const page = async (props: Props) => {

  const processCountData = await getorderprocessing();
  const pendingCountData = await getorderpending();
  const completeCountData = await getordercomplete();
  const totalCountData = await totalcount();
  const contractCount = await getcontractcount();
  const careCount = await getcarecount();
  const otherCount = await getothercount();
  const quantityCount = await getquntitycount();
  const contractmonths = await  groupbycontractmonth();
  const caremonths = await groupbyothermonth();
  const othermonths = await groupbyothermonth();
  const quntitymonths = await groupbyquantitymonth();

 

  
  
  //msi report view
  
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
      <div className="h-full">
       <MISinterface processCount={processCountData} pendingCount={pendingCountData} completeCount={completeCountData} totalCount={totalCountData} contractCount={contractCount} careCount={careCount} otherCount={otherCount} quantityCount={quantityCount} contractmonths={contractmonths} caremonths={caremonths} othermonths={othermonths} quntitymonths={quntitymonths}/>
      </div>
    </div>
  )
}

export default page