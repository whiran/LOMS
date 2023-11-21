'use server'


import prisma from '@/lib/prisma';

export async function getTotalCountBysupplierseries(): Promise<{ supplierseries: string; count: number }[]> {
  const result = await prisma.strokexml.groupBy({
    by: ['supplierseries'],
    _count: true,
  });

  return result.map((entry) => ({
    supplierseries: entry.supplierseries,
    count: entry._count,
  }));
}
