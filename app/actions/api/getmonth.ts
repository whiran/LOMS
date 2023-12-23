'use server'


import prisma from '@/lib/prisma';

//get the month and return it group to show them in a chart

async function groupDataByMonth(data: any[]) {
  const monthsData: { [key: number]: number } = {};

  data.forEach((item) => {
    const createdAt = new Date(item.createdAt);
    const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
    if (!monthsData[month]) {
      monthsData[month] = 0;
    }
    monthsData[month]++;
  });

  const allMonths: { [key: number]: number } = {};
  for (let i = 1; i <= 12; i++) {
    allMonths[i] = monthsData[i] || 0;
  }

  return allMonths;
}



export async function groupbycontractmonth(id:string,type: string) {

  try{
    const strokes = await prisma.stroke.findMany({
      where: {
        userid: id,
      },
      select: {
        strokeno: true,
        createdAt: true,
        contracts: {
          select: {
            constractno: true,
            createdAt: true,
            carelabel: {
              select: {
                id: true,
                createdAt: true,
                otherlabel: {
                  select: {
                    id: true,
                    createdAt: true,
                    contity: {
                      select: {
                        id: true,
                        createdAt: true,
                      }
                    }
                  }
                }
              }
            }
          },
        }
      }
    })
    

    const monthsData: { [key: number]: number } = {};
    const cmonthsData: { [key: number]: number } = {};
    const caremonthsData: { [key: number]: number } = {};
    const othermonthsData: { [key: number]: number } = {};
    const qunmonthsData: { [key: number]: number } = {};

    strokes.forEach((strok) => {
      const createdAt = new Date(strok.createdAt);
      const month = createdAt.getMonth() + 1;
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
      strok.contracts.forEach((con) => {
        const createdAt = new Date(con.createdAt);
        const month = createdAt.getMonth() + 1;
        if (!cmonthsData[month]) {
          cmonthsData[month] = 0;
        }
        cmonthsData[month]++;
        con.carelabel.forEach((care) => {
          const createdAt = new Date(care.createdAt);
          const month = createdAt.getMonth() + 1;
          if (!caremonthsData[month]) {
            caremonthsData[month] = 0;
          }
          caremonthsData[month]++;
          care.otherlabel.forEach((other) => {
            const createdAt = new Date(other.createdAt);
            const month = createdAt.getMonth() + 1;
            if (!othermonthsData[month]) {
              othermonthsData[month] = 0;
            }
            othermonthsData[month]++;
            other.contity.forEach((qun) => {
              const createdAt = new Date(qun.createdAt);
              const month = createdAt.getMonth() + 1;
              if (!qunmonthsData[month]) {
                qunmonthsData[month] = 0;
              }
              qunmonthsData[month]++;
              })
          })
        })
      })
    })

    // Generate an array with all months of the year and their counts
    if(type =='stroke'){
       const sallMonths: { month: number; count: number }[] = [];
       for (let i = 1; i <= 12; i++) {
         const count = monthsData[i] || 0;
         sallMonths.push({ month: i, count });
       }
   
       return sallMonths;
    }else if(type == 'con'){
      const callMonths: { month: number; count: number }[] = [];
       for (let i = 1; i <= 12; i++) {
         const count = cmonthsData[i] || 0;
         callMonths.push({ month: i, count });
       }
   
       return callMonths;
    }else if(type =='care'){
      const careallMonths: { month: number; count: number }[] = [];
       for (let i = 1; i <= 12; i++) {
         const count = caremonthsData[i] || 0;
         careallMonths.push({ month: i, count });
       }
   
       return careallMonths;
    }else if(type == 'other'){
      const otherallMonths: { month: number; count: number }[] = [];
       for (let i = 1; i <= 12; i++) {
         const count = othermonthsData[i] || 0;
         otherallMonths.push({ month: i, count });
       }
   
       return otherallMonths;
    }else if( type == 'qun'){
      const qunallMonths: { month: number; count: number }[] = [];
       for (let i = 1; i <= 12; i++) {
         const count = qunmonthsData[i] || 0;
         qunallMonths.push({ month: i, count });
       }
   
       return qunallMonths;
    }else{
      return []
    }

  }catch(error: any){
    console.log(`found a error on get group month contract`)
    return [];
  }finally {
    await prisma.$disconnect();
  }

  
}


export async function groupbyothermonth() {

  try{
    const others = await prisma.otherlabel.findMany();

    const monthsData: { [key: number]: number } = {};
   others.forEach((other) => {
      const createdAt = new Date(other.createdAt);
      const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
    });

    // Generate an array with all months of the year and their counts
    const allMonths: { month: number; count: number }[] = [];
    for (let i = 1; i <= 12; i++) {
      const count = monthsData[i] || 0;
      allMonths.push({ month: i, count });
    }

    return allMonths;

  }catch(error: any){
    console.log(`found a error on get group month other`)
    return [];
  }finally {
    await prisma.$disconnect();
  }

  
}

export async function groupbycaremonth() {

  try{
    const cares = await prisma.carelabel.findMany();

    const monthsData: { [key: number]: number } = {};
   cares.forEach((care) => {
      const createdAt = new Date(care.createdAt);
      const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
    });

    // Generate an array with all months of the year and their counts
    const allMonths: { month: number; count: number }[] = [];
    for (let i = 1; i <= 12; i++) {
      const count = monthsData[i] || 0;
      allMonths.push({ month: i, count });
    }

    return allMonths;

  }catch(error: any){
    console.log(`found a error on get group month care`)
    return [];
  }finally {
    await prisma.$disconnect();
  }

  
}


export async function groupbyquantitymonth() {

  try{
    const quntities = await prisma.contity.findMany();

    const monthsData: { [key: number]: number } = {};
   quntities.forEach((quntity) => {
      const createdAt = new Date(quntity.createdAt);
      const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
    });

    // Generate an array with all months of the year and their counts
    const allMonths: { month: number; count: number }[] = [];
    for (let i = 1; i <= 12; i++) {
      const count = monthsData[i] || 0;
      allMonths.push({ month: i, count });
    }

    return allMonths;

  }catch(error: any){
    console.log(`found a error on get group month quntity`)
    return [];
  }finally {
    await prisma.$disconnect();
  }

  
}