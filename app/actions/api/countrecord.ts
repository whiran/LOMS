'use server'
import prisma from "@/lib/prisma";

//count the total records

export async function getcontractcount() {
  try {
    const totalRecords = await prisma.contract.count();
    return(totalRecords);
  }catch(error){
    console.log(`error:`,error);
    return 0;
  }
}

export async function getcarecount() {
  try{
    const totalRecords = await prisma.carelabel.count();
    return totalRecords;
  }catch(error){
    console.log(`care count error:`,error);
    return 0;
  }
}

export async function getothercount() {
  try{
    const totalRecords = await prisma.otherlabel.count();
    return totalRecords;
  }catch(error){
    console.log(`other count error`,error);
    return 0;
  }
}

export async function getquntitycount() {
  try{
    const totalRecords = await prisma.contity.count();
    return totalRecords;
  }catch(error){
    console.log(`quntity count error:`, error);
    return 0;
  }
}

