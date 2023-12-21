'use server'

import prisma from "@/lib/prisma"

//this is for customers by using this customers can get their sub users data and thir order data 

export const getartlistcreatedbycustomer = async (id:string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });
    
    const subusers = await prisma.user.findMany({
      where: {
        createdby: id,
      },
      select: {
        order: {
          select: {
            id: true,
          }
        }
      }
    });

    const cusids:string[] = result.map(resu => resu.id);
    let subids:string[] = [];

    subusers.forEach(sub => {
      sub.order.forEach(o => {
        subids.push(o.id)
      })
    });

    const lastarry = cusids.concat(subids);
    return lastarry
  }catch(error){
    console.log('got error while searching the customer and sub customer order ids');
    return []
  }
}