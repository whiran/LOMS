'use client'
import { useState } from 'react'
import { useMyContext } from '../context/MyContext';
import { createother } from '@/app/actions/api/createother';

type Props = {}

const Userinputforother = (props: Props) => {

  const [refno, setRefno] = useState('');
  const [labeltype, setLabeltype] = useState("");
  const {state2,setInputState3,inputState3} = useMyContext();
  
  const handleenterpress = async (e: React.KeyboardEvent) => {
    if(e.key === "Enter"){
      if(refno && labeltype && state2 ){
        const result = await createother(refno,labeltype,state2);

        if(result === "Successfully created new strokeno"){
          setRefno('');
          setLabeltype('');
          setInputState3(!inputState3);
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
      <td className='border border-black'><input type='text' className='w-14 bg-white' value={refno} onChange={(e) => setRefno(e.target.value)}/></td>
      <td className='border border-black'><input type='text' className='w-44 bg-white' value={labeltype} onChange={(e) => setLabeltype(e.target.value)} onKeyPress={handleenterpress}/></td>
    </tr>
  )
}

export default Userinputforother