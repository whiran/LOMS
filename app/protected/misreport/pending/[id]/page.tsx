import { getorderdata } from '@/app/actions/api/getorders';
import Pdfviewon from '@/components/Pdfviewon';
import React from 'react'

type Props = {}

const page = async ({ params }: { params: { id: string } }) => {

  const result = await getorderdata(params.id);
  console.log('in id page p')
  
  return (
    <div>
      <Pdfviewon id={params.id} result={result}/>
    </div>
  )
}

export default page