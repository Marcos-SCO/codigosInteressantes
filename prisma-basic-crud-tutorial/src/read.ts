import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {

    // const read = await prisma.youtube_channels.findMany();

    /* const readMany = await prisma.youtube_channels.findMany({
      where: {
        subscribers: {
          gte: 7000000
        }
      }
    }); */

    const findUnique = await prisma.youtube_channels.findUnique({
      where: {
        id: 8
      }
    });

    console.log(findUnique);
  }

  catch (err) {
    console.log(err);
  }

  finally {
    await prisma.$disconnect();
  }
}

main();