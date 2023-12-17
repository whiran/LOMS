'use client'

import { createcustomuser } from "@/app/actions/api/createcustomuser";
import { getcustomusers } from "@/app/actions/api/getcustomusers";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { createsubuser } from "@/app/actions/api/customers/createsubuser";
import Tableforcuslist from "./Tableforcuslist";
import { Skeleton } from "./ui/skeleton";

type result = {
  id: string;
 email: string;
 password: string;
 userType: string;
 createdAt: Date;
 updatedAt: Date;
 createdby: string | null;
}
type Props = {
id: string;
}

const Createsubuser = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast()
  const [results, setResults] =useState<result[]>([])
  const [temp,setTemp] = useState(true);
  const [loading, setLoading] = useState(false);  // for check the loading state

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      const resultfetch: result[] = await getcustomusers(props.id);
      setResults(resultfetch);
      setLoading(false);
    }
    fetchdata();
  },[props.id, temp])

  const handleclick  = async() =>{
     const result = await createsubuser(email, password,props.id)
     if(result == 'ok'){
      toast({
        title: " successfully created..",
        description: "account details added.",
      });
      setTemp(!temp);
     }else{
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong from the serverside!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
     }
  }
  return (
    <div className="h-full w-full bg-slate-400 flex flex-col">
      <div className="w-full bg-slate-600 ">
          <form className="flex flex-col gap-2 w-3/6 mx-auto ">
            <div className=" flex gap-2 mt-4">
              <input type="text" required onChange={e => setEmail(e.target.value)}/>
              <input type="password" required onChange={e => setPassword(e.target.value)}/>
            </div>
            <button className="w-24 bg-cyan-500" onClick={handleclick}>create</button>
          </form>
      </div>
      <div className="w-10/12 mx-auto mt-4">
        <div className="h-96 bg-slate-300 rounded-md">
        { loading ? (<div className="flex justify-center items-center h-full w-full"><div className="flex items-center space-x-4">
                       <Skeleton className="h-12 w-12 rounded-full" />
                         <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                     </div>
          </div></div>):( <Tableforcuslist results={results}/>)}
        
        </div>
      </div>
    </div>
  )
}

export default Createsubuser