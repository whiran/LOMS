
import { caredata, constractdata, otherdata, quantitydata } from '@/app/actions/api/getalllabeldata';
import { getorders, getpendingorders, getprocessingorders, getcompletedorders } from '@/app/actions/api/getorders';

import React from 'react'

type Props = {}

const page = async ({ params }: { params: { id: string } }) => {
  if(params.id == 'order'){
    const fetcheddata = await getorders();
  return (
    <div className='bg-slate-100 h-screen'>
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
  )
  }else if(params.id == 'process'){
    const fetcheddata = await getprocessingorders();
    return (
      <div className='bg-slate-100 h-screen'>
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
    )
  }else if(params.id == 'pending'){
    const fetcheddata = await getpendingorders()
    return(
      <div className='bg-slate-100 h-screen'>
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
    )
  }else if(params.id == 'complete'){
    const fetcheddata = await getcompletedorders();
    return(
      <div className='bg-slate-100 h-screen'>
        <h1  >{params.id} Details:</h1>
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
    )
  }else if(params.id == 'contract'){
    const fetcheddata = await constractdata();
    return(
      <div className='bg-slate-100 h-screen'>
        <h1 className='font-bold text-center'>{params.id} Data</h1>
        <table>
          <thead>
            <tr>
              <th>constractno</th>
              <th>season</th>
              <th>stroke_desc</th>
              <th>prodesc</th>
              <th>tdept</th>
              <th>strokeid</th>
              <th>createdAt</th>
              <th>updatedat</th>
            </tr>
          </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.constractno}>
                <td>{data.constractno}</td>
                <td>{data.season}</td>
                <td>{data.stroke_desc}</td>
                <td>{data.prodesc}</td>
                <td>{data.tdept}</td>
                <td>{data.stroke_id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.updatedAt.toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }else if(params.id == 'care'){
    const fetcheddata = await caredata();
    return(
      <div></div>
    )
  }else if(params.id == 'other'){
    const fetcheddata = await otherdata();
    return(
      <div></div>
    )
  }else if(params.id == 'quantity'){
    const fetcheddata = await quantitydata();
    return(
      <div></div>
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