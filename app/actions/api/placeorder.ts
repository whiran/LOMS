'use server'
import prisma from "@/lib/prisma";
import { dash } from "pdfkit";

//place order 

export const placeorder = async function placeorder(coo: string, fiber: string, component: string, caretext: string, washsimbol: string, sizeration: string) {

  if(coo && fiber && component && caretext && washsimbol && sizeration) {
    await prisma.order.create({
      data: {
        coo,
        fiber,
        component,
        caretext,
        washsimbol,
        sizeration
      }
    }
    )
    return('ok');
  }else{
    return('something wrong!')
  }
}