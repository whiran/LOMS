'use client'

import { getcontract } from "@/app/actions/api/getcontract";
import { getcontractnumbers } from "@/app/actions/api/getcontractnumbers";
import { placeorder } from "@/app/actions/api/placeorder";
import { placeordersub } from "@/app/actions/api/subuser/placeorderssub";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {TailSpin } from  'react-loader-spinner'


type Props = {
  id: string;
  strokes: string[];
}

const Placeorderforsub = (props: Props) => {
  const [strokeno, setStrokeno] = useState('');
  const [contracts, setContracts] = useState<string[]>([]);
  const [conno, setConno] = useState('');
  const [coo,setCoo] = useState('');
  const [fiber,setFiber] = useState('');
  const [component,setComponent] = useState('');
  const [caretext,setCaretext] = useState('');
  const [washsimbol,setWashsimbol] = useState('');
  const [sizeration,setSizeration] = useState('');
  const [qty,setQty] = useState(0);
  const [state,setState] = useState('notconform');
  const { toast } = useToast()
  const [processing, setProcessing] = useState(false);
  
  //get the contract data
useEffect(() => {
  if (props.strokes.length > 0) {
    setStrokeno(props.strokes[0]);
  }

  const fetchContract = async () => {
    const fetchedContracts = await getcontractnumbers(strokeno);
    if(fetchedContracts.length > 0){
      setConno(fetchedContracts[0]);
    }
    setContracts(fetchedContracts);
  };
  if (strokeno) {
    fetchContract();
  }
},[props.strokes, strokeno]);

  
  const handleclick = async() => {
    setProcessing(true);
    const result = await placeordersub(strokeno,conno,coo,fiber,component,caretext,washsimbol,sizeration,props.id,qty,state);
   
    if(result == 'ok'){
      toast({
        title: " successfully aded the record..",
        description: "Order details added.",
      });
      // Clear the form fields after successful submission
      setCoo('');
      setFiber('');
      setComponent('');
      setCaretext('');
      setWashsimbol('');
      setSizeration('');
      setQty(0);

    }else{
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Something went wrong from the serverside!",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      setProcessing(false);
    }
    setProcessing(false);
  }
  return (
    <div className=" bg-[#F8DFD4] p-6 border-4 border-white rounded-lg">
      <h1 className="text-xl font-bold">Place Order</h1>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <p>Stroke number</p>
            <p>Contract number</p>
            <p>COO</p>
            <p>Fiber</p>
            <p>Component</p>
            <p>Caretext</p>
            <p>WashSymbol</p>
            <p>Size</p>
            <p>QTY</p>
            <p>State</p>
          </div>
          <div className="flex flex-col gap-2">
            <select onChange={e => setStrokeno(e.target.value)}>
              {props.strokes.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select onChange={e => setConno(e.target.value)}>
              {contracts.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input type="text" required value={coo} onChange={(e) => setCoo(e.target.value)}/>
            <input type="text" required value={fiber} onChange={(e) => setFiber(e.target.value)}/>
            <input type="text" required value={component} onChange={(e) => setComponent(e.target.value)} />
            <input type="text" required value={caretext} onChange={(e) => setCaretext(e.target.value)} />
            <input type="text" required value={washsimbol} onChange={(e) => setWashsimbol(e.target.value)} />
            <input type="text" required value={sizeration} onChange={(e) => setSizeration(e.target.value)} />
            <input type="number" required value={qty} onChange={(e) => setQty(parseInt(e.target.value))} />
            <select onChange={e => setState(e.target.value)}>
              <option value="notconform">notconform</option>
              <option value="conform">conform</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
      </div>
      <div className="flex flex-row justify-between mt-2 ">
      <button className="rounded-sm bg-[#C69774] hover:bg-[#5FBDFF] w-2/5" onClick={handleclick}>Submit</button>
      <button className="rounded-sm bg-[#C69774] hover:bg-[#5FBDFF] w-2/5">Preview Artwork</button>
      </div>
      <div className="w-full mx-auto flex justify-center items-center mt-2">
      <TailSpin
  height="30"
  width="30"
  color="#05ed00"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={processing}
/>
      </div>
    </div>
  )
}

export default Placeorderforsub