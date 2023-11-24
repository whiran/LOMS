'use server'

import prisma from "@/lib/prisma";

//create the main label

export const createlabel = async(date: string, time: string, recordcount: string, runnumber:string) =>{

  let createdLabel;

  if(date && time && recordcount && runnumber){
    createdLabel = await prisma.label.create({
      data: {
        date: date,
        time,
        recordcount,
        runnumber
      }
    });

  }

  return createdLabel?.id || null;
}