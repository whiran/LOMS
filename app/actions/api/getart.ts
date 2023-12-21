'use server';

import prisma from "@/lib/prisma";

//get the artwork numbers
// stroke number is unique to the printer there for he can get all the orders 


export const getart = async( stroke: string,contractno: string) => {
  const arts = await prisma.order.findMany({
    where:{
      strokenum: stroke,
      contractnum: contractno,
    }
  });
  
  const artNumbers = arts.map(art => art.id); 
  return artNumbers;
}

export const getartdata = async( artno: string) => {
  const arts = await prisma.order.findMany({
    where:{
      id: artno,
    }
  });
  
  if(arts){
   return arts;
  }else{
    return []
    console.log('error when getting the orderdata');
  }
}

