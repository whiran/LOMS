
import { useState, useEffect} from 'react'
import { getcontract } from '@/app/actions/api/getcontract';
import { useMyContext } from '../context/MyContext';
import Link from 'next/link';

type Contract = {
  constractno: string;
  season: string;
  stroke_desc: string;
  prodesc: string;
  tdept: string;
  stroke_id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Props = {
  strokeno: string;
}

export default  function Contractdata({ strokeno }: Props) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const { state1,setState1, inputState1, setState3,setState4,setState2 } = useMyContext();
  

  const handleRowClick = (contractNo: string) => {
    setState1(contractNo);
    setState2('000000000000000000000000');
    setState3('000000000000000000000000');
    setState4('000000000000000000000000');
  };
 
  
  useEffect(() => {
    const fetchContracts = async () => {
      const fetchedContracts = await getcontract(strokeno);
      const sortedContracts = [...fetchedContracts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      setContracts(sortedContracts);
    };
    fetchContracts();
  },[strokeno,inputState1]);

    
  return (
    <>
    {contracts.map(contract => (
      <tr key={contract.constractno} onClick={() => handleRowClick(contract.constractno)} className='hover:bg-violet-50'>
        <td className={`border border-black `}></td>
        <td className={`border border-black ${state1 === contract.constractno?'text-cyan-400':'' }`}>{contract.stroke_id}</td>
        <td className='border border-black'>{contract.constractno}</td>
        <td className='border border-black'>{contract.season}</td>
        <td className='border border-black'>{contract.tdept}</td>
        <td className='border border-black'>{contract.prodesc}</td>
        <td className='border border-black'><Link href={`/protected/dashbord/${contract.constractno}`}>{contract.stroke_desc}</Link></td>
      </tr>
    ))}</>
  )
}
