'use server'

import prisma from "@/lib/prisma"

//this is for subusers to get their con and stoke

export const getstrokeandconsbyadmin = async(id:string) => {

  try{
    const cus = await prisma.user.findUnique({
      where: {
        id:id,
      },
      select: {
        createdby: true,
      }
    });

    const admin = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        createdby: true,
      }
    });

    const strokes = await prisma.stroke.findMany({
      where: {
        userid: id,
      },
      select: {
        strokeno: true,
        contracts: {
          select: {
            constractno: true,
          },
        },
      },
    });

    const strokeAndContracts: { strokeno: string; contractNumbers: string[] }[] = [];

    strokes.forEach((stroke) => {
      const contracts = stroke.contracts.map((contract) => contract.constractno);
      strokeAndContracts.push({
        strokeno: stroke.strokeno,
        contractNumbers: contracts,
      });
    });
   
    return strokeAndContracts
  }catch(error){
    return [];
  }
}