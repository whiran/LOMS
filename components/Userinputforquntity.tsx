'use client'
import React, { useState } from 'react'
import { useMyContext } from '../context/MyContext';
import { createquantity } from '@/app/actions/api/createquantity';

type Props = {}

const Userinputforquntity = (props: Props) => {

  const [colorcode,setColorcode] = useState('');
  const [colorname,setColorname] = useState('');
  const [upcno,setUpcno] = useState('');
  const [primarysize,setPrimarysize] = useState('');
  const [secondarysize,setSecondarysize] = useState('');
  const [sellingprice,setSellingprice] = useState(0);
  const [orderqty,setOrderqty] = useState('');
  const {state3,setInputState4,inputState4} = useMyContext();

  const handleenterpress = async (e: React.KeyboardEvent) => {
    if(e.key === "Enter"){
      if(colorcode && colorname && upcno && primarysize && secondarysize && sellingprice && orderqty && state3 ){
        const result = await createquantity(colorcode,colorname,upcno,primarysize,secondarysize,sellingprice,orderqty,state3);

        if(result === "Successfully created new strokeno"){
          setColorcode('');
          setColorname('');
          setUpcno('');
          setPrimarysize('');
          setSecondarysize('');
          setSellingprice(0);
          setOrderqty('');
          setInputState4(!inputState4);
        }else{
          alert(result);
        }
      }else{
        alert("please fill in all fields.");
      }
    }
  }

  return (
    <tr>
      <td className='w-14 border border-black'></td>
      <td className='border border-black'><input type='text'onChange={(e) => setColorcode(e.target.value)} value={colorcode} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='text'onChange={(e) => setColorname(e.target.value)} value={colorname} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='text'onChange={(e) => setUpcno(e.target.value)} value={upcno} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='text'onChange={(e) => setPrimarysize(e.target.value)} value={primarysize} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='text'onChange={(e) => setSecondarysize(e.target.value)} value={secondarysize} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='number'onChange={(e) => setSellingprice(Number(e.target.value))} value={sellingprice} className='w-full bg-white'/></td>
      <td className='border border-black'><input type='text'onChange={(e) => setOrderqty(e.target.value)} value={orderqty} className='w-full bg-white' onKeyPress={handleenterpress}/></td>
    </tr>
  )
}

export default Userinputforquntity