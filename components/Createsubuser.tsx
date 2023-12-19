'use client'

import { createcustomuser } from "@/app/actions/api/createcustomuser";
import { getcustomusers } from "@/app/actions/api/getcustomusers";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { createsubuser } from "@/app/actions/api/customers/createsubuser";
import Tableforcuslist from "./Tableforcuslist";
import { Skeleton } from "./ui/skeleton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
}  from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatecusdata } from "@/app/actions/api/updatecusdata";
import { deletecusandsubaccount } from "@/app/actions/api/deletecusandsubacount";

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
  const [tempemail,setTempemail] = useState('');
  const [currentemail,setCurrentemail] = useState('');
  const [temppass,setTemppass] = useState('');
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
      setEmail('');
       setPassword('');
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
  
  const reset = async() => {
    setEmail('');
    setPassword('');
  }
  const savedata = async() => {
    const result = await updatecusdata(currentemail,tempemail,temppass);
    if(result == 'ok'){
      toast({
        title: " successfully updated..",
        description: "account details added.",
      });
      setTemp(!temp);
    }
    else if(result == 'almost there'){
      toast({
        variant: "destructive",
        title: "Uh oh! your update email alredy there please try new one.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    else{
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong from the serverside!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }


  return (
    <div className="h-full w-full  flex flex-col">
    <div className="w-10/12 mt-4 ml-8">
      <p className="subpixel-antialiased text-xs font-thin ">customer accounts</p>
      <h1 className="text-xl font-bold subpixel-antialiased mt-2">Manage Accounts</h1>
    </div>
    <div className="w-10/12 ml-8 mt-4">
      <div className="subpixel-antialiased text-sm font-thin flex flex-row gap-8">
        <p className="w-[20%]">Email</p>
        <p className="w-[20%]">Password</p>
      </div>
      <div className="text-lg font-normal flex flex-row gap-8 mt-2 mb-4">
        <input type="text" className="w-[20%] border" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)}/>
        <input type="password" className="w-[20%] border" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)}/>
        <div className="w-full mx-4">
          <button className="w-16 mx-2 rounded-md bg-amber-50 border hover:bg-amber-100" onClick={reset}>Reset</button>
          <button className="w-16 mx-2 rounded-md bg-amber-400 border hover:bg-amber-500" onClick={handleclick}>Enter</button>
        </div>
      </div>
    </div>
    
    <div className="w-10/12 mx-auto mt-4 ml-8 h-full overflow-auto">
      <div>
        <table className="w-full bg-white">
          <thead className="">
            <tr className="border-b-2">
              <th className="font-normal text-left">Email</th>
              <th className="font-normal text-left">Created at</th>
              <th className="font-normal text-left">Updated at</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          <Sheet key={"right"}>
            {results.map(result => (
              <tr key={result.id} className="border-b-2 hover:bg-slate-300">
                <td>{result.email}</td>
                <td>{result.createdAt.getUTCFullYear()}-{result.createdAt.getUTCMonth()+1}-{result.createdAt.getUTCDate()}</td>
                <td>{result.updatedAt.getUTCFullYear()}-{result.updatedAt.getUTCMonth()+1}-{result.updatedAt.getUTCDate()}</td>
                <td className="w-32 "> <SheetTrigger className="w-full"><Button className="w-full rounded-md bg-amber-300 hover:bg-amber-400" onClick={(e) => {setTempemail(result.email); setTemppass(result.password); setCurrentemail(result.email)}}>Edit</Button></SheetTrigger></td>
                <td className="w-32 "><Button className="w-full rounded-md bg-red-500 hover:bg-red-600" onClick={() =>{deletecusandsubaccount(result.id);  setTemp(!temp);}}>Delete</Button></td>
              </tr>
            ))}
            <SheetContent side={"right"}>
            <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your customer profile here. Click save when youre done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={tempemail} className="col-span-3"  onChange={(e) => setTempemail(e.target.value)}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" value={temppass} className="col-span-3" onChange={(e) => setTemppass(e.target.value)}/>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={savedata}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
          </SheetContent>
          </Sheet>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Createsubuser