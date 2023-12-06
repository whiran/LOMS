import Pdfviewon from '@/components/Pdfviewon'
import React from 'react'

type Props = {}

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Pdfviewon />
    </div>
  )
}

export default page