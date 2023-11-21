'use server';
import prisma from "@/lib/prisma";

export const createother = async (refno: string, labeltype: string, state2: string) => {
 
   if(refno && labeltype && state2){
    await prisma.otherlabel.create({
      data: {
        fef_no: refno,
        label_type: labeltype,
        carelabel_id: state2,
      }
    });
    return "Successfully created new strokeno";
  }else{
    return "Something wrong!";
  }
}