'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



type Contract = {
  constractno: string;
  stroke_id: string;
  createdAt: Date;
}

type Care = {
  createdAt: Date;
  id: string;
  fibre: string;
}

type Other = {
  id: string,
  createdAt: Date,
  fef_no: string,
}

type Quntity = {
  id: string,
  createdAt: Date,
  upc_no: string,
}
type Props = {
  result: Quntity[];
}



const Tableforadminquantity = (props: Props) => {
  return (
    <div className='w-4/6 mt-3'>
  <Table>
  <TableCaption>A list of your Other details.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Id number</TableHead>
      <TableHead>Upc No</TableHead>
      <TableHead>Created at</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
    {props.result.map( re => (

        <TableRow key={re.id}>
        <TableCell className="font-medium">{re.id}</TableCell>
        <TableCell>{re.upc_no}</TableCell>
        <TableCell>{re.createdAt.getDate() +1}-{re.createdAt.getMonth() +1}-{re.createdAt.getFullYear()}</TableCell>
        </TableRow>
    ))
       

    }
   
  </TableBody>
</Table>

    </div>
  )
}

export default Tableforadminquantity