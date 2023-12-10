'use server'
import prisma from "@/lib/prisma";
import { count } from "console";

//count orders based on user id

export async function totalcountbasedid(id: string) {
  try{
    const counts = await prisma.order.count({
      where: {
        userid:id
      }
    });
    return counts;
    
  }catch(error){
    console.log('error getting the total count of orders based on user');
    return 0;
  }
}

export async function getorderprocessingbasedid(id: string){
  try{
    const counts = await prisma.order.count({
      where:{
        state: "processing",
        userid:id
      }
    });
    return counts;
  }catch(errr){
    console.log(errr);
    return 0;
  }
}

export async function getorderpendingbasedid(id: string) {
  try{
    const resut = await prisma.order.count({
      where:{
        state: "pending",
        userid:id
      }
    })
    return resut;
  }catch(error){
    console.log('error on get penging orderes  based on user');
    return 0;
  }
}

export async function getordercompletebasedid(id: string) {
  try{
    const resut = await prisma.order.count({
      where:{
        state: "completed",
        userid:id
      }
    })
    return resut;
  }catch(error){
    console.log('error on get processing orderes count  based on user');
    return 0;
  }
}