'use server';
import prisma from "@/lib/prisma";

//create care tabel records

export const createcare = async (refno: string, washsymbol: string, fibre: string, zoordes: string, mpart: string, coo: string, caretext: string, state1: string) => {
 
   if(refno && washsymbol && fibre && zoordes && mpart && coo && caretext && state1){
    await prisma.carelabel.create({
      data: {
        ref_no: refno,
        wash_symbol: washsymbol,
        fibre,
        zoordes,
        mpart_fw: mpart,
        coo,
        caretext,
        contract_id: state1
      }
    });
    return "Successfully created new strokeno";
  }else{
    return "Something wrong!";
  }
}