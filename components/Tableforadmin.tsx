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
  id: String,
  createdAt: Date,
  upc_no: String,
}
type Props = {
  result: Contract[];
}



const Tableforadmin = (props: Props) => {
  return (
    <div className='w-4/6 mt-3'>
  <Table>
  <TableCaption>A list of your Contract details.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Contract number</TableHead>
      <TableHead>Stroke number</TableHead>
      <TableHead>Created at</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
    {props.result.map( re => (

        <TableRow key={re.constractno}>
        <TableCell className="font-medium">{re.constractno}</TableCell>
        <TableCell>{re.stroke_id}</TableCell>
        <TableCell>{re.createdAt.getDate() +1}-{re.createdAt.getMonth() +1}-{re.createdAt.getFullYear()}</TableCell>
        </TableRow>
    ))
       

    }
   
  </TableBody>
</Table>

    </div>
  )
}

export default Tableforadmin