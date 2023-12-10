import React from 'react'
import { getallusersorders, getprocessinguserorders, getpendinusergorders, getcompleteduserorders } from '@/app/actions/api/getorders';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Mainnavbar from '@/components/Mainnavbar';
type Props = {}

type order = {
    id: string;
    coo: string;
    fiber: string;
    component: string;
    caretext: string;
    washsimbol: string;
    sizeration: string;
    state: string;
    userid: string;
    createdAt: Date;
    updatedAt: Date;
    ordervalue: number | null;
}


const page = async ({ params }: { params: { id: string } }) => {
  
  const session = await getServerSession(authOptions);


  if(params.id == 'all'){
     const fetcheddata:order[] = await getallusersorders(session?.user.id as string)
    return (
      <div className='bg-slate-100 h-screen flex flex-col'>
        <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
          <h1 className='font-bold text-center'>{params.id} Details:</h1>
          <table className='m-auto bg-white w-[80%]'>
            <thead className='p-2 bg-emerald-400 w-full'>
              <tr>
                <th>ID</th>
                <th>Created Date</th>
                <th>Created User Id</th>
              </tr>
              </thead>
            <tbody>
              {fetcheddata.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.createdAt.toISOString()}</td>
                  <td>{data.userid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    )
  }else if(params.id == 'completed'){
    const fetcheddata:order[] = await getcompleteduserorders(session?.user.id as string);
    return(
      <div className='bg-slate-100 h-screen flex flex-col'>
        <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1  className='font-bold text-center'>{params.id} Details:</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>ID</th>
              <th>Created Date</th>
              <th>Created User Id</th>
            </tr>
            </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.userid}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
    )
  }else if(params.id == 'processing'){
    const fetcheddata: order[] = await getprocessinguserorders(session?.user.id as string);
    return (
      <div className='bg-slate-100 h-screen flex flex-col'>
        <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1 className='font-bold text-center'>{params.id} Details:</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>ID</th>
              <th>Created Date</th>
              <th>Created User Id</th>
            </tr>
            </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.userid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )
  }else if(params.id == 'pending'){
    const fetcheddata = await getpendinusergorders(session?.user.id as string)
    return(
      <div className='bg-slate-100 h-screen flex flex-col'>
        <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1 className='font-bold text-center'>{params.id} Details:</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>ID</th>
              <th>Created Date</th>
              <th>Created User Id</th>
            </tr>
            </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.userid}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
    )
  }else{
    return(
      <div className='h-screen bg-slate-400 flex justify-center items-center'>
        <div>Something wrong!</div>
      </div>
    )
  }
}

export default page