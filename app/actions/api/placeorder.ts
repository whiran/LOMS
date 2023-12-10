'use server'
import prisma from "@/lib/prisma";
import { dash } from "pdfkit";
import { useId } from "react";
import { useSession } from "next-auth/react"

//place order 

export const placeorder = async function placeorder(coo: string, fiber: string, component: string, caretext: string, washsimbol: string, sizeration: string, userid: string) {

  if(coo && fiber && component && caretext && washsimbol && sizeration && userid) {
    await prisma.order.create({
      data: {
        coo,
        fiber,
        component,
        caretext,
        washsimbol,
        sizeration,
        userid
      }
    }
    )
    return('ok');
  }else{
    return('something wrong!')
  }
}