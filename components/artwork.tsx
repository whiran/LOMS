'use client'
import React, { useState, useEffect, Suspense, useRef } from 'react'

import { createstroke } from '../app/actions/api/createstroke'
import { getstrokedata } from '../app/actions/api/getstrokedata'
import { getcontract } from '../app/actions/api/getcontract'
import Showimg from '@/components/Showimg'
import { getart, getartdata } from '../app/actions/api/getart'
import Mobilesidebar from '@/components/Mobile-sidebar'
import Navbar from '@/components/Navbar'
import { updateorderbyadmin } from '@/app/actions/api/updateorderbyadmin'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type Props = {
  userid:string;
  strokedata: stroke[]
}




type stroke = {
  strokeno: string;
  contractNumbers: string[];
}
type Contract = {
  constractno: string;
  season: string;
  stroke_desc: string;
  prodesc: string;
  tdept: string;
  stroke_id: string;
  createdAt: Date;
  updatedAt: Date;
}
type order = {
  id: string;
  strokenum: string;
  contractnum: string;
  coo: string;
  fiber: string;
  component: string;
  caretext: string;
  washsimbol: string;
  sizeration: string;
  state: string;
  orderstatefromuser: string;
  qty: number  | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  ordervalue?: number | null;
}


type Art = {
 id:string
}
enum State {
  conform = 'conform',
  notconform = 'notconform',
  cancelled = 'cancelled',
}



const Artwork = (props: Props) => {

  const [strokes, setStrokes] = useState<stroke[]>([]);
  const [contracts, setContracts] = useState<string[]>([]);
  const [ artnoms ,setArtnoms] = useState<string[]>([]);
  const [strokeno, setStrokeno] = useState('');
  const [contactno, setContractno] = useState('');
  const [show, setShow] = useState(false);
  const [artno, setArtno] = useState('');
  const [artdata,setArtdata] = useState({
    strkeno: '',
    conno: '',
    coo: '',
    fiber: '',
    component: '',
    caretext: '',
    washsymbol: '',
    size: '',
    qty: 0,
    state: State.notconform
  });
  const strokref = useRef<HTMLInputElement>(null);
  const connoref = useRef<HTMLInputElement>(null);
  const cooref = useRef<HTMLInputElement>(null);
  const fiberref = useRef<HTMLInputElement>(null);
  const componentref = useRef<HTMLInputElement>(null);
  const caretestref = useRef<HTMLInputElement>(null);
  const washsymbolref = useRef<HTMLInputElement>(null);
  const sizeref = useRef<HTMLInputElement>(null);
  const qtyref = useRef<HTMLInputElement>(null);
  const sateref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const setDatehandler = async () => {
    setArtdata({
      strkeno: strokref.current?.value as string ?? '',
      conno: connoref.current?.value as string ?? '',
      coo: cooref.current?.value as string ?? '',
      fiber: fiberref.current?.value as string ?? '',
      component: componentref.current?.value as string ?? '',
      caretext: caretestref.current?.value as string ?? '',
      washsymbol: washsymbolref.current?.value as string ?? '',
      size: sizeref.current?.value as string ?? '',
      qty: Number(qtyref.current?.value) ?? 0, 
      state: sateref.current?.value as State ?? 'notconform',
    })
  }
   


 const setshow = () => {
  setShow(true);
 }

 //fetch the stroke data
 useEffect(() => {
   if(props.strokedata.length > 0){
     setStrokes(props.strokedata);
     setStrokeno(props.strokedata[0].strokeno);
     setContracts(props.strokedata[0].contractNumbers);
     setContractno(props.strokedata[0].contractNumbers[0]);
     
   }
  
}, []); // Added props.strokedata to the dependency array

useEffect(() => {
  if (strokes.length > 0 && contracts.length > 0) {
    fetchArt(); // Fetch artwork when strokes and contracts are available
  }
  
}, [contactno,strokeno]);

useEffect(() => {
  if (artno !== '') {
    // Perform the action that depends on artno when it's not an empty string
    fetchartdata(artno);
  }
}, [artno]);

const fetchartdata = async (id: string) => {
  const alldata:order[] = await getartdata(artno);
  setArtdata({
    strkeno: alldata[0].strokenum,
    conno: alldata[0].contractnum,
    coo: alldata[0].coo,
    fiber: alldata[0].fiber,
    component: alldata[0].component,
    caretext: alldata[0].caretext,
    washsymbol: alldata[0].washsimbol,
    size: alldata[0].sizeration,
    qty: alldata[0].qty ?? 0,
    state: alldata[0].state as State
  })
 
}

const fetchArt = async () => {
  //stroke and contract no are uniques to printer
  const fetchedarts = await getart(strokeno, contactno);
  setArtno(fetchedarts[0] || '');
  setArtnoms(fetchedarts || []);
};

const handleclick = (e:  React.ChangeEvent<HTMLSelectElement>) => {
  const selectedStroke = strokes.find((stroke) => stroke.strokeno === e.target.value);
  setContracts([]);
  setArtnoms([]);
  setStrokeno(e.target.value);
  if(selectedStroke){
    setContracts(selectedStroke?.contractNumbers);
  }
}

const handleUserUpdate = (fieldName: string, value: string | number | State ) => {
  setArtdata(prevUser => ({
    ...prevUser, // Spread the previous state
    [fieldName]: value, // Update the specific field with the new value
  }));
};

//update order

const submitdata = async() => {
  const resut = await updateorderbyadmin(artno,artdata.strkeno,artdata.conno,artdata.coo,artdata.fiber,artdata.component,artdata.caretext,artdata.washsymbol,artdata.size,artdata.state,artdata.qty)
  if(resut){
    toast({
      title: "order has been updated.",
      description: "Order data added to database!",
    })
  }else {
    toast({
      variant: "destructive",
      title: "Uh oh! update failed.",
      description: "try it again or contact us!",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })
  }
}
  
  return (
   <div  className=" bg-blue-200 h-full grid sm:grid-cols-1 sm:grid-rows-6 md:grid-cols-2 md:grid-rows-3  border-non w-full">
      <div className='w-full sm:row-span-3 md:row-span-2 '>
              <div className=' flex flex-col border-8 border-gray-200 rounded-sm  h-full w-full overflow-auto'>
                 <div className='w-full h-12 lg:h-24 flex flex-col mt-1  justify-center items-center'>
                    <div className='w-full h-6 p-0 text-sm flex flex-row sm:h-6'>
                      <div className='flex flex-row w-1/2'><label className='mx-2'>STROKE NO</label>
                      <select className=' mx-2 sm:w-full xl:w-8/12' onChange={e => handleclick(e)}>
                        {strokes.map( stroke => (
                          <option key={stroke.strokeno} value={stroke.strokeno}>{stroke.strokeno}</option>
                        ))}
                      </select>
                      </div>
                      <div className='flex flex-row w-1/2'><label>CONT.NO</label>
                      <select className=' ml-2 sm:w-full xl:w-8/12'onChange={(e) => {
                                  setContractno(e.target.value);
                                  fetchArt();
                      }} >
                        {contracts.map(contract =>(
                          <option key={contract} value={contract}>{contract}</option>
                        ))}
                      </select>
                      </div>
                    </div>
                    <div className='w-10/12 h-6 p-0 text-sm flex flex-row mt-2'>
                      <label className='mx-2'>ART NO</label>
                      <select className=' ml-2 sm:w-2/3' onChange={(e) => setArtno(e.target.value)}>
                      {artnoms.map(artnom =>(
                        <option key={artnom}>{artnom}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className='w-full h-full flex flex-col'>
                    <div className='bg-sky-700 col text-white sm:h-6 w-full'><p className='ml-2'>FLM DATA</p></div>
                    <div className='flex flex-row w-full'>
                    <div className='h-full w-[90%] felx flex-col gap-1'>

                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Stroke no:</label><input onChange={(e) => {
                        handleUserUpdate('strkeno',e.target.value)
                      }} value={artdata.strkeno} type='text' className='rounded-sm w-2/6' /></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Contract no:</label><input onChange={(e) => {
                        handleUserUpdate('conno',e.target.value)
                      }} value={artdata.conno} type='text' className='rounded-sm w-2/6' /></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Coo:</label><input onChange={(e) => {
                        handleUserUpdate('coo',e.target.value)
                      }} value={artdata.coo} type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Fiber:</label><input onChange={(e) => {
                        handleUserUpdate('fiber',e.target.value)
                      }} value={artdata.fiber}  type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Component:</label><input onChange={(e) => {
                        handleUserUpdate('component',e.target.value)
                      }} value={artdata.component} type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Caretext:</label><input onChange={(e) => {
                        handleUserUpdate('caretext',e.target.value)
                      }} value={artdata.caretext}  type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Wash simbol:</label><input onChange={(e) => {
                        handleUserUpdate('washsymbol',e.target.value)
                      }} value={artdata.washsymbol}  type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Size:</label><input onChange={(e) => {
                        handleUserUpdate('size',e.target.value)
                      }} value={artdata.size} type='text' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>Qty:</label><input onChange={(e) => {
                        handleUserUpdate('qty',parseInt(e.target.value))
                      }} value={artdata.qty} type='number' className='rounded-sm w-2/6'/></div>
                      <div className='flex sm:flex-col md:flex-row w-full justify-around mt-[1px]'><label className='text-left w-2/6'>State:</label><select value={artdata.state} className='rounded-sm w-2/6' onChange={(e) => {
                        handleUserUpdate('state',e.target.value as State)
                      }}><option value="pending">pending</option><option value="processing">processing</option>
                      <option value="completed">completed</option>
                      <option value="hold">hold</option></select></div>
                      
                    </div>
                    <div className='w-[10%] flex flex-col justify-center items-center h-full bg-sky-400 hover:bg-sky-500' onClick={submitdata}>
                    <p className="writing-vertical">S</p>
                    <p className="writing-vertical">u</p>
                    <p className="writing-vertical">b</p>
                    <p className="writing-vertical">m</p>
                    <p className="writing-vertical">i</p>
                    <p className="writing-vertical">t</p>
                    </div>
                    </div>
                  </div>
                  
             </div>
      </div>
      <div className='w-full sm:row-span-2  md:row-span-3  flex flex-col border-8 border-gray-200 rounded-sm  h-full overflow-auto'>
            <div className='w-full bg-sky-700 col text-white h-6 flex justify-between text-sm'>
                    <label className='mx-1'><input type="radio" className='mx-1'/>TWIN</label>
                    <label className='mx-1'><input type="radio" className='mx-1'/>BOOKLET</label>
                    <label className='mx-1'><input type="radio" className='mx-1'/>LOOPFOLD</label>
                  </div>
                  <div className='w-full h-full flex justify-center items-center   text-white'>
                    {!show && <p className='text-center text-6xl'>ARTWORK PREVIEW</p>}
                    {show && <Showimg url={artno} />}
                    </div>
                  <div className='w-full bg-sky-700 h-14 flex flex-row justify-center'>
                    <div className='text-xs text-center flex flex-col  m-1 items-start overflow-hidden '>
                      <div>COLOR</div>
                      <div><select className='md:w-24'></select></div>
                      <div><input type='checkbox'/><label>TEXT OUTLINE</label></div>
                    </div>
                    <div className='hover:bg-sky-500 text-xs text-center flex items-center p-1 text-white m-1 border border-white'>PREVIEW ARTWORK</div>
                    <div className='hover:bg-sky-500 text-xs text-center flex items-center p-1 text-white m-1 border border-white'>ALL SIZES</div>
                    <div className='hover:bg-sky-500 text-xs text-center flex items-center p-1 text-white m-1 border border-white'>UPLOAD</div>
                    <button className='hover:bg-sky-500 text-xs  flex items-center p-1 m-1 border justify-center border-white md:w-16 font-medium' onClick={setshow}>OPEN</button>
            </div>
      </div>
              <div className=' flex flex-col border-8 border-gray-200 rounded-sm h-full'>
                    <div className='w-full h-full flex flex-col'>
                      <div className='bg-sky-700 col text-white sm:h-6'><p className='ml-2'>PDF LAYOUTS GALLERY</p></div>
                      <div className='flex justify-center items-center h-full text-6xl'><p>M&S</p></div>
                    </div>
                    <div className='w-full h-6 bg-sky-700 col text-white flex justify-between text-sm'>
                      <label><input type="radio" className='m-1'/>UK</label>
                      <label><input type="radio" className='m-1'/>INTERNATIONAL</label>
                      <label><input type="radio" className='m-1'/>AIO</label>
                    </div>
                    <div className='w-full bg-sky-700 col text-white border-2  border-slate-100 text-center hover:bg-sky-500'><p>PROCESS ARTWORK</p></div>
               </div>
   </div>
  )
}

export default Artwork