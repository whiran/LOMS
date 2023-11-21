'use server'


import prisma from '@/lib/prisma';

export async function getTotalCountByCountryCode(): Promise<{ countryCode: string; count: number }[]> {
  const result = await prisma.strokexml.groupBy({
    by: ['countrycode'],
    _count: true,
  });

  return result.map((entry) => ({
    countryCode: entry.countrycode,
    count: entry._count,
  }));
}

// Example usage
export async function main() {
  try {
    const totalCountByCountryCode = await getTotalCountByCountryCode();
    console.log(totalCountByCountryCode);
  } finally {
    await prisma.$disconnect();
  }
}
