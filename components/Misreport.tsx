'use server'
import { getTotalCountByCountryCode } from '@/app/actions/api/getcountrycode'
import { getTotalCountBydepartmentnumber } from '@/app/actions/api/getdepartment'
import { getTotalCountBysupplierseries } from '@/app/actions/api/getsuplierseries'
import CBarchart from './CBarchart'
import DBarchart from './DBarchart'
import SBarchart from './SBarchart'

const Misreport =  async() => {

        const response = await getTotalCountByCountryCode();
        const dresponse = await getTotalCountBydepartmentnumber();
        const supresponse = await getTotalCountBysupplierseries();

        
 
  return (
    <div className='flex flex-col m-4'>
      <CBarchart data={response}/>
      <DBarchart data={dresponse}/>
      <SBarchart data={supresponse} />
    </div>
  )
}

export default Misreport