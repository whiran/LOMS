// Pdfview.tsx
'use client'
import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

// Correct the import path here
const Pdfreport = dynamic(() => import('@/components/Pdfpage'),{
  ssr: false,
});

type Props = {}

const Pdfview = (props: Props) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  },[])
  
  return (
    <Pdfreport />
  )
}

export default Pdfview
