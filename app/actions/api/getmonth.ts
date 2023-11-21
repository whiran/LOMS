'use server'


import prisma from '@/lib/prisma';

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



export async function groupbycontractmonth() {

  try{
    const contracts = await prisma.contract.findMany();

    const monthsData: { [key: number]: number } = {};
    contracts.forEach((contract) => {
      const createdAt = new Date(contract.createdAt);
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