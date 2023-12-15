'use server'
import prisma from "@/lib/prisma";


//place order 

export const placeorder = async function placeorder(strokenum: string, contractnum:string,coo: string, fiber: string, component: string, caretext: string, washsimbol: string, sizeration: string, userid: string, qty?: number, states?: string) {

  

  if(strokenum && contractnum && coo && fiber && component && caretext && washsimbol && sizeration && userid && states) {
    await prisma.order.create({
      data: {
        strokenum,
        contractnum,
        coo,
        fiber,
        component,
        caretext,
        washsimbol,
        sizeration,
        userid,
        qty,
        orderstatefromuser: states,
      }
    }
    )
    return('ok');
  }else{
    return('something wrong!')
  }
}