'use client'

import { placeorder } from "@/app/actions/api/placeorder";
import { useState } from "react";


type Props = {
  id: string;
}

const Placeorder = (props: Props) => {
  const [coo,setCoo] = useState('');
  const [fiber,setFiber] = useState('');
  const [component,setComponent] = useState('');
  const [caretext,setCaretext] = useState('');
  const [washsimbol,setWashsimbol] = useState('');
  const [sizeration,setSizeration] = useState('');
  
  

  
  const handleclick = async() => {
    const result = await placeorder(coo,fiber,component,caretext,washsimbol,sizeration,props.id);
    console.log(props.id)
    if(result == 'ok'){
      alert('successfully aded the record');
      // Clear the form fields after successful submission
      setCoo('');
      setFiber('');
      setComponent('');
      setCaretext('');
      setWashsimbol('');
      setSizeration('');
    }else{
      alert('somthing wrong please try again!!!')
    }
  }
  return (
    <div className=" bg-[#F8DFD4] p-6 border-4 border-white rounded-lg">
      <h1 className="text-xl font-bold">Place Order</h1>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <p>COO</p>
            <p>Fiber</p>
            <p>Component</p>
            <p>Caretext</p>
            <p>WashSymbol</p>
            <p>Size</p>
          </div>
          <div className="flex flex-col gap-2">
            <input type="text" required value={coo} onChange={(e) => setCoo(e.target.value)}/>
            <input type="text" required value={fiber} onChange={(e) => setFiber(e.target.value)}/>
            <input type="text" required value={component} onChange={(e) => setComponent(e.target.value)} />
            <input type="text" required value={caretext} onChange={(e) => setCaretext(e.target.value)} />
            <input type="text" required value={washsimbol} onChange={(e) => setWashsimbol(e.target.value)} />
            <input type="text" required value={sizeration} onChange={(e) => setSizeration(e.target.value)} />
          </div>
      </div>
      <div className="flex flex-row justify-between mt-2 ">
      <button className="rounded-sm bg-[#C69774] hover:bg-[#5FBDFF] w-2/5" onClick={handleclick}>Submit</button>
      <button className="rounded-sm bg-[#C69774] hover:bg-[#5FBDFF] w-2/5">Preview Artwork</button>
      </div>
    </div>
  )
}

export default Placeorder