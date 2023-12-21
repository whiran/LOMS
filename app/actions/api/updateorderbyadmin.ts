'use server'

import prisma from "@/lib/prisma"
import {state} from '@prisma/client'

export const updateorderbyadmin = async (id: string,stroke: string,conno: string, coo: string, fiber: string, component: string, caretext: string, washsymbol: string, size: string, orderState: state, qty: number) => {
  try{


  
  const result = await prisma.order.update({
   
    where: {
      id: id,
    },
    data: {
      strokenum: stroke,
      contractnum: conno,
      coo,
      fiber,
      component,
      caretext,
      washsimbol: washsymbol,
      sizeration: size,
      state: orderState, 
      qty,
    }
  });

  return result;
}catch(error){
  console.log('error to update order in admin side')
  return []
}
}