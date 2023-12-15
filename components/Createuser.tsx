'use client'

import { createcustomuser } from "@/app/actions/api/createcustomuser";
import { getcustomusers } from "@/app/actions/api/getcustomusers";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

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


const Createuser = (props: Props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast()
  const [results, setResults] =useState<result[]>([])
  const [temp,setTemp] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const resultfetch = await getcustomusers(props.id);
      setResults(resultfetch);
    }
    fetchdata();
  },[props.id, temp])

  const handleclick  = async() =>{
     const result = await createcustomuser(email, password,props.id)
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
        <div>
          <table className="w-full bg-white">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id}>
                  <td>{result.email}</td>
                  <td>{result.createdAt.getUTCFullYear()}-{result.createdAt.getUTCMonth()+1}-{result.createdAt.getUTCDate()}</td>
                  <td>{result.updatedAt.getUTCDate()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Createuser