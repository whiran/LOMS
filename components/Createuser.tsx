'use client'

import { createcustomuser } from "@/app/actions/api/createcustomuser";
import { getcustomusers } from "@/app/actions/api/getcustomusers";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
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
import bcrypt from 'bcryptjs'
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


const Createuser = (props: Props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tempemail,setTempemail] = useState('');
  const [currentemail,setCurrentemail] = useState('');
  const [temppass,setTemppass] = useState('');
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
    <div className="h-full w-full  flex flex-col font-mono">
      <div className="w-10/12 mt-4 ml-8">
        <p className="subpixel-antialiased text-sm font-light ">customer accounts</p>
        <h1 className="text-2xl font-bold subpixel-antialiased mt-2">Manage Accounts</h1>
      </div>
      <div className="w-10/12 ml-8 mt-4 grid grid-cols-3 grid-rows-2">
        <div className="subpixel-antialiased text-sm font-thin"><p className="w-[20%] text-left">Email</p></div>
        <div className="subpixel-antialiased text-sm font-thin"><p className="w-[20%] text-left">Password</p></div>
        <div className=""></div>
        <div className="text-lg font-normal"> <input type="text" className="w-[80%] border" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)}/></div>
        <div className="text-lg font-normal"> <input type="password" className="w-[80%] border" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)}/></div>
        <div className="w-full">
        <button className="w-[40%] mx-2 rounded-md bg-amber-50 border hover:bg-amber-100" onClick={reset}>Reset</button>
            <button className="w-[40%] mx-2 rounded-md bg-amber-400 border hover:bg-amber-500" onClick={handleclick}>Enter</button>
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
                  <td className="w-32 "> <SheetTrigger className="w-full"><Button className="w-full rounded-md bg-amber-300 hover:bg-amber-400" onClick={(e) => {setTempemail(result.email); setTemppass('dfddfdf'); setCurrentemail(result.email)}}>Edit</Button></SheetTrigger></td>
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

export default Createuser