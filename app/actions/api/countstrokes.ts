'use server'

import prisma from "@/lib/prisma"

export const countstrokes = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      strokes: {
        select: {
          strokeno: true,
          contracts: {
            select: {
              constractno: true,
              carelabel: {
                select: {
                  id: true,
                  otherlabel: {
                    select: {
                      id: true,
                      contity: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  //correct
  const strokeCount: number = result?.strokes?.length ?? 0;

  //correct
  const contractCount: number = result?.strokes?.reduce(
    (sum: number, stroke: { contracts: any[] }) => sum + stroke.contracts.length,
    0
  ) ?? 0;

  // Retrieve counts of carelabels, otherlabels, and contities here
   //correct
    let carelabelCount: number = 0;
    let oCount: number = 0;
    let cCount: number = 0;

    
  if (result?.strokes) {
    for (const stroke of result.strokes) {
      if (stroke.contracts) {
        for (const contract of stroke.contracts) {
          if (contract.carelabel) {
            carelabelCount += contract.carelabel.length;
          }for(const other of contract.carelabel){
            if(other.otherlabel){
              oCount += other.otherlabel.length;
            }
            for(const contity of other.otherlabel){
              if(other.otherlabel){
                cCount += contity.contity.length;
              }
            }
          }
        }
      }
    }
  }

 
    const otherlabelCount = oCount;

    const contityCount = cCount;
 
    return {
      contractCount,
      strokeCount,
      carelabelCount,
      otherlabelCount,
      contityCount,
    };
   
}