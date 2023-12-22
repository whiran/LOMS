'use server'
import prisma from "@/lib/prisma"

//get the all orders by customer and their sub users.
export const getallorderdatasub = async (id: string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    
    

type order = {
  id: string;
  amount: number | null;
  status: "pending" | "processing" | "completed" | "hold";
  stroke: string;
}
    
// Merge orders from the `result` query and `subusers` query into a single array
const combinedOrders:order[] = [];

// Merge orders from the `result` query
result.forEach(order => {
  combinedOrders.push({
    id: order.id,
    amount: order.qty, // Assuming qty represents the amount
    status: order.state, // Assuming state represents the status
    stroke: order.strokenum,
  });
});


 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer order ids');
    return []
  }
}

//get the completed orderlist cus and sub

export const getallcompletedorderdatasub = async (id: string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'completed'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    
   
type order = {
  id: string;
  amount: number | null;
  status: "pending" | "processing" | "completed" | "hold";
  stroke: string;
}
    
// Merge orders from the `result` query and `subusers` query into a single array
const combinedOrders:order[] = [];

// Merge orders from the `result` query
result.forEach(order => {
  if(order.state == 'completed'){
  combinedOrders.push({
    id: order.id,
    amount: order.qty, // Assuming qty represents the amount
    status: order.state, // Assuming state represents the status
    stroke: order.strokenum,
  });
}
});


 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer  completed order ids');
    return []
  }
}

//pending count
export const getallpendingorderdatasub = async (id: string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'pending'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    
    

type order = {
  id: string;
  amount: number | null;
  status: "pending" | "processing" | "completed" | "hold";
  stroke: string;
}
    
// Merge orders from the `result` query and `subusers` query into a single array
const combinedOrders:order[] = [];

// Merge orders from the `result` query
result.forEach(order => {
  if(order.state == 'pending'){
  combinedOrders.push({
    id: order.id,
    amount: order.qty, // Assuming qty represents the amount
    status: order.state, // Assuming state represents the status
    stroke: order.strokenum,
  });
}
});


 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer  completed order ids');
    return []
  }
}
//processing count
export const getallprocessingorderdatasub = async (id: string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'processing'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    
    
type order = {
  id: string;
  amount: number | null;
  status: "pending" | "processing" | "completed" | "hold";
  stroke: string;
}
    
// Merge orders from the `result` query and `subusers` query into a single array
const combinedOrders:order[] = [];

// Merge orders from the `result` query
result.forEach(order => {
  if(order.state == 'processing'){
  combinedOrders.push({
    id: order.id,
    amount: order.qty, // Assuming qty represents the amount
    status: order.state, // Assuming state represents the status
    stroke: order.strokenum,
  });
}
});


 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer  completed order ids');
    return []
  }
}
//hold count
export const getallholdorderdatasub = async (id: string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'hold'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    
    

type order = {
  id: string;
  amount: number | null;
  status: "pending" | "processing" | "completed" | "hold";
  stroke: string;
}
    
// Merge orders from the `result` query and `subusers` query into a single array
const combinedOrders:order[] = [];

// Merge orders from the `result` query
result.forEach(order => {
  if(order.state == 'hold'){
  combinedOrders.push({
    id: order.id,
    amount: order.qty, // Assuming qty represents the amount
    status: order.state, // Assuming state represents the status
    stroke: order.strokenum,
  });
}
});


 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer  completed order ids');
    return []
  }
}