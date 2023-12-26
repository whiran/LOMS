'use server'

import prisma from "@/lib/prisma"

//this is for subusers to get their con and stoke

export const getstrokeandconsbyadmin = async(id:string) => {

  try{
    //cus id from sub side
    const cus = await prisma.user.findUnique({
      where: {
        id:id,
      },
      select: {
        createdby: true,
      }
    });
    
    const cusid = cus?.createdby as string;
    
    //admin id from cus side
    const admin = await prisma.user.findUnique({
      where: {
        id: cusid,
      },
      select: {
        createdby: true,
      }
    });

    //admins storkes
    const adminid = admin?.createdby as string;

    const strokes = await prisma.stroke.findMany({
      where: {
        userid: adminid,
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