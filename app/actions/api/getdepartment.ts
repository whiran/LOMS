'use server'

import prisma from '@/lib/prisma';

//get the total cout byt the department number

export async function getTotalCountBydepartmentnumber(): Promise<{ departmentnumber: string; count: number }[]> {
  const result = await prisma.strokexml.groupBy({
    by: ['departmentnumber'],
    _count: true,
  });

  return result.map((entry) => ({
    departmentnumber: entry.departmentnumber,
    count: entry._count,
  }));
}
