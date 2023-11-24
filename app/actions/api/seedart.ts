//this code run seperatly to add data to art table to test case
//untill the web service work
const { PrismaClient } = require('@prisma/client'); // Import Prisma using CommonJS syntax

const prisma = new PrismaClient();

async function seedart() {
  const productsToCreate = [
    { contract_id: 'fd' },
    { contract_id: 'dfdfdf' },
    // Add more product objects as needed
  ];

  try {
    const createdProducts = await prisma.art.createMany({
      data: productsToCreate,
    });

    console.log(`${createdProducts.count} products inserted.`);
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedart();
