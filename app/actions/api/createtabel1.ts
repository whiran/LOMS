'use server';
import prisma from "@/lib/prisma";

export const createtable1 = async (constractno: string, season: string, tdept: string, prodesc: string, strokedesc: string, stroke: string) => {
  const contractok = await prisma.contract.findUnique({
    where: {
      constractno,
    },
  });

  if(!contractok){
    await prisma.contract.create({
      data: {
        constractno: constractno,
        season: season,
        tdept: tdept,
        prodesc: prodesc,
        stroke_desc: strokedesc,
        stroke_id: stroke
      }
    });
    return "Successfully created new strokeno";
  }else{
    return "Something wrong!";
  }
}