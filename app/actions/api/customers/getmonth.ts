'use server'


import prisma from "@/lib/prisma"

//get all records made by customer and subusers of the customer based on month

export const getmonthtotdatacus = async (id:string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });
    
    const subusers = await prisma.user.findMany({
      where: {
        createdby: id,
      },
      select: {
        order: {
          select: {
            id: true,
          }
        }
      }
    });

    const cusids:string[] = result.map(resu => resu.id);
    let subids:string[] = [];

    subusers.forEach(sub => {
      sub.order.forEach(o => {
        subids.push(o.id)
      })
    });

    const lastarry = cusids.concat(subids);

    const records = await prisma.order.findMany({
      where: {
        id: {
          in: lastarry,
        }
      }
    })
    //structure

    const monthsData: { [key: number]: number } = {};

    records.forEach((reco) => {
      const createdAt = new Date(reco.createdAt);
      const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
    })

     // Generate an array with all months of the year and their counts
     const allMonths: { month: number; count: number }[] = [];
     for (let i = 1; i <= 12; i++) {
       const count = monthsData[i] || 0;
       allMonths.push({ month: i, count });
     }
 
     return allMonths;
  }catch(error){
    console.log('got and error while gettting the orders placed on evey month');
    return []
  }
}