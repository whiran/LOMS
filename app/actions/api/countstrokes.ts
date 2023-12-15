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

  const strokeCount: number = result?.strokes?.length ?? 0;

  const contractCount: number = result?.strokes?.reduce(
    (sum: number, stroke: { contracts: any[] }) => sum + stroke.contracts.length,
    0
  ) ?? 0;

  // Retrieve counts of carelabels, otherlabels, and contities here
    // For example:
    const carelabelCount = result?.strokes?.reduce(
      (sum: number, stroke: { contracts: any[] }) =>
        sum + stroke.contracts.reduce((careSum, contract) => careSum + (contract.carelabel?.length ?? 0), 0),
      0
    ) ?? 0;

    const otherlabelCount = result?.strokes?.reduce(
      (sum: number, stroke: { contracts: any[] }) =>
        sum + stroke.contracts.reduce((otherSum, contract) => otherSum + (contract.otherlabel?.length ?? 0), 0),
      0
    ) ?? 0;

    const contityCount = result?.strokes?.reduce(
      (sum: number, stroke: { contracts: any[] }) =>
        sum + stroke.contracts.reduce((contitySum, contract) => contitySum + (contract.contity?.length ?? 0), 0),
      0
    ) ?? 0;

 
    return {
      contractCount,
      strokeCount,
      carelabelCount,
      otherlabelCount,
      contityCount,
    };
   
}