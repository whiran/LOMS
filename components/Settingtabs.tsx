'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { getSession,useSession } from "next-auth/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { updateemailuser, updatepassworduser } from '@/app/actions/api/updateuserdata'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {TailSpin } from  'react-loader-spinner'
import { User } from 'lucide-react'
import { useRouter } from 'next/router'

 
type Props = {}

const Settingtabs = (props: Props) => {
  const { data: session, status, update } = useSession()//session client side

  const [email,setEmail] = useState('');
  const [nemail,setNEmail] = useState('');
  const [password,setPassword] = useState('');
  const [npass,setNpass] = useState('');
  const [demail,setDEmail] = useState('');
  const [dpass,setDpass] = useState('');
  const { toast } = useToast()

  const [processing1, setProcessing1] = useState(false);
  const [processing2, setProcessing2] = useState(false);
  const [processing3, setProcessing3] = useState(false);

  const updateemail = async () => {
  if(nemail != ''){
    setProcessing1(true);
    const resut = await updateemailuser(session?.user.id as string, nemail)
    if(resut == 'no'){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong from the serverside!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }else if( resut == 'ok'){
      toast({
        title: " successfully updated the record..",
        description: "Email added.",
      });

      await update({
        ...session,
        user: {
          ...session?.user,
          email: nemail,
        }
      })
    }
    setEmail('');
    setNEmail(''); 
    setProcessing1(false);
  }else {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "Please fill the new email address!",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }
  }

  const changepass = async () => {
    if(password != '' && npass != ''){
        setProcessing2(true);
        const result = await updatepassworduser(session?.user.id as string, password, npass);
        if(result == 'ok'){
          toast({
            title: " successfully updated the record..",
            description: "Password changed.",
          });
          setPassword('');
          setNpass('');
        }else if(result == 'no'){
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Something went wrong from the serverside!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }else if( result == 'notsame'){
          toast({
            variant: "destructive",
            title: "Uh oh! Please provide the correct current password.",
            description: "Try again withe correct password!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }else if(result == 'error'){
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Something went wrong from the serverside!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
        setProcessing2(false);
      }else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please fill the both new and old password!",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
  }
  return (
    <Tabs defaultValue="account" className="w-full flex sm:flex-col md:flex-row md:h-[50%]">
      <TabsList className="grid  md:w-[20%] md:grid-cols-1 border-2 border-stone-950 h-full mt-2 md:mr-4 md:ml-8 overflow-auto">
        <TabsTrigger className='' value="account">Account</TabsTrigger>
        <TabsTrigger className='' value="password">Password</TabsTrigger>
        <TabsTrigger className='' value="delete">Delete Account</TabsTrigger>
      </TabsList>
      <div className='w-full'>
      <TabsContent value="account" className='w-full'>
        <Card className='h-full border-2 border-stone-950 mr-4'>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account email here. Click save when youre done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Current Email</Label>
              <Input id="email"  onChange={(e) => setEmail(e.target.value)} defaultValue={session?.user.email as string} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newemail">New Email</Label>
              <Input id="newemail"  onChange={(e) => setNEmail(e.target.value)} required/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateemail}>Save changes</Button>
          </CardFooter>
          <div className="w-full mx-auto flex justify-center items-center mt-2 mb-2">
      <TailSpin
               height="30"
               width="30"
               color="#05ed00"
               ariaLabel="tail-spin-loading"
               radius="1"
               wrapperStyle={{}}
               wrapperClass=""
               visible={processing1}
             />
      </div>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className='h-full border-2 border-stone-950 mr-4'>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" onChange={(e) => setPassword(e.target.value)} required={true} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" onChange={(e) => setNpass(e.target.value)} required={true} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={changepass}>Save password</Button>
          </CardFooter>
          <div className="w-full mx-auto flex justify-center items-center mt-2 mb-2">
      <TailSpin
               height="30"
               width="30"
               color="#05ed00"
               ariaLabel="tail-spin-loading"
               radius="1"
               wrapperStyle={{}}
               wrapperClass=""
               visible={processing2}
             />
      </div>
        </Card>
      </TabsContent>
      <TabsContent value="delete">
        <Card className='h-full border-2 border-stone-950 mr-4'>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              You must cancel any active subscription before deleting your account.
              
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input id="email" type="text" onChange={(e) => setDEmail(e.target.value)} required/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => setDpass(e.target.value)} required/>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save request</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      </div>
    </Tabs>
  )
}

export default Settingtabs