import prisma

from "@/lib/prisma";
export async function findContractNumbersRelatedToStroke(): Promise<void> {
  try {
    const specificStroke = await prisma.stroke.findUnique({
      where: {
        strokeno: "I5358", // Replace with the specific stroke ID
      },
      include: {
        contracts: {
          select: {
            constractno: true, // Select only the contract numbers
          },
        },
      },
    });

    if (specificStroke) {
      const contractNumbers = specificStroke.contracts.map((contract) => contract.constractno);
      console.log('Contract Numbers related to the stroke:', contractNumbers);
    } else {
      console.log('Stroke not found or has no related contracts.');
    }
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
  } 
}

// Replace 'your_strokeno_here' with the actual stroke ID

