
import { caredata, constractdata, otherdata, quantitydata } from '@/app/actions/api/getalllabeldata';
import { getorders, getpendingorders, getprocessingorders, getcompletedorders } from '@/app/actions/api/getorders';
import Mainnavbar from '@/components/Mainnavbar';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';


import React from 'react'

type Props = {}

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string


  if(params.id == 'order'){
    const fetcheddata = await getorders(userid);
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
  }else if(params.id == 'process'){
    const fetcheddata = await getprocessingorders(userid);
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
    const fetcheddata = await getpendingorders(userid)
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
  }else if(params.id == 'complete'){
    const fetcheddata = await getcompletedorders(userid);
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
  }else if(params.id == 'contract'){
    const fetcheddata = await constractdata();
    return(
      <div className='bg-slate-100 h-screen flex flex-col'>
          <div className="h-[9vh]">
          <Mainnavbar />
        </div>
       <div>
       <h1 className='font-bold text-center'>{params.id} Data</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead  className='p-2 bg-emerald-400 w-full'>
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
      </div>
    )
  }else if(params.id == 'care'){
    const fetcheddata = await caredata();
    return(
      <div className='bg-slate-100 h-screen  flex flex-col'>
          <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1 className='font-bold text-center'>{params.id} Data</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>Id</th>
              <th>Ref No</th>
              <th>Wash symbol</th>
              <th>fiber</th>
              <th>zoordes</th>
              <th>mpart</th>
              <th>coo</th>
              <th>caretxt</th>
              <th>Contract No</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {
              fetcheddata.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.ref_no}</td>
                  <td>{data.wash_symbol}</td>
                  <td>{data.fibre}</td>
                  <td>{data.zoordes}</td>
                  <td>{data.mpart_fw}</td>
                  <td>{data.coo}</td>
                  <td>{data.caretext}</td>
                  <td>{data.contract_id}</td>
                  <td>{data.createdAt.toISOString()}</td>
                  <td>{data.updatedAt.toISOString()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </div>
      </div>
    )
  }else if(params.id == 'other'){
    const fetcheddata = await otherdata();
    return(
      <div className='bg-slate-100 h-screen  flex flex-col'>
          <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1 className='font-bold text-center'>{params.id} Data</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>Id</th>
              <th>Ref No</th>
              <th>Label Type</th>
              <th>CareLabel Id</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.fef_no}</td>
                <td>{data.label_type}</td>
                <td>{data.carelabel_id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.updatedAt.toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    )
  }else if(params.id == 'quantity'){
    const fetcheddata = await quantitydata();
    return(
      <div className='bg-slate-100 h-screen  flex flex-col'>
          <div className="h-[9vh]">
          <Mainnavbar />
        </div>
        <div>
        <h1 className='font-bold text-center'>{params.id} Data</h1>
        <table className='m-auto bg-white w-[80%]'>
          <thead className='p-2 bg-emerald-400 w-full'>
            <tr>
              <th>Id</th>
              <th>Color code</th>
              <th>Color Name</th>
              <th>Upc no</th>
              <th>Primary size</th>
              <th>Secondary size</th>
              <th>Selling price</th>
              <th>Order qty</th>
              <th>Other label Id</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {fetcheddata.map(data => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.color_code}</td>
                <td>{data.color_name}</td>
                <td>{data.upc_no}</td>
                <td>{data.primary_size}</td>
                <td>{data.secondary_size}</td>
                <td>{data.selling_price}</td>
                <td>{data.order_qty}</td>
                <td>{data.otherlabel_id}</td>
                <td>{data.createdAt.toISOString()}</td>
                <td>{data.updatedAt.toISOString()}</td>
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