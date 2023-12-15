'use server';

import prisma from "@/lib/prisma";

//get the artwork numbers


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

