'use server';

import prisma from "@/lib/prisma";

//add the order qty

export const orderqty =async (orderId: string, quantity: number) => {
 
  const existingOrder = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  console.log(existingOrder);

  if(existingOrder){
    
    const updateorder = await prisma.order.update({
      where:{
        id: orderId,
      },
      data : {
        qty: quantity
      },
    })
    return updateorder;
  }
  else{
    console.log('someting wrong on update order')
  }
}