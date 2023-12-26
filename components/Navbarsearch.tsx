'use client'
import { createstroke } from '@/app/actions/api/createstroke';
import { useMyContext } from '@/context/MyContext';
import React, { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { searchstroke } from '@/app/actions/api/searchstroke';
import { error } from 'console';
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


type Props = {}

const Navbarsearch = (props: Props) => {
  const { state1, state6, setState1, setState2, setState3, setState4, setState5, setState6} = useMyContext();
  const [strokeno, setStrokeno] = useState('');
  const { data: session, status } = useSession();
  setState6(session?.user.id as string);
  const { toast } = useToast()
  const handleInputChange = async () => {

    try{
   if (strokeno) {
     const result = await createstroke(strokeno, session?.user.id as string);
     if(result === "Successfully created new strokeno"){
        setState5(strokeno);
     }
   }
  }catch (error) {
    alert(`error:,${error}`);
   }
        
 };

 const handleSearch = async () => {
  try{
    if(strokeno){
      const result = await searchstroke(strokeno);
      if(result === "strokefound"){
        setState5(strokeno);
      }else{
        toast({
          variant: "destructive",
          title: "Uh oh! Strong not found.",
          description: "you can click save button to save it if you need!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
  }catch(error){
    alert(`error:,${error}`);
  }
 }
 
  return (

      <div className='flex flex-row w-full justify-end'>
         <div className='flex flex-row border mx-2 2xl:mx-4 2xl:p-2 p-1 bg-white text-black rounded-md items-center'>
            <label className='2xl:text-lg'>STROKE NO</label>
            <input placeholder='  Search ...' onChange={(e) => {e.preventDefault()
                                    setStrokeno(e.target.value)
                                    setState2('');
                                    setState3('');
                                    setState4('');}} className=' text-black w-32 mx-2 hover:opacity-95'/>
            <Save color='currentColor' size={18} onClick={handleInputChange}/>
            <button className='border hover:bg-[#879cfb] rounded mx-1 2xl:text-lg' onClick={handleSearch} >SEARCH</button>
        </div>
    </div>
  
  )
}

export default Navbarsearch