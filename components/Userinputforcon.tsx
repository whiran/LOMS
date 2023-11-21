'use client'
import {  useState } from "react";
import { createtable1 } from "@/app/actions/api/createtabel1";
import { useMyContext } from "../context/MyContext";

type Props = {
  strokeno: string;
}

const Userinputforcon = ({ strokeno }: Props) => {

  const [constractno, setConstractno] = useState('');
  const [season, setSeason] = useState('');
  const [tdept, setTdept] = useState('');
  const [prodesc, setProdesc] = useState('');
  const[strokedesc, setStrokedesc] = useState('');
  const stroke = strokeno;
  const {inputState1, setInputState1} = useMyContext();

  const handleenterpress = async (e: React.KeyboardEvent) => {
    if(e.key === "Enter"){
      if(constractno && season && tdept && prodesc && strokedesc && stroke){
        const result = await createtable1(constractno,season,tdept,prodesc,strokedesc, stroke);

        if(result === "Successfully created new strokeno"){
          setConstractno('');
          setSeason('');
          setTdept('');
          setProdesc('');
          setStrokedesc('');
          setInputState1(!inputState1);
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
          <td className='border border-black'></td>
          <td className='border border-black'>{strokeno}</td>
          <td className='border border-black'><input className='w-40 bg-white '
          type='text'
          value={constractno}
          onChange={(e) => setConstractno(e.target.value)}
          /></td>
          <td className='border border-black'><input className='w-40 bg-white '
          type='text'
          value={season}
          onChange={(e) => setSeason(e.target.value)}/></td>
          <td className='border border-black'><input className='w-40 bg-white '
          type='text'
          value={tdept}
          onChange={(e) => setTdept(e.target.value)}/></td>
          <td className='border border-black'><input className='w-40 bg-white ' type='text'
          value={prodesc}
          onChange={(e) => setProdesc(e.target.value)}/></td>
          <td className='border border-black'><input className='w-40 bg-white ' type='text'
          value={strokedesc}
          onChange={(e) => setStrokedesc(e.target.value)
          }
          onKeyPress={handleenterpress}/></td>
          </tr>
  )
}

export default Userinputforcon