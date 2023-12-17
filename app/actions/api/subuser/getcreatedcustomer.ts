//get the created customer and printer strokedata
'use server'
import prisma from "@/lib/prisma"

export const getcreatedcustomersstroke = async (id: string) => {
  try{
    //get the subuser creater 
    const result = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        createdby: true,
      }
    })

    const custormerid = result?.createdby as string
    //get the user creater
    const printer = await prisma.user.findUnique({
     where: {
      id:custormerid,
     },
     select: {
      createdby: true,
     }
    });

    //get the all strokes based on admin's strokes

    const strokes = await prisma.stroke.findMany({
      where: {
        userid: printer?.createdby
      }
    })

    console.log(strokes.toString());
    return strokes;

  }catch(error){
    console.log('got an error when getting the customer strokes')
    return []
  }
}