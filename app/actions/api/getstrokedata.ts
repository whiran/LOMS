'use server';

import prisma from "@/lib/prisma";

//get all storke data

export const getstrokedata =async (id:string) => {
  const stroke = await prisma.stroke.findMany({
    where: {
      userid: id,
    },
     select: {
      strokeno: true,
     }
  })
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

   

  return strokeAndContracts;
}

