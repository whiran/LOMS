'use server'
import prisma from "@/lib/prisma";
import { count } from "console";

//count orders

export async function totalcount() {
  try{
    const counts = await prisma.order.count();
    return counts;
    
  }catch(error){
    console.log('error getting the total count of orders');
    return 0;
  }
}

export async function getorderprocessing(){
  try{
    const counts = await prisma.order.count({
      where:{
        state: "processing"
      }
    });
    return counts;
  }catch(errr){
    console.log(errr);
    return 0;
  }
}

export async function getorderpending() {
  try{
    const resut = await prisma.order.count({
      where:{
        state: "pending"
      }
    })
    return resut;
  }catch(error){
    console.log('error on get penging orderes');
    return 0;
  }
}

export async function getordercomplete() {
  try{
    const resut = await prisma.order.count({
      where:{
        state: "completed"
      }
    })
    return resut;
  }catch(error){
    console.log('error on get processing orderes count');
    return 0;
  }
}