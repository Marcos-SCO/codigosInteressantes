import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const updateMany = await prisma.youtube_channels.updateMany({
      where: {
        subscribers: {
          lt: 515
        }
      },
      data: {
        subscribers: 1000
      }
    });

    console.log(updateMany);

  }

  catch (err) {
    console.log(err);
  }

  finally {
    await prisma.$disconnect();
  }
}

main();