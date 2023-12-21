'use server'
import prisma from "@/lib/prisma"

//this is to help for the place order and get the who created and creter stroke data then place order can generate the it own contract no.

export const getcreatedusersstrokes = async (id: string) => {
  try{
  const result = await prisma.customer.findUnique({
    where: {
      ownid: id,
    }
  })

  const whocreated = result?.createdby

  const stroke = await prisma.stroke.findMany({
    where: {
      userid: whocreated,
    },
  });

  const strokenums = stroke.map(s => s.strokeno);

  return strokenums;
} catch(error){
  console.log('error form get the strokes based on who creted the customers.')
  return [];
}
}

export const getstrokeandconadmin = async (id: string) => {
  try{
    const result = await prisma.customer.findUnique({
      where: {
        ownid: id,
      }
    })
  
    const whocreated = result?.createdby
  
    const strokes = await prisma.stroke.findMany({
      where: {
        userid: whocreated,
      },
      select: {
        strokeno: true,
        contracts: {
          select: {
            constractno: true,
          },
        },
      },
    });
    const strokeAndContracts: { strokeno: string; contractNumbers: string[] }[] = [];

    strokes.forEach((stroke) => {
      const contracts = stroke.contracts.map((contract) => contract.constractno);
      strokeAndContracts.push({
        strokeno: stroke.strokeno,
        contractNumbers: contracts,
      });
    });
   
    return strokeAndContracts
  } catch(error){
    console.log('error form get the strokes based on who creted the customers.')
    return [];
  }
}