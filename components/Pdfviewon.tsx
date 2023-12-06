'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

type Props = {}

const Viewthefile = dynamic(() => import("./Pdfv"),{
  ssr: false,
});

const Pdfviewon = (props: Props) => {

  const [client , setClient] = useState(false);

  useEffect(() =>{
    setClient(true);
  },[])
  return (
    <Viewthefile />
  )
}

export default Pdfviewon