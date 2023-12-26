'use server'

import prisma from "@/lib/prisma"

export const deletecusandsubaccount = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id
    }
  });
 if(result){
  return 'ok'
 }
 return 'no'

}