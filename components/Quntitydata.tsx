'use client'
import { useMyContext } from '../context/MyContext';
import {getquntity} from  '@/app/actions/api/getquntity'
import { useState, useEffect} from 'react'

type Quntity = {
  id: string;
  color_code: string;
  color_name: string;
  upc_no: string;
  primary_size: string;
  secondary_size: string;
  selling_price: number;
  order_qty: string;
  otherlabel_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default  function Quntitydata() {
  const [quntitys, setQuntitys] = useState<Quntity[]>([]);
  const { state3,state4,setState4, inputState4, setInputState4} = useMyContext();
  console.log('setquntity is running...')

  const handleRowClick = (id: string) => {
    console.log('Clicked on quntity number:', id);
    setState4(id);
  };
  console.log(state4);
  
  useEffect(() => {
    const fetchQuntity = async () => {
      const fetchQuntity = await getquntity(state3);
      const sortedQuntity = [...fetchQuntity].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      setQuntitys(sortedQuntity);
      console.log('useEffect is running on Quntity!')
    };
    if(state3 !== ''){
      fetchQuntity();
    }
   
  },[state3,inputState4]);

    
  return (
    <>
    {quntitys.map(quntity => (
      <tr key={quntity.id} onClick={() => handleRowClick(quntity.id)} className='hover:bg-violet-50'>
        <td className='border border-black'></td>
        <td className={`border border-black ${state4 === quntity.id?'text-cyan-400':'' }`}>{quntity.color_code}</td>
        <td className='border border-black'>{quntity.color_name}</td>
        <td className='border border-black'>{quntity.upc_no}</td>
        <td className='border border-black'>{quntity.primary_size}</td>
        <td className='border border-black'>{quntity.secondary_size}</td>
        <td className='border border-black'>{quntity.selling_price}</td>
        <td className='border border-black'>{quntity.order_qty}</td>
      </tr>
    ))}</>
  )
}
