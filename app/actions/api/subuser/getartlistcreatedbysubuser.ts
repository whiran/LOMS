'use server'

import prisma from "@/lib/prisma"

//this is to get the order id list as art list for sub users. they can get thir all orders by using their id

export const getartlistcreatedbysubuser = async (id: string) =>{

  try{

    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });

    const subids:string[] = result.map(resu => resu.id);
    return subids;
  }catch(error){
    console.log('got an error when getting the list of orders id created by sub users');
    return []
  }
}