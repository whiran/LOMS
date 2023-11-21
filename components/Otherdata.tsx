'use client'
import { useState, useEffect} from 'react'
import { getother} from '@/app/actions/api/getother'
import { useMyContext } from '../context/MyContext';


type Other = {
  id: string;
  fef_no: string;
  label_type: string;
  carelabel_id: string;
  createdAt: Date;
  updatedAt: Date;
}



export default  function Otherdata() {
  const [others, setOthers] = useState<Other[]>([]);
  const {state2,state3, setState3, inputState3, setInputState3, setState4} = useMyContext();
  console.log('setother is running...')

  const handleRowClick = (id: string) => {
    console.log('Clicked on care number:', id);
    setState3(id);
    setState4('000000000000000000000000');
  };
  console.log(state3);
  
  useEffect(() => {
    console.log('useEffect is running on other!')
    const fetchCare = async () => {
      const fetchedOthers = await getother(state2);
      const sortedOther = [...fetchedOthers].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      setOthers(sortedOther);
    };
    if(state2!== ''){
      fetchCare();
    }
  },[state2, inputState3]);

    
  return (
    <>
    {others.map(Other => (
      <tr key={Other.id} onClick={() => handleRowClick(Other.id)} className='hover:bg-violet-50'>
        <td className={`border border-black ${state3 === Other.id?'text-cyan-400':'' }`}>{Other.fef_no}</td>
        <td className='border border-black'>{Other.label_type}</td>
      </tr>
    ))}</>
  )
}
