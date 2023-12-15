'use client'
import { useState } from 'react'
import { useMyContext } from '../context/MyContext';
import { createother } from '@/app/actions/api/createother';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


type Props = {}

const Userinputforother = (props: Props) => {

  const [refno, setRefno] = useState('');
  const [labeltype, setLabeltype] = useState("");
  const {state2,setInputState3,inputState3} = useMyContext();
  const { toast } = useToast()

  
  const handleenterpress = async (e: React.KeyboardEvent) => {
    if(e.key === "Enter"){
      if(refno && labeltype && state2 && state2!=='000000000000000000000000' ){
        const result = await createother(refno,labeltype,state2);

        if(result === "Successfully created new strokeno"){
          setRefno('');
          setLabeltype('');
          setInputState3(!inputState3);
        }else{
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Something went wrong from the serverside!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
      }else if(state2 == '' || state2 == '000000000000000000000000'){
        
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "please select a care Ref no before enter data!",
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
      <td className='border border-black'><input type='text' className='w-44 bg-white' value={refno} onChange={(e) => setRefno(e.target.value)}/></td>
      <td className='border border-black'><input type='text' className='w-44 bg-white' value={labeltype} onChange={(e) => setLabeltype(e.target.value)} onKeyPress={handleenterpress}/></td>
    </tr>
  )
}

export default Userinputforother