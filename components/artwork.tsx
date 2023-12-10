'use client'
import React, { useState, useEffect, Suspense } from 'react'

import { createstroke } from '../app/actions/api/createstroke'
import { getstrokedata } from '../app/actions/api/getstrokedata'
import { getcontract } from '../app/actions/api/getcontract'
import Showimg from '@/components/Showimg'
import { getart } from '../app/actions/api/getart'
import Mobilesidebar from '@/components/Mobile-sidebar'
import Navbar from '@/components/Navbar'

type Props = {}
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
 id: string;
 contract_id: string;
 createdAt: Date;
 updatedAt: Date;
}



const Artwork = (props: Props) => {

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [ artnoms ,setArtnoms] = useState<Art[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [strokeno, setStrokeno] = useState('');
  const [contactno, setContractno] = useState('');
  const [show, setShow] = useState(false);
  const [artno, setArtno] = useState('');
  console.log('stroke is running on artwork')

  const handleInputChange = async () => {
    try{
   if (strokeno) {
     const result = await createstroke(strokeno);
   }
  }catch (error) {
     console.error('Error:', error);
   }
        
 };

 const setshow = () => {
  setShow(true);
 }

 //fetch the stroke data

 useEffect(() => {
  const fetchStroke = async () => {
    const fetchedStrokes = await getstrokedata();
    const sortedStroke = [...fetchedStrokes].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    if (sortedStroke.length > 0) {
      setStrokeno(sortedStroke[0].strokeno);
    }
    setStrokes(sortedStroke);
    console.log('useEffect is running!')
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
    const fetchedarts = await getart(contactno);
    setArtnoms(fetchedarts);
    if (fetchedarts && fetchedarts.length > 0){
      setArtno(fetchedarts[0].id)
    }
    
  };
  if(contactno){
    fetchArt();
  }
},[contactno]);
  
  return (
    <main className=" bg-blue-200 h-full flex flex-col border-none"> 
          <div className='grid grid-cols-2 grid-rows-3 border-none h-[100%]'>
              <div className='row-span-2 '>
                <div className=' flex flex-col border-8 border-gray-200 rounded-sm  h-full'>
                  <div className='w-full h-12 flex flex-col mt-1 '>
                    <Suspense fallback={<div>Loading...</div>}>
                    <div className='w-full h-6 p-0 text-sm flex flex-row sm:h-6'>
                      <div><label className='mx-2'>STROKE NO</label>
                      <select className='md:w-24 mx-2 sm:w-12' onChange={(e) => setStrokeno(e.target.value)}>
                        {strokes.map( stroke => (
                          <option key={stroke.strokeno} value={stroke.strokeno}>{stroke.strokeno}</option>
                        ))}
                      </select>
                      </div>
                      <div><label>CONT.NO</label>
                      <select className='md:w-24 ml-2 sm:w-12' onChange={(e) => setContractno(e.target.value
                        )} >
                        {contracts.map(contract =>(
                          <option key={contract.constractno} value={contract.constractno}>{contract.constractno}</option>
                        ))}
                      </select>
                      </div>
                    </div>
                    <div className='w-full h-6 p-0 text-sm'>
                      <label className='mx-2'>ART NO</label>
                      <select className='md:w-80  ml-2 sm:w-48' onChange={(e) => setArtno(e.target.value)}>
                      {artnoms.map(artnom =>(
                        <option key={artnom.id}>{artnom.id}</option>
                      ))}
                      </select>
                    </div>
                    </Suspense>
                  </div>
                  <div className='w-full h-full flex flex-col'>
                    <div className='bg-sky-700 col text-white sm:h-6'><p className='ml-2'>FLM DATA</p></div>
                    <div className=' h-full grid grid-cols-2 grid-rows-3 text-xs'>
                      <div className=' flex flex-col md:w-40 md:ml-10'>
                        <div className='flex justify-between items-center'><label>Dept.Na</label>
                        <select className='w-20 h-4 m-1 fontsms'>
                          <option>T11</option>
                          <option>T14</option>
                          <option>T15</option>
                          <option>T17</option>
                          <option>T25</option>
                          <option>T28</option>
                          <option>T38</option>
                          <option>T69</option>
                          <option>T76</option>
                        </select>
                        </div>
                        <div className='flex justify-between items-center'><label>Sup.Code</label><input className='w-20 h-4 m-1' type='text'/></div>
                        <div className='flex justify-between items-center'><label>COO</label>
                        <select className='w-20 h-4 m-1 fontsms'>
                          <option>BD</option>
                        </select>
                        </div>
                        <div  className='flex justify-between items-center'><label>Stroke No</label><input className='w-20 h-4 m-1' type='text'/></div>
                      </div>
                      <div className='flex flex-row justify-center'>
                        <div className='md:w-44'>
                          <div className='flex justify-between items-center'>
                            <label >P.D</label><input className='sm:w-20 w-24 m-1 h-4 '/>
                          </div>
                          <div className='flex justify-between items-center'>
                            <label>POS</label>
                            <select className='sm:w-20 w-24 m-1 h-4 fontsms'>
                              <option>TOP</option>
                            </select>
                          </div>
                          <div className='flex justify-between items-center'>
                            <label>Fact</label><select className='sm:w-20 w-24 m-1 h-4'></select>
                          </div>
                          <div className='flex flex-row justify-between h-4 items-center'>
                            <div><label>P.D</label><input className='w-8  h-4 m-1'/></div>
                            <div><label>R.Color</label>
                            <select className='w-8 md:w-12   m-1 fontsms h-4'>
                              <option>WHITE</option>
                            </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=' col-span-2 flex flex-col justify-center'>
                        <div className='md:w-5/6 md:m-auto'>
                            <div className='h-4 items-center mb-1 flex justify-between'><label>CLCode</label><input className='h-4 w-32 md:w-72' /></div>
                            <div className='h-4 items-center mb-1 flex justify-between'><label>CCCode</label><input className='h-4 w-32 md:w-72' /></div>
                            <div className='h-4 items-center mb-1 flex justify-between'><label>Fiber</label><input  className='h-4 w-32 md:w-72'/></div>
                            <div className='h-4 items-center mb-1 flex justify-between'><label>ZCODE</label><input  className='h-4 w-32 md:w-72'/></div>
                            <div className='h-4 items-center mb-1 flex justify-between'><label>SPCode</label><input className='h-4 w-32 md:w-72' /></div>
                        </div>
                      </div>
                      <div className='flex flex-col  md:ml-10'>
                        <div className='flex justify-between h-4 items-center my-1'><label>Contract No</label><input className='w-20' /></div>
                        <div className='flex justify-between h-4 items-center my-1'><label>Sub Ref</label><input className='w-20'/></div>
                        <div className='flex justify-between h-4 items-center my-1'><label>PLM NO</label><input className='w-20'/></div>
                      </div>
                      <div className='flex flex-col md:mr-11'>
                        <div className='h-4 items-center mb-px flex justify-between ml-0.5 md:my-0.5'><label>LABEL REF</label>
                        <select className='w-20 h-4 fontsms'>
                          <option>TRL02</option>
                          <option>K8F/M12302</option>
                          <option>TCA40</option>
                          <option>F2 55</option>
                          <option>V1 45</option>
                          <option>BD</option>
                          <option>A112</option>
                        </select>
                        </div>
                        <div className='h-4 items-center mb-px flex justify-between ml-0.5 md:my-0.5'><label>LABEL TYPE</label><select className='w-20 h-4 fontsms'>
                          <option>T</option>
                          <option>K</option>
                          <option>C</option>
                          </select></div>
                        <div className='h-4 items-center mb-px flex justify-between ml-0.5 md:my-0.5'><label>LABEL WIDTH</label>
                        <select className='w-20 h-4 fontsms'>
                          <option>20</option>
                        </select>
                        </div>
                        <div className='h-4 items-center mb-px flex justify-between ml-0.5 '><label>SCISSOR MARK</label><input className='w-20 h-4' /></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='row-span-3 flex flex-col border-8 border-gray-200 rounded-sm  h-full overflow-auto'>
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
                
              <div>
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
          </div>
        
        </main>
  )
}

export default Artwork