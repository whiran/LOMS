'use server'

import prisma from "@/lib/prisma"
import {Orderfromuser} from '@prisma/client'

export const updateorderbycusandsub =async (id: string,stroke: string,conno: string, coo: string, fiber: string, component: string, caretext: string, washsymbol: string, size: string, orderstate: Orderfromuser, qty: number) => {
  
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
        orderstatefromuser: orderstate, 
        qty,
      }
    });
  
    return result;
  }catch(error){

  }
}