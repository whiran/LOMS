'use client'
import {  useState } from "react";
import { createtable1 } from "@/app/actions/api/createtabel1";
import { useMyContext } from "../context/MyContext";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

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
  const { toast } = useToast()

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
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Something went wrong from the serverside!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
      }else if(stroke == ''){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "please select a stroke or create a stroke before enter data to contract data.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }else{
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Please fill all the fields.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
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
          <td className='border border-black'>
          <select name="season" id="season" onChange={(e) => setSeason(e.target.value)} value={season} className="w-40 bg-white">
              <option value="">Select a season</option>
              <option value="AU23">AU23</option>
              <option value="SU23">SU23</option>
              <option value="SP23">SP23</option>
              <option value="WI23">WI23</option>
         </select>
            </td>
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