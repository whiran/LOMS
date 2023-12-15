'use client'
import { useState, useEffect} from 'react'
import { getcare } from '@/app/actions/api/getcare'; 
import { useMyContext } from '../context/MyContext';

type Care = {
  id: string;
  ref_no: string;
  wash_symbol: string;
  fibre: string;
  zoordes: string;
  mpart_fw: string;
  coo: string;
  caretext: string;
  contract_id: string;
  createdAt: Date;
  updatedAt: Date;
}



export default  function Caredata() {
  const [cares, setCares] = useState<Care[]>([]);
  const { state1,state2,setState2,inputState2, setInputState2,setState3,setState4 } = useMyContext();
  const handleRowClick = (id: string) => {
    setState2(id);
    setState3('000000000000000000000000');
    setState4('000000000000000000000000');
  };
  

  
  useEffect(() => {
    const fetchCare = async () => {
      const fetchedContracts = await getcare(state1);
      const sortedContracts = [...fetchedContracts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      setCares(sortedContracts);
    
    };
    fetchCare();
  },[state1, inputState2]);


    
  return (
    <>
    {cares.map(care => (
      <tr key={care.id} onClick={() => handleRowClick(care.id)} className='hover:bg-violet-50'>
        <td className={`border border-black  ${state2 === care.id?'text-cyan-400':'' }`}>{care.ref_no}</td>
        <td className='border border-black'>{care.wash_symbol}</td>
        <td className='border border-black'>{care.fibre}</td>
        <td className='border border-black'>{care.zoordes}</td>
        <td className='border border-black'>{care.coo}</td>
        <td className='border border-black'>{care.caretext}</td>
        <td className='border border-black'>{care.mpart_fw}</td>
      </tr>
    ))}</>
  )
}
