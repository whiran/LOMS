'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

type Props = {
  id: string;
  result: {
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
    } | null

}

const Viewthefile = dynamic(() => import("./Pdfv"),{
  ssr: false,
});

const Pdfviewon = (props: Props) => {

  const [client , setClient] = useState(false);

  useEffect(() =>{
    setClient(true);
  },[])
  return (
    <Viewthefile id={props.id} result={props.result}/>
  )
}

export default Pdfviewon