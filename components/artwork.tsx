'use client'
import React, { useState, useEffect, Suspense } from 'react'

import { createstroke } from '../app/actions/api/createstroke'
import { getstrokedata } from '../app/actions/api/getstrokedata'
import { getcontract } from '../app/actions/api/getcontract'
import Showimg from '@/components/Showimg'
import { getart } from '../app/actions/api/getart'
import Mobilesidebar from '@/components/Mobile-sidebar'
import Navbar from '@/components/Navbar'

type Props = {
  userid:string;
  strokedata:stroke[]
}

type stroke = {
  strokeno: string;
  createdAt: Date;
  updatedAt: Date;
  userid: string | null;
}

type Stroke = {
  strokeno: string;
  createdAt: Date;
  updatedAt: Date;
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


type Art = {
 id:string
}



const Artwork = (props: Props) => {

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [ artnoms ,setArtnoms] = useState<string[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [strokeno, setStrokeno] = useState('');
  const [contactno, setContractno] = useState('');
  const [show, setShow] = useState(false);
  const [artno, setArtno] = useState('');
   


 const setshow = () => {
  setShow(true);
 }

 //fetch the stroke data

 useEffect(() => {
  const fetchStroke = async () => {
    const fetchedStrokes = props.strokedata;
    const sortedStroke = [...fetchedStrokes].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    if (sortedStroke.length > 0) {
      setStrokeno(sortedStroke[0].strokeno);
    }
    setStrokes(sortedStroke);
  };
  fetchStroke();

},[]);
//get the contract data
useEffect(() => {
  const fetchContract = async () => {
    const fetchedContracts = await getcontract(strokeno);
    const sortedContracts = [...fetchedContracts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    if(sortedContracts.length > 0){
      setContractno(sortedContracts[0].constractno);
    }
    setContracts(sortedContracts);
  };

  if (strokeno) {
    fetchContract();
  }
},[strokeno]);

useEffect(() => {
  const fetchArt =async () => {
    const fetchedarts = await getart(strokeno,contactno);
    setArtnoms(fetchedarts);
    if (fetchedarts && fetchedarts.length > 0){
      setArtno(fetchedarts[0])
    }
    
  };
  if(contactno){
    fetchArt();
  }
},[contactno, strokeno]);
  
  return (
   <div  className=" bg-blue-200 h-full grid grid-cols-2 grid-rows-3 border-non w-full">
      <div className='w-full row-span-2'>
              <div className=' flex flex-col border-8 border-gray-200 rounded-sm  h-full w-full '>
                 <div className='w-full h-12 lg:h-24 flex flex-col mt-1  justify-center items-center'>
                    <div className='w-full h-6 p-0 text-sm flex flex-row sm:h-6'>
                      <div className='flex flex-row w-1/2'><label className='mx-2'>STROKE NO</label>
                      <select className=' mx-2 sm:w-full xl:w-8/12' onChange={(e) => setStrokeno(e.target.value)}>
                        {strokes.map( stroke => (
                          <option key={stroke.strokeno} value={stroke.strokeno}>{stroke.strokeno}</option>
                        ))}
                      </select>
                      </div>
                      <div className='flex flex-row w-1/2'><label>CONT.NO</label>
                      <select className=' ml-2 sm:w-full xl:w-8/12' onChange={(e) => setContractno(e.target.value
                        )} >
                        {contracts.map(contract =>(
                          <option key={contract.constractno} value={contract.constractno}>{contract.constractno}</option>
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
                    <div className='bg-sky-700 col text-white sm:h-6'><p className='ml-2'>FLM DATA</p></div>
                    
                  </div>
                  
             </div>
      </div>
      <div className='w-full row-span-3  flex flex-col border-8 border-gray-200 rounded-sm  h-full overflow-auto'>
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